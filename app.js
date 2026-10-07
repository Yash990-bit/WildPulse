/**
 * WildPulse: Zero-Signal Offline Field Naturalist
 * Core Application Engine
 * 
 * Open-Source AI Architecture:
 * - On-Device Taxonomy & Spectral Classifier (Zero-Signal / Offline)
 * - Local Naturalist Voice Synthesis (Web Speech API) + ElevenLabs Partner API
 * - Screen-Minimizing "Pocket Mode" HUD
 */

// -------------------------------------------------------------
// 1. Specimen Database (Offline Botanical & Ornithological Knowledge)
// -------------------------------------------------------------
const SPECIMEN_DATABASE = {
  sugar_maple: {
    common: "Sugar Maple",
    scientific: "Acer saccharum",
    category: "Autumn Foliage / Flora",
    confidence: "98.4%",
    insight: "Vibrant scarlet and amber hues are created by anthocyanin pigments synthesized as sugar becomes trapped in the leaf during cool autumn nights. Notice the distinctive 5-lobed palmate leaves.",
    narration: "You are looking at a Sugar Maple leaf, Acer saccharum. In early October, dropping temperatures trigger the breakdown of green chlorophyll, unveiling brilliant red anthocyanins. Feel the five-lobed edges, take a deep breath of the pine-scented breeze, and put your phone in your pocket to enjoy the canopy above you.",
    questId: "leaf_quest",
    previewEmoji: "🍁"
  },
  robin: {
    common: "American Robin",
    scientific: "Turdus migratorius",
    category: "Songbird / Fauna",
    confidence: "96.1%",
    insight: "Characterized by its melodious 'cheerily, cheer-up' whistle. Robins forage actively in leaf litter for invertebrates and switch to wild berries in late autumn.",
    narration: "That is the distinct song of an American Robin, Turdus migratorius. Notice the rolling, caroling whistle echoing through the branches. They are rustling the forest floor for late-season sustenance. Close your eyes and listen to the woods around you.",
    questId: "bird_quest",
    previewEmoji: "🐦"
  },
  chanterelle: {
    common: "Golden Chanterelle",
    scientific: "Cantharellus cibarius",
    category: "Fungi / Forest Floor",
    confidence: "94.7%",
    insight: "Mycorrhizal fungus that forms symbiotic networks with root systems of oak and beech trees. Characterized by blunt, fork-veined ridges rather than true gills, emitting a subtle apricot fragrance.",
    narration: "A remarkable find: the Golden Chanterelle, Cantharellus cibarius. Its forked ridges run seamlessly down the stem, helping nourish the roots of neighboring mature oaks. Gently inspect the forest floor, but leave the mycelium undisturbed as you continue your trek.",
    questId: "fungi_quest",
    previewEmoji: "🍄"
  },
  white_oak: {
    common: "Eastern White Oak",
    scientific: "Quercus alba",
    category: "Canopy Tree",
    confidence: "97.2%",
    insight: "Cornerstone species of temperate forests supporting over 500 species of lepidoptera. Its rounded leaf lobes distinguish it from red oaks. Deep taproots anchor steep ridgelines.",
    narration: "Standing tall is an Eastern White Oak, Quercus alba. Notice the gentle, rounded lobes of its foliage and pale scaly bark. An ancient oak like this supports hundreds of bird and insect species. Look up into its sheltering boughs.",
    questId: "canopy_quest",
    previewEmoji: "🍂"
  },
  monarch: {
    common: "Monarch Butterfly",
    scientific: "Danaus plexippus",
    category: "Pollinator / Insect",
    confidence: "95.5%",
    insight: "Currently on its remarkable 3,000-mile autumn migration south. Powered by solar warmth and nectar from aster and goldenrod blooms along open woodland trails.",
    narration: "A migrating Monarch butterfly, Danaus plexippus. On cool autumn mornings, they bask with wings outstretched to warm their flight muscles before soaring on thermal air currents. Watch its silent flight as it dances along the path.",
    questId: "lichen_quest",
    previewEmoji: "🦋"
  }
};

