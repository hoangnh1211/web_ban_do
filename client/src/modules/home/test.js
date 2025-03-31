import React, { useState, useEffect, useRef } from "react";
import { Box, CardMedia } from "@mui/material";

const AutoScrollCarousel = ({ items, itemsPerPage = 4, autoScrollInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = items.length;
    const carouselRef = useRef(null);

    // Tự động cuộn sang item tiếp theo mỗi 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                return nextIndex > totalItems - itemsPerPage ? 0 : nextIndex; // Quay về item đầu tiên nếu đã đến cuối
            });
        }, autoScrollInterval);

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, [totalItems, itemsPerPage, autoScrollInterval]);

    // Hiệu ứng chuyển đổi mượt khi currentIndex thay đổi
    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.transform = `translateX(-${(currentIndex * 100) / itemsPerPage}%)`;
            carouselRef.current.style.transition = "transform 0.5s ease";
        }
    }, [currentIndex, itemsPerPage]);

    return (
        <div className="d-flex justify-content-center">
            <Box sx={{ width: `1008px`, overflow: "hidden", position: "relative" }}>
                {/* Hiển thị các item */}
                <Box
                    ref={carouselRef}
                    sx={{
                        display: "flex",
                        width: `1008px`, // Đảm bảo chiều rộng tổng container
                    }}
                >
                    {items.map((logo, index) => (
                        <Box
                            sx={{ height: 164, width: 212, margin: '15px 20px', textAlign: 'center' }}
                        >
                            <a href={logo.link} target="_blank" rel="noopener noreferrer" className='d-flex justify-content-center'>
                                <CardMedia
                                    key={logo.id}
                                    component="img"
                                    image={logo.src}
                                    alt={logo.alt}
                                    sx={{ height: 100, width: 'auto' }}
                                />
                            </a>
                            <Box
                                sx={{ marginTop: 2 }}
                            >
                                <a href={logo.link} target="_blank" rel="noreferrer" >
                                    <button
                                        style={{
                                            lineHeight: '15.96px',
                                            height: 54,
                                            width: 212,
                                            background: 'linear-gradient(90deg, rgba(195, 227, 251, 0.53), rgba(255, 255, 255, 0.53))',
                                            border: '3px solid rgba(142, 221, 255, 1)',
                                            borderRadius: 20,

                                        }}
                                        className='logo_button'>{logo.text}</button>
                                </a>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Hiển thị dot */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    {Array.from({ length: totalItems - itemsPerPage + 1 }).map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrentIndex(index)} // Click vào dot để chuyển đến item
                            sx={{
                                width: currentIndex === index ? "30px":"12px",
                                height: "12px",
                                margin: "0 4px",
                                borderRadius: 4,
                                background: currentIndex === index ? 'linear-gradient(90deg, #4596FF 0%, #21258F 100%)' : '#DDE0E4',
                                transition: 'width 0.3s ease',
                                cursor: "pointer",
                            }}
                        ></Box>
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default function Test() {
    const items = [
        { id: 1, src: 'image/logo_1.png', alt: 'Logo 1', link: 'https://iwrp.gov.vn/', text: 'VIỆN QUY HOẠCH THUỶ LỢI' },
        { id: 2, src: 'image/logo_2.png', alt: 'Logo 2', link: 'https://www1.cucthuyloi.gov.vn/', text: 'CỤC THUỶ LỢI' },
        { id: 3, src: 'image/logo_3.jpg', alt: 'Logo 3', link: 'https://mard.gov.vn/Pages/default.aspx/', text: 'BỘ NÔNG NGHIỆP VÀ PHÁT TRIỂN NÔNG THÔN' },
        { id: 4, src: 'image/logo_4.png', alt: 'Logo 4', link: 'https://www.siwrp.org.vn/', text: 'VIỆN QUY HOẠCH THUỶ LỢI MIỀN NAM' },
        { id: 5, src: 'image/logo_5.png', alt: 'Logo 5', link: 'https://www.tlu.edu.vn/', text: 'TRƯỜNG ĐẠI HỌC THUỶ LỢI' },
        { id: 6, src: 'image/logo_6.png', alt: 'Logo 6', link: 'https://vawr.org.vn/', text: 'VIỆN KHOA HỌC THUỶ LỢI VIỆT NAM' },
        { id: 7, src: 'image/logo_7.jpg', alt: 'Logo 7', link: 'http://www.siwrr.org.vn/?gid=84&id=1191&page=1&lang=', text: 'VIỆN KHOA HỌC THUỶ LỢI MIỀN NAM' },
    ];

    return <AutoScrollCarousel items={items} itemsPerPage={4} autoScrollInterval={5000} />;
}
