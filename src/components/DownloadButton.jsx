import React, { useState } from 'react';
import { exportPoster } from '../utils/exportImage';

export default function DownloadButton({ elementId, className, children }) {
  const [exporting, setExporting] = useState(false);

  const handleDownload = async () => {
    setExporting(true);
    await exportPoster(elementId);
    setExporting(false);
  };

  const defaultStyles = "w-full h-12 bg-gradient-to-r from-[#e09b82] to-[#ffb59d] text-[#141313] font-semibold hover:brightness-110 hover:shadow-[0_4px_20px_rgba(255,181,157,0.25)] font-label-sm text-label-sm uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait";

  return (
    <button 
      onClick={handleDownload}
      disabled={exporting}
      className={className || defaultStyles}
    >
      {exporting ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
          <span>Generating...</span>
        </>
      ) : (
        children || (
          <>
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Poster</span>
          </>
        )
      )}
    </button>
  );
}
