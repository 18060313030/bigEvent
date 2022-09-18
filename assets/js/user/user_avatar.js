// 1.1 获取裁剪区域的 DOM 元素
var $image = $("#image");
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定图片的预览区域
  preview: ".preview-box",
};

// 1.3 创建裁剪区域
$image.cropper(options);

// 点击提交按钮，触发隐藏的上传表单的点击事件
$(".upload").click(function () {
  $("[type=file]").click();
});

// 修改显示的图片
$("[type=file]").change(function (e) {
  if (e.target.files.length === 0) return;
  console.log(e.target.files);
  // 获取需要上传的图片信息
  const file = e.target.files[0];
  // 将图片转换成对应的路径
  const img_url = URL.createObjectURL(file);
  console.log(img_url);
  // 销毁cropper截切工具，然后重新添加图片，在重新加上cropper
  $image.cropper("destroy").attr("src", img_url).cropper(options);
});

// 发送请求
$(".submit").click(function () {
  // 剪切图片，并获取base64格式的图片
  var dataURL = $image
    .cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL("image/png");

  $.ajax({
    url: "/my/update/avatar",
    method: "post",
    data: {
      avatar: dataURL,
    },
    success(res) {
      console.log(res);
      if (res.status !== 0) return layer.msg(res.message, { icon: 5 });
      layer.msg(res.message, { icon: 1 });
      window.parent.getUserinfo();
    },
  });
});
