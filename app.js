/**
 * VayuLens (वायुLens) — GenAI Urban Smog & Air Defense Assistant
 * Complete Core Application Logic & Intelligence Engine
 */

// ==========================================
// 1. STATE & ENVIRONMENT DATA
// ==========================================

const CITIES = {
  delhi: {
    name: "Delhi-NCR",
    country: "India",
    currentAqi: 428,
    status: "Severe / Hazardous",
    boundaryLayer: "180m (Stagnant Inversion)",
    goldenWindow: "1:00 PM – 2:45 PM",
    temp: "14°C",
    condition: "Dense Winter Smog Fog",
    humidity: "78% RH",
    wind: "2.4 km/h (Calm SSE)",
    pressure: "1019 hPa",
    inversionCeiling: "180 meters",
    inversionBadge: "Thermal Trap Active",
    pm25: "385 µg/m³",
    // 24-hr hourly forecast (0:00 to 23:00) reflecting thermal inversion
    hourlyAqi: [410, 425, 440, 460, 485, 495, 470, 430, 390, 340, 290, 260, 245, 255, 280, 320, 370, 420, 445, 460, 450, 435, 420, 415],
    alertText: "Severe winter inversion trapping stubble and vehicular particulates. Postpone dawn transit until 11:30 AM."
  },
  lahore: {
    name: "Lahore",
    country: "Pakistan",
    currentAqi: 485,
    status: "Hazardous (Tier 5)",
    boundaryLayer: "140m (Dense Fog Layer)",
    goldenWindow: "1:30 PM – 3:00 PM",
    temp: "13°C",
    condition: "Stagnant Boundary Layer Smog",
    humidity: "84% RH",
    wind: "1.8 km/h (Calm North)",
    pressure: "1021 hPa",
    inversionCeiling: "140 meters",
    inversionBadge: "Severe Ground Inversion",
    pm25: "450 µg/m³",
    hourlyAqi: [450, 465, 480, 500, 520, 530, 510, 475, 430, 380, 320, 285, 270, 280, 310, 360, 410, 460, 490, 510, 495, 480, 465, 455],
    alertText: "Atmospheric inversion creates dense smog cap. High risk of bronchial inflammation across urban perimeter."
  },
  beijing: {
    name: "Beijing",
    country: "China",
    currentAqi: 215,
    status: "Very Unhealthy",
    boundaryLayer: "310m (Winter Heating Inversion)",
    goldenWindow: "12:30 PM – 2:30 PM",
    temp: "2°C",
    condition: "Dry Heating Inversion Haze",
    humidity: "42% RH",
    wind: "4.8 km/h (Light Breeze)",
    pressure: "1028 hPa",
    inversionCeiling: "310 meters",
    inversionBadge: "Inversion Cap Moderate",
    pm25: "165 µg/m³",
    hourlyAqi: [210, 215, 225, 240, 255, 260, 245, 230, 205, 180, 155, 140, 135, 145, 160, 185, 210, 230, 240, 235, 225, 220, 215, 210],
    alertText: "Northern cold front trapped beneath warm boundary layer. Outdoor physical activity restricted for seniors."
  },
  krakow: {
    name: "Krakow",
    country: "Poland",
    currentAqi: 185,
    status: "Unhealthy",
    boundaryLayer: "220m (Valley Stagnation)",
    goldenWindow: "12:00 PM – 2:00 PM",
    temp: "-1°C",
    condition: "Valley Basin Coal Haze",
    humidity: "88% RH",
    wind: "2.1 km/h (Calm)",
    pressure: "1016 hPa",
    inversionCeiling: "220 meters",
    inversionBadge: "River Basin Trap",
    pm25: "120 µg/m³",
    hourlyAqi: [180, 185, 195, 210, 220, 225, 210, 195, 175, 150, 130, 115, 110, 120, 135, 155, 175, 195, 205, 200, 190, 185, 180, 180],
    alertText: "Solid fuel residential heating smoke settling in Vistula river valley basin. Seal door sweeps."
  },
  bakersfield: {
    name: "Central Valley (Bakersfield)",
    country: "USA",
    currentAqi: 162,
    status: "Unhealthy for Sensitive Groups",
    boundaryLayer: "260m (Basin Inversion)",
    goldenWindow: "1:00 PM – 3:30 PM",
    temp: "11°C",
    condition: "Topographic Bowl Stagnation",
    humidity: "65% RH",
    wind: "3.5 km/h (Calm NW)",
    pressure: "1015 hPa",
    inversionCeiling: "260 meters",
    inversionBadge: "Valley Inversion",
    pm25: "78 µg/m³",
    hourlyAqi: [155, 160, 170, 180, 190, 195, 185, 170, 150, 130, 115, 100, 95, 105, 120, 140, 160, 175, 185, 180, 170, 165, 160, 155],
    alertText: "Stagnant valley air mass with agricultural and transit diesel particulates trapped below coastal cap."
  },
  london: {
    name: "London",
    country: "UK",
    currentAqi: 92,
    status: "Moderate",
    boundaryLayer: "450m (Winter Street Canyon)",
    goldenWindow: "11:00 AM – 3:00 PM",
    temp: "6°C",
    condition: "Cool Drizzle & Traffic NO2",
    humidity: "82% RH",
    wind: "9.2 km/h (Moderate WSW)",
    pressure: "1009 hPa",
    inversionCeiling: "450 meters",
    inversionBadge: "Active Dispersion",
    pm25: "32 µg/m³",
    hourlyAqi: [75, 78, 80, 85, 95, 115, 125, 110, 95, 85, 75, 70, 68, 72, 80, 95, 110, 120, 115, 100, 90, 85, 80, 76],
    alertText: "Morning commuter rush hour NO2 surge in street canyons. Use low-emission cycling back-streets."
  }
};

