import { useEffect, useReducer, useState } from 'react'
import { Button, Empty, Input, Switch, Tabs } from 'antd'
import {
  CaretRightOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  LineChartOutlined,
  PieChartOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { DataLayers } from '../map/layerTile'
import { analysisLayer, DISPLAY_OPTIONS, setDisplayKey, WATER_LEVEL_OPTION } from '../map/analysisResult'
import { LAYER_TREE } from '../map/layerTree'
import useMediaQuery, { WIDE_SCREEN } from '../hooks/useMediaQuery'

// Mỗi nhóm gốc trong LAYER_TREE là một tab
const TAB_ICONS = {
  'kich-ban': <ExperimentOutlined />,
  'du-lieu-nen': <DatabaseOutlined />,
}

const getLeaves = (node) => (node.layers ? [node] : node.children.flatMap(getLeaves))
const isLeafOn = (leaf) => leaf.layers.some((id) => DataLayers[id].getVisible())
const setLeaf = (leaf, on) => leaf.layers.forEach((id) => DataLayers[id].setVisible(on))

// Nhóm chọn một (exclusive): key lớp → toàn bộ lớp của nhóm đó
const EXCLUSIVE_LEAVES = {}
const collectExclusive = (node) => {
  if (node.exclusive) {
    const leaves = getLeaves(node)
    leaves.forEach((leaf) => (EXCLUSIVE_LEAVES[leaf.key] = leaves))
  }
  node.children?.forEach(collectExclusive)
}
LAYER_TREE.forEach(collectExclusive)

// Bật một lớp trong nhóm chọn một thì tắt các lớp còn lại của nhóm
const selectExclusive = (leaf, on) =>
  EXCLUSIVE_LEAVES[leaf.key].forEach((other) => setLeaf(other, on && other.key === leaf.key))

// Tìm kiếm không phân biệt dấu tiếng Việt
const normalize = (text) =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ/gi, 'd').toLowerCase()

// Giữ lại nhánh có tên khớp, hoặc có con khớp
const filterNode = (node, text) => {
  if (!text || normalize(node.title).includes(text)) return node
  if (!node.children) return null
  const children = node.children.map((child) => filterNode(child, text)).filter(Boolean)
  return children.length ? { ...node, children } : null
}

function LeafRow({ node }) {
  const on = isLeafOn(node)
  return (
    <div className={`layer-leaf${on ? ' layer-leaf--on' : ''}`} onClick={() => setLeaf(node, !on)}>
      <span className="layer-leaf__dot" />
      <span className="layer-leaf__title">{node.title}</span>
      <Switch
        size="small"
        checked={on}
        onClick={(checked, e) => {
          e.stopPropagation()
          setLeaf(node, checked)
        }}
      />
    </div>
  )
}

// Hàng = nhóm chỉ chứa lớp (kịch bản → các đợt); còn lại là mục có tiêu đề (phương án)
const isRow = (node) => node.layers || node.children.every((child) => child.layers)

// "Thời kỳ tưới dưỡng (Tháng 3 - 5)" → ["Thời kỳ tưới dưỡng", "Tháng 3 - 5"]
const splitLabel = (title) => {
  const match = title.match(/^(.*?)\s*\((.*)\)\s*$/)
  return match ? [match[1], match[2].replace(/\s+/g, ' ')] : [title, null]
}

