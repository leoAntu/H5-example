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
    Platform

} from 'react-native';


var LSMineHeaderView = React.createClass({

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
                <View style={styles.container}>
                    {this.renderTopView()}
                    {this.renderBottomView()}
                </View>

        );
    },

    renderTopView(){
        return(
            <View style={styles.topViewStyle}>
                <View style={styles.leftViewStyle}>
                    <Image source={{uri:'see'}} style={{width:60,height:60,borderRadius:30}}/>
                    <View style={styles.middleViewStyle}>
                        <Text style={{fontSize:22,color:'white'}}>Leo商城</Text>
                        <Image source={{uri:'avatar_vip'}} style={{width:15,height:15,marginLeft:2}}/>
                    </View>
                </View>
                <TouchableOpacity>
                    <Image source={{uri:'icon_cell_rightArrow'}} style={{width:8,height:13,marginRight:12}}/>
                </TouchableOpacity>
            </View>
        )
    },

    renderBottomView(){

        return (
            <View style={styles.bottomViewStyle}>
                {this.renderBottomSubView()}
            </View>
        )
    },

    renderBottomSubView(){
        var dataArr= [{number:100,title:'Leo券'},{number:12,title:'评价'},{number:50,title:'收藏'}];
        var subArr = [];
        for (var i = 0; i < dataArr.length; i++){
            subArr.push(
                <TouchableOpacity key={i}>
                    <View style={styles.bottomSubViewStyle} >
                        <Text style={{marginBottom:3,color:'white',fontSize:17}}>{dataArr[i].number}</Text>
                        <Text style={{color:'white',fontSize:17}}>{dataArr[i].title}</Text>
                    </View>
                </TouchableOpacity>

            )
        }

        return subArr;
    }

});

const dimensions = require('Dimensions');

const styles = StyleSheet.create({

    container:{
        width:dimensions.get('window').width,
        height:Platform.OS == 'ios' ? 600:200,
        backgroundColor:'red',
    },

    topViewStyle:{
        width:dimensions.get('window').width,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:Platform.OS == 'ios' ? 480:80
    },
    leftViewStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:12

    },
    middleViewStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:8
    },

    bottomViewStyle:{
        flexDirection:'row',
        position:'absolute',
        bottom:0,
    },

    bottomSubViewStyle:{
        width:dimensions.get('window').width/3,
        height:50,
        justifyContent:'center',
        alignItems:'center',
         borderRightWidth:1,
        borderRightColor:'white',
        backgroundColor:'rgba(255,255,255,.4)',
        // backgroundColor:'gray',

    }
});

module.exports = LSMineHeaderView;