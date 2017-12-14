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
    ScrollView
} from 'react-native';


const dimensions = require('Dimensions');


const LSMineCell = require('./LSMineCell');

const LSInnerCell = require('./LSInnerView');

const LSMineHeaderView = require('./LSMineHeaderView');


var LSMine = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    contentInset={{top:-400}}
                    contentOffset={{y:400}}
                >
                    <LSMineHeaderView/>
                    {this.renderSecondView()}
                    {this.renderThirdView()}
                </ScrollView>
            </View>
        );
    },

    renderSecondView(){
        return(
            <View>
                <LSMineCell
                    title='我的订单'
                    leftIcon='collect'
                    subTitle='查看全部订单'
                />
                <View style={styles.innerStyle}>
                    <LSInnerCell
                        icon='order1'
                        title='待付款'
                    />
                    <LSInnerCell
                        icon='order2'
                        title='待使用'
                    />
                    <LSInnerCell
                        icon='order3'
                        title='待评价'
                    />
                    <LSInnerCell
                        icon='order4'
                        title='退款/售后'
                    />
                </View>
            </View>

        )
    },

    renderThirdView(){
        return(
            <View>
                <View style={{marginTop:10}}>
                    <LSMineCell
                        title='我的钱包'
                        leftIcon='draft'
                        subTitle='账户余额：¥100'
                    />
                    <LSMineCell
                        title='抵用券'
                        leftIcon='like'
                        subTitle='0'
                    />
                </View>

                <View style={{marginTop:10}}>
                    <LSMineCell
                        title='积分商城'
                        leftIcon='card'
                    />
                </View>

                <View style={{marginTop:10}}>
                    <LSMineCell
                        title='今日推荐'
                        leftIcon='new_friend'
                        news={true}
                    />
                </View>

                <View style={{marginTop:10}}>
                    <LSMineCell
                        title='我要合作'
                        leftIcon='pay'
                        subTitle='轻松开店，招财进宝'
                    />
                </View>
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
    },
    innerStyle:{
        flex:1,
        flexDirection:'row',
        width:dimensions.get('window').width,
        height:60,
        backgroundColor:"white"
    },
    innerCell:{
        flex:1
    }

});

LSMine.navigationOptions = ({ navigation}) => ({
    header:null
})




module.exports = LSMine;