# Chuyển DBienMucNuoc/*_mucnuoc.xlsx → public/data/mucnuoc.json (diễn biến mực nước theo giờ, cả 8 kịch bản).
#
#   python scripts/mucnuoc_to_json.py <thư mục Excel> <file JSON ra>
#
# Mỗi file Excel (Sheet1): cột A thời gian, B..Q mực nước 16 vị trí, AI thời gian, AJ..AY độ mặn 16 vị trí.
# File JSON ra: { <kịch bản>: { code, start, stepHours, count, stations: { <id>: { wl: [mực nước], ok: "0110…" } } } }
#   ok[i] = "1" khi MN > Zđáy và độ mặn < 1‰ (đoạn nét liền trên biểu đồ Excel), "0" khi không, "-" khi thiếu độ mặn.
import sys, os, re, glob, json, datetime, unicodedata
import openpyxl
from openpyxl.utils import column_index_from_string as CI

sys.stdout.reconfigure(encoding='utf-8')
src_dir, out_path = sys.argv[1], sys.argv[2]

# Tên file → key kịch bản trong layerTree.js
SCENARIOS = {
    'PA1.1': 'xa-ht-2024', 'PA1.2': 'xa-ht-2025', 'PA1.3': 'xa-tt', 'PA1.4': 'xa-tc',
    'PA1.5': 'xa-td', 'PA2': 'xa-tc-2n', 'PA3.1': 'dap-xa-tt', 'PA3.2': 'dap-xa-tc',
}
WL_COLS = range(CI('B') - 1, CI('Q'))
SAL_TIME = CI('AI') - 1
SAL_COLS = range(CI('AJ') - 1, CI('AY'))


def slug(text):
    """'Cống Rỗ mới' / 'C. Rỗ mới' → 'ro-moi' (khớp id trong ketQuaPhanTich.json)"""
    text = re.sub(r'^(C|TB|Cống)\.?\s+', '', text).replace('đ', 'd').replace('Đ', 'D')
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')


result = {}
for path in sorted(glob.glob(os.path.join(src_dir, '*_mucnuoc.xlsx'))):
    code = os.path.basename(path).split('_')[0]
    key = SCENARIOS[code]
    ws = openpyxl.load_workbook(path, data_only=True, read_only=True).worksheets[0]
    rows = list(ws.iter_rows(values_only=True))
    header = rows[1]
    ids = [slug(header[c]) for c in WL_COLS]
    zd = [rows[3][c] for c in WL_COLS]

    wl_rows = [r for r in rows[5:] if isinstance(r[0], datetime.datetime)]
    # Độ mặn ghép theo thời gian (có file chuỗi độ mặn ngắn hơn chuỗi mực nước)
    sal_by_time = {r[SAL_TIME]: r for r in rows[5:]
                   if len(r) > SAL_TIME and isinstance(r[SAL_TIME], datetime.datetime)}

    times = [r[0] for r in wl_rows]
    gaps = {(b - a) for a, b in zip(times, times[1:])}
    if gaps != {datetime.timedelta(hours=1)}:
        raise SystemExit(f'{code}: bước thời gian không đều {gaps}')

    stations = {}
    missing_sal = 0
    for k, c in enumerate(WL_COLS):
        wl, ok = [], []
        for r in wl_rows:
            level = r[c]
            sal_row = sal_by_time.get(r[0])
            sal = sal_row[SAL_COLS[k]] if sal_row else None
            wl.append(round(level, 3))
            if not isinstance(sal, (int, float)):
                ok.append('-')
                missing_sal += 1
            else:
                ok.append('1' if level > zd[k] and sal < 1 else '0')
        stations[ids[k]] = {'wl': wl, 'ok': ''.join(ok)}

    result[key] = {
        'code': code,
        'start': times[0].strftime('%Y-%m-%dT%H:%M'),
        'stepHours': 1,
        'count': len(times),
        'stations': stations,
    }
    note = f', thiếu độ mặn {missing_sal // len(ids)} giờ cuối' if missing_sal else ''
    print(f'{code} → {key}: {len(times)} giờ {times[0]} → {times[-1]}{note}')

os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, separators=(',', ':'))
print(f'→ {out_path}: {len(result)} kịch bản, {os.path.getsize(out_path) // 1024} KB')
