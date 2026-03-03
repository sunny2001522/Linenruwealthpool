/**
 * 開場介紹頁面 - React Native 版本
 * 
 * 功能說明：
 * 1. App 首次啟動時顯示的歡迎頁面
 * 2. 提供登入按鈕和訪客快速體驗選項
 * 3. 點擊登入會開啟 CM 統登頁面
 * 4. 登入成功後導向首頁或新手教學頁
 * 
 * 設計規範：
 * - 主色調：藍色 #4A90E2
 * - 強調色：金色 #D4AF37
 * - 背景漸層：深藍到藍色（不使用黃藍漸層）
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// ===== 常數定義 =====
const COLORS = {
  primary: '#4A90E2',      // 主色調（藍色）
  primaryDark: '#2E5C8A',  // 深藍色（漸層用）
  accent: '#D4AF37',       // 強調色（金色）
  white: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  background: '#F5F7FA',
};

const { width, height } = Dimensions.get('window');

// ===== 型別定義 =====
interface WelcomePageProps {
  onLogin?: () => void;
  onGuestMode?: () => void;
}

// ===== 主要元件 =====
const WelcomePageRN: React.FC<WelcomePageProps> = ({ onLogin, onGuestMode }) => {
  
  // ===== 事件處理 =====
  const handleLogin = () => {
    console.log('開啟 CM 統登頁面');
    // 實際實作會呼叫原生模組開啟 CM 統登頁面
    // NativeModules.CMAuth.openLoginPage()
    if (onLogin) {
      onLogin();
    }
  };

  const handleGuestMode = () => {
    console.log('進入訪客快速體驗模式');
    // 導向首頁，但標記為訪客模式
    if (onGuestMode) {
      onGuestMode();
    }
  };

  // ===== 畫面渲染 =====
  return (
    <SafeAreaView style={styles.container}>
      {/* SwiftUI: 使用 ZStack + LinearGradient 實現背景漸層 */}
      {/* Kotlin: 使用 Box + Brush.verticalGradient 實現背景漸層 */}
      <LinearGradient
        colors={[COLORS.primaryDark, COLORS.primary]}
        style={styles.gradientBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />
        
        {/* 內容區域 */}
        <View style={styles.content}>
          
          {/* Logo 和標題區域 */}
          {/* SwiftUI: VStack(spacing: 16) */}
          {/* Kotlin: Column(verticalArrangement = Arrangement.spacedBy(16.dp)) */}
          <View style={styles.headerSection}>
            {/* App Logo 佔位 */}
            {/* SwiftUI: Image("app_logo").resizable().frame(width: 120, height: 120) */}
            {/* Kotlin: Image(painterResource(R.drawable.app_logo), modifier = Modifier.size(120.dp)) */}
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>恩如</Text>
              <Text style={styles.logoSubtext}>三部曲</Text>
            </View>

            {/* 主標題 */}
            {/* SwiftUI: Text("林恩如長線聚寶盆").font(.system(size: 28, weight: .bold)) */}
            {/* Kotlin: Text("林恩如長線聚寶盆", fontSize = 28.sp, fontWeight = FontWeight.Bold) */}
            <Text style={styles.title}>林恩如長線聚寶盆</Text>

            {/* 副標題 */}
            {/* SwiftUI: Text("專業選股 · 智慧投資").font(.system(size: 16)) */}
            {/* Kotlin: Text("專業選股 · 智慧投資", fontSize = 16.sp) */}
            <Text style={styles.subtitle}>專業選股 · 智慧投資</Text>

            {/* 功能亮點 */}
            {/* SwiftUI: VStack(alignment: .leading, spacing: 12) */}
            {/* Kotlin: Column(horizontalAlignment = Alignment.Start, verticalArrangement = Arrangement.spacedBy(12.dp)) */}
            <View style={styles.featuresContainer}>
              <FeatureItem icon="✓" text="恩如三部曲評分系統" />
              <FeatureItem icon="✓" text="多方/空方篩選功能" />
              <FeatureItem icon="✓" text="即時社團討論互動" />
              <FeatureItem icon="✓" text="專業影音內容學習" />
            </View>
          </View>

          {/* 按鈕區域 */}
          {/* SwiftUI: VStack(spacing: 16) */}
          {/* Kotlin: Column(verticalArrangement = Arrangement.spacedBy(16.dp)) */}
          <View style={styles.buttonSection}>
            
            {/* 登入按鈕 */}
            {/* SwiftUI: Button(action: handleLogin) { ... }.buttonStyle(.borderedProminent) */}
            {/* Kotlin: Button(onClick = handleLogin, colors = ButtonDefaults.buttonColors(...)) */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[COLORS.accent, '#C49B2E']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginButtonText}>立即登入</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* 訪客快速體驗按鈕 */}
            {/* SwiftUI: Button(action: handleGuestMode) { ... }.buttonStyle(.bordered) */}
            {/* Kotlin: OutlinedButton(onClick = handleGuestMode) */}
            <TouchableOpacity
              style={styles.guestButton}
              onPress={handleGuestMode}
              activeOpacity={0.8}
            >
              <Text style={styles.guestButtonText}>訪客快速體驗</Text>
            </TouchableOpacity>

            {/* 提示文字 */}
            {/* SwiftUI: Text("登入後可使用完整功能").font(.system(size: 14)) */}
            {/* Kotlin: Text("登入後可使用完整功能", fontSize = 14.sp) */}
            <Text style={styles.hintText}>登入後可使用完整功能</Text>
          </View>
        </View>

        {/* 版本資訊 */}
        {/* SwiftUI: Text("Version 1.0.0").font(.system(size: 12)) */}
        {/* Kotlin: Text("Version 1.0.0", fontSize = 12.sp) */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

// ===== 子元件：功能亮點項目 =====
interface FeatureItemProps {
  icon: string;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  // SwiftUI: HStack(spacing: 8)
  // Kotlin: Row(horizontalArrangement = Arrangement.spacedBy(8.dp))
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

// ===== 樣式定義 =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  // SwiftUI: .background(LinearGradient(...))
  // Kotlin: Modifier.background(Brush.verticalGradient(...))
  gradientBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: height * 0.1,
    paddingBottom: 40,
  },
  // SwiftUI: VStack(spacing: 16)
  // Kotlin: Column(verticalArrangement = Arrangement.spacedBy(16.dp))
  headerSection: {
    alignItems: 'center',
  },
  // SwiftUI: RoundedRectangle(cornerRadius: 20)
  // Kotlin: Box(modifier = Modifier.clip(RoundedCornerShape(20.dp)))
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    // SwiftUI: .shadow(color: .black.opacity(0.1), radius: 10)
    // Kotlin: Modifier.shadow(elevation = 10.dp)
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  // SwiftUI: Text("恩如").font(.system(size: 32, weight: .bold))
  // Kotlin: Text("恩如", fontSize = 32.sp, fontWeight = FontWeight.Bold)
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  logoSubtext: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.accent,
  },
  // SwiftUI: .font(.system(size: 28, weight: .bold))
  // Kotlin: fontSize = 28.sp, fontWeight = FontWeight.Bold
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
  },
  // SwiftUI: VStack(alignment: .leading, spacing: 12)
  // Kotlin: Column(horizontalAlignment = Alignment.Start)
  featuresContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  // SwiftUI: HStack(spacing: 8)
  // Kotlin: Row(horizontalArrangement = Arrangement.spacedBy(8.dp))
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 16,
    color: COLORS.accent,
    marginRight: 8,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 15,
    color: COLORS.white,
  },
  buttonSection: {
    width: '100%',
  },
  // SwiftUI: Button(...).buttonStyle(.borderedProminent)
  // Kotlin: Button(colors = ButtonDefaults.buttonColors(...))
  loginButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 16,
    // SwiftUI: .shadow(color: accent.opacity(0.3), radius: 10)
    // Kotlin: Modifier.shadow(elevation = 10.dp)
    ...Platform.select({
      ios: {
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  // SwiftUI: Button(...).buttonStyle(.bordered)
  // Kotlin: OutlinedButton(...)
  guestButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  guestButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  hintText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  footer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default WelcomePageRN;

/**
 * ===== 原生實作指南 =====
 * 
 * === SwiftUI 實作 ===
 * 
 * 1. 背景漸層：
 *    LinearGradient(colors: [Color(hex: "#2E5C8A"), Color(hex: "#4A90E2")],
 *                   startPoint: .top, endPoint: .bottom)
 * 
 * 2. 登入按鈕漸層：
 *    Button(action: handleLogin) {
 *        Text("立即登入")
 *            .font(.system(size: 18, weight: .bold))
 *            .foregroundColor(.white)
 *            .frame(maxWidth: .infinity)
 *            .frame(height: 56)
 *            .background(
 *                LinearGradient(colors: [Color(hex: "#D4AF37"), Color(hex: "#C49B2E")],
 *                              startPoint: .leading, endPoint: .trailing)
 *            )
 *            .cornerRadius(28)
 *    }
 * 
 * 3. CM 統登整合：
 *    @ObservedObject var authManager: CMAuthManager
 *    
 *    func handleLogin() {
 *        authManager.openCMLoginPage { result in
 *            switch result {
 *            case .success(let user):
 *                checkVIPStatus(user: user)
 *                navigateToHome(isFirstTime: user.isFirstLogin)
 *            case .failure(let error):
 *                showError(error)
 *            }
 *        }
 *    }
 * 
 * === Kotlin/Compose 實作 ===
 * 
 * 1. 背景漸層：
 *    Box(modifier = Modifier
 *        .fillMaxSize()
 *        .background(
 *            Brush.verticalGradient(
 *                colors = listOf(Color(0xFF2E5C8A), Color(0xFF4A90E2))
 *            )
 *        )
 *    )
 * 
 * 2. 登入按鈕漸層：
 *    Button(
 *        onClick = { handleLogin() },
 *        modifier = Modifier
 *            .fillMaxWidth()
 *            .height(56.dp)
 *            .clip(RoundedCornerShape(28.dp))
 *            .background(
 *                Brush.horizontalGradient(
 *                    colors = listOf(Color(0xFFD4AF37), Color(0xFFC49B2E))
 *                )
 *            )
 *    ) {
 *        Text("立即登入", fontSize = 18.sp, fontWeight = FontWeight.Bold)
 *    }
 * 
 * 3. CM 統登整合：
 *    private val authManager = CMAuthManager()
 *    
 *    fun handleLogin() {
 *        authManager.openCMLoginPage { result ->
 *            result.onSuccess { user ->
 *                checkVIPStatus(user)
 *                navigateToHome(isFirstTime = user.isFirstLogin)
 *            }.onFailure { error ->
 *                showError(error)
 *            }
 *        }
 *    }
 * 
 * ===== VIP 權限判斷邏輯 =====
 * 
 * 登入成功後需要檢查的項目：
 * 1. 是否為初次登入 (isFirstLogin) -> 導向新手教學頁
 * 2. VIP 狀態 (vipStatus)
 *    - hasPremium: true/false
 *    - expiryDate: Date
 *    - isTrial: true/false (試用版)
 * 
 * 導航流程：
 * - 初次登入 + 無VIP -> 新手教學頁 -> 首頁（試用模式）
 * - 初次登入 + 有VIP -> 新手教學頁 -> 首頁（專業版）
 * - 非初次登入 + 無VIP -> 首頁（試用模式）
 * - 非初次登入 + 有VIP -> 首頁（專業版）
 * 
 * ===== 權限控制 =====
 * 
 * 專業版會員（hasPremium = true）：
 * - 選股頁面：完整顯示所有股票
 * - 影音內容：無限制觀看
 * - 社團功能：完整存取
 * 
 * 試用版用戶（hasPremium = false）：
 * - 選股頁面：僅顯示前3支股票，其餘模糊 + 金色鎖頭
 * - 影音內容：部分預覽
 * - 社團功能：限制發文頻率
 */
