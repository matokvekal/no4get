# Gift Vibes — TODO

## Done
- [x] Server: Express + TypeScript, full route/controller structure, compiles clean
- [x] Server: JWT auth middleware, error handler, DB pool (Supabase), all types, response helpers
- [x] Client: React + Vite + TypeScript, compiles clean
- [x] Client: Design system CSS variables (`styles/variables.css`)
- [x] Client: All 5 Zustand stores (user, people, event, chat, gift)
- [x] Client: Services layer (api.ts, people.api.ts, chat.api.ts, gifts.api.ts)
- [x] Client: `HomeScreen` converted from stitch_ai HTML → React + CSS Flex
- [x] Client: `BottomNav` component
- [x] Client: `PeopleScreen` ← `stitch_ai/people_events_1/code.html`
- [x] Client: `ChatScreen` ← `stitch_ai/ai_curator_chat_1/code.html`
- [x] Client: `GiftSuggestionsScreen` ← `stitch_ai/gift_suggestions/code.html`
- [x] Client: `InspirationScreen` ← `stitch_ai/inspiration_board_1/code.html`
- [x] Client: `TimelineScreen` ← `stitch_ai/gift_timeline/code.html`
- [x] Client: `GroupGiftScreen` ← `stitch_ai/group_gifting/code.html`
- [x] Client: `OrderScreen` ← `stitch_ai/checkout_greeting/code.html`
- [x] Client: `react-router-dom` installed + all screens wired up

---

## Next Session

### Backend
- [ ] Implement DB queries in server controllers (people, events, chat, gifts, orders)
- [ ] Hook up OpenAI API in `ChatController`
- [ ] Write Supabase SQL schema migrations

### Frontend
- [ ] Replace placeholder data with real API calls via services layer
- [ ] Auth screen (Google + Apple Sign-In)
- [ ] Person Profile screen
- [ ] Wire FAB actions (Add Person modal, etc.)
