import { storeToRefs } from "pinia";
import { WebviewWindow } from "@tauri-apps/api/window";
export type LogOutputType = {
  time: string;
  log: string;
  type: "success" | "danger" | "info" | "warning" | "loading";
  timestamp: number;
};
const { exportAllFn, genBuiltInApi } = useCore();
const buildTableForm = () => {
  return new TableForm();
};

//拷贝一份默认配置
let curRendererList: RendererList[] = [];
const importLastRunConfig = async (rendererList?: RendererList[]) => {
  if (!rendererList) {
    const { rendererList: r } = useListStore();
    rendererList = r;
  }
  const scriptConfig = rendererList.find(
    (i: RendererList) => i.groupLabel === "*脚本设置"
  );
  const mergeConfig = scriptConfig?.checkList.find(
    (i) => i.label === "导入上次运行配置"
  )?.checked;
  if (mergeConfig) {
    await nextTick();
    const defaultObj: RendererList[] = JSON.parse(JSON.stringify(rendererList));
    curRendererList = JSON.parse(JSON.stringify(rendererList));
    const r = localStorage.getItem(
      window[CORE_NAMESPACES].getScriptId!() + "-rendererList"
    );
    if (r) {
      //合并配置
      const targetObj: RendererList[] = JSON.parse(r);
      for (let i = 0; i < defaultObj.length; i++) {
        const defaultItem = defaultObj[i];
        const targetItem = targetObj.find(
          (item) => item.groupLabel === defaultItem.groupLabel
        );
        if (targetItem) {
          //覆盖defaultItem的enable
          defaultItem.enable = targetItem.enable;
          //判断targetItem的selectList[index].value是否存在于defaultItem的selectList[index].options中
          for (let j = 0; j < defaultItem.selectList.length; j++) {
            const defaultSelectItem = defaultItem.selectList[j];
            const targetSelectItem = targetItem.selectList.find(
              (item) => item.label === defaultSelectItem.label
            );
            if (targetSelectItem) {
              const options = defaultSelectItem.options;
              if (options.includes(targetSelectItem.value)) {
                defaultSelectItem.value = targetSelectItem.value;
              }
            }
          }
          //覆盖defaultItem的checkList[index]的checked
          for (let j = 0; j < defaultItem.checkList.length; j++) {
            const defaultCheckItem = defaultItem.checkList[j];
            const targetCheckItem = targetItem.checkList.find(
              (item) => item.label === defaultCheckItem.label
            );
            if (targetCheckItem) {
              defaultCheckItem.checked = targetCheckItem.checked;
            }
          }
          //覆盖defaultItem的inputList[index]的value
          for (let j = 0; j < defaultItem.inputList.length; j++) {
            const defaultInputItem = defaultItem.inputList[j];
            const targetInputItem = targetItem.inputList.find(
              (item) => item.label === defaultInputItem.label
            );
            if (targetInputItem) {
              defaultInputItem.value = targetInputItem.value;
            }
          }
          /*
            提取defaultItem的groupSelectList[index]中的所有选项分组的value,
            判断targetItem的groupSelectList[index].value,
            是否存在于提取出来的数组中
            存在则覆盖defaultItem的groupSelectList[index].value
            */
          const AllValues: string[] = [];
          for (let j = 0; j < defaultItem.groupSelectList.length; j++) {
            const defaultGroupSelectItem = defaultItem.groupSelectList[j];
            const targetGroupSelectItem = targetItem.groupSelectList.find(
              (item) => item.label === defaultGroupSelectItem.label
            );
            if (targetGroupSelectItem) {
              const options = defaultGroupSelectItem.options;
              for (let k = 0; k < options.length; k++) {
                const option = options[k];
                for (let l = 0; l < option.options.length; l++) {
                  const item = option.options[l];
                  AllValues.push(item.value);
                }
              }
              if (AllValues.includes(targetGroupSelectItem.value)) {
                defaultGroupSelectItem.value = targetGroupSelectItem.value;
              }
            }
          }
          /*
            提取defaultItem的multipleGroupSelectList[index]中的所有选项分组的value,
            判断targetItem的multipleGroupSelectList[index].value,
            是否存在于提取出来的数组中
            存在则覆盖defaultItem的multipleGroupSelectList[index].value
            */
          const AllMultipleValues: string[] = [];
          for (let j = 0; j < defaultItem.multipleGroupSelectList.length; j++) {
            const defaultMultipleGroupSelectItem =
              defaultItem.multipleGroupSelectList[j];
            const targetMultipleGroupSelectItem =
              targetItem.multipleGroupSelectList.find(
                (item) => item.label === defaultMultipleGroupSelectItem.label
              );
            if (targetMultipleGroupSelectItem) {
              const options = defaultMultipleGroupSelectItem.options;
              for (let k = 0; k < options.length; k++) {
                const option = options[k];
                for (let l = 0; l < option.options.length; l++) {
                  const item = option.options[l];
                  AllMultipleValues.push(item.value);
                }
              }
              const targetMultipleGroupSelectItemValue =
                targetMultipleGroupSelectItem.value;
              const newTargetMultipleGroupSelectItemValue: string[] = [];
              for (
                let k = 0;
                k < targetMultipleGroupSelectItemValue.length;
                k++
              ) {
                const item = targetMultipleGroupSelectItemValue[k];
                if (AllMultipleValues.includes(item)) {
                  newTargetMultipleGroupSelectItemValue.push(item);
                }
              }
              defaultMultipleGroupSelectItem.value =
                newTargetMultipleGroupSelectItemValue;
            }
          }
          //拿到defaultItem的tableList[index]的inputProp所有的propLabel
          const AllTableInputPropLabel: string[] = [];
          for (let j = 0; j < defaultItem.tableList.length; j++) {
            const defaultTableItem = defaultItem.tableList[j];
            const targetTableItem = targetItem.tableList.find(
              (item) => item.label === defaultTableItem.label
            );
            if (targetTableItem) {
              const inputProp = defaultTableItem.inputProp;
              AllTableInputPropLabel.push(...inputProp.map((i) => i.propLabel));
              //判断targetTableItem的tableData的每一项的键是否存在于AllTableInputPropLabel中
              const tableData = targetTableItem.tableData;
              for (let k = 0; k < tableData.length; k++) {
                const item = tableData[k];
                for (const key in item) {
                  if (Object.prototype.hasOwnProperty.call(item, key)) {
                    if (!AllTableInputPropLabel.includes(key)) {
                      delete (item as any)[key];
                    }
                  }
                }
              }
              //覆盖defaultTableItem的tableData
              defaultTableItem.tableData = tableData;
            }
          }
        }
      }
      defaultObj.find((i) => {
        if (i.groupLabel === "*脚本设置") {
          i.checkList.find((i) => i.label === "导入上次运行配置")!.checked =
            true;
          return;
        }
      });
      rendererList.splice(0, rendererList.length, ...defaultObj);
    }
    ElNotification.closeAll();
    ElNotification({
      title: "配置导入完成",
      type: "success",
      position: "bottom-right",
    });
  } else {
    const { openId } = useScriptInfo();
    if (openId.value === "-1") {
      return;
    }
    ElNotification.closeAll();
    ElNotification({
      title: "取消配置导入",
      type: "info",
      position: "bottom-right",
    });
    curRendererList.find((i) => {
      if (i.groupLabel === "*脚本设置") {
        i.checkList.find((i) => i.label === "导入上次运行配置")!.checked =
          false;
        return;
      }
    });
    if (curRendererList.length) {
      rendererList.splice(0, rendererList.length, ...curRendererList);
    } else {
      rendererList.splice(0, rendererList.length, ...rendererList);
    }
  }
};

