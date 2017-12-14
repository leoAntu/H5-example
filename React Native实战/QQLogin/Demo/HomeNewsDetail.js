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
    WebView

} from 'react-native';

// 导入外部的json数据
// http://c.3g.163.com/nc/article/BMU8KHQD00964J4O/full.html


var HomeNewDetail = React.createClass({

    getDefaultProps(){
        return{

        }
    },

    getInitialState(){
        return{
            sourceData: ''
        }
    },
    render(){
        return(
            <WebView
                automaticallyAdjustContentInsets={true}
                style={styles.webView}
                source={{html: this.state.sourceData, baseUrl: ''}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={this.state.scalesPageToFit}
            />

        );
    },
    componentDidMount(){
        this.getData()
    },

    getData(){
        var url = 'http://c.3g.163.com/nc/article/' + this.props.rowData.docid + '/full.html';
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);

                var allData = responseData[this.props.rowData.docid];
                var bodyHtml = allData['body'];

                var imgArr = allData['img'];

                for (var  i = 0 ; i < imgArr.length ; i++){
                    var imgObj = imgArr[i];
                    var imgSrc = imgObj.src;
                    console.log(imgSrc);
                    var imgHtml = '<img src="' + imgSrc + '" width="400px" height="300px"/>';
                    bodyHtml =  bodyHtml.replace(imgObj.ref,imgHtml);

                    console.log(imgObj.ref);

                    console.log(imgHtml);

                    console.log(bodyHtml);
                }

                this.setState({
                    sourceData: bodyHtml
                })

            })

            .catch((error) =>{
                alert(error)
            } )
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
});


module.exports = HomeNewDetail;