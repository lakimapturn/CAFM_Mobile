import { createContext, useEffect, useMemo, useState } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider as StoreProvider, useDispatch } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { ImageBackground } from "react-native";

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

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={require("./assets/1920-background.jpg")}
          >
            <AppNavigator isLoggedIn={isLoggedIn} />
          </ImageBackground>
        </AuthContext.Provider>
      </PaperProvider>
    </StoreProvider>
  );
}
