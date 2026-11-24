# Cập nhật src/data/ketQuaPhanTich.json từ file tổng hợp KQ_PhanTich/TH_2_thoiky.xlsx.
#
#   python scripts/kqphantich_to_json.py <TH_2_thoiky.xlsx> <ketQuaPhanTich.json>
#
# Đọc 2 sheet "Jan-Feb" (d1 - xả nước gia tăng) và "Mar-May" (d2 - tưới dưỡng); mỗi dòng: PA, vị trí, X, Y, ...
# Giữ nguyên trong JSON: tên/loại vị trí, nhãn giai đoạn, code/group kịch bản. Thay: fields, results, số liệu vị trí.
# PA1.4 thời kỳ tưới dưỡng lấy theo dòng "PA1.4td".
import sys, re, json, unicodedata
import openpyxl

sys.stdout.reconfigure(encoding='utf-8')
xlsx_path, json_path = sys.argv[1], sys.argv[2]

SCENARIOS = {
    'PA1.1': 'xa-ht-2024', 'PA1.2': 'xa-ht-2025', 'PA1.3': 'xa-tt', 'PA1.4': 'xa-tc',
    'PA1.5': 'xa-td', 'PA2': 'xa-tc-2n', 'PA3.1': 'dap-xa-tt', 'PA3.2': 'dap-xa-tc',
}
PERIODS = {'d1': 'Jan-Feb', 'd2': 'Mar-May'}
# (giai đoạn, PA) → dòng PA trong Excel
ROW_CODE = {('d2', 'PA1.4'): 'PA1.4td'}

# Cột Excel (0-based) → trường kết quả. Tỷ lệ trong Excel là %, JSON lưu 0–1.
# Nhãn lấy nguyên từ dòng tiêu đề tiếng Việt (dòng 3) của sheet, bỏ phần đơn vị "(...)" ở cuối.
FIELDS = [
    (6, 'totalHours', 'giờ'),
    (7, 'wlMax', 'm'),
    (8, 'wlMin', 'm'),
    (9, 'wlAvg', 'm'),
    (10, 'salMax', '‰'),
    (11, 'hWlLeZd', 'giờ'),
    (12, 'hWlGtZd', 'giờ'),
    (13, 'hSalGt1', 'giờ'),
    (14, 'hSalLt1', 'giờ'),
    (15, 't1', 'giờ'),
    (16, 't2', 'giờ'),
    (17, 't3', 'giờ'),
    (18, 't4', 'giờ'),
    (19, 'ratioPossible', '%'),
]
# Cột M trong Excel bị trùng tiêu đề với cột L ("Thời gian MN < Zđồng"); số liệu là số giờ MN > Zđồng
LABEL_OVERRIDES = {12: 'Thời gian MN > Zđồng'}


def slug(text):
    """'Cống Rỗ mới' → 'ro-moi' (khớp id trong ketQuaPhanTich.json)"""
    text = re.sub(r'^(C|TB|Cống)\.?\s+', '', text).replace('đ', 'd').replace('Đ', 'D')
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')


wb = openpyxl.load_workbook(xlsx_path, data_only=True, read_only=True)
header = next(wb[PERIODS['d1']].iter_rows(min_row=3, max_row=3, values_only=True))
label_of = lambda c: LABEL_OVERRIDES.get(c) or re.sub(r'\s+', ' ', re.sub(r'\s*\([^)]*\)\s*$', '', header[c])).strip()
# sheet → { PA: { id: dòng } }
sheets = {}
for period, name in PERIODS.items():
    table = {}
    for r in wb[name].iter_rows(min_row=4, values_only=True):
        if r[0] and r[1] and r[1] != 'Station':
            table.setdefault(r[0], {})[slug(r[1])] = r
    sheets[period] = table

with open(json_path, encoding='utf-8') as f:
    data = json.load(f)

station_ids = [s['id'] for s in data['stations']]
first = sheets['d1']['PA1.1']
missing = set(station_ids) - set(first)
if missing:
    raise SystemExit(f'Thiếu vị trí trong Excel: {missing}')

# Số liệu vị trí: Zđồng, khoảng cách, tọa độ (bỏ Ztk — file mới không còn)
for s in data['stations']:
    r = first[s['id']]
    s.pop('ztk', None)
    s.update(lon=r[2], lat=r[3], distanceKm=round(r[4], 3), zd=round(r[5], 3))

data['source'] = 'KQ_PhanTich/TH_2_thoiky.xlsx, sheet "Jan-Feb" và "Mar-May"'
for period, name in PERIODS.items():
    data['periods'][period]['source'] = name
data['fields'] = [{'key': k, 'label': label_of(c), 'unit': unit} for c, k, unit in FIELDS]

for code, key in SCENARIOS.items():
    scenario = data['results'][key]
    for period in PERIODS:
        rows = sheets[period][ROW_CODE.get((period, code), code)]
        scenario[period] = {
            sid: {
                k: (round(rows[sid][c] / 100, 4) if unit == '%' else rows[sid][c])
                for c, k, unit in FIELDS
            }
            for sid in station_ids
        }

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')
print(f'→ {json_path}: {len(SCENARIOS)} kịch bản × {len(PERIODS)} giai đoạn × {len(station_ids)} vị trí')
