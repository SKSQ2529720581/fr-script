

export const auxiliary = <AuxiliaryType>{
  //参数回填方法
  parameterBackfill: async (...args: string[]) => {
    const params = await AutoTipUtils.paramsProcess(args);
    const selfModule = getInvokeApiMethods().find(
      (i) => i.name === "keyUp" && i.scope === "Input"
    );
    const dialog = selfModule!.testModule!.dialog;
    dialog.args!.forEach((i, index) => {
      if (index === 0) {
        i.value = params[index] || "A";
      }
    });
  },
  //参数处理方法
  parameterReplace: (options: {
    key: Key;
    replaceCurFnArgs: (targetArgs: string) => void;
  }) => {
    options.replaceCurFnArgs(`'${options.key}'`);
  },
};
