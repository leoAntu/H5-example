/**
 * Created by HarryLee on 2017/7/17.
 */
// 姓名验证
export function checkName(value) {
    const reg = /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/;
    console.log('nameCheck',reg.test(value));
    return reg.test(value)
}

// 电话验证
export function checkPhone(value) {
    const reg = /^1[3|4|5|7|8][0-9]{9}$/;
    console.log('phoneNumberCheck',reg.test(value));
    return reg.test(value)
}

// 身高验证
export function checkHeight(value) {
    const reg = /^(1[4-9]\d)$/;
    console.log('heightCheck',reg.test(value));
    return reg.test(value)
}

// 体重验证
export function checkWeight(value) {
    const reg = /^[0-9]{2,3}$/;
    console.log('weightCheck',reg.test(value));
    return reg.test(value)
}
