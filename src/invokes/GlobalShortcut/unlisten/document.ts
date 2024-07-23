export const apiDocument = <ApiDocumentType>{
  howToUse: "取消监听快捷键触发",
  params: [
    {
      name: "keys",
      required: true,
      instructions: "需要取消监听的快捷键，如：['Alt+S','Alt+E']",
      type: "string[]",
      default: "",
    },
  ],
  returnValue: {
    instructions: "",
    type: `Promise<void>`,
  },
  example: {
    title: '该API在"测试调用"后会动态填入参数到示例',
    code: `//等待 Alt+S 或 Alt+R 被按下
await GlobalShortcut.unlisten(["Alt+S","Alt+R"]);//取消监听快捷键
      `,
  },
  searchKeys: ["unlisten", "取消监听", "快捷键"],
  codeSnippet: "await GlobalShortcut.unlisten(['${1:key}']);",
};
