export type BuiltInApiType = {
  adbScreenshot: typeof import("./adbScreenshot/exportFn")["adbScreenshotFn"];
  adbState: typeof import("./adbState/exportFn")["adbStateFn"];
  clickHomeKey: typeof import("./clickHomeKey/exportFn")["clickHomeKeyFn"];
  clickReturnKey: typeof import("./clickReturnKey/exportFn")["clickReturnKeyFn"];
  cmd: typeof import("./cmd/exportFn")["cmdFn"];
  connectTo: typeof import("./connectTo/exportFn")["connectToFn"];
  cropPicture: typeof import("./cropPicture/exportFn")["cropPictureFn"];
  CV: {
    imgSimilarity: typeof import("./CV/imgSimilarity/exportFn")["imgSimilarityFn"];
    matchTemplate: typeof import("./CV/matchTemplate/exportFn")["matchTemplateFn"];
    screenDiffTemplates: typeof import("./CV/screenDiffTemplates/exportFn")["screenDiffTemplatesFn"];
    screenMatchTemplate: typeof import("./CV/screenMatchTemplate/exportFn")["screenMatchTemplateFn"];
  };
  devices: typeof import("./devices/exportFn")["devicesFn"];
  disConnectTo: typeof import("./disConnectTo/exportFn")["disConnectToFn"];
  getImageSize: typeof import("./getImageSize/exportFn")["getImageSizeFn"];
  getImgRectInfo: typeof import("./getImgRectInfo/exportFn")["getImgRectInfoFn"];
  getScreenRectInfo: typeof import("./getScreenRectInfo/exportFn")["getScreenRectInfoFn"];
  getScreenSize: typeof import("./getScreenSize/exportFn")["getScreenSizeFn"];
  GlobalShortcut: {
    listen: typeof import("./GlobalShortcut/listen/exportFn")["listenFn"];
    unlisten: typeof import("./GlobalShortcut/unlisten/exportFn")["unlistenFn"];
    waitKeys: typeof import("./GlobalShortcut/waitKeys/exportFn")["waitKeysFn"];
  };
  Input: {
    combined: typeof import("./Input/combined/exportFn")["combinedFn"];
    keyDown: typeof import("./Input/keyDown/exportFn")["keyDownFn"];
    keyUp: typeof import("./Input/keyUp/exportFn")["keyUpFn"];
    press: typeof import("./Input/press/exportFn")["pressFn"];
    text: typeof import("./Input/text/exportFn")["textFn"];
  };
  Mouse: {
    click: typeof import("./Mouse/click/exportFn")["clickFn"];
    clicker: typeof import("./Mouse/clicker/exportFn")["clickerFn"];
    down: typeof import("./Mouse/down/exportFn")["downFn"];
    drag: typeof import("./Mouse/drag/exportFn")["dragFn"];
    move: typeof import("./Mouse/move/exportFn")["moveFn"];
    pos: typeof import("./Mouse/pos/exportFn")["posFn"];
    randomMove: typeof import("./Mouse/randomMove/exportFn")["randomMoveFn"];
    up: typeof import("./Mouse/up/exportFn")["upFn"];
    wheel: typeof import("./Mouse/wheel/exportFn")["wheelFn"];
  };
  ocr: typeof import("./ocr/exportFn")["ocrFn"];
  screenColor: typeof import("./screenColor/exportFn")["screenColorFn"];
  screenshot: typeof import("./screenshot/exportFn")["screenshotFn"];
  screenshotColor: typeof import("./screenshotColor/exportFn")["screenshotColorFn"];
  slideTo: typeof import("./slideTo/exportFn")["slideToFn"];
  touch: typeof import("./touch/exportFn")["touchFn"];
};
