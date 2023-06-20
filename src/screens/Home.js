import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Animated, Dimensions, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Loading from "../components/Loading";
import { getParameters, getTickets } from "../store/actions/ticketActions";
import {
  colors,
  filterActions,
  initialTicketFilterState,
  screens,
} from "../constants/constants";
import { Divider, IconButton, Text } from "react-native-paper";
import { getDropdownData } from "../constants/functions";
import FilterView from "../components/FilterView";
import TicketList from "../components/TicketList";
import { StyleSheet } from "react-native";
import CAFMButton from "../components/CAFMButton";

const screenHeight = Dimensions.get("screen").height;

const filterReducer = (state, action) => {
  switch (action.type) {
    case filterActions.updateDateAndStatus: {
      return {
        ...state,
        DatePeriod: action.payload.date,
        StatusIds: action.payload.status,
        showFilters: false,
        PageIndex: 0,
      };
    }

    case filterActions.nextPage: {
      return { ...state, PageIndex: state.PageIndex + 1 };
    }

    case filterActions.prevPage: {
      return { ...state, PageIndex: state.PageIndex - 1 };
    }

    case filterActions.closeFilters: {
      return { ...state, showFilters: false };
    }

    case filterActions.openFilters: {
      return { ...state, showFilters: true };
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
    const fetchTickets = () => {
      try {
        const filters = {
          DatePeriod: filterState.DatePeriod,
          FromDate: "",
          ToDate: "",
          PageIndex: filterState.PageIndex,
          PageSize: 25,
          SearchKey: "",
          SiteIds: "",
          LocationIds: "",
          StatusIds: filterState.StatusIds,
          SortBy: "TicketDate",
          SortOrder: -1,
          TicketId: 0,
          LoggedUserId: user.ProfileId,
          LicenseeId: user.LicenseeId,
        };
        dispatch(getTickets(filters));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTickets();
  }, [
    isFocused,
    filterState.PageIndex,
    filterState.DatePeriod,
    filterState.StatusIds,
  ]);

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
      setDateDropdown(getDropdownData(dates, "ParameterNo", "ParameterValues")),
    [dates]
  );

  useEffect(
    () =>
      setStatusDropdown(
        getDropdownData(statuses, "ParameterNo", "ParameterValues")
      ),
    [statuses]
  );

  const addEditTicket = (ticket = undefined) => {
    if (ticket) {
      props.navigation.navigate(screens.addEditTicket, { ticketInfo: ticket });
    } else props.navigation.navigate(screens.addEditTicket);
  };

  const cancelTicket = (ticket) => {
    console.log(ticket.TicketId);
  };

  const showFilters = (show) => {
    Animated.timing(filtersPosition, {
      toValue: show ? 0 : screenHeight,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // toggles showFilter field
  const toggleFilters = () => {
    if (filterState.showFilters) {
      showFilters(false);
      filterDispatch({ type: filterActions.closeFilters });
    } else {
      showFilters(true);
      filterDispatch({ type: filterActions.openFilters });
    }
  };

  const filter = (date, status) => {
    showFilters(false);

    filterDispatch({
      type: filterActions.updateDateAndStatus,
      payload: { date: date, status: status },
    });
  };

  const resetFilters = () => {
    filterDispatch({
      type: filterActions.updateDateAndStatus,
      payload: {
        date: initialTicketFilterState.DatePeriod,
        status: initialTicketFilterState.StatusIds,
      },
    });

    showFilters(false);
    filterDispatch({ type: filterActions.closeFilters });
  };

  const cancelFilters = () => {
    showFilters(false);
    filterDispatch({ type: filterActions.closeFilters });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.welcomeText}>
          Welcome, {user?.FirstName}
        </Text>
        <Text variant="bodyMedium">{`${user?.LocationName}, ${user?.SiteName}`}</Text>
        <View style={styles.buttonView}>
          <View>
            <CAFMButton
              mode="contained"
              theme="primary"
              icon="filter-variant"
              onPress={toggleFilters}
              style={styles.filterButton}
            >
              {filterState.showFilters ? "Hide" : "Show"} Filters
            </CAFMButton>
          </View>
          <IconButton
            mode="contained"
            icon="plus"
            containerColor={colors.green}
            iconColor={colors.white}
            size={22}
            onPress={() => addEditTicket()}
          />
        </View>
      </View>
      <Divider horizontalInset bold />

      <View style={styles.container}>
        {isLoading ? (
          <Loading large />
        ) : (
          <TicketList
            editTicket={(ticket) => addEditTicket(ticket)}
            cancelTicket={(ticket) => cancelTicket(ticket)}
            tickets={tickets}
            page={filterState.PageIndex + 1}
            prevPage={() => filterDispatch({ type: filterActions.prevPage })}
            nextPage={() => filterDispatch({ type: filterActions.nextPage })}
          />
        )}

        <FilterView
          filtersPosition={filtersPosition}
          dates={dateDropDown}
          statuses={statusDropDown}
          confirm={(date, status) => filter(date, status)}
          reset={resetFilters}
          cancel={cancelFilters}
        />
      </View>
    </View>
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
