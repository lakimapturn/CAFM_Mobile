import { View } from "react-native";
import { Button } from "react-native-paper";

import { screens } from "../constants/constants";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userActions";

const UserDetails = (props) => {
  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logout());
    props.navigation.reset({
      index: 0,
      routes: [{ name: screens.login }],
    });
  };
  return (
    <View>
      <Button mode="contained" onPress={userLogout}>
        Logout
      </Button>
    </View>
  );
};

export default UserDetails;
