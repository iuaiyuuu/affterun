import React from 'react';
import ActivityInput from './ActivityInput';
import UploadPhoto from './UploadPhoto';
import StyleSelector from './StyleSelector';
import DownloadButton from './DownloadButton';

export default function ControlPanel({ posterData, setPosterData, isSyncing, setIsSyncing, authError, setAuthError, accessToken, handleLogout, selectedStyle, onStyleChange }) {
  return (
    <div className="w-full flex flex-col gap-6">
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
      
      {/* Sticky Bottom Export button for Desktop Sidebar */}
      <div className="hidden md:block pt-2 border-t border-[#3d3836] mt-2">
        <DownloadButton elementId="poster-export-node" />
      </div>
    </div>
  );
}
