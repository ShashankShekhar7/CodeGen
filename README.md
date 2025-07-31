# CodeGen

**AI-Powered React JSX UI Generator**

CodeGen is a full-stack web application where users can log in, chat with an AI, and instantly generate deployable, production-quality React JSX & CSS components with live preview, code export, and collaborative session management.

## Features

- **Authentication:** Secure signup, login, JWT-based session, and logout using a modern React + Vite frontend and Node/Express backend.
- **AI-Driven Component Generation:** Prompt an AI (via OpenRouter or Gemini API) to generate responsive React component code.
- **Live Preview Sandbox:** Instantly renders AI-generated JSX+CSS using an in-browser, isolated React/Babel sandbox.
- **Session Management:** Save, load, and rename chat/code sessions. Sidebar for quick navigation.
- **Export Tools:** Copy or download code, with JSZip and file-saver integration.
- **Beautiful, Responsive UI:** Customizable, professional inline styles, real-world workflow features.
- **Production Ready Deployment:** Frontend on Vercel, backend on Render, SPA routing support, CORS configured.

## Tech Stack

- **Frontend:** React 19, Vite, Zustand, React Router, Axios, React Syntax Highlighter
- **Backend:** Node.js, Express, MongoDB, Mongoose, CORS
- **AI Integration:** OpenRouter API, Gemini or other supported LLMs
- **Deployment:** Vercel (frontend), Render (backend)

## Getting Started

### 1. Clone the Repo
git clone https://github.com/your-username/codegen.git
- cd codegen

### 2. Environment Setup

#### Backend (`/server` or root)
- Copy `.env.example` to `.env`
- Fill in your secrets:
- MONGO_URI=your-mongodb-url
- JWT_SECRET=your-jwt-secret
- OPENROUTER_API_KEY=your-openrouter-key

  
#### Frontend (`/client`)
- Copy `.env.example` to `.env`
- Set the backend API url:

-VITE_API_BASE_URL=https://your-backend.onrender.com/api


### 3. Running Locally

#### Backend
- cd server
- npm install
- npm start

  
## Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b7369359-e7b9-47a1-abc3-0b2f3cc60fe2" />
<img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/25d7efbb-dc9e-4422-b9fc-eb931fb11f01" />


## Environment Variables

**Backend (.env):**
- `MONGO_URI`
- `JWT_SECRET`
- `OPENROUTER_API_KEY`

**Frontend (.env):**
- `VITE_API_BASE_URL` (must point to the deployed backend endpoint)

## Security & Best Practices

- **Do not commit `.env` or credentials to the repo.**
- Use environment variable managers on Vercel and Render.
- CORS is locked down in production (see backend config).
- Consider enabling HTTPS and reviewing security headers for production deployments.

## Contributing

1. Fork the repo
2. Create your branch (`git checkout -b feat/featureName`)
3. Commit and push (`git commit -am 'Add new feature' && git push origin feat/featureName`)
4. Open a Pull Request

## License

[MIT](./LICENSE)

**Questions? Feature requests? Issues?**  
Open an issue or start a discussion via GitHub!

**CodeGen: Instantly prototype, preview, and export React UIs powered by AI.**


