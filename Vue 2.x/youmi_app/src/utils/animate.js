/**
 在使用到该方法的css中写入

 transition: all .2s ease;
 transform-origin: bottom;
 然后在mounted中引用clickAnim
 **/
export function clickAnim(className) {

  $(`.${className}`).on('touchstart', () => {
    $(`.${className}`).css('transform', 'scale(0.8,0.8)').css('opacity','0.5')
  }).on('touchend', () => {
    $(`.${className}`).css('transform', 'scale(1,1)').css('opacity','1')
  });

}

