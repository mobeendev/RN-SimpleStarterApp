import {StyleSheet} from 'react-native';

export const DefaultTheme = {
  "colorPrimary" : '#001BA2',
  "colorSecondary" : '#084BAE',
  "colorAccent" : '#084BAE',
  "textPrimaryColor" : '#0C0C0C',
  "textPrimaryInverseColor" : '#ffffff',
  "textSecondaryColor" : '#939393',
  "textTertiaryColor" : '#939393',
  "backgroundColor": "#ffffff",
  "menuHighlightColor": "#EB716B",

  "textTitleSize" : 20,
  "textContentSize" : 13,
}

export const CommonStyle = StyleSheet.create({
  button: {
    backgroundColor: "#001BA2",
    padding: 10,
    height: 50,
    width: "100%"
  },

  toolbarMenu: {
    paddingStart: 20,
  },

  navigationHeaderStyle:{
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0,
    elevation: 0,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: DefaultTheme.fontBold,
  },

   bgImageWrapper:{
     position: 'absolute',
     bottom: 0, left: 0,
     width: "100%",
     height: 100,
   },

   bgImage: {
        flex: 1,
        width: "100%",
        height: 100,
    },

  navigationHeaderStyleTransparent:{
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
})
