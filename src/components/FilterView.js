import { SelectList } from "react-native-dropdown-select-list";
import { Button } from "react-native-paper";
import { Animated, StyleSheet, View } from "react-native";

import { colors, initialTicketFilterState } from "../constants/constants";
import { useState } from "react";

const maxDropDownHeight = 100;
const defaultDateState = {
  key: initialTicketFilterState.DatePeriod,
  value: "",
};
const defaultStatusState = {
  key: initialTicketFilterState.StatusIds,
  value: "",
};

const FilterView = (props) => {
  const [selectedDate, setSelectedDate] = useState(defaultDateState);
  const [selectedStatus, setSelectedStatus] = useState(defaultStatusState);

  const onSelectDateHandler = (date) => {
    setSelectedDate(props.dates.find((d) => d.key === date));
  };

  const onSelectStatusHandler = (status) => {
    setSelectedStatus(props.statuses.find((s) => s.key === status));
  };

  // Empties selectedDate and selectedStatus states
  const resetState = () => {
    setSelectedDate(defaultDateState);
    setSelectedStatus(defaultStatusState);
  };

  const onCancelHandler = () => {
    resetState();
    props.cancel();
  };

  const onResetHandler = () => {
    resetState();
    props.reset();
  };

  const onConfirmHandler = () => {
    props.confirm(selectedDate?.key, selectedStatus?.key);
  };

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
        setSelected={(date) => onSelectDateHandler(date)}
        data={props.dates}
        defaultOption={selectedDate}
        save="key"
        placeholder="Select Time Period"
        search={false}
        maxHeight={maxDropDownHeight}
        boxStyles={[styles.bgWhite, styles.input]}
        dropdownStyles={styles.bgWhite}
      />
      <SelectList
        setSelected={(status) => onSelectStatusHandler(status)}
        data={props.statuses}
        defaultOption={selectedStatus}
        save="key"
        placeholder="Select Status"
        search={false}
        maxHeight={maxDropDownHeight}
        boxStyles={[styles.bgWhite, styles.input]}
        dropdownStyles={styles.bgWhite}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.innerButtonContainer}>
          <Button style={styles.button} mode="text" onPress={onCancelHandler}>
            Cancel
          </Button>
          <Button style={styles.button} mode="text" onPress={onResetHandler}>
            Reset
          </Button>
        </View>

        <Button
          style={styles.button}
          mode="elevated"
          onPress={onConfirmHandler}
        >
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
  button: {
    margin: "1%",
  },
  buttonContainer: {
    marginHorizontal: "10%",
  },
  innerButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default FilterView;
