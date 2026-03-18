# Architecture

This page describes the technical architecture, project structure, state management approach, and backend integration of Academy Tracker.

---

## Tech Stack

### Frontend

| Library | Version | Role |
|---------|---------|------|
| React Native | 0.83.2 | Mobile framework |
| Expo | 55.0.5 | Build toolchain + native modules |
| React | 19.2.0 | UI rendering |
| TypeScript | 5.9.2 (strict) | Language |
| React Navigation | 7.x | Navigation (Native Stack + Bottom Tabs) |
| React Native Reanimated | 4.2.1 | Animations |
| React Native Gesture Handler | 2.30.0 | Swipe/pan gestures |
| Lottie React Native | 7.3.6 | Lottie animations |
| Expo Blur | — | Background blur effects |
| React Native SVG | 15.15.3 | SVG icon rendering |
| React Native MMKV | 4.1.2 | High-performance local storage |
| React Native View Shot | 4.0.3 | Screenshot capture for share feature |
| i18next + react-i18next | 25.3.6 | Internationalization |

### Backend & Auth

| Service | Role |
|---------|------|
| Convex | Serverless database, real-time queries, mutations |
| @convex-dev/auth | Auth session management on Convex |
| Apple Sign-In (`expo-apple-authentication`) | iOS native sign-in |
| Google Auth (`google-auth-library`) | Google OAuth |
| Expo Secure Store | Encrypted token storage |
| Resend | Transactional email (OTP delivery) |

### External APIs

| API | Usage |
|-----|-------|
| TMDB (The Movie Database) | Movie metadata, posters, cast, streaming providers |

---

## Project Structure

```
src/
├── assets/
│   ├── animations/        # Lottie JSON animation files
│   ├── app/               # App icon, splash screen
│   └── fonts/             # Tienne, Inconsolata, Spartan font files
│
├── components/            # ~45 reusable UI components (see Components page)
│
├── screens/               # 16 screen components (see Screens page)
│
├── providers/
│   ├── theme/             # Design system — colors, typography, spacing
│   ├── edition/           # Current Oscar edition — categories, nominations
│   ├── user/              # Auth state, user profile, preferences
│   └── strings/           # i18n localization helper
│
├── router/
│   ├── router.tsx         # Stack + Tab navigator configuration
│   ├── types.ts           # Typed route params
│   └── styles.ts          # Navigation-level styles
│
├── hooks/
│   ├── useConvexErrorHandler.ts
│   ├── useHeaderAnimation.tsx
│   ├── useModal.ts
│   ├── usePressableAnimation.ts
│   ├── useScreenInsets.ts
│   └── error_catalog.ts
│
├── utils/
│   ├── constants.ts       # App-wide constants
│   ├── functions.ts       # Shared helpers
│   ├── ordinals.ts        # Ordinal number formatting (1st, 2nd…)
│   ├── print.ts           # Debug logging wrapper
│   └── runtime.ts         # Runtime environment checks
│
└── translations/
    └── locales/
        ├── en_US.json
        └── pt_BR.json
```

---

## Provider Hierarchy

Providers are layered in `App.tsx` from outermost to innermost:

```
ConvexProvider                  ← Convex backend client
  └── ConvexAuthProvider        ← Auth session
        └── ThemeProvider       ← Design tokens
              └── UserProvider  ← User profile & auth state
                    └── EditionProvider  ← Oscar edition data
                          └── StringsProvider  ← i18n helper
                                └── <NavigationContainer>
                                      └── Router
```

### ThemeProvider

Exposes the design system through `useTheme()`.

**Color System (Semantic Tokens)**

| Token | Purpose |
|-------|---------|
| `background.base` | Main screen background |
| `background.foreground` | Primary text on background |
| `background.stroke` | Borders on background |
| `container.base` | Secondary/card background |
| `container.foreground` | Text on container |
| `container.stroke` | Borders on container |
| `accent.base` | Accent/highlight color |
| `accent.foreground` | Text on accent |
| `brand.base` | Gold brand color |
| `positive` | Success states (jade green) |
| `negative` | Error states (ruby red) |
| `caution` | Warning states (tangerine) |

Each semantic color provides four variants: `.default`, `.pressed`, `.tint` (60% opacity), `.darken` (80% opacity), and `.gradient` (array for gradients).

**Typography Families**

| Family | Weights | Usage |
|--------|---------|-------|
| Tienne | Black, Bold, Regular | Display / headings |
| Inconsolata | Black, Bold, Regular | Monospace body text |
| Inconsolata_SemiExpanded | Black, Bold, Regular | Wider monospace |
| Spartan | Light, Bold, Regular | UI labels, body |

### EditionProvider

Loads the active Oscar edition from Convex and exposes:

- All categories for the edition (ordered by user preference)
- All nominations per category
- Edition metadata (year, announcement date, ceremony date, status)
- Actions: switch edition, update category order/visibility

### UserProvider

Manages authentication state and user data:

- Current user profile (name, username, avatar)
- Auth actions: sign in, sign up, sign out, delete account
- User preferences: spoiler settings, language, country
- Social data: following/followers lists

### StringsProvider

Wraps `i18next` to provide a `t()` translation function and `changeLanguage()` action. Currently supports `en_US` and `pt_BR`.

---

## Navigation Architecture

The app uses **React Navigation 7** with a Stack Navigator containing a Tab Navigator as its root screen.

```
RootStack (Native Stack)
  ├── Home (Tab Navigator)
  │     ├── Categories         ← Tab 1
  │     ├── Movies             ← Tab 2
  │     └── Profile            ← Tab 3
  │
  ├── — Modals (formSheet + keyboard) —
  │     ├── Share
  │     ├── Auth
  │     ├── Search
  │     └── SearchFriends
  │
  ├── — Modals (pageSheet 0.9 detent) —
  │     ├── FilterCategories
  │     ├── FilterMovies
  │     └── Category
  │
  ├── — Full-Screen Modals —
  │     ├── Settings
  │     ├── Movie
  │     └── Awards
  │
  └── — Selector Modals (0.5–0.9 detents) —
        ├── SelectEdition
        └── SelectCountry
```

All routes are typed via `src/router/types.ts`, which maps each route name to its required/optional params.

---

## Data Flow

1. **Convex** provides real-time reactive queries — any update to the backend automatically re-renders the relevant components.
2. **EditionProvider** caches the active edition's data and makes it available via context to all screens.
3. **UserProvider** caches auth state and user preferences locally via MMKV for instant hydration on app launch.
4. **TMDB API** is called from within the movie screen and provider to fetch poster images, cast, plot, streaming info, etc.
