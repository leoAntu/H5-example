/**
 * Created by leo on 2017/5/24.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView
} from 'react-native';

const LSTopView = require('./LSMainTopView');
const LSHomeMiddleLeftView = require('./LSHomeTopMiddleView');
const LSHomeSecondView = require('./LSHomeSecondView');
const LSShopCenterView = require('./LSShopCenterView');
const LSHomeLike = require('./LSHomeLikeView');

var LSHome = React.createClass({

    render() {
        return (
            <ScrollView>

                <LSTopView/>

                <View style={{marginTop:10}}>
                    <LSHomeMiddleLeftView
                        callBack = {(data) => this.pushToDetail(data)}
                    />
                </View>

                <View style={{marginTop:10}}>
                    <LSHomeSecondView/>
                </View>

                <View style={{marginTop:10}}>
                    <LSShopCenterView
                        popToHome={(url)=>{this.pushToShopDetail(url)}}
                    />
                </View>

                <View style={{marginTop:10}}>
                    <LSHomeLike
                    />
                </View>

            </ScrollView>
        );
    },
    pushToDetail(data){

        this.props.navigation.navigate('Detail',{
            title:'哈哈哈'
        })
    },
    pushToShopDetail(url){

    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerViewStyle:{
        width:70,
        height:30,
        marginRight:10
    },
    headerLeftStyle:{
        position:'absolute',
        left:0,
        width:30,
        height:30,

    },
    headerRightStyle:{
        position:'absolute',
        right:0,
        width:30,
        height:30,

    },
    textInputStyle:{
        position:'absolute',
        width:280,
        height:20,
        backgroundColor:'white',
        borderRadius:10,
        left:-160,
        bottom:-10
    },
    headerTextStyle:{
        color:'white',
        marginLeft:10
    }

});


LSHome.navigationOptions = ({ navigation}) => ({
    headerTitle: (
        <View>
            <TextInput style={styles.textInputStyle}/>
        </View>
    ),

    headerLeft: (
        <TouchableOpacity>
                <Text style={styles.headerTextStyle}>广州</Text>
        </TouchableOpacity>
    ),
    headerRight:(
        <View style={styles.headerViewStyle}>
            <TouchableOpacity>
                <Image source={{uri:'icon_homepage_message'}} style={styles.headerLeftStyle}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={{uri:'icon_homepage_scan'}} style={styles.headerRightStyle}/>
            </TouchableOpacity>
        </View>
    ),
})

module.exports = LSHome;