# 💬 社團標籤（DiscussionPage）完整文檔

## 📋 文檔更新日期
2026年3月9日

---

## 🎯 頁面概述

**社團頁**是VIP會員的討論互動平台，提供發文、回文、表情反應、檢舉等社群功能。

### 路由資訊
- **路徑**：`/home/discussion`
- **組件**：`DiscussionPage`
- **底部導覽圖標**：💬 MessageCircle（社團）
- **是否需要登入**：是
- **有無底部導覽列**：有

---

## 📐 頁面結構

```
┌─────────────────────────────────────────────────┐
│              頂部：社團名稱 + 發文按鈕            │
│          「VIP 社團」      [ + 發表貼文 ]        │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              貼文列表（時間軸）                   │
│   ┌───────────────────────────────────────┐    │
│   │ 👤 林恩如                3小時前       │    │
│   │ 今天大盤站上18000點，多方趨勢確立...   │    │
│   │ [圖片]                                │    │
│   │ ❤️ 125  👍 85  💪 42  🔥 38  🎉 22   │    │
│   │ 💬 38則回覆                            │    │
│   └───────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

---

## 💬 發文功能

### 發文按鈕

```tsx
<button
  onClick={() => setShowCreatePostModal(true)}
  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
>
  <Plus className="w-5 h-5" />
  發表貼文
</button>
```

### 發文彈窗（CreatePostModal）

```tsx
<Dialog open={showCreatePostModal} onOpenChange={setShowCreatePostModal}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>發表貼文</DialogTitle>
    </DialogHeader>

    {/* 貼文內容 */}
    <Textarea
      placeholder="分享你的想法..."
      value={postContent}
      onChange={(e) => setPostContent(e.target.value)}
      className="min-h-[200px]"
    />

    {/* 上傳圖片 */}
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-lg hover:bg-muted">
        <Image className="w-5 h-5" />
        <input type="file" accept="image/*" className="hidden" />
      </button>
      <p className="text-sm text-muted-foreground">最多上傳 4 張圖片</p>
    </div>

    {/* 標籤選擇 */}
    <div className="flex items-center gap-2">
      <Tag className="w-5 h-5 text-muted-foreground" />
      <Select value={selectedTag} onValueChange={setSelectedTag}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="選擇標籤" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="market">市場分析</SelectItem>
          <SelectItem value="stock">個股討論</SelectItem>
          <SelectItem value="strategy">策略分享</SelectItem>
          <SelectItem value="news">新聞快訊</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* 發文按鈕 */}
    <DialogFooter>
      <Button variant="outline" onClick={() => setShowCreatePostModal(false)}>
        取消
      </Button>
      <Button
        onClick={handleCreatePost}
        disabled={!postContent.trim()}
        className="bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF]"
      >
        發表
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 📝 貼文卡片設計

```tsx
<Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 mb-4">
  {/* 作者資訊 */}
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={post.author.avatar} />
        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{post.author.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(post.createdAt, { locale: zhTW, addSuffix: true })}
        </p>
      </div>
    </div>

    {/* 更多選單 */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-muted">
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user?.id === post.author.id && (
          <>
            <DropdownMenuItem onClick={() => handleEditPost(post)}>
              <Edit className="w-4 h-4 mr-2" />
              編輯貼文
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleDeletePost(post.id)}
              className="text-red-500"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              刪除貼文
            </DropdownMenuItem>
          </>
        )}
        {user?.id !== post.author.id && (
          <DropdownMenuItem onClick={() => handleReportPost(post)}>
            <Flag className="w-4 h-4 mr-2" />
            檢舉貼文
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  {/* 貼文內容 */}
  <p className="text-base leading-relaxed mb-3">
    {post.content}
  </p>

  {/* 圖片輪播（如有） */}
  {post.images && post.images.length > 0 && (
    <div className="mb-3 rounded-lg overflow-hidden">
      <Carousel>
        {post.images.map((img, i) => (
          <img key={i} src={img} alt="" className="w-full h-auto" />
        ))}
      </Carousel>
    </div>
  )}

  {/* 表情反應列 */}
  <div className="flex items-center gap-4 py-3 border-t border-border">
    <button 
      onClick={() => toggleReaction(post.id, 'love')}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
        post.userReaction === 'love' 
          ? "bg-pink-500/20 text-pink-500" 
          : "hover:bg-muted"
      )}
    >
      <Heart className="w-4 h-4" />
      <span className="text-sm font-medium">{post.reactions.love}</span>
    </button>

    <button 
      onClick={() => toggleReaction(post.id, 'like')}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
        post.userReaction === 'like' 
          ? "bg-blue-500/20 text-blue-500" 
          : "hover:bg-muted"
      )}
    >
      <ThumbsUp className="w-4 h-4" />
      <span className="text-sm font-medium">{post.reactions.like}</span>
    </button>

    <button 
      onClick={() => toggleReaction(post.id, 'strong')}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
        post.userReaction === 'strong' 
          ? "bg-purple-500/20 text-purple-500" 
          : "hover:bg-muted"
      )}
    >
      <Zap className="w-4 h-4" />
      <span className="text-sm font-medium">{post.reactions.strong}</span>
    </button>

    <button 
      onClick={() => toggleReaction(post.id, 'fire')}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
        post.userReaction === 'fire' 
          ? "bg-orange-500/20 text-orange-500" 
          : "hover:bg-muted"
      )}
    >
      <Flame className="w-4 h-4" />
      <span className="text-sm font-medium">{post.reactions.fire}</span>
    </button>

    <button 
      onClick={() => toggleReaction(post.id, 'party')}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
        post.userReaction === 'party' 
          ? "bg-yellow-500/20 text-yellow-500" 
          : "hover:bg-muted"
      )}
    >
      <PartyPopper className="w-4 h-4" />
      <span className="text-sm font-medium">{post.reactions.party}</span>
    </button>
  </div>

  {/* 回覆區 */}
  <div className="pt-3 border-t border-border">
    <button
      onClick={() => navigate(`/post/${post.id}`)}
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <MessageCircle className="w-4 h-4" />
      <span>{post.replyCount} 則回覆</span>
    </button>
  </div>
</Card>
```

