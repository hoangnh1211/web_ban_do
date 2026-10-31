import { useEffect, useReducer, useState } from 'react'
import { Button, Empty, Input, Switch, Tabs, Typography } from 'antd'
import {
  CaretRightOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { DataLayers } from '../map/layerTile'
import { LAYER_TREE } from '../map/layerTree'

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

// Nhóm chọn một: mỗi nhóm con là một hàng, các lớp con là nút chọn nằm ngang
function ExclusiveRows({ node }) {
  return (
    <div className="choice-list">
      {node.children.map((row, index) => {
        const options = row.layers ? [row] : getLeaves(row)
        const rowOn = options.some(isLeafOn)
        return (
          <div key={row.key} className={`choice-row${rowOn ? ' choice-row--on' : ''}`}>
            <div className="choice-row__title">
              <span className="choice-row__index">{index + 1}</span>
              <span>{row.title}</span>
            </div>
            <div className="choice-row__options">
              {options.map((leaf) => {
                const on = isLeafOn(leaf)
                return (
                  <button
                    key={leaf.key}
                    type="button"
                    className={`choice-option${on ? ' choice-option--on' : ''}`}
                    onClick={() => selectExclusive(leaf, !on)}
                  >
                    {leaf.title}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
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
  const [keyword, setKeyword] = useState('')
  const [activeTab, setActiveTab] = useState(LAYER_TREE[0].key)
  const [expanded, setExpanded] = useState(() => new Set())

  // Vẽ lại menu khi lớp được bật/tắt (từ menu hoặc nơi khác)
  useEffect(() => {
    const layers = Object.values(DataLayers)
    layers.forEach((layer) => layer.on('change:visible', refresh))
    return () => layers.forEach((layer) => layer.un('change:visible', refresh))
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
      <div className="layer-menu__header">
        <div className="layer-menu__logo layer-menu__logo--drop">
          <img src="/image/logo.svg" alt="Logo" />
        </div>
        <div className="layer-menu__heading">
          <Typography.Title level={5} className="layer-menu__title">
            Bản đồ quy hoạch thuỷ lợi
          </Typography.Title>
          <Typography.Text className="layer-menu__subtitle">Quản lý lớp bản đồ</Typography.Text>
        </div>
        <div className="layer-menu__logo layer-menu__logo--round">
          <img src="/image/image.png" alt="IWRP" />
        </div>
      </div>

      <div className="layer-menu__search">
        <Input
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
