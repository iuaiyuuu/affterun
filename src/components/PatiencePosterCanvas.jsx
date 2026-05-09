import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import '../styles/patience.css'

// Parse date string (YYYY/MM/DD or ISO) → { day, month, year }
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

function parseDateParts(dateStr) {
  if (!dateStr) return { day: '--', month: '---', year: '----' }
  // Support "YYYY/MM/DD" and ISO-like strings
  const clean = dateStr.replace(/-/g, '/')
  const parts = clean.split('/')
  if (parts.length >= 3) {
    const day = String(parseInt(parts[2], 10)).padStart(2, '0')
    const monthIdx = parseInt(parts[1], 10) - 1
    const month = MONTHS[monthIdx] ?? '---'
    const year = parts[0]
    return { day, month, year }
  }
  return { day: '--', month: '---', year: '----' }
}

// Format duration for stats: strip seconds, uppercase
function formatDuration(dur) {
  if (!dur) return ''
  return dur.replace(/\s*\d+s\b/gi, '').trim().toUpperCase()
}

export default function PatiencePosterCanvas({ data, style }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const { day, month, year } = parseDateParts(data.date)

  const isExternal = data.photoUrl && (data.photoUrl.startsWith('http://') || data.photoUrl.startsWith('https://'));
  const crossOriginProp = isExternal ? 'anonymous' : undefined;

  return (
    <div id="poster-export-node" className="poster patience-design" data-name="patience_design" style={style}>

      {/* Background photo — uses the oversized container from HTML template */}
      <div className="bg" data-name="BG">
        <Cropper
          image={data.photoUrl}
          crop={crop}
          zoom={zoom}
          aspect={759 / 1350}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          showGrid={false}
          style={{
            containerStyle: { width: '100%', height: '100%', position: 'absolute' },
            cropAreaStyle: { border: 'none', boxShadow: 'none' }
          }}
          crossOrigin={crossOriginProp}
          objectFit="cover"
        />
      </div>

      {/* Light wash filter overlay */}
      <div className="filter" />

      {/* Title */}
      <p className="p-title">{data.title}</p>

      {/* Shot on */}
      <div className="shot-on">
        <p className="shot-label">Shot on</p>
        <p className="shot-name">{data.athleteName}</p>
      </div>

      {/* Opening quote mark */}
      <p className="p-quote">&rdquo;</p>

      {/* Body paragraph / description */}
      <p className="body-text">{data.description}</p>

      {/* Divider line */}
      <div className="p-divider">
        <svg fill="none" preserveAspectRatio="none" viewBox="0 0 274 3">
          <line stroke="#113E5B" strokeWidth="3" x2="274" y1="1.5" y2="1.5" />
        </svg>
      </div>

      {/* Date: DD MMM YYYY — no rotation, DD same font as YYYY */}
      <div className="date-frame">
        <div className="date-num-wrapper">
          <span className="date-num">{day}</span>
        </div>
        <span className="date-month">{month}</span>
        <span className="date-year">{year}</span>
      </div>

      {/* Stats: distance / duration / time */}
      <div className="p-stats">
        <p>{data.distance?.toUpperCase()}</p>
        <p>{formatDuration(data.duration)}</p>
        <p>{data.time}</p>
      </div>

      {/* Affterun / Poster 003 label */}
      <div className="poster-label">
        <p>{data.footerTitle}</p>
        <p>{data.footerSubtitle}</p>
      </div>
    </div>
  )
}
