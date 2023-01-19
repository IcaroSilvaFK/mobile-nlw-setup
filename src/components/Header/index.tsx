import { View } from 'react-native';

import HabitLogo from '../../assets/logo.svg';

export function Header() {
  return (
    <View className='w-full flex-row items-center justify-between'>
      <HabitLogo />
    </View>
  );
}
