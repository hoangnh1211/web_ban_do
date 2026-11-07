import { lazy, Suspense } from 'react'
import { Modal, Spin } from 'antd'
import { importWaterLevelChart, WATER_LEVEL_ICON } from './waterLevelLoader'

const WaterLevelChart = lazy(importWaterLevelChart)

// Cửa sổ "Diễn biến mực nước" của một vị trí theo kịch bản + giai đoạn đang bật
export default function WaterLevelModal({ open, onClose, station, scenario }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="min(1100px, 94vw)"
      centered
      destroyOnHidden
      title={
        <div className="water-modal__title">
          <img src={WATER_LEVEL_ICON} alt="" />
          <div>
            <div>Diễn biến mực nước – {station.name}</div>
            <div className="water-modal__sub">
              {scenario.code} · {scenario.title} · {scenario.periodLabel}
            </div>
          </div>
        </div>
      }
    >
      <Suspense fallback={<Spin className="water-chart__status" />}>
        <WaterLevelChart scenarioKey={scenario.scenario} stationId={station.id} period={scenario.period} />
      </Suspense>
    </Modal>
  )
}