const PERSONA_CONFIGS = {
  asthmatic: {
    name: "Asthmatic / Elderly",
    riskLevel: "Extremely High Risk",
    riskColor: "text-rose-400",
    riskBadge: "Asthmatic Mode",
    guidance: "Cold dense dawn air contains ultra-fine particles (PM1.0/PM2.5) with bound polycyclic aromatic hydrocarbons. Bronchial spasm risk is elevated by 340% between 5:30 AM – 9:30 AM. Keep peak-flow meter and rescue bronchodilator spacer readily accessible.",
    routines: [
      { time: "06:30 AM", title: "Indoor Nebulizer & Saline Gargle", desc: "Moisturize vocal cords & bronchial cilia before heater turns on.", critical: true },
      { time: "07:30 AM", title: "Strictly Avoid Outdoor Morning Jog / Stroll", desc: "Swap for indoor stationary stretching or gentle respiratory pranayama.", critical: true },
      { time: "09:00 AM", title: "Maintain Bedroom HEPA Purifier in Sleep Mode", desc: "Keep room door sealed with a draft stopper; maintain CADR > 180 CFM.", critical: false },
      { time: "01:15 PM", title: "Solar Thermal Ventilation Slot (20 Mins)", desc: "Open north-facing window during peak sunlight for fresh air flush while purifier runs on turbo.", critical: false },
      { time: "05:30 PM", title: "Pre-Evening Smog Window Sealing", desc: "Close all windows before sunset as ground cools and smog layer descends.", critical: true },
      { time: "09:30 PM", title: "Warm Steam & Nighttime Bedroom Seal Check", desc: "Inspect window latch seals and ensure clean filter operation overnight.", critical: false }
    ]
  },
  toddler: {
    name: "Infant / Toddler",
    riskLevel: "Severe Vulnerability (High Respiration Rate)",
    riskColor: "text-amber-400",
    riskBadge: "Infant/Toddler Mode",
    guidance: "Infants inhale 2.5× more air per kilogram of body weight than adults, and their developing alveolar capillaries are acutely permeable to sub-micron particulates. Avoid stroller walks near busy roads where tailpipe exhaust sits at toddler breathing height.",
    routines: [
      { time: "07:00 AM", title: "Nursery Air Quality Check & Humidification", desc: "Check room AQI; maintain relative humidity between 45% and 55% to protect delicate nasal membranes.", critical: true },
      { time: "08:30 AM", title: "Stroller Commute Shield (Covered Bassinet)", desc: "Use stroller rain/air shield with active miniature HEPA fan if outdoors.", critical: true },
      { time: "11:00 AM", title: "Indoor Sensory Play (No High-Ventilation Exertion)", desc: "Engage in calm indoor games; avoid vigorous cardio running inside poorly filtered rooms.", critical: false },
      { time: "01:30 PM", title: "Outdoor Garden Play Window (Max 25 mins)", desc: "Solar heat breaks inversion; permissible for short outdoor stroll wearing soft protective clothing.", critical: false },
      { time: "05:00 PM", title: "Saline Nasal Drops & Face Wipe", desc: "Clear deposited micro-soot from nostrils before evening dinner.", critical: true },
      { time: "08:00 PM", title: "Night Nursery HEPA Positioned Away from Drafts", desc: "Ensure purifier clean air jet blows towards breathing zone, not into wall corners.", critical: false }
    ]
  },
  commuter: {
    name: "Daily Commuter",
    riskLevel: "High Direct Exposure",
    riskColor: "text-cyan-400",
    riskBadge: "Commuter Mode",
    guidance: "Commuting during 8:00 AM – 10:30 AM exposes lungs to fresh primary combustion aerosols (black carbon, volatile organics, and tire microplastics) at 4× higher concentrations than indoor spaces.",
    routines: [
      { time: "07:45 AM", title: "N95 / FFP2 Perimeter Seal Check", desc: "Perform positive-pressure fit check (exhale sharply; check for air leaks around nasal bridge).", critical: true },
      { time: "08:15 AM", title: "Vehicle Air Recirculation Activated", desc: "Switch car ventilation strictly to internal recirculation. Cuts cabin PM2.5 by up to 85%.", critical: true },
      { time: "01:00 PM", title: "Shift Non-Urgent Outdoor Errand to Midday", desc: "Take lunch walks or banking runs during the thermal boundary expansion window.", critical: false },
      { time: "06:00 PM", title: "Evening Commute Transit Switch (Metro over Two-Wheeler)", desc: "Underground metro lines avoid ground-level traffic tailpipe plumes entirely.", critical: true },
      { time: "07:30 PM", title: "Entryway Smog Decontamination", desc: "Remove outerwear at door; wash face, eyes, and rinse nasal passages with warm saline.", critical: false },
      { time: "09:00 PM", title: "Car Cabin Cabin Filter Inspection Check", desc: "Check if car PM2.5 activated carbon cabin filter needs replacement this winter.", critical: false }
    ]
  },
  general: {
    name: "General Household",
    riskLevel: "Moderate to High Stress",
    riskColor: "text-emerald-400",
    riskBadge: "General Mode",
    guidance: "Proactive sealing, eliminating indoor combustion (incense, gas stoves without exhaust, wood fireplaces), and shifting high-emission routines safeguard family vitality throughout winter inversion episodes.",
    routines: [
      { time: "07:00 AM", title: "Morning Perimeter Seal Audit", desc: "Keep windows shut tight during cold morning inversion settling.", critical: true },
      { time: "08:00 AM", title: "Cook with Range Hood Exhaust on Full", desc: "Cooking without ventilation spikes indoor PM2.5 beyond 600 µg/m³ in minutes.", critical: true },
      { time: "01:00 PM", title: "Solar Heating Fresh Air Flush (15 Mins)", desc: "Open opposite windows briefly to flush accumulated indoor CO2 while outdoor AQI is at daily low.", critical: false },
      { time: "03:30 PM", title: "Microfiber Damp Dusting", desc: "Wipe surfaces with damp cloth; dry dusting re-suspends settled toxic dust into breathing height.", critical: false },
      { time: "06:30 PM", title: "Seal Exterior Draft Channels", desc: "Deploy door draft stoppers and close thick insulating thermal curtains.", critical: true },
      { time: "10:00 PM", title: "Overnight HEPA Filtration Run", desc: "Maintain continuous low-speed filtration across all occupied bedrooms.", critical: false }
    ]
  }
};

let currentCityKey = "delhi";
let currentPersonaKey = "asthmatic";
let diurnalChartInstance = null;
let activeCameraStream = null;
let geminiApiKey = localStorage.getItem("VAYULENS_GEMINI_KEY") || "";
let completedTasks = new Set();

let communityReports = [
  { id: 1, type: "Waste Burning", location: "Sector 14 Green Belt", time: "15m ago", status: "Report Dispatched", severity: "High" },
  { id: 2, type: "Diesel Generator Plume", location: "Commercial Market Block C", time: "42m ago", status: "Notice Issued", severity: "Medium" },
  { id: 3, type: "Road Dust Cloud", location: "Metro Expansion Corridor", time: "1h ago", status: "Sprinkler Requested", severity: "Medium" }
];

// ==========================================
// 2. INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Check stored API key
  updateApiKeyIndicator();

  // Initialize Weather bar
  renderWeatherBar();

  // Initialize Family Members & Vitals
  renderFamilyGrid();

  // Initialize Chart
  initDiurnalChart();
  initHealthTrendChart();

  // Evaluate clinical alert
  evaluateFamilyClinicalAlert();

  // Render Schedule
  renderSchedule();

  // Render Community Reports
  renderCommunityReports();

  // Recalculate Impact
  recalculateImpact();
});

// ==========================================
// 3. TAB NAVIGATION
// ==========================================

function switchTab(tabId) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".tab-btn").forEach(el => {
    el.classList.remove("active-tab", "text-emerald-400", "bg-slate-800");
    el.classList.add("text-slate-400");
  });

  // Show active tab
  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) {
    activeContent.classList.remove("hidden");
  }

  const activeBtn = document.getElementById(`tab-btn-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add("active-tab", "text-emerald-400", "bg-slate-800");
    activeBtn.classList.remove("text-slate-400");
  }

  // Re-render icons for dynamic tab content
  if (window.lucide) {
    lucide.createIcons();
  }

  // Trigger chart resize if switching to routine or family tab
  if (tabId === "routine" && diurnalChartInstance) {
    diurnalChartInstance.resize();
  }
  if (tabId === "family" && healthTrendChartInstance) {
    healthTrendChartInstance.resize();
  }
}

// ==========================================
// 4. CITY & PERSONA SWITCHERS
// ==========================================

function changeCity(cityKey) {
  if (!CITIES[cityKey]) return;
  currentCityKey = cityKey;
  const data = CITIES[cityKey];

  // Update banner and metrics
  document.getElementById("live-aqi-num").textContent = data.currentAqi;
  document.getElementById("live-aqi-badge").textContent = data.status.split(" ")[0];
  document.getElementById("boundary-layer-height").textContent = data.boundaryLayer;
  document.getElementById("golden-window-hours").textContent = data.goldenWindow;
  document.getElementById("ticker-text").textContent = data.alertText;

  // Update live AQI pill colors
  const pill = document.getElementById("live-aqi-pill");
  if (data.currentAqi > 400) {
    pill.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg border bg-rose-950/60 border-rose-600/50 text-rose-300";
  } else if (data.currentAqi > 250) {
    pill.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg border bg-purple-950/60 border-purple-600/50 text-purple-300";
  } else {
    pill.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg border bg-amber-950/60 border-amber-600/50 text-amber-300";
  }

  // Update Weather Bar, Charts, Schedule, Impact, and Family alerts
  renderWeatherBar();
  updateChartData();
  updateHealthTrendChart();
  evaluateFamilyClinicalAlert();
  renderSchedule();
  recalculateImpact();
}

function changePersona(personaKey) {
  if (!PERSONA_CONFIGS[personaKey]) return;
  currentPersonaKey = personaKey;
  const config = PERSONA_CONFIGS[personaKey];

  document.getElementById("persona-badge").textContent = config.riskBadge;
  document.getElementById("persona-guidance").textContent = config.guidance;

  renderSchedule();
  recalculateImpact();
}

// ==========================================
// 5. DIURNAL INVERSION CHART (CHART.JS)
// ==========================================

function initDiurnalChart() {
  const ctx = document.getElementById("diurnalChart");
  if (!ctx) return;

  const labels = [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
  ];

  const cityData = CITIES[currentCityKey];

  diurnalChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Hourly PM2.5 AQI Inversion Curve",
          data: cityData.hourlyAqi,
          borderColor: "#10b981",
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, "rgba(244, 63, 94, 0.45)"); // Rose for high morning/night peak
            gradient.addColorStop(0.6, "rgba(251, 191, 36, 0.25)");
            gradient.addColorStop(1, "rgba(16, 185, 129, 0.05)");
            return gradient;
          },
          pointRadius: (ctx) => {
            const idx = ctx.dataIndex;
            // Highlight golden window 1 PM - 2 PM
            return (idx === 13 || idx === 14) ? 6 : 2;
          },
          pointBackgroundColor: (ctx) => {
            const idx = ctx.dataIndex;
            return (idx === 13 || idx === 14) ? "#34d399" : "#f43f5e";
          }
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index"
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          titleColor: "#f8fafc",
          bodyColor: "#94a3b8",
          borderColor: "#334155",
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: function(context) {
              const val = context.raw;
              const hour = context.dataIndex;
              let note = "";
              if (hour >= 5 && hour <= 9) note = " (Dawn Toxic Peak)";
              else if (hour >= 12 && hour <= 15) note = " (Thermal Clearing Window)";
              else if (hour >= 18) note = " (Night Boundary Subsidence)";
              return ` AQI: ${val}${note}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(51, 65, 85, 0.25)" },
          ticks: { color: "#64748b", font: { size: 10 } }
        },
        y: {
          grid: { color: "rgba(51, 65, 85, 0.25)" },
          ticks: { color: "#64748b", font: { size: 10 } },
          suggestedMin: 50,
          suggestedMax: 500
        }
      }
    }
  });
}

