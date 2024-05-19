---
author: Veegish Ramdani
title: 'IETF 104 Hackathon: Implementing Lower Effort Per-Hop Behavior in OpenSSH'
description: Remote participation in IETF104 hackathon from Mauritius
date: '2019-03-25'
categories:
  - Hackathon
  - IETF104
  - OpenSSH
  - DSCPLE
  - Coding

featured: true
published: true
thumbnail: images/ietf-104-hackathon/thumbnail.png
---

<script>
    import Image from 'svimg/Image.svelte';
    import ImageCaption from './image-caption.svelte';
</script>

Edit[28 JAN 2020]: The patch has been added to OpenSSH 8.2: [https://github.com/openssh/openssh-portable/commit/4594c7627680c4f41c2ad5fe412e55b7cc79b10c](https://github.com/openssh/openssh-portable/commit/4594c7627680c4f41c2ad5fe412e55b7cc79b10c)

As is tradition, every year the cyberstorm.mu team takes part in the IETF hackathons. This time we had more newcomers who joined us for the hackathon, namely Yashveer Jadoo, Bruno Bernard and Rahul Kumar Shivadan.

<ImageCaption>
  <Image class="inline-basic-image" src="images/ietf-104-hackathon/ietf-104-hackathon-photo-1.jpg" />
</ImageCaption>

This year, I teamed up with Yashveer to work on implementing the latest draft for A Lower Effort Per-Hop Behavior(draft: [https://tools.ietf.org/html/draft-ietf-tsvwg-le-phb-10](https://tools.ietf.org/html/draft-ietf-tsvwg-le-phb-10)) in OpenSSH.

Lower effort(LE) is one of the many codepoints which can be specified in the differentiated services/DiffServ field(formerly known as ToS) of an IP packet. DiffServ is a technique which is used to enforce Quality of Service(QoS) in a network by providing packet classification methods to identify latency-critical traffic such as VoIP and other real-time streaming media applications. To implement packet classification, DiffServ provides a defined list of 6 bits codes(Differentiated Services Code Points - DSCP) which can be applied to a network traffic.

<ImageCaption>
  <Image class="inline-basic-image" src="images/ietf-104-hackathon/ietf-104-hackathon-screenshot-1.png" />
</ImageCaption>

Our task was to implement a new code point, called Lower Effort in OpenSSH. It took us about a whole day to set up everything properly. We had encountered several compilation issues and a few hiccups with our Virtual Machines, which froze from time to time during compilation. At some point my display server wouldn't even start due to compatibility issues related to nvidia drivers. Luckily I got some help from Nitin([https://tunnelix.com](https://tools.ietf.org/html/draft-ietf-tsvwg-le-phb-10)) who was also present for the hackathon and together we managed to identify this issue and revert back to intel drivers on Ubuntu 18.04.

<ImageCaption caption="Nitin and Loky">
  <Image class="inline-basic-image" src="images/ietf-104-hackathon/ietf-104-hackathon-photo-2.jpg" />
</ImageCaption>

Yashveer had quite some trouble with his VM crashing frequently but together we managed to locate the files that needed to be updated with the new codepoint and successfully compiled OpenSSH. A patch was then sent to OpenSSH's issue tracker. During this process we learnt quite a few new things, such as using wireshark to detect the different code points that were being sent along packets. We also learnt how to use netcat, which is a cool tool to establish TCP/UDP connections.

<ImageCaption >
  <Image class="inline-basic-image" src="images/ietf-104-hackathon/ietf-104-hackathon-photo-3.jpg" />
</ImageCaption>

The cyberstorm.mu team also worked on other cool projects from different working groups like deprecating RC4 in SSH, adding Post Handshake Authentication in some applications, HTTP451 and even developing a modern Android application for the IETF! It was great to see new faces joining the world of rough consensus and running code. Looking forward to more ambitious projects and participants for IETF105!

Feel free to check out the blog posts of newcomers and other members below:

## Newcomers experiences:

Yashveer Jadoo: [https://medium.com/@yashveer1726/my-initiation-at-cyberstorm-mu-422b5795a821](https://medium.com/@yashveer1726/my-initiation-at-cyberstorm-mu-422b5795a821),

Bruno Bernard: [https://busymind101.wordpress.com/2019/03/24/ietf-104-hackathon-ietf-mobile-app/](https://busymind101.wordpress.com/2019/03/24/ietf-104-hackathon-ietf-mobile-app/),

Rahul Kumar Shivadan: [https://medium.com/@rahulshivadan14/ietf-104-hackaton-a4a823e78a5f](https://medium.com/@rahulshivadan14/ietf-104-hackaton-a4a823e78a5f)

## Other posts from the team

Rahul Golam: [https://securenetweb.wordpress.com/2019/03/23/ietf-104-hackathon-tls-1-3/](https://securenetweb.wordpress.com/2019/03/23/ietf-104-hackathon-tls-1-3/),

Avi Soomirtee: [https://avisoomirtee.blogspot.com/2019/03/ietf104-day-0-2-tls13.html](https://avisoomirtee.blogspot.com/2019/03/ietf104-day-0-2-tls13.html)

Jeremie Daniel: [https://medium.com/@jeremiedaniel48/ietf-104-remote-from-mauritius-3695504c8ba4](https://medium.com/@jeremiedaniel48/ietf-104-remote-from-mauritius-3695504c8ba4)

Loganaden Velvindron:

Day 0: [https://medium.com/@loganaden/ietf-104-day-0-73c62bbca9ae](https://medium.com/@loganaden/ietf-104-day-0-73c62bbca9ae),

Day 1: [https://medium.com/@loganaden/ietf-104-day-1-51d745dd39e0](https://medium.com/@loganaden/ietf-104-day-1-51d745dd39e0),

Day 2: [https://medium.com/@loganaden/ietf-104-day-2-1f43b128c220](https://medium.com/@loganaden/ietf-104-day-2-1f43b128c220)
