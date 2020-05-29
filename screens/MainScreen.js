import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Go to Simple Functional Comp Screen"
          onPress={() => props.navigation.navigate("SimpleFunc")}
        />
      </View>
      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Go to Simple Class Comp Screen"
          onPress={() => props.navigation.navigate("SimpleClass")}
        />
      </View>
      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Go to Simple Web View Screen"
          onPress={() => props.navigation.navigate("WebApp")}
        />
      </View>

      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Go to Simple Video Screen"
          onPress={() => props.navigation.navigate("Video")}
        />
      </View>

      <View>
        <Button
          style={styles.btnInput}
          title="Go to Simple Reducer Screen"
          onPress={() => props.navigation.navigate("Reducer")}
        />
      </View>
   
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: "MainScreen",
};

const styles = StyleSheet.create({
  btnInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
  },
});

export default HomeScreen;
