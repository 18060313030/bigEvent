// 定义自定义验证规则
layui.form.verify({
  pass: [/^[\S]{6,12}$/, "请输入6-12位的非空字符"],
  repwd: function (val) {
    if ($(".pwd").val() !== val) {
      return "两次输入的密码不一致";
    }
  },
});

// 修改密码
$("form").submit(function (e) {
  e.preventDefault();
  const self = this;
  const data = $(this).serialize();
  $.ajax({
    method: "post",
    url: "/my/updatepwd",
    data,
    success(res) {
      console.log(res);
      if (res.status !== 0) return layer.msg(res.message, { icon: 5, time: 1000 });
      layer.msg(res.message, { icon: 1, time: 1000 });
      location.href = "/login.html";
      $(self)[0].reset();
    },
  });
});
