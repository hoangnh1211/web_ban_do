import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sun, Cloud, CloudRain, CloudLightning, Map as MapIcon, FileText, Settings, Zap, 
  Waves, Calendar, Database, ClipboardCheck, Bell, Home, Info, ChevronRight, 
  BookOpen, Monitor, MapPin, Wind, User, Droplet, ChevronLeft, Download, Share2, 
  Printer, Activity, ArrowUpRight, ArrowDownRight, CalendarDays, Clock,
  Grip, Shield, AlertTriangle, Building2, Coins, Beaker, Globe, Newspaper,
  Search, Layers, Plus, Minus, LocateFixed, Filter, BarChart3, Cpu, Radio, Scan, Scale, Network
} from 'lucide-react';

const ScrollbarStyles = () => (
  <style>{`
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; transition: all 0.3s ease; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .blur-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
  `}</style>
);

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
];

const DIRECTIVES_DATA = [
  {
    id: 'cd-01', number: '1/CĐ-TL-VHTT', date: 'Hà Nội, ngày 14 tháng 01 năm 2026',
    title: 'CÔNG ĐIỆN\nVề việc tổ chức lấy nước Đợt 1 phục vụ gieo cấy lúa vụ Đông Xuân 2025-2026, khu vực Trung du và Đồng bằng Bắc Bộ',
    sender: 'CỤC QUẢN LÝ VÀ XÂY DỰNG CÔNG TRÌNH THỦY LỢI', isCongDien: true,
    fullContent: {
      leftHeader: 'BỘ NÔNG NGHIỆP VÀ MÔI TRƯỜNG\nCỤC QUẢN LÝ VÀ XÂY DỰNG\nCÔNG TRÌNH THUỶ LỢI\n-------',
      rightHeader: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n---------------',
      docNumber: 'Số: 1/CĐ-TL-VHTT',
      recipient: 'CỤC TRƯỞNG CỤC THỦY LỢI điện:\n- Giám đốc Sở Nông nghiệp và Môi trường các tỉnh, thành phố: Phú Thọ, Bắc Ninh, Hưng Yên, Hà Nội, Hải Phòng, Ninh Bình;\n- Chủ tịch, Giám đốc các đơn vị quản lý hệ thống thủy lợi liên tỉnh: Bắc Đuống, Bắc Hưng Hải, Sông Nhuệ.',
      intro: 'Theo Văn bản số 730/TB-BNNMT ngày 11/12/2025 của Bộ Nông nghiệp và Môi trường thông báo lịch lấy nước phục vụ gieo cấy lúa vụ Đông Xuân 2025 - 2026...',
      mainPoints: [
        'Khẩn trương di chuyển, thu dọn phương tiện thi công nạo vét ra ngoài hệ thống dẫn nước.',
        'Theo dõi chặt chẽ các thông tin liên quan đến nguồn nước, ngay khi nguồn nước cho phép, tổ chức vận hành công trình thủy lợi lấy nước.',
        'Khẩn trương vận động, hướng dẫn người dân thực hiện sớm việc thu hoạch cây vụ Đông.'
      ],
      closing: 'Đề nghị Giám đốc Sở Nông nghiệp và Môi trường các tỉnh, thành phố khẩn trương tổ chức triển khai thực hiện./.',
      signatory: 'KT. CỤC TRƯỞNG\nPHÓ CỤC TRƯỞNG\n\nNguyễn Hồng Khanh'
    }
  },
  {
    id: 'cd-02', number: '2/CĐ-TL-VHTT', date: 'Hà Nội, ngày 26 tháng 01 năm 2026',
    title: 'CÔNG ĐIỆN\nVề việc tổ chức lấy nước Đợt 2 phục vụ gieo cấy lúa vụ Đông Xuân 2025-2026, khu vực Trung du và Đồng bằng Bắc Bộ',
    sender: 'CỤC QUẢN LÝ VÀ XÂY DỰNG CÔNG TRÌNH THỦY LỢI', isCongDien: true,
    fullContent: {
      leftHeader: 'BỘ NÔNG NGHIỆP VÀ MÔI TRƯỜNG\nCỤC QUẢN LÝ VÀ XÂY DỰNG\nCÔNG TRÌNH THUỶ LỢI\n-------',
      rightHeader: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n---------------',
      docNumber: 'Số: 2/CĐ-TL-VHTT',
      recipient: 'CỤC TRƯỞNG CỤC QUẢN LÝ VÀ XÂY DỰNG CÔNG TRÌNH THỦY LỢI điện:\n- Giám đốc Sở Nông nghiệp và Môi trường các tỉnh, thành phố...',
      intro: 'Thời gian lấy nước Đợt 2 sẽ bắt đầu từ 0 giờ 00\' ngày 29/1 đến 24 giờ 00\' ngày 4/2/2026 (7 ngày)...',
      mainPoints: [
        'Tiếp tục vận hành công trình thủy lợi lấy nước trước thời gian lấy nước Đợt 2 nếu nguồn nước cho phép.',
        'Tăng cường vận động, hướng dẫn người dân thực hiện sớm việc làm đất và gieo cấy để giữ nước trên ruộng.',
        'Báo cáo kết quả lấy nước hằng ngày và tổng kết nhanh ngay sau khi kết thúc Đợt 2 lấy nước.'
      ],
      closing: 'Đề nghị Giám đốc Sở Nông nghiệp và Môi trường các tỉnh, thành phố khẩn trương tổ chức triển khai thực hiện./.',
      signatory: 'KT. CỤC TRƯỞNG\nPHÓ CỤC TRƯỞNG\n\nNguyễn Hồng Khanh'
    }
  },
  {
    id: '3952', number: '3952/CT-BNNMT', date: 'Hà Nội, ngày 22 tháng 4 năm 2026',
    title: 'CHỈ THỊ\nVề việc tăng cường công tác đảm bảo an toàn công trình đê điều, thủy lợi trong mùa mưa, lũ năm 2026',
    sender: 'BỘ NÔNG NGHIỆP VÀ MÔI TRƯỜNG', isCongDien: false,
    fullContent: {
      leftHeader: 'BỘ NÔNG NGHIỆP VÀ MÔI TRƯỜNG',
      rightHeader: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc',
      docNumber: 'Số: 3952/CT-BNNMT',
      recipient: 'Kính gửi: Chủ tịch UBND các tỉnh, thành phố trực thuộc trung ương',
      intro: 'Năm 2025, thiên tai diễn ra dồn dập, khốc liệt, vượt mức lịch sử gây nhiều thiệt hại... Để chủ động phòng, chống lụt bão...',
      mainPoints: [
        'Chủ động, sẵn sàng ứng phó thiên tai: Kiện toàn tổ chức, xây dựng phương án hộ đê.',
        'Tu bổ, duy bảo dưỡng công trình: Tập trung huy động nguồn lực xử lý các sự cố.',
        'Đảm bảo an toàn mùa mưa lũ: Tổ chức tuần tra canh gác bảo vệ đê.'
      ],
      closing: 'Báo cáo kịp thời các vấn đề phát sinh về Bộ Nông nghiệp và Môi trường./.',
      signatory: 'BỘ TRƯỞNG\n\nTrịnh Việt Hùng'
    }
  },
  {
    id: '965', number: '965/TL-VHTT', date: 'Hà Nội, ngày 20 tháng 4 năm 2026',
    title: 'VĂN BẢN\nV/v tổ chức sản xuất nông nghiệp phù hợp với tình hình nguồn nước, chủ động ứng phó với hạn hán, xâm nhập mặn mùa khô năm 2026-2027 vùng ĐBSCL',
    sender: 'CỤC QUẢN LÝ VÀ XÂY DỰNG CÔNG TRÌNH THỦY LỢI', isCongDien: false,
    fullContent: {
      leftHeader: 'BỘ NÔNG NGHIỆP VÀ MÔI TRƯỜNG\nCỤC QUẢN LÝ VÀ XÂY DỰNG\nCÔNG TRÌNH THỦY LỢI',
      rightHeader: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc',
      docNumber: 'Số: 965/TL-VHTT',
      recipient: 'Kính gửi: Sở Nông nghiệp và Môi trường các tỉnh, thành phố vùng Đồng bằng sông Cửu僚',
      intro: 'Hiện tượng ENSO đang chuyển pha sang trung tính và có khả năng cao chuyển sang El Nino...',
      mainPoints: [
        'Chủ động tổ chức sản xuất phù hợp, gieo cấy lúa Đông Xuân 2026-2027 sớm hơn kế hoạch.',
        'Rà soát, khoanh vùng các khu vực cây ăn trái để chuẩn bị phương án tích trữ nước phân tán.'
      ],
      closing: 'Đề nghị Sở Nông nghiệp và Môi trường các tỉnh vùng ĐBSCL khẩn trương thực hiện./.',
      signatory: 'KT. CỤC TRƯỞNG\nPHÓ CỤC TRƯỞNG\n\nNguyễn Hồng Khanh'
    }
  }
];

const FACILITY_DB = [
  { id: 'HC-001', code: 'G10.TL0002.HC001', name: 'Hồ chứa Cửa Đạt', type: 'Hồ chứa', region: 'Bắc Trung Bộ', province: 'Thanh Hóa', spec: 'Wtb: 1.45 tỷ m³', manager: 'Công ty TNHH MTV Cửa Đạt', lat: 19.897, lng: 105.286 },
  { id: 'HC-002', code: 'G10.TL0001.HC001', name: 'Hồ Dầu Tiếng', type: 'Hồ chứa', region: 'Đông Nam Bộ', province: 'Tây Ninh', spec: 'Wtb: 1.58 tỷ m³', manager: 'Công ty TNHH MTV KT TLL Dầu Tiếng', lat: 11.332, lng: 106.324 },
  { id: 'HC-003', code: 'G02.TL0023.TD001', name: 'Hồ Ka Năk', type: 'Hồ chứa', region: 'Tây Nguyên', province: 'Gia Lai', spec: 'Wtb: 313 triệu m³', manager: 'Công ty Thủy điện An Khê - Ka Nák', lat: 14.286, lng: 108.665 },
  { id: 'TB-001', code: 'H26.TL0405.TB001', name: 'Trạm bơm Liên Mạc', type: 'Trạm bơm', region: 'Đồng bằng sông Hồng', province: 'Hà Nội', spec: 'Q: 170 m³/s', manager: 'Công ty TNHH MTV ĐT PT Thủy lợi Sông Nhuệ', lat: 21.085, lng: 105.753 },
  { id: 'TB-002', code: 'H58.TL0001.TB1000', name: 'Trạm bơm Xuân Hòa', type: 'Trạm bơm', region: 'Đồng bằng sông Cửu Long', province: 'Tiền Giang', spec: 'Q: 12.5 m³/s', manager: 'Trung tâm QL KT CTTL Tiền Giang', lat: 10.366, lng: 106.350 },
  { id: 'DD-001', code: 'H48.TL0021.DD001', name: 'Đập dâng Thạch Nham', type: 'Đập dâng', region: 'Nam Trung Bộ', province: 'Quảng Ngãi', spec: 'Cao trình đỉnh đập: 28.5m', manager: 'Công ty TNHH MTV KT CTTL Quảng Ngãi', lat: 15.150, lng: 108.666 },
  { id: 'CG-001', code: 'G10.TL0008.CO001', name: 'Cống Cái Lớn', type: 'Cống', region: 'Đồng bằng sông Cửu Long', province: 'Kiên Giang', spec: 'Khẩu độ: 11 khoang x 40m', manager: 'Chi nhánh QL CTTL Cái Lớn - Cái Bé', lat: 9.850, lng: 105.116 },
  { id: 'KN-001', code: 'G10.TL0003.HC001', name: 'Hồ Ngàn Trươi', type: 'Hồ', region: 'Bắc Trung Bộ', province: 'Hà Tĩnh', spec: 'Wtb: 704 triệu m³', manager: 'Công ty TNHH MTV Ngàn Trươi', lat: 18.283, lng: 105.450 },
];

const WATER_SUPPLY_FACILITIES = [
  { id: 'NS-001', code: 'CTNS.01.2023', type: 'Trạm bơm cấp nước', province: 'Hà Nam', capacity: 'Từ 1.000 - 5.000 m3/ngày đêm', status: 'Hoạt động tốt' },
  { id: 'NS-002', code: 'CTNS.02.2021', type: 'Hệ thống tự chảy', province: 'Hòa Bình', capacity: 'Dưới 500 m3/ngày đêm', status: 'Hoạt động kém hiệu quả' },
  { id: 'NS-003', code: 'CTNS.03.2024', type: 'Trạm xử lý nước mặt', province: 'Bến Tre', capacity: 'Trên 5.000 m3/ngày đêm', status: 'Hoạt động tốt' },
  { id: 'NS-004', code: 'CTNS.04.2019', type: 'Trạm bơm cấp nước', province: 'Sóc Trăng', capacity: 'Từ 500 - 1.000 m3/ngày đêm', status: 'Ngừng hoạt động' },
  { id: 'NS-005', code: 'CTNS.05.2022', type: 'Hệ thống tự chảy', province: 'Lào Cai', capacity: 'Dưới 500 m3/ngày đêm', status: 'Hoạt động tốt' }
];

