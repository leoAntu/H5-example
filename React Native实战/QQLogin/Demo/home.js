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

var LocalData = require('../Demo/LocalData.json');

var ScrollViewImg = require('../Demo/ScrollViewImage');

var HomeNewsDetail = require('../Demo/HomeNewsDetail')

var Home = React.createClass({
    getDefaultProps(){
        return {
            url_api: "http://c1.m.163.com/nc/article/headline/T1348647853363/0-20.html?from=toutiao&fn=2&passport=&devId=nTM86EPlcxZu09VdpTEh6aR3%2B%2FQX6x8vHBD3ne3k5bbgOrg%2FIP5DcguSDmtYyWbs&size=20&version=8.1&spever=false&net=wifi&lat=5OtqEKiivwW4K%2BGMt6DBdA%3D%3D&lon=jKlRVyYkSNti2wwsjGQHrw%3D%3D&ts=1463384311&sign=TtD7IZllDljVzBs2E4sa9fQyKTKF021w2EUC6qx1gEN48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore",
            key_word: 'T1348647853363'
        }
    },

    getInitialState(){
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1, r2) => r1 != r2
            }),
            adArr: []
        };
    },

    render(){
        return(
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRowData}
                    renderHeader={this.renderHeader}
                />

        );
    },

    renderHeader() {

        if(this.state.adArr.length == 0) return;
        return(
            <ScrollViewImg
                imgData = {this.state.adArr}
            />
        );
    },

    renderRowData(rowData){
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() =>this.pushToNewsDetail(rowData) }>
                <View style={styles.cellStyle}>
                    <Image source={{uri:rowData.imgsrc}} style={styles.imgStyle}></Image>
                    <View style={styles.rightStyle}>
                        <Text style={styles.titleStyle}>{rowData.title}</Text>
                        <Text style={styles.subTitleStyle}>{rowData.digest}</Text>
                        <Text style={styles.flowTitleStyle}>{rowData.replyCount}跟帖</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

    },

    pushToNewsDetail(rowData) {
        this.props.navigator.push({
            component:HomeNewsDetail,
            title:rowData.title,
            passProps:{rowData}
        })
    },


    // 请求网络数据
    componentDidMount(){
        this.loadDataFromNet();
    },
    loadDataFromNet(){
        fetch(this.props.url_api)
            .then((response)=>response.json())
            .then((responseData)=>{
                // 拿到所有的数据
                var jsonData = responseData[this.props.key_word];
                // 处理网络数据
                this.dealWithData(jsonData);
                console.log('111');
            })
            .catch((error)=>{
                if(error){
                    // 拿到所有的数据
                    var jsonData = LocalData[this.props.key_word];
                    // 特殊处理
                    this.dealWithData(jsonData);
                    console.log('2222');
                }

            })

    },

    dealWithData(data){

        var adArr1 = [];
        var dataArr = [];

        for(var i = 0 ; i<data.length ; i++) {
            if (data[i].hasAD == 1) {
                adArr1 = data[i].ads;
            } else {
                dataArr.push(data[i]);
            }
        }
        
        
        console.log(adArr1,dataArr);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataArr),
            adArr:adArr1
        })


    },
});


// 设置样式
const  styles = StyleSheet.create({
    outerViewStyle:{
        //占满窗口
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    imgStyle:{
        width:90,
        height:90
    },

    cellStyle:{
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderBottomColor:'#e8e8e8',
        padding:10
    },

    rightStyle:{
        width:260,
        marginLeft:10
    },

    flowTitleStyle:{
        position:'absolute',
        right:0,
        bottom:0
    },

    titleStyle:{
        fontSize:16,
        marginBottom:5
    },

    subTitleStyle:{
        color:'gray'
    },

});


module.exports = Home;