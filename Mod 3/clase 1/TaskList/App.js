import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Detail } from './src/screens/Detail';
import {Task} from "./src/screens/Task";
import {TaskList} from "./src/screens/TaskList";

const Stack = createNativeStackNavigator();

export default function App() {  
  return (  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskList} options={{title:"Cosas por hacer"}}/>
        <Stack.Screen name="Task" component={Task} options={{title:"Agregar nueva tarea"}}/>
        <Stack.Screen name="Detail" component={Detail} options={{title:"Detalles"}}/>
      </Stack.Navigator>
   </NavigationContainer>    
  );
}
