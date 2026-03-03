import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { StockPickerPage } from "./pages/StockPickerPage";
import { StockDetailPage } from "./pages/StockDetailPage";
import { WatchlistPage } from "./pages/WatchlistPage";
import { DiscussionPage } from "./pages/DiscussionPage";
import { ContentPage } from "./pages/ContentPage";
import { MorePage } from "./pages/MorePage";
import { GuidePage } from "./pages/GuidePage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { CustomerServicePage } from "./pages/CustomerServicePage";
import { HelpCenterPage } from "./pages/HelpCenterPage";
import { PurchasePage } from "./pages/PurchasePage";
import { WebPurchasePage } from "./pages/WebPurchasePage";
import { WelcomePage } from "./pages/WelcomePage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: WelcomePage,
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
    path: "/home",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "stock-picker", Component: StockPickerPage },
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
]);