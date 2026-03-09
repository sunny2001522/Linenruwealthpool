# 📄 內容標籤（ContentPage）完整文檔

## 📋 文檔更新日期
2026年3月9日

---

## 🎯 頁面概述

**內容頁**採用 **YouTube 風格設計**，提供多元化的學習內容，包含影音、講座、文章、Podcast 四大類型。

### 路由資訊
- **路徑**：`/home/content`
- **組件**：`ContentPage`
- **底部導覽圖標**：📄 FileText（內容）
- **是否需要登入**：是
- **有無底部導覽列**：有

---

## 📐 四大分頁架構

```
┌─────────────────────────────────────────────────┐
│              頂部：標題 + 搜尋                    │
│          「內容專區」       [ 🔍 ]              │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              四大分頁 Tabs                       │
│    【影音】 【講座】 【文章】 【Podcast】        │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              篩選器區域                          │
│    分類 / 排序 / 時間範圍 / VIP篩選             │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              內容卡片網格（YouTube風格）          │
│   ┌──────┐ ┌──────┐ ┌──────┐                  │
│   │ 卡片1│ │ 卡片2│ │ 卡片3│                  │
│   └──────┘ └──────┘ └──────┘                  │
└─────────────────────────────────────────────────┘
```

---

## 🎬 1️⃣ 影音分頁（Video）

### 卡片設計（YouTube 風格）

```tsx
<Card className="overflow-hidden hover:shadow-lg transition-shadow">
  {/* 縮圖區域（16:9） */}
  <div className="relative aspect-video bg-muted">
    <img 
      src={video.thumbnail} 
      alt={video.title}
      className="w-full h-full object-cover"
    />

    {/* VIP 標籤 */}
    {video.isVipOnly && (
      <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white text-xs font-bold">
        🔒 VIP
      </div>
    )}

    {/* 時長 */}
    <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-white text-xs">
      {formatDuration(video.duration)}
    </div>

    {/* 直播標籤 */}
    {video.isLive && (
      <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center gap-1">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        LIVE
      </div>
    )}
  </div>

  {/* 資訊區域 */}
  <CardContent className="p-4">
    <h3 className="font-semibold text-base line-clamp-2 mb-2">
      {video.title}
    </h3>

    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
      <span className="flex items-center gap-1">
        <Eye className="w-4 h-4" />
        {formatViewCount(video.viewCount)} 次觀看
      </span>
      <span>•</span>
      <span>{formatDistanceToNow(video.publishedAt, { locale: zhTW })}</span>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>{formatDuration(video.duration)}</span>
        <span>•</span>
        <span>{video.category}</span>
      </div>

      <button
        onClick={() => toggleFavorite(video.id)}
        className="p-1 rounded-lg hover:bg-muted transition-colors"
      >
        <Heart
          className={cn(
            "w-5 h-5",
            isFavorited(video.id)
              ? "fill-pink-500 text-pink-500"
              : "text-muted-foreground"
          )}
        />
      </button>
    </div>
  </CardContent>
</Card>
```

### VIP 鎖定效果（試用版）

```tsx
{!user?.isPro && video.isVipOnly && (
  <div className="relative">
    {/* 模糊背景 */}
    <div className="filter blur-md opacity-50">
      <img src={video.thumbnail} alt={video.title} />
    </div>

    {/* 鎖頭遮罩 */}
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="text-center space-y-3">
        {/* 金色鎖頭圖標 */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center">
          <Lock className="w-8 h-8 text-white" />
        </div>

        {/* 提示文字 */}
        <div className="text-white">
          <p className="text-lg font-bold">VIP 專屬內容</p>
          <p className="text-sm text-white/80">升級專業版即可觀看</p>
        </div>

        {/* 升級按鈕 */}
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white font-medium hover:shadow-lg transition-all">
          立即升級
        </button>
      </div>
    </div>
  </div>
)}
```

---

## 📅 2️⃣ 講座分頁（Webinar）

### 卡片設計