const addRendererListToWindow = () => {
  const { rendererList } = useListStore();
  if (!window[CORE_NAMESPACES].rendererList) {
    window[CORE_NAMESPACES].rendererList = rendererList;
  }
};

const replaceRendererList = (newRendererList: RendererList[]) => {
  const { rendererList } = useListStore();
  rendererList.splice(0, rendererList.length, ...newRendererList);
  addRendererListToWindow();
};

//给渲染列表添加checkList类型元素
const pushElementToCheckList = (
  elem: {
    targetGroupLabel: string;
    label: string;
    checked: boolean;
    enable?: boolean;
  },
  pushTo: "rendererList" | "previewRendererList" = "rendererList"
) => {
  const { rendererList, previewRendererList } = useListStore();
  let rList = rendererList;
  if (pushTo === "previewRendererList") {
    rList = previewRendererList;
  }
  const idx = rList.findIndex((g) => g.groupLabel === elem.targetGroupLabel);
  if (idx === -1) {
    //目标组不存在则新增目标组
    rList.push({
      groupLabel: elem.targetGroupLabel,
      enable: elem.enable === undefined ? true : elem.enable,
      checkList: [
        {
          label: elem.label,
          checked: elem.checked,
        },
      ],
      groupSelectList: [],
      selectList: [],
      multipleGroupSelectList: [],
      tableList: [],
      inputList: [],
    });
  } else {
    rList[idx].checkList.push({
      label: elem.label,
      checked: elem.checked,
    });
  }
  pushTo === "rendererList" && addRendererListToWindow();
};
//给渲染列表添加inputList类型元素
const pushElementToInputList = (
  elem: {
    targetGroupLabel: string;
    label: string;
    value: string;
    enable?: boolean;
  },
  pushTo: "rendererList" | "previewRendererList" = "rendererList"
) => {
  const { rendererList, previewRendererList } = useListStore();
  let rList = rendererList;
  if (pushTo === "previewRendererList") {
    rList = previewRendererList;
  }
  const idx = rList.findIndex((g) => g.groupLabel === elem.targetGroupLabel);
  if (idx === -1) {
    //目标组不存在则新增目标组
    rList.push({
      groupLabel: elem.targetGroupLabel,
      enable: elem.enable === undefined ? true : elem.enable,
      inputList: [
        {
          label: elem.label,
          value: elem.value,
        },
      ],
      groupSelectList: [],
      checkList: [],
      selectList: [],
      multipleGroupSelectList: [],
      tableList: [],
    });
  } else {
    rList[idx].inputList.push({
      label: elem.label,
      value: elem.value,
    });
  }
  pushTo === "rendererList" && addRendererListToWindow();
};
//给渲染列表添加selectList类型元素
const pushElementToSelectList = (
  elem: {
    targetGroupLabel: string;
    label: string;
    options: string[];
    value: string;
    enable?: boolean;
  },
  pushTo: "rendererList" | "previewRendererList" = "rendererList"
) => {
  const { rendererList, previewRendererList } = useListStore();
  let rList = rendererList;
  if (pushTo === "previewRendererList") {
    rList = previewRendererList;
  }
  const idx = rList.findIndex((g) => g.groupLabel === elem.targetGroupLabel);
  if (idx === -1) {
    //目标组不存在则新增目标组
    rList.push({
      groupLabel: elem.targetGroupLabel,
      enable: elem.enable === undefined ? true : elem.enable,
      groupSelectList: [],
      checkList: [],
      selectList: [
        {
          label: elem.label,
          options: elem.options,
          value: elem.value,
        },
      ],
      multipleGroupSelectList: [],
      tableList: [],
      inputList: [],
    });
  } else {
    rList[idx].selectList.push({
      label: elem.label,
      options: elem.options,
      value: elem.value,
    });
  }
  pushTo === "rendererList" && addRendererListToWindow();
};
//给渲染列表添加groupSelectList类型元素
const pushElementToGSList = (
  elem: {
    targetGroupLabel: string;
    label: string;
    options: {
      groupLabel: string;
      options: {
        value: string;
        label: string;
      }[];
    }[];
    value: string;
    enable?: boolean;
  },
  pushTo: "rendererList" | "previewRendererList" = "rendererList"
) => {
  const { rendererList, previewRendererList } = useListStore();
  let rList = rendererList;
  if (pushTo === "previewRendererList") {
    rList = previewRendererList;
  }
  const idx = rList.findIndex((g) => g.groupLabel === elem.targetGroupLabel);
  if (idx === -1) {
    //目标组不存在则新增目标组
    rList.push({
      groupLabel: elem.targetGroupLabel,
      enable: elem.enable === undefined ? true : elem.enable,
      groupSelectList: [
        {
          label: elem.label,
          options: elem.options,
          value: elem.value,
        },
      ],
      checkList: [],
      selectList: [],
      multipleGroupSelectList: [],
      tableList: [],
      inputList: [],
    });
  } else {
    rList[idx].groupSelectList.push({
      label: elem.label,
      options: elem.options,
      value: elem.value,
    });
  }
  pushTo === "rendererList" && addRendererListToWindow();
};
//给渲染列表添加multipleGroupSelectList类型元素
const pushElementToMGSList = (
  elem: {
    targetGroupLabel: string;
    label: string;
    options: {
      groupLabel: string;
      options: {
        value: string;
        label: string;
      }[];
    }[];
    limit?: number;
    value: string[];
    enable?: boolean;
  },
  pushTo: "rendererList" | "previewRendererList" = "rendererList"
) => {
  const { rendererList, previewRendererList } = useListStore();
  let rList = rendererList;
  if (pushTo === "previewRendererList") {
    rList = previewRendererList;
  }
  const idx = rList.findIndex((g) => g.groupLabel === elem.targetGroupLabel);
  if (idx === -1) {
    //目标组不存在则新增目标组
    rList.push({
      groupLabel: elem.targetGroupLabel,
      enable: elem.enable === undefined ? true : elem.enable,
      checkList: [],
      selectList: [],
      groupSelectList: [],
      inputList: [],

      multipleGroupSelectList: [
        {
          label: elem.label,
          options: elem.options,
          limit: elem.limit === undefined ? 0 : elem.limit,
          value: elem.value,
        },
      ],
      tableList: [],
    });
  } else {
    rList[idx].multipleGroupSelectList.push({
      label: elem.label,
      options: elem.options,
      limit: elem.limit,
      value: elem.value,
    });
  }
  pushTo === "rendererList" && addRendererListToWindow();
};
const pushElementToTableList = (
  elem: {
    targetGroupLabel: string;
    label: string;
    tableData: object[];
    tableHeader: TableFormHeader[];
    inputProp: {
      propLabel: string;
      type: "select" | "input" | "input-number";
      value: string | number;
      options: string[];
    }[];
    enable?: boolean;
  },
  pushTo: "rendererList" | "previewRendererList" = "rendererList"
) => {
  const { rendererList, previewRendererList } = useListStore();
  let rList = rendererList;
  if (pushTo === "previewRendererList") {
    rList = previewRendererList;
  }
  const idx = rList.findIndex((g) => g.groupLabel === elem.targetGroupLabel);
  if (idx === -1) {
    //目标组不存在则新增目标组
    rList.push({
      groupLabel: elem.targetGroupLabel,
      enable: elem.enable === undefined ? true : elem.enable,
      checkList: [],
      selectList: [],
      groupSelectList: [],
      multipleGroupSelectList: [],
      inputList: [],
      tableList: [
        {
          label: elem.label,
          tableData: elem.tableData,
          tableHeader: elem.tableHeader,
          inputProp: elem.inputProp,
        },
      ],
    });
  } else {
    rList[idx].tableList.push({
      label: elem.label,
      tableData: elem.tableData,
      tableHeader: elem.tableHeader,
      inputProp: elem.inputProp,
    });
  }
  pushTo === "rendererList" && addRendererListToWindow();
};
//渲染UI表单
const buildForm = (
  buildFormList: (
    | {
        targetGroupLabel: string;
        type:
          | "input"
          | "multiplSelection"
          | "groupSelect"
          | "select"
          | "check"
          | "table";
        label: string;
        options: {
          groupLabel: string;
          options: {
            value: string;
            label: string;
          }[];
        }[];
        limit?: number;
        value: string[];
        enable?: boolean;
      }
    | {
        targetGroupLabel: string;
        type:
          | "input"
          | "multiplSelection"
          | "groupSelect"
          | "select"
          | "check"
          | "table";
        label: string;
        options: {
          groupLabel: string;
          options: {
            value: string;
            label: string;
          }[];
        }[];
        value: string;
        enable?: boolean;
      }
    | {
        targetGroupLabel: string;
        type:
          | "input"
          | "multiplSelection"
          | "groupSelect"
          | "select"
          | "check"
          | "table";
        label: string;
        options: string[];
        value: string;
        enable?: boolean;
      }
    | {
        targetGroupLabel: string;
        type:
          | "input"
          | "multiplSelection"
          | "groupSelect"
          | "select"
          | "check"
          | "table";
        label: string;
        tableData: object[];
        tableHeader: TableFormHeader[];
        inputProp: {
          propLabel: string;
          type: "select" | "input" | "input-number";
          value: string | number;
          options: string[];
        }[];
        enable?: boolean;
      }
    | {
        targetGroupLabel: string;
        type:
          | "input"
          | "multiplSelection"
          | "groupSelect"
          | "select"
          | "check"
          | "table";
        label: string;
        checked: boolean;
        enable?: boolean;
      }
    | {
        targetGroupLabel: string;
        type:
          | "input"
          | "multiplSelection"
          | "groupSelect"
          | "select"
          | "check"
          | "table";
        label: string;
        value: string;
        enable?: boolean;
      }
  )[],
  pushTo: "rendererList" | "previewRendererList" = "rendererList"
) => {
  const listStore = useListStore();
  if (pushTo === "previewRendererList") {
    listStore.previewRendererList.splice(
      0,
      listStore.previewRendererList.length
    );
  }
  for (let i = 0; i < buildFormList.length; i++) {
    const item = buildFormList[i];
    if (item.type === "multiplSelection") {
      pushElementToMGSList(
        item as {
          targetGroupLabel: string;
          label: string;
          options: {
            groupLabel: string;
            options: {
              value: string;
              label: string;
            }[];
          }[];
          limit?: number;
          value: string[];
          enable?: boolean;
        },
        pushTo
      );
    } else if (item.type === "groupSelect") {
      pushElementToGSList(
        item as {
          targetGroupLabel: string;
          label: string;
          options: {
            groupLabel: string;
            options: {
              value: string;
              label: string;
            }[];
          }[];
          value: string;
          enable?: boolean;
        },
        pushTo
      );
    } else if (item.type === "select") {
      pushElementToSelectList(
        item as {
          targetGroupLabel: string;
          label: string;
          options: string[];
          value: string;
          enable?: boolean;
        },
        pushTo
      );
    } else if (item.type === "table") {
      pushElementToTableList(
        item as {
          targetGroupLabel: string;
          label: string;
          tableData: object[];
          tableHeader: TableFormHeader[];
          inputProp: {
            propLabel: string;
            type: "select" | "input" | "input-number";
            value: string | number;
            options: string[];
          }[];
          enable?: boolean;
        },
        pushTo
      );
    } else if (item.type === "check") {
      pushElementToCheckList(
        item as {
          targetGroupLabel: string;
          label: string;
          checked: boolean;
          enable?: boolean;
        },
        pushTo
      );
    } else {
      pushElementToInputList(
        item as {
          targetGroupLabel: string;
          label: string;
          value: string;
          enable?: boolean;
        },
        pushTo
      );
    }
  }
};