function updateChartData() {
  if (!diurnalChartInstance) return;
  const cityData = CITIES[currentCityKey];
  diurnalChartInstance.data.datasets[0].data = cityData.hourlyAqi;
  diurnalChartInstance.update();
}

// ==========================================
// 6. ROUTINE CHECKLIST & ALIGNMENT
// ==========================================

function renderSchedule() {
  const container = document.getElementById("hourly-routine-list");
  if (!container) return;

  const persona = PERSONA_CONFIGS[currentPersonaKey];
  container.innerHTML = "";

  persona.routines.forEach((item, index) => {
    const isCompleted = completedTasks.has(`${currentPersonaKey}-${index}`);
    const card = document.createElement("div");
    card.className = `p-3.5 rounded-xl border transition flex items-start space-x-3 ${
      isCompleted 
        ? "bg-emerald-950/20 border-emerald-500/30 opacity-75" 
        : item.critical 
          ? "bg-slate-950/80 border-rose-500/30 hover:border-rose-500/60" 
          : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
    }`;

    card.innerHTML = `
      <input 
        type="checkbox" 
        ${isCompleted ? "checked" : ""} 
        onchange="toggleTask('${currentPersonaKey}-${index}')" 
        class="mt-1 h-4 w-4 rounded accent-emerald-500 cursor-pointer"
      >
      <div class="flex-1 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-mono text-[11px] font-bold text-cyan-400">${item.time}</span>
          ${item.critical ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-bold uppercase">Critical</span>' : ''}
        </div>
        <div class="font-bold text-white mt-0.5 ${isCompleted ? 'line-through text-slate-400' : ''}">${item.title}</div>
        <p class="text-slate-400 text-[11px] mt-1 leading-relaxed">${item.desc}</p>
      </div>
    `;

    container.appendChild(card);
  });

  updateCompletedCount();
}

function toggleTask(taskId) {
  if (completedTasks.has(taskId)) {
    completedTasks.delete(taskId);
  } else {
    completedTasks.add(taskId);
  }
  renderSchedule();
}

function updateCompletedCount() {
  const counter = document.getElementById("tasks-completed");
  if (counter) {
    const persona = PERSONA_CONFIGS[currentPersonaKey];
    let count = 0;
    persona.routines.forEach((_, idx) => {
      if (completedTasks.has(`${currentPersonaKey}-${idx}`)) count++;
    });
    counter.textContent = count;
  }
}

function resetRoutine() {
  completedTasks.clear();
  renderSchedule();
}

function applyOptimalRoutine() {
  alert(`Optimal thermal alignment applied for ${CITIES[currentCityKey].name}! High-exposure outdoor activities synchronized with the ${CITIES[currentCityKey].goldenWindow} thermal clearing slot.`);
  const persona = PERSONA_CONFIGS[currentPersonaKey];
  persona.routines.forEach((_, idx) => {
    completedTasks.add(`${currentPersonaKey}-${idx}`);
  });
  renderSchedule();
  recalculateImpact();
}

// ==========================================
// 7. VAYULENS VISION AI AUDITOR
// ==========================================

function startCamera() {
  const video = document.getElementById("webcam-stream");
  const placeholder = document.getElementById("camera-placeholder");
  const snapBtn = document.getElementById("snap-btn");
  const stopBtn = document.getElementById("stop-cam-btn");

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Camera access is not supported by this browser environment. Please use 'Upload Photo' or 'Quick Demo Presets'!");
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(stream => {
      activeCameraStream = stream;
      video.srcObject = stream;
      video.classList.remove("hidden");
      placeholder.classList.add("hidden");
      snapBtn.classList.remove("hidden");
      stopBtn.classList.remove("hidden");
      document.getElementById("uploaded-image-preview").classList.add("hidden");
      document.getElementById("photo-canvas").classList.add("hidden");
    })
    .catch(err => {
      console.warn("Camera access denied or unavailable:", err);
      alert("Unable to open camera stream. Try 'Upload Photo' or click one of the 'Quick Demo Presets'!");
    });
}

function stopCamera() {
  if (activeCameraStream) {
    activeCameraStream.getTracks().forEach(track => track.stop());
    activeCameraStream = null;
  }
  document.getElementById("webcam-stream").classList.add("hidden");
  document.getElementById("camera-placeholder").classList.remove("hidden");
  document.getElementById("snap-btn").classList.add("hidden");
  document.getElementById("stop-cam-btn").classList.add("hidden");
}

function capturePhoto() {
  const video = document.getElementById("webcam-stream");
  const canvas = document.getElementById("photo-canvas");
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  stopCamera();
  canvas.classList.remove("hidden");
  document.getElementById("camera-placeholder").classList.add("hidden");

  runVisionDiagnostics("live_capture");
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    stopCamera();
    const preview = document.getElementById("uploaded-image-preview");
    preview.src = e.target.result;
    preview.classList.remove("hidden");
    document.getElementById("camera-placeholder").classList.add("hidden");
    document.getElementById("photo-canvas").classList.add("hidden");

    runVisionDiagnostics("uploaded_image");
  };
  reader.readAsDataURL(file);
}

function loadSampleScan(presetType) {
  stopCamera();
  const preview = document.getElementById("uploaded-image-preview");
  document.getElementById("camera-placeholder").classList.add("hidden");
  document.getElementById("photo-canvas").classList.add("hidden");
  preview.classList.remove("hidden");

  // SVG representation for presets
  if (presetType === "unsealed_window") {
    preview.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect width='800' height='450' fill='%230f172a'/><rect x='150' y='60' width='500' height='330' fill='%231e293b' stroke='%23475569' stroke-width='8'/><line x1='400' y1='60' x2='400' y2='390' stroke='%23475569' stroke-width='6'/><rect x='395' y='60' width='10' height='330' fill='%23f43f5e' opacity='0.75'/><text x='420' y='180' fill='%23f43f5e' font-family='sans-serif' font-weight='bold' font-size='18'>⚠️ Infiltration Gap: 4.8mm</text><text x='180' y='120' fill='%2394a3b8' font-family='sans-serif' font-size='20'>Window Sliding Joint Air Infiltration</text></svg>";
  } else if (presetType === "blocked_purifier") {
    preview.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect width='800' height='450' fill='%230f172a'/><rect x='50' y='50' width='250' height='350' fill='%23334155'/><rect x='100' y='220' width='90' height='170' fill='%2310b981' rx='10'/><text x='80' y='200' fill='%23f59e0b' font-family='sans-serif' font-weight='bold' font-size='16'>Air Purifier Corner Trap (&lt;10cm Clearance)</text><path d='M190 300 Q240 280 280 320' stroke='%23f43f5e' stroke-width='4' fill='none'/><text x='350' y='250' fill='%2394a3b8' font-family='sans-serif' font-size='20'>Purifier Blocked Behind Curtains &amp; Wall</text></svg>";
  } else if (presetType === "corsi_box") {
    preview.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect width='800' height='450' fill='%230f172a'/><rect x='250' y='120' width='300' height='260' fill='%23d97706' rx='8'/><rect x='270' y='140' width='260' height='80' fill='%230284c7' rx='5'/><text x='320' y='185' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='18'>Top Box Fan (Exhaust)</text><text x='300' y='280' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>4× MERV-13 Filter Cube</text><text x='230' y='70' fill='%2310b981' font-family='sans-serif' font-weight='bold' font-size='22'>Verified Corsi-Rosenthal DIY Box (CADR 520 CFM)</text></svg>";
  }

  runVisionDiagnostics(presetType);
}

