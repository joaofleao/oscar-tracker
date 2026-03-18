# Components

This page documents all reusable UI components in `src/components/`. Components are consumed by screens and other components via the `@components/*` path alias.

---

## Layout

### Row
`src/components/row/`

A flex-row container that wraps its children horizontally.

| Prop | Type | Description |
|------|------|-------------|
| `center` | `boolean` | Justify content to center |
| `between` | `boolean` | Justify content with space-between |
| `middle` | `boolean` | Align items to center vertically |
| `layout` | `StyleProp<ViewStyle>` | Additional style |
| `entering` | `BaseAnimationBuilder` | Reanimated entering animation |
| `exiting` | `BaseAnimationBuilder` | Reanimated exiting animation |

---

### Column
`src/components/column/`

A flex-column container that stacks its children vertically.

| Prop | Type | Description |
|------|------|-------------|
| `center` | `boolean` | Justify content to center |
| `middle` | `boolean` | Align items to center horizontally |
| `layout` | `StyleProp<ViewStyle>` | Additional style |
| `entering` | `BaseAnimationBuilder` | Reanimated entering animation |
| `exiting` | `BaseAnimationBuilder` | Reanimated exiting animation |

---

### Section
`src/components/section/`

A named content section with an optional header row containing a title, badge, and button.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Section heading |
| `badge` | `string` | Small badge shown next to the title |
| `button` | `ButtonProps` | Action button in the section header |
| `children` | `ReactNode` | Section body content |
| `layout` | `StyleProp<ViewStyle>` | Additional container style |
| `entering` | `BaseAnimationBuilder` | Reanimated entering animation |
| `exiting` | `BaseAnimationBuilder` | Reanimated exiting animation |

---

### Sheet
`src/components/sheet/`

Wrapper for bottom-sheet modal content. Provides consistent header, footer, padding, and scroll handling.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Sheet body content |
| `header` | `ReactNode` | Custom header component |
| `footer` | `ReactNode` | Sticky footer (save/discard buttons, etc.) |
| `reordable` | `boolean` | Removes scroll to support drag-to-reorder lists |
| `headerWithTop` | `boolean` | Adds extra top spacing under the sheet handle |
| `fullscreen` | `boolean` | Makes the sheet expand to full height |

---

## Typography

### Typography
`src/components/typography/`

The primary text component. Supports all semantic text styles.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `boolean` | Large title style |
| `display` | `boolean` | Extra-large display style |
| `branded` | `boolean` | Applies brand (gold) color |
| `body` | `boolean` | Standard body text |
| `description` | `boolean` | Secondary/smaller text |
| `legend` | `boolean` | Tiny label style |
| `header` | `boolean` | Header-sized text |
| `center` | `boolean` | Center-align text |
| `color` | `string` | Override text color |
| `flex` | `boolean` | Set `flex: 1` |

---

### MegaTypography
`src/components/mega_typography/`

Extra-large text for the Awards screen stats and counters.

| Prop | Type | Description |
|------|------|-------------|
| `big` | `boolean` | Largest size |
| `medium` | `boolean` | Mid size |
| `small` | `boolean` | Small variant |
| `subtitle` | `boolean` | Subtitle style |
| `title` | `boolean` | Title style |
| `description` | `boolean` | Description style |

---

### Paragraph
`src/components/paragraph/`

Multi-line body text display component, suitable for long-form content such as plot summaries.

---

### OverflownTypography
`src/components/overflown_typography/`

Same API as `Typography` plus:

| Prop | Type | Description |
|------|------|-------------|
| `animate` | `boolean` | Animate the text if it overflows its container |

---

## Buttons & Controls

### Button
`src/components/button/`

