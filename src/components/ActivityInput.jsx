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

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg text-gray-800">1. Strava Activity</h2>
        {accessToken && (
          <button onClick={handleLogout} className="text-xs text-red-500 font-semibold hover:underline">
            Disconnect
          </button>
        )}
      </div>
      
      {!accessToken ? (
        <>
          <p className="text-sm text-gray-500">Hubungkan dengan Strava untuk mengizinkan aplikasi membaca aktivitasmu.</p>
          <a 
            href={STRAVA_AUTH_URL}
            onClick={handleConnect}
            className={`w-full py-3 rounded-lg font-bold text-white text-center transition-colors shadow-sm flex items-center justify-center gap-2 ${isSyncing ? 'bg-gray-400 cursor-wait pointer-events-none' : 'bg-[#fc4c02] hover:bg-[#e34402]'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>
            {isSyncing ? 'Loading...' : 'Connect with Strava'}
          </a>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-500 font-medium text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            Strava Connected
          </p>
          <p className="text-xs text-gray-500 mt-1">Paste link aktivitas spesifik dari akunmu:</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="https://www.strava.com/activities/123456789" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#fc4c02]"
            />
            <button 
              onClick={handleSyncLink}
              disabled={isSyncing}
              className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold disabled:opacity-50"
            >
              {isSyncing ? 'Syncing...' : 'Sync'}
            </button>
          </div>
        </>
      )}

      {authError && <p className="text-red-500 text-xs font-semibold">{authError}</p>}
    </div>
  );
}
