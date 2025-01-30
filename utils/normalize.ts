import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const REFERENCE_WIDTH = 375;
const REFERENCE_HEIGHT = 812;
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const widthScale = SCREEN_WIDTH / REFERENCE_WIDTH;
  const heightScale = SCREEN_HEIGHT / REFERENCE_HEIGHT;
  const averageScale = (widthScale + heightScale) / 2;
  const newSize = size * averageScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