const allTask = ref(1);
const curTask = ref(0);
const curTaskName = ref("");
const taskStatus = ref<"success" | "warning" | "exception" | "">("");
const getAllTask = () => allTask.value;
const getCurTask = () => curTask.value;
const getCurTaskName = () => curTaskName.value;
const getTaskStatus = () => taskStatus.value;

const setAllTask = (num: number) => {
  allTask.value = num;
};
const setCurTask = (num: number) => {
  curTask.value = num;
};
const nextTask = (name: string) => {
  if (curTask.value < allTask.value) {
    curTask.value++;
  }
  curTaskName.value = name;
};
const setTaskEndStatus = (
  status: "success" | "warning" | "exception" | "",
  endMessage?: string
) => {
  if (status === "") {
    allTask.value = 1;
    curTask.value = 0;
    taskStatus.value = "";
    curTaskName.value = "";
  } else {
    curTask.value = allTask.value;
    taskStatus.value = status;
    curTaskName.value = endMessage || "";
  }
};

const getCustomizeForm = async () => {
  const rendererForm = await new Promise<RendererList[]>((resolve) => {
    let signal =
      window[CORE_NAMESPACES].startScriptSignal &&
      window[CORE_NAMESPACES].startScriptSignal.signal;
    if (signal && signal.aborted) {
      //脚本调用getCustomizeForm时，必须保证signal未被中止，中止说明脚本重新被运行，需要重新创建一个signal
      window[CORE_NAMESPACES].startScriptSignal = new AbortController();
      signal = window[CORE_NAMESPACES].startScriptSignal.signal;
    }
    const signalHandle = () => {
      window[CORE_NAMESPACES].abortSignalInScript = undefined;
      signal!.removeEventListener("abort", signalHandle);
      //保存此次运行选择的配置选项
      localStorage.setItem(
        window[CORE_NAMESPACES].getScriptId!() + "-rendererList",
        JSON.stringify(window[CORE_NAMESPACES].rendererList)
      );
      resolve(window[CORE_NAMESPACES].rendererList);
    };
    signal!.addEventListener("abort", signalHandle);
  });
  return new rendererFormUtil.FormUtil(rendererForm);
};
const abortSignalInScript = ref<AbortController | undefined>();
const getWillRunScript = (runId: string, script: string) => {
  const scriptTemplate = `
    try{
      with(window['${CORE_NAMESPACES}']){
        ${genBuiltInApi(runId) + "\n"}
        changeScriptRunState(true);
        replaceRendererList([]);
        pushElementToCheckList({
          targetGroupLabel: "*脚本设置",
          label: "导入上次运行配置",
          checked: false
        });
        const signal = abortSignalInScript && abortSignalInScript.signal;
        const signalHandle = ()=>{
          const error = new DOMException('任务被手动终止');
          try{changeScriptRunState && changeScriptRunState('stop');}catch(e){console.warn(e);}
          abortSignalInScript = undefined;
          signal.removeEventListener('abort',signalHandle);
          isStop = true;
        }
        signal.addEventListener('abort',signalHandle);
        const evalFunction = async()=>{
          ${script}
          main && await main();
          removeIntervals();
          try{changeScriptRunState && changeScriptRunState(false, '${runId}');}catch(e){console.error(e);}
          console.log('script run done!');
        }
        evalFunction();
      }
    }catch(e){
      console.error(e);
    }
  `;
  return scriptTemplate;
};
const setIntervals: NodeJS.Timeout[] = [];
const _setInterval = (callback: () => void, ms?: number | undefined) => {
  const timeout = setInterval(()=>{
    try{
      const {isStop} = window[CORE_NAMESPACES];
      if(isStop){
        _clearInterval(timeout);
        return;
      }
      callback();
    }catch(e){
      console.error(e);
    }
  }, ms);
  setIntervals.push(timeout);
  return timeout;
};
const _clearInterval = (timeout: NodeJS.Timeout) => {
  clearInterval(timeout);
  setIntervals.splice(setIntervals.indexOf(timeout), 1);
};
let removeTimer: NodeJS.Timeout | null = null;
const removeIntervals = () => {
  removeTimer && clearTimeout(removeTimer);
  removeTimer = setTimeout(() => {
    setIntervals.forEach((i) => {
      clearInterval(i);
    });
    setIntervals.splice(0, setIntervals.length);
    console.log("已清除所有定时器");
  }, 300);
};
const getFileInfo = (
  type: "id" | "savePath" | "name" | "version" | "description"
) => {
  const listStore = useListStore();
  const { scriptList } = storeToRefs(listStore);
  const { openId } = useScriptInfo();
  const target = scriptList.value.find((s) => s.id === openId!.value)!;
  switch (type) {
    case "id":
      return target?.id;
    case "name":
      return target?.name;
    case "description":
      return target?.description;
    case "savePath":
      return target?.savePath;
    case "version":
      return target?.version;
    default:
      console.error(type);
      return type;
  }
};
const running = ref(0);
const { notify } = eventUtil;
const getScriptId = () => getFileInfo("id");
let endBeforeCompletion = false;
const setEndBeforeCompletion = (status: boolean) => {
  endBeforeCompletion = status;
};

