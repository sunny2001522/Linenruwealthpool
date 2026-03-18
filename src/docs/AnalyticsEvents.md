# 埋點事件追蹤規格

## 文件資訊
- **版本**: 1.2.0
- **最後更新**: 2026-03-18
- **負責人**: 產品與數據團隊
- **用途**: 定義台股應用程式中所有用戶行為追蹤點

---

## 目錄
1. [埋點總覽](#埋點總覽)
2. [事件分類](#事件分類)
3. [權限差異標註](#權限差異標註)
4. [實作規範](#實作規範)

---

## 埋點總覽

### 完整事件列表

| 編號 | 所在 Tab | 事件名稱 | 用戶執行動作 | 權限要求 | 優先級 |
|------|----------|----------|--------------|----------|--------|
| 001 | 更多 | `newcomer_guide` | 新手導覽 | 全部 | P1 |
| 002 | 選股 | `stockpick_tab` | 進入選股頁 | 全部 | P0 |
| 003 | 選股 | `strategy_one` | 切換至「挑噴出/回檔」星星欄位排序 | 全部 | P0 |
| 004 | 選股 | `strategy_two` | 切換至「看型態」星星欄位排序 | 全部 | P0 |
| 005 | 選股 | `strategy_three` | 切換至「看量找動能」星星欄位排序 | 全部 | P0 |
| 006 | 個股 | `single_stock` | 進入個股頁（一般股票） | 全部 | P0 |
| 007 | 個股 | `single_stock_candlestick` | 個股頁 － 切換至 K 線 Tab | 全部 | P1 |
| 008 | 個股 | `single_stock_realtime` | 個股頁 － 切換至即時 Tab | 全部 | P1 |
| 009 | 個股 | `single_stock_info` | 個股頁 － 切換至基本資訊 Tab | 全部 | P2 |
| 010 | 個股 | `single_stock_growth` | 個股頁 － 切換至營收成長 Tab | 全部 | P1 |
| 011 | 自選股 | `watchlist_tab` | 進入自選股頁 | 全部 | P0 |
| 012 | 社團 | `community_tab` | 進入社團頁 | 全部 | P0 |
| 013 | 內容專區 | `content_tab` | 進入內容專區 | 全部 | P0 |
| 014 | 內容專區 | `content_video` | 內容專區 － 切換至影音 Tab | 全部 | P1 |
| 015 | 內容專區 | `content_course` | 內容專區 － 切換至講座 Tab | 全部 | P1 |
| 016 | 內容專區 | `content_article` | 內容專區 － 切換至文章 Tab | 全部 | P1 |
| 017 | 內容專區 | `content_podcast` | 內容專區 － 切換至 Podcast Tab | 全部 | P1 |
| 018 | 內容專區 | `content_live` | 內容專區子分類 － 股市直播 | 全部 | P2 |
| 019 | 內容專區 | `content_favorite` | 內容專區子分類 － 我的收藏 | 全部 | P2 |
| 020 | 內容專區 | `content_unpurchased` | 內容專區子分類 － 未購講座 | 全部 | P2 |
| 021 | 內容專區 | `content_purchased` | 內容專區子分類 － 已購講座 | VIP | P2 |
| 022 | 內容專區 | `content_stock_category` | 內容專區子分類 － 選股技術 | 全部 | P2 |
| 023 | 內容專區 | `content_tutorial_category` | 內容專區子分類 － 實戰教學 | 全部 | P2 |
| 024 | 更多 | `more_tab` | 進入更多頁（會員頁） | 全部 | P0 |
| 025 | 更多 | `strategy_description` | 點擊策略說明 | 全部 | P2 |
| 026 | 其他 | `upgrade_page` | 進入購買頁 | 一般版 | P0 |
| 027 | 其他 | `purchase_success` | 購買成功 | 一般版 | P0 |
| 028 | 其他 | `popup_confirm_yes` | 點擊彈窗的 YES | 全部 | P1 |
| 029 | 其他 | `marquee_click` | 點擊跑馬燈 | 全部 | P2 |
| 030 | 其他 | `stock_limit_popup` | 個股使用上限彈窗顯示 | 一般版 | P1 |
| 031 | 首頁 | `home_tab` | 進入首頁 Tab | 全部 | P0 |
| 032 | 首頁 | `home_banner_slide` | 首頁輪播橫幅 － 滑動切換 | 全部 | P2 |
| 033 | 首頁 | `home_banner_click` | 首頁輪播橫幅 － 點擊 | 全部 | P1 |
| 034 | 首頁 | `home_hot_stock_click` | 首頁熱門焦點股票 － 點擊個股 | 全部 | P1 |
| 035 | 首頁 | `home_hot_stock_more` | 首頁熱門焦點股票 － 查看更多 | 全部 | P1 |
| 036 | 首頁 | `home_leader_industry_click` | 首頁領頭羊類股 － 點擊產業卡片 | 全部 | P1 |
| 037 | 首頁 | `home_leader_current` | 首頁領頭羊類股 － 切換至當期 | 全部 | P2 |
| 038 | 首頁 | `home_leader_previous` | 首頁領頭羊類股 － 切換至前期 | 全部 | P2 |
| 039 | 首頁 | `home_loser_industry_click` | 首頁落水狗類股 － 點擊產業卡片 | 全部 | P1 |
| 040 | 首頁 | `home_loser_current` | 首頁落水狗類股 － 切換至當期 | 全部 | P2 |
| 041 | 首頁 | `home_loser_previous` | 首頁落水狗類股 － 切換至前期 | 全部 | P2 |
| 042 | 首頁 | `home_market_chart_view` | 首頁大盤趨勢圖 － 查看 | 全部 | P2 |
| 043 | 首頁 | `home_community_post_click` | 首頁社團貼文 － 點擊貼文 | 全部 | P2 |
| 044 | 首頁 | `home_community_more` | 首頁社團貼文 － 查看更多 | 全部 | P1 |
| 045 | 首頁 | `home_content_click` | 首頁精選內容 － 點擊內容卡片 | 全部 | P2 |
| 046 | 首頁 | `home_content_more` | 首頁精選內容 － 查看更多 | 全部 | P1 |
| 047 | 首頁 | `home_social_line` | 首頁追蹤我們 － 點擊 LINE | 全部 | P2 |
| 048 | 首頁 | `home_social_facebook` | 首頁追蹤我們 － 點擊 Facebook | 全部 | P2 |
| 049 | 首頁 | `home_social_instagram` | 首頁追蹤我們 － 點擊 Instagram | 全部 | P2 |
| 050 | 選股 | `stockpick_filter_bull` | 選股 － 切換至多方策略 | 全部 | P1 |
| 051 | 選股 | `stockpick_filter_bear` | 選股 － 切換至空方策略 | 全部 | P1 |
| 052 | 選股 | `stockpick_filter_above_ma` | 選股 － 站上週20MA | 全部 | P1 |
| 053 | 選股 | `stockpick_filter_strong_ma` | 選股 － 強勢週20MA | 全部 | P1 |
| 054 | 選股 | `stockpick_filter_below_ma` | 選股 － 跌破週20MA | 全部 | P1 |
| 055 | 選股 | `stockpick_filter_weak_ma` | 選股 － 弱勢週20MA | 全部 | P1 |
| 056 | 選股 | `stockpick_advanced_filter` | 選股 － 打開進階篩選器 | 全部 | P1 |
| 057 | 選股 | `stockpick_view_grid` | 選股 － 切換至卡片視圖 | 全部 | P2 |
| 058 | 選股 | `stockpick_view_list` | 選股 － 切換至列表視圖 | 全部 | P2 |
| 059 | 個股 | `stock_add_watchlist` | 個股頁 － 點擊加入自選股 | 全部 | P1 |
| 060 | 個股 | `stock_candlestick_day` | 個股 K 線 － 切換日 K | 全部 | P1 |
| 061 | 個股 | `stock_candlestick_week` | 個股 K 線 － 切換週 K | VIP | P1 |
| 062 | 個股 | `stock_candlestick_month` | 個股 K 線 － 切換月 K | VIP | P1 |
| 063 | 個股 | `stock_ma20_toggle` | 個股 K 線 － 切換 MA20 顯示 | VIP | P2 |
| 064 | 個股 | `stock_ma100_toggle` | 個股 K 線 － 切換 MA100 顯示 | VIP | P2 |
| 065 | 自選股 | `watchlist_sort` | 自選股 － 欄位排序 | 全部 | P2 |
| 066 | 自選股 | `watchlist_delete` | 自選股 － 移除股票 | 全部 | P2 |
| 067 | 社團 | `community_post_create` | 社團 － 發布新貼文 | 全部 | P1 |
| 068 | 社團 | `community_post_edit` | 社團 － 編輯貼文 | 全部 | P2 |
| 069 | 社團 | `community_post_delete` | 社團 － 刪除貼文 | 全部 | P2 |
| 070 | 社團 | `community_post_report` | 社團 － 檢舉貼文 | 全部 | P2 |
| 071 | 社團 | `community_reaction` | 社團 － 表情反應 | 全部 | P2 |
| 072 | 社團 | `community_vip_tab` | 社團 － 切換至 VIP 長線精英討論群 | VIP | P1 |

---

## 事件分類

### 1. 導航事件（Navigation Events）
用戶進入各主要頁面的追蹤點。

| 事件名稱 | 說明 | 觸發時機 | 對應路徑 |
|----------|------|----------|----------|
| `home_tab` | 進入首頁 | 點擊底部導航「首頁」Tab | `/home` |
| `stockpick_tab` | 進入選股頁 | 點擊底部導航「選股」Tab | `/home/stock-picker` |
| `watchlist_tab` | 進入自選股頁 | 點擊底部導航「自選」Tab | `/home/watchlist` |
| `community_tab` | 進入社團頁 | 點擊底部導航「社團」Tab | `/home/discussion` |
| `content_tab` | 進入內容專區 | 點擊底部導航「內容」Tab | `/home/content` |
| `more_tab` | 進入更多頁（會員） | 點擊底部導航「會員」Tab | `/home/more` |

### 2. 選股策略事件（Stock Picking Events）
與「恩如三部曲」星星評分系統相關的事件。

| 事件名稱 | 說明 | 對應欄位 | Signal 邏輯 |
|----------|------|----------|-------------|
| `strategy_one` | 點擊排序「挑噴出/回檔」 | 第一部曲星星欄位 | 參考 `/docs/TrilogySpec.md` 第一部曲 |
| `strategy_two` | 點擊排序「看型態」 | 第二部曲星星欄位 | 參考 `/docs/TrilogySpec.md` 第二部曲 |
| `strategy_three` | 點擊排序「看量找動能」 | 第三部曲星星欄位 | 參考 `/docs/TrilogySpec.md` 第三部曲 |

**重要說明**：
- 這三個事件對應選股頁面表格中的三個星星評分欄位標題點擊
- 點擊後會按該欄位進行排序（降序/升序切換）
- 第二順位排序固定為 Stock ID

#### 選股篩選器事件
| 事件名稱 | 說明 | 觸發條件 |
|----------|------|----------|
| `stockpick_filter_bull` | 切換多方策略 | 選擇「多方」按鈕 |
| `stockpick_filter_bear` | 切換空方策略 | 選擇「空方」按鈕 |
| `stockpick_filter_above_ma` | 站上週20MA | 選擇「站上週20MA（波段股）」 |
| `stockpick_filter_strong_ma` | 強勢週20MA | 選擇「強勢週20MA之上」 |
| `stockpick_filter_below_ma` | 跌破週20MA | 選擇「跌破週20MA」 |
| `stockpick_filter_weak_ma` | 弱勢週20MA | 選擇「弱勢週20MA之下」 |
| `stockpick_advanced_filter` | 進階篩選器 | 點擊打開進階篩選面板 |

#### 選股視圖切換事件
| 事件名稱 | 說明 | 觸發條件 |
|----------|------|----------|
| `stockpick_view_list` | 列表視圖 | 切換至表格列表視圖 |
| `stockpick_view_grid` | 卡片視圖 | 切換至卡片網格視圖 |

### 3. 個股詳情事件（Stock Detail Events）

#### 3.1 個股頁面導航
| 事件名稱 | 說明 | 資料來源 | 路徑 |
|----------|------|----------|------|
| `single_stock` | 進入個股頁 | 點擊任一股票代碼/名稱 | `/stock/:code` |
| `single_stock_candlestick` | K 線 Tab | 切換至「K 線」Tab | `/stock/:code` Tab 1 |
| `single_stock_realtime` | 即時 Tab | 切換至「即時」Tab | `/stock/:code` Tab 2 |
| `single_stock_info` | 基本資訊 Tab | 切換至「基本資訊」Tab | `/stock/:code` Tab 3 |
| `single_stock_growth` | 營收成長 Tab | 切換至「營收成長」Tab | `/stock/:code` Tab 4 |

#### 3.2 個股 K 線互動
| 事件名稱 | 說明 | 權限限制 |
|----------|------|----------|
| `stock_candlestick_day` | 切換日 K | 全部 |
| `stock_candlestick_week` | 切換週 K | 🔒 VIP 專屬 |
| `stock_candlestick_month` | 切換月 K | 🔒 VIP 專屬 |
| `stock_ma20_toggle` | 切換 MA20 均線顯示 | 🔒 VIP 專屬 |
| `stock_ma100_toggle` | 切換 MA100 均線顯示 | 🔒 VIP 專屬 |

#### 3.3 個股自選股操作
| 事件名稱 | 說明 | 觸發時機 |
|----------|------|----------|
| `stock_add_watchlist` | 加入自選股 | 點擊愛心圖示打開自選股彈窗 |

**說明**：
- 個股頁面使用 iOS DGCharts / Android MPCharts 繪製圖表
- 週 K、月 K、均線控制器僅對 VIP 用戶開放
- 一般版用戶點擊會觸發事件並顯示升級提示

### 4. 首頁事件（Home Page Events）

| 事件名稱 | 說明 | 觸發時機 |
|----------|------|----------|
| `home_tab` | 進入首頁 | 點擊底部導航「首頁」 |
| `home_banner_slide` | 輪播橫幅滑動切換 | 滑動首頁輪播橫幅 |
| `home_banner_click` | 輪播橫幅點擊 | 點擊首頁輪播橫幅 |
| `home_hot_stock_click` | 熱門焦點股票點擊 | 點擊首頁熱門焦點股票 |
| `home_hot_stock_more` | 熱門焦點股票查看更多 | 點擊首頁熱門焦點股票查看更多按鈕 |
| `home_leader_industry_click` | 領頭羊類股產業卡片點擊 | 點擊首頁領頭羊類股產業卡片 |
| `home_leader_current` | 領頭羊類股切換至當期 | 點擊首頁領頭羊類股當期按鈕 |
| `home_leader_previous` | 領頭羊類股切換至前期 | 點擊首頁領頭羊類股前期按鈕 |
| `home_loser_industry_click` | 落水狗類股產業卡片點擊 | 點擊首頁落水狗類股產業卡片 |
| `home_loser_current` | 落水狗類股切換至當期 | 點擊首頁落水狗類股當期按鈕 |
| `home_loser_previous` | 落水狗類股切換至前期 | 點擊首頁落水狗類股前期按鈕 |
| `home_market_chart_view` | 大盤趨勢圖查看 | 點擊首頁大盤趨勢圖 |
| `home_community_post_click` | 社團貼文點擊 | 點擊首頁社團貼文 |
| `home_community_more` | 社團貼文查看更多 | 點擊首頁社團貼文查看更多按鈕 |
| `home_content_click` | 精選內容卡片點擊 | 點擊首頁精選內容卡片 |
| `home_content_more` | 精選內容查看更多 | 點擊首頁精選內容查看更多按鈕 |
| `home_social_line` | 追蹤我們點擊 LINE | 點擊首頁追蹤我們的 LINE 圖示 |
| `home_social_facebook` | 追蹤我們點擊 Facebook | 點擊首頁追蹤我們的 Facebook 圖示 |
| `home_social_instagram` | 追蹤我們點擊 Instagram | 點擊首頁追蹤我們的 Instagram 圖示 |
| `marquee_click` | 跑馬燈點擊 | 點擊首頁跑馬燈訊息 |

### 5. 自選股事件（Watchlist Events）

| 事件名稱 | 說明 | 觸發時機 |
|----------|------|----------|
| `watchlist_tab` | 進入自選股頁 | 點擊底部導航「自選」 |
| `watchlist_sort` | 欄位排序 | 點擊任一欄位標題進行排序 |
| `watchlist_delete` | 移除股票 | 點擊刪除按鈕移除自選股 |

**權限限制**：
- VIP版：無上限儲存股票，支援多組清單
- 一般版：最多儲存 10 支股票，僅 1 組清單

### 6. 社團事件（Community Events）

| 事件名稱 | 說明 | 觸發時機 | 權限限制 |
|----------|------|----------|----------|
| `community_tab` | 進入社團頁 | 點擊底部導航「社團」 | 全部 |
| `community_vip_tab` | VIP 討論群 Tab | 切換至「長線精英討論群」 | 🔒 VIP 專屬 |
| `community_post_create` | 發布新貼文 | 點擊發文按鈕 | 全部 |
| `community_post_edit` | 編輯貼文 | 點擊編輯按鈕 | 全部 |
| `community_post_delete` | 刪除貼文 | 點擊刪除按鈕 | 全部 |
| `community_post_report` | 檢舉貼文 | 點擊檢舉按鈕 | 全部 |
| `community_reaction` | 表情反應 | 點擊表情符號 | 全部 |

**權限說明**：
- **VIP版**：可以看到「長線精英討論群」的內容
- **一般版**：無法看到「長線精英討論群」的內容
- 其他功能（發文、回文、表情反應）兩者無差異

### 7. 內容專區事件（Content Zone Events）

#### 7.1 主分類 Tab
| 事件名稱 | 說明 | 觸發時機 |
|----------|------|----------|
| `content_tab` | 進入內容專區 | 點擊底部導航「內容」 |
| `content_video` | 影音分類 | 切換至「影音」主 Tab |
| `content_course` | 講座分類 | 切換至「講座」主 Tab |
| `content_article` | 文章分類 | 切換至「文章」主 Tab |
| `content_podcast` | Podcast 分類 | 切換至「Podcast」主 Tab |

#### 7.2 子分類 Tab
| 事件名稱 | 說明 | 適用主分類 | 權限限制 |
|----------|------|------------|----------|
| `content_live` | 股市直播子分類 | 影音、Podcast | 全部 |
| `content_favorite` | 我的收藏子分類 | 影音、文章、Podcast | 全部 |
| `content_unpurchased` | 未購講座子分類 | 講座 | 全部 |
| `content_purchased` | 已購講座子分類 | 講座 | VIP |
| `content_stock_category` | 選股技術子分類 | 文章 | 全部 |
| `content_tutorial_category` | 實戰教學子分類 | 文章 | 全部 |

**設計風格**：採用 YouTube 風格設計，包含縮圖、標題、時長/日期、收藏/VIP 標識

### 8. 會員頁面事件（More Page Events）

| 事件名稱 | 說明 | 觸發時機 |
|----------|------|----------|
| `more_tab` | 進入會員頁 | 點擊底部導航「會員」 |
| `newcomer_guide` | 新手導覽 | 點擊「新手教學」或「幫助」 |
| `strategy_description` | 策略說明 | 點擊「策略說明」按鈕 |

### 9. 轉換事件（Conversion Events）

| 事件名稱 | 說明 | 觸發條件 | 業務價值 |
|----------|------|----------|----------|
| `upgrade_page` | 進入購買頁 | 一般用戶點擊升級 VIP | 高 |
| `purchase_success` | 購買成功 | 完成支付流程 | 極高 |
| `stock_limit_popup` | 個股上限彈窗 | 一般版達到查看上限 | 高 |
| `popup_confirm_yes` | 彈窗確認 | 點擊任何確認彈窗的「YES」 | 中 |

---

## 權限差異標註

### VIP 專屬功能
以下事件僅對 VIP 用戶開放，一般版用戶會顯示金色鎖頭（#D4AF37）並引導升級：

| 事件編號 | 事件名稱 | 限制說明 | 視覺提示 |
|----------|----------|----------|----------|
| 045 | `stock_candlestick_week` | 週 K 線查看 | 模糊 + 金色鎖頭 |
| 046 | `stock_candlestick_month` | 月 K 線查看 | 模糊 + 金色鎖頭 |
| 047 | `stock_ma20_toggle` | MA20 均線控制 | 鎖定無法勾選 |
| 048 | `stock_ma100_toggle` | MA100 均線控制 | 鎖定無法勾選 |
| 021 | `content_purchased` | 已購講座分類 | VIP 標籤顯示 |
| 056 | `community_vip_tab` | 長線精英討論群 | 金色鎖頭提示 |

### 一般版限制
以下事件與一般版用戶的使用限制相關：

| 事件編號 | 事件名稱 | 限制內容 |
|----------|----------|----------|
| 002 | `stockpick_tab` | 選股列表僅顯示前 3 檔，其餘模糊 + 金色鎖頭 |
| 026 | `upgrade_page` | 一般版查看完整列表需升級 |
| 027 | `purchase_success` | 完成 VIP 購買 |
| 030 | `stock_limit_popup` | 一般版個股查看上限提示 |
| 011 | `watchlist_tab` | 最多儲存 10 支股票，1 組清單 |

### 列表顯示規則
- **一般版**: 選股列表僅顯示前 3 檔，其餘模糊處理 + 金色鎖頭圖示
- **VIP 版**: 顯示完整列表，無限制

---

## 實作規範

### 事件參數標準

每個埋點事件應包含以下基礎參數：

| 參數名稱 | 類型 | 必填 | 說明 | 範例 |
|----------|------|------|------|------|
| `event_name` | String | ✓ | 事件名稱 | `stockpick_tab` |
| `timestamp` | Number | ✓ | Unix 時間戳（毫秒） | `1710748800000` |
| `user_id` | String | ✓ | 用戶唯一識別碼 | `user_12345` |
| `session_id` | String | ✓ | 會話 ID | `sess_abc123` |
| `user_type` | String | ✓ | 用戶類型 | `vip` / `free` |
| `platform` | String | ✓ | 平台類型 | `ios` / `android` / `web` |
| `app_version` | String | ✓ | 應用版本 | `2.1.0` |

### 擴展參數（依事件類型）

#### 導航事件額外參數
| 參數名稱 | 類型 | 說明 | 範例 |
|----------|------|------|------|
| `from_page` | String | 來源頁面路徑 | `/home/watchlist` |
| `to_page` | String | 目標頁面路徑 | `/home/stock-picker` |

#### 首頁事件額外參數
| 參數名稱 | 類型 | 說明 | 範例 |
|----------|------|------|------|
| `banner_index` | Number | 輪播橫幅索引 | `0` / `1` / `2` |
| `banner_title` | String | 輪播橫幅標題 | `長線聚寶盆` / `技術分析實戰` |
| `banner_url` | String | 輪播橫幅跳轉連結 | `https://example.com` |
| `stock_id` | String | 股票代碼（熱門焦點股票） | `2330` |
| `stock_name` | String | 股票名稱（熱門焦點股票） | `台積電` |
| `stock_rank` | Number | 股票排名（熱門焦點股票） | `1` / `2` / `3` |
| `industry_category` | String | 產業類別 | `電子上游` |
| `industry_subcategory` | String | 產業子類別 | `IC設計` |
| `industry_rank` | Number | 產業排名 | `1` ~ `10` |
| `period_type` | String | 期別類型 | `current` / `previous` |
| `post_id` | String | 貼文 ID（社團貼文） | `post_12345` |
| `content_id` | String | 內容 ID（精選內容） | `content_001` |
| `content_type` | String | 內容類型（精選內容） | `video` / `course` / `article` / `podcast` |
| `social_platform` | String | 社群平台 | `line` / `facebook` / `instagram` |

#### 選股策略事件額外參數
| 參數名稱 | 類型 | 說明 | 範例 |
|----------|------|------|------|
| `strategy_id` | Number | 策略編號（1-3） | `1` |
| `strategy_name` | String | 策略名稱 | `挑噴出/回檔` |
| `sort_field` | String | 排序欄位 | `trilogy_1` / `trilogy_2` / `trilogy_3` |
| `sort_direction` | String | 排序方向 | `asc` / `desc` |
| `market_type` | String | 市場策略類型 | `bull` / `bear` |
| `filter_type` | String | 篩選條件類型 | `above-ma` / `strong-ma` / `below-ma` / `weak-ma` |
| `result_count` | Number | 符合條件的股票數量 | `15` |
| `is_locked` | Boolean | 是否被鎖定（一般版） | `true` |
| `view_mode` | String | 視圖模式 | `list` / `grid` |

#### 個股查看事件額外參數
| 參數名稱 | 類型 | 說明 | 範例 |
|----------|------|------|------|
| `stock_id` | String | 股票代碼 | `2330` |
| `stock_name` | String | 股票名稱 | `台積電` |
| `stock_type` | String | 股票類型 | `stock` / `etf` |
| `tab_name` | String | 切換的 Tab 名稱 | `candlestick` / `realtime` / `info` / `growth` |
| `candlestick_period` | String | K 線週期 | `day` / `week` / `month` |
| `ma_type` | String | 均線類型 | `ma20` / `ma100` |
| `ma_status` | String | 均線狀態 | `show` / `hide` |
| `source` | String | 來源頁面 | `watchlist` / `stockpick` / `home` / `search` |

#### 內容專區事件額外參數
| 參數名稱 | 類型 | 說明 | 範例 |
|----------|------|------|------|
| `content_type` | String | 主分類類型 | `video` / `course` / `article` / `podcast` |
| `sub_category` | String | 子分類 | `live` / `favorite` / `unpurchased` / `purchased` / `stock` / `tutorial` |
| `content_id` | String | 內容 ID | `article_001` |
| `is_premium` | Boolean | 是否為付費內容 | `true` |
| `sort_by` | String | 排序方式 | `latest` / `popular` |

#### 社團事件額外參數
| 參數名稱 | 類型 | 說明 | 範例 |
|----------|------|------|------|
| `community_type` | String | 社團類型 | `general` / `vip` |
| `post_id` | String | 貼文 ID | `post_12345` |
| `action_type` | String | 操作類型 | `create` / `edit` / `delete` / `report` |
| `reaction_type` | String | 表情類型 | `like` / `love` / `laugh` / `sad` / `angry` |
| `has_image` | Boolean | 是否包含圖片 | `true` |
| `has_stock_tag` | Boolean | 是否包含股票標籤 | `true` |

#### 轉換事件額外參數
| 參數名稱 | 類型 | 說明 | 範例 |
|----------|------|------|------|
| `trigger_source` | String | 觸發來源 | `stockpick_lock` / `content_lock` / `stock_week_k` / `nav_button` |
| `plan_type` | String | 方案類型 | `monthly` / `yearly` |
| `price` | Number | 價格（僅購買成功） | `990` |
| `currency` | String | 幣別（僅購買成功） | `TWD` |

---

## 資料流程

### 事件觸發流程

```
用戶操作（點擊、切換、滑動）
    ↓
觸發條件檢查（權限、限制）
    ↓
組裝事件參數（基礎 + 擴展）
    ↓
發送至分析平台（Firebase Analytics）
    ↓
本地日誌記錄（Debug 模式）
```

### 權限檢查流程

```
事件觸發
    ↓
判斷是否需要權限檢查
    ↓
    ├─ VIP 專屬功能（週K、月K、社團VIP群）
    │      ↓
    │  檢查用戶類型 (user.isVIP)
    │      ↓
    │      ├─ VIP → 正常記錄事件 + 執行功能
    │      └─ 一般版 → 記錄事件 + 顯示升級提示 + 阻止操作
    │
    ├─ 有限制功能（選股前3檔、自選股10支）
    │      ↓
    │  檢查用戶類型 + 當前使用量
    │      ↓
    │      ├─ VIP → 正常記錄事件 + 無限制
    │      └─ 一般版 → 記錄事件 + 模糊顯示/上限提示
    │
    └─ 一般功能 → 直接記錄事件 + 執行功能
```

---

## API 端點規範

### 批次上傳事件

**Endpoint**: `POST /api/analytics/batch`

**Request Body**:
```json
{
  "events": [
    {
      "event_name": "stockpick_tab",
      "timestamp": 1710748800000,
      "user_id": "user_12345",
      "session_id": "sess_abc123",
      "user_type": "free",
      "platform": "ios",
      "app_version": "2.1.0",
      "from_page": "/home",
      "to_page": "/home/stock-picker"
    },
    {
      "event_name": "strategy_one",
      "timestamp": 1710748805000,
      "user_id": "user_12345",
      "session_id": "sess_abc123",
      "user_type": "free",
      "platform": "ios",
      "app_version": "2.1.0",
      "strategy_id": 1,
      "strategy_name": "挑噴出/回檔",
      "sort_field": "trilogy_1",
      "sort_direction": "desc",
      "result_count": 15,
      "is_locked": true
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "received_count": 2,
  "message": "Events recorded successfully"
}
```

---

## 優先級定義

| 級別 | 說明 | 範例 |
|------|------|------|
| **P0** | 核心轉換路徑，必須追蹤 | 主要頁面導航、購買流程、策略切換 |
| **P1** | 重要功能使用，強烈建議追蹤 | 個股查看、Tab 切換、內容分類 |
| **P2** | 次要功能，可選追蹤 | 基本資料查看、排序操作、表情反應 |

---

## 測試檢查清單

### 上線前檢查

- [ ] 所有 P0 事件已實作並測試
- [ ] VIP / 一般版權限檢查正確
- [ ] 事件參數格式符合規範
- [ ] 批次上傳 API 測試通過
- [ ] iOS / Android 平台測試通過
- [ ] Firebase Analytics 整合測試完成
- [ ] 本地日誌記錄功能正常
- [ ] 與後端 API 對接測試完成

### 關鍵路徑測試

**選股流程**：
- [ ] 進入選股頁 → `stockpick_tab`
- [ ] 切換多方/空方 → `stockpick_filter_bull` / `stockpick_filter_bear`
- [ ] 點擊星星排序 → `strategy_one` / `strategy_two` / `strategy_three`
- [ ] 一般版僅顯示前3檔 → 記錄 `is_locked: true`
- [ ] 點擊鎖定區域 → `upgrade_page`

**個股查看流程**：
- [ ] 點擊股票進入詳情 → `single_stock`
- [ ] 切換 K 線 Tab → `single_stock_candlestick`
- [ ] 切換日/週/月 K → `stock_candlestick_day` / `week` / `month`
- [ ] 一般版點擊週K → 顯示鎖頭 + `upgrade_page`
- [ ] 加入自選股 → `stock_add_watchlist`

**內容專區流程**：
- [ ] 進入內容專區 → `content_tab`
- [ ] 切換主分類 → `content_video` / `content_course` / `content_article` / `content_podcast`
- [ ] 切換子分類 → `content_live` / `content_favorite` 等

**購買轉換流程**：
- [ ] 點擊升級按鈕 → `upgrade_page` + `trigger_source`
- [ ] 完成購買 → `purchase_success` + 價格資訊
- [ ] 購買後自動解鎖 VIP 功能

### 常見問題檢查

- [ ] 事件名稱拼寫正確（使用 snake_case）
- [ ] 時間戳為毫秒級 Unix timestamp
- [ ] 用戶類型正確標註（`vip` / `free`）
- [ ] 股票代碼格式正確（台股 4 碼）
- [ ] 金額貨幣單位一致（TWD）
- [ ] 路由路徑與實際 `routes.ts` 一致
- [ ] Tab 切換事件包含來源 Tab 資訊
- [ ] 排序事件包含排序欄位與方向

---

## 版本紀錄

| 版本 | 日期 | 變更內容 | 負責人 |
|------|------|----------|--------|
| 1.2.0 | 2026-03-18 | 新增首頁完整事件追蹤（共19個事件）：輪播橫幅、熱門焦點股票、領頭羊/落水狗類股、大盤趨勢、社團貼文、精選內容、社群連結 | 產品團隊 |
| 1.1.0 | 2026-03-18 | 根據實際程式碼重構：更新事件名稱與說明、對應實際路徑、新增選股視圖切換與 K 線互動事件 | 產品團隊 |
| 1.0.0 | 2026-03-18 | 初版建立，定義所有核心埋點事件 | 產品團隊 |

---

## 相關文件

- `/docs/TrilogySpec.md` - 恩如三部曲星星評分系統規格
- `/docs/00_APP_OVERVIEW.md` - 應用程式整體概覽
- `/docs/02_STOCK_PICKER_PAGE.md` - 選股頁面規格
- `/docs/03_WATCHLIST_PAGE.md` - 自選股頁面規格
- `/docs/08_STOCK_DETAIL_PAGE.md` - 個股詳情頁面規格
- `/docs/05_CONTENT_PAGE.md` - 內容專區頁面規格
- `/routes.ts` - 路由配置文件
- `/components/Layout.tsx` - 底部導航配置

---

## 備註

1. **顏色規範遵守**: 所有 VIP 鎖定元素使用金色 `#D4AF37`，漲跌顏色嚴格遵守紅漲 `#FE6D73`、綠跌 `#9cffd9`
2. **圖表實作**: K 線圖表在 iOS 使用 DGCharts，Android 使用 MPCharts
3. **路由規範**: 所有頁面導航使用 `react-router` 進行管理
4. **無程式碼標準**: 本文件僅包含功能描述、表格與流程圖，不包含任何 TSX 實作程式碼
5. **策略事件說明**: `strategy_one` / `strategy_two` / `strategy_three` 對應選股頁面表格中三個星星評分欄位的排序操作
6. **權限檢查**: 所有涉及 VIP 功能的事件都需要在觸發時檢查 `user.isVIP` 狀態
7. **Firebase 整合**: 建議使用 Firebase Analytics 作為主要埋點平台
8. **批次上傳**: 建議將事件批次上傳，避免單一事件頻繁請求