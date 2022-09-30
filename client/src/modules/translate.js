export const translateTV = (value) => {
    let array = {
        gid: "TT",
        ten_tram: "Tên Trạm",
        tinh: "Tỉnh",
        toa_dox: "Tọa độ X",
        toa_doy: "Tọa độ Y",
        cdo_tram: "Cao độ trạm",
        yeu_to_do: "Yếu tố đo",
        song: "Sông",
        H_TB: "Mực nước TB (m)",
        H_max: "Mực nước max (m)",
        H_min: "Mực nước min (m)",
    }
    return array[value] || ""
}
export const translateHV = (value) => {
    let array = {
        id: "TT: ",
        ten_tram: "Tên Trạm",
        dia_danh: "Vị trí",
        h_songmax: "Chiều cao sóng max",
        h_songmin: "Chiều cao sóng min",
        tđ_giomax: "Tốc độ gió max",
        tđ_giomin: "Tốc độ gió min",
        mnbien_max: "Mực nước biển max",
        mnbien_min: "Mực nước biển min",
        nhietdomax: "Nhiệt độ max",
        nhietdomin: "Nhiệt độ min",
        domuoimax: "Độ muối max",
        domuoimin: "Độ muối min",
    }
    return array[value] || ""
}
export const translateKT = (value) => {
    let array = {
        gid: "TT: ",
        ten_tram: "Tên Trạm",
        tinh: "Tỉnh",
        toa_dox: "Tọa độ X",
        toa_doy: "Tọa độ Y",
        cdo_tram: "Cao độ trạm",
        mua_tbnam: "Mưa TB năm (mm)",
        mua_max: "Mưa năm max (mm)",
        mua_min: "Mưa năm min(mm)",
        x1_max: "Mưa 1 ngày max (mm)",
        x3_max: "Mưa 3 ngày max (mm)",
        x5_max: "Mưa 5 ngày max (mm)",
        x7_max: "Mưa 7 ngày max (mm)",
    }
    return array[value] || ""
}