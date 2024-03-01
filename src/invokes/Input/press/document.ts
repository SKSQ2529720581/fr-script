export const apiDocument = <ApiDocumentType>{
  howToUse: "按下按键后松开",
  params: [
    {
      name: "key",
      required: true,
      instructions: "鼠标移动到的X坐标",
      type: "Key",
      default: "",
    },
  ],
  returnValue: {
    type: codeHighLight(`Promise<{
      code: number;
      message: string;
    }>`),
  },
  example: {
    title: '该API在"测试调用"后会动态填入参数到示例',
    code: codeHighLight(`//按下A键后松开
      await Input.press("A");
      `),
  },
  searchKeys: ["鼠标", "mouse", "左键", "中键", "右键", "点击", "移动"],
  codeSnippet: "await Input.press('${1:key}');",
};