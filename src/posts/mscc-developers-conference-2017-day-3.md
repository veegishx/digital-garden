---
author: Veegish Ramdani
title: MSCC Developers Conference 2017 - Day 3
description: A recap of the third edition of the Developers Conference Mauritius - Day 3
date: '2017-04-03'
categories:
  - Conference
  - Technology
  - Developers
  - Software Development

featured: true
published: true
thumbnail: images/mscc-developers-conference-2017-day-3/thumbnail.png
---

<script>
    import Image from 'svimg/Image.svelte';
    import Quote from './quote.svelte';
    import ImageCaption from './image-caption.svelte';
    import { YouTube } from 'sveltekit-embed'
</script>

So this is it, the last day of [MSCC DevCon 2017](https://archive.veegish.com/mscc-developers-conference-2017-day-1/), and probably the most interesting day. I met with my friend Hans like before, except this time we reached there quite early. We spent 15 mins chatting before we got to the hotel lounge where we got access to wifi which was as slow as a dial up network, probably due to a lot of people browsing facebook. The sessions kicked off at 09:30 as usual.

## 09:30 – Simple game development with JavaScript

The idea of game development seems to appeal to a great deal of people. The room was overcrowded since the beginning of the session and eventually quite a lot of attendees had to sit on the floor. The demo which consisted of developing a 2D breakout-style game was presented by Microsoft Student Partner(MSP) [Akasha Rojee](https://twitter.com/AkashaLilith1). The demo was based off a [MDN guide which can be found here](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript).

Akasha Rojee presenting 2D breakout game using pure JavaScript.

Throughout the demo, different basic aspects of game development were explained such as collision detection, computer graphics coordinates(with a downward facing y axis – [read more here](https://gamedev.stackexchange.com/questions/83570/why-is-the-origin-in-computer-graphics-coordinates-at-the-top-left)), score tracking system, and game over conditions. To demonstrate how using frameworks can speed up a workflow the game was [recreated using Phaser](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser). An advantage of a framework like Phaser over vanilla js is that you don’t need to draw objects using canvas. Instead you can just draw your game assets and directly import them into your game project. Moreover Phaser has a preloader library for preloading assets like sprites, images and audio.

## 10:30 – Game Development with Unreal Engine 4

<YouTube youTubeId="XTgueDFaN6Y" />

Unreal Engine 4 showcase reel
Another game development demo presented by 2 MSPs but this time using Unreal Engine 4 to create a 3d third person person game with random terrain generation, a bit like like Temple Run. You can use can blueprints or c++ with Unreal Engine but for the sake of the demo c++ was used.

The duo covered some topics like camera postioning, coordinate system, mesh colliders and floor/terrain generation among others.

## 11:30 – A Panel Discussion – Web Development in Mauritius

This was undoubtedly the most animating session. The panel consisted of developers from two different development backgrounds – web development and software engineering. The session started off with a fake interview to demonstrate red flags that could eliminate the chances of getting a job. Factors like attitude towards others were discussed. Communication was also part of the agenda. Being part of a community and collectively contributing towards building better products is something every developer should be concerned with. This helps to keep up with the latest trends in technologies and be aware of what is going on in the industry.

One really fun topic was about tabs vs spaces…yep

<YouTube youTubeId="SsoOG6ZeyUI" />

Back to some seriousness, Sundeep Ramgoolam brought up the [Drunning Kruger effect](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect) which basically refers to an illusion which makes people perceive their abilities more superior than they actually are, thus making them think they are experts at what they are doing. The opposite applies to those who are more experienced.

<ImageCaption caption="Photo credits: https://twitter.com/ianbremmer">
  <img loading="lazy" class="inline-basic-image" src="http://financialcryptography.com/images/the-path-all-knowledge.jpg" alt="drunning kruger effect" />
</ImageCaption>

Quote from a panelist:
<Quote author="Panelist" quote="Be stupid so you can learn." />

## 14:30 – Fast coding skills

A small and pretty fast presentation by Codarren Velvindron from hackers.mu about the attitude needed towards problems in order to solve them efficiently. This one was quite fun and like other members from <cyberstorm.mu> he encouraged OSS and contributions.

<Quote author="Codarren Velvindron" quote="Can’t understand a line of code? Delete it and see what happens next." />

😂

Overall devconmru 2017 was a great experience as a first timer attendee. Needless to say you get to interact with the professionals in the industry and ask them about the tools and technologies that they are using in their everyday life. Given the fact that you get an insight about what is going on in the industry, something not usually taught at academia, it is definitely worth attending!
