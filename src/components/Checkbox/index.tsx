import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

interface ICheckboxProps {
  checked: boolean;
  label: string;
  onPress: (value: number) => void;
  value: number;
}

export function Checkbox(props: ICheckboxProps) {
  const { checked, label, onPress, value } = props;

  function onPressed() {
    onPress(value);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row mb-2 items-center'
      onPress={onPressed}
    >
      {checked ? (
        <View className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'>
          <Feather name='check' size={20} color={colors.white} />
        </View>
      ) : (
        <View className='h-8 w-8 bg-zinc-900 rounded-lg' />
      )}

      <Text className='text-white text-base ml-3'>{label}</Text>
    </TouchableOpacity>
  );
}
