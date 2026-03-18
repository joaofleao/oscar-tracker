# Version History

This page documents every public release of Academy Tracker, from the initial alpha to the current version.

---

## v5.2 — 16 March 2026

> **Ballot submission & filters overhaul**

### What's New
- **Ballot submission** — Users can now submit their final ballot before the ceremony, locking in their ranked predictions.
- **Advanced filters** — New filter options across categories and movies screens:
  - Filter by **streaming provider**
  - Filter by **category**
  - Filter by **friends' watch status**
  - Filter by **movie/ballot status**
- **Retrospective view** — A dedicated view of personal performance after the ceremony closes.
- **Ceremony overview** — Summary page showing all winners in a single scrollable view.

---

## v5.0 — 24 February 2026

> **Full application overhaul — new backend, new design, new structure**

### What's New
- **Shared backend with Absolute Cinema** — The app now consumes data from the same Convex backend as the Absolute Cinema app, replacing the previous Firebase implementation.
- **New authentication system** — Replaced email/password Firebase Auth with Convex Auth, supporting Apple Sign-In, Google OAuth, and email/password with OTP verification.
- **Complete UI redesign** — New visual language including updated typography (Tienne, Inconsolata, Spartan), a gold brand palette, and semantic color tokens.
- **Restructured navigation** — New page structure with bottom-tab navigator (Categories · Movies · Profile) and a richer modal/sheet hierarchy.
- **New screens introduced:**
  - Awards screen (ceremony overview + leaderboard)
  - Share screen (generate shareable images)
  - Filter Categories screen (reorder and hide categories)
  - Filter Movies screen (multi-dimensional movie filtering)
  - Select Edition screen (switch Oscar year)
  - Select Country screen (streaming provider region)
  - Search Friends screen
  - Settings screen

---

## v4.0.3 — 3 February 2025

> **Bug fixes and stability improvements**

### What's New
- Input targets updated to correctly receive press interactions.
- Spoiler hitbox fixed so tapping actually reveals hidden content.
- "Unwatch a movie" action now fires the backend call correctly.
- Confetti animation added on first watch; unused tags removed from the movie screen.
- Sign-up screen size fixed on smaller devices.
- TMDB API keys updated.
- Network warning timeout adjusted.
- Sign-up flow now verifies email address before proceeding.

> _Download not available — internal testing via App Store / Play Store only._

---

## v4.0.2 — 27 January 2025

> **Store release + unauthenticated mode**

### What's New
- **App Store and Play Store** availability for internal testers.
- Unauthenticated (guest) users can now browse movies and categories without signing in.
- New styling, fonts, and updated app assets.

> _Download not available — internal testing via the stores only._

---

## v2.1.1 — 3 March 2023 *(Beta Update 3)*

> **Bug fixes**

### What's New
- Android bottom margins were inconsistent across devices — fixed.
- Score number was not rendering properly — fixed.
- Spoilers added to plot and cast sections on the movie detail view.

> _Download not available — internal testing only._

---

## v2.0.1 — 9 February 2023 *(Beta Update 2)*

> **Android margin fix**

### What's New
- Corrected margin on Android devices.

> _Download not available — internal testing only._

---

## v2.0.0 — 27 January 2023 *(Beta Update)*

> **Major feature expansion**

### What's New
- **Error notifications** for Firebase and TMDB failures.
- **Edit Profile** button on profile screen.
- **New movie poster** design.
- **Preferences onboarding** screens on first launch.
- **Nominations dedicated page** — each nomination now has its own detail view.
- **Actor/actress images** with names in the cast section.
- **Nomination details** — country, actor, crew, and song information per nomination.
- **Input validation** — email, password, and name formatting enforced.

> _Download not available — internal testing only._

---

## v1.1.1 — 9 February 2023 *(Alpha Update 3)*

> **Bug fixes**

### What's New
- Bug fix for category poster loading incorrectly on app reload.
- Scroll added to the profile screen to better accommodate small screens.

> _Download not available — internal testing only._

---

## v1.1.0 — 9 February 2023 *(Alpha Update 2)*

> **Watch progress and spoiler controls**

### What's New
- **Watch progress indicators** — Progress bars for movies and counters for categories show how many nominations a user has watched overall.
- **Poster spoiler toggle** — Users can choose to hide posters for unwatched movies.
- **Profile screen** with basic user information.
- Watched movies now display a different poster style to distinguish them.

> _Download not available — internal testing only._

---

## v1.0.0 — 6 February 2023 *(Alpha)*

> **Initial release**

### What's New
- User authentication: Sign Up, Sign In, Sign Out.
- Movies visualization — browse all nominated films.
- Categories visualization — browse all Oscar categories.
- Mark movies as watched.

> _Download not available — internal testing only._
