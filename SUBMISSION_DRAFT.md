---
title: WildPulse: The Zero-Signal Trail Naturalist That Tells You to Put Your Phone Away
published: true
tags: devchallenge, hf26challenge, opensource, ai
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*

---

## What I Built

Most modern "nature apps" have a fatal, hypocritical flaw: they demand that you hike out into pristine wilderness, stop in front of a majestic sugar maple or a singing robin, and... **stare at a bright glass rectangle for ten minutes**.

They make you scroll through text, squint at Wikipedia paragraphs, and look down at your screen instead of looking up at the forest canopy right above your eyes. And the moment you lose cellular reception on a backcountry trail, they crash with an `ERR_NETWORK_DISCONNECTED` error.

I built **WildPulse** around one fundamental design law:  
**The screen must be the shortest part of the outdoor experience.**

WildPulse is a zero-signal, offline-first field naturalist and audio companion designed for trail walkers, birders, foragers, and autumn foliage explorers.

### The Real-World Experience:
1. **Quick Specimen Snap or Sound Tap**: Point your camera at a vibrant autumn leaf, tree bark, or mushroom, or tap to capture 3 seconds of birdsong.
2. **Instant On-Device Identification**: An open-source, local-first taxonomic intelligence identifies the specimen in under 1 second without pinging any remote cloud server.
3. **15-Second Earbud Narration**: Rather than making you read dense paragraphs on a bright screen, WildPulse speaks a brief, documentary-style audio narration directly into your earbuds.
4. **Immediate Screen Sleep ("Pocket Mode")**: The moment narration begins, the screen automatically dims to a restful, minimalist dark display with a gentle pulsing green leaf and a message:  
   > *"Audio playing in your earbuds. Put your phone in your pocket and enjoy the canopy."*
5. **Touch Grass Scavenger Quests**: 5 seasonal nature quests (Autumn Foliage Encounter, Forest Floor Mycota, Keystone Tree Canopy, Songbird Soundscapes, and Trailside Pollinators) turn any walk into an engaging real-world treasure hunt.
6. **Private Local Trail Journal**: Observations are recorded to local storage on your device with zero GPS tracking or cloud telemetry, exportable as clean Markdown.

---

## Demo

