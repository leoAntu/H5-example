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
    ScrollView
} from 'react-native';


var CommentCell = require('./LSCommentCell');

var LSMore = React.createClass({
    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                    <View style={{marginTop:20}}>
                        <CommentCell title='扫一扫'/>
                    </View>

                    <View style={{marginTop:20}}>
                        <CommentCell
                            title='扫一扫'
                            isSwitch={true}
                        />

                        <CommentCell
                            title='省流量模式'
                        />
                        <CommentCell
                            title='消息提醒'
                        />
                        <CommentCell
                            title='邀请好友使用'
                        />
                        <CommentCell
                            title='情况缓存'
                            subTitle='1.99M'
                        />
                    </View>


                    <View style={{marginTop:20}}>
                        <CommentCell
                            title='意见反馈'
                        />

                        <CommentCell
                            title='问卷调查'
                        />
                        <CommentCell
                            title='支付帮助'
                        />
                        <CommentCell
                            title='网络诊断'
                        />
                        <CommentCell
                            title='关于团购'
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#E8E8E8',
    },

    moreHeaderRightStyle:{
        width:30,
        height:30,
        marginRight:10

    },

});


LSMore.navigationOptions = ({ navigation}) => ({

    headerRight:(
        <TouchableOpacity>
            <Image source={{uri:'icon_mine_setting'}} style={styles.moreHeaderRightStyle}/>
        </TouchableOpacity>
    ),
    headerStyle:{backgroundColor:'rgba(255,96,0,1.0)'},


});



module.exports = LSMore;