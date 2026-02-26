# RN / Figma Make Spec — Phase 0 Scope & Plan (v2)

> Repo: `git@github.com:sunny2001522/Linenruwealthpool.git`
>
> Base branch (target): `release_archive` (created from `main` because upstream only had `main`)
>
> This document is generated from **actual code in the repo** (Figma Make export) and is intended to drive follow-up specs only (no implementation in this MR).

---

## 0. Ground truth (what exists in the repo)

### 0.1 Commit baseline

The upstream repository currently contains **2 commits**:

| Order (new→old) | Commit | Message | Notes |
|---|---|---|---|
| 1 | `a596634` | Add files from Figma Make | All app code, pages, components, docs |
| 2 | `ff644d4` | Initial commit | `README.md` only |

**Evidence**
- `git log --oneline` shows only the two commits above.
- `git show --name-only ff644d4` includes only `README.md`.

### 0.2 App routing / page map (React Router)

Routing is declared in:
- `src/routes.ts` (commit `a596634`)

#### Top-level routes (outside tab layout)

| Path | Component | File |
|---|---|---|
| `/login` | `LoginPage` | `src/pages/LoginPage.tsx` |
| `/signup` | `SignupPage` | `src/pages/SignupPage.tsx` |
| `/guide` | `GuidePage` | `src/pages/GuidePage.tsx` |
| `/edit-profile` | `EditProfilePage` | `src/pages/EditProfilePage.tsx` |
| `/notification-settings` | `NotificationSettingsPage` | `src/pages/NotificationSettingsPage.tsx` |
| `/privacy-security` | `PrivacySecurityPage` | `src/pages/PrivacySecurityPage.tsx` |
| `/preferences` | `PreferencesPage` | `src/pages/PreferencesPage.tsx` |
| `/customer-service` | `CustomerServicePage` | `src/pages/CustomerServicePage.tsx` |
| `/help-center` | `HelpCenterPage` | `src/pages/HelpCenterPage.tsx` |
| `/purchase` | `PurchasePage` | `src/pages/PurchasePage.tsx` |
| `/web-purchase` | `WebPurchasePage` | `src/pages/WebPurchasePage.tsx` |
| `/stock/:code` | `StockDetailPage` | `src/pages/StockDetailPage.tsx` |
| `/article/:id` | `ArticleDetailPage` | `src/pages/ArticleDetailPage.tsx` |
| `/post/:id` | `PostDetailPage` | `src/pages/PostDetailPage.tsx` |
| `/search` | `SearchPage` | `src/pages/SearchPage.tsx` |
| `/market-index` | `MarketIndexPage` | `src/pages/MarketIndexPage.tsx` |
| `/industry-selection` | `IndustrySelectionPage` | `src/pages/IndustrySelectionPage.tsx` |
| `/community` | `CommunityPage` | `src/pages/CommunityPage.tsx` |
| `/terms-of-service` | `TermsOfServicePage` | `src/pages/TermsOfServicePage.tsx` |
| `/privacy-policy` | `PrivacyPolicyPage` | `src/pages/PrivacyPolicyPage.tsx` |
| `/copyright-policy` | `CopyrightPolicyPage` | `src/pages/CopyrightPolicyPage.tsx` |

#### Tab layout routes (bottom navigation)

The tab container is `Layout`:
- `src/components/Layout.tsx`

`Layout` defines a fixed **bottom navigation** with 6 items (labels are in Chinese):

| Tab | Path | Label | Evidence |
|---|---|---|---|
| 1 | `/` (index) | `首頁` | `navItems` in `src/components/Layout.tsx` |
| 2 | `/stock-picker` | `選股` | same |
| 3 | `/watchlist` | `自選` | same |
| 4 | `/discussion` | `社團` | same |
| 5 | `/content` | `內容` | same |
| 6 | `/more` | `會員` | same |

Children under `Layout` (declared in `src/routes.ts`):

| Path (under `/`) | Component | File |
|---|---|---|
| `/` (index) | `HomePage` | `src/pages/HomePage.tsx` |
| `/stock-picker` | `StockPickerPage` | `src/pages/StockPickerPage.tsx` |
| `/stock-picker2` | `StockPicker2Page` | `src/pages/StockPicker2Page.tsx` |
| `/watchlist` | `WatchlistPage` | `src/pages/WatchlistPage.tsx` |
| `/discussion` | `DiscussionPage` | `src/pages/DiscussionPage.tsx` |
| `/content` | `ContentPage` | `src/pages/ContentPage.tsx` |
| `/more` | `MorePage` | `src/pages/MorePage.tsx` |

> Note: `stock-picker2` exists as a route but is **not** listed in the bottom nav items.

### 0.3 Major modules / feature areas (by directory)

This repo is a **web React (Vite) project** that appears to mirror a RN-style product spec (likely for future RN implementation), with many Figma Make generated components.

#### A) Page layer
- Location: `src/pages/*Page.tsx`
- Represents screens/routes listed in §0.2.

#### B) App shell / navigation
- `src/routes.ts`: route table
- `src/components/Layout.tsx`: bottom navigation shell + `<Outlet />`

#### C) Auth / user state
- `src/lib/authContext.tsx`: `useAuth()` is consumed by `Layout`.

#### D) Tab / sub-tab state
- `src/lib/tabContext.tsx`: referenced by `Layout`.

