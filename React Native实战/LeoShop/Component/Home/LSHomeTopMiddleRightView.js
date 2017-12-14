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


var LSHomeMiddleRightView = React.createClass({

    getDefaultProps(){
        return{
            title:'',
            subTitle:'',
            rightIcon:'',
            color:'',
            callBackCell:null
        }
    },

    getInitialState(){

        return{


        }
    },

    render() {
        return (
            <TouchableOpacity onPress={()=> this.onclick()}>
                <View style={styles.viewStyle}>
                    <View style={styles.leftStyle}>
                        <Text style={{color:this.props.color}}>{this.props.title}</Text>
                        <Text>{this.props.subTitle}</Text>
                    </View>
                    <Image source={{uri:this.props.rightIcon}} style={{width:80,height:50,resizeMode:'contain',flex:1}}></Image>
                </View>
            </TouchableOpacity>

        );
    },

    onclick(){
        if (this.props.callBackCell == null) return;
        this.props.callBackCell('ssss');
    }

});

const styles = StyleSheet.create({

    viewStyle:{
        height:50+1,
        width:screnW/2-1,
        backgroundColor:'white',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#dddddd',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:20,
        paddingRight:20,
        marginRight:1
    },
    leftStyle:{
        justifyContent:'center',
        alignItems:'center',
        flex:3
    },
    imageStyle:{
        flex:1,
    }

});

module.exports = LSHomeMiddleRightView;