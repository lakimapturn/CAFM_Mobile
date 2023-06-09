import "react-native-gesture-handler";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Image, ImageBackground, Platform, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { IconButton } from "react-native-paper";

import { useDispatch } from "react-redux";

import Login from "../screens/Login";
import AddEditTicket from "../screens/AddEditTicket";
import TicketView from "../screens/TicketView";
import CAFMLogo from "../../assets/CAFM-Pro-Logo.svg";
import { screens } from "../constants/constants";
import Register from "../screens/Register";
import UserDetails from "../screens/UserDetails";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = createStackNavigator();

const AppNavigator = () => {
  let options = {};
  // check if the background is dark when running this on android
  if (Platform.OS === "ios") {
    options = {
      ...TransitionPresets.ScaleFromCenterAndroid,
    };
  }

  // const Screen = (props) => {
  //   <App.Screen {...props} options={options}/>
  // }

  return (
    <NavigationContainer theme={theme}>
      <App.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <View>
              <Image source={require("../../assets/CAFM-Pro-Logo.png")} />
            </View>
          ),
          headerBackTitleVisible: false,
        }}
      >
        <App.Screen name="Login" component={Login} options={options} />
        <App.Screen name="Register" component={Register} options={options} />
        <App.Screen
          name="User Details"
          component={UserDetails}
          options={options}
        />
        <App.Screen
          name="Tickets"
          component={TicketView}
          options={({ navigation }) => ({
            headerRight: (props) => (
              <IconButton
                icon="information-variant"
                size={30}
                onPress={() => {
                  navigation.navigate(screens.userDetails);
                }}
              />
            ),
            ...options,
          })}
        />
        <App.Screen
          name="Add/Edit Ticket"
          component={AddEditTicket}
          options={options}
        />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
