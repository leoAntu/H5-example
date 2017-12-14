
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';


var Dimension = require('Dimensions');
var  {width} = Dimension.get('window');

var TimerMixin = require('react-timer-mixin');

var  imgData = require('./ImageData.json');

var ScrollViewDemo = React.createClass({

    mixins: [TimerMixin],

    getDefaultProps(){
        return{
            duration:1000,
        }
    },


    // 设置可变的和初始值
    getInitialState(){
        return{
            // 当前的页码
            currentPage: 0
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref = 'scrollView'
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onMomentumScrollEnd={(e)=>this.onScollEnd(e)}
                >
                    {this.getAllImageData()}
                </ScrollView>
                <View style={styles.cirleStyle}>
                    {this.getAllCircle()}
                </View>
            </View>
        );
    },

    componentDidMount(){
        this.onstart();
    },

    componentWillUnmount(){

       this.timer && this.clearInterval(this.timer);
    },

    onstart(){

        var len = imgData.data.length;
        var scrollView = this.refs.scrollView;

        this.timer = this.setInterval(function(){

            var activePage = 0;
            // 2.2 判断
            if((this.state.currentPage+1) >= imgCount){ // 越界
                activePage = 0;
            }else{
                activePage = this.state.currentPage+1;
            }

            // 2.3 更新状态机
            this.setState({
                currentPage: activePage
            });

            // 2.4 让scrollView滚动起来
            var offsetX = activePage * width;
            scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated:true});

        },this.props.duration);

    },

    onScollEnd(e){
        var offsetX = e.nativeEvent.contentOffset.x;
        var index = Math.floor(offsetX / width);

        this.setState({
            currentPage:index
        })
    },

    getAllImageData(){

        var imgArr = imgData.data;
        var tmpArr = [];
        for(var i = 0 ; i < imgArr.length; i++) {
            tmpArr.push(
                <Image  key={i} source={{uri:imgArr[i].img}} style={styles.imgStyle}></Image>
            );
        }

        return tmpArr;
    },

    getAllCircle(){

        var tmpArr = [];
        var len = imgData.data.length;

        for(var i = 0; i < len; i++){

            var colorStyle = (i==this.state.currentPage)?{'color':'white'}:{'color':'#000'};

            tmpArr.push(
                <Text key={i} style={[{fontSize:25},colorStyle]}>&bull;</Text>
            );
        }

        return tmpArr;

    },

});

const styles = StyleSheet.create({
    imgStyle:{
        width:width,
        height:200,
    },

    cirleStyle:{
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.4)',
        width:width,
        height:25,
        alignItems:'center',

        position:'absolute',
        bottom:0,
        left:0
    }

});

module.exports = ScrollViewDemo;



