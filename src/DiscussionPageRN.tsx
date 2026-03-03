/**
 * React Native 版本的 DiscussionPage
 * 
 * ⚠️ 轉換重點說明：
 * 1. 所有 div → View
 * 2. 所有 p, span, h1-h6 → Text
 * 3. 所有 button → TouchableOpacity 或 Pressable
 * 4. 所有 img → Image
 * 5. className → style prop
 * 6. onClick → onPress
 * 7. Tailwind classes → StyleSheet.create()
 * 8. react-router navigation → react-navigation
 * 9. lucide-react icons → react-native-vector-icons 或 expo-vector-icons
 * 10. ScrollView 替代自動滾動的 div
 * 
 * 🎨 台股配色保持：
 * - 主色調藍色：#4A90E2
 * - 強調金色：#D4AF37
 * - 上漲紅色：#FE6D73
 * - 下跌綠色：#9cffd9
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
// 實際使用時需安裝: expo install expo-blur
// import { BlurView } from 'expo-blur';

// 圖標庫 - 實際使用時需安裝
// npm install react-native-vector-icons
// 或使用 @expo/vector-icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ==================== 類型定義 ====================

type TabType = 'enru' | 'vip';
type SubTabType = 'qa' | 'elite';

interface StockTag {
  code: string;
  name: string;
  trend: 'up' | 'down';
  pattern: number;
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    subtitle: string;
    memberId: string;
  };
  time: string;
  title: string;
  content: string;
  stockTags: StockTag[];
  images?: string[];
  videoUrl?: string;
  likes: number;
  comments: number;
  reactions: string[];
  hasEditHistory?: boolean;
}

// ==================== 模擬數據 ====================

const mockEnruPosts: Post[] = [
  {
    id: 'enru-1',
    author: {
      name: '林恩如-超簡單投資法',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      subtitle: '專業投資顧問',
      memberId: 'enru',
    },
    time: '6h',
    title: '為什麼你買股票總是在「領股息」，而不是「賺價差」？',
    content:
      '很多人買了股票套牢，就開始自己：「沒關係啦，這間公司很穩，我改領股息當存股。」別再騙自己了！這叫「被迫長期投資」。真正的投資應該是主動選擇，而不是被套牢後才說要領股息...',
    stockTags: [
      { code: '2303', name: '聯電', trend: 'down', pattern: 2 },
      { code: '2344', name: '華邦電', trend: 'down', pattern: 3 },
      { code: '3064', name: '煒華', trend: 'up', pattern: 1 },
    ],
    images: [
      'https://images.unsplash.com/photo-1766218329569-53c9270bb305?w=800',
    ],
    likes: 59,
    comments: 2,
    reactions: ['👍', '😮'],
  },
  // ... 更多貼文
];

// ==================== PostCard 組件 (React Native 版本) ====================

interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) => void;
  onBlock?: (memberId: string, userName: string) => void;
  isEnruZone: boolean;
}

function PostCard({ post, onDelete, onBlock, isEnruZone }: PostCardProps) {
  // 狀態管理（與 Web 版本相同）
  const [liked, setLiked] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  
  const CONTENT_PREVIEW_LENGTH = 100;

  // 處理點讚
  const handleLike = () => {
    setLiked(!liked);
  };

  // 處理更多選單
  const handleMorePress = () => {
    setShowMoreMenu(true);
  };

  return (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <Image
            source={{ uri: post.author.avatar }}
            style={styles.avatar}
          />
          <View style={styles.authorText}>
            <Text style={styles.authorName}>{post.author.name}</Text>
            <View style={styles.timeRow}>
              <Text style={styles.time}>{post.time}</Text>
              {editedPost.hasEditHistory && (
                <Text style={styles.edited}> · 已編輯</Text>
              )}
            </View>
          </View>
        </View>
        
        {!isEnruZone && (
          <TouchableOpacity
            onPress={handleMorePress}
            style={styles.moreButton}
            activeOpacity={0.7}
          >
            <Feather name="more-horizontal" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Post Title */}
      {editedPost.title && editedPost.title.length > 0 && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{editedPost.title}</Text>
        </View>
      )}

      {/* Stock Tags */}
      {editedPost.stockTags.length > 0 && (
        <View style={styles.stockTagsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stockTagsScroll}
          >
            {editedPost.stockTags.map((tag) => (
              <TouchableOpacity
                key={tag.code}
                style={styles.stockTag}
                activeOpacity={0.7}
              >
                {/* 迷你K線圖 - 實際需要自定義繪製 */}
                <View
                  style={[
                    styles.miniChart,
                    { backgroundColor: tag.trend === 'up' ? '#FE6D7320' : '#9cffd920' },
                  ]}
                />
                <Text style={styles.stockTagText}>{tag.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Post Content - 重點：展開/收合功能 */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          {isExpanded || editedPost.content.length <= CONTENT_PREVIEW_LENGTH
            ? editedPost.content
            : `${editedPost.content.slice(0, CONTENT_PREVIEW_LENGTH)}...`}
          
          {editedPost.content.length > CONTENT_PREVIEW_LENGTH && (
            <Text
              onPress={() => setIsExpanded(!isExpanded)}
              style={styles.readMoreButton}
            >
              {' '}
              {isExpanded ? '收合' : '繼續閱讀'}
            </Text>
          )}
        </Text>
      </View>

      {/* Images */}
      {editedPost.images && editedPost.images.length > 0 && (
        <View style={styles.imagesContainer}>
          {editedPost.images.length === 1 ? (
            // 單張圖片
            <TouchableOpacity
              style={styles.singleImageWrapper}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: editedPost.images[0] }}
                style={styles.singleImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            // 多張圖片 - 橫向滾動
            <ScrollView
              horizontal
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.multiImagesScroll}
            >
              {editedPost.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.multiImageWrapper,
                    index === 0 && styles.firstImage,
                    index === editedPost.images!.length - 1 && styles.lastImage,
                  ]}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: image }}
                    style={styles.multiImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLike}
          activeOpacity={0.7}
        >
          <Feather
            name="heart"
            size={20}
            color={liked ? '#FE6D73' : '#666'}
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.actionText, liked && styles.likedText]}>
            {post.likes + (liked ? 1 : 0)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Feather
            name="message-circle"
            size={20}
            color="#666"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Feather name="share-2" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* More Menu Modal */}
      <Modal
        visible={showMoreMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMoreMenu(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowMoreMenu(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Feather name="edit" size={20} color="#333" />
              <Text style={styles.menuText}>編輯</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <Feather name="trash-2" size={20} color="#FF3B30" />
              <Text style={[styles.menuText, { color: '#FF3B30' }]}>刪除</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => setShowMoreMenu(false)}
            >
              <Text style={styles.menuCancel}>取消</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

// ==================== DiscussionPage 主組件 ====================

export default function DiscussionPageRN() {
  const [discussionTab, setDiscussionTab] = useState<TabType>('enru');
  const [subTab, setSubTab] = useState<SubTabType>('qa');
  const [posts, setPosts] = useState<Post[]>(mockEnruPosts);

  const tabs = [
    { id: 'enru' as const, label: '恩如專區' },
    { id: 'vip' as const, label: 'VIP社團' },
  ];

  const subTabs = [
    { id: 'qa' as const, label: '超粉QA問答區', requiresPro: false },
    { id: 'elite' as const, label: '長線菁英討論群', requiresPro: true },
  ];

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard post={item} isEnruZone={discussionTab === 'enru'} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header with Tabs */}
      <View style={styles.header}>
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => {
            const isActive = discussionTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setDiscussionTab(tab.id)}
                style={styles.tab}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.tabText, isActive && styles.tabTextActive]}
                >
                  {tab.label}
                </Text>
                {isActive && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Sub-tabs (VIP only) */}
      {discussionTab === 'vip' && (
        <View style={styles.subTabsContainer}>
          {subTabs.map((tab) => {
            const isActive = subTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setSubTab(tab.id)}
                style={styles.subTab}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.subTabText,
                    isActive && styles.subTabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
                {tab.requiresPro && (
                  <Feather
                    name="lock"
                    size={12}
                    color="#D4AF37"
                    style={{ marginLeft: 4 }}
                  />
                )}
                {isActive && <View style={styles.subTabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Posts List */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button (VIP only) */}
      {discussionTab === 'vip' && (
        <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

// ==================== StyleSheet (React Native 樣式) ====================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 24,
  },
  tab: {
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  tabTextActive: {
    color: '#000',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A90E2',
    transform: [{ translateX: -3 }],
  },
  subTabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 16,
  },
  subTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  subTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  subTabTextActive: {
    color: '#000',
  },
  subTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#4A90E2',
  },
  postsList: {
    paddingBottom: 80,
  },
  postCard: {
    backgroundColor: '#fff',
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  authorText: {
    justifyContent: 'center',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  edited: {
    fontSize: 12,
    color: '#999',
  },
  moreButton: {
    padding: 8,
    borderRadius: 20,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  stockTagsContainer: {
    paddingBottom: 12,
  },
  stockTagsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  stockTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 6,
  },
  miniChart: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  stockTagText: {
    fontSize: 12,
    color: '#333',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(0, 0, 0, 0.9)',
  },
  readMoreButton: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  imagesContainer: {
    paddingBottom: 12,
  },
  singleImageWrapper: {
    paddingHorizontal: 16,
  },
  singleImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  multiImagesScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  multiImageWrapper: {
    width: SCREEN_WIDTH - 120,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  firstImage: {
    width: SCREEN_WIDTH - 80,
  },
  lastImage: {
    marginRight: 16,
  },
  multiImage: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#666',
  },
  likedText: {
    color: '#FE6D73',
  },
  separator: {
    height: 8,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuCancel: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
});

/**
 * ==================== 轉換清單 ====================
 * 
 * ✅ 完成：
 * 1. div → View
 * 2. p, span → Text
 * 3. button → TouchableOpacity
 * 4. img → Image
 * 5. className → style
 * 6. onClick → onPress
 * 7. Tailwind → StyleSheet
 * 8. 繼續閱讀功能（展開/收合）
 * 9. 圖片橫向滾動
 * 10. Modal 選單
 * 
 * ⚠️ 需要額外實現：
 * 1. MiniStockChart - 需要使用 react-native-svg 繪製K線圖
 * 2. YouTube 影片 - 需要使用 react-native-youtube-iframe
 * 3. 圖片查看器 - 需要使用 react-native-image-viewing
 * 4. 表情反應動畫 - 需要使用 Animated API
 * 5. 長按事件 - 使用 onLongPress
 * 6. Toast 提示 - 需要使用 react-native-toast-message
 * 7. 模糊效果 - 需要使用 expo-blur
 * 8. 導航 - 需要整合 @react-navigation/native
 * 
 * 📦 需要安裝的套件：
 * - @react-navigation/native
 * - @react-navigation/native-stack
 * - react-native-vector-icons
 * - react-native-svg (用於K線圖)
 * - react-native-youtube-iframe (用於影片)
 * - react-native-image-viewing (用於圖片查看)
 * - react-native-toast-message (用於提示)
 * - expo-blur (用於模糊效果)
 * 
 * 🎨 視覺效果對照：
 * - 顏色系統：完全保持一致
 * - 間距：使用相同的數值 (px → 數字)
 * - 字體大小：完全相同
 * - 圓角：完全相同
 * - 陰影：使用 shadowColor 等屬性
 * - 漸層：需要使用 react-native-linear-gradient
 * 
 * 💡 SwiftUI / Kotlin 轉換備註：
 * 
 * SwiftUI 對應：
 * - View → VStack / HStack / ZStack
 * - TouchableOpacity → Button with custom style
 * - FlatList → List or LazyVStack
 * - StyleSheet → ViewModifier / custom styles
 * - useState → @State property wrapper
 * 
 * Kotlin/Jetpack Compose 對應：
 * - View → Column / Row / Box
 * - TouchableOpacity → Button with Modifier.clickable
 * - FlatList → LazyColumn
 * - StyleSheet → Modifier chains
 * - useState → remember { mutableStateOf() }
 * 
 * 布局對應關係：
 * - flex-1 (Web) = flex: 1 (RN) = .frame(maxHeight: .infinity) (SwiftUI) = Modifier.fillMaxSize() (Compose)
 * - w-full (Web) = width: '100%' (RN) = .frame(maxWidth: .infinity) (SwiftUI) = Modifier.fillMaxWidth() (Compose)
 * - justify-between (Web) = justifyContent: 'space-between' (RN) = Spacer() (SwiftUI) = Arrangement.SpaceBetween (Compose)
 */
