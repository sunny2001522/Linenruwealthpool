import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect, G } from 'react-native-svg';

interface StarHalfProps {
  size?: number;
}

/**
 * 半星星 SVG 元件
 * 用於恩如三部曲評分系統
 * 左半邊填充金色漸層，右半邊透明
 * 
 * @param size - 星星大小（預設 24）
 */
export default function StarHalf({ size = 24 }: StarHalfProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="goldGradientHalf" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
          <Stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
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
      <G clipPath="url(#halfClip)">
        <Path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#goldGradientHalf)"
        />
      </G>
    </Svg>
  );
}
