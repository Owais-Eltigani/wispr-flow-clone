# Wispr Clone

A desktop audio visualization and transcription app built with **Tauri v2**, **React**, and **Deepgram**.

## Key Structure

```
wispr-clone/
├── src/
│   ├── components/
│   │   ├── dashboard/      # Sidebar (hardcoded), Stats (hardcoded), HomeView
│   │   └── flow/           # AudioVisualizer, TranscriptView
│   ├── hooks/              # useDeepgram (Audio logic)
│   └── App.tsx
├── src-tauri/              # Rust Backend & Config
└── package.json
```

## Quick Start

**Prerequisites:** Node.js, pnpm, and Rust.

1.  **Install Dependencies:**

    ```bash
    pnpm install  || npm install
    ```

2.  **Run Development Mode:**

    ```bash
    pnpm tauri dev || npm run tauri dev
    ```

3.  **Build for Production:**
    ```bash
    pnpm tauri build
    ```

## 📦 Core Tech Stack”

- **Framework:** [Tauri v2](https://v2.tauri.app/) (Rust + React)
- **Frontend:** React 19, TypeScript, Tailwind CSS v4
- **Audio/AI:** [Deepgram SDK](https://developers.deepgram.com/) (Transcription)
- **Icons:** Lucide React

> **Note:** Ensure you have a valid Deepgram API key configured for transcription features.
