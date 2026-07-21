import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

const lazyWithRetry = (importFn) => lazy(() =>
    importFn().catch(() => importFn().catch(() => importFn()))
);

const Home = lazyWithRetry(() => import("../modules/home/home"));
const QuyHoachKhac = lazyWithRetry(() => import(/* webpackPrefetch: true */ "../modules/quyhoachkhac"));
const DanhGiaQuyHoach = lazyWithRetry(() => import(/* webpackPrefetch: true */ "../modules/danhgiaquyhoachkhac"));
const ChienLuocThuyLoi = lazyWithRetry(() => import(/* webpackPrefetch: true */ "../modules/chienluocthuyloi"));
const Contact = lazyWithRetry(() => import(/* webpackPrefetch: true */ "../modules/contact/contact"));
const Dulieu = lazyWithRetry(() => import(/* webpackPrefetch: true */ "../modules/dulieuquyhoach/dulieuquyhoach"));
const Kehoach = lazyWithRetry(() => import(/* webpackPrefetch: true */ "../modules/kehoach/kehoach"));
const Import = lazyWithRetry(() => import("../modules/data/import"));
const MapNewTile = lazyWithRetry(() => import(/* webpackPrefetch: true */ "../modules/map_new/indexTile"));
const MapNewTileTest = lazyWithRetry(() => import("../modules/map_new/indexTileTest"));

const Loading = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <span>Đang tải...</span>
    </div>
);

function Router() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/new-map" element={<MapNewTile />} />
                {process.env.NODE_ENV !== 'production' && (
                    <Route path="/new-map-test" element={<MapNewTileTest />} />
                )}
                {/* <Route path="/new-map-tile" element={<MapNewTile />} /> */}
                <Route path="/quy-hoach-khac" element={<QuyHoachKhac />} />
                <Route path="/danh-gia-quy-hoach" element={<DanhGiaQuyHoach />} />
                <Route path="/chien-luoc-thuy-loi" element={<ChienLuocThuyLoi />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/du-lieu-quy-hoach" element={<Dulieu />} />
                <Route path="/ke-hoach" element={<Kehoach />} />
                <Route path="/import-data" element={<Import />} />
            </Routes>
        </Suspense>
    );
}

export default Router;
