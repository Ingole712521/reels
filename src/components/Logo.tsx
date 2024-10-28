/** @format */

import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 100, height = 100 }: LogoProps) {
  return (
    <Svg width={width} height={height} viewBox='0 0 100 100'>
      <Circle cx='50' cy='50' r='45' fill='#FF4500' />
      <Path d='M35 30 L35 70 L70 50 Z' fill='white' />
      <Circle
        cx='50'
        cy='50'
        r='20'
        fill='transparent'
        stroke='white'
        strokeWidth='5'
      />
    </Svg>
  );
}
    