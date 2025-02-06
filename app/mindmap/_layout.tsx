import { Stack } from 'expo-router';
const MindMapLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={{
          headerTitle: 'Upload Documents',
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default MindMapLayout;
