
# Ben10 AI - Indian Legal Adviser Setup Guide

This project is a high-performance React application designed to provide AI-powered legal guidance for Indian Law.

## Prerequisites
- **Node.js**: Install the latest LTS version from [nodejs.org](https://nodejs.org/).
- **API Key**: Get your free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/).

## Local Installation

1. **Clone or Download**: Save all the project files into a folder named `ben10-ai`.
2. **Install Dependencies**:
   Open your terminal in the project folder and run:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:
   Create a file named `.env` in the root folder and add your key:
   ```env
   API_KEY=your_actual_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
5. **Open the App**:
   Navigate to `http://localhost:5173` in your browser.

## Deployment
For instructions on how to put this project online, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Project Structure
- `App.tsx`: Main application shell and view router.
- `components/`: UI building blocks (Sidebar, ChatBubble).
- `services/`: AI logic and API integration.
- `constants.tsx`: Legal data, IPC/BNS sections, and checklists.

## Important Disclaimer
This tool is for educational and documentation assistance. Always consult a qualified legal professional for actual legal matters.