The main interactive button component.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Button label |
| `icon` | `IconName` | Icon displayed in the button |
| `iconPosition` | `'left' \| 'right'` | Where the icon appears relative to the label |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'positive' \| 'negative'` | Visual style |
| `small` | `boolean` | Compact size |
| `loading` | `boolean` | Shows a loading spinner |
| `tooltip` | `string` | Text shown on long-press |
| `onPress` | `() => void` | Tap handler |
| `style` | `StyleProp<ViewStyle>` | Additional style |

---

### SegmentedControl
`src/components/segmented_control/`

A horizontal tab-picker for switching between a fixed set of options.

| Prop | Type | Description |
|------|------|-------------|
| `options` | `string[]` | List of option labels |
| `selected` | `number` | Index of the active option |
| `onChange` | `(index: number) => void` | Called when the selection changes |

---

### Dropdown
`src/components/dropdown/`

A select-style dropdown menu.

| Prop | Type | Description |
|------|------|-------------|
| `items` | `{ label: string; value: string }[]` | Available options |
| `label` | `string` | Visible label above the dropdown |
| `placeholder` | `string` | Placeholder text when nothing is selected |
| `onSelect` | `(value: string) => void` | Called when an option is selected |

---

### Accordion
`src/components/accordion/`

Collapsible section with a pressable header.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Accordion header text |
| `children` | `ReactNode` | Collapsible content |
| `expanded` | `boolean` | Controlled expanded state |

---

## Input Components

### TextInput
`src/components/text_input/`

The base text input. All other input components extend this.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Current value |
| `onChangeText` | `(text: string) => void` | Change handler |
| `onDebouncedText` | `(text: string) => void` | Called after a debounce delay |
| `debounce` | `number` | Debounce delay in milliseconds |
| `icon` | `IconName` | Leading icon |
| `error` | `string` | Inline error message |
| `loading` | `boolean` | Shows a loading indicator |
| `success` | `boolean` | Shows a success indicator |
| `button` | `ButtonProps` | Trailing action button |

---

### EmailInput
`src/components/email_input/`

TextInput pre-configured for email addresses (keyboard type, validation).

---

### PasswordInput
`src/components/password_input/`

TextInput with a show/hide visibility toggle.

| Prop | Type | Description |
|------|------|-------------|
| `type` | `'password' \| 'confirmation'` | If `confirmation`, validates against `passwordConfirmation` |
| `passwordConfirmation` | `string` | The password to match when type is `confirmation` |
| (all TextInput props) | | Inherited |

---

### UsernameInput
`src/components/username_input/`

TextInput pre-configured for username entry.

---

### OTPInput
`src/components/otp_input/`

A 4-digit one-time password input rendered as individual character boxes.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Current 4-character value |
| `onChangeText` | `(text: string) => void` | Change handler |

---

### SearchInput
`src/components/search_input/`

A search field with a built-in debounce and a clear (×) button.

| Prop | Type | Description |
|------|------|-------------|
| `onDebouncedText` | `(text: string) => void` | Called after debounce with the current search term |
| `onClear` | `() => void` | Called when the clear button is pressed |
| `debounce` | `number` | Debounce delay (default: 200 ms) |
| `placeholder` | `string` | Input placeholder text |

---

## Cards

### SmallCard
`src/components/small_card/`

A compact card used for people, categories, and filtered items in carousels.

| Prop | Type | Description |
|------|------|-------------|
| `_id` | `string` | Unique identifier |
| `image` | `string` | Image URL |
| `title` | `string` | Main label |
| `description` | `string` | Secondary label |
| `badge` | `string` | Small overlay badge |
| `button` | `ButtonProps` | Overlay action button |
| `spoiler` | `boolean` | Blur the image as a spoiler |
| `watched` | `boolean` | Marks the card as watched (visual indicator) |
| `squared` | `boolean` | Square aspect ratio instead of portrait |
| `winner` | `boolean` | Shows a winner indicator |
| `additional` | `string` | Extra info shown below the title |

---

### MediumCard
`src/components/medium_card/`

A medium-sized nomination card used in most category carousels.

| Prop | Type | Description |
|------|------|-------------|
| `image` | `string` | Poster URL |
| `label` | `string` | Nomination title |
| `spoiler` | `boolean` | Blur image if unwatched and spoilers enabled |
| `watched` | `boolean` | Watched indicator |
| `winner` | `boolean` | Winner indicator |

---

### BigCaroussel
`src/components/big_caroussel/`

A large full-width carousel used exclusively for the "Best Picture" category.

| Prop | Type | Description |
|------|------|-------------|
| `nominations` | `Nomination[]` | List of nominations to display |
| `title` | `string` | Category title |
| `extra` | `string` | Extra label (e.g., nomination count) |
| `badge` | `string` | Progress badge |
| `button` | `ButtonProps` | Action button overlay |

---

### LeaderboardCard
`src/components/leaderboard_card/`

A ranked entry card used in the Awards leaderboard.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | User's display name |
| `image` | `string` | Avatar URL |
| `sublabel` | `string` | Username or secondary label |
| `description` | `string` | Additional info |
| `badge` | `string` | Rank badge (e.g., `#1`) |
| `points` | `number` | Points score |
| `pointsLabel` | `string` | Label for the points field |
| `variant` | `'highlight' \| 'default'` | Highlights the current user's row |

---

## Carousel & List Components

### Caroussel
`src/components/caroussel/`

A generic horizontal carousel for any data type.

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | Array of items to render |
| `render` | `(item: T) => ReactNode` | Render function for each item |
| `contentContainerStyle` | `StyleProp<ViewStyle>` | Style for the scroll content |
| `group` | `string` | Shared transition group name |
| `empty` | `ReactNode` | Element shown when `data` is empty |

---

### MovieSlider
`src/components/movie_slider/`

A full-screen vertical pager that swipes between movie cards one at a time.

| Prop | Type | Description |
|------|------|-------------|
| `data` | `Movie[]` | Array of movies |
| `onScroll` | `(index: number) => void` | Called when the visible card changes |
| `spoiler` | `boolean` | Apply spoiler blurring to posters |

---

### DraggableListItem
`src/components/dragable_list_item/`

