import { useEffect, useRef, useState } from 'react'
import { Alert, Spin } from 'antd'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { DataZoomComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { loadWaterLevel } from '../map/waterLevelData'

echarts.use([LineChart, GridComponent, TooltipComponent, DataZoomComponent, LegendComponent, CanvasRenderer])

// Diễn biến mực nước theo giờ tại một vị trí, vẽ như biểu đồ trong Excel (DBienMucNuoc/*_mucnuoc.xlsx):
// - nét chấm: toàn bộ mực nước
// - nét liền: giờ MN > Zđáy và độ mặn < 1‰ (cột R..AG trong Excel)
// Dữ liệu: xem map/waterLevelData.js

const COLOR = '#156082' // màu đường trong Excel
const HOUR = 3600 * 1000

const pad = (n) => String(n).padStart(2, '0')
const formatTime = (ms) => {
  const d = new Date(ms)
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
const formatLevel = (value) =>
  value.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// Khung nhìn ban đầu theo giai đoạn đang bật: d1 = tháng 1–2, d2 = từ tháng 3
const periodWindow = (period, start, end) => {
  const march = new Date(new Date(start).getFullYear(), 2, 1).getTime()
  return period === 'd1' ? [start, Math.min(march, end)] : [Math.max(march, start), end]
}

const buildOption = (data, stationId, period) => {
  const { wl, ok } = data.stations[stationId]
  const start = new Date(`${data.start}:00`).getTime()
  const times = wl.map((_, i) => start + i * data.stepHours * HOUR)
  const end = times[times.length - 1]
  const [from, to] = periodWindow(period, start, end)

  return {
    animation: false,
    grid: { left: 56, right: 24, top: 40, bottom: 80 },
    legend: {
      top: 4,
      data: ['Thời gian không lấy được nước', 'Thời gian lấy được nước'],
    },
    tooltip: {
      trigger: 'axis',
      triggerOn: 'mousemove|click',
      axisPointer: { type: 'line' },
      formatter: (params) => {
        const point = params.find((p) => p.seriesIndex === 0) ?? params[0]
        return `${formatTime(point.value[0])}<br/>Giá trị mực nước (m): <b>${formatLevel(point.value[1])}</b>`
      },
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        hideOverlap: true,
        formatter: (ms) => {
          const d = new Date(ms)
          return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}\n${pad(d.getHours())}:${pad(d.getMinutes())}`
        },
      },
    },
    yAxis: {
      type: 'value',
      name: 'Mực nước (m)',
      nameTextStyle: { align: 'left' },
      splitLine: { lineStyle: { color: '#e5e7eb' } },
    },
    dataZoom: [
      { type: 'inside', startValue: from, endValue: to },
      { type: 'slider', startValue: from, endValue: to, height: 22, bottom: 16, labelFormatter: (ms) => formatTime(ms) },
    ],
    series: [
      {
        name: 'Mực nước',
        type: 'line',
        showSymbol: false,
        lineStyle: { color: COLOR, width: 2, type: 'dotted' },
        itemStyle: { color: COLOR },
        data: times.map((t, i) => [t, wl[i]]),
      },
      {
        name: 'MN > Zđáy và độ mặn < 1‰',
        type: 'line',
        showSymbol: false,
        connectNulls: false,
        lineStyle: { color: COLOR, width: 2.5 },
        itemStyle: { color: COLOR },
        tooltip: { show: false },
        data: times.map((t, i) => [t, ok[i] === '1' ? wl[i] : null]),
      },
    ],
  }
}

// Mỗi lần mở cửa sổ là một lần mount mới (Modal destroyOnHidden) nên không cần đặt lại trạng thái "loading"
export default function WaterLevelChart({ scenarioKey, stationId, period }) {
  const containerRef = useRef(null)
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    let active = true
    loadWaterLevel(scenarioKey)
      .then((data) => {
        if (!active) return
        if (!data.stations[stationId]) throw new Error('Chưa có dữ liệu mực nước cho vị trí này')
        setState({ status: 'ready', data })
      })
      .catch((error) => active && setState({ status: 'error', message: error.message }))
    return () => {
      active = false
    }
  }, [scenarioKey, stationId])

  useEffect(() => {
    if (state.status !== 'ready') return undefined
    const chart = echarts.init(containerRef.current)
    chart.setOption(buildOption(state.data, stationId, period))
    const observer = new ResizeObserver(() => chart.resize())
    observer.observe(containerRef.current)
    return () => {
      observer.disconnect()
      chart.dispose()
    }
  }, [state, stationId, period])

  return (
    <div className="water-chart">
      {state.status === 'loading' && <Spin className="water-chart__status" />}
      {state.status === 'error' && <Alert className="water-chart__status" type="error" showIcon title={state.message} />}
      <div ref={containerRef} className="water-chart__canvas" />
    </div>
  )
}
