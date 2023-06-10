import ConceptMe from './src/ConceptMe';
import ResponseScreen from './src/ResponseScreen';
import NoteScreen from './src/NoteScreen';
import FullNoteScreen from './src/FullNoteScreen';
import { NavigationContainer } from '@react-navigation/native';
import {TransitionPresets  } from '@react-navigation/stack';
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ConceptMe"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.FadeFromBottomAndroid, 
        }}
      >
        <Stack.Screen name="ConceptMe" component={ConceptMe} />
        <Stack.Screen name="ResponseScreen" component={ResponseScreen} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
        <Stack.Screen name="FullNoteScreen" component={FullNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