A list item that can be long-pressed and dragged to reorder. Used in the Category and Filter Categories screens.

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique item identifier |
| `index` | `number` | Position in the list |
| `title` | `string` | Primary label |
| `image` | `string` | Thumbnail image |
| `description` | `string` | Secondary label |
| `watched` | `boolean` | Watched status indicator |
| `disabled` | `boolean` | Prevents drag when true |
| `mainAction` | `ActionProps` | Primary action (e.g., toggle visibility) |
| `secondaryActions` | `ActionProps[]` | Additional trailing actions |

---

## Avatar & User Components

### Avatar
`src/components/avatar/`

Circular user avatar. Displays a profile picture or falls back to initials.

| Prop | Type | Description |
|------|------|-------------|
| `image` | `string` | Profile picture URL |
| `name` | `string` | User's display name (for initials fallback) |
| `onPress` | `() => void` | Tap handler |
| `icon` | `IconName` | Overlay icon (e.g., edit) |

---

### TinyAvatar
`src/components/tiny_avatar/`

A very small circular avatar used inside movie cards to show friends who watched.

| Prop | Type | Description |
|------|------|-------------|
| `image` | `string` | Profile picture URL |
| `label` | `string` | Fallback initial |

---

## Visual & Decorative

### Icon
`src/components/icon/`

SVG icon library. Supports ~30 named icons.

| Prop | Type | Description |
|------|------|-------------|
| `name` | `IconName` | Icon identifier (e.g., `Oscar`, `Film`, `Person`, `Heart`, …) |
| `size` | `number` | Icon size in dp |
| `color` | `string` | Icon fill color |

---

### TinyIcon
`src/components/tiny_icon/`

Smaller icons used inside buttons: `Plus`, `X`, `Checkmark`.

---

### Poster
`src/components/poster/`

A standalone movie poster image with optional press handling.

| Prop | Type | Description |
|------|------|-------------|
| `image` | `string` | Poster URL |
| `title` | `string` | Alt text / loading fallback |
| `onPress` | `() => void` | Tap handler |

---

### Badge
`src/components/badge/`

A small inline status pill.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Badge text |
| `variant` | `'brand' \| 'container'` | Color variant |

---

### Chip
`src/components/chip/`

A pressable pill used in filter selections.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Chip label |
| `onPress` | `() => void` | Tap handler |
| `variant` | `'selected' \| 'unselected'` | Visual state |

---

### Tag
`src/components/tag/`

A non-interactive label pill for metadata display.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Tag text |
| `variant` | `string` | Color variant |

---

### ProgressBar
`src/components/progress_bar/`

A horizontal progress indicator.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number` | Current value |
| `maxValue` | `number` | Maximum value |
| `variant` | `'brand' \| 'positive' \| 'negative'` | Color theme |
| `hideNumbers` | `boolean` | Hides the numeric label |
| `thickness` | `number` | Bar height in dp |

---

### Blur
`src/components/blur/`

A `BlurView` wrapper that picks the correct tint from the current theme.

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `'background' \| 'container'` | Which theme surface to match |
| `style` | `StyleProp<ViewStyle>` | Additional style |

---

### HeaderBlur
`src/components/header_blur/`

Animated blur layer used as a scroll-reactive sticky header background. Props identical to `Blur`.

---

### Logo
`src/components/logo/`

Displays the Academy Tracker wordmark/logo. No props.

---

### GalleryView
`src/components/gallery_view/`

A full-screen image gallery viewer for browsing multiple images.

---

## Navigation

### NavBar
`src/components/nav_bar/`

The bottom tab bar component. Renders the three tab icons (Categories, Movies, Profile) and highlights the active tab.

---

### Header
`src/components/header/`

The animated screen header with optional leading and trailing buttons.

| Prop | Type | Description |
|------|------|-------------|
| `animation` | `SharedValue<number>` | Scroll offset for collapse animation |
| `leadingButton` | `ButtonProps` | Button on the left side of the header |
| `trailingButton` | `ButtonProps` | Button on the right side of the header |
| `variant` | `'large' \| 'small'` | Header size variant |

---

## Utility Components

### Modal
`src/components/modal/`

An alert/confirmation dialog.

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Controls dialog visibility |
| `setVisible` | `(v: boolean) => void` | Setter to hide/show the dialog |
| `label` | `string` | Dialog title |
| `description` | `string` | Dialog body text |
| `onClose` | `() => void` | Called when the dialog is dismissed |
| `children` | `ReactNode` | Action buttons rendered in the dialog |

---

### EmptyState
`src/components/empty_state/`

Placeholder shown when a list or section has no content.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Main message |
| `description` | `string` | Supplementary text |
| `loading` | `boolean` | Shows a loading animation instead of the message |

---

### KeyboardCompensation
`src/components/keyboard_compensation/`

Adds bottom padding equal to the keyboard height so form inputs remain visible when the keyboard opens. No props.

---

### Question
`src/components/question/`

A Q&A display layout with a title, description, and children for the answer content.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Question/section heading |
| `description` | `string` | Sub-heading |
| `children` | `ReactNode` | Answer content |
