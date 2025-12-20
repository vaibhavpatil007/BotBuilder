<p align="center">
  <img src="assets/BOT_logo_removebg.png" alt="BotBuilder Logo" width="120"/>
</p>

<h1 align="center">BotBuilder</h1>

<p align="center">
  <b>Build Intelligent, Knowledge-Grounded AI Agents for Your Business</b>
</p>

<p align="center">
  <a href="https://your-live-demo-link.com">
    <img src="https://img.shields.io/badge/Live-Demo-green?style=for-the-badge" />
  </a>
  <a href="https://github.com/your-username/BotBuilder">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge" />
  </a>
  <a href="https://your-docs-link.com">
    <img src="https://img.shields.io/badge/Documentation-Read-blue?style=for-the-badge" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI-RAG Architecture-purple" />
  <img src="https://img.shields.io/badge/Backend-Django REST-green" />
  <img src="https://img.shields.io/badge/Frontend-React + TypeScript-blue" />
  <img src="https://img.shields.io/badge/VectorDB-FAISS-orange" />
  <img src="https://img.shields.io/badge/LLM-DeepSeek v3.1-red" />
</p>

---

## 🌐 Landing Page Preview

<p align="center">
  <img src="assets/landing-page.png" alt="BotBuilder Landing Page" width="90%" />
</p>

> 📌 *Replace `assets/landing-page.png` with your actual landing page image path.*

---

## 🚀 What is BotBuilder?

**BotBuilder** is a full-stack AI agent creation platform that allows businesses to build, train, deploy, and manage **custom AI chatbots** using their own knowledge base.

Unlike generic chatbots, BotBuilder uses **Retrieval Augmented Generation (RAG)** to ensure that responses are **accurate, context-aware, and grounded only in company documents**.

---

## 🧠 How BotBuilder Works

1. Upload company documents (PDF, DOCX, TXT) or FAQs  
2. Documents are chunked and converted into vector embeddings  
3. Embeddings are stored in **FAISS Vector Database**  
4. User queries retrieve the most relevant chunks  
5. DeepSeek LLM generates responses using retrieved context only  

This architecture eliminates hallucinations and ensures data accuracy.

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Vite
- shadcn/ui

### Backend
- Django
- Django REST Framework
- JWT Authentication

### AI & Data
- LangChain (RAG orchestration)
- OpenRouter API (DeepSeek v3.1)
- FAISS Vector Database
- HuggingFace `all-MiniLM-L6-v2`

---

## ✨ Features

- 🔐 Secure authentication with JWT
- 📊 Centralized dashboard for agents & usage
- 🤖 Multi-step AI agent creation wizard
- 📚 Knowledge base with document uploads & FAQs
- 💬 Context-aware chat interface
- 📈 Agent analytics & performance metrics
- 🗂 Conversation history tracking
- 🌐 Easy deployment & integrations

---

## 📦 Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/BotBuilder.git
cd BotBuilder
