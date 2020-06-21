import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Go to Website"
          onPress={() => props.navigation.navigate("WebApp")}
        />
      </View>
      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Main"
          onPress={() => props.navigation.navigate("Main")}
        />
      </View>
      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Starter"
          onPress={() => props.navigation.navigate("Starter")}
        />
      </View>
      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Camera"
          onPress={() => props.navigation.navigate("Camera")}
        />
      </View>

      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Video"
          onPress={() => props.navigation.navigate("Video")}
        />
      </View>

      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="Map"
          onPress={() => props.navigation.navigate("Map")}
        />
      </View>

      <View style={styles.btnInput}>
        <Button
          style={styles.btnInput}
          title="SignIn"
          onPress={() => props.navigation.navigate("SignIn")}
        />
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: "Home",
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
