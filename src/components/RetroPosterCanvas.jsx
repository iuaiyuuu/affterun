import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import '../styles/retro.css'

// Helper to format duration without seconds for Retro design
const formatDurationWithoutSeconds = (durationStr) => {
  if (!durationStr) return ''
  const cleaned = durationStr.replace(/\s*\d+\s*s\b/gi, '').trim()
  return cleaned || '0m'
}

export default function RetroPosterCanvas({ data }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  // Handle crop changes to apply to both croppers simultaneously
  const onCropChange = (newCrop) => {
    setCrop(newCrop)
  }

  const onZoomChange = (newZoom) => {
    setZoom(newZoom)
  }

  return (
    <div id="poster-export-node" className="poster retro-design" data-name="retro_design">
        {/* Single background photo spanning the entire height */}
        <div className="bg-photo" data-name="BG">
            <Cropper
              image={data.photoUrl}
              crop={crop}
              zoom={zoom}
              aspect={880 / 1165}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              showGrid={false}
              style={{
                containerStyle: { width: '100%', height: '100%', position: 'absolute' },
                cropAreaStyle: { border: 'none', boxShadow: 'none' }
              }}
              crossOrigin="anonymous"
            />
        </div>

        {/* SVG Cutout Overlay: solid background with transparent cutouts for RETRO and the bottom photo */}
        <svg className="svg-overlay" width="911" height="1165" viewBox="0 0 911 1165" style={{ position: 'absolute', left: '0', top: '170px', pointerEvents: 'none' }} aria-hidden="true">
            <defs>
                <mask id="retro-overlay-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="911" height="1165">
                    {/* Fill everything with white (making the overlay fully visible/solid) */}
                    <rect width="911" height="1165" fill="#ffffff" />
                    
                    {/* Cut out the RETRO letters (fill with black to make them transparent) */}
                    <g transform="translate(16, 407.208)">
                        <path fill="#000000" d="M27.646 116.398V84.7178H58.4956C63.8745 84.7178 68.6206 83.729
                        72.7339 81.7515C76.8472 79.6948 80.0112 76.8867 82.2261 73.3271
                        C84.52 69.6885 85.667 65.4961 85.667 60.75C85.667 53.3145
                        83.0171 47.4214 77.7173 43.0708C72.4966 38.7202 65.6147 36.5449
                        57.0718 36.5449H27.646V1.89844H63.123C74.5928 1.89844 84.876
                        3.99463 93.9727 8.18701C103.148 12.3003 110.386 18.3516 115.686
                        26.3408C121.065 34.3301 123.754 44.0991 123.754 55.6479
                        C123.754 67.0386 120.946 77.3218 115.33 86.4976C109.793 95.6733
                        101.725 102.951 91.125 108.33C80.6045 113.708 68.0273 116.398
                        53.3936 116.398H27.646ZM0 176.792V1.89844H38.918V176.792H0Z
                        M95.5151 176.792L57.9023 110.821L86.7349 87.8027L139.417
                        176.792H95.5151ZM159.231 176.792V1.89844H261.628V36.5449H198.149
                        V71.5474H250.712V105.126H198.149V142.146H261.628V176.792H159.231Z
                        M315.734 176.792V31.0869H354.533V176.792H315.734ZM273.256
                        36.5449V1.89844H396.892V36.5449H273.256ZM443.878 116.398V84.7178
                        H474.728C480.107 84.7178 484.853 83.729 488.966 81.7515C493.08
                        79.6948 496.244 76.8867 498.458 73.3271C500.752 69.6885 501.899
                        65.4961 501.899 60.75C501.899 53.3145 499.25 47.4214 493.95
                        43.0708C488.729 38.7202 481.847 36.5449 473.304 36.5449H443.878
                        V1.89844H479.355C490.825 1.89844 501.108 3.99463 510.205 8.18701
                        C519.381 12.3003 526.619 18.3516 531.918 26.3408C537.297 34.3301
                        539.987 44.0991 539.987 55.6479C539.987 67.0386 537.179 77.3218
                        531.562 86.4976C526.025 95.6733 517.957 102.951 507.357 108.33
                        C496.837 113.708 484.26 116.398 469.626 116.398H443.878ZM416.232
                        176.792V1.89844H455.15V176.792H416.232ZM511.748 176.792L474.135
                        110.821L502.967 87.8027L555.649 176.792H511.748ZM649.859 178.69
                        C637.282 178.69 625.496 176.436 614.5 171.927C603.584 167.339
                        593.974 160.972 585.668 152.824C577.441 144.677 570.995 135.185
                        566.328 124.348C561.74 113.432 559.446 101.725 559.446 89.2266
                        C559.446 76.6494 561.74 64.9819 566.328 54.2241C570.995 43.3872
                        577.441 33.9346 585.668 25.8662C593.895 17.7187 603.466 11.3906
                        614.382 6.88184C625.377 2.29395 637.163 0 649.74 0C662.476 0
                        674.301 2.29395 685.217 6.88184C696.133 11.3906 705.665 17.7187
                        713.812 25.8662C722.039 33.9346 728.407 43.3872 732.916 54.2241
                        C737.503 65.061 739.797 76.7285 739.797 89.2266C739.797 101.804
                        737.503 113.511 732.916 124.348C728.407 135.185 722.039 144.677
                        713.812 152.824C705.665 160.972 696.133 167.339 685.217 171.927
                        C674.301 176.436 662.515 178.69 649.859 178.69ZM649.503 143.213
                        C656.78 143.213 663.543 141.829 669.792 139.061C676.042 136.292
                        681.5 132.456 686.167 127.551C690.833 122.647 694.472 116.912
                        697.083 110.347C699.693 103.781 700.998 96.7412 700.998 89.2266
                        C700.998 81.5537 699.653 74.4741 696.964 67.9878C694.354 61.4224
                        690.715 55.7271 686.048 50.9019C681.381 45.9976 675.923 42.2007
                        669.674 39.5112C663.425 36.8218 656.701 35.4771 649.503 35.4771
                        C642.384 35.4771 635.7 36.8218 629.451 39.5112C623.281 42.2007
                        617.823 45.9976 613.077 50.9019C608.41 55.7271 604.771 61.4224
                        602.161 67.9878C599.55 74.4741 598.245 81.5537 598.245 89.2266
                        C598.245 96.8203 599.55 103.9 602.161 110.465C604.771 117.031
                        608.41 122.766 613.077 127.67C617.744 132.495 623.162 136.292
                        629.332 139.061C635.581 141.829 642.305 143.213 649.503 143.213Z" />
                    </g>
                    
                    {/* Cut out the bottom photo rectangle (fill with black to make it transparent) */}
                    {/* y="579" gives a 6px upward overlap into the RETRO letter zone (letters end at ~585.9px)   */}
                    {/* This overlap is invisible (both areas are already black/transparent) but prevents any     */}
                    {/* subpixel gap from appearing when the poster is CSS-scaled during browser preview.         */}
                    <rect x="16" y="579" width="880" height="586" fill="#000000" />
                </mask>
            </defs>
            
            {/* The solid overlay rectangle filled with background color, masked by our overlay mask */}
            <rect width="911" height="1165" fill="#e3dfdc" mask="url(#retro-overlay-mask)" />
        </svg>

        {/* ── Stats labels */}
        <p className="stat-label" style={{ left: '16px', top: '513px', width: '119px' }}>Distance -</p>
        <p className="stat-label" style={{ left: '173px', top: '513px', width: '93px' }}>Time -</p>
        <p className="stat-label" style={{ left: '291px', top: '513px', width: '106px' }}>Moving -</p>
        <p className="stat-label" style={{ left: '432px', top: '513px', width: '93px' }}>Date -</p>

        {/* ── Stats values */}
        <p className="stat-value" style={{ left: '16px', top: '545px', width: '155px' }}>{data.distance}</p>
        <p className="stat-value" style={{ left: '173px', top: '545px', width: '155px' }}>{data.time}</p>
        <p className="stat-value" style={{ left: '291px', top: '545px', whiteSpace: 'nowrap' }}>{formatDurationWithoutSeconds(data.duration)}</p>
        <p className="stat-value" style={{ left: '432px', top: '545px' }}>{data.date}</p>

        {/* Corner registration marks */}
        <p className="corner-plus" style={{ left: '0' }}>+</p>
        <p className="corner-plus" style={{ left: '806px' }}>+</p>

        {/* Noise / grain texture overlay */}
        <div className="noise-overlay">
            <img src={data.noiseUrl} alt="noise" crossOrigin="anonymous" />
        </div>

        {/* Quote */}
        <p className="quote-text">{data.description}</p>

        {/* Barcode SVG instead of local png to keep it sharp and self-contained */}
        <div className="barcode">
            <svg width="100%" height="100%" viewBox="0 0 213 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="213" height="74" fill="white"/>
                <rect x="15" y="10" width="4" height="44" fill="black"/>
                <rect x="22" y="10" width="2" height="44" fill="black"/>
                <rect x="28" y="10" width="6" height="44" fill="black"/>
                <rect x="38" y="10" width="2" height="44" fill="black"/>
                <rect x="44" y="10" width="4" height="44" fill="black"/>
                <rect x="52" y="10" width="8" height="44" fill="black"/>
                <rect x="64" y="10" width="2" height="44" fill="black"/>
                <rect x="70" y="10" width="4" height="44" fill="black"/>
                <rect x="78" y="10" width="2" height="44" fill="black"/>
                <rect x="84" y="10" width="6" height="44" fill="black"/>
                <rect x="94" y="10" width="4" height="44" fill="black"/>
                <rect x="102" y="10" width="2" height="44" fill="black"/>
                <rect x="108" y="10" width="8" height="44" fill="black"/>
                <rect x="120" y="10" width="4" height="44" fill="black"/>
                <rect x="128" y="10" width="2" height="44" fill="black"/>
                <rect x="134" y="10" width="6" height="44" fill="black"/>
                <rect x="144" y="10" width="2" height="44" fill="black"/>
                <rect x="150" y="10" width="4" height="44" fill="black"/>
                <rect x="158" y="10" width="8" height="44" fill="black"/>
                <rect x="170" y="10" width="2" height="44" fill="black"/>
                <rect x="176" y="10" width="4" height="44" fill="black"/>
                <rect x="184" y="10" width="6" height="44" fill="black"/>
                <rect x="194" y="10" width="2" height="44" fill="black"/>
                <text x="106.5" y="64" fontFamily="monospace" fontSize="8" fill="black" textAnchor="middle" letterSpacing="1">abiyyu.rahman.vercel.app</text>
            </svg>
        </div>

        {/* Credit label */}
        <div className="credit-text">
            <p>{data.footerTitle}</p>
            <p>{data.footerSubtitle}</p>
        </div>
    </div>
  )
}
