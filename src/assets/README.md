# Assets 資源資料夾 - React Native 實作指南

## 📁 資料夾結構

```
/assets
├── index.ts                    # 資源索引檔案
├── README.md                   # 本文件
├── images/                     # 點陣圖資源
│   ├── avatar_default.png      # 預設頭像
│   ├── avatar_default@2x.png   # 2x 解析度
│   ├── avatar_default@3x.png   # 3x 解析度
│   ├── star_empty.png          # 空星星
│   ├── star_half.png           # 半星星
│   ├── star_full.png           # 滿星星
│   ├── launch_background.png   # 啟動背景
│   ├── launch_logo.png         # 啟動 Logo
│   ├── home_banner_1.png       # 首頁橫幅 1
│   ├── home_banner_2.png       # 首頁橫幅 2
│   ├── icon_lock.png           # 鎖頭圖示（金色）
│   ├── icon_vip.png            # VIP 圖示
│   └── icon_play.png           # 播放圖示
└── svg/                        # SVG 向量圖
    ├── StarFull.tsx            # 滿星星 SVG
    ├── StarHalf.tsx            # 半星星 SVG
    └── StarEmpty.tsx           # 空星星 SVG
```

## 🚀 RD 實作步驟

### 步驟 1: 準備圖片資源

#### 從 Figma 匯出圖片
1. 開啟 Figma 設計檔
2. 選取需要匯出的圖層
3. 在右側面板點選「Export」
4. 設定格式：
   - **點陣圖**：PNG (支援透明背景)
   - **向量圖**：SVG
5. 匯出 1x, 2x, 3x 三種解析度

#### 圖片命名規範
```
原始名稱.png          # 1x (mdpi)
原始名稱@2x.png      # 2x (xhdpi, xxhdpi)
原始名稱@3x.png      # 3x (xxxhdpi)
```

### 步驟 2: iOS 設定 (Swift/SwiftUI)

#### 2.1 將圖片加入 Assets.xcassets
```
Assets.xcassets/
├── avatar_default.imageset/
│   ├── Contents.json
│   ├── avatar_default.png      (1x)
│   ├── avatar_default@2x.png   (2x)
│   └── avatar_default@3x.png   (3x)
├── star_full.imageset/
│   ├── Contents.json
│   ├── star_full.png
│   ├── star_full@2x.png
│   └── star_full@3x.png
...
```

#### 2.2 在 Swift 中使用
```swift
import SwiftUI

// 使用圖片
Image("avatar_default")
    .resizable()
    .frame(width: 40, height: 40)
    .clipShape(Circle())

// 星星評分
Image("star_full")
    .resizable()
    .renderingMode(.template)
    .foregroundColor(Color(hex: "#D4AF37"))
    .frame(width: 20, height: 20)
```

### 步驟 3: Android 設定 (Kotlin/Compose)

#### 3.1 將圖片放入 drawable 資料夾
```
app/src/main/res/
├── drawable-mdpi/
│   ├── avatar_default.png      (1x)
│   ├── star_full.png
│   └── ...
├── drawable-xhdpi/
│   └── avatar_default.png      (1.5x)
├── drawable-xxhdpi/
│   └── avatar_default.png      (2x)
└── drawable-xxxhdpi/
    └── avatar_default.png      (3x)
```

#### 3.2 在 Kotlin Compose 中使用
```kotlin
import androidx.compose.foundation.Image
import androidx.compose.ui.res.painterResource

// 使用圖片
Image(
    painter = painterResource(R.drawable.avatar_default),
    contentDescription = "用戶頭像",
    modifier = Modifier
        .size(40.dp)
        .clip(CircleShape)
)

// 星星評分
Image(
    painter = painterResource(R.drawable.star_full),
    contentDescription = "星星",
    colorFilter = ColorFilter.tint(Color(0xFFD4AF37)),
    modifier = Modifier.size(20.dp)
)
```

### 步驟 4: React Native 設定

#### 4.1 建立 assets/images 資料夾
```bash
mkdir -p assets/images
```

#### 4.2 將圖片複製到資料夾
```
assets/images/
├── avatar_default.png
├── avatar_default@2x.png
├── avatar_default@3x.png
├── star_full.png
├── star_full@2x.png
├── star_full@3x.png
...
```

#### 4.3 在 TypeScript/React Native 中使用
```typescript
import { Image } from 'react-native';
import images from './assets';

// 使用圖片
<Image 
  source={images.avatarDefault} 
  style={{ width: 40, height: 40, borderRadius: 20 }}
/>

// 星星評分
<Image 
  source={images.starFull} 
  style={{ width: 20, height: 20, tintColor: '#D4AF37' }}
/>
```

## 📋 圖片資源清單

### 必要圖片（請從 Figma 匯出）

| 檔案名稱 | 尺寸 (1x) | 用途 | 備註 |
|---------|----------|------|------|
| `avatar_default.png` | 120×120 | 預設用戶頭像 | 圓形顯示 |
| `star_empty.png` | 48×48 | 空星星 | 金色外框 |
| `star_half.png` | 48×48 | 半星星 | 金色漸層 |
| `star_full.png` | 48×48 | 滿星星 | 金色漸層 |
| `launch_background.png` | 1242×2688 | 啟動背景 | iPhone 12 Pro Max 尺寸 |
| `launch_logo.png` | 400×400 | App Logo | 透明背景 |
| `home_banner_1.png` | 1200×400 | 首頁橫幅 1 | 16:9 比例 |
| `home_banner_2.png` | 1200×400 | 首頁橫幅 2 | 16:9 比例 |
| `icon_lock.png` | 64×64 | 鎖頭圖示 | 金色 #D4AF37 |
| `icon_vip.png` | 64×64 | VIP 圖示 | 金色 #D4AF37 |
| `icon_play.png` | 64×64 | 播放圖示 | 白色或藍色 |

