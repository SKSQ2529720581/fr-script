export const dialogOptions = <TestModuleDialogType>{
  title: "路径重命名(移动)",
  targetMethodName: "rename",
  content:
    "将旧路径的文件或文件夹移动到新路径,如果移动的是文件并且新路径已存在则会覆盖",
  args: [
    {
      componentType: "FileInput",
      value: "",
      suffix: "",
      verifyPath: false,
      desc: "单文件选择",
      id: "n7CsMnN70dq5zh6L4GpEi",
      onlyTest: false,
      noTest: false,
      name: "oldPath",
      label: "旧路径",
      displayCondition: [],
      placeholder: "请输入旧文件或文件夹的路径",
      multiple: false,
    },
    {
      componentType: "FileInput",
      value: "",
      suffix: "",
      verifyPath: false,
      desc: "单文件选择",
      id: "YYDoHvWJi76EF9UUJ80MH",
      onlyTest: false,
      noTest: false,
      name: "newPath",
      label: "新路径",
      displayCondition: [],
      placeholder: "请输入新文件或新文件夹的路径",
      multiple: false,
    },
  ],
};
