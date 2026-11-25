# VayuLens (वायुLens) — GenAI Urban Smog & Air Defense Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![GenAI: Gemini Powered](https://img.shields.io/badge/GenAI-Google%20Gemini-cyan.svg)](https://ai.google.dev/)
[![Status: Production Ready](https://img.shields.io/badge/Status-Complete-green.svg)]()

> **Transforming Urban Smog Defense**: An AI-powered assistant designed for families and communities navigating severe winter smog, thermal inversion crises, and urban air pollution.

---

## 🌟 The Core Problem & Our Unique Solution

Typical air quality apps report passive, anxiety-inducing numbers (e.g. *"AQI 450 — Hazardous"*), leaving families feeling helpless. 

**VayuLens** transforms passive fear into **proactive defense, personal health preservation, and community-driven mitigation**:
1. **Multimodal Room & Purifier Lens**: Evaluates spatial drafts, window leaks, and purifier airflow blocks using Gemini Vision.
2. **Thermal Boundary-Layer Inversion Synchronizer**: Capitalizes on diurnal atmospheric science by shifting outdoor transit to the midday solar clearing window (saving up to 65% of inhaled alveolar particulates).
3. **Biological & Carbon Impact Engine**: Calculates exact $\mu g$ of $PM_{2.5}$ alveolar deposition avoided, cigarette inhalation equivalents spared, and kilograms of $CO_2$ reduced.
4. **VayuCopilot Conversational AI**: Instant natural-language answers to child health queries, mask fit testing, heating hazards, and debunking urban smog myths.
5. **Clinical Safety & Red-Flag Symptom Radar**: Emergency symptom matrices, pediatric and asthmatic checklists, and carbon monoxide precautions.
6. **Community Hyperlocal Smog Shield**: Neighborhood radar for reporting biomass burning, tracking clean-air havens, and coordinating low-emission school carpools.

---

## 🚀 Key Feature Breakdown

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VAYULENS ARCHITECTURE                           │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ 1. Diurnal Routine │ 2. Vision AI Lens  │ 3. VayuCopilot AI Chatbot    │
│ • 24hr Inversion   │ • Window gaps      │ • Natural Language Q&A       │
│ • Golden Window    │ • Purifier deadzone│ • Quick prompt chips         │
│ • Task checklists  │ • Corsi-Rosenthal  │ • Myth-busting knowledge     │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ 4. Family & Health │ 5. Safety Center   │ 6. Weather & Telemetry       │
│ • Vitals & SpO2    │ • Red-flag warning │ • Inversion ceiling & wind   │
│ • Peak Flow PEFR   │ • Mask truth       │ • Stagnation index           │
│ • Doctor summaries │ • CO & Heater rule │ • Microclimate updates       │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ 7. Lung Impact     │ 8. Community Radar │                              │
│ • Alveolar intake  │ • Waste burn alerts│                              │
│ • Cigarette equiv  │ • Clean-air havens │                              │
│ • CO2 reduced      │ • EV school pool   │                              │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

### 1. Diurnal Thermal Inversion Routine Optimizer
- **The Science**: In winter, cold air stays trapped near the ground underneath a warmer atmospheric layer, causing toxic particulates to stagnate at dawn and evening. Midday solar heating temporarily lifts this ceiling.
- **VayuLens Action**: Dynamically plots the 24-hour inversion curve and pinpoints the **Golden Clean-Air Window** (e.g. 1:00 PM – 2:45 PM) for cross-ventilation and necessary errands.
- **Persona Adapters**: Tailored schedules for **Asthmatics/Elderly**, **Infants/Toddlers**, **Daily Commuters**, and **General Households**.

### 2. VayuLens Vision AI Auditor (Multimodal Gemini Lens)
- **Live Camera / Photo Upload**: Users capture images of room windows, air purifiers, or DIY filters.
- **Instant Diagnostics**: Identifies sash leakage channels, purifier corner dead-zones, and calculates an IAQ seal score.
- **Built-in Demo Presets**: Includes one-click presets for *Unsealed Window*, *Blocked Purifier*, and *DIY Corsi-Rosenthal Box*.

### 3. VayuCopilot Conversational AI Chatbot
- Interactive real-time conversational agent answering queries such as:
  - *"Is it safe for my 4-year-old toddler to play outdoors today?"*
  - *"How can I seal sliding windows with zero budget?"*
  - *"Do surgical or cloth masks filter PM2.5?"*
  - *"Are ozone or ionic purifiers safe for children's bedrooms?"*
- Supports both **Live Google Gemini 1.5/2.0 API** and **High-Precision Local Fallback Reasoning**.

### 4. Safety Reminders & Clinical Precaution Center
- **Red-Flag Emergency Symptoms**: Highlights resting dyspnea, chest heaviness, stridor, and cyanosis.
- **Winter Heater & CO Poisoning Protection**: Warns against unvented combustion heating, incense, and mosquito coils.
- **Mask Truth Matrix**: Explains why cloth masks fail (<10% protection) vs. certified N95/FFP2 (95-99% protection) with fit testing.

### 5. Physiological Lung Shield & Impact Simulator
- Calibrated to WHO respiratory volume models ($11\,\text{m}^3/\text{day}$).
- Real-time sliders dynamically quantify particulate mass avoided ($\mu g$), equivalent cigarettes spared, and daily carbon emissions prevented.

### 6. Community Hyperlocal Smog Shield
- Hyperlocal neighborhood radar (5.0 km radius).
- Instant reporting of biomass burning, construction dust plumes, and commercial diesel generator smoke.
- Directory of verified community clean-air havens (public libraries, underground transit corridors).

---

## 💻 How to Run

VayuLens is engineered as a **zero-friction, modern Single Page Web Application** that runs immediately in any browser with no dependencies or build steps required!

1. Open `index.html` directly in any web browser:
   - Double-click `index.html`, OR
   - Right-click `index.html` -> Open with -> Google Chrome / Firefox / Opera GX.
2. (Optional) Click the **Key icon** in the top navigation bar to enter your **Google Gemini API Key** for live multimodal AI and unbounded reasoning.
3. Explore the pre-loaded global cities:
   - 🇮🇳 **Delhi-NCR** (Severe Smog & Inversion)
   - 🇵🇰 **Lahore** (Hazardous Stagnation)
   - 🇨🇳 **Beijing** (Winter Heating Inversion)
   - 🇵🇱 **Krakow** (Solid Fuel Smog)
   - 🇺🇸 **Central Valley** (Basin Inversion)
   - 🇬🇧 **London** (Urban Particulate & NO2)

---

## 🌿 Technical Specifications

- **Frontend**: HTML5, Tailwind CSS, Lucide Icons, Chart.js.
- **Intelligence Layer**: Google Gemini Multimodal REST API with structured prompt extraction + Localized Atmospheric Physics Engine.
- **Storage**: LocalStorage for API keys, saved routines, and preference states.
- **Accessibility**: High contrast dark theme, screen-reader semantic markup, and responsive layout across mobile, tablet, and desktop.
