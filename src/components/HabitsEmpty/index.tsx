import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function HabitsEmpty() {
  const { navigate } = useNavigation();

  function handleNavigateFromNewHabitScreen() {
    navigate('new');
  }

  return (
    <View className='items-center'>
      <Text className='text-zinc-400 text-base text-center'>
        Você ainda não está monitorando nenhum hábito!
      </Text>
      <Pressable
        className='mt-4 active:opacity-60'
        onPress={handleNavigateFromNewHabitScreen}
      >
        <Text className='text-violet-400 text-base font-semibold underline'>
          Criar novo hábito
        </Text>
      </Pressable>
    </View>
  );
}
