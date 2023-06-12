import { StyleSheet } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import { colors, statusColorIds } from "../constants/constants";

const Ticket = (props) => {
  const ticket = props.ticket;

  const statusColor = statusColorIds[ticket.TicketStatus];
  const textVariant = "bodyMedium";

  return (
    <Card type="elevated" style={styles.card}>
      <Card.Title
        title={`#${ticket.TicketNo}`}
        right={(props) => (
          <Text style={[styles.statusText, { color: statusColor }]} {...props}>
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
        <Button mode="elevated" onPress={() => props.onPressEdit(ticket)}>
          Edit
        </Button>
        <Button mode="text">Cancel</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors.green,
    marginVertical: "2%",
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

export default Ticket;
