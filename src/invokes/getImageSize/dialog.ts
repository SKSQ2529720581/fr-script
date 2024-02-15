export const dialogOptions = {
  title: "获取图片宽高",
  targetMethodName: "getImageSize",
  content: "获取图片宽高",
  args: [
    {
      name: "path",
      componentType: "FileInput",
      value: "",
      label: "图片路径",
    },
  ],
};