# Getting Started

This page explains how to get the project running locally and how to work with the main development tools.

---

## Prerequisites

| Tool | Recommended Version |
|------|-------------------|
| Node.js | 20 LTS or later |
| npm | 10 or later |
| Expo CLI | Installed via `npx expo` (no global install needed) |
| iOS Simulator | Xcode 15+ (macOS only) |
| Android Emulator | Android Studio + SDK 34+ |

---

## 1. Clone and Install

```bash
git clone https://github.com/joaofleao/oscar-tracker.git
cd oscar-tracker
npm install
```

---

## 2. Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
# The Movie Database (TMDB) — https://www.themoviedb.org/settings/api
TMDB_API_KEY=your_tmdb_api_key

# Convex backend deployment URL
CONVEX_URL=https://your-deployment.convex.cloud

# Firebase (used in versions < 5.0 — not required for v5+)
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
```

> **Note:** TMDB and Convex keys are required to run the app. Firebase keys are only needed if you are running a version older than v5.0.

---

## 3. Start the Development Server

```bash
npm start
```

This command starts the **Expo development server** and automatically regenerates the Convex API type definitions (`convex_api.ts`).

Once the server is running:

| Key | Action |
|-----|--------|
| `i` | Open iOS Simulator |
| `a` | Open Android Emulator |
| `w` | Open in Web Browser |

---

## 4. Platform-Specific Commands

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

---

## 5. Linting

The project uses ESLint 9 with strict TypeScript rules and Prettier integration.

```bash
npm run lint
```

The lint target is configured with `--max-warnings 0`, so any warning is treated as an error.

---

## 6. Convex API Generation

The Convex type definitions in `convex_api.ts` are auto-generated. To regenerate them manually:

```bash
npm run cvx
```

This runs the Convex codegen and formats the output file.

---

## 7. EAS (Expo Application Services) Builds

The project is configured for EAS Build. Profiles are defined in `eas.json`:

| Profile | Purpose |
|---------|---------|
| `development` | Local dev client builds |
| `preview` | Internal distribution builds |
| `production` | App Store / Play Store builds |

To trigger a build:

```bash
npx eas build --profile production --platform ios
```

---

## 8. Project Scripts Summary

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `npm start` | Start Expo + regenerate Convex API |
| `android` | `npm run android` | Launch on Android |
| `ios` | `npm run ios` | Launch on iOS |
| `web` | `npm run web` | Launch in browser |
| `lint` | `npm run lint` | Run ESLint (0 warnings allowed) |
| `cvx` | `npm run cvx` | Regenerate Convex API types |

---

## 9. TypeScript Path Aliases

`tsconfig.json` defines the following path aliases for clean imports:

| Alias | Resolves To |
|-------|-------------|
| `@components/*` | `src/components/*` |
| `@screens/*` | `src/screens/*` |
| `@providers/*` | `src/providers/*` |
| `@hooks/*` | `src/hooks/*` |
| `@utils/*` | `src/utils/*` |
| `@router/*` | `src/router/*` |
| `@translations/*` | `src/translations/*` |
| `@assets/*` | `src/assets/*` |

---

## 10. Contributing

Contributions and suggestions are welcome. Please reach out to **joaofleao@gmail.com** before submitting a pull request.