### 星星圖示規格（重要！）

**恩如三部曲評分系統：**
- 顏色：金色 (#D4AF37)
- 評分範圍：0 - 2 顆星
- 支援：空星、半星、滿星
- 漸層方向：從亮金色到深金色

**星星設計參考：**
```
空星：外框 #D4AF37，內部透明
半星：左半邊填充金色漸層
滿星：完全填充金色漸層
```

## 🎨 SVG 圖示實作（推薦）

### 使用 react-native-svg

#### 安裝套件
```bash
npm install react-native-svg
# or
yarn add react-native-svg
```

#### StarFull.tsx (滿星星)
```typescript
import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function StarFull({ size = 24, color = '#D4AF37' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFD700" />
          <Stop offset="100%" stopColor="#D4AF37" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="url(#goldGradient)"
      />
    </Svg>
  );
}
```

#### StarHalf.tsx (半星星)
```typescript
import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg';

export default function StarHalf({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFD700" />
          <Stop offset="100%" stopColor="#D4AF37" />
        </LinearGradient>
        <ClipPath id="halfClip">
          <Rect x="0" y="0" width="12" height="24" />
        </ClipPath>
      </Defs>
      {/* 外框 */}
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1.5"
      />
      {/* 左半邊填充 */}
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="url(#goldGradient)"
        clipPath="url(#halfClip)"
      />
    </Svg>
  );
}
```

#### StarEmpty.tsx (空星星)
```typescript
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function StarEmpty({ size = 24, color = '#D4AF37' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
}
```

### 使用星星元件
```typescript
import StarFull from './assets/svg/StarFull';
import StarHalf from './assets/svg/StarHalf';
import StarEmpty from './assets/svg/StarEmpty';

// 顯示 1.5 顆星
<View style={{ flexDirection: 'row' }}>
  <StarFull size={24} />
  <StarHalf size={24} />
  <StarEmpty size={24} />
</View>
```

## 🔧 圖片最佳化建議

### 壓縮工具
- **線上工具**：[TinyPNG](https://tinypng.com/)
- **Mac App**：ImageOptim
- **命令列**：pngquant, optipng

### 壓縮目標
- 頭像：< 50KB
- 橫幅：< 200KB
- 圖示：< 20KB
- 背景：< 500KB

### 格式選擇
| 類型 | 推薦格式 | 原因 |
|------|---------|------|
| 照片 | JPG/JPEG | 檔案小 |
| 圖示 | PNG | 支援透明 |
| 向量圖 | SVG | 可縮放 |
| 動畫 | Lottie JSON | 檔案小、效能好 |

## 📱 實際使用範例

### 完整的星星評分元件
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarFull from './assets/svg/StarFull';
import StarHalf from './assets/svg/StarHalf';
import StarEmpty from './assets/svg/StarEmpty';

interface StarRatingProps {
  rating: number; // 0-2
  size?: number;
}

export function StarRating({ rating, size = 20 }: StarRatingProps) {
  const maxStars = 2;
  const stars = [];
  
  for (let i = 0; i < maxStars; i++) {
    if (rating >= i + 1) {
      stars.push(<StarFull key={i} size={size} />);
    } else if (rating >= i + 0.5) {
      stars.push(<StarHalf key={i} size={size} />);
    } else {
      stars.push(<StarEmpty key={i} size={size} />);
    }
  }
  
  return (
    <View style={styles.container}>
      {stars}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
  },
});

// 使用
<StarRating rating={1.5} size={24} />
```

### 用戶頭像元件
```typescript
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import images from './assets';

interface UserAvatarProps {
  uri?: string;
  size?: number;
}

export function UserAvatar({ uri, size = 40 }: UserAvatarProps) {
  return (
    <Image
      source={uri ? { uri } : images.avatarDefault}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#ABABAB',
  },
});

// 使用
<UserAvatar uri="https://example.com/avatar.jpg" size={40} />
<UserAvatar size={40} /> {/* 使用預設頭像 */}
```

## 🎯 設計規範對照

### 顏色規範
| 用途 | 顏色 | 備註 |
|------|------|------|
| 主色調 | #4A90E2 | 藍色 |
| 強調色 | #D4AF37 | 金色 |
| 上漲 | #FE6D73 | 紅色（台股規則） |
| 下跌 | #9CFFD9 | 綠色（台股規則） |
| 星星 | #D4AF37 | 金色漸層 |
| 鎖頭 | #D4AF37 | 金色 |

### 漸層使用規範
- ✅ **允許**：藍色到相近藍色的漸層
- ❌ **禁止**：黃藍漸層
- 星星：金色漸層（#FFD700 → #D4AF37）

## 📞 聯絡資訊

如有圖片資源相關問題，請聯絡：
- **設計師**：提供 Figma 匯出檔案
- **前端工程師**：協助整合圖片資源
- **專案經理**：確認圖片規格

## ⚠️ 注意事項

1. **版權問題**：確保所有圖片都有使用權
2. **檔案大小**：控制在合理範圍內
3. **解析度**：提供 1x, 2x, 3x 三種
4. **命名規範**：使用英文、小寫、底線分隔
5. **測試**：在不同裝置上測試顯示效果

## 🔗 相關文件
- [PRD 產品需求文檔](/docs/PRD.md)
- [導航流程圖](/docs/NAVIGATION_FLOW.md)
- [登入流程文檔](/docs/LOGIN_FLOW.md)

---

**最後更新：** 2026年3月3日  
**維護者：** 開發團隊
