---
title: WildPulse: The Zero-Signal Trail Naturalist That Tells You to Put Your Phone Away
published: false
tags: devchallenge, hf26challenge, opensource, ai
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*

---

## What I Built

Most modern "nature apps" have a fatal flaw: they demand that you hike out into pristine wilderness, stop in front of a majestic sugar maple or a singing robin, and... **stare at a bright glass rectangle for ten minutes**.

They make you scroll through text, read Wikipedia paragraphs, and look at your screen instead of the forest canopy right above your eyes. And the moment you lose cell reception on a remote mountain trail, they crash entirely.

I built **WildPulse** around one fundamental design law:  
**The screen must be the shortest part of the outdoor experience.**

WildPulse is a zero-signal, offline-first field naturalist and audio companion designed for trail walkers, birders, foragers, and autumn foliage explorers.

### The Experience:
1. **Quick Specimen Snap or Sound Tap**: Point your camera at a vibrant autumn leaf, tree bark, or mushroom, or tap to capture 3 seconds of birdsong.
2. **Instant On-Device Identification**: An open-source, local-first taxonomic intelligence identifies the specimen without pinging any external server.
3. **15-Second Earbud Narration**: Rather than making you read dense paragraphs, WildPulse speaks a brief, documentary-style audio narration directly into your headphones.
4. **Immediate Screen Sleep ("Pocket Mode")**: The moment the narration begins, the screen dims to a restful, minimalist dark display with a gentle pulsing leaf and a message:  
   > *"Audio playing in your earbuds. Put your phone in your pocket and enjoy the canopy."*
5. **Touch Grass Scavenger Quests**: 5 seasonal nature quests (Autumn Foliage Encounter, Forest Floor Mycota, Keystone Tree Canopy, Songbird Soundscapes, and Trailside Pollinators) to turn your hike into an engaging real-world treasure hunt.
6. **Private Local Trail Journal**: Observations are recorded to local storage on your device with zero GPS tracking or cloud telemetry, and can be exported as clean Markdown.

---

## Demo

- **Live PWA App**: *(Deployable on Render / GitHub Pages / local browser)*
- **Offline Mode**: Fully operational in Airplane Mode. Try switching off Wi-Fi and mobile data—WildPulse runs completely unhindered.

### Screenshots & Walkthrough

1. **Field Lens & Quick Presets**: Instant identification with confidence metrics and botanical taxonomy.
2. **Audio Field Guide**: Hands-free narration delivered with British documentary cadence.
3. **Pocket Mode HUD**: Auto-dims the display to discourage screen addiction on the trail.
4. **Autumn Nature Quests**: Interactive real-world scavenger hunts.

---

## Code

The entire codebase is open source under the MIT License:
- **Repository**: [GitHub Repository](https://github.com/your-username/wildpulse)
- **Tech Stack**: HTML5, Vanilla Modern CSS, JavaScript (ES2024), Web Speech API, Progressive Web App Service Worker, ElevenLabs Voice Synthesis API.

---

## How I Built It

To fulfill the "Touch Grass" theme honestly, the application could not rely on traditional cloud API calls that fail when you are miles away from the nearest cell tower.

### 1. Zero-Signal On-Device Engine
The identification core runs completely inside the client using open-weight local classification and spectral analysis principles. It parses visual characteristics (such as leaf lobe geometry and autumn anthocyanin/carotenoid pigmentation ratios) and audio frequency bands (isolating high-pitch avian whistles from low-frequency wind rustle).

### 2. Audio-First Interface with Web Speech & ElevenLabs
To keep eyes off the screen:
- **Default Offline Engine**: Uses the browser's native Web Speech synthesis tuned to a measured, documentary cadence (`rate: 0.92`, `pitch: 0.95`). Zero network traffic, zero API keys required, works on airplane mode.
- **Partner Enhancement (ElevenLabs)**: For users wanting cinematic narration, WildPulse integrates ElevenLabs' Text-to-Speech API (with calm naturalist voice profiles) to deliver field audio guides.

### 3. PWA Service Worker for Remote Backcountry
WildPulse registers a custom Service Worker (`sw.js`) that caches all core application assets, stylesheets, scripts, and specimen taxonomies into the browser's Cache Storage. Once loaded once, you can take your device deep into a national park with zero internet connectivity.

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

## My Agent Session

This project was built and designed with Antigravity and DevRelay, focusing on clean architecture, responsive accessibility, and lightweight offline durability.

{% agent_session %}
<!-- DevRelay Session link can be embedded here -->
{% endagent_session %}

---

## Prize Categories

- **Hacktoberfest Open-Source AI Challenge: Week 1 (Touch Grass)**: Primary category.
- **ElevenLabs Partner Category**: Integrated ElevenLabs Voice API for cinematic wildlife documentary narration.
- **Render Partner Category**: Configured for static PWA cloud deployment.

---

*Now grab your boots, step outside, and touch some grass!* 🌲🍂
