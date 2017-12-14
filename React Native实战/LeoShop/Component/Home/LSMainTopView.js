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
const topViewData = require('../../LocalData/TopMenu.json');

var  TopListView = require('./LSMainTopListView');

var LSMineCell = React.createClass({

    getDefaultProps(){
        return{

        }
    },

    getInitialState(){
        return{
            selectedCount:0
        }
    },

    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                <ScrollView

                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    horizontal={true}
                    onMomentumScrollEnd = {this.onScrollAnimationEnd}
                >

                    {this.renderScrollItem()}

                </ScrollView>

                <View style={styles.indicatorStyle}>
                    {this.renderIndicator()}
                </View>
            </View>


        );
    },

    onScrollAnimationEnd(e){

        var page = Math.floor(e.nativeEvent.contentOffset.x / screnW);
        this.setState({
            selectedCount:page
        })
    },

    renderScrollItem(){
        var arr = [];
        var colorArr = topViewData.data;

        for (var i = 0 ;i < colorArr.length; i++){
            arr.push(
                <TopListView dataArr={colorArr[i]} key={i}/>
            )
        }

        return arr;
    },
    renderIndicator(){
        var  indicatorArr = [];
        var color;

        for (var i = 0; i < 2; i++){
            color = this.state.selectedCount == i ? 'orange':'gray';

            indicatorArr.push(
                <Text key={i} style={{color:color,fontSize:25}}>&bull;</Text>
            )
        }
        return indicatorArr;
    },

});

const styles = StyleSheet.create({
    indicatorStyle:{
        position:'absolute',
        bottom:0,
        right:screnW/2-15,
        flexDirection:'row',
        backgroundColor:'rgba(255,255,255,0)'
    }
});

module.exports = LSMineCell;