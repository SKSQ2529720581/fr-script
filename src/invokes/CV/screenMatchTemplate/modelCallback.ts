import { auxiliary } from "./auxiliary";
import { screenMatchTemplateFn } from "./exportFn";

export const modelCallback = async (
  options: {
    range: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    tempPath: string;
    exactValue: number;
    scale: number;
    drive: string;
    replaceCurFnArgs?: (targetArgs: string) => void;
  },
  testModuleCtx: {
    showDetails: ShowDetailsFn;
  }
) => {
  if (options.replaceCurFnArgs) {
    const res = auxiliary.parameterReplace(options);
    AutoTipUtils.apiAutoTip();
    return res;
  }
  const { range, tempPath, exactValue, scale, drive } = options;
  const { showDetails } = testModuleCtx;
  console.time("screenMatchTemplate耗时");
  const res = await screenMatchTemplateFn(
    range.x,
    range.y,
    range.width,
    range.height,
    tempPath,
    exactValue,
    scale,
    drive || "auto"
  );
  console.timeEnd("screenMatchTemplate耗时");
  const selfModule = getInvokeApiMethods().find(
    (i) => i.name === "screenMatchTemplate" && i.scope === "CV"
  )?.testModule!;
  selfModule.document!.example!.code = `const { x, y } = await 
        \tCV.screenMatchTemplate(${JSON.stringify(range)}, "${tempPath.replace(
    /\\/g,
    "\\\\"
  )}", ${exactValue}, ${scale}${drive === "auto" ? "" : `, "${drive}"`});`;
  showDetails(JSON.stringify(res), "screenMatchTemplate");
};