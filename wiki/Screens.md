# Screens

This page documents all 16 screens in Academy Tracker, grouped by their navigation type.

---

## Tab Screens

These three screens are always visible in the bottom tab bar.

---

### Categories

**Route name:** `categories`  
**File:** `src/screens/categories/`

The main landing screen. Displays all Oscar categories for the active edition, each rendered as a horizontal carousel.

**Features:**
- Each category card shows a progress badge (e.g., `3/5`) reflecting how many of its nominated movies the user has watched.
- Three carousel styles based on category type:
  - **BigCaroussel** — Used for "Best Picture"; large poster images.
  - **Caroussel of SmallCards** — Used for person categories (acting awards); small headshots.
  - **Caroussel of MediumCards** — Used for all other categories; medium-sized posters.
- Countdown timer to the announcement or ceremony date in the header.
- **Awards** button (visible after ceremony, authenticated users only) that opens the Awards modal.
- **Filter** button that opens the Filter Categories sheet.
- Spoiler masking applied to cast and posters based on the user's settings.
- Category order and visibility are controlled by Filter Categories and persisted per user.

**Route params:** none

---

### Movies

**Route name:** `movies`  
**File:** `src/screens/movies/`

Browse all movies nominated in the active edition using a vertical swipeable slider.

**Features:**
- Full-screen vertical scroll through movie cards (one at a time).
- Each card shows the movie title, nomination count, watch status, and tiny avatars of friends who also watched it.
- **Filter** button that opens the Filter Movies sheet (filter by status, friends, providers, categories).
- **Share** button (authenticated users) that opens the Share modal.
- Countdown timer in the header.
- Spoiler masking on poster images based on user settings.

**Route params:** none

---

### Profile

**Route name:** `profile`  
**File:** `src/screens/profile/`

View the signed-in user's social connections (following / followers).

**Features:**
- User's avatar, display name, and username shown at the top.
- **SegmentedControl** to switch between "Following" and "Followers" lists.
- Each user card shows avatar, watch progress badge, and a Follow / Unfollow / Stop Following button.
- "Follows You" label displayed on cards where the relationship is mutual.
- Pull-to-refresh support.
- **Settings** button in the header.
- Unauthenticated users see a sign-in prompt instead of the list.

**Route params:** none

---

## Full-Screen Modal Screens

---

### Awards

**Route name:** `awards`  
**File:** `src/screens/awards/`

Ceremony overview and personal performance summary, presented as a snappable full-screen carousel.

**Pages in the carousel:**
1. **Home** — Ceremony info, countdown, list of unvoted categories.
2. **Watched Movies** — Count of movies the user watched during the season.
3. **Stats** — Personal satisfaction percentage, categories completed, total hours watched.
4. **Points** — Points earned from correct predictions.
5. **Leaderboard** — Full ranking of all participants; the current user is highlighted.

**Features:**
- Auto-advances through pages with a countdown progress bar.
- Leaderboard can expand to show all users (collapsed by default to show top entries).
- **Share** button on the leaderboard page.
- Admin action to close/finish the edition (long-press on admin controls).

**Route params:** none

---

### Movie

**Route name:** `movie`  
**File:** `src/screens/movie/`

Detailed view for a single nominated movie.

**Features:**
- Displays Academy title, original title, and translated title (if different).
- Poster image with spoiler blur if the user hasn't watched and spoilers are enabled.
- Watch status toggle with a date-picker so users can record the exact date they watched.
- Confetti animation played the first time a movie is marked as watched.
- **Movie details section:** runtime, release date, IMDb rating (with link), genres, languages.
- **Plot** — collapsible section with optional spoiler toggle.
- **Cast** — collapsible section with optional spoiler toggle.
- **Streaming providers** — Horizontal carousel showing available platforms for the user's selected country.
- **Nominations** — Carousel of every Oscar category this movie is nominated in (tappable to open the Category sheet).

**Route params:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `tmdbId` | `string` | ✅ | TMDB database identifier for the movie |

---

### Settings

**Route name:** `settings`  
**File:** `src/screens/settings/`

User preferences and account management.

**Sections:**
- **Spoiler Settings:** Toggles to hide poster, cast, rating, and plot for unwatched movies.
- **Language:** Switch between English and Portuguese (Brazil).
- **Country:** Opens the Select Country sheet (affects streaming provider display).
- **Version:** Displays the current app version number.
- **Profile picture:** Upload or change avatar (authenticated users only).
- **Sign Out** button.
- **Delete Account** button (shows a confirmation modal before proceeding).
- **Clear Cache** button to purge locally stored assets.

**Route params:** none

---

## Sheet Modals (0.9 Detent)

These screens appear as bottom sheets that cover ~90% of the screen. They can be swiped down to dismiss.