```tsx
<Card className="overflow-hidden hover:shadow-lg transition-shadow">
  {/* 講座海報（16:9） */}
  <div className="relative aspect-video bg-muted">
    <img 
      src={webinar.poster} 
      alt={webinar.title}
      className="w-full h-full object-cover"
    />

    {/* 日期時間標籤 */}
    <div className="absolute top-2 left-2 px-3 py-2 rounded-lg bg-black/80 text-white text-xs">
      <p className="font-semibold">{format(webinar.date, 'yyyy/MM/dd')}</p>
      <p>{format(webinar.date, 'EEEE HH:mm', { locale: zhTW })}</p>
    </div>

    {/* VIP 標籤 */}
    {webinar.isVipOnly && (
      <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white text-xs font-bold">
        🔒 VIP
      </div>
    )}
  </div>

  {/* 資訊區域 */}
  <CardContent className="p-4">
    {/* 講座狀態 */}
    <div className="flex items-center gap-2 mb-2">
      {webinar.status === 'upcoming' && (
        <Badge className="bg-blue-500">📅 即將開始</Badge>
      )}
      {webinar.status === 'live' && (
        <Badge className="bg-red-500">🔴 LIVE</Badge>
      )}
      {webinar.status === 'ended' && (
        <Badge className="bg-gray-500">🎥 已結束</Badge>
      )}
      {webinar.status === 'full' && (
        <Badge className="bg-red-500">⛔ 已額滿</Badge>
      )}
    </div>

    <h3 className="font-semibold text-base line-clamp-2 mb-2">
      {webinar.title}
    </h3>

    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
      <span className="flex items-center gap-1">
        <Users className="w-4 h-4" />
        已報名 {webinar.registeredCount} 人
      </span>
      {webinar.registrationLimit - webinar.registeredCount > 0 && (
        <>
          <span>•</span>
          <span>剩餘 {webinar.registrationLimit - webinar.registeredCount} 名額</span>
        </>
      )}
    </div>

    <div className="flex items-center justify-between">
      <Button
        onClick={() => handleRegisterWebinar(webinar.id)}
        disabled={webinar.status === 'full' || webinar.status === 'ended'}
        className="flex-1 mr-2"
      >
        {webinar.status === 'upcoming' ? '立即報名' : 
         webinar.status === 'live' ? '進入直播' :
         webinar.status === 'ended' ? '觀看回放' : '已額滿'}
      </Button>

      <button
        onClick={() => toggleFavorite(webinar.id)}
        className="p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <Heart
          className={cn(
            "w-5 h-5",
            isFavorited(webinar.id)
              ? "fill-pink-500 text-pink-500"
              : "text-muted-foreground"
          )}
        />
      </button>
    </div>
  </CardContent>
</Card>
```

---

## 📝 3️⃣ 文章分頁（Article）

### 卡片設計

```tsx
<Card className="overflow-hidden hover:shadow-lg transition-shadow">
  {/* 文章封面（16:9） */}
  <div className="relative aspect-video bg-muted">
    <img 
      src={article.coverImage} 
      alt={article.title}
      className="w-full h-full object-cover"
    />

    {/* 文章類型標籤 */}
    <div className="absolute top-2 left-2 px-3 py-1 rounded-lg bg-black/80 text-white text-xs font-semibold">
      📝 深度分析
    </div>

    {/* VIP 標籤 */}
    {article.isVipOnly && (
      <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white text-xs font-bold">
        🔒 VIP
      </div>
    )}
  </div>

  {/* 資訊區域 */}
  <CardContent className="p-4">
    <h3 className="font-semibold text-base line-clamp-2 mb-2">
      {article.title}
    </h3>

    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
      {article.excerpt}
    </p>

    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
      <span className="flex items-center gap-1">
        <Eye className="w-4 h-4" />
        {formatViewCount(article.viewCount)} 次閱讀
      </span>
      <span>•</span>
      <span>{formatDistanceToNow(article.publishedAt, { locale: zhTW })}</span>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {article.readingTime} 分鐘閱讀
        </span>
        <span>•</span>
        <span>{article.category}</span>
      </div>

      <button
        onClick={() => toggleFavorite(article.id)}
        className="p-1 rounded-lg hover:bg-muted transition-colors"
      >
        <Heart
          className={cn(
            "w-5 h-5",
            isFavorited(article.id)
              ? "fill-pink-500 text-pink-500"
              : "text-muted-foreground"
          )}
        />
      </button>
    </div>
  </CardContent>
</Card>
```

### VIP 文章鎖定效果（僅顯示前100字）

```tsx
{!user?.isPro && article.isVipOnly && (
  <div className="relative">
    {/* 可見部分（前100字） */}
    <div className="mb-4">
      <p className="text-base leading-relaxed">
        {article.content.substring(0, 100)}...
      </p>
    </div>

    {/* 模糊漸層遮罩 */}
    <div className="relative">
      <div className="filter blur-sm select-none pointer-events-none">
        <p className="text-base leading-relaxed text-muted-foreground">
          {article.content.substring(100, 300)}...
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>

    {/* 解鎖提示 */}
    <div className="mt-6 p-6 rounded-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/10 to-transparent text-center">
      <Lock className="w-10 h-10 mx-auto mb-3 text-[#D4AF37]" />
      <p className="text-lg font-bold mb-2">完整內容需要專業版會員</p>
      <p className="text-sm text-muted-foreground mb-4">
        升級後即可解鎖所有 VIP 專屬文章
      </p>
      <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white font-medium hover:shadow-lg transition-all">
        立即升級專業版
      </button>
    </div>
  </div>
)}
```

---

## 🎙️ 4️⃣ Podcast 分頁（Podcast）

### 卡片設計

