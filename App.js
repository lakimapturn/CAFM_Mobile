import { createContext, useEffect, useMemo, useState } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider as StoreProvider, useDispatch } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import {
  ImageBackground,
  LogBox,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
// import NetInfo from "@react-native-community/netinfo";

import ticketReducer from "./src/store/reducers/ticketReducer";
import userReducer from "./src/store/reducers/userReducer";
import AppNavigator from "./src/navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appReducer = {
  user: userReducer,
  ticket: ticketReducer,
};

const store = configureStore(
  {
    reducer: appReducer,
  },
  applyMiddleware(ReduxThunk)
);

// Sets all devices to light theme
const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
};

const AuthContext = createContext();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnected, setIsConnected] = useState();

  // useEffect(() => {
  //   NetInfo.fetch().then((state) => {
  //     console.log("Is connected?", setIsConnected(state.isConnected));
  //   });
  // }, []);

  // Checks if the user's credentials are saved and logs him in automatically
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (jsonValue !== null) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    restoreSession();
  }, []);

  const authContext = useMemo(() => ({
    logIn: async (mobileNum, password) => {
      await dispatch(authenticate(mobileNum, password));
      setIsLoggedIn(true);
    },
  }));

  const getFilesPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "CAFM Mobile Storage Permissions",
        message: "CAFM Mobile requires access to your documents",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
  };

  LogBox.ignoreLogs([
    "ImmutableStateInvariantMiddleware",
    "SerializableStateInvariantMiddleware",
    "Sending `onAnimatedValueUpdate`",
  ]);

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <ImageBackground
            style={styles.bgImage}
            source={require("./assets/1920-background.jpg")}
          >
            <AppNavigator isLoggedIn={isLoggedIn} />
          </ImageBackground>
        </AuthContext.Provider>
      </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  bgImage: { width: "100%", height: "100%" },
});
