import { Image } from 'react-native';

import { Text, View } from '@/components/Themed';
import { normalize } from '@/utils/normalize';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AppIcon from './AppIcon';
import { router } from 'expo-router';

interface Props {
  title?: string;
  asHeader?: boolean;
  size?: number
}

const PageLogoHeading = ({ title, asHeader,size }: Props) => {
  const hasTitle = !!title;
  return (
    <View
      style={{
        ...(styles.container as object),
        justifyContent: hasTitle ? 'flex-start' : 'center',
        marginLeft: !asHeader ? normalize(8) : 0,
      }}
    >
      {asHeader && (
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={{ marginRight: normalize(16) }}
        >
          <Image
            style={{
              height: normalize(20),
              width: normalize(20),
              objectFit: 'contain',
            }}
            source={require('@/assets/images/back-icon.png')}
          />
        </TouchableOpacity>
      )}
      <AppIcon size={size ??  asHeader ? 42 : 62} />
      {title && <Text style={styles.text}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: normalize(16),
    alignItems: 'center',
    paddingVertical: normalize(0),
  },
  hasText: {},
  text: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: normalize(28),
    lineHeight: normalize(48),
  },
});

export default PageLogoHeading;