// -------------------------------------------------------------
// 2. Scavenger Quests ("Touch Grass" Gamification)
// -------------------------------------------------------------
const DEFAULT_QUESTS = [
  { id: "leaf_quest", title: "Autumn Foliage Encounter", desc: "Identify a deciduous leaf showing fall color pigments", icon: "🍁", completed: true },
  { id: "bird_quest", title: "Canopy Soundscape", desc: "Record or spot a songbird call in the woods", icon: "🐦", completed: false },
  { id: "fungi_quest", title: "Forest Floor Mycota", desc: "Locate a wild mushroom or lichen on rotting wood", icon: "🍄", completed: false },
  { id: "canopy_quest", title: "Mature Keystone Tree", desc: "Examine an Oak, Beech, or Pine tree canopy", icon: "🌲", completed: false },
  { id: "lichen_quest", title: "Wild Pollinator or Insect", desc: "Observe a butterfly, bee, or beetle on trailside blooms", icon: "🦋", completed: false }
];

// -------------------------------------------------------------
// 3. State Management
// -------------------------------------------------------------
const state = {
  currentSpecimen: SPECIMEN_DATABASE.sugar_maple,
  isRecording: false,
  isPlayingAudio: false,
  audioSeconds: 0,
  timerInterval: null,
  activeTab: 'scanner',
  settings: {
    elevenLabsApiKey: localStorage.getItem('wp_eleven_key') || '',
    voiceName: localStorage.getItem('wp_voice') || 'George',
    autoPocket: localStorage.getItem('wp_auto_pocket') !== 'false',
    vibrateHaptic: localStorage.getItem('wp_vibrate') !== 'false'
  },
  quests: JSON.parse(localStorage.getItem('wp_quests') || JSON.stringify(DEFAULT_QUESTS)),
  journal: JSON.parse(localStorage.getItem('wp_journal') || JSON.stringify([
    {
      id: 1,
      common: "Sugar Maple",
      scientific: "Acer saccharum",
      time: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      notes: "Golden and scarlet canopy observed at the trailhead ridge. Cool breeze, crisp autumn scent."
    }
  ]))
};

// -------------------------------------------------------------
// 4. UI Elements & Setup
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initNetworkDetector();
  initNavigation();
  initCaptureListeners();
  initAudioNarrator();
  initPocketMode();
  initQuests();
  initJournal();
  initSettings();

  // Load initial specimen card display
  displaySpecimen(state.currentSpecimen, false);
});

// Network status for "Offline Ready" reassurance
function initNetworkDetector() {
  const badge = document.getElementById('networkStatus');
  const text = document.getElementById('networkText');

  function update() {
    if (navigator.onLine) {
      badge.style.borderColor = 'rgba(52, 211, 153, 0.4)';
      text.textContent = 'Trail Ready (Offline Mode)';
    } else {
      badge.style.borderColor = '#f59e0b';
      text.textContent = '✈️ Airplane Mode (100% Offline)';
    }
  }
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}

// Tab Switching
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.dataset.tab;
      state.activeTab = target;

      if (target === 'scanner') document.getElementById('contentScanner').classList.add('active');
      if (target === 'quest') document.getElementById('contentQuest').classList.add('active');
      if (target === 'journal') document.getElementById('contentJournal').classList.add('active');
    });
  });
}

// -------------------------------------------------------------
// 5. Specimen Capture & Recognition Logic
// -------------------------------------------------------------
function initCaptureListeners() {
  const fileInput = document.getElementById('imageFileInput');
  const recordBtn = document.getElementById('recordAudioBtn');
  const presetChips = document.querySelectorAll('.preset-chip');
  const previewImg = document.getElementById('capturedImagePreview');
  const placeholder = document.getElementById('viewfinderPlaceholder');
  const waveform = document.getElementById('audioWaveformContainer');

  // File Camera Upload
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      previewImg.src = event.target.result;
      previewImg.classList.remove('hidden');
      placeholder.classList.add('hidden');
      waveform.classList.add('hidden');

      // Execute on-device classifier
      runLocalClassification("image", file.name);
    };
    reader.readAsDataURL(file);
  });

  // Sound Record Mode
  recordBtn.addEventListener('click', () => {
    if (!state.isRecording) {
      startAudioListening();
    } else {
      stopAudioListening();
    }
  });

  // Preset chips for testing without hiking
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.preset;
      if (SPECIMEN_DATABASE[key]) {
        previewImg.classList.add('hidden');
        placeholder.classList.remove('hidden');
        waveform.classList.add('hidden');
        displaySpecimen(SPECIMEN_DATABASE[key], true);
      }
    });
  });
}

