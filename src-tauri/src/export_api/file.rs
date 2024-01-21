use std::fs;

use crate::types::generate_result;

/// 获取当前可执行文件的安装目录。
///
/// Returns:
///
/// 当前可执行文件的安装目录。
#[tauri::command]
pub fn get_install_dir() -> String {
    let exe_path = std::env::current_exe().unwrap();
    let install_dir = exe_path.parent().unwrap();
    install_dir.to_str().unwrap().to_string()
}

/// 获取文件的基本信息
///
/// 参数:
///
/// * `file_path`: 文件路径。
///
/// Returns:
///
/// 一个“Result”类型，其中“String”作为成功值，“()”作为错误值。
#[tauri::command]
pub async fn get_file_info(file_path: &str) -> Result<String, ()> {
    let metadata = std::fs::metadata(file_path);
    match metadata {
        Ok(meta) => {
            let file_type = meta.file_type();
            let file_size = meta.len();
            let file_name = std::path::Path::new(file_path)
                .file_name()
                .unwrap()
                .to_str()
                .unwrap();
            let file_info = format!(
                "{{\"fileName\":\"{}\",\"fileSize\":{},\"fileType\":\"{}\"}}",
                file_name,
                file_size,
                if file_type.is_dir() { "dir" } else { "file" }
            );
            Ok(generate_result(file_info, 200))
        }
        Err(err) => Ok(generate_result(err.to_string(), 500)),
    }
}

#[tauri::command]
pub async fn copy_dep_file(
    source_path: String,
    target_path: String,
    del_origin_file: bool,
    overwrite: bool,
) -> Result<String, ()> {
    //将文件复制到指定目录，如果目录不存在则创建
    let target_path = std::path::Path::new(&target_path);
    if !target_path.exists() {
        fs::create_dir_all(target_path).unwrap();
    }
    let target_path = target_path.join(std::path::Path::new(&source_path).file_name().unwrap());
    if target_path.exists() && !overwrite {
        return Ok(generate_result(
            "目标文件已存在，不允许覆盖".to_string(),
            500,
        ));
    }
    let res = fs::copy(&source_path, &target_path);
    match res {
        Ok(_) => {
            if del_origin_file {
                fs::remove_file(&source_path).unwrap();
            }
            Ok(generate_result("文件复制成功".to_string(), 200))
        }
        Err(err) => Ok(generate_result(err.to_string(), 501)),
    }
}

#[tauri::command]
pub async fn decompress_dep_file(
    path: String,
    target_path: String,
    del_origin_file: bool,
) -> Result<String, ()> {
    let target_path = std::path::Path::new(&target_path);
    if !target_path.exists() {
        fs::create_dir_all(target_path).unwrap();
    }
    let res = sevenz_rust::decompress_file(&path, &target_path);
    match res {
        Ok(_) => {
            if del_origin_file {
                fs::remove_file(&path).unwrap();
            }
            Ok(generate_result("文件解压成功".to_string(), 200))
        }
        Err(err) => {
            println!("文件解压失败：{}", err);
          Ok(generate_result(err.to_string(), 501))
        },
    }
}