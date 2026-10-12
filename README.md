# EDS — Empowerment and Digital Safety

A complete, bilingual (English / Arabic), highly animated static website built with
plain **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step.

---

## 1. Project structure

```
EDS/
├── index.html              Homepage
├── about.html               Our story (editorial history chapters), mission/vision/goals
├── courses.html              All 6 courses + course image carousel
├── course-details.html       Reusable course page → course-details.html?id=<course-id>
├── quiz.html                 Reusable quiz page   → quiz.html?course=<course-id>
├── stories.html               Success stories (journal list)
├── story-details.html         Reusable story page → story-details.html?id=<slug>
├── get-help.html              Support request form
├── share-story.html           "Share your story" form
├── donate.html                 Donation UI (no payment provider connected)
├── contact.html                Contact info + form + social links
├── faq.html                    Animated accordion FAQ
├── 404.html                     Custom not-found page
│
├── css/
│   ├── style.css             Design system: colors, type, components, layout
│   ├── animations.css        Keyframes + scroll/reveal animation classes
│   └── responsive.css        Breakpoints and grids
│
├── js/
│   ├── main.js                Shared bootstrap: icon library, image fallbacks, year
│   ├── navigation.js          Mobile menu, scroll navbar, active link
│   ├── language.js            EN/AR switching + localStorage + RTL/LTR
│   ├── animations.js          Scroll reveal, counters, parallax, magnetic buttons,
│   │                          staggered heading reveals, masked image reveals
│   ├── transitions.js         Editorial curtain wipe between page navigations
│   ├── cursor.js              Custom dot + ring cursor (desktop, hover-capable only)
│   ├── carousel.js            Course image carousel (home + courses page)
│   ├── chapters.js            Mission/Vision/Goals interactive accordion
│   ├── history.js             About page — scroll-driven history timeline
│   ├── quiz.js                Quiz engine (start → questions → results)
│   ├── stories.js             Stories list + detail rendering
│   └── forms.js                Client-side validation + honest success states
│
├── data/
│   ├── courses.js             6 courses' content, bilingual, incl. carousel image
│   ├── quizzes.js             10 questions per course (bilingual)
│   └── stories.js             Trainee stories, exact quotes
│
└── assets/
    ├── images/
    │   ├── logo/eds-logo.png   Official EDS logo (provided)
    │   ├── hero/                img1.jpg (hero photo / About chapter 1 / story teaser)
    │   ├── courses/               img2–img29.jpg (one per course, carousel)
    │   ├── stories/               img7–img19.jpg (one per trainee)
    │   └── general/                img27.jpg, img30.jpg, img31.jpg (About history chapters 2–4)
    ├── videos/intro-video.mp4    Official intro video (not yet provided)
    └── icons/                     reserved for extra icon assets
```

## 2. How to run the website

No build step is required.

- **Quickest:** double-click `index.html`.
- **Recommended:** serve it locally so relative paths behave identically to production:
  ```bash
  cd EDS
  python3 -m http.server 8080
  # then open http://localhost:8080
  ```

## 3. Where to replace images

Every image is referenced by a **plain, predictable filename**. Drop a real photo
into the matching folder using the **exact same filename** and it appears
automatically — no HTML/JS changes needed.

| File | Location | What it should show |
|---|---|---|
| `img1.jpg` | `assets/images/hero/` | Hero — women in an EDS workshop (also used for the About chapter 1 image and homepage story teaser) |
| `img27.jpg` | `assets/images/general/` | About — Chapter 3: training inside homes and tents |
| `img30.jpg` | `assets/images/general/` | About — Chapter 2: listening to needs in the camps |
| `img31.jpg` | `assets/images/general/` | About — Chapter 4: EDS today, a safe space for learning |
| `img2.jpg`–`img29.jpg` | `assets/images/courses/` | One photo per course, shown in the courses carousel — see `image` field in `data/courses.js` |
| `img7.jpg`–`img19.jpg` | `assets/images/stories/` | One portrait per trainee — see `data/stories.js` |
| `eds-logo.png` | `assets/images/logo/` | Official EDS logo (already included) |

If an image file is missing, a soft gradient placeholder (matching the EDS palette,
sampled from the logo) is shown automatically instead of a broken image icon.

## 4. Where to replace the video

Add the real file at `assets/videos/intro-video.mp4` (same filename). Until then,
the homepage shows an elegant "coming soon" video placeholder.

## 5. Where to edit courses