#### E) Domain components (stocks / community / purchase)
Representative components found under `src/components/*`:
- Stock related: `StockTable.tsx`, `StockList.tsx`, `StockCard.tsx`, `StockFilters.tsx`, `AdvancedFilters.tsx`, `MiniStockChart.tsx`
- Community related: `CommunityPostCard.tsx`, `CreatePostModal.tsx`, `EditPostModal.tsx`, `DeleteConfirmModal.tsx`, `ReportModal.tsx`, `ReactionPicker.tsx`, `ReactionDetailModal.tsx`
- Watchlist: `AddToWatchlistModal.tsx`, `watchlistStorage.ts` (in `src/lib/`)
- Subscription / purchase: `SubscriptionModal.tsx`, plus page routes `PurchasePage`, `WebPurchasePage`

#### F) Native bridge placeholders
- `src/lib/nativeBridge.ts`: suggests integration points for native features.
- Supporting docs: `src/docs/NATIVE_FEATURES.md`, `src/docs/PURCHASE_CONFIG.md`, `src/docs/DEVELOPER_CONFIG.md`

#### G) Business logic notes (docs in repo)
- `src/CONTENT_PAGE_LOGIC.md`
- `src/SIGNAL_FILTERING_LOGIC.md`
- `src/docs/PRD.md` (product spec reference)

#### H) Figma Make generated imports
- Location: `src/imports/*`
- Includes many auto-generated TSX components (with Chinese names and frame IDs), plus `svg-*.ts` files.
- Example evidence paths:
  - `src/imports/林恩如長線聚寶盆app.tsx`
  - `src/imports/作者專區.tsx`
  - `src/imports/社團Vip社團發文1圖1標籤.tsx`

---

## 1. Phase 0 scan strategy (commit-based, newest → oldest)

Given the repository is extremely shallow (2 commits), the scan is split as:

### Segment S0 (newest): `a596634` — “Add files from Figma Make”

Scope to extract:
- Full route/page inventory (from `src/routes.ts`)
- Navigation model (from `src/components/Layout.tsx`)
- Primary modules and shared components (from `src/components/*`, `src/lib/*`)
- Any explicit logic documentation (from `src/*LOGIC.md` and `src/docs/*`)

Output artifacts:
- This file: `doc/spec/rn-figma/00-scope-plan.md`
- Follow-up spec stubs (planned; see §2)

Evidence anchors (files to cite in later specs):
- `src/routes.ts`
- `src/components/Layout.tsx`
- `src/lib/authContext.tsx`, `src/lib/tabContext.tsx`, `src/lib/nativeBridge.ts`
- `src/pages/*.tsx`
- `src/CONTENT_PAGE_LOGIC.md`, `src/SIGNAL_FILTERING_LOGIC.md`, `src/docs/PRD.md`

### Segment S1 (older): `ff644d4` — “Initial commit”

Scope to extract:
- Only repository existence + baseline README

Evidence:
- `README.md` only.

---

## 2. Planned spec phases (deliverables & filenames)

This repo contains the exported UI + some logic notes, but does not yet contain a structured RN spec set.

The following phases are proposed as *spec-only* deliverables, each producing a markdown file under `doc/spec/rn-figma/`.

### Phase 0 — Scope confirmation (this MR)

Deliverable:
- `doc/spec/rn-figma/00-scope-plan.md` (this document)

### Phase 1 — Navigation & screen contracts

Goal:
- Define the navigation graph and per-screen input/output contracts.

Deliverables:
- `doc/spec/rn-figma/01-navigation.md`
  - Route list with parameters (`:code`, `:id`)
  - Tab navigation behavior + non-tab screens
  - Entry points (login vs app shell)

Primary evidence:
- `src/routes.ts`
- `src/components/Layout.tsx`

### Phase 2 — Feature modules breakdown

Goal:
- Partition screens/components into coherent RN modules and list responsibilities.

Deliverables:
- `doc/spec/rn-figma/02-modules.md`
  - Stocks (home/market/stock detail/search/filters/watchlist)
  - Community/discussion/post detail/reactions/moderation
  - Content/article detail
  - Account/more/settings
  - Purchase/subscription

Primary evidence:
- `src/pages/*`
- `src/components/*`
- `src/lib/*`

### Phase 3 — Data model & state management (as implied by code)

Goal:
- Identify implied domain models, storage, and state boundaries.

Deliverables:
- `doc/spec/rn-figma/03-data-state.md`
  - Auth state (`authContext`)
  - Tab/sub-tab state (`tabContext`)
  - Watchlist persistence (`watchlistStorage`)
  - Stock dataset stubs (`stockData.ts`)

Primary evidence:
- `src/lib/authContext.tsx`
- `src/lib/tabContext.tsx`
- `src/lib/watchlistStorage.ts`
- `src/lib/stockData.ts`

### Phase 4 — Native integration spec (bridge contracts)

Goal:
- Translate web placeholders/docs into RN native bridge contracts.

Deliverables:
- `doc/spec/rn-figma/04-native-bridge.md`

Primary evidence:
- `src/lib/nativeBridge.ts`
- `src/docs/NATIVE_FEATURES.md`
- `src/docs/PURCHASE_CONFIG.md`

### Phase 5 — Figma component mapping (optional, if needed for RN)

Goal:
- Map Figma Make generated components into a maintainable RN component library plan.

Deliverables:
- `doc/spec/rn-figma/05-figma-components.md`

Primary evidence:
- `src/imports/*`

---

## 3. Open questions / risks (from Phase 0 scan)

1) **Branching model mismatch**
- Upstream only had `main`; request expects `release_archive`.
- Resolution in this work: create `release_archive` from `main` and target PR/MR to it.

2) **Project type**
- Current repo is Vite/React (web), not a React Native repository.
- Spec work should clarify whether RN implementation will be created in a different repo, or generated from this as a UI reference.

3) **Shallow commit history**
- With only one meaningful code commit (`a596634`), commit-based phase slicing will be coarse.
- If more granular history is expected, confirm whether another branch/repo contains incremental commits.