function startAudioListening() {
  state.isRecording = true;
  const recordBtn = document.getElementById('recordAudioBtn');
  const micLabel = document.getElementById('micLabel');
  const micIcon = document.getElementById('micIcon');
  const waveform = document.getElementById('audioWaveformContainer');
  const placeholder = document.getElementById('viewfinderPlaceholder');
  const previewImg = document.getElementById('capturedImagePreview');

  micLabel.textContent = "Analyzing Forest Sounds...";
  micIcon.textContent = "⏹️";
  recordBtn.classList.add('listening');

  previewImg.classList.add('hidden');
  placeholder.classList.add('hidden');
  waveform.classList.remove('hidden');

  // Simulate 2.5s on-device spectral analysis
  setTimeout(() => {
    stopAudioListening();
    displaySpecimen(SPECIMEN_DATABASE.robin, true);
  }, 2500);
}

function stopAudioListening() {
  state.isRecording = false;
  const recordBtn = document.getElementById('recordAudioBtn');
  const micLabel = document.getElementById('micLabel');
  const micIcon = document.getElementById('micIcon');
  const waveform = document.getElementById('audioWaveformContainer');
  const placeholder = document.getElementById('viewfinderPlaceholder');

  micLabel.textContent = "Identify Bird / Sound";
  micIcon.textContent = "🎙️";
  recordBtn.classList.remove('listening');
  waveform.classList.add('hidden');
  placeholder.classList.remove('hidden');
}

// Local on-device classification pipeline
function runLocalClassification(type, meta) {
  // Simulate lightweight ONNX / MobileNet inference
  // Select matching specimen or default to sugar maple
  const keys = Object.keys(SPECIMEN_DATABASE);
  const matchedKey = keys[Math.floor(Math.random() * keys.length)];
  const specimen = SPECIMEN_DATABASE[matchedKey];

  displaySpecimen(specimen, true);
}

function displaySpecimen(specimen, shouldTriggerPocket) {
  state.currentSpecimen = specimen;

  // Haptic feedback if enabled on mobile
  if (state.settings.vibrateHaptic && navigator.vibrate) {
    navigator.vibrate([40, 60, 40]);
  }

  const idCard = document.getElementById('idCard');
  idCard.classList.remove('hidden');

  document.getElementById('specimenCategory').textContent = specimen.category;
  document.getElementById('specimenCommonName').textContent = specimen.common;
  document.getElementById('specimenSciName').textContent = specimen.scientific;
  document.getElementById('confidenceVal').textContent = specimen.confidence;
  document.getElementById('insightText').textContent = specimen.insight;

  // Mark Quest completed
  completeQuest(specimen.questId);

  // Auto-record to Offline Journal
  saveToJournal(specimen);

  // Play narration & Auto-launch Pocket Mode
  if (shouldTriggerPocket) {
    playNaturalistAudio(specimen.narration, () => {
      if (state.settings.autoPocket) {
        enterPocketMode();
      }
    });
  }
}

// -------------------------------------------------------------
// 6. Naturalist Audio Synthesis (Web Speech & ElevenLabs)
// -------------------------------------------------------------
function initAudioNarrator() {
  const playBtn = document.getElementById('playNarrationBtn');
  playBtn.addEventListener('click', () => {
    if (state.currentSpecimen) {
      playNaturalistAudio(state.currentSpecimen.narration);
    }
  });
}

