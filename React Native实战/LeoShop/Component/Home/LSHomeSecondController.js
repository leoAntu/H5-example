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
    Image,
    TouchableOpacity,
    ListView,
    ScrollView

} from 'react-native';

const screnW = require('Dimensions').get('window').width;


var LSHomeSecondController = React.createClass({

    getDefaultProps(){
        return{

        }
    },

    getInitialState(){

        return{


        }
    },

    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>this.onClick()}>
                    <Text>{this.props.navigation.state.params.title}</Text>

                </TouchableOpacity>
            </View>
        );
    },

    onClick(){
        this.props.navigation.goBack();
    },


});

const styles = StyleSheet.create({

    viewStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:screnW,
        height:80,
        backgroundColor:'white',
        alignItems:'center',
        padding:10
    }


});

LSHomeSecondController.navigationOptions = ({ navigation}) => ({
    title: `chat with ${navigation.state.params.title}`,
})

module.exports = LSHomeSecondController;