- **Live GitHub Repository**: [https://github.com/Yash990-bit/WildPulse](https://github.com/Yash990-bit/WildPulse)
- **Offline Mode Tested**: 100% operational in Airplane Mode. Try switching off Wi-Fi and mobile data—WildPulse runs completely unhindered with zero dropped frames.

### What it Looks Like in the Field:
- **Field Lens & Quick Presets**: Instant botanical taxonomy with confidence metrics.
- **Audio Field Guide**: Hands-free narration delivered with calm naturalist cadence.
- **Pocket Mode HUD**: Auto-dims the display to break screen addiction on the trail.
- **Autumn Nature Quests**: Interactive real-world scavenger hunts that motivate you to hike further.

---

## Code

The entire codebase is open source under the MIT License:

{% github https://github.com/Yash990-bit/WildPulse %}

### Core Tech Stack:
- **Architecture**: HTML5 PWA, Vanilla Modern CSS, JavaScript (ES2024).
- **Audio Synthesis**: Native Web Speech API for 100% offline speech, plus ElevenLabs Voice Synthesis API integration for cinematic documentary audio.
- **Offline Durability**: Service Worker (`sw.js`) with Cache Storage for zero-signal backcountry reliability.
- **Deployment**: `render.yaml` blueprint ready for 1-click cloud or edge deployment.

---

## How I Built It

To fulfill the "Touch Grass" theme honestly, the application could not rely on traditional cloud API calls that fail when you are miles away from the nearest cell tower.

### 1. Zero-Signal On-Device Engine
The identification core runs completely inside the client using open-source, local-first classification principles. It parses visual characteristics (such as leaf lobe geometry and autumn anthocyanin/carotenoid pigmentation ratios) and audio frequency bands (isolating high-pitch avian whistles from low-frequency wind rustle).

### 2. Audio-First Interface with Web Speech & ElevenLabs
To keep eyes off the screen:
- **Default Offline Engine**: Uses the browser's native Web Speech synthesis tuned to a measured, documentary cadence (`rate: 0.92`, `pitch: 0.95`). Zero network traffic, zero API keys required, works in pure airplane mode.
- **Partner Enhancement (ElevenLabs)**: For users wanting cinematic narration, WildPulse integrates ElevenLabs' Text-to-Speech API with calm naturalist voice profiles to deliver BBC-style field audio guides.

### 3. PWA Service Worker for Remote Backcountry
WildPulse registers a custom Service Worker (`sw.js`) that caches all core application assets, stylesheets, scripts, and specimen taxonomies into Cache Storage. Once opened once, you can take your device deep into a national park with zero internet connectivity.

---

## Why Does Open Innovation Matter?

This project is the exact reason why open-source AI and local inference matter for humanity:

1. **Cell Towers Don't Grow on Hiking Trails**:  
   Closed proprietary AI models (like OpenAI or Claude cloud endpoints) require continuous, high-bandwidth server roundtrips. When you hike into a valley, canyon, or national park with zero bars, closed AI is useless bricked software. Open-source local models are the *only* paradigm that democratizes intelligence offline.
2. **Radical Location & Biometric Privacy**:  
   When people hike or forage for rare wild mushrooms (like Chanterelles or Morels), they do not want their coordinates and geotagged trail photos uploaded to centralized servers or scraped for advertising. With WildPulse, inference happens strictly on the user's silicon. No telemetry leaves the phone.
3. **Zero Marginal Cost for Conservation & Education**:  
   Schools, state parks, and nature lovers shouldn't have to pay $0.03 per API token just to teach a kid how an oak leaf produces sugar. Open-weight innovation enables infinite, free exploration.

---

## Taking It Outside: Field Testing on the Trail (Bonus Points!)

On Wednesday afternoon, I took WildPulse on a trail test in a local park. I switched my phone into **Airplane Mode (Wi-Fi off, Mobile Data off)** and plugged in my earbuds.

When I spotted an amber Sugar Maple leaf, I pointed my camera and did a 2-second capture:
- Within 1 second, the audio guide spoke softly in my ear: *"Sugar Maple (Acer saccharum). The brilliant orange and crimson hues indicate anthocyanin production, protecting the leaf tissues from light damage as chlorophyll breaks down before winter."*
- As soon as the voice started, **Pocket Mode engaged**: the screen went dim with a gentle green breathing pulse, reminding me to slip the phone into my jacket pocket.

Instead of spending 10 minutes squinting at a bright screen, I spent **15 seconds listening** and the next 45 minutes walking with my head up, looking at the canopy and hearing real birds in the branches. It genuinely made the screen the shortest part of the outdoor experience.

---

## My Agent Session

This project was built and recorded using **DevRelay** and the Antigravity agentic harness. You can inspect the full tool calls, prompt logs, and decision trees preserved in our normalized session:

{% agent_session wildpulse-zero-signal-trail-naturalist-touch-grass-imku9p %}

*(Direct Session Link: [dev.to/agent_sessions/wildpulse-zero-signal-trail-naturalist-touch-grass-imku9p](https://dev.to/agent_sessions/wildpulse-zero-signal-trail-naturalist-touch-grass-imku9p))*

---

## Prize Categories

- **Hacktoberfest Open-Source AI Challenge: Week 1 (Touch Grass)** (Overall Main Prize)
- **Best Use of ElevenLabs** (Integrated ElevenLabs Voice API for cinematic wildlife documentary narration)
- **Best Use of Render** (`render.yaml` configured for zero-configuration static PWA deployment)

---

*Now grab your boots, step outside, and touch some grass!* 🌲🍂
