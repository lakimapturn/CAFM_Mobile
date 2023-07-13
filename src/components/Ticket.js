import { memo } from "react";
import { StyleSheet } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

import { colors, statusColorIds } from "../constants/constants";
import CAFMButton from "./CAFMButton";

const Ticket = (props) => {
  const ticket = props.ticket;

  const statusColor = statusColorIds[ticket.TicketStatus];
  const textVariant = "bodyMedium";

  return (
    <Card type="elevated" style={styles.card}>
      <Card.Title
        title={`#${ticket.TicketNo}`}
        titleVariant="titleLarge"
        right={(props) => (
          <Text
            variant="bodyLarge"
            style={[styles.statusText, { color: statusColor }]}
            {...props}
          >
            {ticket.TicketStatusText}
          </Text>
        )}
      />
      <Divider horizontalInset bold style={styles.divider} />
      <Card.Content>
        <Text variant={textVariant}>Issue: {ticket.IssueName}</Text>
        <Text variant={textVariant}>Reported By: {ticket.ReportedByName}</Text>
        <Text variant={textVariant}>Raised On: {ticket.TicketDate}</Text>
      </Card.Content>
      <Card.Actions>
        {ticket.TicketStatus !== 8 ? (
          <>
            <CAFMButton
              theme="secondary"
              mode="text"
              onPress={() => props.onPressEdit(ticket)}
            >
              Edit
            </CAFMButton>
            <CAFMButton
              theme="danger"
              mode="text"
              onPress={() => props.onPressCancel(ticket)}
            >
              Cancel
            </CAFMButton>
          </>
        ) : (
          <CAFMButton
            theme="secondary"
            mode="text"
            onPress={() => props.onPressView(ticket)}
          >
            View
          </CAFMButton>
        )}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors.green,
    marginBottom: "2%",
  },
  card: {
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  statusText: {
    textTransform: "uppercase",
    marginRight: "5%",
  },
});

export default memo(Ticket);
