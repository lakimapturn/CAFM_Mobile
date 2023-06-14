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
import Home from "../screens/Home";
import CAFMLogo from "../../assets/CAFM-Pro-Logo.svg";
import { screens } from "../constants/constants";
import Register from "../screens/Register";
import UserDetails from "../screens/UserDetails";
import { useEffect } from "react";
import { syncUserData } from "../store/actions/userActions";
import EditUserDetails from "../screens/EditUserDetails";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = createStackNavigator();

const AppNavigator = (props) => {
  const dispatch = useDispatch();

  let isLoggedIn = props.isLoggedIn;

  let options = {};
  // check if the background is dark when running this on android
  if (Platform.OS === "ios") {
    options = {
      ...TransitionPresets.ScaleFromCenterAndroid,
    };
  }

  useEffect(() => {
    if (props.isLoggedIn) {
      try {
        dispatch(syncUserData());
        isLoggedIn = true;
      } catch (error) {
        isLoggedIn = false;
      }
    }
  }, []);

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
        {/* {!props.isLoggedIn ? ( */}
        <>
          <App.Screen
            name={screens.login}
            component={Login}
            options={options}
          />
          <App.Screen
            name={screens.register}
            component={Register}
            options={options}
          />
        </>
        {/* ) : ( */}
        <>
          <App.Screen
            name={screens.home}
            component={Home}
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
            name={screens.userDetails}
            component={UserDetails}
            options={options}
          />
          <App.Screen name={screens.addEditTicket} component={AddEditTicket} />
          <App.Screen
            name={screens.editUserDetails}
            component={EditUserDetails}
            options={options}
          />
        </>
        {/* )} */}
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
