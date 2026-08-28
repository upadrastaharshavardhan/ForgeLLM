<div align="center">

# 🔥 ForgeLLM

### **Forge Intelligence. Quench Complexity. Build Without Limits.**

**A free, privacy-conscious AI assistant powered by Harsha's own ForgeLM model.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-ForgeLLM-ff6b35?style=for-the-badge)](https://forgellmbyharsha.netlify.app/)
[![Model](https://img.shields.io/badge/🤖_Model-ForgeLM-blue?style=for-the-badge)](https://github.com/upadrastaharshavardhan/ForgeLM)
[![Hosting](https://img.shields.io/badge/🚀_Model_Hosting-Hugging_Face_Spaces-FFD21E?style=for-the-badge)](https://huggingface.co/spaces)
[![Frontend](https://img.shields.io/badge/▲_Frontend-Netlify-00C7B7?style=for-the-badge)](https://www.netlify.com/)

<br/>

### 🌐 **[Try ForgeLLM Live →](https://forgellmbyharsha.netlify.app/)**

### 🧠 **[Explore ForgeLM →](https://github.com/upadrastaharshavardhan/ForgeLM)**

### 🤺**[ForgeLM-datasets→](https://github.com/upadrastaharshavardhan/ForgeLM-datasets)**

</div>

---

## 🧠 What is ForgeLLM?

**ForgeLLM** is an AI chat platform built around a simple idea:

> ### **Own the Model. Own the Intelligence. Own the Experience.**

Unlike many AI chat applications that simply act as a UI wrapper around **OpenRouter, OpenAI, Gemini, Claude, or another external LLM provider**, ForgeLLM is powered by **ForgeLM** — a model developed and maintained as part of my own AI project.

The complete inference flow is built around:

**ForgeLLM UI → Netlify Edge Function → ForgeLM → Hugging Face Space**

There is **no OpenRouter dependency** in the production model pipeline.

ForgeLLM provides a modern conversational AI experience with multiple conversations, streaming responses, code rendering, response styles, themes, regeneration, and browser-based conversation persistence.

---

# ✨ Live Experience

<div align="center">

<img width="1366" height="728" alt="ForgeLLM Home" src="https://github.com/user-attachments/assets/b774bc8f-6a5a-42f7-b730-65075ce02181" />

<br/><br/>

<img width="1366" height="730" alt="ForgeLLM Chat Interface" src="https://github.com/user-attachments/assets/95311646-33b9-4ef2-bab1-caa2785fbb11" />

<br/><br/>

<img width="1366" height="726" alt="ForgeLLM AI Conversation" src="https://github.com/user-attachments/assets/a2bd6d80-c1f3-40e6-a487-5ca0c5e54d72" />

<br/><br/>

<img width="1366" height="731" alt="ForgeLLM Response Styles" src="https://github.com/user-attachments/assets/d6f96e5a-f198-4c95-955b-720d44d36213" />

<br/><br/>

<img width="1365" height="727" alt="ForgeLLM Settings" src="https://github.com/user-attachments/assets/c32c3fba-b7fe-46b1-a641-bf195c773e02" />

<br/><br/>

<img width="1366" height="726" alt="ForgeLLM Code Experience" src="https://github.com/user-attachments/assets/24b2d520-e889-4967-bf29-c325f7bde6f8" />

<br/><br/>

<img width="1366" height="729" alt="ForgeLLM Multiple Conversations" src="https://github.com/user-attachments/assets/d282df43-c906-444b-98af-01a29096599d" />

<br/><br/>

<img width="1366" height="728" alt="ForgeLLM Mobile Experience" src="https://github.com/user-attachments/assets/2756f999-1b2f-406d-8789-0a25b7559b3c" />

</div>

---

# 🔥 The ForgeLLM Philosophy

ForgeLLM is inspired by the process of metalworking.

### 🔥 Forge

Take an idea and shape it.

Ask questions. Generate code. Solve problems. Explore concepts. Build something new.

### ❄️ Quench

Refine and strengthen the result.

Debug code. Improve reasoning. Review answers. Reduce complexity. Turn rough ideas into something stronger.

> **Forge the idea. Quench the complexity.**

---

# 🚀 Key Features

<table>
<tr>
<td width="50%">

### 💬 Intelligent Conversations

Create and manage multiple AI conversations from a modern sidebar interface.

* Create new chats
* Rename conversations
* Delete conversations
* Switch instantly between conversations
* Continue previous discussions

</td>

<td width="50%">

### 🧠 Powered by ForgeLM

ForgeLLM communicates with **my own ForgeLM model**.

* No OpenRouter
* No external LLM router
* No dependency on OpenAI
* No dependency on Claude
* No dependency on Gemini

The inference backend runs independently on **Hugging Face Spaces**.

</td>
</tr>

<tr>
<td>

### ⚡ Streaming Responses

Responses are streamed back to the browser in real time.

This creates a natural AI chat experience instead of waiting for the entire response to finish before displaying it.

</td>

<td>

### 🎯 Response Styles

Choose how ForgeLLM responds.

**Precise**
Direct and concise answers.

**Balanced**
A balance between explanation and detail.

**Creative**
More exploratory and expressive responses.

</td>
</tr>

<tr>
<td>

### 💻 Developer-Friendly Output

Built for technical users.

* Markdown rendering
* Syntax-highlighted code
* Clean code blocks
* One-click code copying
* Structured AI responses

</td>

<td>

### ⛔ Stop & Regenerate

Stay in control of every response.

* Stop an in-progress generation
* Press `Esc` to cancel
* Regenerate the latest response
* Retry without starting a new conversation

</td>
</tr>

<tr>
<td>

### 🔥 Forge & ❄️ Quench Themes

Two visual identities inspired by the product philosophy.

🔥 **Forge** — Dark Ember
❄️ **Quench** — Cool Cyan

</td>

<td>

### 📱 Responsive Design

ForgeLLM is designed to work across devices.

* Desktop
* Laptop
* Tablet
* Mobile
* Collapsible sidebar

</td>
</tr>
</table>

---

# 🏗️ Architecture

ForgeLLM separates the **user experience**, **secure serverless layer**, and **model inference infrastructure**.

```text
                         ┌─────────────────────┐
                         │      USER / WEB     │
                         │                     │
                         │    ForgeLLM UI      │
                         │  HTML • CSS • JS    │
                         └──────────┬──────────┘
                                    │
                                    │ HTTPS
                                    ▼
                         ┌─────────────────────┐
                         │       NETLIFY       │
                         │                     │
                         │  Edge Function      │
                         │   /api/chat         │
                         │                     │
                         │ • Input Validation  │
                         │ • Guardrails        │
                         │ • Style Mapping     │
                         │ • Secure Proxy      │
                         │ • SSE Streaming     │
                         └──────────┬──────────┘
                                    │
                                    │ HTTPS
                                    ▼
              ┌────────────────────────────────────────┐
              │           HUGGING FACE SPACES          │
              │                                        │
              │          ForgeLM Inference Server      │
              │                                        │
              │         forgelm_serve.py               │
              │                                        │
              │  ┌──────────────────────────────────┐  │
              │  │            ForgeLM               │  │
              │  │                                  │  │
              │  │   Harsha's Own AI Model Project  │  │
              │  │                                  │  │
              │  └──────────────────────────────────┘  │
              └────────────────────────────────────────┘
```

---

# 🧠 Powered by My Own ForgeLM Model

## ForgeLLM does NOT use OpenRouter

This is an important architectural decision.

ForgeLLM is **not a frontend wrapper for OpenRouter**.

It does not route user prompts through:

```text
❌ OpenRouter
❌ OpenAI API
❌ Claude API
❌ Gemini API
❌ Other LLM aggregation platforms
```

Instead, ForgeLLM communicates directly with the ForgeLM inference API.

```text
ForgeLLM
    │
    ▼
Netlify Edge Function
    │
    ▼
My ForgeLM API
    │
    ▼
ForgeLM Model
```

### 🧠 ForgeLM Repository

The model powering ForgeLLM is based on my own ForgeLM project:

👉 **https://github.com/upadrastaharshavardhan/ForgeLM**

ForgeLM is deployed as a dedicated inference service on **Hugging Face Spaces**.

This allows the model to remain independent from the Netlify frontend infrastructure.

---

# ☁️ Why Hugging Face Spaces?

A full AI model cannot run directly inside a Netlify Edge Function.

Netlify Edge Functions are excellent for:

* API routing
* Request validation
* Security boundaries
* Lightweight transformations
* Streaming
* Serverless proxy logic

However, they are not designed to host a long-running Python AI model process.

ForgeLM requires an environment capable of running:

```text
Python
↓
Model Runtime
↓
ForgeLM Loaded in Memory
↓
Long-Running Inference Server
```

Therefore, the architecture separates the application into two layers.

### 🌐 Netlify

Hosts the ForgeLLM web application and Edge Function.

### 🤗 Hugging Face Spaces

Runs the ForgeLM inference server.

```text
Netlify ≠ Model Hosting

Netlify
   ↓
Secure Edge Proxy
   ↓
Hugging Face Space
   ↓
ForgeLM
```

---

# 🔐 Security Architecture

The browser never communicates directly with the model server configuration.

```text
Browser
   │
   │ POST /api/chat
   ▼
Netlify Edge Function
   │
   ├── System Instructions
   ├── Input Validation
   ├── Response Style
   ├── Environment Variables
   └── Model Configuration
            │
            ▼
      ForgeLM Server
```

Sensitive configuration remains server-side.

### Environment Variables

```env
FORGELM_API_URL=https://your-huggingface-space.hf.space/v1
FORGELM_MODEL=ForgeLM-v1
FORGELM_API_KEY=optional
```

These values are handled by the deployment environment and are not embedded directly in browser JavaScript.

---

# ⚙️ Response Style Mapping

ForgeLLM keeps model tuning separate from the frontend.

The UI sends the selected style:

```text
Precise
Balanced
Creative
```

The server determines the corresponding generation configuration.

Example:

```text
Precise   → Lower Temperature
Balanced  → Medium Temperature
Creative  → Higher Temperature
```

This means the frontend does not need direct access to internal model generation settings.

---

# 📂 Project Structure

```text
ForgeLLM/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── netlify/
│   └── edge-functions/
│       └── chat.ts
│
├── .env.example
├── netlify.toml
├── package.json
└── README.md
```

### Important Files

| File                             | Responsibility                                |
| -------------------------------- | --------------------------------------------- |
| `public/index.html`              | Main ForgeLLM interface                       |
| `public/styles.css`              | Forge and Quench themes + responsive UI       |
| `public/app.js`                  | Chat logic, conversations and browser storage |
| `netlify/edge-functions/chat.ts` | Secure proxy between UI and ForgeLM           |
| `netlify.toml`                   | Netlify routing and deployment configuration  |
| `.env.example`                   | Environment variable template                 |

---

# 🔄 Request Flow

When a user sends a message:

```text
1. User enters a prompt
        ↓
2. ForgeLLM UI sends request to /api/chat
        ↓
3. Netlify Edge Function validates request
        ↓
4. Guardrails and response style are applied
        ↓
5. Request is forwarded to ForgeLM
        ↓
6. ForgeLM runs inference on Hugging Face Spaces
        ↓
7. Response is streamed back
        ↓
8. ForgeLLM renders Markdown and code blocks
```

---

# 🖥️ Local Development

## 1. Clone the Repository

```bash
git clone <YOUR_FORGELLM_REPOSITORY_URL>
cd ForgeLLM
```

## 2. Install Netlify CLI

```bash
npm install -g netlify-cli
```

## 3. Create Environment Configuration

```bash
cp .env.example .env
```

Update the file:

```env
FORGELM_API_URL=https://your-huggingface-space.hf.space/v1
FORGELM_MODEL=ForgeLM-v1
```

## 4. Start Development Server

```bash
netlify dev
```

Open:

```text
http://localhost:8888
```

This runs both:

* The ForgeLLM frontend
* The Netlify Edge Function

The Edge Function then communicates with your deployed ForgeLM server.

---

# 🚀 Deploy to Netlify

## Option 1 — Netlify CLI

```bash
npm install -g netlify-cli
```

Initialize:

```bash
netlify init
```

Configure your ForgeLM backend:

```bash
netlify env:set FORGELM_API_URL https://your-huggingface-space.hf.space/v1
```

```bash
netlify env:set FORGELM_MODEL ForgeLM-v1
```

Deploy:

```bash
netlify deploy --prod
```

---

## Option 2 — GitHub + Netlify

### Step 1

Push the ForgeLLM project to GitHub.

### Step 2

Open Netlify and select:

```text
Add New Site
        ↓
Import an Existing Project
        ↓
Select GitHub Repository
```

### Step 3

Configure:

```text
Build Command:
None

Publish Directory:
public
```

### Step 4

Add environment variables:

```text
FORGELM_API_URL
FORGELM_MODEL
FORGELM_API_KEY (optional)
```

Example:

```env
FORGELM_API_URL=https://your-huggingface-space.hf.space/v1
FORGELM_MODEL=ForgeLM-v1
```

### Step 5

Deploy.

---

# 🤗 ForgeLM Model Deployment

ForgeLLM requires a publicly reachable ForgeLM inference endpoint.

The recommended architecture is:

```text
Your ForgeLM Repository
        │
        ▼
Hugging Face Space
        │
        ▼
Python Inference Server
        │
        ▼
Public HTTPS API
        │
        ▼
Netlify Edge Function
        │
        ▼
ForgeLLM Users
```

The model server should expose an API compatible with:

```text
POST /v1/chat/completions
```

The Netlify Edge Function forwards chat requests to this endpoint and streams responses back to the user.

---

# 🌍 Production Architecture

```text
┌───────────────────────────────────────────────┐
│                  ForgeLLM                     │
│                                               │
│        https://forgellmbyharsha.netlify.app   │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                  NETLIFY                      │
│                                               │
│            Edge Function /api/chat            │
│                                               │
│       Security • Validation • Streaming       │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             HUGGING FACE SPACES               │
│                                               │
│            ForgeLM API Server                 │
│                                               │
│          /v1/chat/completions                 │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                    ForgeLM                    │
│                                               │
│       My Custom AI Model & Inference Stack    │
└───────────────────────────────────────────────┘
```

---

# 🧩 Technology Stack

| Layer                | Technology                     |
| -------------------- | ------------------------------ |
| Frontend             | HTML, CSS, JavaScript          |
| Hosting              | Netlify                        |
| Serverless Layer     | Netlify Edge Functions         |
| Model Backend        | Python                         |
| Model                | ForgeLM                        |
| Model Hosting        | Hugging Face Spaces            |
| Streaming            | Server-Sent Events             |
| Conversation Storage | Browser Local Storage          |
| Code Rendering       | Markdown + Syntax Highlighting |

---

# 🎯 Roadmap

* [x] ForgeLLM AI chat interface
* [x] Forge and Quench themes
* [x] Multiple conversations
* [x] Local browser persistence
* [x] Markdown rendering
* [x] Syntax-highlighted code blocks
* [x] Copy code functionality
* [x] Streaming responses
* [x] Stop generation
* [x] Regenerate responses
* [x] Response style presets
* [x] Mobile responsive interface
* [x] ForgeLM model integration
* [x] Hugging Face Spaces inference deployment
* [ ] User authentication
* [ ] Cloud conversation synchronization
* [ ] Persistent user profiles
* [ ] Conversation export
* [ ] File and document analysis
* [ ] Image understanding
* [ ] Voice conversations
* [ ] ForgeLM model improvements
* [ ] Multi-model Forge ecosystem

---

# 🧭 Vision

ForgeLLM is more than a chat interface.

The goal is to build an independent AI ecosystem around **ForgeLM**, where the model, inference infrastructure, application experience, and future AI capabilities can evolve together.

```text
ForgeLM
   │
   ├── ForgeLLM Chat
   │
   ├── Developer Assistant
   │
   ├── AI Agents
   │
   ├── Document Intelligence
   │
   ├── Code Intelligence
   │
   └── Future Forge AI Ecosystem
```

> **Don't just consume intelligence. Forge it.**

---

# 👨‍💻 Author

## Harsha Vardhan Upadrasta

AI Automation Tester • Application Developer • AI Builder

Building AI-powered automation systems, intelligent QA platforms, AI agents, and developer tools.

### 🔗 Projects

🧠 **ForgeLM**
https://github.com/upadrastaharshavardhan/ForgeLM

🔥 **ForgeLLM**
https://forgellmbyharsha.netlify.app/

---

<div align="center">

# 🔥 ForgeLLM

### **Forge Ideas. Quench Complexity. Build Intelligence.**

**Powered by ForgeLM • Hosted on Hugging Face Spaces • Delivered through Netlify**

<br/>

⭐ **If you like the project, consider giving it a star!**

</div>
