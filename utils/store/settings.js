import { AsyncStorage } from 'react-native';

export var settingToken = ""
export var setting = {}

export var SettingsStore = {
    save: function(key, val){
        return AsyncStorage.setItem(key, val);
    },

    delete: async function(key) {
        try {
          await AsyncStorage.removeItem(key);
          return true;
        }
        catch(exception) {
          return false;
        }
    },

    get: async function(key){
        var settingString = await AsyncStorage.getItem(key)
        if (settingString != null){
            return settingString
        }else{
            return null
        }
    },
}