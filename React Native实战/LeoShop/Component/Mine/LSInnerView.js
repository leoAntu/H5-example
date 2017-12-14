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

} from 'react-native';


var LSInnerCell = React.createClass({

    getDefaultProps(){
        return{
            icon:'',
            title:'',
        }
    },

    getInitialState(){
        return{
            isOn: false
        }
    },

    render() {
        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <Image source={{uri:this.props.icon}} style={{width:35,height:23,marginTop:10,marginBottom:5}}/>
                    <Text style={{fontSize:15,color:'#e8e8e8'}}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>

        );
    },


});

const dimensions = require('Dimensions');

const styles = StyleSheet.create({

    container:{
        alignItems:'center',
        justifyContent:'center',
        width:dimensions.get('window').width/4,
        height:60
    },




});

module.exports = LSInnerCell;