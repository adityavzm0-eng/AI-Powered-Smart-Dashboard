# InsightAI — AI-Powered Smart Dashboard Generator

[![React](https://img.shields.io/badge/React-18.3+-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://python.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Recharts](https://img.shields.io/badge/Recharts-2.12+-22C55E)](https://recharts.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**InsightAI** is an intelligent, full-stack data analytics and automated dashboard platform inspired by the ease-of-use of Power BI, combined with deterministic Pandas statistical profiling and an interactive AI copilot.

Upload any CSV or Excel file (`.xlsx`, `.xls`) to instantly receive an automated, high-resolution analytical dashboard complete with KPI summary cards, relationship and bivariate scatter charts, distribution histograms, outlier detection, and an AI conversational analyst.

---

## 🌟 Key Highlights & Capabilities

### 1. Automated Dataset Profiling & Health Scoring
- **Automated Type Inference**: Instantly categorizes variables into numerical, categorical, date/time, boolean, and primary key/ID fields.
- **Dataset Health Index (0–100%)**: Computes completeness ratios, missing-cell percentages, and duplicate row detection.
- **5-Number Statistical Summary**: Computes min, max, mean, median, standard deviation, interquartile range (IQR), and skewness for numerical variables.
- **IQR Outlier Detection**: Automatically calculates $1.5 \times \text{IQR}$ lower and upper thresholds, isolating statistical anomalies.

### 2. 14 Dynamic Relationship & Combined Dashboards
- **Chronological Momentum**: Area chart mapping aggregate volume across time periods.
- **Pareto Category Leaderboard**: Ranked bar chart revealing primary revenue drivers.
- **Outlier & Dispersion Spectrum**: Visual distribution of numerical variables.
- **Bivariate Metric Relationship (Sales vs. Profit)**: Interactive scatter plot analyzing metric correlations.
- **Trade-off Spectrum (Discount vs. Profit)**: Scatter plot evaluating discount impacts on margin.
- **Multi-Factor Synergy (Margin vs. Volume)**: Scatter plot identifying volume efficiency.
- **Market Share & Allocation**: Donut/pie charts of categorical distributions.
- **Secondary Category Contribution**: Granular breakdowns by sub-segment.
- **Segmented Profit Distribution**: Cross-categorical margin analysis.
- **Comparative Efficiency Curve**: Trend curve highlighting performance shifts.
- **Frequency Distribution Histogram**: Binned distribution across 10 dynamic quantiles.
- **Regional Geographic Breakdown**: Regional volume and performance comparison.
- **Operational Cycle Duration**: Cycle time and shipping duration analytics.
- **Interactive High-Resolution Data Grid**: Searchable, sortable, and paginated data table.

### 3. InsightAI Copilot (Bottom-Left Assistant)
- **Docked Interface**: Docked cleanly at the bottom-left corner with high-contrast pure black (`#000000`) background and crisp white typography.
- **Hybrid Intelligence**: Deterministic Python-backed calculations for precision questions (*"What is the average sales?"*, *"Show highest profit category"*), supplemented by modular OpenAI or Google Gemini integration for narrative insights.
- **Custom Chart Pinning**: Ask the Copilot to synthesize a new chart and pin it directly onto your live dashboard.

### 4. Interactive Slicing & Dicing
- **Global Cross-Filtering**: Slice data by date ranges, categorical attributes, or numerical thresholds.
- **Dynamic Chart Type Switching**: Switch between Bar, Line, Area, Scatter, and Pie charts on the fly.
- **Custom Aggregations**: Compute Sum, Average, Count, Minimum, or Maximum dynamically.

### 5. Production Architecture & Security
- **API Key Privacy**: All AI API keys are managed server-side and never exposed to the frontend bundle.
- **Zero-Dependency Fallback**: Fully functional out of the box using built-in deterministic heuristics when no external API key is provided.
- **Export Controls**: 1-click export of filtered datasets to CSV or print-ready dashboard reports.

---

## 🏗️ System Architecture

```
insightai/
├── backend/
│   ├── main.py              # FastAPI application gateway & endpoints
│   ├── profiler.py          # Pandas statistical profiling & type inference
│   ├── dashboard_engine.py  # Automated dashboard synthesis (14 chart configs)
│   ├── ai_engine.py         # Modular AI provider adapter (OpenAI / Gemini)
│   ├── copilot.py           # InsightAI natural-language query engine
│   ├── data_store.py        # In-memory dataset caching & filtering
│   ├── sample_data.py       # Pre-loaded benchmark datasets
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── components/          # React components (DashboardView, Copilot, Navbar, etc.)
│   ├── context/             # Global dashboard state & filtering context
│   ├── services/            # Axios / Fetch API client
│   ├── types/               # TypeScript interfaces
│   ├── App.tsx              # Main application shell
│   └── main.jsx             # React DOM entry point
├── tests/
│   └── test_insightai.py    # Automated test suite
└── package.json             # Vite & React dependencies
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** v18+ and **npm**
- **Python** 3.10+

### 1. Clone the Repository
```bash
git clone https://github.com/adityavzm0-eng/AI-Powered-Smart-Dashboard.git
cd AI-Powered-Smart-Dashboard
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

### 3. Frontend Setup
```bash
# In the project root directory
npm install

# Start Vite development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables (Optional)

Create a `.env` file inside the `backend/` directory for external LLM narrative generation:

```env
AI_PROVIDER=gemini        # 'gemini' or 'openai'
AI_MODEL=gemini-1.5-flash # or 'gpt-4o'
AI_API_KEY=your_api_key_here
```

*Note: If no API key is configured, InsightAI automatically uses its deterministic analytical engine.*

---

## 🧪 Testing

Run backend unit and integration tests:

```bash
pytest tests/test_insightai.py -v
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
