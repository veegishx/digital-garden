---
author: Veegish Ramdani
title: Email spoofing and DNS counter-measures
description: Email spoofing is a common type of attack vector. But how easy is it to carry it out and which measures can be taken to prevent it?
date: '2024-10-12'
categories:
  - Email Spoofing
  - Security
  - DNS
  - SPF
  - DKIM
  - DMARC
  - Phising

featured: true
published: true
thumbnail: images/email-spoofing/email-spoofing-thumbnail.jpg
---

<script>
    import ImageCaption from './image-caption.svelte';
</script>

When it comes to phishing attacks, email is a favorite attack vector among threat actors due to it’s unsophisticated nature. It’s also now much easier to craft these email due to the prevalence of artificial intelligence making them much more legitimate looking.

## Spoofing in action

To demonstrate how easy it can be to spoof email addresses and send one of those phishing emails to vulnerable email clients/servers, we are going to come up with a scenario involving a fictional company called Morezo, which specializes in software development. Morezo has a website available at https://morezo.xyz. As a potential attacker, we learnt that Morezo has a few email inboxes mapped on the same domain as they were included in an email list dump we found somewhere on the web. Two of the emails we found were [appteam@morezo.xyz](mailto:appteam@morezo.xyz) and [security@morezo.xyz](mailto:security@morezo.xyz) which we are going to target.

<ImageCaption>
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" alt="Morezo Homepage" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-1.png" />
</ImageCaption>

Morezo Homepage

