import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import '../styles/aftersun.css'

export default function PosterCanvas({ data }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  return (
    <div id="poster-export-node" className="poster" data-name="after_sun_design">
        {/* Left photo panel */}
        <div className="frame-image" data-name="FRAME_IMAGE">
            <div className="image-bg" data-name="image_bg" style={{ position: 'relative' }}>
                <Cropper
                  image={data.photoUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={955 / 1350}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  showGrid={false}
                  style={{
                    containerStyle: { width: '100%', height: '100%', position: 'absolute' },
                    cropAreaStyle: { border: 'none', boxShadow: 'none' }
                  }}
                  crossOrigin="anonymous"
                />
            </div>
        </div>

        {/* Right matte panel (#f2f0f1) */}
        <div className="right-panel"></div>

        {/* "after sun." heading */}
        <p className="title">{data.title}</p>

        {/* Time · Date · Athlete name */}
        <div className="frame1">
            <p className="frame1-time">{data.time}</p>
            <p className="frame1-date">{data.date}</p>
            <p className="frame1-name">{data.athleteName}</p>
        </div>

        {/* Distance / Duration */}
        <div className="frame-stats">
            <p>{data.distance}</p>
            <p>/</p>
            <p>{data.duration}</p>
        </div>

        {/* Run description */}
        <p className="description">
            {data.description}
        </p>

        {/* Footer label */}
        <div className="footer">
            <p>{data.footerTitle}</p>
            <p>{data.footerSubtitle}</p>
        </div>

        {/* Noise texture overlay */}
        <div className="noise-bg" data-name="noise_bg">
            <img alt="noise" src={data.noiseUrl} crossOrigin="anonymous" />
        </div>
    </div>
  )
}
