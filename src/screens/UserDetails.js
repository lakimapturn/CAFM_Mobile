import { StyleSheet, View } from "react-native";
import { Button, Divider, List } from "react-native-paper";

import { colors, screens, userDetailOptions } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";

const UserDetails = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // Removes user data from async storage and resets navigation stack
  const userLogout = () => {
    dispatch(logout());
    props.navigation.reset({
      index: 0,
      routes: [{ name: screens.login }],
    });
  };

  const editEmail = () => {
    props.navigation.navigate(screens.editUserDetails, {
      field: userDetailOptions.email,
      value: user?.Email,
      id: user?.id,
    });
  };

  const editMobile = () => {
    props.navigation.navigate(screens.editUserDetails, {
      field: userDetailOptions.mobile,
      value: user?.Mobile,
      id: user?.id,
    });
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>User Details</List.Subheader>
        <Divider />
        <List.Item
          title="Email"
          description={user?.Email}
          left={() => <List.Icon icon="at" />}
          right={() => <List.Icon icon="chevron-right" />}
          style={styles.listItem}
          onPress={editEmail}
        />
        <Divider />
        <List.Item
          title="Phone"
          description={user?.Mobile}
          left={() => <List.Icon icon="phone" />}
          right={() => <List.Icon icon="chevron-right" />}
          style={styles.listItem}
          onPress={editMobile}
        />
        <Divider />
      </List.Section>
      <View style={styles.logoutButtonContainer}>
        <Button
          mode="text"
          onPress={userLogout}
          labelStyle={styles.logoutButtonText}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listItem: {
    paddingLeft: "2%",
  },
  logoutButtonContainer: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "2%",
  },
  logoutButtonText: {
    textTransform: "uppercase",
    color: colors.red,
    paddingHorizontal: "4%",
  },
});

export default UserDetails;
