import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface StarFullProps {
  size?: number;
  color?: string;
}

/**
 * 滿星星 SVG 元件
 * 用於恩如三部曲評分系統
 * 
 * @param size - 星星大小（預設 24）
 * @param color - 星星顏色（預設金色漸層）
 */
export default function StarFull({ size = 24, color = '#D4AF37' }: StarFullProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
          <Stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="url(#goldGradient)"
      />
    </Svg>
  );
}