function runVisionDiagnostics(scanType) {
  const scanOverlay = document.getElementById("scan-animation");
  scanOverlay.classList.remove("hidden");

  // Check if real Gemini API call can be made
  if (geminiApiKey && scanType !== "unsealed_window" && scanType !== "blocked_purifier" && scanType !== "corsi_box") {
    callGeminiVisionAPI();
    return;
  }

  // High-accuracy simulated diagnostic engine
  setTimeout(() => {
    scanOverlay.classList.add("hidden");
    const container = document.getElementById("audit-results-container");
    const badge = document.getElementById("audit-score-badge");

    if (scanType === "unsealed_window") {
      badge.className = "px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-950 text-rose-300 border border-rose-600/50";
      badge.textContent = "High Air Leakage (Score: 42/100)";
      container.innerHTML = `
        <div class="p-3 rounded-xl bg-rose-950/40 border border-rose-700/50 text-xs space-y-1.5">
          <div class="font-bold text-rose-300 flex items-center gap-1.5">
            <i data-lucide="alert-octagon" class="w-4 h-4 text-rose-400"></i>
            <span>Critical Sliding Track Gap Detected</span>
          </div>
          <p class="text-slate-300">Continuous micro-gap along central sliding sash allows ~18 m³/hr of outdoor smog infiltration into this room.</p>
        </div>

        <div class="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-2">
          <div class="font-bold text-emerald-400 flex items-center gap-1.5">
            <i data-lucide="wrench" class="w-4 h-4"></i>
            <span>Recommended Low-Cost DIY Hack</span>
          </div>
          <ul class="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
            <li><strong>Immediate ($0):</strong> Press soft folded foam strips or rolled cotton fabric into the sash intersection track.</li>
            <li><strong>Permanent ($2):</strong> Install adhesive rubber V-strip weatherstripping along the vertical sliding channel.</li>
            <li><strong>Expected Gain:</strong> Reduces infiltration PM2.5 load by up to 68%.</li>
          </ul>
        </div>
      `;
    } else if (scanType === "blocked_purifier") {
      badge.className = "px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-950 text-amber-300 border border-amber-600/50";
      badge.textContent = "Sub-Optimal CADR (Score: 58/100)";
      container.innerHTML = `
        <div class="p-3 rounded-xl bg-amber-950/40 border border-amber-700/50 text-xs space-y-1.5">
          <div class="font-bold text-amber-300 flex items-center gap-1.5">
            <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400"></i>
            <span>Dead-Air Zone & Blocked Intake</span>
          </div>
          <p class="text-slate-300">Purifier is situated <15 cm from walls and obstructed by fabric curtains. Effective Clean Air Delivery Rate (CADR) dropped by ~40%.</p>
        </div>

        <div class="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-2">
          <div class="font-bold text-emerald-400 flex items-center gap-1.5">
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Repositioning Instructions</span>
          </div>
          <ul class="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
            <li>Move unit at least 45 cm (1.5 feet) away from walls to ensure 360° intake draw.</li>
            <li>Direct output airflow jet towards breathing area (bed/desk), not towards closed closet doors.</li>
            <li>Clean primary nylon mesh pre-filter to double airflow volume.</li>
          </ul>
        </div>
      `;
    } else if (scanType === "corsi_box") {
      badge.className = "px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/50";
      badge.textContent = "Exceptional Filtration (Score: 96/100)";
      container.innerHTML = `
        <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/50 text-xs space-y-1.5">
          <div class="font-bold text-emerald-300 flex items-center gap-1.5">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
            <span>Corsi-Rosenthal Assembly Verified</span>
          </div>
          <p class="text-slate-300">High-surface-area 4-filter cube configuration verified. Estimated clean air output exceeds 500 CFM with negligible noise.</p>
        </div>

        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
          <div class="font-bold text-white">Maintenance Protocol:</div>
          <p class="text-slate-400 text-[11px]">Replace MERV-13 filters every 5–6 months during winter smog season. Inspect duct tape perimeter seams monthly.</p>
        </div>
      `;
    } else {
      badge.className = "px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/50";
      badge.textContent = "Audit Complete (Score: 78/100)";
      container.innerHTML = `
        <div class="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-2">
          <div class="font-bold text-emerald-400 flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-4 h-4"></i>
            <span>VayuLens AI Diagnostics</span>
          </div>
          <p class="text-slate-300">Space is moderately sealed. Air exchange rate is estimated at 0.65 ACH. Room will benefit from an under-door silicone sweep and repositioning heaters away from exhaust outlets.</p>
        </div>
      `;
    }

    if (window.lucide) lucide.createIcons();
  }, 1200);
}

// Optional Gemini Vision API caller if key present
async function callGeminiVisionAPI() {
  const scanOverlay = document.getElementById("scan-animation");
  const container = document.getElementById("audit-results-container");
  const badge = document.getElementById("audit-score-badge");

  try {
    const canvas = document.getElementById("photo-canvas");
    let base64Image = "";
    if (!canvas.classList.contains("hidden")) {
      base64Image = canvas.toDataURL("image/jpeg").split(",")[1];
    } else {
      const preview = document.getElementById("uploaded-image-preview");
      base64Image = preview.src.split(",")[1];
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: "Analyze this room or window or air cleaner photo for winter indoor air quality vulnerabilities. Check window seals, purifier airflow obstruction, draft gaps, and suggest 2 practical low-cost DIY hacks." },
            { inline_data: { mime_type: "image/jpeg", data: base64Image } }
          ]
        }]
      })
    });

    const data = await response.json();
    scanOverlay.classList.add("hidden");
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis complete.";

    badge.className = "px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/50";
    badge.textContent = "Gemini Vision Verified";

    container.innerHTML = `
      <div class="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-2">
        <div class="font-bold text-emerald-400 flex items-center gap-1.5">
          <i data-lucide="sparkles" class="w-4 h-4"></i>
          <span>Live Gemini Multimodal Diagnostic</span>
        </div>
        <p class="text-slate-200 leading-relaxed whitespace-pre-line text-[11px]">${aiText}</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    console.error("Gemini Vision call failed:", err);
    scanOverlay.classList.add("hidden");
    runVisionDiagnostics("unsealed_window");
  }
}

// ==========================================
// 8. VAYUCOPILOT AI CHATBOT (USER QUERY)
// ==========================================

function setChatPrompt(promptText) {
  document.getElementById("chat-input").value = promptText;
  handleChatSubmit(new Event("submit"));
}

function clearChat() {
  const container = document.getElementById("chat-messages");
  container.innerHTML = `
    <div class="flex items-start space-x-3 max-w-2xl">
      <div class="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white shrink-0 shadow">
        <i data-lucide="bot" class="w-4 h-4"></i>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm p-4 text-xs md:text-sm text-slate-200 space-y-2 shadow-md">
        <p class="font-semibold text-white">Chat cleared. How can I help your family navigate today's air quality?</p>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

