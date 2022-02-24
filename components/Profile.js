import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#32a8a8",
    },
    headerContent:{
        padding:30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
    },
    name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
    },
    profileDetail:{
        alignSelf: 'center',
        marginTop:200,
        alignItems: 'center',
        flexDirection: 'row',
        position:'absolute',
        backgroundColor: "#ffffff"
    },
    detailContent:{
        margin:10,
        alignItems: 'center'
    },
    title:{
        fontSize:20,
        color: "#00CED1"
    },
    count:{
        fontSize:18,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
        marginTop:40
    },
    textInfo:{
        fontSize:18,
        marginTop:20,
        color: "#696969",
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00CED1",
    },
    description:{
        fontSize:20,
        color: "#00CED1",
        marginTop:10,
        textAlign: 'center'
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width:1, height:1},
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: 'white',
    },
});

class Profile extends React.Component{

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar2.png'}}/>
                        <Text style={styles.name}>
                            {this.props.route.params.mail}
                        </Text>
                    </View>
                </View>

                <View style={styles.profileDetail}>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Photos {'\u0024'}</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Followers {'\u20BF'}</Text>

                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Score: 54.7</Text>
                    </View>
                </View>

                <View style={{alignItems:'center', paddingTop: 50}}>
                    <Stars
                        rating={3.4}
                        count={5}
                        half={true}
                        fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
                        emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
                        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
                    />
                </View>

                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Friend Requests</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }



}

export default Profile;

