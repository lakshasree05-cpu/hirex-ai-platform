# HIREX — AI Interview Platform

> Smarter Interviews. Better Hiring.

A full-stack AI-powered interview platform with 6 test rounds, resume screening, and candidate/HR dashboards.

---

## 🚀 Quick Start (No Installation Needed)

Just open **`hirex.html`** in any browser — that's it! The entire frontend is a single self-contained file using React 18 via CDN.

```
open hirex.html          # macOS
start hirex.html         # Windows
xdg-open hirex.html      # Linux
```

---

## 📁 Project Structure

```
hirex/
├── hirex.html              ← ✅ MAIN FILE — Open this in any browser
├── README.md
├── database/
│   └── schema.sql          ← MySQL schema (run once to create tables)
├── backend/                ← Python FastAPI backend
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── requirements.txt
│   ├── .env.example
│   └── routes/
│       ├── auth.py
│       ├── candidates.py
│       ├── hr.py
│       └── tests.py
└── frontend/               ← Vite + React (requires Node.js)
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── components/
        └── pages/
```

---

## ✨ Features

### Candidate Side
| Feature | Description |
|---|---|
| 🧠 **Aptitude Test** | 10 MCQs — speed, percentage, ratios, profit/loss, HCF, series |
| 💡 **Reasoning Test** | 10 MCQs — number series, coding-decoding, blood relations, directions |
| ⌨️ **Coding Test** | 2 problems (Two Sum, Palindrome) with live code editor + test runner |
| ⚡ **Typing Test** | Real-time WPM counter, accuracy %, highlighted paragraph |
| 👥 **Group Discussion** | Topic read → timed written response → AI monitoring indicators |
| 🤖 **AI Interview** | 5 sequential questions, record/type responses, AI feedback |

### HR Side
| Feature | Description |
|---|---|
| 📄 **Resume Screening** | 5 real candidate profiles with AI match scores |
| ⭐ **Shortlist/Reject** | One-click shortlisting with status tracking |
| 📊 **Dashboard** | Stats — active jobs, candidates, shortlisted, hired |

### Resume Screening Candidates
| Name | Degree | CGPA | AI Match |
|---|---|---|---|
| Anjali Menon | B.E. CSE – APJ KTU | 8.48 | **91%** |
| Kavi Priya S | B.E. CSE – Anna University | 8.32 | **88%** |
| Rahul N | B.E. CSE – VTU | 7.92 | **83%** |
| Praveen Kumar | B.E. CSE – VTU | 7.88 | **82%** |
| Priya Sharma | BCA – Jaipur National University | 8.21 | **78%** |

---

## 🗄️ Database Setup (MySQL)

```bash
# 1. Start MySQL
mysql -u root -p

# 2. Run schema
mysql -u root -p < database/schema.sql

# 3. Verify
USE hirex_db;
SHOW TABLES;
```

---

## 🐍 Backend Setup (Python FastAPI)

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and fill in your MySQL credentials and JWT secret

# Start server
uvicorn main:app --reload --port 8000
```

API docs available at: **http://localhost:8000/api/docs**

---

## ⚛️ Frontend Setup (Vite + React — requires Node.js)

```bash
cd frontend
npm install
npm run dev
```

Open: **http://localhost:5173**

> **Note:** The `hirex.html` file in the root works without Node.js and has all the same functionality.

---

## 🔐 Environment Variables

Copy `backend/.env.example` → `backend/.env` and fill in:

```env
DATABASE_URL=mysql+pymysql://root:yourpassword@localhost/hirex_db
SECRET_KEY=your-very-long-random-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
```

---

## 🌐 Push to GitHub

```bash
# 1. Create a repo on github.com (name it: hirex)

# 2. Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/hirex.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## 🧭 Navigation Guide

| Where to click | What happens |
|---|---|
| **Landing page → Get Started** | Goes to Candidate Login/Signup |
| **Login as HR / Admin** | Opens HR Login page |
| **Any OTP → Verify OTP** | Enters Candidate Dashboard |
| **Test Rounds → click any round card** | Opens that test (fully interactive) |
| **HR Dashboard → Resume Screening** | Shows 5 candidate cards with AI scores |
| **Click a candidate card** | Full profile view with Shortlist/Reject buttons |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend (standalone) | HTML5, CSS3, React 18 (CDN), Babel Standalone |
| Frontend (full) | React 18, Vite, JSX |
| Backend | Python 3.11, FastAPI, SQLAlchemy, Pydantic v2 |
| Database | MySQL 8.x |
| Auth | JWT (python-jose), bcrypt (passlib) |
| Animation | HTML5 Canvas API |

---

Made with ❤️ using HIREX AI Interview Platform
