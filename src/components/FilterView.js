import { SelectList } from "react-native-dropdown-select-list";
import { Button } from "react-native-paper";
import { Animated, StyleSheet, View } from "react-native";

import { colors, filterActions } from "../constants/constants";

const maxDropDownHeight = 100;

const FilterView = (props) => {
  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          transform: [{ translateY: props.filtersPosition }],
        },
      ]}
    >
      <SelectList
        setSelected={(date) => props.onSelect(filterActions.updateDate, date)}
        data={props.dates}
        save="key"
        placeholder="Select Time Period"
        search={false}
        maxHeight={maxDropDownHeight}
        boxStyles={[styles.bgWhite, styles.input]}
        dropdownStyles={styles.bgWhite}
      />
      <SelectList
        setSelected={(status) =>
          props.onSelect(filterActions.setStatusId, status)
        }
        data={props.statuses}
        save="key"
        placeholder="Select Status"
        search={false}
        maxHeight={maxDropDownHeight}
        boxStyles={[styles.bgWhite, styles.input]}
        dropdownStyles={styles.bgWhite}
      />
      <View style={styles.buttonContainer}>
        <Button mode="text" onPress={props.cancel}>
          Cancel
        </Button>
        <Button mode="elevated" onPress={props.confirm}>
          Confirm
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    paddingHorizontal: "3%",
    paddingTop: "2%",
    top: 0,
    position: "absolute",
    width: "100%",
    backgroundColor: colors.white,
    height: "100%",
    borderRadius: 25,
  },
  input: {
    marginVertical: "2%",
  },
  bgWhite: {
    backgroundColor: colors.white,
  },
  buttonContainer: {
    marginHorizontal: "10%",
  },
});

export default FilterView;
