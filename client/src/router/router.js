import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

// Sử dụng lazy loading để tối ưu tốc độ tải trang
const Home = lazy(() => import("../modules/home/home"));
const QuyHoachKhac = lazy(() => import("../modules/quyhoachkhac"));
const DanhGiaQuyHoach = lazy(() => import("../modules/danhgiaquyhoachkhac"));
const ChienLuocThuyLoi = lazy(() => import("../modules/chienluocthuyloi"));
const Contact = lazy(() => import("../modules/contact/contact"));
const Dulieu = lazy(() => import("../modules/dulieuquyhoach/dulieuquyhoach"));
const Import = lazy(() => import("../modules/data/import"));
const MapNewTile = lazy(() => import("../modules/map_new/indexTile"));

// Tạo component loading đơn giản
const Loading = () => <div></div>;

function Router() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/new-map" element={<MapNewTile />} />
                {/* <Route path="/new-map-tile" element={<MapNewTile />} /> */}
                <Route path="/quy-hoach-khac" element={<QuyHoachKhac />} />
                <Route path="/danh-gia-quy-hoach" element={<DanhGiaQuyHoach />} />
                <Route path="/chien-luoc-thuy-loi" element={<ChienLuocThuyLoi />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/du-lieu-quy-hoach" element={<Dulieu />} />
                <Route path="/import-data" element={<Import />} />
            </Routes>
        </Suspense>
    );
}

export default Router;