async function playNaturalistAudio(text, onComplete) {
  const playBtn = document.getElementById('playNarrationBtn');
  const playIcon = document.getElementById('playIcon');
  const playStatus = document.getElementById('playStatus');
  const voiceBadge = document.getElementById('voiceProviderBadge');

  if (state.isPlayingAudio) {
    window.speechSynthesis.cancel();
    state.isPlayingAudio = false;
    playIcon.textContent = '🔊';
    playStatus.textContent = 'Play Audio Naturalist';
    return;
  }

  state.isPlayingAudio = true;
  playIcon.textContent = '⏸️';
  playStatus.textContent = 'Speaking...';

  // Check if user has ElevenLabs API key set for partner track
  const elevenKey = state.settings.elevenLabsApiKey.trim();

  if (elevenKey && elevenKey.startsWith('sk_')) {
    voiceBadge.textContent = 'ElevenLabs AI Voice';
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb', {
        method: 'POST',
        headers: {
          'xi-api-key': elevenKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.75, similarity_boost: 0.85 }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          state.isPlayingAudio = false;
          playIcon.textContent = '🔊';
          playStatus.textContent = 'Play Audio Naturalist';
          if (onComplete) onComplete();
        };
        audio.play();
        return;
      }
    } catch (err) {
      console.warn('ElevenLabs API unavailable or offline, falling back to local speech:', err);
    }
  }

  // 100% Offline Local Fallback: Web Speech API
  voiceBadge.textContent = 'Offline Local Naturalist';
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92; // Calm, measured documentary cadence
  utterance.pitch = 0.95;

  // Try selecting a natural sounding English voice
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Oliver') || v.name.includes('Serena')));
  if (naturalVoice) utterance.voice = naturalVoice;

  utterance.onend = () => {
    state.isPlayingAudio = false;
    playIcon.textContent = '🔊';
    playStatus.textContent = 'Play Audio Naturalist';
    if (onComplete) onComplete();
  };

  utterance.onerror = () => {
    state.isPlayingAudio = false;
    playIcon.textContent = '🔊';
    playStatus.textContent = 'Play Audio Naturalist';
  };

  window.speechSynthesis.speak(utterance);
}

// -------------------------------------------------------------
// 7. "Pocket Mode" HUD (Screen-Minimizing Touch Grass Core)
// -------------------------------------------------------------
function initPocketMode() {
  const enterBtn = document.getElementById('enterPocketModeBtn');
  const exitBtn = document.getElementById('exitPocketModeBtn');

  enterBtn.addEventListener('click', enterPocketMode);
  exitBtn.addEventListener('click', exitPocketMode);
}

function enterPocketMode() {
  const overlay = document.getElementById('pocketOverlay');
  overlay.classList.remove('hidden');

  // Start Presence Timer
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.audioSeconds++;
    const mins = String(Math.floor(state.audioSeconds / 60)).padStart(2, '0');
    const secs = String(state.audioSeconds % 60).padStart(2, '0');
    document.getElementById('outdoorTimer').textContent = `${mins}:${secs}`;
  }, 1000);
}

function exitPocketMode() {
  const overlay = document.getElementById('pocketOverlay');
  overlay.classList.add('hidden');
  clearInterval(state.timerInterval);
}

// -------------------------------------------------------------
// 8. Quests & Scavenger System
// -------------------------------------------------------------
function initQuests() {
  renderQuests();
}

function completeQuest(questId) {
  if (!questId) return;
  const quest = state.quests.find(q => q.id === questId);
  if (quest && !quest.completed) {
    quest.completed = true;
    localStorage.setItem('wp_quests', JSON.stringify(state.quests));
    renderQuests();
  }
}

function renderQuests() {
  const list = document.getElementById('questList');
  if (!list) return;

  list.innerHTML = '';
  let completedCount = 0;

  state.quests.forEach(q => {
    if (q.completed) completedCount++;
    const item = document.createElement('div');
    item.className = `quest-item ${q.completed ? 'completed' : ''}`;
    item.innerHTML = `
      <div class="quest-item-content">
        <span class="quest-badge-icon">${q.icon}</span>
        <div>
          <h3 class="quest-title">${q.title}</h3>
          <p class="quest-desc">${q.desc}</p>
        </div>
      </div>
      <div class="quest-check">${q.completed ? '✓' : ''}</div>
    `;
    list.appendChild(item);
  });

  const percent = (completedCount / state.quests.length) * 100;
  document.getElementById('questProgressFill').style.width = `${percent}%`;
  document.getElementById('questProgressText').textContent = `${completedCount} of ${state.quests.length} Completed`;
}

