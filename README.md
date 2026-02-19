# 🍳 Cookr: Futuristic Recipe Discovery

Welcome to **Cookr**, a high-fidelity, futuristic recipe discovery platform. This project combines a cutting-edge **React + Tailwind CSS** landing page with a robust **FastAPI** backend to deliver a seamless culinary exploration experience.

---

## 🌌 Features

### ⚛️ Frontend (Cookr Discovery UI)
- **Glassmorphism Design:** Frosty glass cards and containers with high-performance `backdrop-blur`.
- **Neon Glow System:** Dynamic neon blue accents (`#4D7CFE`) and glowing borders.
- **Interactive UI:** Smooth transitions, hover-zoom effects, and animated bokeh background particles.
- **Responsive Layout:** A fluid grid system that adapts perfectly to Desktop, Tablet, and Mobile.
- **Modular Architecture:** Reusable components including `Navbar`, `SearchBar`, `FilterChip`, and `RecipeCard`.

### ⚙️ Backend (Recipe API)
- **FastAPI Core:** High-performance asynchronous API handles recipe retrieval and filtering.
- **SQLite Database:** Persistent storage for thousands of curated global recipes.
- **Advanced Filtering:** Query recipes by cuisine type, rating (4.0+), cooking time, and caloric intake.
- **CORS Enabled:** Pre-configured to support local development origins.

---

## 📂 Project Structure

```text
securin-placement-project-main/
├── backend/            # FastAPI Backend Service
│   ├── main.py         # Application Entry & CORS Config
│   ├── models.py       # SQLAlchemy Models
│   ├── database.py     # SQLite Connection Logic
│   └── recipes.db      # SQLite Database File
└── frontend/           # React Frontend Application
    ├── src/
    │   ├── components/ # Modular UI Components
    │   ├── App.js      # Main Application Layer
    │   └── services/   # API Integration Services
```

---

## 🚀 Getting Started

### 1. Backend Setup
Navigate to the backend directory and start the FastAPI server:
```powershell
cd backend
# Recommended: Create a virtual environment
python -m venv venv
./venv/Scripts/activate
# Install dependencies
pip install fastapi uvicorn sqlalchemy
# Start the server
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup
Navigate to the frontend directory and start the development server:
```powershell
cd frontend
# Install dependencies
npm install
# Start React app
npm start
```
*The app will be available at `http://localhost:3000` (or `3001` if port 3000 is taken).*

---

## 🎨 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS, Lucide React, Framer Motion |
| **Backend** | Python, FastAPI, Uvicorn |
| **Database** | SQLite, SQLAlchemy |
| **Design** | Glassmorphism, Neon UI, Neumorphism |

---

## 🛠️ Configuration
- **API URL:** The frontend is configured to fetch from `http://localhost:8000`.
- **CORS:** The backend explicitly allows `http://localhost:3000` and `http://localhost:3001`.

---

## 📜 License
Developed as part of the **Securin Placement Project**. All rights reserved.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/248ee22b-5369-49df-9b97-fc69e6233390" />