// Hiển thị của giai đoạn đang bật: 2 biểu đồ tròn + diễn biến mực nước, chọn 1 hoặc không chọn
function DisplayOptions() {
  const displayKey = analysisLayer.get('displayKey')
  return (
    <div className="display-options">
      <div className="display-options__list">
        {DISPLAY_OPTIONS.map(({ key, label, color }) => {
          const on = displayKey === key
          return (
            <button
              key={key}
              type="button"
              className={`display-option${on ? ' display-option--on' : ''}`}
              style={{ '--option-color': color }}
              onClick={() => setDisplayKey(on ? null : key)}
            >
              {key === WATER_LEVEL_OPTION.key ? <LineChartOutlined /> : <PieChartOutlined />} {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ChoiceRow({ row, index }) {
  const options = row.layers ? [row] : row.children
  const rowOn = options.some(isLeafOn)
  const activeLeaf = options.find(isLeafOn)
  return (
    <div className={`choice-row${rowOn ? ' choice-row--on' : ''}`}>
      <div className="choice-row__title">
        <span className="choice-row__index">{index + 1}</span>
        <span>{row.title}</span>
      </div>
      <div className="choice-row__options">
        {options.map((leaf) => {
          const on = isLeafOn(leaf)
          const [label, sub] = splitLabel(leaf.title)
          return (
            <button
              key={leaf.key}
              type="button"
              className={`choice-option${on ? ' choice-option--on' : ''}`}
              onClick={() => selectExclusive(leaf, !on)}
            >
              <span className="choice-option__label">{label}</span>
              {sub && <span className="choice-option__sub">{sub}</span>}
            </button>
          )
        })}
      </div>
      {activeLeaf && <DisplayOptions />}
    </div>
  )
}

// Nhóm chọn một: mỗi kịch bản là một hàng, các đợt là nút chọn nằm ngang; nhóm theo phương án
function ExclusiveRows({ node }) {
  return (
    <div className="choice-list">
      {node.children.map((child, index) =>
        isRow(child) ? (
          <ChoiceRow key={child.key} row={child} index={index} />
        ) : (
          <section key={child.key} className="choice-section">
            <div
              className={`choice-section__title${getLeaves(child).some(isLeafOn) ? ' choice-section__title--on' : ''}`}
            >
              {child.title}
            </div>
            {child.children.map((row, rowIndex) => (
              <ChoiceRow key={row.key} row={row} index={rowIndex} />
            ))}
          </section>
        ),
      )}
    </div>
  )
}

function GroupNode({ node, expanded, onToggleExpand, searching }) {
  const leaves = getLeaves(node)
  const onCount = leaves.filter(isLeafOn).length
  const open = searching || expanded.has(node.key)

  return (
    <div className="layer-group">
      <div className="layer-group__header" onClick={() => onToggleExpand(node.key)}>
        <CaretRightOutlined className={`layer-group__caret${open ? ' layer-group__caret--open' : ''}`} />
        <span className="layer-group__title">{node.title}</span>
        <Switch
          size="small"
          checked={onCount > 0}
          className={onCount > 0 && onCount < leaves.length ? 'switch--partial' : undefined}
          onClick={(checked, e) => {
            e.stopPropagation()
            leaves.forEach((leaf) => setLeaf(leaf, checked))
          }}
        />
      </div>
      {open && (
        <div className="layer-group__children">
          {node.children.map((child) => (
            <TreeNode
              key={child.key}
              node={child}
              expanded={expanded}
              onToggleExpand={onToggleExpand}
              searching={searching}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TreeNode(props) {
  return props.node.layers ? <LeafRow node={props.node} /> : <GroupNode {...props} />
}

// Nội dung một tab: thanh công cụ + danh sách lớp
function TabContent({ root, filtered, expanded, onToggleExpand, searching }) {
  const leaves = getLeaves(root)
  const onCount = leaves.filter(isLeafOn).length

  return (
    <div className="layer-tab">
      <div className="layer-tab__toolbar">
        <span>{root.exclusive ? 'Chọn 1 kịch bản và đợt để hiển thị' : 'Bật/tắt các lớp dữ liệu nền'}</span>
        <Button
          type="link"
          size="small"
          disabled={onCount === 0}
          onClick={() => leaves.forEach((leaf) => setLeaf(leaf, false))}
        >
          {root.exclusive ? 'Bỏ chọn' : 'Tắt tất cả'}
        </Button>
      </div>

      {!filtered && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không tìm thấy lớp" />}

      {filtered && root.exclusive && <ExclusiveRows node={filtered} />}

      {filtered && !root.exclusive && (
        <div className="layer-tab__list">
          {filtered.children.map((child) => (
            <TreeNode
              key={child.key}
              node={child}
              expanded={expanded}
              onToggleExpand={onToggleExpand}
              searching={searching}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function LayerMenu() {
  const [, refresh] = useReducer((x) => x + 1, 0)
  const wide = useMediaQuery(WIDE_SCREEN)
  const [keyword, setKeyword] = useState('')
  const [activeTab, setActiveTab] = useState(LAYER_TREE[0].key)
  const [expanded, setExpanded] = useState(() => new Set())

  // Vẽ lại menu khi lớp được bật/tắt hoặc đổi hiển thị (từ menu hoặc nơi khác)
  useEffect(() => {
    const layers = Object.values(DataLayers)
    layers.forEach((layer) => layer.on('change:visible', refresh))
    analysisLayer.on('change:displayKey', refresh)
    return () => {
      layers.forEach((layer) => layer.un('change:visible', refresh))
      analysisLayer.un('change:displayKey', refresh)
    }
  }, [])

  const text = normalize(keyword.trim())

  const toggleExpand = (key) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const tabs = LAYER_TREE.map((root) => {
    const filtered = filterNode(root, text)
    return {
      key: root.key,
      label: (
        <span className="layer-tab__label">
          {TAB_ICONS[root.key]}
          {root.title}
        </span>
      ),
      children: (
        <TabContent
          root={root}
          filtered={filtered}
          expanded={expanded}
          onToggleExpand={toggleExpand}
          searching={Boolean(text)}
        />
      ),
    }
  })

  return (
    <div className="layer-menu">
      <div className="layer-menu__search">
        <Input
          size={wide ? 'large' : 'middle'}
          allowClear
          placeholder="Tìm lớp bản đồ..."
          prefix={<SearchOutlined />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <Tabs className="layer-menu__tabs" activeKey={activeTab} onChange={setActiveTab} items={tabs} />
    </div>
  )
}
