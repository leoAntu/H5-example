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
    ListView,
    Image,
    TouchableOpacity
} from 'react-native';

// 导入外部的json数据

var Demo = require('./Demo/main');

var QQLogin = React.createClass({


    // 复杂的操作:数据请求 或者 异步操作(定时器)


    render(){
        return(
            <View style={styles.outerViewStyle}>
                <Demo/>
            </View>

        );
    },


});


// 设置样式
const  styles = StyleSheet.create({
    outerViewStyle:{
        //占满窗口
        flex:1
    },

    headerViewStyle:{
        height:64,
        backgroundColor:'orange',

        justifyContent:'center',
        alignItems:'center'
    },

    rowStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // 侧轴方向居中
        alignItems:'center',
        padding:10,

        borderBottomColor:'#e8e8e8',
        borderBottomWidth:0.5
    },

    rowImageStyle:{
        width:70,
        height:70,
    },

    sectionHeaderViewStyle:{
        backgroundColor:'#e8e8e8',
        height:25,

        justifyContent:'center'
    }
});


AppRegistry.registerComponent('QQLogin', () => QQLogin);
