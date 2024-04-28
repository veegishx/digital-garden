---
author: Veegish Ramdani
title: What is Global Privacy Control (GPC) and how is it protecting your privacy online.
description: Global Privacy Control (GPC) is an initiative aimed at empowering users to manage their online privacy. But how does it work and what's the story behind it?
date: '2024-04-27'
categories:
  - Global Privacy Control
  - GPC
  - Privacy
  - CCPA
  - Data Protection Act

featured: true
published: true
thumbnail: images/gpc-online-privacy/gpc-thumbnail.webp
---

If you are an American, you are probably aware of the California Consumer Protection Act (CCPA), a data privacy regulation which was enacted back in January 2020 to help protect the privacy of consumers by giving them a greater control over the sale of their personal data. This was a significant step concerning the protection of consumer privacy in California, and one of the most important section of this legislation is the the right to opt out of the sale of personal information.

When the CCPA started being enforced in July 2020, companies started receiving notices of alleged noncompliance from the Office of the Attorney General (OAG), and businesses had to scramble to implement a “Do Not Sell” mechanism in their digital products and websites to allow consumers to opt out to the sale of personal information or risk facing serious fines and penalties. This is why today almost every site which does business with California residents have an easily accessible “Do Not Sell My Personal Information” link.

While this is a relatively simple way for one to prevent the sale of their personal information, a person can visit quite a handful of sites a day, whether directly or via links shared on social media sites. Having to remember to look for the “Do Not Sell” link for each new site visited can become annoying at some point. This is where [Global Privacy Control (GPC)](https://globalprivacycontrol.org/) saves the day. GPC itself is not a legislation. Rather, it is a technical standard to complement the existing CCPA by making it even easier for consumers to opt out. The way GPC works is by reading the user’s preference concerning the sale of their personal data. This preference is set either in a browser or an extension that supports the GPC spec.

Once the preference is set, each time the user visit a site, the browser automatically sends a signal to it ([Sec-GPC](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-GPC)), announcing that the user does not their personal data to be sold, shared or used for targeted advertising. The site then has to handle the signal the same way it would handle a “Do Not Sell” request as required by the CCPA. This eliminates the need for the user to manually make a “Do Not Sell” request for each new site they visit. You set the preference once and forget about it. But where this mechanism truly shines is when it comes to standardizing the process of opting out in countries outside the US that have a data privacy legislation mentioning similar opt-out directives as the CCPA.

For instance, the EU’s GDPR which strongly favours opt-ins, also states in [Article 21](https://gdpr-info.eu/art-21-gdpr/) that users may object from the processing of their personal data at any time if processing is necessary for the purposes of the legitimate interests pursued by the controller. A similar right is also found in Article 24 of the [Data Protection Act (DPA)](https://dataprotection.govmu.org/Documents/DPA_2017_updated.pdf?csf=1&e=0rlrff), the data privacy legislation of Mauritius, which was heavily inspired by the GDPR. As my friend and collegue Loganden Vevindron ([cyberstorm.mu](https://cyberstorm.mu/)) has highlighted in the [GPC explainer](https://github.com/privacycg/gpc-spec/blob/main/explainer.md), “Mauritian regulators may deem GPC to constitute a legally binding invocation of Article 24 rights. That would be the case if people's GPC opt out preferences are their only known opt out preferences or their GPC opt out preferences are in line with any other opt out preferences they invoked. However, in case of conflicts there might be ambiguities as there is no explicit mention of global opt-out mechanism winning over a direct consent to a specific sharing request on a specific site.”

For now, GPC seems to be gaining traction. Several major browsers, like Firefox and Brave have already implemented the feature natively and several major publishers in the US are already honoring GPC requests. Firefox has GPC preferences set to [not sell or share data by default](https://blog.mozilla.org/netpolicy/2023/11/21/global-privacy-control-empowers-individuals-to-limit-privacy-invasive-tracking/) in private mode. In browsers where GPC is not supported, there are still extensions like [Privacy Badger](https://privacybadger.org/) which bring the same functionality to users.

Personally I think GPC is a great tool in signalling user’s preference to sites. But on it’s own it cannot do much. In the end it is really up to publishers to decide whether or not they want to respect the user’s preference. This is why it is often argued that [consent-based solutions do not effectively work](https://hbr.org/2018/09/stop-thinking-about-consent-it-isnt-possible-and-it-isnt-right). In order for GPC to work effectively, it should complement comprehensive privacy legislations that give consumers explicit rights over their private data online, as in the case of the CCPA. Without comprehensive privacy legislations, publishers can simply just deny access to their products rather than having to deal with honoring a user’s request to not have their data shared or sold.

That being said, the fact that GPC is a universal opt-out solution not tied to any specific legal implementation means that any country having privacy laws which gives their citizens the right to opt-out of the sale or sharing of their personal data can easily take advantage of the GPC spec, just like California residents.