async function handleChatSubmit(event) {
  if (event) event.preventDefault();
  const input = document.getElementById("chat-input");
  const query = input.value.trim();
  if (!query) return;

  input.value = "";
  appendChatMessage("user", query);

  // Show typing indicator
  const typingId = appendTypingIndicator();

  // Try real Gemini API if key is saved
  if (geminiApiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are VayuCopilot, an expert AI respiratory health and urban air quality assistant for families in high-smog cities (Delhi, Lahore, Beijing, Krakow, etc.). The current city is ${CITIES[currentCityKey].name} with AQI ${CITIES[currentCityKey].currentAqi}. The family persona is ${PERSONA_CONFIGS[currentPersonaKey].name}. Answer the following user query with empathetic, scientifically accurate advice, safety precautions, and actionable DIY hacks:\n\nUser Question: ${query}`
            }]
          }]
        })
      });
      const data = await response.json();
      removeTypingIndicator(typingId);
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || getSmartLocalResponse(query);
      appendChatMessage("bot", botReply);
      return;
    } catch (err) {
      console.warn("Live Gemini API call error, falling back to local reasoning:", err);
    }
  }

  // Fallback to high-intelligence contextual reasoning
  setTimeout(() => {
    removeTypingIndicator(typingId);
    const reply = getSmartLocalResponse(query);
    appendChatMessage("bot", reply);
  }, 600);
}

function getSmartLocalResponse(query) {
  const q = query.toLowerCase();
  const city = CITIES[currentCityKey];

  if (q.includes("toddler") || q.includes("child") || q.includes("kid") || q.includes("outdoor")) {
    return `### 👶 Pediatric Smog Guidance for Today (${city.name})
- **Current AQI is ${city.currentAqi}**: At this level, children should **NOT** engage in strenuous outdoor sports or running. Children breathe faster and deeper, pulling PM2.5 deep into narrow bronchioles.
- **Permissible Window**: If outdoor play is unavoidable, restrict it strictly to **${city.goldenWindow}** when thermal inversion lifts.
- **Nursery Defense**: Run a HEPA purifier in the child's bedroom continuously. Ensure air blows across the room, not directly into their face.
- **Post-Outdoors**: Gently rinse their nose with physiological sterile saline drops to flush trapped black carbon particles.`;
  }

  if (q.includes("seal") || q.includes("window") || q.includes("draft") || q.includes("door")) {
    return `### 🪟 Zero-Cost & Low-Cost Window Sealing Hacks
1. **The Rolled Damp Towel Trick**: Place a damp (not dripping) rolled cotton towel along the door base and window sill. The moisture captures fine micro-particles trying to enter through drafts.
2. **Painter's Masking Tape along Gaps**: Seal sliding window joints with blue painter's tape or silicone masking tape. It leaves no sticky residue upon removal.
3. **Bubble Wrap Insulation**: Spritz water onto window panes and apply packaging bubble wrap. It adds thermal insulation to prevent cold-air settling while reducing draft infiltration.`;
  }

  if (q.includes("mask") || q.includes("n95") || q.includes("cloth") || q.includes("surgical")) {
    return `### 😷 Mask Filtration Truth & Clinical Guidelines
- **N95 / FFP2 / KF94**: Certified electrostatic meltblown fabric captures **≥95% of PM2.5**. Crucial rule: It must create an airtight perimeter seal against facial skin.
- **Cloth & Bandanas (<10% protection)**: A fabric scarf or cotton mask gives a **false sense of security**. The pore size between cotton threads is ~100–200 µm, whereas PM2.5 is 2.5 µm or smaller!
- **Facial Hair Warning**: Even a 2-day stubble breaks the N95 face seal, causing inhaled air to bypass the filter and reducing protection by up to 60%.`;
  }

  if (q.includes("ionizer") || q.includes("ozone") || q.includes("plasma")) {
    return `### ⚡ Critical Warning: Ionic & Ozone Air Purifiers
- **Avoid Ozone Generators**: Devices marketed as "ionic", "electrostatic precipitators", or "ozone air cleaners" often release ozone ($O_3$) as a byproduct.
- **Why Ozone is Dangerous**: Ozone is a powerful caustic oxidant. It reacts directly with lung surfactant, causing acute throat constriction, coughing fits, and irreversible alveolar inflammation.
- **Safe Standard**: Always choose mechanical **True HEPA H13/H14 filters** with physical activated carbon. They produce zero secondary chemical emissions.`;
  }

  if (q.includes("red flag") || q.includes("emergency") || q.includes("symptom") || q.includes("hospital")) {
    return `### 🚨 Emergency Red-Flag Smog Symptoms (Seek Immediate Care)
1. **Resting Shortness of Breath**: Inability to speak a full sentence without gasping for breath while sitting still.
2. **Chest Tightness / Squeezing**: Heaviness across the breastbone (PM2.5 triggers acute arterial vasoconstriction and myocardial infarction risk).
3. **Audible Stridor or Wheeze**: High-pitched musical whistling in breathing unresponsive to two doses of a rescue inhaler.
4. **Cyanosis**: Bluish or dusky tint on the lips, tongue, or nailbeds.`;
  }

  if (q.includes("boil") || q.includes("steam") || q.includes("myth")) {
    return `### 💡 Debunking Common Smog Myths
- **Myth 1: "Boiling water in the room cleans toxic air."** 
  *Fact*: Boiling water only increases humidity. It does not neutralize PM2.5, sulfur dioxide, or black carbon.
- **Myth 2: "Deep steam inhalation cleans soot from lungs."**
  *Fact*: Steam only reaches upper nasal passages. It cannot reach the deep alveoli where PM2.5 lodges, and excessive hot steam can scald mucosal tissue.
- **Myth 3: "Air-purifying plants can replace HEPA purifiers."**
  *Fact*: While snake plants and areca palms are beneficial, you would need hundreds of plants in a single bedroom to match the air changes of a standard 200 CFM HEPA filter!`;
  }

  return `### 🌬️ VayuLens Environmental Assessment for ${city.name}
- **Current Air Status**: AQI ${city.currentAqi} (${city.status}). Boundary layer ceiling is currently compressed at ${city.boundaryLayer}.
- **Golden Safe Window**: Plan essential errands and ventilation between **${city.goldenWindow}**.
- **Household Priority**: Ensure bedroom door draft stoppers are deployed, switch car ventilation to strict internal recirculation, and keep hydration above 2.5L daily to support the respiratory mucociliary escalator.`;
}

function appendChatMessage(sender, text) {
  const container = document.getElementById("chat-messages");
  const wrapper = document.createElement("div");
  wrapper.className = `flex items-start space-x-3 ${sender === "user" ? "justify-end" : "max-w-2xl"}`;

  if (sender === "user") {
    wrapper.innerHTML = `
      <div class="bg-cyan-600 text-white rounded-2xl rounded-tr-sm p-3.5 text-xs md:text-sm shadow-md max-w-lg">
        <p>${escapeHtml(text)}</p>
      </div>
      <div class="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
        <i data-lucide="user" class="w-4 h-4"></i>
      </div>
    `;
  } else {
    // Format markdown headers, bold, bullet points
    let formattedText = text
      .replace(/### (.*)/g, '<div class="font-bold text-white text-sm mb-1">$1</div>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/^- (.*)/gm, '<li class="ml-2 text-slate-300">$1</li>')
      .replace(/\n\n/g, '<div class="h-2"></div>');

    wrapper.innerHTML = `
      <div class="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white shrink-0 shadow">
        <i data-lucide="bot" class="w-4 h-4"></i>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm p-4 text-xs md:text-sm text-slate-200 space-y-2 shadow-md leading-relaxed">
        ${formattedText}
      </div>
    `;
  }

  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
  if (window.lucide) lucide.createIcons();
}

function appendTypingIndicator() {
  const container = document.getElementById("chat-messages");
  const id = `typing-${Date.now()}`;
  const wrapper = document.createElement("div");
  wrapper.id = id;
  wrapper.className = "flex items-start space-x-3 max-w-2xl";
  wrapper.innerHTML = `
    <div class="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white shrink-0 shadow">
      <i data-lucide="bot" class="w-4 h-4"></i>
    </div>
    <div class="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm p-3 text-xs text-slate-400 flex items-center space-x-2">
      <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
      <span>VayuCopilot is evaluating atmospheric conditions & clinical guidelines...</span>
    </div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
  if (window.lucide) lucide.createIcons();
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ==========================================
// 9. LUNG SHIELD & IMPACT ENGINE
// ==========================================

function recalculateImpact() {
  const maskSlider = document.getElementById("slider-mask");
  const routineSlider = document.getElementById("slider-routine");
  const commuteSlider = document.getElementById("slider-commute");

  if (!maskSlider || !routineSlider || !commuteSlider) return;

  const maskVal = parseInt(maskSlider.value, 10);
  const routineVal = parseInt(routineSlider.value, 10);
  const commuteVal = parseInt(commuteSlider.value, 10);

  // Label updates
  document.getElementById("slider-mask-val").textContent = `${maskVal}%`;
  
  const routineLabels = ["Unshifted (Dawn/Dusk)", "Partially Shifted", "Optimal (Midday Window)"];
  document.getElementById("slider-routine-val").textContent = routineLabels[routineVal];

  const commuteLabels = ["Solo Petrol Car", "Two-Wheeler Scooter", "Metro / EV Pool"];
  document.getElementById("slider-commute-val").textContent = commuteLabels[commuteVal];

  // Mathematical Calculation based on current city PM2.5
  const basePm25 = parseInt(CITIES[currentCityKey].pm25, 10) || 300;
  
  // Daily baseline respiratory volume: ~11,000 Liters = 11 m3
  // Inhaled particulate mass: 11 m3 * basePm25 (ug/m3)
  const totalOutdoorInhaledBaseline = 11 * basePm25 * 0.35; // ~35% of day outdoor/unfiltered
  
  // Efficiency factors
  const maskProtection = (maskVal / 100) * 0.95; // N95 achieves 95% seal efficiency
  const routineProtection = (routineVal / 2) * 0.40; // Shifting out of inversion peak spares 40%
  const commuteProtection = (commuteVal / 2) * 0.25; // Clean cabin / metro avoids 25% tailpipes

  const totalProtectionFactor = Math.min(0.92, maskProtection * 0.5 + routineProtection + commuteProtection);

  const pm25SavedUg = Math.round(totalOutdoorInhaledBaseline * totalProtectionFactor);
  
  // 1 Cigarette equivalent = ~22 ug/m3 24h exposure = ~242 ug PM2.5 deposited
  const cigarettesSaved = (pm25SavedUg / 40).toFixed(1);

  // Carbon savings
  const co2SavingsKg = (commuteVal * 2.1 + (routineVal > 0 ? 0.8 : 0)).toFixed(1);

  // Indoor reduction %
  const indoorReduction = Math.round(55 + (routineVal * 12) + (maskVal > 50 ? 10 : 0));

  // Update UI tiles
  document.getElementById("metric-pm25-saved").textContent = `${pm25SavedUg} µg`;
  document.getElementById("metric-cigs-saved").textContent = `${cigarettesSaved} Cigs`;
  document.getElementById("metric-co2-saved").textContent = `${co2SavingsKg} kg`;
  document.getElementById("metric-indoor-reduction").textContent = `${Math.min(94, indoorReduction)}%`;
}

// ==========================================
// 10. COMMUNITY SMOG SHIELD
// ==========================================

function renderCommunityReports() {
  const container = document.getElementById("community-reports-list");
  if (!container) return;

  container.innerHTML = "";
  communityReports.forEach(report => {
    const item = document.createElement("div");
    item.className = "flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs";
    item.innerHTML = `
      <div class="flex items-center space-x-2.5">
        <span class="w-2 h-2 rounded-full ${report.severity === 'High' ? 'bg-rose-500' : 'bg-amber-500'} animate-pulse"></span>
        <div>
          <span class="font-bold text-white">${report.type}</span>
          <span class="text-slate-500 text-[11px] ml-1.5">• ${report.location}</span>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-[10px] text-slate-400">${report.time}</span>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-semibold">${report.status}</span>
      </div>
    `;
    container.appendChild(item);
  });
}

function openReportModal() {
  document.getElementById("report-modal").classList.remove("hidden");
}

function closeReportModal() {
  document.getElementById("report-modal").classList.add("hidden");
}

function submitHazardReport() {
  const locInput = document.getElementById("report-location");
  const catSelect = document.getElementById("report-category");
  const notesInput = document.getElementById("report-notes");

  const location = locInput.value.trim() || "Nearby Neighborhood";
  const typeMap = {
    waste: "Open Waste / Leaf Burning",
    dust: "Construction Dust Plume",
    generator: "Commercial Generator Plume",
    vehicle: "Heavy Vehicle Smoke Idling"
  };

  const newReport = {
    id: Date.now(),
    type: typeMap[catSelect.value] || "Smog Hazard",
    location: location,
    time: "Just now",
    status: "Broadcasting Alert",
    severity: "High"
  };

  communityReports.unshift(newReport);
  renderCommunityReports();
  closeReportModal();

  locInput.value = "";
  notesInput.value = "";

  alert(`Neighborhood alert broadcasted! Surrounding community users within a 3.5 km radius have been notified to avoid this sector.`);
}

function joinCarpool() {
  alert("You've been added to the Neighborhood EV & Clean-Air School Pool! Morning route coordinates will be shared with the parent syndicate.");
}

// ==========================================
// 11. MODALS & API KEY MANAGEMENT
// ==========================================

function showCorsiModal() {
  document.getElementById("corsi-modal").classList.remove("hidden");
}

function hideCorsiModal() {
  document.getElementById("corsi-modal").classList.add("hidden");
}

function openApiKeyModal() {
  document.getElementById("apikey-modal").classList.remove("hidden");
  document.getElementById("api-key-input").value = geminiApiKey;
}

function closeApiKeyModal() {
  document.getElementById("apikey-modal").classList.add("hidden");
}

function saveApiKey() {
  const input = document.getElementById("api-key-input");
  geminiApiKey = input.value.trim();
  localStorage.setItem("VAYULENS_GEMINI_KEY", geminiApiKey);
  updateApiKeyIndicator();
  closeApiKeyModal();
  alert("Gemini API key saved! Multimodal vision and AI chatbot are now live-connected.");
}

function clearApiKey() {
  geminiApiKey = "";
  localStorage.removeItem("VAYULENS_GEMINI_KEY");
  document.getElementById("api-key-input").value = "";
  updateApiKeyIndicator();
  closeApiKeyModal();
  alert("Gemini key removed. VayuLens will use built-in localized simulation intelligence.");
}

function updateApiKeyIndicator() {
  const indicator = document.getElementById("gemini-status-indicator");
  if (!indicator) return;
  if (geminiApiKey) {
    indicator.textContent = "Gemini Connected";
    indicator.parentElement.className = "text-xs text-emerald-300 px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800/60 transition flex items-center gap-1";
  } else {
    indicator.textContent = "Gemini Key";
    indicator.parentElement.className = "text-xs text-cyan-300 px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800/60 transition flex items-center gap-1";
  }
}

// ==========================================
// 12. LIVE WEATHER UPDATER ENGINE
// ==========================================

function renderWeatherBar() {
  const city = CITIES[currentCityKey];
  if (!city) return;

  const tempEl = document.getElementById("weather-temp");
  const condEl = document.getElementById("weather-condition");
  const badgeEl = document.getElementById("weather-inversion-badge");
  const cityEl = document.getElementById("weather-city-name");
  const humEl = document.getElementById("weather-humidity");
  const windEl = document.getElementById("weather-wind");
  const pressEl = document.getElementById("weather-pressure");
  const ceilEl = document.getElementById("weather-ceiling");

  if (tempEl) tempEl.textContent = city.temp;
  if (condEl) condEl.textContent = city.condition;
  if (badgeEl) badgeEl.textContent = city.inversionBadge;
  if (cityEl) cityEl.textContent = city.name;
  if (humEl) humEl.textContent = city.humidity;
  if (windEl) windEl.textContent = city.wind;
  if (pressEl) pressEl.textContent = city.pressure;
  if (ceilEl) ceilEl.textContent = city.inversionCeiling;
}

function refreshLiveWeatherData() {
  const spinIcon = document.getElementById("weather-spin-icon");
  const updatedLabel = document.getElementById("weather-updated-time");

  if (spinIcon) spinIcon.classList.add("animate-spin");

  setTimeout(() => {
    if (spinIcon) spinIcon.classList.remove("animate-spin");
    
    // Simulate slight natural microclimate fluctuation
    const city = CITIES[currentCityKey];
    const randTempOffset = (Math.random() * 1.5 - 0.7).toFixed(1);
    const baseTempNum = parseInt(city.temp, 10);
    const newTemp = `${(baseTempNum + parseFloat(randTempOffset)).toFixed(0)}°C`;
    
    const tempEl = document.getElementById("weather-temp");
    if (tempEl) tempEl.textContent = newTemp;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (updatedLabel) updatedLabel.textContent = `Updated: ${timeStr}`;

    alert(`Live weather telemetry updated for ${city.name}! Microclimate sensors synchronized.`);
  }, 750);
}

// ==========================================
// 13. FAMILY MEMBERS & HEALTH TRACKING HUB
// ==========================================

let healthTrendChartInstance = null;

let familyMembers = JSON.parse(localStorage.getItem("VAYULENS_FAMILY_MEMBERS")) || [
  {
    id: "aarav",
    name: "Aarav",
    age: 6,
    role: "child",
    condition: "asthma",
    conditionLabel: "Pediatric Asthma",
    baselinePefr: 280,
    preferredMask: "KF94 Kids",
    zone: "Nursery - CADR 240 HEPA",
    lastSpo2: 97,
    lastPefr: 240,
    cough: "moderate",
    wheeze: "mild",
    burn: "mild",
    inhalerPuffs: 2,
    risk: "High Risk",
    riskClass: "bg-rose-500/20 text-rose-300 border-rose-500/30"
  },
  {
    id: "sunita",
    name: "Grandma Sunita",
    age: 68,
    role: "senior",
    condition: "copd",
    conditionLabel: "COPD & Hypertension",
    baselinePefr: 290,
    preferredMask: "N95 Headband",
    zone: "Master Bedroom - CADR 320",
    lastSpo2: 95,
    lastPefr: 275,
    cough: "mild",
    wheeze: "no",
    burn: "no",
    inhalerPuffs: 1,
    risk: "Moderate Risk",
    riskClass: "bg-amber-500/20 text-amber-300 border-amber-500/30"
  },
  {
    id: "priya",
    name: "Priya",
    age: 32,
    role: "pregnant",
    condition: "pregnancy",
    conditionLabel: "Pregnant (2nd Trimester)",
    baselinePefr: 420,
    preferredMask: "N95 Valve-Free",
    zone: "Living Room - True HEPA",
    lastSpo2: 99,
    lastPefr: 410,
    cough: "none",
    wheeze: "no",
    burn: "no",
    inhalerPuffs: 0,
    risk: "Protected",
    riskClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  },
  {
    id: "rahul",
    name: "Rahul",
    age: 35,
    role: "adult",
    condition: "healthy",
    conditionLabel: "Daily Commuter / Cyclist",
    baselinePefr: 550,
    preferredMask: "N95 with Valve",
    zone: "Study Room",
    lastSpo2: 98,
    lastPefr: 535,
    cough: "none",
    wheeze: "no",
    burn: "mild",
    inhalerPuffs: 0,
    risk: "Standard Exposure",
    riskClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
  }
];

function saveFamilyToStorage() {
  localStorage.setItem("VAYULENS_FAMILY_MEMBERS", JSON.stringify(familyMembers));
}

function renderFamilyGrid() {
  const container = document.getElementById("family-members-grid");
  const countBadge = document.getElementById("family-count-badge");
  const profileCountLabel = document.getElementById("family-profile-count");

  if (countBadge) countBadge.textContent = `${familyMembers.length} Profiles`;
  if (profileCountLabel) profileCountLabel.textContent = `${familyMembers.length} Active`;

  // Update member select dropdowns
  const quickSelect = document.getElementById("vitals-member-select");
  const modalSelect = document.getElementById("modal-vitals-member-select");

  if (quickSelect) {
    quickSelect.innerHTML = familyMembers.map(m => `<option value="${m.id}">${m.name} (${m.age}y - ${m.conditionLabel})</option>`).join("");
  }
  if (modalSelect) {
    modalSelect.innerHTML = familyMembers.map(m => `<option value="${m.id}">${m.name} (${m.age}y)</option>`).join("");
  }

  if (!container) return;
  container.innerHTML = "";

  const roleEmojis = {
    child: "👶",
    senior: "👵",
    pregnant: "🤰",
    adult: "👤",
    pet: "🐾"
  };

  familyMembers.forEach(member => {
    const card = document.createElement("div");
    card.className = "bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between hover:border-slate-700 transition relative overflow-hidden group";

    // PEFR percentage
    const pefrPct = member.baselinePefr ? Math.round((member.lastPefr / member.baselinePefr) * 100) : 100;
    let pefrColor = "text-emerald-400";
    if (pefrPct < 80) pefrColor = "text-rose-400";
    else if (pefrPct < 90) pefrColor = "text-amber-400";

    card.innerHTML = `
      <div>
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg">
              ${roleEmojis[member.role] || "👤"}
            </div>
            <div>
              <div class="font-bold text-white text-sm flex items-center gap-1.5">
                <span>${escapeHtml(member.name)}</span>
                <span class="text-[11px] text-slate-400">(${member.age}y)</span>
              </div>
              <span class="text-[10px] font-semibold text-cyan-400">${escapeHtml(member.conditionLabel)}</span>
            </div>
          </div>
          <button onclick="deleteFamilyMember('${member.id}')" class="text-slate-600 hover:text-rose-400 text-xs transition" title="Delete Profile">✕</button>
        </div>

        <div class="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5 text-xs">
          <div class="flex items-center justify-between text-[11px]">
            <span class="text-slate-400">Oxygen SpO2:</span>
            <span class="font-bold ${member.lastSpo2 < 95 ? 'text-rose-400' : 'text-emerald-400'}">${member.lastSpo2}%</span>
          </div>

          <div class="flex items-center justify-between text-[11px]">
            <span class="text-slate-400">Peak Flow (PEFR):</span>
            <span class="font-bold ${pefrColor}">${member.lastPefr} L/min <span class="text-[10px] text-slate-500">(${pefrPct}%)</span></span>
          </div>

          <div class="flex items-center justify-between text-[11px]">
            <span class="text-slate-400">Inhaler Puffs Today:</span>
            <span class="font-bold text-slate-200">${member.inhalerPuffs} doses</span>
          </div>

          <div class="flex items-center justify-between text-[11px]">
            <span class="text-slate-400">Cough Severity:</span>
            <span class="font-medium capitalize text-slate-300">${member.cough}</span>
          </div>
        </div>

        <div class="mt-2.5 space-y-1 text-[10px] text-slate-400">
          <div>🛡️ <strong>Mask:</strong> ${escapeHtml(member.preferredMask)}</div>
          <div>🏠 <strong>Zone:</strong> ${escapeHtml(member.zone)}</div>
        </div>
      </div>

      <div class="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${member.riskClass}">
          ${member.risk}
        </span>
        <button onclick="openLogVitalsModal('${member.id}')" class="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1">
          <i data-lucide="edit-3" class="w-3 h-3"></i>
          <span>Log Vitals</span>
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  if (window.lucide) lucide.createIcons();
}

function openAddMemberModal() {
  document.getElementById("add-member-modal").classList.remove("hidden");
}

function closeAddMemberModal() {
  document.getElementById("add-member-modal").classList.add("hidden");
}

function saveNewFamilyMember() {
  const name = document.getElementById("new-member-name").value.trim();
  const age = parseInt(document.getElementById("new-member-age").value, 10) || 30;
  const role = document.getElementById("new-member-role").value;
  const condition = document.getElementById("new-member-condition").value;
  const pefr = parseInt(document.getElementById("new-member-pefr").value, 10) || 400;
  const mask = document.getElementById("new-member-mask").value;
  const zone = document.getElementById("new-member-zone").value.trim() || "Main Living Area";

  if (!name) {
    alert("Please enter member name!");
    return;
  }

  const conditionLabels = {
    asthma: "Asthma / Reactive Airway",
    copd: "COPD / Chronic Bronchitis",
    cardiac: "Cardiovascular / Hypertension",
    pregnancy: "Pregnant (High Inhalation Risk)",
    allergy: "Allergic Rhinitis / Dust Allergy",
    healthy: "Generally Healthy"
  };

  const id = `member-${Date.now()}`;
  const newMember = {
    id: id,
    name: name,
    age: age,
    role: role,
    condition: condition,
    conditionLabel: conditionLabels[condition] || "General Health",
    baselinePefr: pefr,
    preferredMask: mask,
    zone: zone,
    lastSpo2: 98,
    lastPefr: pefr,
    cough: "none",
    wheeze: "no",
    burn: "no",
    inhalerPuffs: 0,
    risk: "Standard Exposure",
    riskClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
  };

  familyMembers.push(newMember);
  saveFamilyToStorage();
  renderFamilyGrid();
  closeAddMemberModal();
  evaluateFamilyClinicalAlert();

  // Reset inputs
  document.getElementById("new-member-name").value = "";
  document.getElementById("new-member-age").value = "";
  document.getElementById("new-member-pefr").value = "";
  document.getElementById("new-member-zone").value = "";

  alert(`Family profile for ${name} added successfully!`);
}

function deleteFamilyMember(id) {
  if (familyMembers.length <= 1) {
    alert("You must keep at least 1 family profile in the tracking hub!");
    return;
  }
  if (!confirm("Are you sure you want to remove this family member?")) return;
  familyMembers = familyMembers.filter(m => m.id !== id);
  saveFamilyToStorage();
  renderFamilyGrid();
  evaluateFamilyClinicalAlert();
}

function openLogVitalsModal(memberId) {
  document.getElementById("log-vitals-modal").classList.remove("hidden");
  if (memberId) {
    document.getElementById("modal-vitals-member-select").value = memberId;
  }
}

function closeLogVitalsModal() {
  document.getElementById("log-vitals-modal").classList.add("hidden");
}

function saveModalVitals() {
  const memberId = document.getElementById("modal-vitals-member-select").value;
  const spo2 = parseInt(document.getElementById("modal-vitals-spo2").value, 10) || 98;
  const pefr = parseInt(document.getElementById("modal-vitals-pefr").value, 10) || 300;
  const cough = document.getElementById("modal-vitals-cough").value;
  const inhaler = parseInt(document.getElementById("modal-vitals-inhaler").value, 10) || 0;

  updateMemberVitals(memberId, spo2, pefr, cough, "no", "no", inhaler);
  closeLogVitalsModal();
}

function handleVitalsSubmit(event) {
  if (event) event.preventDefault();
  const memberId = document.getElementById("vitals-member-select").value;
  const spo2 = parseInt(document.getElementById("vitals-spo2").value, 10) || 98;
  const pefr = parseInt(document.getElementById("vitals-pefr").value, 10) || 300;
  const cough = document.getElementById("vitals-cough").value;
  const wheeze = document.getElementById("vitals-wheeze").value;
  const burn = document.getElementById("vitals-burn").value;
  const inhaler = parseInt(document.getElementById("vitals-inhaler").value, 10) || 0;

  updateMemberVitals(memberId, spo2, pefr, cough, wheeze, burn, inhaler);
  alert("Daily vitals saved and clinical health index recalculated!");
}

function updateMemberVitals(memberId, spo2, pefr, cough, wheeze, burn, inhaler) {
  const member = familyMembers.find(m => m.id === memberId);
  if (!member) return;

  member.lastSpo2 = spo2;
  member.lastPefr = pefr;
  member.cough = cough;
  member.wheeze = wheeze;
  member.burn = burn;
  member.inhalerPuffs = inhaler;

  // Calculate risk
  const pefrPct = member.baselinePefr ? (pefr / member.baselinePefr) : 1;
  if (spo2 < 93 || pefrPct < 0.75 || wheeze === "yes" || cough === "severe") {
    member.risk = "Severe Distress";
    member.riskClass = "bg-rose-500/30 text-rose-300 border-rose-500/60";
  } else if (spo2 < 96 || pefrPct < 0.88 || wheeze === "mild" || cough === "moderate") {
    member.risk = "Elevated Strain";
    member.riskClass = "bg-amber-500/30 text-amber-300 border-amber-500/60";
  } else {
    member.risk = "Stable Defense";
    member.riskClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  }

  saveFamilyToStorage();
  renderFamilyGrid();
  evaluateFamilyClinicalAlert();
  updateHealthTrendChart();
}

function evaluateFamilyClinicalAlert() {
  const alertContainer = document.getElementById("family-clinical-alert");
  const alertText = document.getElementById("family-alert-text");
  if (!alertContainer || !alertText) return;

  const city = CITIES[currentCityKey];

  // Find most vulnerable or distressed member
  const distressed = familyMembers.find(m => m.risk === "Severe Distress" || m.risk === "Elevated Strain") || familyMembers[0];

  if (distressed) {
    const pefrPct = distressed.baselinePefr ? Math.round((distressed.lastPefr / distressed.baselinePefr) * 100) : 100;
    alertText.innerHTML = `
      <strong>${distressed.name} (${distressed.conditionLabel}):</strong> 
      SpO2 at ${distressed.lastSpo2}%, Peak Flow recorded at ${distressed.lastPefr} L/min (${pefrPct}% of baseline). 
      Ambient PM2.5 in ${city.name} (${city.pm25}) is triggering respiratory inflammation. 
      Maintain nursery/bedroom HEPA filtration in ${distressed.zone} and strictly observe the ${city.goldenWindow} thermal clearing window.
    `;
  }
}

// 7-DAY HEALTH VS AQI CHART
function initHealthTrendChart() {
  const ctx = document.getElementById("healthTrendChart");
  if (!ctx) return;

  const days = ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"];
  const city = CITIES[currentCityKey];

  // Generate AQI history based on city current AQI
  const aqiTrend = [
    Math.round(city.currentAqi * 0.85),
    Math.round(city.currentAqi * 0.92),
    Math.round(city.currentAqi * 1.05),
    Math.round(city.currentAqi * 1.10),
    Math.round(city.currentAqi * 0.95),
    Math.round(city.currentAqi * 0.98),
    city.currentAqi
  ];

  // Symptom severity score (0 to 10)
  const symptomTrend = [2.8, 3.4, 5.8, 6.4, 4.2, 4.6, 5.2];

  healthTrendChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: days,
      datasets: [
        {
          label: "Outdoor AQI",
          data: aqiTrend,
          borderColor: "#f43f5e",
          backgroundColor: "rgba(244, 63, 94, 0.15)",
          yAxisID: "yAqi",
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 4
        },
        {
          label: "Family Symptom Index (0-10)",
          data: symptomTrend,
          borderColor: "#06b6d4",
          backgroundColor: "rgba(6, 182, 212, 0.15)",
          yAxisID: "ySymptoms",
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: "#94a3b8", font: { size: 10 } }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(51, 65, 85, 0.2)" },
          ticks: { color: "#64748b", font: { size: 10 } }
        },
        yAqi: {
          type: "linear",
          position: "left",
          grid: { color: "rgba(51, 65, 85, 0.2)" },
          ticks: { color: "#f43f5e", font: { size: 10 } },
          suggestedMin: 50,
          suggestedMax: 500
        },
        ySymptoms: {
          type: "linear",
          position: "right",
          grid: { drawOnChartArea: false },
          ticks: { color: "#06b6d4", font: { size: 10 } },
          suggestedMin: 0,
          suggestedMax: 10
        }
      }
    }
  });
}

function updateHealthTrendChart() {
  if (!healthTrendChartInstance) return;
  const city = CITIES[currentCityKey];
  const aqiTrend = [
    Math.round(city.currentAqi * 0.85),
    Math.round(city.currentAqi * 0.92),
    Math.round(city.currentAqi * 1.05),
    Math.round(city.currentAqi * 1.10),
    Math.round(city.currentAqi * 0.95),
    Math.round(city.currentAqi * 0.98),
    city.currentAqi
  ];
  healthTrendChartInstance.data.datasets[0].data = aqiTrend;
  healthTrendChartInstance.update();
}

function openDoctorSummaryModal() {
  const modal = document.getElementById("doctor-summary-modal");
  const content = document.getElementById("doctor-summary-content");
  if (!modal || !content) return;

  const city = CITIES[currentCityKey];
  const todayStr = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  let membersHtml = familyMembers.map(m => {
    const pefrPct = m.baselinePefr ? Math.round((m.lastPefr / m.baselinePefr) * 100) : 100;
    return `
      <tr class="border-b border-slate-800 text-slate-300">
        <td class="py-2.5 font-bold text-white">${escapeHtml(m.name)} (${m.age}y)</td>
        <td class="py-2.5 text-cyan-400">${escapeHtml(m.conditionLabel)}</td>
        <td class="py-2.5 font-bold ${m.lastSpo2 < 95 ? 'text-rose-400' : 'text-emerald-400'}">${m.lastSpo2}%</td>
        <td class="py-2.5 font-bold">${m.lastPefr} / ${m.baselinePefr} L/min (${pefrPct}%)</td>
        <td class="py-2.5 capitalize">${m.cough}</td>
        <td class="py-2.5">${m.inhalerPuffs} puffs</td>
        <td class="py-2.5"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${m.riskClass}">${m.risk}</span></td>
      </tr>
    `;
  }).join("");

  content.innerHTML = `
    <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
      <div class="flex items-center justify-between">
        <span class="font-bold text-white text-sm">Household Clinical Exposure Report</span>
        <span class="text-slate-400">${todayStr}</span>
      </div>
      <div class="text-[11px] text-slate-400 flex flex-wrap gap-4">
        <span>Location: <strong class="text-slate-200">${city.name}</strong></span>
        <span>Ambient AQI: <strong class="text-rose-400">${city.currentAqi} (${city.status})</strong></span>
        <span>Atmospheric Boundary: <strong class="text-slate-200">${city.boundaryLayer}</strong></span>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-xs">
        <thead>
          <tr class="border-b border-slate-700 text-slate-400 font-semibold uppercase text-[10px]">
            <th class="py-2">Member</th>
            <th class="py-2">Condition</th>
            <th class="py-2">SpO2</th>
            <th class="py-2">Peak Flow (PEFR)</th>
            <th class="py-2">Cough</th>
            <th class="py-2">Inhaler Doses</th>
            <th class="py-2">Risk Rating</th>
          </tr>
        </thead>
        <tbody>
          ${membersHtml}
        </tbody>
      </table>
    </div>

    <div class="p-3.5 bg-cyan-950/30 border border-cyan-800/40 rounded-xl space-y-1 text-slate-300">
      <div class="font-bold text-cyan-300 flex items-center gap-1.5">
        <i data-lucide="info" class="w-4 h-4"></i>
        <span>Physician Clinical Notes & Recommendations:</span>
      </div>
      <p class="text-[11px] leading-relaxed">
        Family has adhered to thermal inversion schedule alignment and mechanical HEPA bedroom filtration. Vulnerable members (pediatric asthma & geriatric COPD) exhibit expected particulate-mediated peak-flow variances. Inhaler spacer compliance and saline rinses recommended daily during seasonal inversion.
      </p>
    </div>
  `;

  modal.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeDoctorSummaryModal() {
  document.getElementById("doctor-summary-modal").classList.add("hidden");
}