const hideWindow = ref(true);
const logOutput = reactive<
  LogOutputType[]
>([]);
const clearLogOutput = () => {
  logOutput.splice(0, logOutput.length);
  notify.clear();
};

const log = (
  msg: string,
  type?: "success" | "danger" | "info" | "warning" | "loading"
) => {
  //@ts-ignore
  if (window[CORE_NAMESPACES].isStop) {
    return;
  }
  const date = new Date(Date.now());
  //获取时分秒，时分秒不足两位补0
  const timeStr = [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((i) => {
      return i < 10 ? "0" + i : i;
    })
    .join(":");
  logOutput.push({
    time: timeStr,
    log: msg,
    type: type ? type : "info",
    timestamp: Date.now()
  });
  notify.send({
    type,
    message: msg,
    time: timeStr,
  });
  if (type === "danger") {
    logUtil.scriptConsoleErrorReport(msg, name.value + version.value);
  }
  const consoleLogDiv = document.getElementById("consoleLogDiv");
  consoleLogDiv &&
    (consoleLogDiv.scrollTop = consoleLogDiv?.scrollHeight + 9999);
};

const name = computed(() => {
  return getFileInfo("name");
});
const version = computed(() => {
  return getFileInfo("version");
});
const savePath = computed(() => {
  return getFileInfo("savePath");
});
const notDelApi = ["changeScriptRunState", "isStop", "removeIntervals", "log", 'setInterval'];
const changeScriptRunState = (state: boolean | "stop", taskId?: string) => {
  const { runningFnId } = useScriptRuntime();
  if (taskId && taskId !== runningFnId.value) {
    return;
  }
  if (state === "stop") {
    running.value = 1;
    window[CORE_NAMESPACES].removeIntervals &&
      window[CORE_NAMESPACES].removeIntervals();
    if (window[CORE_NAMESPACES]) {
      Object.keys(window[CORE_NAMESPACES]).forEach((key) => {
        if (notDelApi.includes(key)) {
          return;
        }
        //@ts-ignore
        delete window[CORE_NAMESPACES][key];
      });
    }
    if (hideWindow.value) {
      WebviewWindow.getByLabel("main")?.show();
      notify.done();
    }
  } else if (state) {
    clearLogOutput();
    log("脚本就绪，等待开始运行", "loading");
    running.value = 0;
    endBeforeCompletion = false;
  } else {
    if (endBeforeCompletion) {
      return;
    }
    running.value = 1;
    log("脚本执行完成", "success");
    setTaskEndStatus("success", "脚本执行完成");
    if (window[CORE_NAMESPACES]) {
      Object.keys(window[CORE_NAMESPACES]).forEach((key) => {
        if (notDelApi.includes(key)) {
          return;
        }
        //@ts-ignore
        delete window[CORE_NAMESPACES][key];
      });
    }
    //显示当前窗口
    if (hideWindow.value) {
      WebviewWindow.getByLabel("main")?.show();
      notify.done();
    }
  }
};
export const useScriptApi = () => {
  return {
    importLastRunConfig,
    replaceRendererList,
    pushElementToCheckList,
    pushElementToInputList,
    pushElementToSelectList,
    pushElementToGSList,
    pushElementToMGSList,
    pushElementToTableList,
    getWillRunScript,
    setEndBeforeCompletion,
    getEndBeforeCompletion: () => endBeforeCompletion,
    getFileInfo,
  };
};

export const useScriptView = () => {
  return {
    running,
    name,
    version,
    hideWindow,
    savePath,
    logOutput,
  };
};

class FormUtil {
  constructor(_rendererList: RendererList[]) {
    throw new Error("此类只能用于getCustomizeForm方法调用后生成实例！");
  }
}

/**
 * 脚本运行时的所有内置api,返回新增内置API后请
 * 前往../invokes/utilDeclareTypes.ts中添加类型声明，
 * 用于提供给编辑器进行代码提示。
 */
export const useBuiltInApi = () => {
  const { openId } = useScriptInfo();
  const { rendererList } = useListStore();
  const appGSStore = useAppGlobalSettings();
  const listStore = useListStore();
  const { scriptList } = storeToRefs(listStore);
  const _buildForm = (buildFormList: BuildFormList) => {
    buildForm(buildFormList);
    if (openId.value !== "-1") {
      const target = scriptList.value.find((i) => i.id === openId.value);
      if (!target?.setting.autoImportLastRunConfig) {
        return;
      } else if (target.setting.autoImportLastRunConfig) {
        const scriptConfig = window[CORE_NAMESPACES].rendererList?.find(
          (i) => i.groupLabel === "*脚本设置"
        );
        if (scriptConfig) {
          const importLastRunConfigItem = scriptConfig.checkList.find(
            (i) => i.label === "导入上次运行配置"
          );
          if (importLastRunConfigItem) {
            importLastRunConfigItem.checked = true;
            importLastRunConfig();
          }
        }
      }
    }
  };
  const WORK_DIR = appGSStore.envSetting.workDir;
  const SCREEN_SHOT_DIR = pathUtils.resolve(
    appGSStore.envSetting.screenshotSavePath || "",
    "../"
  );
  const SCREEN_SHOT_PATH = appGSStore.envSetting.screenshotSavePath;
  const SCRIPT_ROOT_DIR = pathUtils.resolve(
    getFileInfo("savePath") || "",
    "../"
  );
  return {
    FormUtil,
    WORK_DIR,
    SCREEN_SHOT_PATH,
    SCREEN_SHOT_DIR,
    __httpValue: "http://",
    SCRIPT_ROOT_DIR,
    isStop: false,
    SCRIPT_ID: getScriptId(),
    buildForm: _buildForm,
    setAllTask,
    setCurTask,
    getAllTask,
    getCurTask,
    getCurTaskName,
    nextTask,
    getTaskStatus,
    setTaskEndStatus,
    buildTableForm,
    getCustomizeForm,
    sleep: timeUtil.sleep,
    abortSignalInScript: abortSignalInScript.value,
    startScriptSignal: new AbortController(),
    setInterval: _setInterval,
    clearInterval: _clearInterval,
    removeIntervals,
    rendererList,
    getScriptId,
    changeScriptRunState,
    log,
    clearLogOutput,
    ...exportAllFn(),
    replaceRendererList,
    pushElementToCheckList,
    pushElementToInputList,
    pushElementToSelectList,
    pushElementToGSList,
    pushElementToMGSList,
    pushElementToTableList,
  };
};
