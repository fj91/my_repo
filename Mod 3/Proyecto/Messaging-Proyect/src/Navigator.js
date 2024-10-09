import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Chat } from "./screens/Chat";
import { Chats } from "./screens/Chats";
import { Contacts } from "./screens/Contacts";
import { Appbar } from "react-native-paper";
import { useAuth } from "./hooks/useAuth";

const ChatStackNavigator = createStackNavigator();
const TabNavigator = createMaterialBottomTabNavigator();

const Header = (props) => { 
  const { setAuth } = useAuth();
  function handleLogout() {   
    setAuth("");
  };  
  return (
    <Appbar.Header>
      {props.navigation.canGoBack() && props.back?.title && (
        <>
          <Appbar.Action
            icon="arrow-left"
            color="white"
            onPress={() => props.navigation.goBack()}
          ></Appbar.Action>
        </>
      )}
      <Appbar.Content title={props.route?.params?.name || props.route.name} />
      <Appbar.Action
        icon="exit-to-app"
        onPress={handleLogout}
      />
    </Appbar.Header>
  );
};


export function Navigator() {
  return (
    <NavigationContainer>      
      <TabNavigator.Navigator
        labeled={false}
        barStyle={{ backgroundColor: "#128c7e" }}       
      >
        <TabNavigator.Screen
          name="Mis chats"
          options={{
            tabBarIcon: ({ color}) => (
              <MaterialCommunityIcons name="wechat" color={color} size={35} style={{ width: 35 , height: 35 }}/>
            ),
          }}
        >
          {(props) => (
            <ChatStackNavigator.Navigator
              screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#128c7e" },
                headerTintColor: 'white',     
                header: Header,           
                headerTitleStyle: {
                  color: "white",
                },
              }}
            >
              <ChatStackNavigator.Screen name="Chats" component={Chats} />
              <ChatStackNavigator.Screen name="Chat" component={Chat} />
            </ChatStackNavigator.Navigator>
          )}
        </TabNavigator.Screen>
        <TabNavigator.Screen
          name="Contactos"
          component={Contacts}
          options={{
            headerShown: true,
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="contacts-outline"
                color={color}
                size={30} style={{ width: 30 , height: 30}}
              />
            ),
          }}
        ></TabNavigator.Screen>
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
}
