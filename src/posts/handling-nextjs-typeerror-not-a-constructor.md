---
title: Handling TypeError URL is not a constructor when invoking window.navigator in NextJS
description: A familiar looking bug which can at times prove hard to debug. This article looks at how to handle TypeError URL is not a constructor when using a library which is using browser objects like window.navigator
date: '2024-01-29'
categories:
  - NextJS
  - Error Handling
  - SSR
  - Lazy Loading
  - WebRTC
published: true
---

## Table of Contents

## The problem

If you have worked with NextJS for sometime, you might have come across the common `TypeError: Cannot Read Property of Undefined` whenever you are working with the window object, eg: when trying to access the localStorage property. In most of these cases you just need to add a condition to check if the window object is available to the client and then you should be able to access the window properties without any issue.

Recently, I ran into a similar problem and this time, the specific error thrown was as follows:

![Screenshot of TypeError: URL is not a constructor](images/screenshot-typeerror_url_not_a_constructor.png)
<i>TypeError: URL is not a constructor</i>

However, this time things were a bit different. Normally when NextJS encounters a runtime error, it shows an overlay indicating what error occurred and sometimes even pinpoints the line where the code threw the error.

![Illustration of NextJS runtime error handling overlay](images/screenshot-runtime-error-handling.png)

This time I was simply greeted with a 500 Internal Server Error

![Screenshot of NextJS throwing a 500 internal server error page](images/screenshot-internal_server_error_nextjs.png)

A bit weird but okay, let’s dig in. Starting with the context, I was building a small demo which streams the user’s microphone input from a NextJS client (using app router) to a custom NodeJS backend via [socket.io](https://socket.io/) where I was parsing it using [Vosk](https://alphacephei.com/vosk/) for speech processing. To simplify the process of capturing the microphone input I used [RecordRTC](https://recordrtc.org/). With that in mind, we can now take a look at the code.

To achieve this desired outcome, I defined 2 buttons. One to start listening to the user microphone and one to stop.

```typescript
// page.tsx
"use client";

// Imports
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
...

export default function Dashboard() {
  // Refs for our start & stop buttons
  const startRecordingRef = useRef<HTMLButtonElement | null>(null);
  const stopRecordingRef = useRef<HTMLButtonElement | null>(null);
  let recordAudio: RecordRTC;

  // Handle user voice input
  const handleStartRecording = () => {
    const browserNavigator = window.navigator;
    if (startRecordingRef.current && stopRecordingRef.current) {
      startRecordingRef.current.disabled = true;
      stopRecordingRef.current.disabled = false;
    }
    if (browserNavigator.mediaDevices) {
      browserNavigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream: MediaStream) => {
          recordAudio = new RecordRTC(stream, {...});

          recordAudio.startRecording();
        });
    } else {
      ...
    }
  };

  return (
    <div>
      <button
        ref={startRecordingRef}
        onClick={handleStartRecording}
      >
        Start Recording
      </button>
      <button
        ref={stopRecordingRef}
        onClick={handleStopRecording}
      >
        Stop Recording
      </button>
    </div>
  );
}
```

At first glace, there are clearly a few issues with this code. First of all i’m trying to access the window object outside a `useEffect()` . With `StrictMode` being set to `true` by default in NextJS 13, this code is going to render twice, once on the server and once on the client. And we know that when it runs on the server, it’s going throw an error because we do not have access to the `window` object as it’s a browser variable. A `useEffect()` always runs on the client and only after render so once implemented, we should have access to the `window` object and everything should be good, right? Well, not really.

## The root cause

Even with some additional safety checks to see if `window` and `navigator` were defined I was still being greeted by the black screen of death. If we pay close attention to the error message in the logs, we can get a hint of what’s happening. <strong>URL</strong> is not a constructor. `URL()` constructor is a client feature. Therefore, somehow NextJS was still trying to render this code on the server.

## Lazy Loading to the rescue

Luckily for us, next provides a way to lazy load components by using `next/dynamic` with the option to turn off Server Side Rendering (SSR). This ensures that components are strictly rendered on the client.

![Screenshot of nextjs lazy loading feature explained in the official docs](images/screenshot-nextjs-docs-lazy-loading.png)

## Implementing the solution

To implement the component using `next/dynamic`, I had to do some refactoring. I moved the code from `page.tsx` to a separate component file which I called `StreamMicrophone.tsx` . We don’t need to use a `useEffect()` now so I got rid of it.

```typescript
// StreamMicrophone.tsx
// Imports
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
...

const StreamMicrophone = () => {
  const startRecordingRef = useRef<HTMLButtonElement | null>(null);
  const stopRecordingRef = useRef<HTMLButtonElement | null>(null);
  let recordAudio: RecordRTC;
  ...
  const handleStartRecording = () => {
    const browserNavigator = window.navigator;
    if (startRecordingRef.current && stopRecordingRef.current) {
      startRecordingRef.current.disabled = true;
      stopRecordingRef.current.disabled = false;
    }
    if (browserNavigator.mediaDevices) {
      browserNavigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream: MediaStream) => {
          recordAudio = new RecordRTC(stream, {...});
          recordAudio.startRecording();
        });
    } else {
      console.log("getUserMedia NOT supported.");
    }
  };
  ...

  return (// buttons);
};

export default StreamMicrophone;
```

Then in page.tsx I simply had to dynamically import the new component and set `ssr` to `false`.

```typescript
// Page.tsx
import React from 'react';
import dynamic from 'next/dynamic';

export default function Dashboard() {
  const DynamicStreamMicrophone = dynamic(() => import('./StreamMicrophone'), { ssr: false });
  return (
    <>
    <DynamicStreamMicrophone />
    </>
  );
```

And that was it. Now the error 500 was gone and the page was properly being rendered. As observed, it can be a bit tricky to debug these kinds of errors, which is why it's always important to keep in mind how NextJS works behind the scenes so that you can pinpoint the exact source of the issue