const VietnamIrrigationLogo = ({ className }) => (
  <svg viewBox="0 0 120 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 5C60 5 95 45 95 80C95 99.33 79.33 115 60 115C40.67 115 25 99.33 25 80C25 45 60 5 60 5Z" fill="#004A99" />
    <path d="M45 55H52V88H45V55ZM55 50H62V98H55V50ZM40 65L42 63V88H40V65Z" fill="#D97706" />
    <path d="M50 95C55 92 65 92 70 95C75 98 85 98 90 95M50 102C55 99 65 99 70 102C75 105 85 105 90 102" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
    <defs><path id="textPathLogo" d="M20 110C35 125 85 125 100 110" /></defs>
    <text fill="#004A99" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">
      <textPath href="#textPathLogo" startOffset="50%" textAnchor="middle">THỦY LỢI VIỆT NAM</textPath>
    </text>
  </svg>
);

const HydroDamIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 9h5" /><path d="M2 13h6" /><path d="M2 17h7" /><path d="M7 3h4l5 18H9L7 3z" /><path d="M17 5l-3 5h4l-3 5" />
  </svg>
);

const ControlGateIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="4" height="18" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" />
    <rect x="7" y="8" width="10" height="7" /><path d="M12 3v5" /><path d="M10 2h4" /><path d="M7 19c1.5-1 3.5-1 5 0s3.5 1 5 0" />
  </svg>
);

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const lRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
        const wData = await wRes.json();
        const lData = await lRes.json();
        setWeather(wData);
        setLocationName((lData.address.city || lData.address.town || lData.address.state || "Hà Nội").replace("Thành phố ", "TP. ").replace("Tỉnh ", ""));
        setLoading(false);
      } catch (e) { setLoading(false); }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => fetchWeather(p.coords.latitude, p.coords.longitude), () => fetchWeather(21.0285, 105.8542));
    } else fetchWeather(21.0285, 105.8542);
  }, []);

  if (loading) return <div className="h-10 w-24 bg-white/20 rounded-2xl animate-pulse"></div>;
  return (
    <div className="flex flex-col items-end bg-black/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 px-3 shadow-lg">
      <div className="flex items-center gap-1.5"><Sun className="text-yellow-300" size={18} /><span className="text-sm font-black text-white">{Math.round(weather?.current_weather?.temperature || 0)}°C</span></div>
      <div className="flex items-center gap-1 opacity-100 mt-0.5"><MapPin size={8} className="text-white" /><span className="text-[9px] font-black uppercase text-white truncate max-w-[60px]">{locationName}</span></div>
    </div>
  );
};

