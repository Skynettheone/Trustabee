<div align="center">

<img src="logo/LOGO_LANDSCAPE.png" alt="Trustabee" width="320" />

**A marketplace MVP that connects Sri Lankan honey farmers with UK buyers.**

![React](https://img.shields.io/badge/React-149ECA?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-FF9900?style=flat-square&logo=awsamplify&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/status-MVP-f59e0b?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-yellow?style=flat-square)

</div>

> **Note:** This project is an MVP (Minimum Viable Product) built to quickly validate core features and user experience.

## Features

- **For farmers:** onboarding, honey sample submission, verification status, badges, and an export journey tracker on a personal dashboard
- **For buyers:** browse verified honey, save favourites, manage a cart and track orders
- **For admins:** review and approve farmer verifications
- Sign-in and registration, with separate import and export welcome flows

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```

To run MongoDB locally, `scripts/setup-mongodb.sh` starts `mongod` with its data in `./data/db`.

## Scripts

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — Lint code

## Tech Stack

- Vite
- React
- TypeScript
- Redux Toolkit (with redux-persist)
- React Router
- Tailwind CSS
- AWS Amplify
- MongoDB

## License

[MIT](LICENSE)
