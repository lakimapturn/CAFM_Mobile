import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider as StoreProvider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { ImageBackground } from "react-native";

import ticketReducer from "./src/store/reducers/ticketReducer";
import userReducer from "./src/store/reducers/userReducer";
import AppNavigator from "./src/navigation/AppNavigator";
import { colors } from "./src/constants/constants";

const appReducer = {
  auth: userReducer,
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

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={require("./assets/1920-background.jpg")}
        >
          <AppNavigator />
        </ImageBackground>
      </PaperProvider>
    </StoreProvider>
  );
}
