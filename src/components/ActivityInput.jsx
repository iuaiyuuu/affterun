import React, { useState } from 'react';
import { STRAVA_AUTH_URL, getActivityById } from '../utils/stravaApi';

export default function ActivityInput({ setPosterData, isSyncing, setIsSyncing, authError, setAuthError, accessToken, handleLogout }) {
  const [url, setUrl] = useState('');

  const handleConnect = (e) => {
    if (!import.meta.env.VITE_STRAVA_CLIENT_ID || import.meta.env.VITE_STRAVA_CLIENT_ID === 'YOUR_CLIENT_ID_HERE') {
      e.preventDefault();
      alert("Oops! Kamu belum memasukkan Client ID di file .env.local");
    }
  };

  const handleSyncLink = async () => {
    if (!url) return;
    
    if (!accessToken) {
      setAuthError("Silakan hubungkan akun Strava terlebih dahulu.");
      return;
    }

    // Extract activity ID from URL
    const match = url.match(/activities\/(\d+)/);
    if (!match) {
      setAuthError("Link tidak valid. Pastikan formatnya: https://www.strava.com/activities/ID");
      return;
    }
    const activityId = match[1];

    setIsSyncing(true);
    setAuthError('');
    
    const result = await getActivityById(accessToken, activityId);
    
    if (result.success) {
      setPosterData(prev => ({
        ...prev,
        ...result.data
      }));
    } else {
      setAuthError('Gagal mengambil data. Pastikan link valid dan milik akun Strava-mu.');
    }
    
    setIsSyncing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSyncLink();
    }
  };

  return (
    <div className="bg-[#242221] border border-[#3d3836] rounded-xl p-6 film-grain flex flex-col gap-4 shadow-[0_15px_35px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between items-center">
        <label className="font-label-sm text-label-sm text-[#d58c71] uppercase tracking-[0.15em] flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#e09b82]">link</span> Activity Source
        </label>
        {accessToken && (
          <button 
            onClick={handleLogout} 
            className="font-label-sm text-[10px] text-[#e09b82] uppercase tracking-widest hover:text-tertiary transition-colors"
          >
            Disconnect
          </button>
        )}
      </div>

      {!accessToken ? (
        <>
          <a 
            href={STRAVA_AUTH_URL}
            onClick={handleConnect}
            className="strava-uiverse-button"
            data-text={isSyncing ? 'Connecting...' : 'Sign in with Strava'}
            data-hover="Let's Connect ⚡"
          >
          </a>

          <div className="flex items-center gap-4 py-1">
            <div className="h-px flex-1 bg-[#3d3836]/60"></div>
            <span className="font-label-sm text-[10px] text-on-surface-variant/40 uppercase tracking-[0.2em]">OR</span>
            <div className="h-px flex-1 bg-[#3d3836]/60"></div>
          </div>

          <div className="relative w-full group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-tertiary transition-colors" data-icon="link">link</span>
            <input 
              type="text"
              placeholder="Paste Strava URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-[#171514] border border-[#3d3836] focus:border-tertiary-fixed/50 text-on-surface font-body-md text-body-md py-3 pl-12 pr-4 outline-none transition-all rounded-lg placeholder:text-on-surface-variant/40 cursor-not-allowed opacity-60"
              disabled
              title="Hubungkan Strava terlebih dahulu"
            />
          </div>
          <p className="text-[11px] text-on-surface-variant/70 italic text-center">Hubungkan dengan Strava untuk mengaktifkan sinkronisasi URL aktivitas.</p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 py-1 text-green-400">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span className="font-label-sm text-[11px] uppercase tracking-widest">Strava Account Connected</span>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-tertiary transition-colors" data-icon="link">link</span>
              <input 
                type="text" 
                placeholder="https://www.strava.com/activities/123456789" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#171514] border border-[#3d3836] focus:border-tertiary-fixed/50 text-on-surface font-body-md text-body-md py-3 pl-12 pr-4 outline-none transition-all rounded-lg placeholder:text-on-surface-variant/40"
              />
            </div>
            <button 
              onClick={handleSyncLink}
              disabled={isSyncing || !url}
              className="strava-uiverse-button-small"
              data-text={isSyncing ? 'Syncing...' : 'Sync'}
              data-hover="Go! ⚡"
            ></button>
          </div>
        </>
      )}

      {authError && (
        <div className="text-red-400 text-xs font-semibold mt-1 p-2 bg-error-container/20 rounded border border-error/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">error</span>
          <span>{authError}</span>
        </div>
      )}
    </div>
  );
}