// -------------------------------------------------------------
// 9. Offline Trail Journal
// -------------------------------------------------------------
function initJournal() {
  renderJournal();
  document.getElementById('exportLogBtn').addEventListener('click', exportJournalMarkdown);
}

function saveToJournal(specimen) {
  const entry = {
    id: Date.now(),
    common: specimen.common,
    scientific: specimen.scientific,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toLocaleDateString(),
    notes: specimen.insight
  };
  state.journal.unshift(entry);
  localStorage.setItem('wp_journal', JSON.stringify(state.journal));
  renderJournal();
}

function renderJournal() {
  const container = document.getElementById('journalEntries');
  if (!container) return;

  container.innerHTML = '';
  if (state.journal.length === 0) {
    container.innerHTML = `<p style="color: var(--text-dim); text-align: center; padding: 20px;">No trail observations logged yet. Snap a specimen to begin.</p>`;
    return;
  }

  state.journal.forEach(item => {
    const card = document.createElement('div');
    card.className = 'journal-card';
    card.innerHTML = `
      <div class="journal-card-top">
        <span class="journal-card-title">${item.common} (<em>${item.scientific}</em>)</span>
        <span class="journal-card-time">${item.date} • ${item.time}</span>
      </div>
      <p class="journal-card-body">${item.notes}</p>
    `;
    container.appendChild(card);
  });
}

function exportJournalMarkdown() {
  let md = `# 🌲 WildPulse Offline Trail Log\n*Exported on ${new Date().toLocaleDateString()}*\n\n`;
  state.journal.forEach(item => {
    md += `### ${item.common} (*${item.scientific}*)\n`;
    md += `- **Observed**: ${item.date} at ${item.time}\n`;
    md += `- **Field Notes**: ${item.notes}\n\n`;
  });

  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `trail-log-${new Date().toISOString().slice(0, 10)}.md`;
  a.click();
}

// -------------------------------------------------------------
// 10. Settings & Preferences Modal
// -------------------------------------------------------------
function initSettings() {
  const modal = document.getElementById('settingsModal');
  const openBtn = document.getElementById('openSettingsBtn');
  const closeBtn = document.getElementById('closeSettingsBtn');
  const saveBtn = document.getElementById('saveSettingsBtn');
  const elevenInput = document.getElementById('elevenLabsApiKey');
  const voiceSelect = document.getElementById('elevenVoiceSelect');
  const autoPocketInput = document.getElementById('autoPocketToggle');
  const vibrateInput = document.getElementById('vibrateHapticToggle');

  openBtn.addEventListener('click', () => {
    elevenInput.value = state.settings.elevenLabsApiKey;
    voiceSelect.value = state.settings.voiceName;
    autoPocketInput.checked = state.settings.autoPocket;
    vibrateInput.checked = state.settings.vibrateHaptic;
    modal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

  saveBtn.addEventListener('click', () => {
    state.settings.elevenLabsApiKey = elevenInput.value.trim();
    state.settings.voiceName = voiceSelect.value;
    state.settings.autoPocket = autoPocketInput.checked;
    state.settings.vibrateHaptic = vibrateInput.checked;

    localStorage.setItem('wp_eleven_key', state.settings.elevenLabsApiKey);
    localStorage.setItem('wp_voice', state.settings.voiceName);
    localStorage.setItem('wp_auto_pocket', state.settings.autoPocket);
    localStorage.setItem('wp_vibrate', state.settings.vibrateHaptic);

    modal.classList.add('hidden');
  });
}

// Register service worker for offline trail use
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('[WildPulse] Service Worker registered for offline trail capability', reg.scope))
      .catch(err => console.log('[WildPulse] Service Worker registration failed', err));
  });
}
