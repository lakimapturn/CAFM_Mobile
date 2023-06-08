import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
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
  return (
    <NavigationContainer theme={theme}>
      <App.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <View>
              <Image source={require("../../assets/CAFM-Pro-Logo.png")} />
              {/* <CAFMLogo {...props} height={40} width={120} /> */}
              {/* <SvgUri
                uri={
                  "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/ruby.svg"
                }
                height={20}
                width={20}
              /> */}
            </View>
          ),
        }}
      >
        <App.Screen name="Login" component={Login} />
        <App.Screen name="Register" component={Register} />
        <App.Screen name="User Details" component={UserDetails} />
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
          })}
        />
        <App.Screen name="Add/Edit Ticket" component={AddEditTicket} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
