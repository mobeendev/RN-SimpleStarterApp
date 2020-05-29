import React, { useReducer } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const initialState = { count: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}

const ReducerScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      <Text> {state.count}</Text>
      <Button
        style={styles.btnInput}
        title="Increment by 5"
        onPress={() => {
          dispatch({ type: "increment", payload: 5 });
        }}
      />
      <Button
        style={styles.btnInput}
        title="Decrement by 3"
        onPress={() => {
          dispatch({ type: "decrement", payload: 3 });
        }}
      />
    </View>
  );
};

export default ReducerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  btnInput: {
    backgroundColor: "#00aeef",
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 15,
  },
});