Open `data/courses.js`. Each course is one JavaScript object with English and
Arabic text side by side, plus an `image` field used by the carousel. To **add a
new course**, copy an existing object, give it a unique `id`, and it appears
automatically on `courses.html`, the homepage carousel, and is ready for
`course-details.html?id=your-id`.

To make its quiz work, also add a matching entry (same `id` as the key) with 10
questions to `data/quizzes.js`.

## 6. Where to edit quiz questions

Open `data/quizzes.js`. Each course id maps to an array of 10 questions:
```js
{ q:{en:'...',ar:'...'}, options:[{en:'...',ar:'...'}, ...], correct: 0 }
```
`correct` is the zero-based index of the right option.

## 7. Where to edit stories

Open `data/stories.js`. Each story has a unique `slug` (used in the URL), optional
`context`, the trainee's exact `quote`, and an optional `followUp`. Add a new object
to the array to add a new story — it appears automatically on `stories.html` and is
reachable at `story-details.html?id=your-slug`.

## 8. How bilingual content works

There is **one HTML file per page** (not two). Any element that should change
language carries both `data-en` and `data-ar` attributes:
```html
<h1 data-en="Hello" data-ar="مرحباً">Hello</h1>
```
`js/language.js` reads the saved language from `localStorage`, sets
`document.dir`/`document.lang`, and swaps every such element's text. Use:
- `data-en-html` / `data-ar-html` when you need inline markup (e.g. a `<br>`)
- `data-en-placeholder` / `data-ar-placeholder` for form placeholders
- `data-en-aria` / `data-ar-aria` for `aria-label`s

Content rendered by JavaScript (courses, quizzes, stories, carousel) reads the
current language from `EDS.language.getLang()` and picks the right key.

## 9. How to connect forms to a backend later

Every form (`get-help.html`, `share-story.html`, `donate.html`, `contact.html`) is
fully validated on the client in `js/forms.js`, but **does not send data anywhere**
— there is no backend yet, and the UI is honest about that (it shows a clear
"front-end demo" success state instead of pretending to submit).

To connect a real backend, replace the comment block inside the
`form.addEventListener('submit', ...)` handler in `js/forms.js` with a real
request, e.g.:
```js
fetch('https://your-api.example.com/get-help', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
}).then(...)
```
Only show `.form-success` after a successful response. For donations specifically,
integrate a real payment provider's hosted checkout inside the `donate-form`
handler — never process card details directly on this static site.

## 10. How to add a new course

1. Add an object to `data/courses.js` with a unique `id` and an `image`.
2. Add a matching 10-question array to `data/quizzes.js` under the same `id`.
3. Drop the course photo into `assets/images/courses/`.
4. Done — it appears on `courses.html`, the homepage carousel, and works at
   `course-details.html?id=your-id` and `quiz.html?course=your-id` automatically.

## 11. How to add a new story

Add an object to `data/stories.js` with a unique `slug`, then drop a matching photo
into `assets/images/stories/`. It appears automatically on `stories.html` and at
`story-details.html?id=your-slug`.

## 12. The Mission / Vision / Goals accordion

`index.html` and `about.html` both use the same `.chapters` component (see
`js/chapters.js`). Each `.chapter` is a `<button class="chapter-toggle">` plus a
`.chapter-panel`; only one is open at a time, on click or on hover for pointer
devices. The nested Goals list uses `.goal-row` items with a number, icon and title
— copy the markup pattern to add or edit an item.

## 13. The About page history section

The four history chapters in `about.html` (`.history-chapter`) use the initiative's
real founding story — the text is not editable content data (it's fixed prose from
the organization), so edit it directly in `about.html` if needed. `js/history.js`
drives the scroll-linked connecting line and the active/passed chapter states.

---

## Design notes

- **Colors & gradients** are defined once as CSS custom properties in `css/style.css`
  (`:root`), sampled directly from pixels in the official EDS logo file (cyan → sky
  → blue, and yellow → lime → green → teal).
- **Page transitions**: `js/transitions.js` intercepts same-origin link clicks, plays
  a short curtain-wipe animation, then navigates normally — so browser back/forward
  and language switching are never broken.
- **Custom cursor**: `js/cursor.js` only activates on hover-capable, fine-pointer
  devices, and is disabled under `prefers-reduced-motion`.
- **Animations** respect `prefers-reduced-motion` throughout (`css/animations.css`
  and every `js/*.js` file that drives motion check it directly).
- **Accessibility**: semantic landmarks, skip link, visible focus states, keyboard-
  operable accordion/quiz/carousel, alt text on every image, labelled form fields.
- **No fake functionality**: payments, email sending, and story submission are all
  clearly front-end-only until a backend is connected — see section 9 above.
