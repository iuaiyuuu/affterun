import React from 'react';
import ActivityInput from './ActivityInput';
import UploadPhoto from './UploadPhoto';
import StyleSelector from './StyleSelector';
import DownloadButton from './DownloadButton';

export default function ControlPanel({ posterData, setPosterData, isSyncing, setIsSyncing, authError, setAuthError, accessToken, handleLogout, selectedStyle, onStyleChange }) {
  return (
    <div className="w-full max-w-md flex flex-col gap-5">
      <div className="mb-2 flex items-center gap-3">
        <img src="/assets/affterun_icon.png" alt="Affterun Logo" className="w-12 h-12 object-contain" />
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Affterun.</h1>
          <p className="text-gray-300 text-sm mt-1">Turning runs into indie posters.</p>
        </div>
      </div>
      
      <ActivityInput 
        setPosterData={setPosterData} 
        isSyncing={isSyncing} 
        setIsSyncing={setIsSyncing}
        authError={authError} 
        setAuthError={setAuthError}
        accessToken={accessToken}
        handleLogout={handleLogout}
      />
      <UploadPhoto setPosterData={setPosterData} />
      <StyleSelector selectedStyle={selectedStyle} onStyleChange={onStyleChange} />
      
      <DownloadButton elementId="poster-export-node" />
    </div>
  );
}
