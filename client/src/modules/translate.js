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

export const translateKK = (value) => {
    let array = {
        stt: "STT",
        vitri: "Vị trí quan trắc",
        khuvuc: "Khu vực",
        mahieu_1: "Mã hiệu",
        tanso: "Tần suất quan trắc",
        toadox: "Tọa độ X",
        toadoy: "Tọa độ Y",
    }
    return array[value] || ""
}

export const translateNM = (value) => {
    let array = {
        stt: "STT",
        vitri: "Vị trí quan trắc",
        khuvuc: "Khu vực",
        mahieu_1: "Mã hiệu",
        thongso: "Thông số",
        tansuat: "Tần suất quan trắc",
        x_1: "Tọa độ X",
        y_1: "Tọa độ Y",
    }
    return array[value] || ""
}
export const translateNN = (value) => {
    let array = {
        stt: "STT",
        vitri: "Vị trí quan trắc",
        mahieu_1: "Mã hiệu",
        donvikhait: "Đơn vị khai thác",
        x_1: "Tọa độ X",
        y_1: "Tọa độ Y",
    }
    return array[value] || ""
}
export const translateNB = (value) => {
    let array = {
        stt: "STT",
        vitriquant: "Vị trí quan trắc",
        khuvuc: "Khu vực",
        thongso_qu: "Thông số",
        mahieu_1: "Mã hiệu",
        tansuat: "Tần suất quan trắc",
        toadox_1: "Tọa độ X",
        toadoy_1: "Tọa độ Y",
    }
    return array[value] || ""
}
export const translateTT = (value) => {
    let array = {
        stt: "STT",
        vitri: "Vị trí quan trắc",
        khuvuc: "Khu vực",
        loaihinh: "Loại hình",
        mahieu_1: "Mã hiệu",
        toadox_1: "Tọa độ X",
        toadoy_1: "Tọa độ Y",
        thongso: "Thông số"
    }
    return array[value] || ""
}
export const translateMTD = (value) => {
    let array = {
        stt: "STT",
        vitri: "Vị trí quan trắc",
        phamvi: "Phạm vi",
        thongso: "Thông số",
        mahieu_1: "Mã hiệu",
        toado_x_1: "Tọa độ X",
        toado_y_1: "Tọa độ Y",
    }
    return array[value] || ""
}

export const translateKQ = (value) => {
    let array = {
        stt: "STT",
        vitri: "Vị trí",
        mahieu: "Mã hiệu",
        toadox: "Tọa độ X",
        toadoy: "Tọa độ Y",
        cd: "Cd (µg/l)",
        pb: "Pb (µg/l)",
        tongcr: "Tổng Cr (µg/l)",
        as_: "As (µg/l)",
        hg: "Hg (µg/l)",
        cu: "Cu (µg/l)",
        zn: "Zn (µg/l)",
        clo: "Thuốc bảo vệ thực vật nhóm Clo Hữu cơ (µg/l)",
        photpho: "Thuốc bảo vệ thực vật nhóm Phốt pho Hữu cơ (µg/l)",
    }
    return array[value] || ""
}

