import React, { useReducer,useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
const InternetStatusContext = React.createContext();

export const InternetStatusProvider = ({ children }) => {
    const netInfo = useNetInfo();


  return (
    <InternetStatusContext.Provider value={{'internet':netInfo.isConnected.toString()}}>
      {children}
    </InternetStatusContext.Provider>
  );
};

export default InternetStatusContext;
