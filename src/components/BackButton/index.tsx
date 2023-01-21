import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import color from 'tailwindcss/colors';
import { useNavigation } from '@react-navigation/native';

export function BackButton() {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
      <Feather name='arrow-left' size={32} color={color.zinc[400]} />
    </TouchableOpacity>
  );
}