---

### Category

**Route name:** `category`  
**File:** `src/screens/category/`

View and rank all nominations within a single Oscar category.

**Features:**
- Reorderable list of nominations using drag-to-rank.
- Each nomination card shows poster, title, description, watched status, and winner indicator (after ceremony).
- **Wish action** (heart icon) — mark a nomination as the user's personal pick.
- **Mark as Winner** — admin-only action available after the ceremony closes.
- **Save / Discard** buttons appear when the order has been changed but not saved.
- Alert prompt if the user tries to navigate away with unsaved changes.
- Ranking is disabled once the ceremony has concluded.

**Route params:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `categoryId` | `string` | ✅ | Identifier of the Oscar category to display |

---

### Filter Categories

**Route name:** `filter_categories`  
**File:** `src/screens/filter_categories/`

Customize which categories appear on the Categories tab and in what order.

**Features:**
- Drag-to-reorder the full list of categories.
- Eye icon on each row to toggle a category's visibility.
- "Best Picture" is always pinned to the top.
- **Save / Discard / Clear** buttons.
- Shows a preview of the current order vs. the default.

**Route params:** none

---

### Filter Movies

**Route name:** `filter_movies`  
**File:** `src/screens/filter_movies/`

Multi-dimensional filtering for the Movies tab.

**Filter Dimensions:**
- **Status:** All / Watched / Unwatched
- **Friends:** Multi-select — show only movies watched by selected friends
- **Providers:** Multi-select — filter by streaming service
- **Categories:** Multi-select — show movies from specific Oscar categories

**Features:**
- Collapsible sections (shows first 5 items, expandable).
- Current filter count badge on each section header.
- **Save / Discard / Clear** buttons.
- Shows the number of movies matching the current filters.

**Route params:** none

---

## Form Sheet Modals (Keyboard-Aware)

These screens use `formSheet` presentation so the keyboard does not cover the input fields.

---

### Auth

**Route name:** `auth`  
**File:** `src/screens/auth/`

User sign-in, sign-up, and profile completion flow.

**Steps:**
1. **Sign In** — Email + Password.
2. **Sign Up** — Email + Password + Confirm Password → OTP email verification.
3. **Details** — Display name, username, optional profile picture.

**Features:**
- SegmentedControl to switch between Sign In and Sign Up.
- Inline validation with error messages.
- Privacy policy link.
- Image picker for avatar upload (with camera/library permission handling).

**Route params:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `flow` | `'signIn' \| 'signUp'` | — | Which flow to start on (defaults to Sign In) |

---

### Search

**Route name:** `search`  
**File:** `src/screens/search/`

Search for categories and movies within the active edition.

**Features:**
- Single search input with 200 ms debounce.
- Results split into two horizontal carousels: **Categories** and **Movies**.
- Animated transitions when results appear or change.
- Empty states for no results per section.

**Route params:** none

---

### Search Friends

**Route name:** `search_friends`  
**File:** `src/screens/search_friends/`

Find and follow other users.

**Features:**
- Search input with 2000 ms debounce (backend query via Convex).
- Results show user cards with avatar, name, username, and a Follow / Following toggle.
- "Follows you" indicator on matching users.
- Loading and empty states.

**Route params:** none

---

### Share

**Route name:** `share`  
**File:** `src/screens/share/`

Generate and export shareable images of the user's awards performance.

**Cards available:**
1. **Watched Posters** — Mosaic collage of movie posters the user watched.
2. **Stats** — Personal stats visualization (requires having participated in the ballot).
3. **Rank** — Leaderboard position card (requires having participated in the ballot).

**Features:**
- Horizontal carousel between the three card types.
- Each card is captured as a PNG using React Native View Shot.
- **Share** button to send the image via the native share sheet.
- Loading state while the image is being rendered/captured.

**Route params:** none

---

## Selector Modals (0.5–0.9 Detent)

These small bottom sheets let the user pick a single value and are dismissed automatically on selection.

---

### Select Edition

**Route name:** `select_edition`  
**File:** `src/screens/select_edition/`

Switch between different Oscar ceremony years.

**Features:**
- Scrollable list of all available editions.
- Each row shows the ordinal and year (e.g., "96th Edition — 2024").
- The active edition is highlighted in the brand color.
- Auto-scrolls to the currently selected edition on open.
- Single-tap selects and closes the sheet.

**Route params:** none

---

### Select Country

**Route name:** `select_country`  
**File:** `src/screens/select_country/`

Select the country used to look up streaming provider availability.

**Features:**
- Scrollable list of countries with localized names.
- The active country is highlighted.
- Auto-scrolls to the current selection on open.
- Single-tap selects and closes; the movie screen refreshes provider data.

**Route params:** none
