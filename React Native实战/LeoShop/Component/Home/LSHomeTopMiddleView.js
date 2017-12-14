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

var middleData = require('../../LocalData/HomeTopMiddleLeft.json');

var MiddleRightView = require('./LSHomeTopMiddleRightView');

var LSHomeMiddleView = React.createClass({

    getDefaultProps(){
        return{
            callBack:null
        }
    },

    getInitialState(){

        return{
        }
    },

    render() {
        return (
            <View style={styles.viewStyle}>
                {this.renderMiddleLeftView()}
                <View >
                    {this.renderMiddleRightView()}
                </View>
            </View>

        );
    },

    renderMiddleLeftView(){

        var leftData = middleData.dataLeft[0];

        return(
            <TouchableOpacity>
                <View style={styles.leftViewStyle}>
                    <Image source={{uri:leftData.img1}} style={{height:20,width:60}}></Image>
                    <Image source={{uri:leftData.img2}} style={{height:20,width:60,marginTop:3}}></Image>
                    <Text>{leftData.title}</Text>
                    <View style={styles.leftSubViewStyle}>
                        <Text style={{color:'green',marginRight:3,fontSize:10}}>{leftData.price}</Text>
                        <Text style={{color:'red',fontSize:13,backgroundColor:'yellow'}}>{leftData.sale}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        );

    },
    renderMiddleRightView(){

        var rightData = middleData.dataRight;
        var viewArr =[];
        for (var i = 0; i < rightData.length; i++) {
            var  data = rightData[i];
            viewArr.push(
                <MiddleRightView
                    title={data.title}
                    subTitle={data.subTitle}
                    rightIcon={data.rightImage}
                    color={data.titleColor}
                    key={i}
                    callBackCell={(data)=> this.props.callBack(data)}
                />
            )
        }
        return viewArr;
    }



});

const styles = StyleSheet.create({

    leftViewStyle:{
        width:screnW/2 -1,
        height:100,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:1,
        borderRightColor:'#dddddd'
    },
    leftSubViewStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:3
    },

    viewStyle:{
        flexDirection:'row',
        overflow:'hidden',
        height:100,
    }

});

module.exports = LSHomeMiddleView;