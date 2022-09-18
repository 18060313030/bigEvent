// 渲染用户初始信息
$.ajax({
  url: "/my/userinfo",
  method: "get",
  success(res) {
    if (res.status !== 0) return layer.msg(res.message, { icon: 5 });
    // 需要在表单form上添加一个属性lay-filter="userinfo-form"
    // 表单中的name属性要和数据属性名一一对应上，就可以将数据直接添加到表单中了
    layui.form.val("userinfo-form", res.data);
  },
});

// 提交用户修改信息
$(".layui-form").submit(function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    url: "/my/userinfo",
    method: "post",
    data,
    success(res) {
      if (res.status !== 0) return layer.msg(res.message, { icon: 5, time: 1000 });
      layer.msg(res.message, { icon: 1 });
      window.parent.getUserinfo(); // 调用父窗口上的更新界面用户名称和头像的方法
    },
  });
});
