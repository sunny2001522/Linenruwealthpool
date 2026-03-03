# React Native/SwiftUI/Kotlin 轉換指南

## 概述

本文檔提供將 React Web 代碼轉換為原生平台（React Native、SwiftUI、Kotlin/Jetpack Compose）的詳細指南。

---

## 核心轉換規則

### 佈局轉換

#### 1. 寬度與彈性佈局

**React/Tailwind:**
```jsx
<div className="w-full">...</div>
<div className="flex-1">...</div>
```

**SwiftUI:**
```swift
.frame(maxWidth: .infinity)
Spacer() // 用於 HStack/VStack 中的彈性佈局
```

**Kotlin/Jetpack Compose:**
```kotlin
modifier = Modifier.fillMaxWidth()
// 或
android:layout_width="match_parent"
weight = 1f // 用於 LinearLayout
```

#### 2. Justify Between 佈局

**React/Tailwind:**
```jsx
<div className="flex justify-between">
  <span>左側</span>
  <span>右側</span>
</div>
```

**SwiftUI:**
```swift
HStack(spacing: 0) {
    Text("左側")
    Spacer()
    Text("右側")
}.frame(maxWidth: .infinity)
```

**Kotlin/Jetpack Compose:**
```kotlin
Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween
) {
    Text("左側")
    Text("右側")
}
```

---

## UI 元件轉換

### 按鈕尺寸

**建議:** 明確指定尺寸（如 40x40），避免自適應造成的跨平台差異

**React:**
```jsx
<button className="w-10 h-10">...</button>
```

**SwiftUI:**
```swift
Button(action: {}) {
    Image(systemName: "arrow.left")
}
.frame(width: 40, height: 40)
```

**Kotlin:**
```kotlin
IconButton(
    onClick = {},
    modifier = Modifier.size(40.dp)
) { ... }
```

---

## 效能最佳化建議

### 1. 避免複雜漸層

**不建議:**
```jsx
<div className="bg-gradient-to-br from-[#2A1F1A] via-[#1C1410] to-black">
```

**建議:** 使用純色背景，原生平台效能更好
```jsx
<div className="bg-background">
```

**SwiftUI:**
```swift
.background(Color("background"))
```

**Kotlin:**
```kotlin
backgroundColor = Color(0xFF1C1410)
```

### 2. 移除 backdrop-blur

原生平台的模糊效果效能較差，建議使用純色或半透明背景替代。

**不建議:**
```jsx
<div className="backdrop-blur-xl">
```

**建議:**
```jsx
<div className="bg-card/80">
```

### 3. 固定間距

使用固定間距（如 16px）而非響應式間距（如 space-y-6）

**React:**
```jsx
<div className="space-y-4"> // 固定 16px
```

**SwiftUI:**
```swift
VStack(spacing: 16) { ... }
```

**Kotlin:**
```kotlin
Column(verticalArrangement = Arrangement.spacedBy(16.dp)) { ... }
```

---

## 元件對應表

### 基礎元件

| React/HTML | SwiftUI | Kotlin/Compose |
|-----------|---------|----------------|
| `<div>` | `VStack` / `HStack` / `ZStack` | `Column` / `Row` / `Box` |
| `<button>` | `Button` | `Button` / `IconButton` |
| `<img>` | `Image` | `Image` |
| `<input>` | `TextField` | `TextField` / `OutlinedTextField` |
| `<span>` | `Text` | `Text` |

### 佈局元件

| React/Tailwind | SwiftUI | Kotlin/Compose |
|---------------|---------|----------------|
| `flex` | `HStack` / `VStack` | `Row` / `Column` |
| `grid` | `LazyVGrid` | `LazyVerticalGrid` |
| `absolute` | `ZStack` + `position` | `Box` + `align` |
| `sticky` | - (需自行實現) | `LazyColumn` with sticky header |

---

