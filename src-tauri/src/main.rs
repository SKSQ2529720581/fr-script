#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use fr_script::export_api::{input, mouse, screen, tools, image};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            mouse::mouse_move_to,
            mouse::mouse_move_relative,
            mouse::mouse_move_click,
            mouse::mouse_press,
            mouse::mouse_release,
            mouse::mouse_wheel,
            mouse::mouse_get_pos,
            input::input_text,
            input::input_key,
            input::key_down,
            input::key_up,
            screen::get_screen_size,
            screen::screenshot,
            screen::get_screen_zoom,
            screen::get_screen_rect_info,
            screen::screen_match_template,
            screen::screen_diff_templates,
            image::crop_picture,
            image::get_img_size,
            image::get_similarity_value,
            image::match_template,
            image::get_img_rect_info,
            tools::move_window,
            tools::resize_window,
            tools::move_resize_window,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
