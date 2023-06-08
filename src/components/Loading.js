import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loading = (props) => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default Loading;
