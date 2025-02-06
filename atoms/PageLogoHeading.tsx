import { Image } from 'react-native';

import { Text, View } from '@/components/Themed';
import { normalize } from '@/utils/normalize';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AppIcon from './AppIcon';
import { router } from 'expo-router';

interface Props {
  title?: string;
  asHeader?: boolean;
}

const PageLogoHeading = ({ title, asHeader }: Props) => {
  const hasTitle = !!title;
  return (
    <View
      style={{
        ...(styles.container as object),
        justifyContent: hasTitle ? 'flex-start' : 'center',
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
      <AppIcon size={asHeader ? 42 : 62} />
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