## SwiftUI 完整範例

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 16) {
            // 標題
            Text("幫助中心")
                .font(.system(size: 18, weight: .bold))
                .frame(maxWidth: .infinity, alignment: .leading)
            
            // 卡片列表
            ForEach(items) { item in
                HStack(spacing: 12) {
                    Image(systemName: item.icon)
                        .frame(width: 40, height: 40)
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(12)
                    
                    VStack(alignment: .leading, spacing: 4) {
                        Text(item.title)
                            .font(.system(size: 14, weight: .medium))
                        Text(item.subtitle)
                            .font(.system(size: 12))
                            .foregroundColor(.secondary)
                    }
                    
                    Spacer()
                    
                    Image(systemName: "chevron.right")
                        .foregroundColor(.secondary)
                }
                .padding()
                .background(Color(.systemBackground))
                .cornerRadius(16)
            }
        }
        .padding()
    }
}
```

---

## Kotlin/Jetpack Compose 完整範例

```kotlin
@Composable
fun HelpCenterScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 標題
        Text(
            text = "幫助中心",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.fillMaxWidth()
        )
        
        // 卡片列表
        items.forEach { item ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(12.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .background(
                                    color = Color.Blue.copy(alpha = 0.1f),
                                    shape = RoundedCornerShape(12.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = item.icon,
                                contentDescription = null
                            )
                        }
                        
                        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(
                                text = item.title,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Medium
                            )
                            Text(
                                text = item.subtitle,
                                fontSize = 12.sp,
                                color = Color.Gray
                            )
                        }
                    }
                    
                    Icon(
                        imageVector = Icons.Default.ChevronRight,
                        contentDescription = null,
                        tint = Color.Gray
                    )
                }
            }
        }
    }
}
```

---

## React Native 特殊注意事項

### 1. ScrollView 使用

```jsx
import { ScrollView } from 'react-native';

<ScrollView 
  style={styles.container}
  contentContainerStyle={styles.contentContainer}
>
  {/* 內容 */}
</ScrollView>
```

### 2. 圖片處理

```jsx
import { Image } from 'react-native';

<Image 
  source={require('./assets/logo.png')}
  style={{ width: 120, height: 120 }}
  resizeMode="contain"
/>
```

### 3. 漸層背景

需要安裝 `expo-linear-gradient` 或 `react-native-linear-gradient`

```jsx
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={['#2A1F1A', '#1C1410', '#000000']}
  style={styles.background}
>
  {/* 內容 */}
</LinearGradient>
```

---

## 常見問題

### Q: 如何處理 Tailwind 的響應式類別？

**A:** 在原生平台中，建議使用平台的佈局系統：
- SwiftUI: 使用 `@Environment(\.horizontalSizeClass)` 檢測設備尺寸
- Kotlin: 使用 `Configuration` 或 `WindowSizeClass`

### Q: 如何處理 z-index 層級？

**A:** 
- SwiftUI: 使用 `ZStack` 和 `.zIndex()` modifier
- Kotlin: 使用 `Box` 和 `Modifier.zIndex()`

### Q: 如何處理陰影效果？

**A:**
- SwiftUI: `.shadow(color:, radius:, x:, y:)`
- Kotlin: `Modifier.shadow(elevation = 10.dp)`

---

## 檢查清單

轉換代碼前，請確認：

- [ ] 所有寬度使用 `fillMaxWidth` / `maxWidth: .infinity`
- [ ] 移除複雜漸層，使用純色
- [ ] 移除 `backdrop-blur` 效果
- [ ] 使用固定間距（16dp/12dp/8dp）
- [ ] 按鈕和圖標有明確尺寸
- [ ] 避免過深的元件嵌套（建議 < 5 層）
- [ ] 使用原生導航組件（NavigationView/NavHost）
- [ ] 圖片使用本地資源而非網路 URL（首屏渲染）

---

## 效能優化建議

1. **懶加載列表**: 使用 `LazyColumn`/`LazyVStack` 而非 `ScrollView`
2. **圖片快取**: 使用 Kingfisher (iOS) 或 Coil (Android)
3. **減少重繪**: 使用 `remember` (Compose) 或 `@State` (SwiftUI)
4. **避免過度動畫**: 原生平台動畫效能較敏感
5. **分離業務邏輯**: 使用 ViewModel/ObservableObject

---

## 參考資源

- [SwiftUI 官方文檔](https://developer.apple.com/documentation/swiftui)
- [Jetpack Compose 官方文檔](https://developer.android.com/jetpack/compose)
- [React Native 官方文檔](https://reactnative.dev/)
