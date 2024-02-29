import { randomMoveFn } from "./exportFn";

import { auxiliary } from "./auxiliary";
const { getInvokeApiMethods } = useInvokeApiMethodsRegister();
export const modelCallback = async (
  options: {
    x: number;
    y: number;
    xRandomRange: [number, number];
    yRandomRange: [number, number];
    replaceCurFnArgs?: (targetArgs: string) => void;
  },
  testModuleCtx: {
    showDetails: (text: string | undefined, preStr?: string) => void;
  }
) => {
  if (options.replaceCurFnArgs) {
    return auxiliary.parameterReplace(options);
  }
  console.time("randomMove");
  const res = await randomMoveFn(options.x, options.y, [
    options.xRandomRange,
    options.yRandomRange,
  ]);
  console.timeEnd("randomMove");
  testModuleCtx.showDetails(res);
  const selfModule = getInvokeApiMethods().find(
    (m) => m.name === "randomMove" && m.scope === "Mouse"
  )?.testModule;
  if (selfModule) {
    selfModule.document!.example!.code = codeHighLight(
      `const res = await Mouse.randomMove(${options.x}, ${options.y}, [[${options.xRandomRange[0]}, ${options.xRandomRange[1]}], [${options.yRandomRange[0]}, ${options.yRandomRange[1]}]]);`.replace(', [[0, 0], [0, 0]]','')
    );
  }
};