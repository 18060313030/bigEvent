// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = "http://big-event-api-t.itheima.net" + options.url;

  // 封装请求头
  // if (options.url.indexOf("/my") > -1) {
  //   options.headers = options.headers || {};
  //   options.headers = {
  //     ...options.headers,
  //     Authorization: localStorage.getItem("token") || "",
  //   };
  // }
  if (options.url.indexOf("/my") > -1) {
    options.headers = options.headers || {};
    options.headers["Authorization"] = localStorage.getItem("token") || "";
  }
});
