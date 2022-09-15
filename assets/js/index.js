$(".logout").click(function () {
  layer.confirm(
    "确认退出吗？",
    {
      btn: ["确定", "取消"], //可以无限个按钮
      btn3: function (index, layero) {
        localStorage.removeItem("token");
        location.href = "/login.html";
      },
    },
    function (index) {
      return;
    }
  );
});
