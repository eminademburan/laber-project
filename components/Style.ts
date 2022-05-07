import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
    waitingContainer: {
      padding: 60,
      flex: 0.6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d3e0e0',
      borderRadius: 25,
    },
    waitingText: {
      flex: 0.3,
      justifyContent: 'center',
      fontSize: 20,
    },
    TextInput: {
      flex: 0.2,
      padding: 10,
    },
    stretch: {
      flex: 0.4,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    container2: {
      flex: 1.0,
      backgroundColor: '#fff',
    },
    bos: {
      flex: 0.2,
    },
    loginBtn: {
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      backgroundColor: '#32a8a8',
      height: 90,
      width: 90,
    },
    aralik: {
      flex: 0.2,
      flexDirection: 'row',
    },
    inputView: {
      backgroundColor: '#d3e0e0',
      borderRadius: 30,
      width: '70%',
      height: 45,
      marginBottom: 20,
      alignItems: 'center',
    },
    nextButtonLeft: {
      flex: 0.3,
      width: '50%',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 50,
      backgroundColor: '#00CED1',
    },
    nextButtonRight: {
      flex: 0.5,
      width: '50%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 10,
      marginTop: 40,
      marginLeft: 80,
      backgroundColor: '#00CED1',
    },
    forgot_button: {
      marginBottom: 20,
    },
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
});
