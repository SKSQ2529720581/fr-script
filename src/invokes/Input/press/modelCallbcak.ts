import { auxiliary } from "./auxiliary";
import { pressFn } from "./exportFn";
const { getInvokeApiMethods } = useInvokeApiMethodsRegister();

export const modelCallback = async (
  options: {
    key: Key;
    delay: number;
    replaceCurFnArgs?: (targetArgs: string) => void;
  },
  testModuleCtx: {
    showDetails: (text: string | undefined, preStr?: string) => void;
  }
) => {
  if (options.replaceCurFnArgs) {
    return auxiliary.parameterReplace(options);
  }
  if (options.delay > 0) {
    await new Promise((resolve) => {
      const t = setTimeout(() => {
        resolve(null);
        clearTimeout(t);
      }, options.delay);
    });
  }
  console.time("press耗时");
  const res = await pressFn(options.key);
  console.timeEnd("press耗时");
  testModuleCtx.showDetails(JSON.stringify(res), "press");
  const selfModule = getInvokeApiMethods().find(
    (i) => i.name === "press" && i.scope === "Input"
  )?.testModule!;
  selfModule.document!.example!.code = codeHighLight(
    `await Input.press(${options.key}');`
  );
};