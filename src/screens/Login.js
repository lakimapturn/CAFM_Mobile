import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Card, TextInput, Button, Divider, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authenticate, syncUserData } from "../store/actions/userActions";
import { screens } from "../constants/constants";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Login = (props) => {
  const dispatch = useDispatch();

  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);

  // Checks if the user's credentials are saved and logs him in automatically
  useEffect(() => {
    const loginUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (jsonValue !== null) {
          await dispatch(syncUserData(jsonValue));
          await props.navigation.replace(screens.tickets);
        }
      } catch (err) {
        setError(err);
        setShowError(true);
      }
    };
    loginUser();
  }, []);

  // Runs everytime mobileNum or password change. Used for validating the 2 fields
  useEffect(() => {
    if (mobileNum.length > 2 && password.length > 2) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [mobileNum, password]);

  const login = async () => {
    setIsLoading(true);
    try {
      await dispatch(authenticate(mobileNum, password));
      await props.navigation.replace(screens.tickets);
    } catch (err) {
      setError(err.message);
      setShowError(true);
      setIsButtonDisabled(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Sends user to registration screen
  const registerNewUser = () => {
    props.navigation.replace(screens.register);
  };

  // Closes Error Dialog
  const dismissError = () => {
    setShowError(false);
    setError();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.page}>
          <Card style={styles.card} mode="elevated">
            <Card.Content>
              <Text style={styles.title} variant="headlineLarge">
                Login
              </Text>
            </Card.Content>
            <Divider />
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Mobile"
                right={<TextInput.Icon icon="cellphone" />}
                onChangeText={(text) => setMobileNum(text)}
                style={styles.input}
              />
              <TextInput
                mode="outlined"
                label="Password"
                secureTextEntry
                right={<TextInput.Icon icon="key" />}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
              />
              <Button
                disabled={isButtonDisabled}
                mode="elevated"
                onPress={login}
                style={styles.authButton}
              >
                Login
              </Button>
              <Button
                style={styles.authButton}
                mode="text"
                onPress={registerNewUser}
              >
                Register new user
              </Button>
            </Card.Content>
          </Card>
          <Error error={error} visible={showError} dismiss={dismissError} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    top: "16%",
    height: "100%",
  },
  card: {
    margin: "10%",
  },
  input: {
    marginVertical: "1.5%",
  },
  authButton: {
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  title: {
    textAlign: "center",
  },
});

export default Login;
