import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, Text } from "react-native-paper";
import { Chat } from "./screens/Chat";
import { Chats } from "./screens/Chats";
import { Contacts } from "./screens/Contacts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Platform } from "react-native";

const ChatStackNavigator = createStackNavigator();
const TabNavigator = createBottomTabNavigator();

const Header = (props) => {
  const platform = Platform.OS;
  const color = Platform.select({ ios: "red", android: "blue" });
  if (platform === "web") {
    return null;
  }
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
        icon="dots-vertical"
        onPress={() => console.log("press ")}
      />
    </Appbar.Header>
  );
};

export function Navigator() {
  return (
    <NavigationContainer>
      <TabNavigator.Navigator screenOptions={{ headerShown: false }}>
        <TabNavigator.Screen
          name="ChatTab"
          options={{
            tabBarLabel: "Chats",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="message"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {(props) => (
            <ChatStackNavigator.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "white" },
                header: Header,
              }}
            >
              <ChatStackNavigator.Screen name="Chats" component={Chats} />
              <ChatStackNavigator.Screen name="Chat" component={Chat} />
            </ChatStackNavigator.Navigator>
          )}
        </TabNavigator.Screen>
        <TabNavigator.Screen
          name="ContactsTab"
          component={Contacts}
          options={{
            headerShown: true,
            tabBarLabel: "Contactos",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="contacts"
                color={color}
                size={size}
              />
            ),
          }}
        ></TabNavigator.Screen>
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
}
