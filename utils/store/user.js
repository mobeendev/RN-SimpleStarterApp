import { AsyncStorage } from 'react-native';

export var userToken = ""
export var user = {}

export var UserStore = {
    save: function(u){
        user = u
        return AsyncStorage.setItem('user', JSON.stringify(u));
    },

    clear: async function(){
        userToken = "";
        user = {};
        await AsyncStorage.clear();
    },

    get: async function(){
        await AsyncStorage.getItem('user')
            .then( response => {
                if (response != null){
                    return JSON.parse(userString)
                }else{
                    return {}
                }
            })
        
    },

    tokenSync: function(){
        var userString = AsyncStorage.getItem('user')
        if (userString != null){
            user = JSON.parse(userString)
            userToken = user.api_key
            return user.api_key
        }else{
            return  null
        }
    },

    token: async function(){
        
        var userString = await AsyncStorage.getItem('user')
        if (userString != null){
            user = JSON.parse(userString)
            userToken = user.api_key
            return user.api_key
        }else{
            return  null
        }
    },

    userId: async function(){
        var userString = await AsyncStorage.getItem('user')
        if (userString != null){
            var user = JSON.parse(userString)
            return user.id
        }else{
            return  null
        }
    }
}