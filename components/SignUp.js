import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#32a8a8",
    },
    inputView: {
        backgroundColor: "#d3e0e0",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },
    inputView2: {
        backgroundColor: "#d3e0e0",
        borderRadius: 30,
        width: "35%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },
    row: {
        flexDirection: "row",
    },
});

class SignUp extends React.Component{

    render( ){
        return(

            <View style={styles.container}>

                <View style = {styles.row}>
                    <View style = {styles.inputView2}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Name"
                            placeholderTextColor="#003f5c"
                        />
                    </View>
                    <View style = {styles.inputView2}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Surname"
                            placeholderTextColor="#003f5c"
                        />
                    </View>
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Phone"
                        placeholderTextColor="#003f5c"
                    />
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email address"
                        placeholderTextColor="#003f5c"
                        keyboardType={'email-address'}
                    />
                </View>

                <View style = {styles.row}>
                    <View style = {styles.inputView2}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Age"
                            placeholderTextColor="#003f5c"
                        />
                    </View>
                    <View style = {styles.inputView2}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Region"
                            placeholderTextColor="#003f5c"
                        />
                    </View>
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Language"
                        placeholderTextColor="#003f5c"
                    />
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                    />
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Invitation Link"
                        placeholderTextColor="#003f5c"
                    />
                </View>



                <View style = {styles.loginBtn}>
                    <Button title = "Sing In" onPress={() => this.props.navigation.goBack()}  />
                </View>
            </View>

        )
    }



}

export default SignUp;

