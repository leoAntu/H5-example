export function BaiduTongji() {
  // const script = document.createElement("script");
  // script.setAttribute(
  //   "src",
  //   "https://hm.baidu.com/hm.js?5b83dcbd848799cd34d8a629ae5c7eca"
  // );
  // const head = document.querySelector("head");
  // head.appendChild(script);

  let _hmt = _hmt || [];
  (function() {
    let hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5b83dcbd848799cd34d8a629ae5c7eca";
    let s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}
