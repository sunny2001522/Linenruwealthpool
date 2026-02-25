import { createContext, useContext, useState, ReactNode } from "react";

type MainTabType = "video" | "course" | "article" | "podcast";
type DiscussionTabType = "enru" | "vip";
type SubTabType = "live" | "favorite" | "unpurchased" | "purchased" | "stock" | "tutorial";

interface TabContextType {
  // Content tabs
  contentMainTab: MainTabType;
  setContentMainTab: (tab: MainTabType) => void;
  contentSubTab: SubTabType;
  setContentSubTab: (tab: SubTabType) => void;
  
  // Discussion tabs
  discussionTab: DiscussionTabType;
  setDiscussionTab: (tab: DiscussionTabType) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [contentMainTab, setContentMainTab] = useState<MainTabType>("video");
  const [contentSubTab, setContentSubTab] = useState<SubTabType>("live");
  const [discussionTab, setDiscussionTab] = useState<DiscussionTabType>("enru");

  return (
    <TabContext.Provider
      value={{
        contentMainTab,
        setContentMainTab,
        contentSubTab,
        setContentSubTab,
        discussionTab,
        setDiscussionTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within TabProvider");
  }
  return context;
}