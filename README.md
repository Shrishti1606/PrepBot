# 🤖 PrepBot

A full-stack web application that analyzes your resume and job description using AI to generate a personalized interview preparation plan..

The application takes a **PDF resume, self description and job description**, extracts its content, and sends it to an AI model to generate an **interview-style report** including match score and technical interview questions.

---

## ✨ Features

- **Resume Upload** — Upload your PDF resume for AI analysis
- **Self Description** — Alternatively describe yourself in text
- **Match Score** — See how well your profile matches the job
- **Technical Questions** — AI-generated questions with intentions and model answers
- **Behavioral Questions** — Soft skill questions tailored to the role
- **Preparation Roadmap** — Day-by-day preparation plan
- **Skill Gap Analysis** — Identify missing skills with severity levels
- **Resume Download** — Generate and download a tailored resume as PDF
- **Authentication** — Secure login/register with JWT and cookie-based sessions
- **Report History** — View all previously generated interview plans

---

## 🛠️ Tech Stack

**Frontend** — React.js, Vite, Axios, SCSS

**Backend** — Node.js, Express.js, MongoDB, JWT, Multer, Puppeteer

**AI** — Groq API (llama-3.3-70b-versatile)

---

## ⚠️ Limitations

- AI-generated resume may lack professional formatting and design
- Personal details only appear in resume if clearly provided in input
- Scanned/image-based PDFs cannot be parsed correctly
- Vague job descriptions lead to generic outputs
- Groq free tier has rate limits — generation may fail under heavy use
- Report generation takes 20-40 seconds with no progress indicator
- Sessions expire after 24 hours

---

## 🔮 Future Improvements

- [ ] Better resume templates with multiple design options
- [ ] Mock interview mode with voice input
- [ ] ATS score checker
- [ ] Email report delivery

---

**LinkedIn**: [linkedin.com/in/shrishti-dhiman](https://linkedin.com/in/shrishti-dhiman)

