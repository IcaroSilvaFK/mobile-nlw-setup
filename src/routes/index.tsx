import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Stack } from './stack';

export function Navigation() {
  return (
    <View className='flex-1 bg-background'>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </View>
  );
}
