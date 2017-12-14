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
var secondData = require('../../LocalData/HomeTopMiddle.json');
var LSHomeMiddleView = require('./LSHomeTopMiddleRightView');
var HomeData4 = require('../../LocalData/XMG_Home_D4.json');


var LSHomeSecondView = React.createClass({

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
                {this.renderContainView()}
                <View style={styles.bottomViewStyle}>
                    {this.renderBottomView()}
                </View>
            </View>
        );
    },

    renderContainView(){
        // {"title" : "最高立减25", "subTitle" : "速度参团", "image" : "nsj"}

        var data = secondData.data[0];
        return(
            <TouchableOpacity>
                <View style={styles.viewStyle}>
                    <View>
                        <Text style={{fontSize:25,color:'red'}}>{data.title}</Text>
                        <Text style={{fontSize:15,color:'gray',marginTop:4}}>{data.subTitle}</Text>
                    </View>
                    <Image source={{uri:data.image}} style={{width:150,height:50}}></Image>
                </View>
            </TouchableOpacity>

        )
    },

    renderBottomView(){
        var dataArr = HomeData4.data;
        var viewArr = [];
        for (var i = 0; i < dataArr.length; i++){
            var data = dataArr[i];
            var url = '';
            if (data.imageurl.search('w.h') == -1){
                url = data.imageurl;
            } else {
                url = data.imageurl.replace('w.h','120.90')
            }
            viewArr.push(
                <LSHomeMiddleView
                    title={data.maintitle}
                    subTitle={data.title}
                    rightIcon={url}
                    color={data.typeface_color}
                    key={i}
                    callBackCell={(data) => {alert(data)}}
                />
            )
        }
        return viewArr;
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
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#dddddd'
    },

    bottomViewStyle:{
        flexDirection:'row',
        flexWrap:'wrap'
    }


});

module.exports = LSHomeSecondView;