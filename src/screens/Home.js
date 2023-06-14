import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Animated, Dimensions, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Loading from "../components/Loading";
import {
  getIssueList,
  getParameters,
  getTickets,
} from "../store/actions/ticketActions";
import {
  filterActions,
  initialTicketFilterState,
  screens,
} from "../constants/constants";
import { Button, Divider, IconButton, Text } from "react-native-paper";
import { getDropdownData } from "../constants/functions";
import FilterView from "../components/FilterView";
import TicketList from "../components/TicketList";
import { StyleSheet } from "react-native";

const filterReducer = (state, action) => {
  switch (action.type) {
    case filterActions.updateDate: {
      return { ...state, fromDate: new Date() - 1, toDate: new Date() };
    }

    case filterActions.nextPage: {
      return { ...state, PageIndex: state.PageIndex + 1 };
    }

    case filterActions.setStatusId: {
      return { ...state, StatusId: action.payload };
    }

    case filterActions.prevPage: {
      return { ...state, PageIndex: state.PageIndex - 1 };
    }

    case filterActions.toggleFilters: {
      return { ...state, showFilters: !state.showFilters };
    }

    case filterActions.showAnimationLoading: {
      return { ...state, animationLoading: action.payload };
    }

    case filterActions.reset: {
      return initialTicketFilterState;
    }

    default:
      return state;
  }
};

const screenHeight = Dimensions.get("screen").height;

const Home = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const isLoading = useSelector((state) => state.ticket.isFetching);
  const tickets = useSelector((state) => state.ticket.tickets);
  const user = useSelector((state) => state.user);
  const dates = useSelector((state) => state.ticket.dates);
  const statuses = useSelector((state) => state.ticket.statuses);

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialTicketFilterState
  );

  const [dateDropDown, setDateDropdown] = useState([]);
  const [statusDropDown, setStatusDropdown] = useState([]);

  const filtersPosition = useState(new Animated.Value(screenHeight))[0];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(getTickets(filterState));
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [isFocused, filterState.PageIndex]);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        await dispatch(getParameters());
      } catch (error) {
        console.log(error);
      }
    };
    fetchParameters();
  }, []);

  useEffect(
    () =>
      setDateDropdown(getDropdownData(dates, "ParameterId", "ParameterValues")),
    [dates]
  );

  useEffect(
    () =>
      setStatusDropdown(
        getDropdownData(statuses, "ParameterId", "ParameterValues")
      ),
    [statuses]
  );

  const addEditTicket = (ticket = undefined) => {
    if (ticket) {
      props.navigation.navigate(screens.addEditTicket, { ticketInfo: ticket });
    } else props.navigation.navigate(screens.addEditTicket);
  };

  const onSelect = (type, payload) => {
    filterDispatch({ type: type, payload: payload });
  };

  const toggleFilters = () => {
    Animated.timing(filtersPosition, {
      toValue: filterState.showFilters ? screenHeight : 0,
      duration: 700,
      useNativeDriver: true,
    }).start();

    filterDispatch({ type: filterActions.toggleFilters });
  };

  const filter = async () => {
    try {
      await dispatch(getTickets(filterState));
    } catch (error) {
      console.log(error);
    }
    toggleFilters();
  };

  const cancelFilters = () => {
    toggleFilters();
    filterDispatch({ type: filterActions.reset });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.welcomeText}>
              Welcome, {user?.FirstName}
            </Text>
            <Text variant="bodyMedium">{`${user?.LocationName}, ${user?.SiteName}`}</Text>
            <View style={styles.buttonView}>
              <View>
                <Button
                  mode="elevated"
                  icon="filter-variant"
                  onPress={toggleFilters}
                  style={styles.filterButton}
                >
                  {filterState.showFilters ? "Hide" : "Show"} Filters
                </Button>
              </View>
              <IconButton
                mode="contained"
                icon="plus"
                size={22}
                onPress={() => addEditTicket()}
              />
            </View>
          </View>
          <Divider horizontalInset bold />
          <View style={styles.container}>
            <TicketList
              editTicket={(ticket) => addEditTicket(ticket)}
              tickets={tickets}
              page={filterState.PageIndex + 1}
              prevPage={() => filterDispatch({ type: filterActions.prevPage })}
              nextPage={() => filterDispatch({ type: filterActions.nextPage })}
            />

            <FilterView
              filtersPosition={filtersPosition}
              dates={dateDropDown}
              statuses={statusDropDown}
              onSelect={(type, payload) => onSelect(type, payload)}
              confirm={filter}
              cancel={cancelFilters}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: "3%",
    display: "flex",
    alignItems: "center",
  },
  welcomeText: {
    fontWeight: "bold",
  },
  filterButton: {
    marginTop: "1.5%",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Home;
