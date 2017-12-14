'use strict';
import Timeago from './libs/timeago.min.js';

/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 */
const fmtDate = (date, fmt) => { // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

/**
 * 调用Timeago库显示到现在的时间
 */
const MillisecondToDate = (time) => {
    var str = '';
    if (time !== null && time !== '') {
        let timeagoInstance = new Timeago();
        str = timeagoInstance.format(time, 'zh_CN');
    }
    return str;
};

/** 格式化时间
 *  @param {string} time 需要格式化的时间
 *  @param {bool} friendly 是否是fromNow
 */
exports.getLastTimeStr = (time, friendly) => {
    if (friendly) {
        return MillisecondToDate(time);
    } else {
        return fmtDate(new Date(time), 'yyyy-MM-dd hh:mm');
    }
};

/** 获取文字标签
 *  @param {string} tab Tab分类
 *  @param {bool} good 是否是精华帖
 *  @param {bool} top 是否是置顶帖
 */
exports.getTabStr = (tab, good, top) => {
    let str = '';
    if (top) {
        str = '置顶';
    } else if (good) {
        str = '精华';
    } else {
        switch (tab) {
            case 'share':
                str = '分享';
                break;
            case 'ask':
                str = '问答';
                break;
            case 'job':
                str = '招聘';
                break;
            default:
                str = '暂无';
                break;
        }
    }
    return str;
};

/** 获取标签样式
 *  @param {string} tab Tab分类
 *  @param {bool} good 是否是精华帖
 *  @param {bool} top 是否是置顶帖
 */
exports.getTabClassName = (tab, good, top) => {
  let className = '';

  if (top) {
    className = 'top';
  } else if (good) {
    className = 'good';
  } else {
    switch (tab) {
      case 'share':
        className = 'share';
        break;
      case 'ask':
        className = 'ask';
        break;
      case 'job':
        className = 'job';
        break;
      default:
        className = 'default';
        break;
    }
  }
  return className;
};