---

## ❤️ 表情反應系統

### 支援的表情類型

| 表情 | 圖標 | 值 | 顏色 | 說明 |
|------|------|-----|------|------|
| ❤️ | Heart | `love` | 粉紅色 | 愛心 |
| 👍 | ThumbsUp | `like` | 藍色 | 讚 |
| 💪 | Zap | `strong` | 紫色 | 強 |
| 🔥 | Flame | `fire` | 橘色 | 火 |
| 🎉 | PartyPopper | `party` | 黃色 | 慶祝 |

### 反應邏輯

```typescript
const toggleReaction = async (postId: string, type: ReactionType) => {
  // 如果已經是該反應，則取消
  if (post.userReaction === type) {
    await removeReaction(postId);
    setPost(prev => ({
      ...prev,
      userReaction: null,
      reactions: {
        ...prev.reactions,
        [type]: prev.reactions[type] - 1
      }
    }));
  } else {
    // 如果是其他反應，先取消原反應，再加入新反應
    if (post.userReaction) {
      await updateReaction(postId, type);
      setPost(prev => ({
        ...prev,
        userReaction: type,
        reactions: {
          ...prev.reactions,
          [prev.userReaction!]: prev.reactions[prev.userReaction!] - 1,
          [type]: prev.reactions[type] + 1
        }
      }));
    } else {
      // 第一次反應
      await addReaction(postId, type);
      setPost(prev => ({
        ...prev,
        userReaction: type,
        reactions: {
          ...prev.reactions,
          [type]: prev.reactions[type] + 1
        }
      }));
    }
  }
};
```

---

## 🔐 VIP 權限控制

### 專業版 vs 試用版

| 功能 | 專業版 | 試用版 |
|------|--------|--------|
| **發文** | ✅ 無限制 | ⚠️ 每日 3 則 |
| **回文** | ✅ 無限制 | ✅ 無限制 |
| **表情反應** | ✅ 完整功能 | ✅ 完整功能 |
| **上傳圖片** | ✅ 每則最多 4 張 | ⚠️ 每則最多 1 張 |
| **編輯歷史** | ✅ 可查看 | ✅ 可查看 |
| **檢舉功能** | ✅ 完整功能 | ✅ 完整功能 |

### 試用版限制提示

```tsx
{!user?.isPro && dailyPostCount >= 3 && (
  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
    <div className="flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-semibold text-yellow-500 mb-1">今日發文已達上限</p>
        <p className="text-sm text-muted-foreground mb-3">
          試用版每日最多發表 3 則貼文，升級專業版即可無限制發文。
        </p>
        <button
          onClick={() => navigate('/purchase')}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#4A90E2] to-[#D4AF37] text-white font-medium hover:shadow-lg transition-all text-sm"
        >
          立即升級
        </button>
      </div>
    </div>
  </div>
)}
```

---

## 🚩 檢舉功能

### 檢舉理由選項

| 理由 | 說明 |
|------|------|
| **不當內容** | 包含色情、暴力等不當內容 |
| **垃圾訊息** | 廣告、詐騙等垃圾訊息 |
| **騷擾攻擊** | 人身攻擊、騷擾他人 |
| **虛假資訊** | 散播不實資訊或謠言 |
| **侵犯版權** | 侵犯他人版權或智慧財產權 |
| **其他** | 其他違規行為 |

### 檢舉彈窗（ReportModal）

```tsx
<Dialog open={showReportModal} onOpenChange={setShowReportModal}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>檢舉貼文</DialogTitle>
      <DialogDescription>
        請選擇檢舉理由，我們會盡快處理。
      </DialogDescription>
    </DialogHeader>

    <RadioGroup value={reportReason} onValueChange={setReportReason}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="inappropriate" id="inappropriate" />
        <Label htmlFor="inappropriate">不當內容</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="spam" id="spam" />
        <Label htmlFor="spam">垃圾訊息</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="harassment" id="harassment" />
        <Label htmlFor="harassment">騷擾攻擊</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="false-info" id="false-info" />
        <Label htmlFor="false-info">虛假資訊</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="copyright" id="copyright" />
        <Label htmlFor="copyright">侵犯版權</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="other" id="other" />
        <Label htmlFor="other">其他</Label>
      </div>
    </RadioGroup>

    <Textarea
      placeholder="請詳細說明檢舉原因..."
      value={reportDetail}
      onChange={(e) => setReportDetail(e.target.value)}
      className="min-h-[100px]"
    />

    <DialogFooter>
      <Button variant="outline" onClick={() => setShowReportModal(false)}>
        取消
      </Button>
      <Button
        onClick={handleSubmitReport}
        disabled={!reportReason}
        className="bg-red-500 hover:bg-red-600"
      >
        提交檢舉
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 📚 相關文檔

- **整體概覽**：`00_APP_OVERVIEW.md`
- **首頁標籤**：`01_HOME_PAGE.md`
- **內容標籤**：`05_CONTENT_PAGE.md`
