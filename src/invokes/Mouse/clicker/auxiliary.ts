const { getInvokeApiMethods } = useInvokeApiMethodsRegister();

export const auxiliary = <AuxiliaryType>{
  //参数回填方法
  parameterBackfill: async (...args: string[]) => {
    const params = await AutoTipUtils.paramsProcess(args);
    const selfModule = getInvokeApiMethods().find(
      (i) => i.name === "clicker" && i.scope === "Mouse"
    );
    const dialog = selfModule!.testModule!.dialog;
    dialog.args!.forEach((i, index) => {
      if (index !== 2) {
        i.value = +params[index] || 0;
      } else {
        i.value = params[index] || "left";
      }
    });
  },
  //参数处理方法
  parameterReplace: (options: {
    duration: number;
    sleep: number;
    button: "left" | "right" | "middle";
    replaceCurFnArgs: (targetArgs: string) => void;
  }) => {
    if (options.button === "left") {
      options.replaceCurFnArgs(`${options.duration}, ${options.sleep}`);
    } else {
      options.replaceCurFnArgs(
        `${options.duration}, ${options.sleep}, '${options.button}'`
      );
    }
  },
};
