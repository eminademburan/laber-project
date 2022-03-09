import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import axios from "axios";

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

    state =
        {
            name: "",
            surname: "",
            phone: "",
            email: "",
            age:"",
            region:"",
            language:"",
            password:"",
            link:"",
        };

    constructor(props) {
        super(props);

    }

    handleEmail1 = text => {
        this.setState({email: text});
    };

    handlePassword1 = text => {
        this.setState({password: text});
    };

    handleName = text => {
        this.setState({name: text});
    };

    handleSurname = text => {
        this.setState({surname: text});
    };

    handlePhone = text => {
        this.setState({phone: text});
    };

    handleAge = text => {
        this.setState({age: text});
    };

    handleRegion = text => {
        this.setState({region: text});
    };

    handleLanguage = text => {
        this.setState({language: text});
    };

    handleLink = text => {
        this.setState({link: text});
    };

    handleSignup = () => {
        axios.get('http://10.0.2.2:5000/add_user/' + this.state.email + "/" + this.state.name + "/"+ this.state.surname +"/"+this.state.phone+"/"+
            this.state.age+"/"+this.state.region+"/"+this.state.language+"/"+this.state.password+"/"+this.state.link).then(response => {

            if( response.data.message == "success")
            {
                alert("your account has been created");
                this.props.navigation.navigate('Home');
            }
            else if( response.data.message == "failed") {
                alert("your account could not be created");
                this.props.navigation.navigate('SignUp');
            }
        });

    };

    render( ){
        return(

            <View style={styles.container}>

                <View style = {styles.row}>
                    <View style = {styles.inputView2}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Name"
                            placeholderTextColor="#003f5c"
                            onChangeText={this.handleName}
                        />
                    </View>
                    <View style = {styles.inputView2}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Surname"
                            placeholderTextColor="#003f5c"
                            onChangeText={this.handleSurname}
                        />
                    </View>
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Phone"
                        placeholderTextColor="#003f5c"
                        onChangeText={this.handlePhone}
                    />
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email address"
                        placeholderTextColor="#003f5c"
                        keyboardType={'email-address'}
                        onChangeText={this.handleEmail1}
                    />
                </View>

                <View style = {styles.row}>
                    <View style = {styles.inputView2}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Age"
                            placeholderTextColor="#003f5c"
                            onChangeText={this.handleAge}
                        />
                    </View>
                    <View style = {styles.inputView2}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Region"
                            placeholderTextColor="#003f5c"
                            onChangeText={this.handleRegion}
                        />
                    </View>
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Language"
                        placeholderTextColor="#003f5c"
                        onChangeText={this.handleLanguage}
                    />
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={this.handlePassword1}
                    />
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Invitation Link"
                        placeholderTextColor="#003f5c"
                        onChangeText={this.handleLink}
                    />
                </View>



                <View style = {styles.loginBtn}>
                    <Button title = "Sing In" onPress={ this.handleSignup}  />
                </View>
            </View>

        )
    }



}

export default SignUp;