const SharedBottomNav = ({ goHome, activeTab, setActiveTab, themeColor = 'sky' }) => {
  const themes = {
    sky: { text: 'text-sky-600', border: 'border-sky-100/50' }, blue: { text: 'text-blue-800', border: 'border-blue-100/50' },
    rose: { text: 'text-rose-600', border: 'border-rose-100/50' }, indigo: { text: 'text-indigo-600', border: 'border-indigo-100/50' },
    red: { text: 'text-red-600', border: 'border-red-100/50' }, orange: { text: 'text-orange-600', border: 'border-orange-100/50' },
    violet: { text: 'text-violet-600', border: 'border-violet-100/50' }, cyan: { text: 'text-cyan-600', border: 'border-cyan-100/50' },
  };
  const theme = themes[themeColor] || themes.sky;

  return (
    <nav className="bg-white/20 backdrop-blur-md border-t border-white/30 px-8 py-4 flex items-center justify-between rounded-t-[32px] shadow-[0_-4px_25px_rgba(0,0,0,0.05)] z-20 absolute bottom-0 left-0 right-0">
      <button onClick={goHome} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? theme.text : 'text-slate-500'}`}>
        <div className={`p-2 rounded-xl shadow-sm border ${activeTab === 'home' ? `bg-white ${theme.border}` : 'border-transparent'}`}><Home size={22} fill={activeTab === 'home' ? 'currentColor' : 'none'}/></div>
        <span className="text-[10px] font-bold uppercase tracking-tighter">Trang chủ</span>
      </button>
      <button onClick={() => setActiveTab('login')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'login' ? theme.text : 'text-slate-500'}`}>
        <div className={`p-2 rounded-xl shadow-sm border ${activeTab === 'login' ? `bg-white ${theme.border}` : 'border-transparent'}`}><User size={22}/></div>
        <span className="text-[10px] font-bold uppercase tracking-tighter">Đăng nhập</span>
      </button>
      <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? theme.text : 'text-slate-500'}`}>
        <div className={`p-2 rounded-xl shadow-sm border ${activeTab === 'settings' ? `bg-white ${theme.border}` : 'border-transparent'}`}><Settings size={22}/></div>
        <span className="text-[10px] font-bold uppercase tracking-tighter">Cấu hình</span>
      </button>
    </nav>
  );
};

const AppHeader = ({ title, showWeather = true, bgGradient, bgImages = BACKGROUND_IMAGES, currentImgIndex = 0, onBack, backText }) => (
  <header className="relative px-5 pt-14 pb-4 rounded-b-[28px] shadow-xl overflow-hidden text-white mb-4 shrink-0">
    {onBack && (
      <button onClick={onBack} className="absolute top-3 left-4 z-20 px-2 py-1.5 bg-white/20 rounded-lg backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-1">
        <ChevronLeft size={16} className="text-white shrink-0" />
        {backText && <span className="text-[9px] font-bold text-white uppercase pr-1 tracking-tight">{backText}</span>}
      </button>
    )}
    <div className="absolute inset-0 z-0 overflow-hidden">
      {bgImages.map((img, index) => (
        <div key={index} className={`absolute inset-0 transition-all duration-1000 bg-cover bg-center ${index === currentImgIndex ? 'opacity-65 scale-100' : 'opacity-0 scale-95'}`} style={{ backgroundImage: `url(${img})`, filter: 'blur(0.5px)' }} />
      ))}
      <div className={`absolute inset-0 ${bgGradient} mix-blend-multiply`}></div>
    </div>
    <div className="relative z-10 flex flex-col w-full">
         <div className="flex items-center gap-3 w-full mb-3">
             <VietnamIrrigationLogo className="w-10 h-10 shrink-0 drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]" />
             <div className="flex-1 pb-1 border-b border-white/30 font-bold uppercase text-[10px] sm:text-[11px] tracking-widest opacity-90 text-left text-white leading-tight">
                 CỤC QUẢN LÝ VÀ XÂY DỰNG CÔNG TRÌNH THỦY LỢI
             </div>
         </div>
         <div className="flex items-center justify-between w-full gap-2">
             <h1 onClick={onBack} className={`text-[13px] sm:text-[14px] font-black text-white leading-tight drop-shadow-md tracking-tight uppercase truncate ${onBack ? 'cursor-pointer active:opacity-70 transition-opacity' : ''}`}>
                 {title}
             </h1>
             {showWeather && <WeatherWidget />}
         </div>
    </div>
  </header>
);

const SwipeableScreen = ({ children, goBack }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isRightSwipe && goBack) {
      goBack();
    }
  };

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndHandler} className="w-full h-full relative flex flex-col">
      {children}
    </div>
  );
};

// ==========================================
// CÁC COMPONENT BIỂU ĐỒ MƯA (RAINFALL CHARTS)
// ==========================================
const RainfallChart = ({ title, maxY, data }) => {
  const width = 360;
  const height = 240;
  const padLeft = 40;
  const padBottom = 25;
  const padTop = 30;
  const padRight = 15;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const getX = (index, total) => padLeft + (index / (total - 1)) * chartW;
  const getY = (val) => height - padBottom - (val / maxY) * chartH;

  const createPath = (arr) => {
    if (!arr || arr.length === 0) return '';
    return arr.map((val, i) => {
       if (val === null) return '';
       const cmd = i === 0 || arr[i-1] === null ? 'M' : 'L';
       return `${cmd} ${getX(i, arr.length)} ${getY(val)}`;
    }).join(' ');
  };

  const ticks = Array.from({length: 11}, (_, i) => Math.round((maxY / 10) * i));
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];

  return (
     <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-5">
        <h3 className="text-center font-bold text-[#0066cc] text-[15px] pt-4 px-4 leading-tight">{title}</h3>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto mt-2">
           {/* Grid lines */}
           {ticks.map((tick, i) => (
              <g key={i}>
                 <text x={padLeft - 5} y={getY(tick) + 3} textAnchor="end" fontSize="11" fill="#475569">{tick}</text>
                 <line x1={padLeft} y1={getY(tick)} x2={width - padRight} y2={getY(tick)} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
              </g>
           ))}
           {/* X axis labels */}
           {months.map((t, i) => (
              <text key={i} x={getX(i, 6)} y={height - 5} textAnchor="middle" fontSize="11" fill="#0000ff">{t}</text>
           ))}

           {/* X and Y Axis solid lines */}
           <line x1={padLeft} y1={padTop} x2={padLeft} y2={height - padBottom} stroke="#0f172a" strokeWidth="1" />
           <line x1={padLeft} y1={height - padBottom} x2={width - padRight} y2={height - padBottom} stroke="#0f172a" strokeWidth="1" />

           {/* Data Lines */}
           <path d={createPath(data.average)} fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
           <path d={createPath(data.historical)} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
           <path d={createPath(data.lastYear)} fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
           <path d={createPath(data.current)} fill="none" stroke="#0ea5e9" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
           <path d={createPath(data.forecast)} fill="none" stroke="#e11d48" strokeWidth="3.5" strokeDasharray="5 4" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-2 pb-4 px-4 text-[10.5px] font-medium text-slate-700">
           <div className="flex items-center gap-1.5"><div className="w-5 h-2 bg-[#0ea5e9] rounded-full"></div> Từ đầu vụ đến nay</div>
           <div className="flex items-center gap-1.5"><div className="w-5 h-2 bg-transparent border-t-2 border-dashed border-[#e11d48] mt-1"></div> Dự báo tháng tới</div>
           <div className="flex items-center gap-1.5"><div className="w-5 h-2 bg-[#9ca3af] rounded-full"></div> Trung bình nhiều năm</div>
           <div className="flex items-center gap-1.5"><div className="w-5 h-2 bg-[#10b981] rounded-full"></div> Năm 2025</div>
           <div className="flex items-center gap-1.5"><div className="w-5 h-2 bg-[#f59e0b] rounded-full"></div> Năm hạn lịch sử</div>
        </div>
     </div>
  );
};


const FacilityDashboard = ({ goBack, isRoot = false }) => {
  const [searchFac, setSearchFac] = useState("");
  const [filterType, setFilterType] = useState("Tất cả");
  const [filterRegion, setFilterRegion] = useState("Tất cả");
  const [filterProvince, setFilterProvince] = useState("Tất cả");
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMapFacility, setSelectedMapFacility] = useState(null);

  const uniqueTypes = ["Tất cả", ...new Set(FACILITY_DB.map(item => item.type))];
  const uniqueRegions = ["Tất cả", ...new Set(FACILITY_DB.map(item => item.region))];
  const uniqueProvinces = ["Tất cả", ...new Set(FACILITY_DB.map(item => item.province))];

  const filteredFacilities = FACILITY_DB.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchFac.toLowerCase()) || item.code.toLowerCase().includes(searchFac.toLowerCase());
    const matchType = filterType === "Tất cả" || item.type === filterType;
    const matchRegion = filterRegion === "Tất cả" || item.region === filterRegion;
    const matchProvince = filterProvince === "Tất cả" || item.province === filterProvince;
    return matchSearch && matchType && matchRegion && matchProvince;
  });

  const containerClass = isRoot 
    ? "flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 relative animate-in slide-in-from-right-4 duration-300" 
    : "absolute inset-0 z-[100] flex flex-col bg-slate-50 animate-in slide-in-from-right-4 duration-300 relative";

  if (selectedMapFacility) {
    return (
      <div className={containerClass}>
        <SwipeableScreen goBack={() => setSelectedMapFacility(null)}>
          <AppHeader title="Bản đồ GIS định vị công trình" bgGradient="bg-gradient-to-br from-emerald-600/80 to-teal-900/90" onBack={() => setSelectedMapFacility(null)} backText="Danh sách" />
          <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden relative">
             <div className="absolute top-2 inset-x-2 p-3 bg-white/95 backdrop-blur-md shadow-lg z-10 border border-slate-200 rounded-2xl animate-in slide-in-from-top-4">
                <div className="flex items-center gap-2 mb-1">
                   <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-700"><MapIcon size={16} /></div>
                   <h3 className="font-black text-slate-800 text-[15px] leading-tight">{selectedMapFacility.name}</h3>
                </div>
                <div className="flex gap-3 text-[11px] text-slate-600 font-medium pl-9">
                   <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shadow-sm border border-emerald-100"><LocateFixed size={10}/> {selectedMapFacility.lat}, {selectedMapFacility.lng}</span>
                   <span className="flex items-center gap-1 text-slate-500"><MapPin size={10}/> {selectedMapFacility.province}</span>
                </div>
             </div>
             <div className="w-full h-full pb-20 relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src={`https://maps.google.com/maps?q=${selectedMapFacility.lat},${selectedMapFacility.lng}&hl=vi&z=14&output=embed`}
                  className="absolute inset-0 border-0"
                  title="Google Maps View"
                ></iframe>
             </div>
          </div>
          {!isRoot && <SharedBottomNav goHome={() => setSelectedMapFacility(null)} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="emerald" />}
        </SwipeableScreen>
      </div>
    );
  }

  return (
    <div className={containerClass}>
     <SwipeableScreen goBack={goBack}>
       <AppHeader title="Dữ liệu Công trình" bgGradient="bg-gradient-to-br from-emerald-600/80 to-teal-900/90" onBack={goBack} backText="Cơ sở dữ liệu ngành" />

       <div className="flex-1 overflow-y-auto pb-24 blur-scrollbar">
         <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-4 pb-6 rounded-b-[24px] shadow-md text-white mb-4">
           <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur p-3 rounded-2xl border border-white/20">
                 <p className="text-[10px] font-medium text-emerald-100 uppercase mb-1">Tổng số Hệ thống thủy lợi</p>
                 <h3 className="text-2xl font-black">836</h3>
              </div>
              <div className="bg-white/10 backdrop-blur p-3 rounded-2xl border border-white/20">
                 <p className="text-[10px] font-medium text-emerald-100 uppercase mb-1">Hồ chứa nước</p>
                 <h3 className="text-2xl font-black">6.723</h3>
              </div>
              <div className="bg-white/10 backdrop-blur p-3 rounded-2xl border border-white/20">
                 <p className="text-[10px] font-medium text-emerald-100 uppercase mb-1">Trạm bơm điện</p>
                 <h3 className="text-xl font-black">20.311</h3>
              </div>
              <div className="bg-white/10 backdrop-blur p-3 rounded-2xl border border-white/20">
                 <p className="text-[10px] font-medium text-emerald-100 uppercase mb-1">Cống đầu mối</p>
                 <h3 className="text-xl font-black">44.518</h3>
              </div>
           </div>
         </div>

         <div className="px-4 mb-4">
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
                 <Filter size={16} className="text-slate-400" />
                 <span className="text-[11px] font-bold uppercase text-slate-700 tracking-tight">Bộ lọc Tìm kiếm</span>
              </div>
              
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={14} className="text-slate-400" />
                </div>
                <input 
                  type="text" placeholder="Tra cứu theo Tên, Mã định danh điện tử..." 
                  value={searchFac} onChange={(e) => setSearchFac(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                 <div>
                   <label className="block text-[9px] font-bold text-slate-500 mb-1 ml-1 uppercase">Loại hình</label>
                   <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 focus:outline-none">
                     {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[9px] font-bold text-slate-500 mb-1 ml-1 uppercase">Vùng kinh tế</label>
                   <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 focus:outline-none">
                     {uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}
                   </select>
                 </div>
                 <div className="col-span-2">
                   <label className="block text-[9px] font-bold text-slate-500 mb-1 ml-1 uppercase">Tỉnh / Thành phố</label>
                   <select value={filterProvince} onChange={(e) => setFilterProvince(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 focus:outline-none">
                     {uniqueProvinces.map(p => <option key={p} value={p}>{p}</option>)}
                   </select>
                 </div>
              </div>
           </div>
         </div>

         <div className="px-4">
           <div className="flex justify-between items-end mb-3 px-1">
             <h3 className="text-[12px] font-black uppercase text-slate-800">Danh sách Công trình</h3>
             <span className="text-[10px] font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{filteredFacilities.length} kết quả</span>
           </div>
           
           <div className="space-y-3">
             {filteredFacilities.length > 0 ? filteredFacilities.map((fac) => (
               <div key={fac.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow active:scale-[0.98]">
                  <div className="flex justify-between items-start mb-2">
                     <div>
                       <span className="text-[8.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">{fac.type}</span>
                       <h4 className="font-black text-slate-800 text-[14px] mt-1">{fac.name}</h4>
                     </div>
                     <button onClick={() => setSelectedMapFacility(fac)} className="flex items-center text-[9px] font-bold px-2 py-1 rounded-lg border bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors active:scale-95 shadow-sm">
                       <MapPin size={10} className="mr-1" /> Bản đồ vị trí
                     </button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-[10.5px] mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                     <div className="col-span-2 flex items-center gap-1.5 text-emerald-700 font-bold mb-1 border-b border-slate-200 pb-1">
                        <Database size={12} /> {fac.code}
                     </div>
                     <div className="text-slate-500">📍 Tỉnh/TP:</div><div className="font-semibold text-slate-800 text-right">{fac.province}</div>
                     <div className="text-slate-500">🗺️ Vùng:</div><div className="font-semibold text-slate-800 text-right">{fac.region}</div>
                     <div className="text-slate-500">⚙️ Thông số:</div><div className="font-semibold text-emerald-700 text-right">{fac.spec}</div>
                     <div className="text-slate-500">🏢 Đơn vị QL:</div><div className="font-semibold text-slate-800 text-right truncate pl-2" title={fac.manager}>{fac.manager}</div>
                  </div>
               </div>
             )) : (<div className="text-center py-8 text-slate-500 text-xs">Không tìm thấy công trình phù hợp.</div>)}
           </div>
         </div>
       </div>
       {!isRoot && <SharedBottomNav goHome={goBack} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="emerald" />}
     </SwipeableScreen>
    </div>
  );
};

const CapNuocDataListView = ({ goBack }) => {
    return (
      <div className="absolute inset-0 z-[150] flex flex-col bg-slate-50 animate-in slide-in-from-right-4 duration-300">
         <SwipeableScreen goBack={goBack}>
          <AppHeader title="Dữ liệu CT Cấp nước tập trung" bgGradient="bg-gradient-to-br from-cyan-600/80 to-blue-900/90" />
          <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 blur-scrollbar">
             <div className="flex items-center gap-3 mb-4">
                 <button onClick={goBack} className="p-2 bg-white rounded-xl shadow-sm border border-slate-200"><ChevronLeft size={20} className="text-cyan-700"/></button>
                 <h2 className="font-black text-cyan-900 uppercase text-[13px] tracking-tight">Danh sách Công trình</h2>
             </div>
             <div className="space-y-3">
                 {WATER_SUPPLY_FACILITIES.map((facility) => (
                     <div key={facility.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                         <div className="flex justify-between items-start mb-3">
                             <div className="flex items-center gap-2"><Database size={16} className="text-cyan-600"/><span className="font-bold text-cyan-700 text-[12px]">{facility.code}</span></div>
                             <span className={`text-[9px] font-bold px-2 py-1 rounded-lg border ${facility.status === 'Hoạt động tốt' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : facility.status === 'Ngừng hoạt động' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{facility.status}</span>
                         </div>
                         <div className="grid grid-cols-1 gap-2 text-[11px]">
                             <div className="flex justify-between border-b border-slate-100 pb-1.5"><span className="text-slate-500">Loại công trình:</span><span className="font-bold text-slate-800">{facility.type}</span></div>
                             <div className="flex justify-between border-b border-slate-100 pb-1.5"><span className="text-slate-500">Tỉnh/Thành phố:</span><span className="font-bold text-slate-800">{facility.province}</span></div>
                             <div className="flex justify-between pt-0.5"><span className="text-slate-500">Công suất:</span><span className="font-bold text-slate-800">{facility.capacity}</span></div>
                         </div>
                     </div>
                 ))}
             </div>
          </div>
         </SwipeableScreen>
      </div>
    );
};

const PortalView = ({ setAppMode }) => {
  const [activeTab, setActiveTab] = useState('home');

  const portalModules = [
    { id: 1, title: 'Tin tức chỉ đạo, điều hành', icon: <Newspaper size={28}/>, color: 'text-white', bg: 'bg-gradient-to-br from-rose-500 to-rose-600 shadow-rose-500/40', action: () => setAppMode('news') },
    { id: 3, title: 'Quản lý vận hành công trình thủy lợi', icon: <ControlGateIcon size={28}/>, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/40', action: () => setAppMode('van_hanh') },
    { id: 5, title: 'Quản lý an toàn đập', icon: <HydroDamIcon size={28}/>, color: 'text-white', bg: 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/40', action: () => setAppMode('an_toan_dap') },
    { id: 7, title: 'Quản lý nước sạch nông thôn', icon: <Droplet size={28}/>, color: 'text-white', bg: 'bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-cyan-500/40', action: () => setAppMode('nuoc_sach') },
    { id: 9, title: 'Quản lý đầu tư xây dựng', icon: <Building2 size={28}/>, color: 'text-white', bg: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 shadow-fuchsia-500/40', action: null },
    { id: 12, title: 'Cơ sở dữ liệu ngành Thủy lợi', icon: <Database size={28}/>, color: 'text-white', bg: 'bg-gradient-to-br from-sky-500 to-sky-600 shadow-sky-500/40', action: () => setAppMode('database') },
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 relative">
      <button className="absolute top-4 right-4 z-50 bg-black/30 backdrop-blur-md text-white h-8 w-8 rounded-full flex items-center justify-center border border-white/30 hover:bg-black/50 transition-colors shadow-lg">
        <Bell size={16} /><span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border border-white rounded-full"></span>
      </button>

      <AppHeader title="Hệ thống thông tin thủy lợi Việt Nam" bgGradient="bg-gradient-to-b from-sky-500/60 to-blue-800/85" />

      <main className="flex-1 overflow-y-auto px-5 py-6 pb-28 blur-scrollbar relative">
         <div className="flex items-center gap-2 mb-6 px-2">
           <Grip className="text-slate-400" size={20} />
           <h3 className="font-black text-slate-700 uppercase tracking-tight text-[13px]">Phân hệ chức năng</h3>
         </div>
         <div className="grid grid-cols-2 gap-y-8 gap-x-4 pb-8 px-2">
           {portalModules.map((mod) => (
             <button key={mod.id} onClick={() => mod.action && mod.action()} className={`flex flex-col items-center text-center p-2 transition-all duration-300 active:scale-[0.95] group ${!mod.action ? 'opacity-85 hover:opacity-100' : ''}`}>
               <div className={`mb-3 flex h-[68px] w-[68px] items-center justify-center rounded-[22px] ${mod.bg} ${mod.color} group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 shadow-xl border border-white/20`}>{mod.icon}</div>
               <h4 className="text-[12px] font-bold text-slate-800 leading-tight">{mod.title}</h4>
               {!mod.action && <span className="text-[9px] text-slate-500 mt-2 bg-slate-200/80 px-2 py-0.5 rounded-full font-semibold">Đang phát triển</span>}
             </button>
           ))}
         </div>
      </main>
      
      <SharedBottomNav goHome={() => setActiveTab('home')} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="sky" />
    </div>
  );
};

const ScienceView = ({ goBack }) => {
  const [activeTab, setActiveTab] = useState('home');
  const smartTechs = [
    { category: "CHUYỂN ĐỔI SỐ & DỮ LIỆU LỚN", items: [{ title: "AI Dự báo Nguồn nước", desc: "Sử dụng Machine Learning phân tích dòng chảy hạ lưu Mekong.", icon: <Activity className="text-violet-600"/> }, { title: "Hệ quản trị CSDL chuyên ngành", desc: "Số hóa hồ sơ công trình trên nền tảng Cloud.", icon: <Database className="text-blue-600"/> }] },
    { category: "THỦY LỢI THÔNG MINH", items: [{ title: "IoT & Cảm biến thông minh", desc: "Hệ thống quan trắc tự động phản hồi về trung tâm.", icon: <Radio className="text-emerald-600"/> }, { title: "Tưới tiết kiệm tự động", desc: "Mô hình tưới phun mưa, tích hợp điều khiển.", icon: <Droplet className="text-sky-600"/> }] },
    { category: "CÔNG NGHỆ VẬN HÀNH TIÊN TIẾN", items: [{ title: "Viễn thám & GIS", desc: "Giám sát diện tích gieo cấy qua ảnh vệ tinh.", icon: <Scan className="text-orange-600"/> }, { title: "Hệ thống SCADA hiện đại", desc: "Điều khiển từ xa cụm cống Cái Lớn - Cái Bé.", icon: <Zap className="text-amber-600"/> }] }
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 animate-in slide-in-from-right-4 duration-300 relative">
      <SwipeableScreen goBack={goBack}>
       <AppHeader title="Khoa học công nghệ" bgGradient="bg-gradient-to-br from-violet-600/80 to-purple-900/90" />
       <div className="flex-1 overflow-y-auto p-5 pb-24 blur-scrollbar">
          <div className="bg-gradient-to-br from-violet-600 to-purple-800 p-5 rounded-3xl text-white mb-8 shadow-xl relative overflow-hidden">
             <div className="absolute -right-4 -top-4 opacity-10"><Cpu size={120} /></div>
             <h3 className="text-lg font-black leading-tight mb-2 uppercase">Định hướng Chuyển đổi số</h3>
             <p className="text-[11px] opacity-90 leading-relaxed italic">"Xây dựng hạ tầng dữ liệu số đồng bộ..."</p>
          </div>
          <div className="space-y-8">
            {smartTechs.map((group, idx) => (
              <div key={idx}>
                 <h4 className="text-[10px] font-black text-slate-400 tracking-[0.15em] mb-4 flex items-center gap-2"><span className="h-[1px] flex-1 bg-slate-200"></span>{group.category}<span className="h-[1px] flex-1 bg-slate-200"></span></h4>
                 <div className="space-y-4">
                    {group.items.map((tech, tIdx) => (
                      <div key={tIdx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
                         <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">{tech.icon}</div>
                         <div><h5 className="font-black text-slate-800 text-[13px] mb-1 uppercase tracking-tight">{tech.title}</h5><p className="text-[11px] text-slate-500 leading-snug">{tech.desc}</p></div>
                      </div>
                    ))}
                 </div>
              </div>
            ))}
          </div>
       </div>
       <SharedBottomNav goHome={goBack} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="violet" />
      </SwipeableScreen>
    </div>
  );
};

// CÁC COMPONENT SƠ ĐỒ DÒNG CHẢY (INFOGRAPHIC COMPONENTS)
const RiverNodeBox = ({ name, current, req, type="pump" }) => {
  const dotColor = type === 'tv' ? 'bg-amber-500' : type === 'httl' ? 'bg-emerald-500' : 'bg-blue-600';
  return (
    <div className="flex items-center mb-3.5 relative -left-[8px] w-[calc(100%+8px)]">
      <div className="w-[12px] h-[3px] bg-blue-400 z-10 shrink-0"></div>
      <div className={`w-3.5 h-3.5 rounded-full absolute left-[8px] top-1/2 -translate-y-1/2 border-[2.5px] border-white z-20 shadow-sm ${dotColor}`}></div>
      <div className="bg-white flex-1 rounded-lg shadow-sm border border-slate-200 p-1.5 ml-1.5 z-20 flex flex-col justify-center">
         <div className="text-[9px] font-black uppercase text-blue-900 leading-tight mb-0.5">{name}</div>
         {current && <div className="text-[8.5px] text-slate-600 font-medium">H.Tại: <span className="text-blue-700 font-bold">{current}</span></div>}
         {req && <div className="text-[8.5px] text-slate-600 font-medium">{type === 'tv' ? 'BĐ:' : type === 'httl' ? 'Trạng thái:' : 'Y.Cầu:'} <span className="text-slate-800">{req}</span></div>}
      </div>
    </div>
  );
};

const SalineNodeBox = ({ name, dist, salinity }) => (
  <div className="flex items-center mb-3.5 relative -left-[8px] w-[calc(100%+8px)]">
    <div className="w-[12px] h-[3px] bg-red-500 z-10 shrink-0"></div>
    <div className="w-3.5 h-3.5 rounded-full absolute left-[8px] top-1/2 -translate-y-1/2 border-[2.5px] border-white z-20 shadow-sm bg-red-600"></div>
    <div className="bg-red-50 flex-1 rounded-lg shadow-sm border border-red-100 p-1.5 ml-1.5 z-20 flex flex-col justify-center">
       <div className="text-[9px] font-black uppercase text-red-800 leading-tight mb-0.5">{name}</div>
       <div className="text-[8.5px] text-red-600 font-medium">{dist} - <span className="font-bold text-red-700">Mặn: {salinity}</span></div>
    </div>
  </div>
);

const DamBox = ({ name, q, w, mini=false }) => (
   <div className={`bg-gradient-to-b from-blue-50 to-white border border-blue-200 shadow-sm rounded-lg text-center relative z-20 flex flex-col justify-center h-full ${mini ? 'p-1.5' : 'p-2'}`}>
       <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-lg"></div>
       <h4 className={`${mini ? 'text-[8.5px]' : 'text-[10px]'} font-black text-blue-900 uppercase mt-1 mb-0.5 leading-tight`}>{name}</h4>
       <div className="flex flex-col text-[8px] font-medium text-slate-600">
           <div>Q xả: <span className="text-blue-700 font-bold">{q}</span></div>
           <div>W xả: <span className="text-blue-700 font-bold">{w}</span></div>
       </div>
   </div>
);


const VanHanhView = ({ goBack }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [view, setView] = useState('menu'); 
  const [salinityTab, setSalinityTab] = useState('current');

  const irrigationModules = [
    { id: 'forecast', title: 'Nguồn nước trữ hồ chứa', icon: <Waves size={32} />, color: 'bg-cyan-600', description: 'Hiện trạng & Dự báo vùng' },
    { id: 'system_monitor', title: 'Dòng chảy sông', icon: <Monitor size={32} />, color: 'bg-slate-700', description: 'Sơ đồ dòng chảy, độ mặn' },
    { id: 'rain_data', title: 'Tổng hợp dữ liệu mưa', icon: <CloudRain size={32} />, color: 'bg-indigo-600', description: 'Lượng mưa lũy tích các vùng' },
    { id: 'salinity', title: 'Xâm nhập mặn ĐBSCL', icon: <MapPin size={32} />, color: 'bg-indigo-500', description: 'Ranh mặn, độ mặn các trạm' },
    { id: 'reports', title: 'Ảnh hưởng hạn hán, xâm nhập mặn', icon: <ClipboardCheck size={32} />, color: 'bg-amber-600', description: 'Nhật ký trực, báo cáo nhanh' },
    { id: 'drought_salinity', title: 'Ảnh hưởng ngập, lụt, úng', icon: <Droplet size={32} />, color: 'bg-red-700', description: 'Cảnh báo sớm & số liệu quan trắc' }
  ];

  const salinityData = [
    { name: 'Vàm Cỏ Đông', depth: 70, tbnn: { val: 8, dir: 'down' }, y2023: { val: 5, dir: 'up' }, y2020: { val: 21, dir: 'down' }, y2016: { val: 41, dir: 'down' } },
    { name: 'Vàm Cỏ Tây', depth: 70, tbnn: { val: 14, dir: 'down' }, y2023: { val: 8, dir: 'up' }, y2020: { val: 73, dir: 'down' }, y2016: { val: 53, dir: 'down' } },
    { name: 'Cửa Tiểu', depth: 32, tbnn: { val: 14, dir: 'down' }, y2023: { val: 11, dir: 'down' }, y2020: { val: 59, dir: 'down' }, y2016: { val: 16, dir: 'down' } },
    { name: 'Cửa Đại', depth: 32, tbnn: { val: 14, dir: 'down' }, y2023: { val: 11, dir: 'down' }, y2020: { val: 59, dir: 'down' }, y2016: { val: 16, dir: 'down' } },
    { name: 'Hàm Luông', depth: 35, tbnn: { val: 22, dir: 'down' }, y2023: { val: 26, dir: 'down' }, y2020: { val: 43, dir: 'down' }, y2016: { val: 38, dir: 'down' } },
    { name: 'Cổ Chiên', depth: 30, tbnn: { val: 22, dir: 'down' }, y2023: { val: 31, dir: 'down' }, y2020: { val: 38, dir: 'down' }, y2016: { val: 35, dir: 'down' } },
    { name: 'Sông Hậu', depth: 28, tbnn: { val: 22, dir: 'down' }, y2023: { val: 25, dir: 'down' }, y2020: { val: 34, dir: 'down' }, y2016: { val: 32, dir: 'down' } },
    { name: 'Cái Lớn', depth: 51, tbnn: { val: 5, dir: 'down' }, y2023: { val: 4, dir: 'up' }, y2020: { val: 11, dir: 'down' }, y2016: { val: 16, dir: 'down' } },
  ];

  const floodImpactData = [
    { region: 'Trung du & MN Phía Bắc', rice: 1250, veg: 420, annual: 150, perennial: 50 },
    { region: 'Đồng bằng sông Hồng', rice: 5400, veg: 1850, annual: 450, perennial: 120 },
    { region: 'Bắc Trung Bộ', rice: 3200, veg: 850, annual: 320, perennial: 200 },
    { region: 'Nam Trung Bộ', rice: 850, veg: 320, annual: 180, perennial: 90 },
    { region: 'Tây Nguyên', rice: 420, veg: 290, annual: 860, perennial: 1500 },
    { region: 'Đông Nam Bộ', rice: 640, veg: 450, annual: 300, perennial: 850 },
    { region: 'Đồng bằng sông Cửu Long', rice: 12500, veg: 2200, annual: 500, perennial: 1150 },
  ];

  const floodTotals = floodImpactData.reduce((acc, curr) => ({
    rice: acc.rice + curr.rice, veg: acc.veg + curr.veg,
    annual: acc.annual + curr.annual, perennial: acc.perennial + curr.perennial
  }), { rice: 0, veg: 0, annual: 0, perennial: 0 });

  return (
    <div className="flex h-screen w-full flex-col bg-blue-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 relative animate-in slide-in-from-right-4 duration-300">
      <SwipeableScreen goBack={view === 'menu' ? goBack : () => setView('menu')}>
        <AppHeader title="Quản lý vận hành công trình thủy lợi" bgGradient="bg-gradient-to-br from-blue-700/60 via-blue-600/50 to-emerald-600/40" />

        <main className="flex-1 overflow-y-auto blur-scrollbar px-5 py-6 pb-24 relative">
          {view === 'menu' && (
            <div className="grid grid-cols-2 gap-4">
              {irrigationModules.map((item) => (
                <button key={item.id} onClick={() => { 
                    if(item.id==='forecast') setView('forecast_list'); 
                    if(item.id==='system_monitor') setView('river_flow');
                    if(item.id==='salinity') setView('salinity_list');
                    if(item.id==='rain_data') setView('rain_data');
                    if(item.id==='reports') setView('reports_list');
                    if(item.id==='drought_salinity') setView('flood_impacts');
                }} className="flex flex-col items-center p-5 rounded-[32px] bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all active:scale-95 group relative overflow-hidden">
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white shadow-xl`}>{item.icon}</div>
                  <h3 className="text-sm font-bold text-slate-800 leading-tight mb-1 text-center h-10 flex items-center justify-center px-1">{item.title}</h3>
                  <p className="text-[10px] text-slate-400 font-medium text-center leading-tight">{item.description}</p>
                </button>
              ))}
            </div>
          )}

          {view === 'salinity_list' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-2 px-1">
                <button onClick={() => setView('menu')} className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 active:scale-95 transition-transform"><ChevronLeft size={20}/></button>
                <h2 className="font-bold text-slate-800 text-[16px]">Xâm nhập mặn vùng ĐBSCL</h2>
              </div>

              {/* Tabs */}
              <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200 shadow-inner mb-2">
                 <button onClick={() => setSalinityTab('current')} className={`flex-1 py-2 text-[14px] font-medium rounded-md transition-colors ${salinityTab === 'current' ? 'bg-[#4068b0] text-white shadow' : 'text-[#4068b0]'}`}>Mặn hiện tại</button>
                 <button onClick={() => setSalinityTab('forecast')} className={`flex-1 py-2 text-[14px] font-medium rounded-md transition-colors ${salinityTab === 'forecast' ? 'bg-[#4068b0] text-white shadow' : 'text-[#4068b0]'}`}>Dự báo mặn</button>
              </div>

              {/* Sub-header */}
              <div className="flex justify-between px-2 mb-3 font-bold italic text-[14px]">
                 <span className="text-red-600">*Ranh mặn 1g/l</span>
                 <span className="text-slate-800">*Ranh mặn 4g/l</span>
              </div>

              {/* List */}
              <div className="space-y-3 pb-6">
                {salinityData.map((river, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-100 flex justify-between items-center">
                     <div className="flex flex-col justify-between h-full gap-1">
                       <div>
                         <h3 className="text-[#2b60b6] text-[17px] font-bold leading-tight">{river.name}</h3>
                         <p className="text-[#c89b3c] font-semibold text-[14px] mt-0.5">Độ sâu: {river.depth} km</p>
                       </div>
                       <div className="flex items-center text-[#2b60b6] font-medium text-[13px] mt-2 cursor-pointer bg-blue-50 w-max px-2 py-1 rounded-md active:bg-blue-100 transition-colors">
                         <MapPin size={14} className="mr-1" /> Bản đồ
                       </div>
                     </div>
                     <div className="text-[13px] text-slate-800 font-medium space-y-1 min-w-[125px]">
                       <div className="flex justify-between w-full"><span>Max TBNN:</span> <span className={river.tbnn.dir === 'up' ? 'text-red-600 font-bold ml-2' : 'text-green-600 font-bold ml-2'}>{river.tbnn.dir === 'up' ? '↑' : '↓'} {river.tbnn.val}</span></div>
                       <div className="flex justify-between w-full"><span>Max 2023:</span> <span className={river.y2023.dir === 'up' ? 'text-red-600 font-bold ml-2' : 'text-green-600 font-bold ml-2'}>{river.y2023.dir === 'up' ? '↑' : '↓'} {river.y2023.val}</span></div>
                       <div className="flex justify-between w-full"><span>Max 2020:</span> <span className={river.y2020.dir === 'up' ? 'text-red-600 font-bold ml-2' : 'text-green-600 font-bold ml-2'}>{river.y2020.dir === 'up' ? '↑' : '↓'} {river.y2020.val}</span></div>
                       <div className="flex justify-between w-full"><span>Max 2016:</span> <span className={river.y2016.dir === 'up' ? 'text-red-600 font-bold ml-2' : 'text-green-600 font-bold ml-2'}>{river.y2016.dir === 'up' ? '↑' : '↓'} {river.y2016.val}</span></div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'reports_list' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-3">
                  <button onClick={() => setView('menu')} className="p-2 bg-white rounded-xl shadow-sm border border-slate-200"><ChevronLeft size={20}/></button>
                  <h2 className="font-black text-blue-950 uppercase text-[15px] tracking-tight">Ảnh hưởng hạn hán, mặn</h2>
                </div>
              </div>

              <div className="space-y-4 pb-2">
                {[
                  { name: 'Vùng Bắc Bộ', current: '59', tbnv: '8', tbnvDir: 'up', forecast: '2.6', forecastDir: 'up', area: '731.41', area1: '300', area2: '2000' },
                  { name: 'Vùng Bắc Trung Bộ', current: '64', tbnv: '8', tbnvDir: 'up', forecast: '1', forecastDir: 'down', area: '306.97', area1: '100', area2: '3000' },
                  { name: 'Vùng Nam Trung Bộ & Tây Nguyên', current: '59', tbnv: '5', tbnvDir: 'up', forecast: '3', forecastDir: 'down', area: '218.16', area1: '150', area2: '2000' },
                  { name: 'Vùng Đông Nam Bộ', current: '54', tbnv: '3', tbnvDir: 'up', forecast: '1.9', forecastDir: 'down', area: '440.04', area1: '50', area2: '1000' },
                ].map((region, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden flex relative">
                     <div className="w-1.5 bg-gradient-to-b from-blue-400 to-blue-600 absolute left-0 top-0 bottom-0"></div>
                     <div className="p-4 pl-5 w-full">
                        <h3 className="text-center text-blue-700 font-medium text-[20px] mb-2">{region.name}</h3>
                        <div className="text-[15px] text-slate-800 space-y-1 leading-snug">
                           <p>Diện tích phục vụ: <span className="font-bold">{region.area}</span> (nghìn ha)</p>
                           <p>Diện tích bị hạn: <span className="font-bold">{region.area1}</span> (ha)</p>
                           <p>Dự báo nguy cơ thiếu nước: <span className="font-bold">{region.area2}</span> (ha)</p>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'rain_data' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex items-center gap-3 mb-4 px-1">
                  <button onClick={() => setView('menu')} className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 active:scale-95 transition-transform"><ChevronLeft size={20}/></button>
                  <h2 className="font-black text-blue-950 uppercase text-[15px] tracking-tight">Tổng hợp dữ liệu mưa</h2>
               </div>

               {/* Biểu đồ 1: Tây Nguyên Cũ */}
               <RainfallChart 
                 title="Lượng mưa lũy tích vùng Tây Nguyên (Cũ) năm 2026 (mm)" 
                 maxY={601} 
                 data={{
                   average: [0, 20, 30, 80, 240, 601],
                   historical: [0, 10, 25, 90, 200, 480],
                   lastYear: [0, 25, 35, 100, 260, 601],
                   current: [0, 5, 10, 80, 140, null],
                   forecast: [null, null, null, null, 140, 260]
                 }} 
               />

               {/* Biểu đồ 2: Nam Bộ */}
               <RainfallChart 
                 title="Lượng mưa lũy tích vùng Nam Bộ năm 2026 (mm)" 
                 maxY={747} 
                 data={{
                   average: [0, 5, 20, 60, 150, 620],
                   historical: [0, 10, 30, 50, 100, 450],
                   lastYear: [0, 10, 70, 90, 160, 747],
                   current: [0, 5, 10, 40, 80, null],
                   forecast: [null, null, null, null, 80, 130]
                 }} 
               />

               {/* Biểu đồ 3: Bắc Trung Bộ */}
               <RainfallChart 
                 title="Lượng mưa lũy tích vùng Bắc Trung Bộ năm 2026 (mm)" 
                 maxY={856} 
                 data={{
                   average: [10, 50, 90, 130, 200, 530],
                   historical: [5, 30, 60, 100, 150, 400],
                   lastYear: [20, 60, 120, 160, 250, 856],
                   current: [15, 45, 80, 150, 240, null],
                   forecast: [null, null, null, null, 240, 400]
                 }} 
               />

               {/* Biểu đồ 4: Đồng Bằng Sông Hồng */}
               <RainfallChart 
                 title="Lượng mưa lũy tích vùng ĐB sông Hồng năm 2026 (mm)" 
                 maxY={592} 
                 data={{
                   average: [5, 20, 50, 100, 180, 592],
                   historical: [5, 15, 30, 80, 120, 400],
                   lastYear: [0, 15, 40, 60, 170, 480],
                   current: [5, 10, 20, 60, 140, null],
                   forecast: [null, null, null, null, 140, 410]
                 }} 
               />
            </div>
          )}

          {view === 'forecast_list' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-3">
                  <button onClick={() => setView('menu')} className="p-2 bg-white rounded-xl shadow-sm border border-slate-200"><ChevronLeft size={20}/></button>
                  <h2 className="font-black text-blue-950 uppercase text-[15px] tracking-tight">Nguồn nước trữ hồ chứa</h2>
                </div>
              </div>

              <div className="space-y-4 pb-2">
                {[
                  { name: 'Vùng Bắc Bộ', current: '59', tbnv: '8', tbnvDir: 'up', svtt: '2.1', svttDir: 'up',sv2025: '1.1', sv2025Dir: 'up', forecast: '2.6', forecastDir: 'up', area: '731.41', area1: '300', area2: '2000' },
                  { name: 'Vùng Bắc Trung Bộ', current: '64', tbnv: '8', tbnvDir: 'up', svtt: '1.7', svttDir: 'up', sv2025: '1.5', sv2025Dir: 'up', forecast: '1', forecastDir: 'down', area: '306.97', area1: '100', area2: '3000' },
                  { name: 'Vùng Nam Trung Bộ & Tây Nguyên', current: '59', tbnv: '5', tbnvDir: 'up', svtt: '11', svttDir: 'up', sv2025: '1.3', sv2025Dir: 'down', forecast: '3', forecastDir: 'down', area: '218.16', area1: '150', area2: '2000' },
                  { name: 'Vùng Đông Nam Bộ', current: '54', tbnv: '3', tbnvDir: 'up', svtt: '2.3', svttDir: 'up', sv2025: '0.7', sv2025Dir: 'down', forecast: '1.9', forecastDir: 'down', area: '440.04', area1: '50', area2: '1000' },
                ].map((region, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden flex relative">
                     <div className="w-1.5 bg-gradient-to-b from-blue-400 to-blue-600 absolute left-0 top-0 bottom-0"></div>
                     <div className="p-4 pl-5 w-full">
                        <h3 className="text-center text-blue-700 font-medium text-[20px] mb-2">{region.name}</h3>
                        <div className="text-[15px] text-slate-800 space-y-1 leading-snug">
                           <p>Đạt: <span className="text-blue-700 font-medium">{region.current}%</span> DTTK</p>
                           <p>
                             <span className={region.tbnvDir === 'up' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                               {region.tbnvDir === 'up' ? '↑' : '↓'}{region.tbnv}%
                             </span> So với TBNN
                           </p>
                            <p>
                             <span className={region.svttDir === 'up' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                               {region.svttDir === 'up' ? '↑' : '↓'}{region.svtt}%
                             </span> So với tuần trước
                           </p>
                           <p>
                             Dự báo tuần tới {' '}
                             <span className={region.forecastDir === 'up' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                               {region.forecastDir === 'up' ? '↑' : '↓'}{region.forecast}%
                             </span>
                           </p>
                           <p>
                             <span className={region.sv2025Dir === 'up' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                               {region.sv2025Dir === 'up' ? '↑' : '↓'}{region.sv2025}%
                             </span> So với năm 2025
                           </p>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'river_flow' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-2 px-1">
                  <button onClick={() => setView('menu')} className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 active:scale-95 transition-transform"><ChevronLeft size={20}/></button>
                  <h2 className="font-black text-blue-950 uppercase text-[15px] tracking-tight">Dòng chảy sông</h2>
                </div>

                {/* SÔNG HỒNG - THÁI BÌNH */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-3 text-center">
                         <h3 className="font-black text-[13px] uppercase tracking-wide drop-shadow-sm">Sơ đồ Dòng chảy & Xâm nhập mặn<br/>Sông Hồng - Thái Bình</h3>
                         <p className="text-[9px] opacity-90 mt-1 font-medium">(Cập nhật đến 10h50', 21/05/2026)</p>
                    </div>
                    <div className="p-3 bg-slate-50/50">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Cột Sông Hồng */}
                            <div>
                                <DamBox name="TĐ HÒA BÌNH" q="458" w="2165.77" />
                                <div className="ml-6 border-l-[8px] border-blue-400 pt-3 pb-1 relative z-0">
                                    <RiverNodeBox name="TB TRUNG HÀ" current="0 cm" req="150 cm" />
                                    <RiverNodeBox name="TB PHÙ SA" current="404 cm" req="130 cm" />
                                    <RiverNodeBox name="TB ĐAN HOÀI" current="343 cm" req="108 cm" />
                                    <RiverNodeBox name="CỐNG LIÊN MẠC" current="321 cm" req="377 cm" type="pump" />
                                    <RiverNodeBox name="TRẠM TV HÀ NỘI" current="313 cm" req="190 cm" type="tv" />
                                    <RiverNodeBox name="TB HỒNG VÂN" current="249 cm" req="100 cm" />
                                </div>
                                {/* Chuyển mặn */}
                                <div className="ml-6 w-[8px] h-8 bg-gradient-to-b from-blue-400 to-red-500"></div>
                                <div className="ml-6 border-l-[8px] border-red-500 pt-2 pb-2 relative z-0 rounded-b-full">
                                    <SalineNodeBox name="CÁT XUYÊN" dist="(28km)" salinity="-" />
                                </div>
                            </div>

                            {/* Cột Sông Thái Bình / Lô */}
                            <div>
                                <div className="grid grid-cols-2 gap-1 mb-2">
                                    <DamBox name="THÁC BÀ" q="65" w="475" mini />
                                    <DamBox name="T. QUANG" q="204" w="706" mini />
                                </div>
                                {/* Hiệu ứng hợp lưu */}
                                <div className="flex w-full h-3 relative z-10 px-4 -mt-2">
                                     <div className="w-1/2 border-b-[4px] border-r-[4px] border-blue-400 rounded-br-lg"></div>
                                     <div className="w-1/2 border-b-[4px] border-l-[4px] border-blue-400 rounded-bl-lg"></div>
                                </div>
                                <div className="w-[8px] h-3 bg-blue-400 mx-auto"></div>

                                <div className="ml-6 border-l-[8px] border-blue-400 pt-3 pb-1 relative z-0">
                                    <RiverNodeBox name="TB ĐẠI ĐỊNH" current="478 cm" req="250 cm" />
                                    <RiverNodeBox name="TRẠM TV SƠN TÂY" current="404 cm" req="180 cm" type="tv" />
                                    <RiverNodeBox name="CỐNG LONG TỬU" current="275 cm" req="258 cm" type="pump" />
                                    <RiverNodeBox name="CỐNG XUÂN QUAN" current="284 cm" req="185 cm" type="pump" />
                                </div>
                                {/* Chuyển mặn */}
                                <div className="ml-6 w-[8px] h-8 bg-gradient-to-b from-blue-400 to-red-500"></div>
                                <div className="ml-6 border-l-[8px] border-red-500 pt-2 pb-2 relative z-0 rounded-b-full">
                                    <SalineNodeBox name="TIÊN CỰU" dist="(31km)" salinity="5.4‰" />
                                    <SalineNodeBox name="QUÝ CAO" dist="(30km)" salinity="5.15‰" />
                                    <SalineNodeBox name="MỸ KHÊ" dist="(14km)" salinity="5.0‰" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SÔNG CỬU LONG */}
                 <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-3 text-center">
                         <h3 className="font-black text-[13px] uppercase tracking-wide drop-shadow-sm">Sơ đồ Dòng chảy<br/>Sông Cửu Long</h3>
                         <p className="text-[9px] opacity-90 mt-1 font-medium">(Cập nhật đến 21/05/2026)</p>
                    </div>
                    <div className="p-3 bg-slate-50/50">
                        {/* Biển Hồ Header */}
                        <div className="flex justify-center relative z-20 mb-[-1px]">
                           <div className="bg-blue-900 text-white py-2 px-8 rounded-xl shadow-md border-[3px] border-blue-300 text-center z-20">
                               <h4 className="font-black uppercase text-[13px] tracking-widest mb-0.5 drop-shadow">Biển Hồ</h4>
                               <p className="text-[9px] text-blue-100">Dung tích: <span className="text-yellow-400 font-bold">1.2 tỷ m³</span></p>
                           </div>
                        </div>
                        {/* Hiệu ứng phân lưu (Tách sông Hậu và Tiền) */}
                        <div className="flex justify-center">
                            <div className="w-[8px] h-4 bg-blue-400"></div>
                        </div>
                        <div className="flex w-full h-4 relative z-10 px-[25%]">
                             <div className="w-1/2 border-t-[8px] border-l-[8px] border-blue-400 rounded-tl-xl"></div>
                             <div className="w-1/2 border-t-[8px] border-r-[8px] border-blue-400 rounded-tr-xl"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-[-4px]">
                            {/* Cột Sông Hậu */}
                            <div>
                                <div className="text-center font-black text-[11px] text-blue-800 bg-blue-100 py-1 mx-4 rounded mb-1 shadow-sm border border-blue-200">SÔNG HẬU</div>
                                <div className="ml-6 border-l-[8px] border-blue-400 pt-3 pb-1 relative z-0">
                                    <RiverNodeBox name="TRẠM CHÂU ĐỐC" current="2.66m" req="3.5m" type="tv" />
                                    <RiverNodeBox name="HTTL Tứ Giác LX" req="Vận hành" type="httl" />
                                    <RiverNodeBox name="HTTL Ô Môn Xà No" req="Vận hành" type="httl" />
                                    <RiverNodeBox name="HTTL Cái Lớn Cái Bé" req="Vận hành" type="httl" />
                                </div>
                                <div className="ml-6 w-[8px] h-8 bg-gradient-to-b from-blue-400 to-red-500"></div>
                                <div className="ml-6 border-l-[8px] border-red-500 pt-2 pb-2 relative z-0 rounded-b-full">
                                    <SalineNodeBox name="Trạm Đại Ngãi" dist="(31km)" salinity="1.5 g/l" />
                                    <SalineNodeBox name="Trạm C. Cần Chông" dist="(31km)" salinity="2.5 g/l" />
                                </div>
                            </div>

                            {/* Cột Sông Tiền */}
                            <div>
                                <div className="text-center font-black text-[11px] text-blue-800 bg-blue-100 py-1 mx-4 rounded mb-1 shadow-sm border border-blue-200">SÔNG TIỀN</div>
                                <div className="ml-6 border-l-[8px] border-blue-400 pt-3 pb-1 relative z-0">
                                    <RiverNodeBox name="TRẠM KRATIE" current="8.59m" req="22.0m" type="tv" />
                                    <RiverNodeBox name="TRẠM TÂN CHÂU" current="2.7m" req="3.5m" type="tv" />
                                    <RiverNodeBox name="HTTL Bắc Vàm Nao" req="Vận hành" type="httl" />
                                    <RiverNodeBox name="HTTL Đồng Tháp Mười" req="Vận hành" type="httl" />
                                    <RiverNodeBox name="HTTL Bảo Định" req="Vận hành" type="httl" />
                                </div>
                                <div className="ml-6 w-[8px] h-8 bg-gradient-to-b from-blue-400 to-red-500"></div>
                                <div className="ml-6 border-l-[8px] border-red-500 pt-2 pb-2 relative z-0 rounded-b-full">
                                    <SalineNodeBox name="Trạm Bến Tre" dist="(48km)" salinity="1.3 g/l" />
                                    <SalineNodeBox name="Trạm Đồng Tâm" dist="(57km)" salinity="0 g/l" />
                                    <SalineNodeBox name="Trạm Lộc Thuận" dist="(20km)" salinity="9.5 g/l" />
                                    <SalineNodeBox name="Trạm Xuân Hòa" dist="(43km)" salinity="0.7 g/l" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {}
          {view === 'flood_impacts' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-3">
                  <button onClick={() => setView('menu')} className="p-2 bg-white rounded-xl shadow-sm border border-slate-200"><ChevronLeft size={20}/></button>
                  <h2 className="font-black text-blue-950 uppercase text-[15px] tracking-tight">Ảnh hưởng ngập, lụt, úng</h2>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-700 to-red-500 text-white p-4 text-center">
                    <h3 className="font-black text-[14px] uppercase tracking-wide drop-shadow-sm">Thống kê diện tích ngập úng<br/>phân theo loại cây trồng</h3>
                    <p className="text-[10px] opacity-90 mt-1 font-medium">(Đơn vị tính: hecta - ha)</p>
                </div>
                
                <div className="p-0 overflow-x-auto hide-scrollbar relative">
                   <table className="w-full min-w-[550px] text-left border-collapse">
                      <thead>
                         <tr className="bg-slate-100 text-[10px] uppercase text-slate-600 border-b-2 border-slate-200">
                            <th className="py-3 px-3 font-black sticky left-0 z-20 bg-slate-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]">Vùng / Lưu vực</th>
                            <th className="py-3 px-3 font-bold text-right text-blue-700">Lúa</th>
                            <th className="py-3 px-3 font-bold text-right text-emerald-700">Rau màu</th>
                            <th className="py-3 px-3 font-bold text-right text-amber-700">Cây CN Hàng năm</th>
                            <th className="py-3 px-3 font-bold text-right text-orange-700">Cây CN Lâu năm</th>
                         </tr>
                      </thead>
                      <tbody>
                         {floodImpactData.map((row, idx) => (
                            <tr key={idx} className="border-b border-slate-100 text-[11.5px] text-slate-800 transition-colors hover:bg-slate-50/50">
                               <td className={`py-3 px-3 font-bold sticky left-0 z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.06)] ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                 {row.region}
                               </td>
                               <td className={`py-3 px-3 text-right font-medium ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>{row.rice.toLocaleString()}</td>
                               <td className={`py-3 px-3 text-right font-medium ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>{row.veg.toLocaleString()}</td>
                               <td className={`py-3 px-3 text-right font-medium ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>{row.annual.toLocaleString()}</td>
                               <td className={`py-3 px-3 text-right font-medium ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>{row.perennial.toLocaleString()}</td>
                            </tr>
                         ))}
                         {/* Dòng Tổng cộng */}
                         <tr className="bg-slate-100 text-[12px] text-slate-900 border-t-2 border-slate-300">
                            <td className="py-3 px-3 font-black sticky left-0 z-20 bg-slate-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)] uppercase">Tổng cộng</td>
                            <td className="py-3 px-3 text-right font-black text-blue-700">{floodTotals.rice.toLocaleString()}</td>
                            <td className="py-3 px-3 text-right font-black text-emerald-700">{floodTotals.veg.toLocaleString()}</td>
                            <td className="py-3 px-3 text-right font-black text-amber-700">{floodTotals.annual.toLocaleString()}</td>
                            <td className="py-3 px-3 text-right font-black text-orange-700">{floodTotals.perennial.toLocaleString()}</td>
                         </tr>
                      </tbody>
                   </table>
                </div>
              </div>
            </div>
          )}
        </main>
        <SharedBottomNav goHome={goBack} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="blue" />
      </SwipeableScreen>
    </div>
  );
};

const NewsView = ({ goBack }) => {
  const [view, setView] = useState('list'); 
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('home');
  const [newsCategory, setNewsCategory] = useState('van_ban');

  const dynamicReports = useMemo(() => {
     const today = new Date();
     const yesterday = new Date(today);
     yesterday.setDate(yesterday.getDate() - 1);

     const formatDate = (d) => {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        return `Hà Nội, ngày ${day} tháng ${month} năm ${d.getFullYear()}`;
     };

     const formatShortDate = (d) => {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}/${d.getFullYear()}`;
     };

     return [
       {
         id: 'bcn-today', number: 'BCN-TL/HAY', date: formatDate(today),
         title: `BÁO CÁO NHANH\nTình hình nguồn nước và an toàn đập ngày ${formatShortDate(today)}`,
         sender: 'CỤC QUẢN LÝ VÀ XÂY DỰNG CÔNG TRÌNH THỦY LỢI', isCongDien: false,
         fullContent: {
           leftHeader: 'BỘ NÔNG NGHIỆP VÀ MÔI TRƯỜNG\nCỤC QUẢN LÝ VÀ XÂY DỰNG\nCÔNG TRÌNH THUỶ LỢI\n-------',
           rightHeader: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n---------------',
           docNumber: `Số: BCN-${String(today.getDate()).padStart(2, '0')}/TL`,
           recipient: 'Kính gửi: Lãnh đạo Bộ Nông nghiệp và Môi trường',
           intro: `Báo cáo tình hình nguồn nước và an toàn đập tính đến thời điểm hiện tại ngày ${formatShortDate(today)}:`,
           mainPoints: [
             'Nguồn nước: Tổng dung tích các hồ chứa quan trọng đạt mức an toàn thiết kế. Việc điều tiết cấp nước cho hạ du đang được thực hiện theo đúng kế hoạch, đảm bảo đủ nước phục vụ sản xuất.',
             'An toàn đập: Hệ thống quan trắc tự động và báo cáo từ các địa phương cho thấy các đập, hồ chứa nước lớn vận hành bình thường. Không ghi nhận diễn biến bất thường về sụt lún hay thấm qua thân đập.',
             'Chỉ đạo: Yêu cầu các đơn vị quản lý tiếp tục trực ban nghiêm túc 24/24, theo dõi chặt chẽ dữ liệu thời tiết và sẵn sàng phương án ứng tiếp.'
           ],
           closing: 'Cục Quản lý và Xây dựng CTTL trân trọng báo cáo./.',
           signatory: 'KT. CỤC TRƯỞNG\nPHÓ CỤC TRƯỞNG\n\nNguyễn Hồng Khanh'
         }
       },
       {
         id: 'bcn-yesterday', number: 'BCN-TL/QUA', date: formatDate(yesterday),
         title: `BÁO CÁO NHANH\nTình hình nguồn nước và an toàn đập ngày ${formatShortDate(yesterday)}`,
         sender: 'CỤC QUẢN LÝ VÀ XÂY DỰNG CÔNG TRÌNH THỦY LỢI', isCongDien: false,
         fullContent: {
           leftHeader: 'BỘ NÔNG NGHIỆP VÀ MÔI TRƯỜNG\nCỤC QUẢN LÝ VÀ XÂY DỰNG\nCÔNG TRÌNH THUỶ LỢI\n-------',
           rightHeader: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n---------------',
           docNumber: `Số: BCN-${String(yesterday.getDate()).padStart(2, '0')}/TL`,
           recipient: 'Kính gửi: Lãnh đạo Bộ Nông nghiệp và Môi trường',
           intro: `Báo cáo tình hình nguồn nước và an toàn đập tính đến thời điểm cuối ngày ${formatShortDate(yesterday)}:`,
           mainPoints: [
             'Nguồn nước: Mực nước các hồ chứa trong ngưỡng vận hành an toàn. Việc tích nước và cấp nước diễn ra ổn định, lưu lượng dòng chảy trên các hệ thống sông chính được duy trì tốt.',
             'An toàn đập: Lực lượng tuần tra báo cáo các đập đất và đập bê tông trọng điểm đều an toàn, không có dấu hiệu nứt nẻ, rò rỉ hay sạt lở hạ lưu.',
             'Chỉ đạo: Các địa phương khẩn trương rà soát vật tư dự phòng tại các vị trí xung yếu.'
           ],
           closing: 'Cục Quản lý và Xây dựng CTTL trân trọng báo cáo./.',
           signatory: 'KT. CỤC TRƯỞNG\nPHÓ CỤC TRƯỞNG\n\nNguyễn Hồng Khanh'
         }
       }
     ];
  }, []);

  const currentDataList = newsCategory === 'van_ban' ? DIRECTIVES_DATA : dynamicReports;

  const filteredDirectives = currentDataList.filter(doc => {
    const term = searchTerm.toLowerCase();
    return doc.title.toLowerCase().includes(term) || doc.number.toLowerCase().includes(term);
  });

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 relative animate-in slide-in-from-right-4 duration-300">
      <SwipeableScreen goBack={view === 'list' ? goBack : () => setView('list')}>
        <AppHeader title="Tin tức chỉ đạo, điều hành" bgGradient="bg-gradient-to-br from-rose-700/60 via-rose-600/50 to-orange-600/40" />

        <main className="flex-1 overflow-y-auto px-6 py-6 pb-24 blur-scrollbar">
          {view === 'list' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Added Tab Buttons */}
              <div className="flex bg-slate-200/60 p-1.5 rounded-xl mb-4">
                <button
                  onClick={() => setNewsCategory('van_ban')}
                  className={`flex-1 py-2.5 text-[11px] font-bold rounded-lg transition-all uppercase tracking-tight ${newsCategory === 'van_ban' ? 'bg-white text-rose-700 shadow-sm scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Văn bản chỉ đạo
                </button>
                <button
                  onClick={() => setNewsCategory('bao_cao')}
                  className={`flex-1 py-2.5 text-[11px] font-bold rounded-lg transition-all uppercase tracking-tight ${newsCategory === 'bao_cao' ? 'bg-white text-rose-700 shadow-sm scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Báo cáo nhanh
                </button>
              </div>

              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search size={15} className="text-slate-400" /></div>
                <input type="text" placeholder={`Tra cứu ${newsCategory === 'van_ban' ? 'công điện, văn bản' : 'báo cáo'}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-medium shadow-sm outline-none focus:ring-2 focus:ring-rose-500/50" />
              </div>
              
              {filteredDirectives.length > 0 ? filteredDirectives.map(doc => (
                <button key={doc.id} onClick={() => { setSelectedDoc(doc); setView('detail'); }} className="w-full text-left p-5 bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all active:scale-[0.98] group">
                  <div className="flex justify-between items-center mb-2">
                     <span className={`text-[10px] font-black px-2 py-1 rounded-lg border ${doc.isCongDien || doc.id.includes('bcn') ? 'text-red-700 bg-red-50 border-red-100' : 'text-rose-700 bg-rose-50 border-rose-100'}`}>{doc.number}</span>
                     <span className="text-[10px] text-slate-400 font-bold">{doc.date.split(',').pop().trim()}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm leading-tight uppercase line-clamp-3 group-hover:text-rose-700 transition-colors">{doc.title}</h3>
                </button>
              )) : (
                <div className="text-center py-8 text-slate-500 text-[11px] font-medium">Không tìm thấy tài liệu phù hợp.</div>
              )}
            </div>
          )}

          {view === 'detail' && selectedDoc && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 bg-slate-400 min-h-screen px-2 py-6 -mx-6 -my-6 overflow-y-auto">
              <div className="max-w-[800px] mx-auto">
                <div className="flex items-center justify-between mb-4 bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-700 sticky top-4 z-50">
                   <button onClick={() => setView('list')} className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-1 text-[11px] font-bold text-white shadow-sm">
                     <ChevronLeft size={16}/> Danh sách
                   </button>
                </div>
                <div className="bg-[#fdfdfd] shadow-2xl border border-slate-300 p-8 sm:p-12 font-serif text-[11px] sm:text-[13px] leading-relaxed text-slate-900 min-h-[842px] relative mx-auto w-full group">
                  <div className="flex justify-between mb-8 font-bold text-center text-[10px] sm:text-[11.5px]">
                    <div className="w-[45%] text-center flex flex-col items-center">
                      <span className="whitespace-pre-line leading-relaxed uppercase">{selectedDoc.fullContent.leftHeader}</span>
                      <div className="w-16 h-[1.5px] bg-slate-900 mt-1"></div>
                    </div>
                    <div className="w-[50%] text-center flex flex-col items-center">
                        <span className="uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                        <span className="mb-0.5">Độc lập - Tự do - Hạnh phúc</span>
                        <div className="w-32 h-[1.5px] bg-slate-900 mt-0.5"></div>
                    </div>
                  </div>
                  <div className="text-center mb-8">
                     <h2 className="uppercase font-black text-[15px] sm:text-[16px] leading-tight text-slate-900 whitespace-pre-line">{selectedDoc.title.split('\n')[0]}</h2>
                     <h3 className="font-bold text-[13.5px] sm:text-[14.5px] leading-tight text-slate-900 whitespace-pre-line mt-2 px-6">{selectedDoc.title.split('\n').slice(1).join('\n')}</h3>
                     <div className="w-20 h-[1.5px] bg-slate-900 mx-auto mt-4"></div>
                  </div>
                  <div className="mb-6"><p className="font-bold text-[12.5px] sm:text-[13.5px] leading-relaxed text-slate-900 whitespace-pre-line">{selectedDoc.fullContent.recipient}</p></div>
                  <p className="indent-8 mb-4 text-justify leading-relaxed whitespace-pre-line">{selectedDoc.fullContent.intro}</p>
                  <div className="space-y-3 mb-8">
                    {selectedDoc.fullContent.mainPoints.map((p, i) => {
                        const hasNum = /^\d+\./.test(p);
                        return <div key={i} className="text-justify leading-relaxed">{hasNum ? <p className="indent-8 whitespace-pre-line">{p}</p> : <div className="flex gap-2"><span className="font-bold shrink-0">{i+1}.</span><p className="whitespace-pre-line">{p}</p></div>}</div>
                    })}
                  </div>
                  <p className="indent-8 mb-10 text-justify leading-relaxed whitespace-pre-line">{selectedDoc.fullContent.closing}</p>
                </div>
              </div>
            </div>
          )}
        </main>
        <SharedBottomNav goHome={goBack} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="rose" />
      </SwipeableScreen>
    </div>
  );
};

const DonutChartCard = ({ title, unit, data }) => {
  const total = data.reduce((acc, curr) => acc + curr.val, 0);
  // Tinh chỉnh tỷ lệ để vành Donut cực dày và nổi bật
  const radius = 75;
  const strokeWidth = 50; 
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;
  
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
       <h3 className="text-rose-600 font-bold text-[12.5px] text-center uppercase mb-1 leading-tight">{title}</h3>
       <p className="text-center text-slate-500 text-[10.5px] font-medium mb-4">({unit})</p>
       
       <div className="flex flex-col items-center">
           {/* Tăng kích thước bao ngoài lên w-52 h-52 để hình tròn lớn hơn */}
           <div className="relative w-52 h-52 mb-6 drop-shadow-md">
               <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 transform origin-center">
                 {data.map((item, i) => {
                   if(item.val === 0) return null;
                   const dash = (item.val / total) * circumference;
                   const offset = -currentOffset;
                   currentOffset += dash;
                   return (
                     <circle
                       key={i}
                       cx="100" cy="100" r={radius}
                       fill="transparent"
                       stroke={item.color}
                       strokeWidth={strokeWidth}
                       strokeDasharray={`${dash} ${circumference}`}
                       strokeDashoffset={offset}
                       className="transition-all duration-500 hover:opacity-80"
                     />
                   );
                 })}
               </svg>
               {/* Lỗ tâm tinh chỉnh kích thước chuẩn để tôn lên độ dày của vành màu */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-white rounded-full w-[96px] h-[96px] m-auto shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border border-slate-100">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Tổng cộng</span>
                  <span className="text-[13px] font-black text-slate-800">{total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
               </div>
           </div>
           
           <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 w-full mt-2 border-t border-slate-100 pt-4">
             {data.map((item, i) => (
               <div key={i} className="flex items-center justify-between bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-sm shrink-0 shadow-sm" style={{ backgroundColor: item.color }}></div>
                     <span className="text-[8.5px] font-bold text-slate-600 truncate max-w-[55px]" title={item.label}>{item.label}</span>
                  </div>
                  <span className="text-[9px] font-black text-slate-800">{item.val > 0 ? item.val : '-'}</span>
               </div>
             ))}
           </div>
       </div>
    </div>
  );
};

const DatabaseView = ({ goBack, setAppMode }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeRegion, setActiveRegion] = useState('Toàn Quốc');

  const regions = ['Toàn Quốc', 'ĐB Sông Hồng', 'TDMN phía Bắc', 'Bắc Trung Bộ', 'Nam Trung Bộ', 'Tây Nguyên', 'Đông Nam Bộ', 'ĐB Sông Cửu Long'];

  const dbModules = [
    { id: 1, title: 'Quy hoạch thủy lợi', desc: 'Bản đồ quy hoạch, định hướng phát triển thủy lợi', icon: <MapIcon size={28}/>, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100', action: () => setAppMode('quy_hoach') },
    { id: 2, title: 'Văn bản quy phạm pháp luật', desc: 'Hệ thống các luật, nghị định, thông tư', icon: <FileText size={28}/>, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100', action: () => setAppMode('legal_docs') },
    { id: 3, title: 'Dữ liệu công trình', desc: 'Danh mục, thông số kỹ thuật dùng chung toàn ngành', icon: <Layers size={28}/>, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', action: () => setAppMode('facility') },
    { id: 4, title: 'Tổ chức quản lý khai thác', desc: 'Hệ thống thông tin tổ chức, công ty, trung tâm', icon: <Network size={28}/>, color: 'text-teal-600', bg: 'bg-teal-50 border-teal-100' }
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 relative animate-in slide-in-from-right-4 duration-300">
     <SwipeableScreen goBack={goBack}>
      <AppHeader title="Cơ sở dữ liệu ngành" bgGradient="bg-gradient-to-br from-sky-600/80 to-blue-900/90" onBack={goBack} backText="Trang chủ" />
      <main className="flex-1 overflow-y-auto px-4 pb-24 blur-scrollbar">
        
        {/* ======================================= */}
        {/* DASHBOARD TỔNG QUAN CHUYÊN NGÀNH          */}
        {/* ======================================= */}
        <div className="mb-8 space-y-4 pt-2">
            
            {/* 1. Bộ lọc Vùng kinh tế */}
            <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`whitespace-nowrap px-3.5 py-1.5 text-[11.5px] font-bold rounded-lg border transition-all ${activeRegion === r ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-teal-600 text-white border-teal-600 shadow-sm opacity-90'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* 2. Biểu đồ: Tổng hợp diện tích tưới tiêu */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
               <h3 className="text-rose-600 font-bold text-[12.5px] text-center uppercase mb-1 leading-tight">Tổng hợp diện tích cần tưới và diện tích tưới, tiêu của CTTL trên phạm vi Toàn quốc</h3>
               <p className="text-center text-slate-500 text-[10.5px] font-medium mb-4">(nghìn ha)</p>
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <div className="w-[38%] text-[10px] font-bold text-blue-800 text-right leading-tight pr-1">Diện tích tiêu từ CTTL</div>
                     <div className="w-[62%] flex items-center pr-8">
                         <div className="h-[22px] bg-[#3b82f6] rounded-r-sm shadow-sm transition-all" style={{ width: '15%' }}></div>
                         <span className="text-[10px] font-bold text-rose-500 ml-1.5">999.91</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-[38%] text-[10px] font-bold text-blue-800 text-right leading-tight pr-1">Diện tích được tưới từ CTTL</div>
                     <div className="w-[62%] flex items-center pr-8 relative">
                         <div className="h-[22px] bg-[#38bdf8] rounded-r-sm shadow-sm transition-all" style={{ width: '47%' }}></div>
                         <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/90 px-1 py-0.5 rounded shadow text-[9px] font-bold text-slate-600 border border-slate-200">1: 4,425.75</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-[38%] text-[10px] font-bold text-blue-800 text-right leading-tight pr-1">Trong đó: Diện tích trồng lúa</div>
                     <div className="w-[62%] flex items-center pr-8">
                         <div className="h-[22px] bg-[#3b82f6] rounded-r-sm shadow-sm transition-all" style={{ width: '58%' }}></div>
                         <span className="text-[10px] font-bold text-rose-500 ml-1.5">5,508.54</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-[38%] text-[10px] font-bold text-blue-800 text-right leading-tight pr-1">Diện tích cây trồng cần tưới</div>
                     <div className="w-[62%] flex items-center pr-8">
                         <div className="h-[22px] bg-[#0ea5e9] rounded-r-sm shadow-sm transition-all" style={{ width: '100%' }}></div>
                         <span className="text-[10px] font-bold text-slate-700 ml-1.5">9,385.96</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* BỔ SUNG: 1 BIỂU ĐỒ TRÒN (DONUT CHARTS) THEO THIẾT KẾ CỦA BỘ */}
            <DonutChartCard 
               title="Tổng hợp diện tích sản xuất được cấp nước từ CTTL" 
               unit="nghìn ha" 
               data={[
                 { label: 'ĐB Sông Hồng', val: 799.21, color: '#60a5fa' },
                 { label: 'TDMN phía Bắc', val: 370.58, color: '#2dd4bf' },
                 { label: 'Bắc Trung Bộ', val: 416.89, color: '#4ade80' },
                 { label: 'Nam Trung Bộ', val: 266.67, color: '#fb923c' },
                 { label: 'Tây Nguyên', val: 168.97, color: '#f43f5e' },
                 { label: 'Đông Nam Bộ', val: 232.25, color: '#a78bfa' },
                 { label: 'ĐB Sông Cửu Long', val: 2171.18, color: '#facc15' }

               ]} 
            />

            {/* 3. Biểu đồ: Số lượng hồ chứa */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
               <h3 className="text-rose-600 font-bold text-[12.5px] text-center uppercase mb-1 leading-tight">Tổng hợp số lượng hồ chứa các loại: Toàn quốc</h3>
               <div className="space-y-3 mt-4">
                  {[
                    { label: 'Hồ nhỏ', val: '4,225', pct: 62 },
                    { label: 'Hồ vừa', val: '1,633', pct: 24 },
                    { label: 'Hồ lớn', val: '892', pct: 13 },
                    { label: 'Tổng cộng', val: '6,750', pct: 100 },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                       <div className="w-[28%] text-[10px] font-bold text-blue-800 text-right leading-tight pr-1">{item.label}</div>
                       <div className="w-[72%] flex items-center pr-8">
                           <div className="h-[22px] bg-[#7dd3fc] rounded-r-sm shadow-sm transition-all" style={{ width: `${item.pct}%` }}></div>
                           <span className="text-[10px] font-bold text-slate-700 ml-1.5">{item.val}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* 4. Biểu đồ: Tổng dung tích trữ */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
               <h3 className="text-rose-600 font-bold text-[12.5px] text-center uppercase mb-1 leading-tight">Tổng dung tích trữ hồ chứa thủy lợi</h3>
               <p className="text-center text-slate-500 text-[10.5px] font-medium mb-4">(triệu m3)</p>
               <div className="space-y-2 mt-2">
                  {[
                    { label: 'ĐB Sông Cửu Long', val: '6', pct: 1 },
                    { label: 'Đông Nam Bộ', val: '2,132', pct: 15 },
                    { label: 'Tây Nguyên', val: '1,683', pct: 12 },
                    { label: 'Nam Trung Bộ', val: '774', pct: 6 },
                    { label: 'Bắc Trung Bộ', val: '6,063', pct: 42 },
                    { label: 'TDMN phía Bắc', val: '358', pct: 3 },
                    { label: 'ĐB Sông Hồng', val: '1,865', pct: 13 },
                    { label: 'Toàn quốc', val: '14,492', pct: 100 },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                       <div className="w-[35%] text-[9.5px] font-bold text-blue-800 text-right leading-tight pr-1">{item.label}</div>
                       <div className="w-[65%] flex items-center pr-6">
                           <div className="h-[18px] bg-[#38bdf8] rounded-r-sm shadow-sm transition-all" style={{ width: `${item.pct}%`, minWidth: '2px' }}></div>
                           <span className="text-[9px] font-bold text-slate-700 ml-1.5">{item.val}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
        </div>

        {/* ======================================= */}
        {/* CÁC PHÂN HỆ QUẢN LÝ HIỆN CÓ               */}
        {/* ======================================= */}
        <div className="flex items-center gap-2 mb-4 px-1 border-t border-slate-200 pt-6 mt-2">
          <Grip className="text-slate-400" size={18} />
          <h3 className="font-black text-slate-700 uppercase tracking-tight text-[13.5px]">Cơ sở dữ liệu chuyên ngành</h3>
        </div>

        <div className="space-y-4">
          {dbModules.map((mod, idx) => (
            <button key={mod.id} onClick={() => mod.action && mod.action()} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all active:scale-[0.98] group">
              <div className={`h-16 w-16 rounded-[18px] flex items-center justify-center shrink-0 border ${mod.bg} ${mod.color} group-hover:scale-105 transition-transform duration-300 shadow-sm`}>{mod.icon}</div>
              <div className="text-left flex-1 py-1">
                 <h3 className="font-black text-slate-800 text-[13px] uppercase tracking-tight mb-1.5 group-hover:text-sky-700 transition-colors">{mod.title}</h3>
                 <p className="text-[10.5px] text-slate-500 leading-relaxed font-medium line-clamp-2">{mod.desc}</p>
              </div>
            </button>
          ))}
        </div>

      </main>
      <SharedBottomNav goHome={goBack} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="sky" />
     </SwipeableScreen>
    </div>
  );
};

const LegalDocsView = ({ goBack }) => {
  const [activeTab, setActiveTab] = useState('home');
  const docCategories = [
    { id: 'luat', title: 'Luật', count: '15 Văn bản', icon: <Scale size={32}/>, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200', gradient: 'from-rose-500 to-rose-600' },
    { id: 'nghidinh', title: 'Nghị định', count: '48 Văn bản', icon: <ClipboardCheck size={32}/>, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', gradient: 'from-blue-500 to-blue-600' },
    { id: 'thongtu', title: 'Thông tư', count: '156 Văn bản', icon: <Layers size={32}/>, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', gradient: 'from-amber-500 to-amber-600' },
    { id: 'quychuan', title: 'Danh mục Tiêu chuẩn', count: '92 Văn bản', icon: <BookOpen size={32}/>, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', gradient: 'from-emerald-500 to-emerald-600' }
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 relative animate-in slide-in-from-right-4 duration-300">
     <SwipeableScreen goBack={goBack}>
       <AppHeader title="Văn bản QPPL" bgGradient="bg-gradient-to-br from-rose-600/80 to-red-900/90" onBack={goBack} backText="Cơ sở dữ liệu ngành" />
       <div className="flex-1 overflow-y-auto px-5 pb-24 blur-scrollbar">
          <div className="grid grid-cols-2 gap-4">
             {docCategories.map((cat, idx) => (
                <button key={idx} className="flex flex-col items-center text-center p-5 bg-white rounded-[24px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 active:scale-[0.98] group relative overflow-hidden">
                   <div className={`absolute top-0 w-full h-1.5 bg-gradient-to-r ${cat.gradient} opacity-80`}></div>
                   <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${cat.bg} ${cat.color} group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm`}>{cat.icon}</div>
                   <h3 className="text-[12.5px] font-black text-slate-800 uppercase tracking-tight mb-2 leading-tight h-8 flex items-center justify-center">{cat.title}</h3>
                   <span className="text-[10px] text-slate-500 font-bold bg-slate-50 border border-slate-100 px-3 py-1 rounded-full group-hover:bg-slate-100 transition-colors">{cat.count}</span>
                </button>
             ))}
          </div>
       </div>
       <SharedBottomNav goHome={goBack} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="rose" />
     </SwipeableScreen>
    </div>
  );
};

const QuyHoachView = ({ goBack }) => {
  const [activeTab, setActiveTab] = useState('home');
  const modules = [
    { id: 'dm_quy_hoach', title: 'Danh mục Quy hoạch', icon: <MapIcon size={32}/>, color: 'bg-indigo-600', description: 'Danh mục các quy hoạch thủy lợi' },
    { id: 'dm_ct_qh', title: 'Danh mục công trình QH', icon: <Layers size={32}/>, color: 'bg-violet-600', description: 'Danh mục công trình trong quy hoạch' },
    { id: 'kh_dtc', title: 'Kế hoạch đầu tư công', icon: <Coins size={32}/>, color: 'bg-sky-600', description: 'Kế hoạch vốn đầu tư công hàng năm' },
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-indigo-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 relative animate-in slide-in-from-right-4 duration-300">
     <SwipeableScreen goBack={goBack}>
      <AppHeader title="Quy hoạch thủy lợi" bgGradient="bg-gradient-to-br from-indigo-800/70 via-indigo-600/60 to-violet-600/50" onBack={goBack} backText="Cơ sở dữ liệu ngành" />
      <main className="flex-1 overflow-y-auto blur-scrollbar px-6 py-6 pb-24 relative">
        <div className="grid grid-cols-2 gap-4">
          {modules.map((item, idx) => (
            <button key={item.id} className={`flex flex-col items-center p-5 rounded-[32px] bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all active:scale-95 group relative overflow-hidden ${idx === 2 ? 'col-span-2' : ''}`}>
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white shadow-xl`}>{item.icon}</div>
              <h3 className="text-sm font-bold text-slate-800 leading-tight mb-1 text-center flex items-center justify-center px-1">{item.title}</h3>
              <p className="text-[10px] text-slate-400 font-medium text-center leading-tight">{item.description}</p>
            </button>
          ))}
        </div>
      </main>
      <SharedBottomNav goHome={goBack} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="indigo" />
     </SwipeableScreen>
    </div>
  );
};

const AnToanDapView = ({ goBack }) => {
  const [activeTab, setActiveTab] = useState('home');
  const modules = [
    { id: 'van_hanh_ho', title: 'Vận hành hồ', icon: <Waves size={32}/>, color: 'bg-blue-600', description: 'Theo dõi & điều tiết hồ chứa' },
    { id: 'du_bao', title: 'Dự báo - Cảnh báo', icon: <AlertTriangle size={32}/>, color: 'bg-orange-500', description: 'Cảnh báo sớm nguy cơ mất an toàn' },
    { id: 'bao_cao_su_co', title: 'Báo cáo sự cố', icon: <Activity size={32}/>, color: 'bg-red-600', description: 'Ghi nhận & xử lý sự cố đập' },
    { id: 'du_lieu_atd', title: 'Dữ liệu an toàn đập', icon: <Shield size={32}/>, color: 'bg-emerald-600', description: 'Cơ sở dữ liệu kiểm định, quan trắc' },
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-red-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 relative animate-in slide-in-from-right-4 duration-300">
     <SwipeableScreen goBack={goBack}>
      <AppHeader title="Quản lý an toàn đập" bgGradient="bg-gradient-to-br from-red-800/70 via-red-600/60 to-orange-600/50" />
      <main className="flex-1 overflow-y-auto blur-scrollbar px-6 py-6 pb-24 relative">
        <div className="grid grid-cols-2 gap-4">
          {modules.map((item, idx) => (
            <button key={item.id} className="flex flex-col items-center p-5 rounded-[32px] bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all active:scale-95 group relative overflow-hidden">
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white shadow-xl`}>{item.icon}</div>
              <h3 className="text-sm font-bold text-slate-800 leading-tight mb-1 text-center flex items-center justify-center px-1">{item.title}</h3>
              <p className="text-[10px] text-slate-400 font-medium text-center leading-tight">{item.description}</p>
            </button>
          ))}
        </div>
      </main>
      <SharedBottomNav goHome={goBack} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="red" />
     </SwipeableScreen>
    </div>
  );
};

const NuocSachView = ({ goBack, setAppMode }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showDataList, setShowDataList] = useState(false);

  const modules = [
    { id: 'dl_cong_trinh', title: 'Dữ liệu công trình cấp nước tập trung', icon: <Database size={32} className="text-blue-500"/>, description: 'Thống kê công trình cấp nước', action: () => setShowDataList(true) },
    { id: 'bo_chi_so', title: 'Bộ chỉ số theo dõi đánh giá', icon: <BarChart3 size={32} className="text-emerald-500"/>, description: 'Theo dõi & đánh giá hiệu quả' },
    { id: 'ban_do_gis', title: 'Bản đồ GIS công trình', icon: <MapIcon size={32} className="text-indigo-500"/>, description: 'Bản đồ cấp nước tập trung' },
    { id: 'phan_vung_rr', title: 'Phân vùng rủi ro cấp nước', icon: <AlertTriangle size={32} className="text-rose-500"/>, description: 'Phân tích rủi ro & cảnh báo' },
  ];

  if (showDataList) return <CapNuocDataListView goBack={() => setShowDataList(false)} />;

  return (
    <div className="flex h-screen w-full flex-col bg-cyan-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-slate-200 relative animate-in slide-in-from-right-4 duration-300">
     <SwipeableScreen goBack={goBack}>
      <AppHeader title="Quản lý nước sạch nông thôn" bgGradient="bg-gradient-to-br from-cyan-800/70 via-cyan-600/60 to-blue-600/50" />
      <main className="flex-1 overflow-y-auto blur-scrollbar px-6 py-6 pb-24 relative">
        <div className="grid grid-cols-2 gap-4">
          {modules.map((item) => (
            <button key={item.id} onClick={item.action} className="flex flex-col items-center p-3 transition-all active:scale-95 group relative overflow-hidden bg-transparent">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md border border-slate-100">{item.icon}</div>
              <h3 className="text-sm font-bold text-slate-800 leading-tight mb-1 text-center flex items-center justify-center px-1">{item.title}</h3>
            </button>
          ))}
        </div>
      </main>
      <SharedBottomNav goHome={goBack} activeTab={activeTab} setActiveTab={setActiveTab} themeColor="cyan" />
     </SwipeableScreen>
    </div>
  );
};

const App = () => {
  const [appMode, setAppMode] = useState('portal'); 
  
  return (
    <>
      <ScrollbarStyles />
      {appMode === 'van_hanh' && <VanHanhView goBack={() => setAppMode('portal')} />}
      {appMode === 'quy_hoach' && <QuyHoachView goBack={() => setAppMode('database')} />}
      {appMode === 'an_toan_dap' && <AnToanDapView goBack={() => setAppMode('portal')} />}
      {appMode === 'nuoc_sach' && <NuocSachView goBack={() => setAppMode('portal')} setAppMode={setAppMode} />}
      {appMode === 'news' && <NewsView goBack={() => setAppMode('portal')} />}
      {appMode === 'facility' && <FacilityDashboard goBack={() => setAppMode('database')} isRoot={true} />}
      {appMode === 'science' && <ScienceView goBack={() => setAppMode('portal')} />}
      {appMode === 'database' && <DatabaseView goBack={() => setAppMode('portal')} setAppMode={setAppMode} />}
      {appMode === 'legal_docs' && <LegalDocsView goBack={() => setAppMode('database')} />}
      {appMode === 'portal' && <PortalView setAppMode={setAppMode} />}
    </>
  );
};

export default App;