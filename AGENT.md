# Gift Vibes — Build Log (AGENT.md)
https://stitch.withgoogle.com/projects/7350693410742943197
## What This Is
A gift-giving companion app. Users add friends + events, the app suggests AI-curated gifts, allows chat refinement, and tracks purchase history on a timeline.

---

## Project Structure

```
ROTEM/
  client/          ← React v2 (Vite + TS + Zustand + CSS)
  server/          ← Express v2 (TS + in-memory DB, swap to Postgres later)
  client_v1/       ← Original client (archived)
  server_v1/       ← Original server (archived)
  cypress/         ← E2E API tests
  stitch_ai/       ← Design references (HTML prototypes + DESIGN.md)
  spec.md          ← Full product spec
```

---

## Screens (6 total)

| Screen | Route | Data from |
|---|---|---|
| Onboarding / Login | `/onboarding` | `POST /api/auth/login` or `/register` |
| Add Friend | `/add-friend` | `POST /api/people` |
| Home | `/` | `GET /api/people` |
| Gift Suggestions + Chat | `/gifts/:personId` | `GET /api/gifts/suggest/:id` + `GET /api/chat/init/:id` + `POST /api/chat` |
| Timeline | `/timeline` | `GET /api/people` + `GET /api/orders` |
| Basket / Checkout | `/basket` | local Zustand state → `POST /api/orders/checkout` |

Bottom nav: **Home · People · Timeline · Basket**

---

## Client Architecture (`client/src/`)

```
core/
  auth/         AuthContext (JWT in localStorage), useAuth hook
  storage/      storageGet / storageSet helpers (localStorage)
  types/        Shared TS interfaces: User, Person, Gift, Order, BasketItem, ChatMessage

stores/         Zustand stores (state + localStorage persistence)
  authStore     login(), register() → calls API
  peopleStore   loadPeople(), addPerson(), getUpcoming()
  giftsStore    loadSuggestions(), sendMessage(), setBudget()
  orderStore    addToBasket(), checkout(), loadOrders()
  uiStore       activeTab, showAddFriend modal

utils/
  api.ts        fetch wrapper — reads JWT from localStorage, attaches Bearer header
  dateUtils.ts  getGreeting(), daysUntilNext(), formatDate(), formatDaysUntil()

layouts/
  MainLayout    Outlet + BottomNav
  AuthLayout    Centered wrapper for login/onboarding

components/
  BottomNav     Fixed bottom, 4 tabs, basket badge
  EventCard     Person card (full + compact carousel variant)
  GiftCard      Gift card with image, vibe tag, price, add button

pages/          All lazy-loaded via React.lazy + Suspense
  OnboardingPage
  AddFriendPage
  HomePage
  GiftSuggestionsPage  (carousel + budget chips + AI chat)
  TimelinePage
  BasketPage

styles/
  variables.css   CSS custom properties (colors, radius, spacing, fonts)
  global.css      Reset + utility classes (flex, btn, card, glass, page)
```

**Design system:** The Digital Curator / Electric Gifter palette
- Primary: `#9400c9` | Secondary: `#00647b` | Tertiary: `#b60055`
- Surface: `#fff3fd` | On-surface: `#3e2548`
- Fonts: Plus Jakarta Sans (headlines) + Be Vietnam Pro (body)
- No borders rule — depth via tonal layering only

---

## Server Architecture (`server/src/`)

```
db/
  seed.ts     Demo data: 2 users, 5 people, 10 gifts, 3 orders
  store.ts    In-memory arrays — replace each section with DB query later

middleware/
  auth.ts       JWT verify → attaches req.userId
  logger.ts     Request logger
  errorHandler  Global 500 handler

services/       Business logic (no Express, pure functions)
  AuthService   bcrypt compare, jwt.sign
  PeopleService daysUntilNext calculation, add/list
  GiftsService  Budget filter + category-based chat filter
  ChatService   initMessage() + respond() (keyword-based, swap for OpenAI later)
  OrdersService list + checkout

controllers/    Express handlers → call service → return JSON
  AuthController      POST /login, POST /register
  PeopleController    GET /, POST /
  GiftsController     GET /suggest/:personId
  ChatController      GET /init/:personId, POST /
  OrdersController    GET /, POST /checkout

routes/         Mount controllers under /api/*
  auth.routes     → /api/auth
  people.routes   → /api/people  (protected)
  gifts.routes    → /api/gifts   (protected)
  chat.routes     → /api/chat    (protected)
  orders.routes   → /api/orders  (protected)
```

**Auth:** JWT in `Authorization: Bearer <token>` header. Demo credentials: `rotem@example.com / password123`

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/login` | No | Login → returns user + JWT |
| POST | `/api/auth/register` | No | Register → returns user + JWT |
| GET | `/api/people` | Yes | List user's people with daysUntil |
| POST | `/api/people` | Yes | Add a person |
| GET | `/api/gifts/suggest/:personId?budget=N` | Yes | Gift suggestions |
| GET | `/api/chat/init/:personId` | Yes | Initial AI welcome message |
| POST | `/api/chat` | Yes | Send message → reply + updated gifts |
| GET | `/api/orders` | Yes | User's purchase history |
| POST | `/api/orders/checkout` | Yes | Checkout basket items |

---

## Tests (Cypress e2e)

```
cypress/e2e/
  api.auth.cy.ts    health, login, register, duplicate email
  api.people.cy.ts  list, add, auth guard
  api.gifts.cy.ts   suggest with budget, chat init, chat respond
  api.orders.cy.ts  list, checkout, empty basket 400
```

**Run:** Start server (`npm run dev` in `server/`) then `npx cypress run` from project root.

---

## How to Run

```bash
# Server
cd server && npm install && npm run dev   # http://localhost:3001

# Client
cd client && npm install && npm run dev  # http://localhost:3000

# Tests (server must be running)
npx cypress run --headless
npx cypress open  # interactive
```

---

## Planned: Next Steps

- [ ] Replace ChatService with real OpenAI API call
- [ ] Add Google OAuth (`/api/auth/google` → verify token → JWT)
- [ ] Replace in-memory `db` with Postgres/Supabase queries
- [ ] Add person profile page (edit, delete, gift history)
- [ ] Add inspiration/discover page (global gift feed)
- [ ] Add group gifting feature
