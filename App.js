import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './screens/list';
import UpdateScreen from './screens/update';
import CreateScreen from './screens/create';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='List' component={ListScreen} options={{title:'Yapacaklarım'}}/>
          <Stack.Screen name='Update' component={UpdateScreen} options={{title:'Güncelleme Ekranı'}} />
          <Stack.Screen name='Create' component={CreateScreen} options={{title:'Oluşturma Ekranı'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
