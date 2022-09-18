// 切换面板
$(".change-panel").click(function () {
  $(".register-wrapper").toggle();
  $(".login-wrapper").toggle();
});

// 定义自定义验证规则
layui.form.verify({
  pass: [/^[\S]{6,12}$/, "请输入6-12位的非空字符"],
  repwd: function (val) {
    if ($(".pwd").val() !== val) {
      return "两次输入的密码不一致";
    }
  },
});

// 注册
$(".register-wrapper .layui-form").submit(function (e) {
  e.preventDefault();
  const self = this;
  const data = $(this).serialize(); // 收集表单数据
  // 发送请求
  $.ajax({
    url: "/api/reguser",
    method: "post",
    data,
    success(res) {
      console.log(res);
      // 弹出提示
      if (res.status !== 0) return layer.msg(res.message, { icon: 5 });
      layer.msg("注册成功", { icon: 1, time: 1000 }, function () {
        // 清空表单
        $(self)[0].reset();
        // 跳转登录页面
        $(".change-panel").click();
      });
    },
  });
});

// 登录
$(".login-wrapper .layui-form").submit(function (e) {
  e.preventDefault();
  const params = $(this).serialize(); // 收集表单数据
  $.ajax({
    url: "/api/login",
    method: "post",
    data: params,
    success(res) {
      // console.log(res);
      if (res.status !== 0) return layer.msg(res.message, { icon: 5 });
      layer.msg("登录成功", { icon: 1, time: 1000 }, function () {
        localStorage.setItem("token", res.token); // 保存token
        location.href = "/index.html"; // 跳转页面
      });
    },
  });
});
