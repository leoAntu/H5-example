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

var LSHomeSectionHeader = require('../More/LSHomeSetionHeaderView');

var Home_D5 = require('../../LocalData/XMG_Home_D5.json');

var LSMineCell = React.createClass({

    getDefaultProps(){
        return{
            popToHome:null
        }
    },

    getInitialState(){
        return{
        }
    },

    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                <LSHomeSectionHeader
                    icon={'gw'}
                    title={'购物中心'}
                    subTitle={'全部4家'}
                    indicator={'icon_cell_rightArrow'}
                />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {this.renderItem()}
                </ScrollView>
            </View>

        );
    },

    renderItem(){
        var itemArr = [];
        var dataArr = Home_D5.data;
        for (var i=0; i<dataArr.length; i++){
            var  data = dataArr[i];
            itemArr.push(
                <ScrollViewItem
                    url = {data.img}
                    title = {data.name}
                    sale = {data.showtext.text}
                    key={i}
                    detailUrl={data.detailurl}
                    popToCenter={(url)=>this.props.popToHome(url)}
                />
            )
        }
        return itemArr;
    }

});


var ScrollViewItem = React.createClass({

    getDefaultProps(){
        return{
            url:'',
            title:'',
            sale:'',
            detailUrl:'',
            popToCenter:null

        }
    },

    getInitialState(){
        return{
        }
    },

    render() {
        return (
           <TouchableOpacity onPress={()=>this.onClick(this.props.detailUrl)}>
               <View style={styles.containStyle}>
                   <View >
                       <Image source={{uri:this.props.url}} style={{width:120,height:70,borderRadius:5}}></Image>
                       <Text style={styles.textStyle}>{this.props.sale}</Text>
                   </View>
                   <Text style={{marginTop:10}}>{this.props.title}</Text>
               </View>
           </TouchableOpacity>

        );
    },

    onClick(url){

        if (url.length == 0) return;
        this.props.popToCenter(url);
    }


});
const styles = StyleSheet.create({
    containStyle:{
       margin:10,
       backgroundColor:'white'
    },
    textStyle:{
        position:'absolute',
        bottom:10,
        color:'white',
        backgroundColor:'orange',
        fontSize:12
    }
});

module.exports = LSMineCell;