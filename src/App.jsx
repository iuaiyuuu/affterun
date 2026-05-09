import React, { useState, useEffect } from 'react'
import PosterCanvas from './components/PosterCanvas'
import RetroPosterCanvas from './components/RetroPosterCanvas'
import PatiencePosterCanvas from './components/PatiencePosterCanvas'
import ControlPanel from './components/ControlPanel'
import { aftersunPreset } from './presets/aftersun'
import { retroPreset } from './presets/retro'
import { patiencePreset } from './presets/patience'
import { exchangeToken, getLatestActivity } from './utils/stravaApi'

function App() {
  const [posterData, setPosterData] = useState(aftersunPreset);
  const [selectedStyle, setSelectedStyle] = useState('aftersun');
  const [isSyncing, setIsSyncing] = useState(false);
  const [authError, setAuthError] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('strava_access_token'));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    if (error) {
      setAuthError('Otentikasi ditolak oleh pengguna.');
      window.history.replaceState({}, document.title, "/");
      return;
    }

    if (code) {
      window.history.replaceState({}, document.title, "/");
      
      const fetchStravaData = async () => {
        setIsSyncing(true);
        setAuthError('');
        try {
          const tokenData = await exchangeToken(code);
          if (tokenData && tokenData.access_token) {
            setAccessToken(tokenData.access_token);
            localStorage.setItem('strava_access_token', tokenData.access_token);
            
            const activityResult = await getLatestActivity(tokenData.access_token);
            if (activityResult.success) {
              setPosterData(prev => ({
                ...prev,
                ...activityResult.data
              }));
            } else {
              setAuthError('Gagal mengambil aktivitas terakhir dari Strava.');
            }
          } else {
            setAuthError('Gagal menukar token dengan Strava. Cek .env.local kamu.');
          }
        } catch (error) {
          setAuthError('Terjadi kesalahan sinkronisasi.');
        }
        setIsSyncing(false);
      };
      
      fetchStravaData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('strava_access_token');
    setAccessToken(null);
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
    if (style === 'aftersun') {
      setPosterData(prev => ({
        ...prev,
        title: "after sun.",
        footerTitle: "Affterun",
        footerSubtitle: "Poster 001",
        description: "No records were broken today. Just a few kilometers spent breathing slowly, clearing small thoughts, and letting the body move without pressure."
      }));
    } else if (style === 'retro') {
      setPosterData(prev => ({
        ...prev,
        title: "RETRO",
        footerTitle: "Affterun",
        footerSubtitle: "Poster 002",
        description: "Some days only make sense after moving for a while."
      }));
    } else if (style === 'patience') {
      setPosterData(prev => ({
        ...prev,
        title: "Patience",
        footerTitle: "Affterun",
        footerSubtitle: "Poster 003",
        description: "Patience is continuing to move forward without needing every run to feel perfect. There are days when the pace feels slower, yet the mind feels lighter with every kilometer."
      }));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen p-4 lg:p-12 gap-8 lg:gap-16 max-w-6xl mx-auto">
      <div className="w-full lg:w-[450px] shrink-0">
        <ControlPanel 
          posterData={posterData} 
          setPosterData={setPosterData} 
          isSyncing={isSyncing}
          setIsSyncing={setIsSyncing}
          authError={authError}
          setAuthError={setAuthError}
          accessToken={accessToken}
          handleLogout={handleLogout}
          selectedStyle={selectedStyle}
          onStyleChange={handleStyleChange}
        />
      </div>

      <div className="w-full flex justify-center lg:sticky top-12 pb-20">
        <div className="relative flex flex-col items-center">
          <p className="text-white text-sm font-semibold mb-4 opacity-70 tracking-widest uppercase">Poster Preview</p>
          <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-[#555] bg-white">
            {selectedStyle === 'aftersun' ? (
              <PosterCanvas data={posterData} />
            ) : selectedStyle === 'retro' ? (
              <RetroPosterCanvas data={posterData} />
            ) : (
              <PatiencePosterCanvas data={posterData} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

