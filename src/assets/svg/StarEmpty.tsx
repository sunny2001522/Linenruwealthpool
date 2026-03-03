import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface StarEmptyProps {
  size?: number;
  color?: string;
}

/**
 * 空星星 SVG 元件
 * 用於恩如三部曲評分系統
 * 只有外框，內部透明
 * 
 * @param size - 星星大小（預設 24）
 * @param color - 外框顏色（預設金色 #D4AF37）
 */
export default function StarEmpty({ size = 24, color = '#D4AF37' }: StarEmptyProps) {
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
