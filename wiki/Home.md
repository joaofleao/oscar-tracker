# Academy Tracker — Wiki

Welcome to the **Academy Tracker** wiki. Academy Tracker is an unofficial movie tracker and social platform built around the Academy Awards. Users can browse Oscar nominees, track watched movies, rank predictions, compete with friends on a leaderboard, and share their results.

---

## Pages

| Page | Description |
|------|-------------|
| [Version History](Version-History) | Full changelog for every release from v1.0.0 to the current version |
| [Getting Started](Getting-Started) | How to set up the project locally and run it on iOS/Android/Web |
| [Architecture](Architecture) | Tech stack, project structure, state management, and backend |
| [Screens](Screens) | Documentation for all 16 screens and their navigation types |
| [Components](Components) | Documentation for all reusable UI components |

---

## Quick Facts

| | |
|---|---|
| **App Name** | Academy Tracker |
| **Current Version** | 5.2 |
| **Platforms** | iOS · Android · Web |
| **Framework** | React Native 0.83 + Expo 55 |
| **Language** | TypeScript 5 (strict) |
| **Backend** | Convex (serverless) |
| **Auth** | Apple Sign-In · Google OAuth · Email/Password |
| **Localizations** | English (en_US) · Portuguese Brazil (pt_BR) |

---

## Repository Layout

```
oscar-tracker/
├── src/
│   ├── assets/        # Fonts, images, Lottie animations
│   ├── components/    # ~45 reusable UI components
│   ├── screens/       # 16 screens (tabs + modals)
│   ├── providers/     # Theme, Edition, User, Strings context
│   ├── router/        # React Navigation setup
│   ├── hooks/         # 6 custom React hooks
│   ├── utils/         # Constants, helper functions
│   └── translations/  # i18n JSON files (en_US, pt_BR)
├── App.tsx            # Root component — mounts all providers
├── app.config.ts      # Expo configuration
├── convex_api.ts      # Auto-generated Convex API types
└── package.json
```
