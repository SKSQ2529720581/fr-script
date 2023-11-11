use crate::{c_api::util::Util, types::generate_result};

/// 移动窗口位置
///
/// 参数:
///
/// * `w_title`: 窗口标题。
/// * `target_x`: 目标位置X坐标。
/// * `target_y`: 目标位置Y坐标。
///
/// 返回:
///
/// 一个“Result”类型，其中“String”作为成功值，“()”作为错误值。
///
/// 返回示例："{\"code\":200,\"message\":\"成功将窗口移动至指定坐标\"}"
#[tauri::command]
pub async fn move_window(w_title: &str, target_x: i32, target_y: i32) -> Result<String, ()> {
    let util: Util = Util::new();
    let res: i32 = util.move_window(w_title, target_x, target_y).unwrap_or(-1);
    let code = match res {
        -1 => 500,
        _ => 200,
    };
    let msg = match res {
        -1 => "程序出现异常，窗口移动失败".to_string(),
        _ => "成功将窗口移动至指定坐标".to_string(),
    };
    Ok(generate_result(format!("{}", msg), code))
}

/// 调整窗口大小
///
/// 参数:
///
/// * `w_title`: 窗口标题。
/// * `width`: 宽度。
/// * `height`: 高度。
///
/// 返回:
///
/// 一个“Result”类型，其中“String”作为成功值，“()”作为错误值。
///
/// 返回示例："{\"code\":200,\"message\":\"成功将窗口大小调整为指定大小\"}"
#[tauri::command]
pub async fn resize_window(w_title: &str, width: i32, height: i32) -> Result<String, ()> {
    let util: Util = Util::new();
    let res: i32 = util.resize_window(w_title, width, height).unwrap_or(-1);
    let code = match res {
        -1 => 500,
        _ => 200,
    };
    let msg = match res {
        -1 => "程序出现异常，窗口大小调整失败".to_string(),
        _ => "成功将窗口大小调整为指定大小".to_string(),
    };
    Ok(generate_result(format!("{}", msg), code))
}

/// 移动窗口同时调整窗口大小
///
/// 参数:
///
/// * `w_title`: 窗口标题。
/// * `target_x`: 目标位置X坐标。
/// * `target_y`: 目标位置Y坐标。
/// * `width`: 宽度。
/// * `height`: 高度。
///
/// 返回:
///
/// 一个“Result”类型，其中“String”作为成功值，“()”作为错误值。
///
/// 返回示例："{\"code\":200,\"message\":\"成功将窗口大小调整为指定大小并移动到了目标位置\"}"
#[tauri::command]
pub async fn move_resize_window(
    w_title: &str,
    target_x: i32,
    target_y: i32,
    width: i32,
    height: i32,
) -> Result<String, ()> {
    let util: Util = Util::new();
    let res: i32 = util
        .resize_and_move_window(w_title, target_x, target_y, width, height)
        .unwrap_or(-1);
    let code = match res {
        -1 => 500,
        _ => 200,
    };
    let msg = match res {
        -1 => "程序出现异常，窗口大小调整并移动失败".to_string(),
        _ => "成功将窗口大小调整为指定大小并移动到了目标位置".to_string(),
    };
    Ok(generate_result(format!("{}", msg), code))
}
