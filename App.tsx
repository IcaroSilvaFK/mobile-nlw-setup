import { View, StatusBar } from 'react-native';
import './src/utils/dayjs';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import { Navigation } from './src/routes';

export default function App() {
  const [fontsIsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#09090a' }}>
      {!fontsIsLoaded ? <Loading /> : <Navigation />}
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
    </View>
  );
}
