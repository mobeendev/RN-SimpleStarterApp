import React from "react";
import { StyleSheet, View, Text, Alert, Button } from "react-native";
import * as Calendar from "expo-calendar";

const TIME_ZONE = "Asia/Qatar";

const CalendarScreen = () => {
  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(
      (each) => each.source.name === "iCloud"
    );
    // console.log(calendars);
    return defaultCalendars[0].source;
  }

  async function createCalendar() {
    let calendarId = null;

    const calendarEvent = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    // console.log("calendarEvent",  calendarEvent);
    const existingOxfitnessLabCalendar = calendarEvent.filter(
      (calendar) => calendar.title == "MyPlans Agenda"
    );

    // console.log(existingOxfitnessLabCalendar.length);
    if (existingOxfitnessLabCalendar.length > 0) {
      existingOxfitnessLabCalendar.map((exist) => {
        if (exist.id) {
          calendarId = exist.id;
        }
      });
    } else {
      const defaultCalendarSource =
        Platform.OS === "ios"
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: "MyPlanAgenda" };

      calendarId = await Calendar.createCalendarAsync({
        title: "MyPlans Agenda",
        color: "blue",
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: "internalCalendarName",
        ownerAccount: "personal",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
    }

    let event_id = Math.floor(Math.random() * 60);

    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() + event_id * 60 * 1000);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    console.log(`weekly event - ${event_id}`);
    //
    let eventDetails = {
      title: `My event - ${event_id}`,
      startDate,
      endDate,
      url: "https://mywebsite.com",
      organizer: "Our Event ORganizer Lab",
      organizerEmail: "abc@something.com",
      alarms: [{ relativeOffset: -5, method: Calendar.AlarmMethod.ALERT }],
      location: "Gate Mall, Doha Qatar",
      notes: `Lorem Ipsum: usage Lorem ipsum is a pseudo-Latin text used in web design, typography, 
      layout, and printing in place of English to
       emphasise design elements over content.`,
      recurrenceRule: {
        frequency: Calendar.Frequency.WEEKLY,
        occurrence: 1,
      },
    };
    // return;
    try {
      const eventId = await Calendar.createEventAsync(calendarId, eventDetails);

      Calendar.updateEventAsync(eventId, {
        alarms: [
          {
            relativeOffset: -5,
            method: Calendar.AlarmMethod.ALERT,
          },
        ],
      });
      console.log(
        `Events added to your calander  #  , ${eventId}, - -, ${calendarId}`
      );
    } catch (e) {
      console.log({ e });
    }
  }
  return (
    <View style={styles.container}>
      <Text> Calendar Component </Text>
      <Button title="Add to Calendar" onPress={createCalendar} />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
