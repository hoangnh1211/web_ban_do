const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/vnsdi-proxy',
        createProxyMiddleware({
            target: 'https://vnsdi.mae.gov.vn/basemap/rest/services/BanDoHanhChinhVietNam/MapServer/tile',
            changeOrigin: true,
            pathRewrite: { '^/vnsdi-proxy': '' },
            headers: {
                Referer: 'https://ttnnmt.ispae.vn/',
                Host: 'vnsdi.mae.gov.vn',
            },
        })
    );
};
