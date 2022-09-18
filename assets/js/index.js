// 退出登录
$(".logout").click(function () {
  layer.confirm(
    "确认退出吗？",
    {
      btn: ["确定", "取消"], //可以无限个按钮
    },
    function (index, layero) {
      localStorage.removeItem("token");
      location.href = "/login.html";
    },
    function (index) {
      return;
    }
  );
});

// 登录成功之后获取用户信息,需要给其他模块调用 其他模块使用window.parent.getUserinfo()
function getUserinfo() {
  $.ajax({
    url: "/my/userinfo",

    // 获取用户信息需要在请求头携带token，才能获取，为了防止后续请求参数被修改，需要统一定义到baseAPI文件夹中
    // 统一在对应的地址上(除了登录和注册)，发送请求之前添加该请求头信息，就不需要在此处手动添加了
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },

    success(res) {
      // 未登录，跳到登录界面
      if (res.status !== 0) return (location.href = "/login.html");
      // 登录成功
      // 1 查看是否有头像，如果有就渲染头像，隐藏昵称
      if (res.data.user_pic) {
        $(".avatar-img").attr("src", res.data.user_pic).show();
        $(".avatar-title").hide();
      } else {
        // 2 没有头像就渲染文字(昵称 || 用户名)，隐藏头像
        $(".avatar-img").hide();
        $(".avatar-title")
          .html((res.data.nickname || res.data.username).charAt(0).toUpperCase())
          .show();
      }
      // 渲染 昵称 || 用户名
      $(".avatar-name").html("欢迎您：" + (res.data.nickname || res.data.username));
    },
  });
}
getUserinfo();
