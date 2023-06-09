import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Card, TextInput, TextInputMask, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../store/actions/userActions";
import { colors, screens } from "../constants/constants";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Login = (props) => {
  const dispatch = useDispatch();

  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Function that runs everytime mobileNum or password change.
  useEffect(() => {
    if (mobileNum.length > 2 && password.length > 2) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [mobileNum, password]);

  const login = async () => {
    setIsLoading(true);
    try {
      await dispatch(authenticate(mobileNum, password));
      props.navigation.replace(screens.tickets);
      setMobileNum("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const registerNewUser = () => {
    props.navigation.replace(screens.register);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.page}>
          <Card style={styles.card} mode="elevated">
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
          <Error error={error} dismiss={() => setError()} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    top: "19%",
    height: "100%",
  },
  card: {
    margin: "10%",
  },
  input: {
    marginBottom: "3%",
  },
  authButton: {
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
});

export default Login;
