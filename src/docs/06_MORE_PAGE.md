# 👤 會員標籤（MorePage）完整文檔

## 📋 文檔更新日期
2026年3月9日

---

## 🎯 頁面概述

**會員頁**是用戶管理個人資料、查看會員等級、購買專業版、設定偏好的中心頁面。

### 路由資訊
- **路徑**：`/home/more`
- **組件**：`MorePage`
- **底部導覽圖標**：👤 User（會員）
- **是否需要登入**：是
- **有無底部導覽列**：有

---

## 📐 頁面結構

```
┌─────────────────────────────────────────────────┐
│              個人資料卡片                        │
│   ┌──────────────────────────────────────┐    │
│   │  👤 頭像                              │    │
│   │  林恩如                                │    │
│   │  queen_dtno@cmoney.com.tw            │    │
│   │  💎 專業版會員  有效期至 2026/12/31   │    │
│   │  [ 編輯個人資料 ]                      │    │
│   └──────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              功能選單列表                        │
│   ┌──────────────────────────────────────┐    │
│   │  🛒 購買專業版                         │    │
│   │  🔔 通知設定                           │    │
│   │  🎨 主題設定                           │    │
│   │  🌐 語言設定                           │    │
│   │  💬 客服中心                           │    │
│   │  ❓ 幫助中心                           │    │
│   │  📄 服務條款                           │    │
│   │  🔒 隱私政策                           │    │
│   │  ⚖️ 版權政策                          │    │
│   │  ℹ️ 關於我們                           │    │
│   │  🚪 登出                               │    │
│   └──────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

---

## 👤 個人資料卡片

### 專業版用戶卡片

```tsx
<Card className="bg-gradient-to-br from-[#4A90E2]/20 to-[#D4AF37]/10 border border-[#4A90E2]/30">
  <CardContent className="p-6">
    <div className="flex items-center gap-4 mb-4">
      {/* 頭像 */}
      <Avatar className="w-20 h-20 border-4 border-[#D4AF37]">
        <AvatarImage src={user?.avatar} />
        <AvatarFallback className="text-2xl font-bold">
          {user?.name[0]}
        </AvatarFallback>
      </Avatar>

      {/* 用戶資訊 */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
        <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>

        {/* 專業版徽章 */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white text-sm font-semibold">
          <Crown className="w-4 h-4" />
          專業版會員
        </div>
      </div>
    </div>

    {/* 會員到期日 */}
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 mb-3">
      <span className="text-sm text-muted-foreground">會員有效期</span>
      <span className="text-sm font-semibold">
        至 {format(user?.vipExpiryDate, 'yyyy/MM/dd')}
      </span>
    </div>

    {/* 編輯個人資料按鈕 */}
    <Button
      onClick={() => navigate('/edit-profile')}
      variant="outline"
      className="w-full"
    >
      <Edit className="w-4 h-4 mr-2" />
      編輯個人資料
    </Button>
  </CardContent>
</Card>
```

### 試用版用戶卡片

```tsx
<Card className="bg-gradient-to-br from-muted/50 to-muted/20 border border-border">
  <CardContent className="p-6">
    <div className="flex items-center gap-4 mb-4">
      {/* 頭像 */}
      <Avatar className="w-20 h-20">
        <AvatarImage src={user?.avatar} />
        <AvatarFallback className="text-2xl font-bold">
          {user?.name[0]}
        </AvatarFallback>
      </Avatar>

      {/* 用戶資訊 */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
        <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>

        {/* 試用版徽章 */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-semibold">
          <Clock className="w-4 h-4" />
          試用版用戶
        </div>
      </div>
    </div>

    {/* 升級提示 */}
    <div className="p-4 rounded-lg bg-gradient-to-br from-[#4A90E2]/10 to-[#D4AF37]/10 border border-[#4A90E2]/30 mb-3">
      <p className="text-sm font-semibold mb-2">🎁 升級專業版，享受完整功能</p>
      <p className="text-xs text-muted-foreground mb-3">
        無限制選股、VIP內容、無廣告體驗
      </p>
      <Button
        onClick={() => navigate('/purchase')}
        className="w-full bg-gradient-to-r from-[#4A90E2] to-[#D4AF37]"
      >
        <Crown className="w-4 h-4 mr-2" />
        立即升級
      </Button>
    </div>

    {/* 編輯個人資料按鈕 */}
    <Button
      onClick={() => navigate('/edit-profile')}
      variant="outline"
      className="w-full"
    >
      <Edit className="w-4 h-4 mr-2" />
      編輯個人資料
    </Button>
  </CardContent>
</Card>
```

---

## 🛒 購買專業版

### 購買選單項

```tsx
<button
  onClick={() => navigate('/purchase')}
  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-muted transition-colors"
>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center">
      <ShoppingCart className="w-5 h-5 text-white" />
    </div>
    <div className="text-left">
      <p className="font-semibold">購買專業版</p>
      <p className="text-xs text-muted-foreground">解鎖所有功能</p>
    </div>
  </div>
  <ChevronRight className="w-5 h-5 text-muted-foreground" />
</button>
```

### 購買頁面（PurchasePage）

**審查模式（狀態碼 2）**：
- 導向原生 App Store IAP
- 使用 `nativeBridge.openAppStore()`

**正常模式（狀態碼 1）**：
- 導向網頁購買頁面（`/web-purchase`）
- 或原生 IAP（根據配置）

---

## ⚙️ 功能選單列表

### 選單項設計

```tsx
const menuItems = [
  {
    icon: Bell,
    label: '通知設定',
    description: '管理推播通知',
    path: '/notification-settings',
    color: '#4A90E2'
  },
  {
    icon: Palette,
    label: '主題設定',
    description: '深色/淺色模式',
    path: '/theme-settings',
    color: '#D4AF37'
  },
  {
    icon: Globe,
    label: '語言設定',
    description: '繁體中文',
    path: '/language-settings',
    color: '#9cffd9'
  },
  {
    icon: MessageCircle,
    label: '客服中心',
    description: '聯繫客服團隊',
    path: '/customer-service',
    color: '#FE6D73'
  },
  {
    icon: HelpCircle,
    label: '幫助中心',
    description: '常見問題與教學',
    path: '/help-center',
    color: '#FFD93D'
  }
];

{menuItems.map((item) => (
  <button
    key={item.path}
    onClick={() => navigate(item.path)}
    className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-muted transition-colors"
  >
    <div className="flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${item.color}20` }}
      >
        <item.icon className="w-5 h-5" style={{ color: item.color }} />
      </div>
      <div className="text-left">
        <p className="font-semibold">{item.label}</p>
        <p className="text-xs text-muted-foreground">{item.description}</p>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-muted-foreground" />
  </button>
))}
```

---

## 🚪 登出功能

### 登出按鈕

```tsx
<button
  onClick={() => setShowLogoutConfirm(true)}
  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
      <LogOut className="w-5 h-5" />
    </div>
    <div className="text-left">
      <p className="font-semibold">登出</p>
      <p className="text-xs opacity-80">退出當前帳號</p>
    </div>
  </div>
  <ChevronRight className="w-5 h-5" />
</button>
```

### 登出確認彈窗

```tsx
<AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>確認登出</AlertDialogTitle>
      <AlertDialogDescription>
        確定要登出目前的帳號嗎？
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>取消</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600"
      >
        登出
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### 登出邏輯

```typescript
const handleLogout = async () => {
  try {
    // 清除用戶資料
    await logout();

    // 清除 Local Storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // 顯示成功提示
    toast.success('已成功登出');

    // 導航至登入頁面
    navigate('/login');
  } catch (error) {
    toast.error('登出失敗，請稍後再試');
  }
};
```

---

## 📄 政策與條款頁面

### 服務條款（TermsOfServicePage）
**路徑**：`/terms-of-service`
**內容**：
- 服務範圍
- 用戶權利與義務
- 免責聲明
- 爭議解決

### 隱私政策（PrivacyPolicyPage）
**路徑**：`/privacy-policy`
**內容**：
- 資料收集範圍
- 資料使用方式
- 資料保護措施
- 用戶權利

### 版權政策（CopyrightPolicyPage）
**路徑**：`/copyright-policy`
**內容**：
- 內容版權聲明
- 使用限制
- 侵權處理流程
- 投訴管道

---

## ℹ️ 關於我們

### 應用資訊

```tsx
<Card>
  <CardContent className="p-6 text-center">
    {/* App Logo */}
    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#6BB6FF] flex items-center justify-center">
      <span className="text-4xl font-bold text-white">林</span>
    </div>

    {/* App 名稱 */}
    <h3 className="text-2xl font-bold mb-2">長線聚寶盆 Plus</h3>
    <p className="text-sm text-muted-foreground mb-4">
      專業選股 · 智慧投資
    </p>

    {/* 版本號 */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
      <span className="text-muted-foreground">版本</span>
      <span className="font-semibold">1.0.11</span>
    </div>

    {/* 開發資訊 */}
    <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
      <p>© 2026 CMoney Inc.</p>
      <p className="mt-1">台灣設計 · 專業開發</p>
    </div>
  </CardContent>
</Card>
```

---

## 📱 響應式設計

### 手機版（< 768px）
- 個人資料卡片：單欄顯示
- 選單列表：單欄顯示
- 頭像大小：64px

### 平板版（768px - 1024px）
- 個人資料卡片：單欄顯示
- 選單列表：單欄顯示
- 頭像大小：80px

### 桌面版（> 1024px）
- 個人資料卡片：單欄顯示，置中
- 選單列表：雙欄顯示（可選）
- 頭像大小：96px

---

## 🔐 權限控制

### 需要登入的頁面
- ✅ 編輯個人資料（`/edit-profile`）
- ✅ 通知設定（`/notification-settings`）
- ✅ 購買專業版（`/purchase`）
- ✅ 客服中心（`/customer-service`）

### 無需登入的頁面
- ✅ 幫助中心（`/help-center`）
- ✅ 服務條款（`/terms-of-service`）
- ✅ 隱私政策（`/privacy-policy`）
- ✅ 版權政策（`/copyright-policy`）

---

## 📝 注意事項

### 顏色使用
- 專業版徽章：金色漸層
- 試用版徽章：灰色
- 登出按鈕：紅色

### 導航行為
- 編輯資料：推入新頁面
- 購買專業版：根據審查模式決定
- 登出：返回登入頁面

### 數據存儲
- 用戶資料存儲在 Context
- Token 存儲在 Local Storage
- 設定存儲在 Local Storage

---

## 📚 相關文檔

- **整體概覽**：`00_APP_OVERVIEW.md`
- **首頁標籤**：`01_HOME_PAGE.md`
- **登入流程**：`07_AUTH_WELCOME_FLOW.md`