```tsx
<Card className="overflow-hidden hover:shadow-lg transition-shadow">
  {/* 節目封面（正方形 1:1） */}
  <div className="relative aspect-square bg-muted">
    <img 
      src={podcast.coverArt} 
      alt={podcast.title}
      className="w-full h-full object-cover"
    />

    {/* 播放圖標 */}
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
      <button className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
        <Play className="w-8 h-8 text-black ml-1" />
      </button>
    </div>

    {/* VIP 標籤 */}
    {podcast.isVipOnly && (
      <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white text-xs font-bold">
        🔒 VIP
      </div>
    )}
  </div>

  {/* 資訊區域 */}
  <CardContent className="p-4">
    <p className="text-xs text-muted-foreground mb-1">
      🎙️ EP.{podcast.episodeNumber}
    </p>

    <h3 className="font-semibold text-base line-clamp-2 mb-2">
      {podcast.title}
    </h3>

    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
      {podcast.description}
    </p>

    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
      <span className="flex items-center gap-1">
        <Headphones className="w-4 h-4" />
        {formatViewCount(podcast.listenCount)} 次收聽
      </span>
      <span>•</span>
      <span>{formatDistanceToNow(podcast.publishedAt, { locale: zhTW })}</span>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {formatDuration(podcast.duration)}
        </span>
        <span>•</span>
        <span>{podcast.category}</span>
      </div>

      <button
        onClick={() => toggleFavorite(podcast.id)}
        className="p-1 rounded-lg hover:bg-muted transition-colors"
      >
        <Heart
          className={cn(
            "w-5 h-5",
            isFavorited(podcast.id)
              ? "fill-pink-500 text-pink-500"
              : "text-muted-foreground"
          )}
        />
      </button>
    </div>
  </CardContent>
</Card>
```

---

## 🔍 篩選器系統

### 通用篩選器

```tsx
<div className="flex flex-wrap gap-3 mb-6">
  {/* 分類篩選 */}
  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="全部分類" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">全部分類</SelectItem>
      <SelectItem value="market">市場分析</SelectItem>
      <SelectItem value="stock">選股技巧</SelectItem>
      <SelectItem value="strategy">投資策略</SelectItem>
    </SelectContent>
  </Select>

  {/* 排序篩選 */}
  <Select value={sortBy} onValueChange={setSortBy}>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="最新發布" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="latest">最新發布</SelectItem>
      <SelectItem value="most-viewed">最多觀看</SelectItem>
      <SelectItem value="most-favorited">最多收藏</SelectItem>
      <SelectItem value="highest-rated">最高評分</SelectItem>
    </SelectContent>
  </Select>

  {/* 時間範圍篩選 */}
  <Select value={timeRange} onValueChange={setTimeRange}>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="全部時間" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">全部時間</SelectItem>
      <SelectItem value="today">今天</SelectItem>
      <SelectItem value="this-week">本週</SelectItem>
      <SelectItem value="this-month">本月</SelectItem>
    </SelectContent>
  </Select>

  {/* VIP 篩選 */}
  <div className="flex gap-2">
    <button
      onClick={() => setVipOnly(false)}
      className={cn(
        "px-4 py-2 rounded-full transition-all",
        !vipOnly
          ? "bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white"
          : "bg-muted text-muted-foreground"
      )}
    >
      🔓 全部內容
    </button>
    <button
      onClick={() => setVipOnly(true)}
      className={cn(
        "px-4 py-2 rounded-full transition-all",
        vipOnly
          ? "bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white"
          : "bg-muted text-muted-foreground"
      )}
    >
      🔒 僅 VIP 內容
    </button>
  </div>

  {/* 收藏篩選 */}
  <button
    onClick={() => setFavoritesOnly(!favoritesOnly)}
    className={cn(
      "px-4 py-2 rounded-full transition-all",
      favoritesOnly
        ? "bg-pink-500 text-white"
        : "border border-border text-muted-foreground"
    )}
  >
    {favoritesOnly ? "❤️" : "🤍"} 僅顯示收藏
  </button>
</div>
```

---

## 🔐 VIP 權限控制

### 專業版 vs 試用版

| 功能 | 專業版 | 試用版 |
|------|--------|--------|
| **免費內容** | ✅ 完整觀看 | ✅ 完整觀看 |
| **VIP 影音** | ✅ 完整觀看 | ⚠️ 鎖定+模糊 |
| **VIP 講座** | ✅ 可報名參加 | ⚠️ 無法報名 |
| **VIP 文章** | ✅ 完整閱讀 | ⚠️ 僅前100字 |
| **VIP Podcast** | ✅ 完整收聽 | ⚠️ 無法播放 |
| **下載功能** | ✅ 可下載 | ❌ 不可用 |
| **逐字稿** | ✅ 可查看 | ❌ 不可用 |

---

## 📚 相關文檔

- **內容邏輯詳細文檔**：`/CONTENT_PAGE_LOGIC.md`
- **整體概覽**：`00_APP_OVERVIEW.md`
- **社團標籤**：`04_DISCUSSION_PAGE.md`
