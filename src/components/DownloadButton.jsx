import React, { useState } from 'react';
import { exportPoster } from '../utils/exportImage';

export default function DownloadButton({ elementId }) {
  const [exporting, setExporting] = useState(false);

  const handleDownload = async () => {
    setExporting(true);
    await exportPoster(elementId);
    setExporting(false);
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={exporting}
      className="w-full py-4 mt-2 bg-[#fbbc05] hover:bg-[#e0a800] text-black rounded-xl font-bold text-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-wait"
    >
      {exporting ? 'Generating Poster...' : 'Download Poster (PNG)'}
    </button>
  );
}
