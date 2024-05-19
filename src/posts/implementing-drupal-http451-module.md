---
author: Veegish Ramdani
title: Implementing HTTP451 in Drupal during IETF102 Hackathon
description: A hackathon about improving internet standards remotely from the island of Mauritius
date: '2018-07-15'
categories:
  - Privacy
  - IETF
  - Hackathon
  - Open Source
  - http451

featured: true
published: true
thumbnail: images/implementing-drupal-http451-module/thumbnail.png
---

<script>
    import Image from 'svimg/Image.svelte';
    import ImageCaption from './image-caption.svelte';
    import { Tweet } from 'sveltekit-embed'
</script>

EDIT: This work was mentioned in The Register(Thanks Logan!): https://www.theregister.co.uk/2018/11/02/ssh_rc4_security

If you are not familiar with the Internet Engineering Task Force(IETF), it is essentially the governing body regulating the implementation of new standards on the internet. They organise frequent hackathons to improve standards and interoperability on the internet.

Having never participated in an international event, it came off as a surprise when Logan([cyberstorm.mu](cyberstorm.mu)) contacted me to join the team at Pointe Aux Piments to remotely participate in the [IETF102 Hackathon](https://trac.ietf.org/trac/ietf/meeting/wiki/102hackathon).

The team was divided into 2 small teams - Implementation and Interoperability. I was part of the implementation team and my task was to make a Drupal module which would implement [HTTP451(RFC 7725)](https://tools.ietf.org/html/rfc7725). Since I had never worked with Drupal before, I spent quite a lot time going through Drupal's documentation before starting to code. The event was scheduled for the 14th and 15th of July but we started working on our tasks 2 days prior so I had some time to familiarize myself with Drupal's environment which is completely different from what I expected at first.

## InterOp and Implementation teams

<ImageCaption>
  <Image class="inline-basic-image" src="images/implementing-drupal-http451-module/implementing-drupal-http451-module-photo-1.jpg" />
</ImageCaption>

I even encountered some issues especially concerning parsing of json files in php. My module was creating valid json but as soon as it was appending data to the files it broke the structure. Luckily thanks to a nice [json formatter](https://jsonformatter.curiousconcept.com/) tool which I found online, I managed to identify and debug the issue.

<ImageCaption caption="Result of a censored page using the http451module">
  <Image class="inline-basic-image" src="images/implementing-drupal-http451-module/implementing-drupal-http451-module-screenshot-1.png" />
</ImageCaption>

Meanwhile the InterOp team who were tasked with working on TLS 1.3 were testing for [session resumption](https://blog.cloudflare.com/tls-session-resumption-full-speed-and-secure/) and [0-RTT](https://blog.cloudflare.com/introducing-0-rtt/) on some popular open source libraries. They had some issues as well but in the end everyone managed to achieve their goal.

On the last day of the hackathon everyone made a one minute video to explain what they've been working on and what was their opinions on the hackathon. I definitely wasted some time preparing for this one since i'm not used to that kind of thing. The hackathon finally came to an end. The only thing left was to watch the presentations live from Montreal which were scheduled for 22:00(Mauritius time).
<ImageCaption>
<Image class="inline-basic-image" src="images/implementing-drupal-http451-module/implementing-drupal-http451-module-photo-2.jpg" />
</ImageCaption>

Throughout these 4 days of hacking code we didn't only spend time in front of our screens. We went for walks along the beach and some of us even went for a swim in the swimming pool that came with the villa where we were staying at. We spent lots of time together and had a decent amount of fun. It an unprecedented experience for me I must say. I got the opportunity to get to know some people better and meet new ones as well. On top of that I got familiar with Drupal and I look forward to improving the http 451 module I made as right now It lacks some features like geolocation.

On an ending note, I'm eager to take part in more IETF Hackathons and I hope to see more people from Mauritius involved in these types of projects.

Here are some more blog posts from other members of the team:
Jagveer - https://medium.com/@jagveer.loky/my-first-ieft-102-hackathon-remotely-in-mauritius-1b69114fd0bb

Rahul - https://securenetweb.wordpress.com/2018/07/14/ietf-102-hackathon-implementing-tls-1-3-in-nrpe/

Nigel - https://www.niyon.me/2018/07/ietf-102-implementing-tlsv13-to-nagios.html

Chromico - https://medium.com/@chromicorek/my-experience-during-the-102-ietf-hackathon-in-mauritius-8f6b4cb523f4

Codarren - https://codarren.com/2018/07/ietf-102-a-fun-tls-1-3-hackathon/

Presentation Slides: https://github.com/IETF-Hackathon/ietf102-project-presentations/blob/master/hackathon_presentation_tls13.pptx?raw=true

<Tweet tweetLink="TheTunnelix/status/1018334920299577344" />