Before starting we will need our own email address. Ideally our domain should look similar to [morezo.xyz](http://morezo.xyz), maybe something like moreso.xyz, morezo.net, [morezzo.xyz](http://morezzo.xyz) etc. In this case however, i’m going to use whatever domain I have at my disposal and create an inbox using a service like Zoho Mail, SendGrid or Mailgun. Once the email account is configured, we can go ahead and start investigating what email provider our target is using. We can find this information by inspecting the DNS records of the target’s mail server, which can be easily done using `nslookup` or `dig` with MX as the record type

```bash
dig morezo.xyz MX
```

<ImageCaption caption="Querying Morezo DNS for MX records">
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-2.png" />
</ImageCaption>

Running `dig` should return the FQDN of their SMTP server, which in this case is [mx2.privateemail.com](http://mx2.privateemail.com) and [mx1.privateemail.com](http://mx1.privateemail.com). We can now attempt to communicate with one of the SMTP servers using `telnet` (or `netcat`) by running the following command:

```bash
telnet mx1.privateemail.com 25
```

If there is no firewall blocking inbound access to the server on port 25 then this should allow us to open a telnet session.

<ImageCaption caption="Connecting to Morezo's mail server via telnet">
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-3.png" />
</ImageCaption>

Now that the session is open, we can execute the required SMTP commands, which are all explained in [RFC 5321 (Section 4.1)](https://datatracker.ietf.org/doc/html/rfc5321#section-4.1). The order of the commands executed are explained in [section 3.3](https://datatracker.ietf.org/doc/html/rfc5321#section-3.3). Covering SMTP here will just make this post unnecessarily long. I’ll make use of Google’s Gemini to generate the email’s body to make it more legitimate looking.

<ImageCaption caption="Sending an email via SMTP">
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-4.png" />
</ImageCaption>

Now that our email transaction has been successful, we can check our email inbox on morezo’s side.

<ImageCaption caption="'Malicious' email with spoofed sender successfully reached morezo's inbox">
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-5.png" />
</ImageCaption>

As expected, without any spoofing countermeasures in place, the email has successfully reached morezo’s inbox, and not only that but we have also been able to spoof the sender’s identity!

<ImageCaption caption="Identity spoofed">
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-6.png" />
</ImageCaption>

Looking at the email headers, we can see that this is not a legitimate email coming from the real “Kowalski Miller”.

<ImageCaption caption="Inspecting email headers shows real sender's identity">
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-7.png" />
</ImageCaption>

However, in reality most people won’t check an email’s header. Additionally, any trickery like encoding special characters to make the attacker’s domain similiar to the target’s domain makes it hard to spot for the human eye.

Our attack has been successful, we have been able to spoof an official email address and send an email containing malicious links. This demonstrates that the email server of Morezo is vulnerable to spoofing attacks. This makes it very easy for someone at Morezo to inadvertently become a victim of a cyber-attack.

## How to prevent Email Spoofing

We are going to explore some DNS-based countermeasures that we can implement to reduce the likeliness of such attacks from being successful. These countermeasures are Sender Policy Framework (SPF), Domain Keys Identified Mail (DKIM) and Domain-Based Message Authentication Reporting and Conformance (DMARC). SPF, DKIM and DMARC are email verification methods which can filter out and block spam or phishing emails. On their own, they are pretty much ineffective. However, when implemented properly together, they will prevent spoofed emails from reaching your inbox. Let’s start by looking at what SPF is and how it works.

## What is Sender Policy Framework (SPF)

SPF is a **domain-based** email authentication method whereby domain owners configure their DNS with a list of authorized IP addresses and mail servers which are allowed to send emails using their domain. The recipient mail servers can then use this list to cross-check that any email received indeed originated from an authorized server.

<ImageCaption caption="How SPF works">
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-8.png" />
</ImageCaption>

In it’s simplest form, an SPF TXT record may look like this:

```bash
v=spf1 include:spf.privateemail.com ~all
```

This record implies that only the domain [`privateemail.com`](http://privateemail.com) is allowed to send emails, while any other domain is prohibited. A full list and detailed explanations of SPF record syntax as well as SPF failure handling can be found on [dmarcian.com](https://dmarcian.com/spf-syntax-table/).

While SPF provides some form of authentication layer, on its own it is not very effective. This is because SPF only checks the envelope `FROM` header, also known as the `SMTP MAIL FROM`, `Return-Path` or `Bounce Address`. An Email transaction is made up of two parts, an envelope and the email itself. In our earlier example, our email envelope was this part:

```bash
helo attackerdomain.com
mail from: email@attackerdomain.com
rcpt to: appteam@morezo.xyz
data
```

And our email was this part:

```bash
From: "Miller Kowalski" <security@morezo.xyz>
To: appteam@morezo.xyz
Subject: Urgent: Critical Vulnerability Discovered in Apache 2.4.4
[...email body]
```

SPF was designed to validate the envelope `Mail From` header, not to check for any alignment between it and the Email `From` header, which in our previous example were both different. Also in case SPF fails, the receiving server isn’t required to do anything to block the email.

## What about Domain Keys Identified Mail (DKIM)?

DKIM is another email security standard, except unlike SPF, it uses a signed hash to detect if an email has been altered during transit or forged at the source. DKIM works by employing a set of private and public keys to sign and verify any emails being sent. The private key is used to sign a portion of the email and this signature is then included in the email. The public key, published in the DNS record (DKIM TXT Record) of the receiving email server is then used to verify if the signature is valid. As a note, a domain can also have multiple public DKIM keys. Once the signature verified, DKIM authentication is successful and the email is considered legitimate. Otherwise if DKIM fails then there is a potential for the email to be blocked or land into a spam folder.

<ImageCaption caption="How DKIM works">
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-9.png" />
</ImageCaption>

A DKIM TXT Record may look like this:

```bash
"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwzezqpW1IjMwbAVlsBwzNXCPdpGOURq6UreX0Yn9WRW7hSfMIP7gjMB8mS5naXDA/2IBF4iQm0OXbcUD3SK0HN9rhJEbMsTq4DznDw0aMnbv7Bi9MBuQxV7MAJ+R8wprhPDMvRKn3y98G47fyGP6BJkyycrvi0qY2LwSkxiZWoErlJivoFNWOiorFCE21UuOMpY" "Ow9sIuxpdtuPcVwGvKDeZraOXqnvSig3qEZYu+p+C8iP1uoQMAGmfAY4xv4Ujh8hHo7xW1fLJG6Ve4XJjU+77jSdTPmLDOm6aIhx01k2RRkeKxeZEihvttgSiYP85F4vO3BNVpb1G1SPQ2/v33QIDAQAB"
```

`v`, `k`, `p` are just some of the tags that form part of a DKIM record. You can read more about them [here](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail#Technical_details).

Like SPF, implementing DKIM alone doesn’t help in preventing email spoofing as it does not check the envelope and email `FROM` header. This is where DMARC comes into play.

## DMARC to the rescue!

Domain-Based Message Authentication Reporting and Conformance (DMARC) is an email authentication mechanism which is based on SPF and DKIM alignment. Based on how you configure a DMARC policy, DMARC will check if either SPF or DKIM (or both, if configured) passes, before letting an email through, otherwise the email gets rejected. A well configured DMARC policy will check that the email envelope `FROM` and the email header `FROM` and reject the email if there is a domain mismatch. This is called [DMARC alignment](https://dmarcian.com/alignment). Apart from preventing spoofing, DMARC also provides email reports which contains information related to emails passing or failing DMARC authentication.

A DMARC record may look as follows:

```bash
v=DMARC1; p=reject; rua=mailto:appteam@morezo.xyz; adkim=s; aspf=s;
```

`v=DMARC1;` is the start of the record, indicating that this record is to be treated as a DMARC DNS record.

`p=reject;` is the part which tells the mail server what to do when DMARC alignment fails. `p` can take the value `none` , `quaratine` and `reject` which is the strictest measure.

`rua=mailto:appteam@morezo.xyz;` specifies the address where to send reports. There are [2 types of reports](https://dmarcian.com/rua-vs-ruf/) - aggregate (`rua`) and forensic (`ruf`).

`adkim=s;` basically says that DKIM checks need to be strictly enforced. `s` stands for strict. Its alternative, `r` stands for relaxed.

`aspf=s;` same as `adkim=s` but for SPF checks

Now that we know about The Holy Trinity of email authentication, we can apply them to [`morezo.xyz`](http://morezo.xyz) email configuration and try to send the spoofed email again to see if anything has changed.

<ImageCaption caption="DMARC Policy applied to Morezo's email configuration successfully prevented spoofing">
<enhanced:img sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px" class="inline-basic-image" src="/static/images/email-spoofing/email-spoofing-10.png" />
</ImageCaption>

As expected, the combination of SPF, DKIM and DMARC successfully stopped our “malicious” email from reaching the recipient. Mission accomplished!

## Conclusion

Email security doesn’t comprise of a single solution, rather it’s a set of complex solutions that need to be implemented together. Each one of these solutions have their own challenges and complexities that need to be dealt with. The examples mentioned earlier are very basic, introductory at most. In reality an organization can have many departments which in turn can have multiple mail servers configured in different ways. Implementing SPF, DKIM and DMARC can become really challenging fast and strict DMARC alignment may not be favourable. It’s important to experiment with different relaxed policies and see what works without breaking any existing email flow first and then gradually try stricter policies.
