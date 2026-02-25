import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { StockPickerPage } from "./pages/StockPickerPage";
import { StockPicker2Page } from "./pages/StockPicker2Page";
import { StockDetailPage } from "./pages/StockDetailPage";
import { WatchlistPage } from "./pages/WatchlistPage";
import { DiscussionPage } from "./pages/DiscussionPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { ContentPage } from "./pages/ContentPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { MorePage } from "./pages/MorePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { GuidePage } from "./pages/GuidePage";
import { SearchPage } from "./pages/SearchPage";
import { MarketIndexPage } from "./pages/MarketIndexPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { NotificationSettingsPage } from "./pages/NotificationSettingsPage";
import { PrivacySecurityPage } from "./pages/PrivacySecurityPage";
import { PreferencesPage } from "./pages/PreferencesPage";
import { CustomerServicePage } from "./pages/CustomerServicePage";
import { HelpCenterPage } from "./pages/HelpCenterPage";
import { PurchasePage } from "./pages/PurchasePage";
import { WebPurchasePage } from "./pages/WebPurchasePage";
import { IndustrySelectionPage } from "./pages/IndustrySelectionPage";
import { CommunityPage } from "./pages/CommunityPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { CopyrightPolicyPage } from "./pages/CopyrightPolicyPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/guide",
    Component: GuidePage,
  },
  {
    path: "/edit-profile",
    Component: EditProfilePage,
  },
  {
    path: "/notification-settings",
    Component: NotificationSettingsPage,
  },
  {
    path: "/privacy-security",
    Component: PrivacySecurityPage,
  },
  {
    path: "/preferences",
    Component: PreferencesPage,
  },
  {
    path: "/customer-service",
    Component: CustomerServicePage,
  },
  {
    path: "/help-center",
    Component: HelpCenterPage,
  },
  {
    path: "/purchase",
    Component: PurchasePage,
  },
  {
    path: "/web-purchase",
    Component: WebPurchasePage,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "stock-picker", Component: StockPickerPage },
      { path: "stock-picker2", Component: StockPicker2Page },
      { path: "watchlist", Component: WatchlistPage },
      { path: "discussion", Component: DiscussionPage },
      { path: "content", Component: ContentPage },
      { path: "more", Component: MorePage },
    ],
  },
  {
    path: "/stock/:code",
    Component: StockDetailPage,
  },
  {
    path: "/article/:id",
    Component: ArticleDetailPage,
  },
  {
    path: "/post/:id",
    Component: PostDetailPage,
  },
  {
    path: "/search",
    Component: SearchPage,
  },
  {
    path: "/market-index",
    Component: MarketIndexPage,
  },
  {
    path: "/industry-selection",
    Component: IndustrySelectionPage,
  },
  {
    path: "/community",
    Component: CommunityPage,
  },
  {
    path: "/terms-of-service",
    Component: TermsOfServicePage,
  },
  {
    path: "/privacy-policy",
    Component: PrivacyPolicyPage,
  },
  {
    path: "/copyright-policy",
    Component: CopyrightPolicyPage,
  },
]);