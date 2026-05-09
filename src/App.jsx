import React, { useState, useEffect, useRef } from 'react'
import PosterCanvas from './components/PosterCanvas'
import RetroPosterCanvas from './components/RetroPosterCanvas'
import PatiencePosterCanvas from './components/PatiencePosterCanvas'
import ActivityInput from './components/ActivityInput'
import UploadPhoto from './components/UploadPhoto'
import StyleSelector from './components/StyleSelector'
import DownloadButton from './components/DownloadButton'
import { aftersunPreset } from './presets/aftersun'
import { retroPreset } from './presets/retro'
import { patiencePreset } from './presets/patience'
import { exchangeToken, getLatestActivity } from './utils/stravaApi'

const STYLE_DIMENSIONS = {
  aftersun: { width: 1080, height: 1350 },
  retro: { width: 911, height: 1350 },
  patience: { width: 759, height: 1350 }
};

function App() {
  const [posterData, setPosterData] = useState(aftersunPreset);
  const [selectedStyle, setSelectedStyle] = useState('aftersun');
  const [isSyncing, setIsSyncing] = useState(false);
  const [authError, setAuthError] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('strava_access_token'));
  const [scale, setScale] = useState(0.4);
  const [showTerms, setShowTerms] = useState(false);

  const desktopCanvasParentRef = useRef(null);
  const mobileCanvasParentRef = useRef(null);

  // Auto-scaling logic
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const activeRef = isMobile ? mobileCanvasParentRef.current : desktopCanvasParentRef.current;
      if (!activeRef) return;
      
      const containerWidth = activeRef.clientWidth;
      const containerHeight = activeRef.clientHeight || (isMobile ? containerWidth * 1.5 : 550);
      
      const { width: targetWidth, height: targetHeight } = STYLE_DIMENSIONS[selectedStyle] || { width: 1080, height: 1350 };
      
      let newScale;
      if (isMobile) {
        // On mobile, fit inside the fixed aspect-[3/4.5] container (keeping elegant margins instead of shifting height)
        const scaleX = containerWidth / targetWidth;
        const scaleY = (containerWidth * 1.5) / targetHeight;
        newScale = Math.min(scaleX, scaleY);
      } else {
        // On desktop, fit both width and height inside the staging box with margin
        const scaleX = (containerWidth * 0.85) / targetWidth;
        const scaleY = (containerHeight * 0.85) / targetHeight;
        newScale = Math.min(scaleX, scaleY);
      }
      
      // Clamp scale to reasonable limits
      setScale(Math.max(0.15, Math.min(newScale, 1.2)));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Quick timeout to handle post-render layouts and fonts
    const timer = setTimeout(handleResize, 150);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [selectedStyle]);

  // Handle Strava connection redirect
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

  const currentDimensions = STYLE_DIMENSIONS[selectedStyle] || { width: 1080, height: 1350 };

  // Common Canvas rendering block
  const renderCanvasComponent = () => {
    const props = {
      data: posterData,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'absolute',
        left: 0,
        top: 0,
        width: `${currentDimensions.width}px`,
        height: `${currentDimensions.height}px`,
        margin: 0,
        marginBottom: 0,
        boxShadow: 'none'
      }
    };

    if (selectedStyle === 'aftersun') {
      return <PosterCanvas {...props} />;
    } else if (selectedStyle === 'retro') {
      return <RetroPosterCanvas {...props} />;
    } else {
      return <PatiencePosterCanvas {...props} />;
    }
  };

  return (
    <div className="bg-background text-on-surface h-screen flex flex-col md:flex-row antialiased overflow-hidden">
      
      {/* 1. Desktop & Tablet Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col w-[38%] max-w-[420px] h-full border-r border-outline-variant/15 bg-surface-container-low overflow-y-auto custom-scrollbar relative z-10 p-8">
        
        {/* Brand / Header */}
        <div className="mb-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img alt="Affterun Logo" className="w-8 h-8 rounded-sm object-contain" src="/assets/affterun_icon.png" />
            <h1 className="font-montserrat font-extrabold text-[22px] text-on-surface tracking-[0.15em] uppercase">AFFTERUN</h1>
          </div>
          <button className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-tertiary-fixed transition-colors duration-300">
            abiyyu rahman
          </button>
        </div>

        {/* Control modules */}
        <div className="flex-1 flex flex-col gap-6">
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
          
          <StyleSelector selectedStyle={selectedStyle} onStyleChange={handleStyleChange} />
          
          <div className="hidden md:block pt-2 border-t border-[#3d3836] mt-2">
            <DownloadButton elementId="poster-export-node" />
          </div>
        </div>

        {/* Desktop Sidebar Footer */}
        <footer className="mt-8 pt-6 border-t border-[#3d3836]/40 flex flex-col gap-2">
          <div className="flex justify-between items-center text-[10px] text-on-surface-variant/30 font-label-sm tracking-widest uppercase">
            <span>© {new Date().getFullYear()} Affterun</span>
            <button 
              onClick={() => setShowTerms(true)}
              className="hover:text-tertiary-fixed transition-colors text-left uppercase text-[#e09b82]/80 hover:text-[#ffb59d]"
            >
              Terms & Privacy
            </button>
          </div>
        </footer>
      </aside>

      {/* 2. Desktop & Tablet Canvas View (Hidden on Mobile, occupies right column) */}
      <main className="hidden md:flex flex-1 bg-surface-container-lowest relative flex-col items-center justify-center p-12 h-full overflow-hidden">
        
        {/* Active Style Indicator (Floating Top Left) */}
        <div className="absolute top-8 left-8 flex items-center gap-3 z-20">
          <span className="font-label-sm text-[10px] text-[#e09b82] uppercase tracking-[0.2em] bg-[#242221] px-4 py-2 rounded-full border border-[#3d3836] shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb59d] animate-pulse"></span>
            {selectedStyle === 'aftersun' ? 'After Sun' : selectedStyle === 'retro' ? 'Retro Sonet' : 'Patience'}
          </span>
        </div>

        {/* Canvas Toolbar (Floating Top Right) */}
        <div className="absolute top-8 right-8 flex items-center gap-4 z-20">
          <button 
            onClick={() => setScale(prev => Math.min(prev + 0.05, 1.2))}
            className="p-2 text-on-surface-variant hover:text-tertiary-fixed transition-colors bg-surface-container/50 backdrop-blur rounded-full border border-outline-variant/20 hover:border-tertiary-fixed/30" 
            title="Zoom In"
          >
            <span className="material-symbols-outlined block text-[20px]">zoom_in</span>
          </button>
          <button 
            onClick={() => setScale(prev => Math.max(prev - 0.05, 0.1))}
            className="p-2 text-on-surface-variant hover:text-tertiary-fixed transition-colors bg-surface-container/50 backdrop-blur rounded-full border border-outline-variant/20 hover:border-tertiary-fixed/30" 
            title="Zoom Out"
          >
            <span className="material-symbols-outlined block text-[20px]">zoom_out</span>
          </button>
        </div>

        {/* Centered scaled poster node */}
        <div 
          ref={desktopCanvasParentRef}
          className="w-full flex-1 flex items-center justify-center relative overflow-hidden"
        >
          <div 
            className="shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-outline-variant/15 rounded-lg overflow-hidden bg-surface relative transition-all duration-300 ease-out"
            style={{
              width: `${currentDimensions.width * scale}px`,
              height: `${currentDimensions.height * scale}px`
            }}
          >
            {renderCanvasComponent()}
          </div>
        </div>
      </main>

      {/* 3. Mobile View (Hidden on Tablet/Desktop, stacked scrolling layout) */}
      <div className="md:hidden flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar bg-background pb-32">
        
        {/* Mobile Header */}
        <header className="bg-background/80 backdrop-blur-md z-40 relative border-b border-[#242221]">
          <div className="flex justify-between items-center w-full px-6 py-4">
            <div className="flex items-center gap-3">
              <img alt="Affterun Logo" className="h-7 w-auto object-contain rounded" src="/assets/affterun_icon.png" />
              <h1 className="font-montserrat font-extrabold text-lg text-on-surface tracking-[0.15em] uppercase">AFFTERUN</h1>
            </div>
            <button className="font-label-sm text-[10px] uppercase tracking-widest text-[#e09b82] hover:text-tertiary-fixed transition-colors duration-300">
              abiyyu rahman
            </button>
          </div>
        </header>

        {/* Mobile Main Body */}
        <main className="px-6 flex flex-col gap-8 pt-4">
          
          {/* Mobile Preview Frame */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center px-1">
              <span className="font-label-sm text-[10px] text-[#d58c71] uppercase tracking-[0.15em]">Poster Preview</span>
              <span className="font-label-sm text-[9px] text-[#ffb59d] uppercase tracking-widest bg-tertiary-container/30 px-2 py-0.5 rounded border border-[#ffb59d]/20">
                {selectedStyle === 'aftersun' ? 'After Sun' : selectedStyle === 'retro' ? 'Retro Sonet' : 'Patience'}
              </span>
            </div>
            
            {/* Aspect container acting as the sizing master with a constant fixed aspect ratio */}
            <section 
              ref={mobileCanvasParentRef}
              className="w-full relative rounded-xl overflow-hidden border border-[#3d3836] shadow-[0_15px_35px_rgba(0,0,0,0.35)] bg-[#131110] flex items-center justify-center"
              style={{
                aspectRatio: '3 / 4.5'
              }}
            >
              <div 
                className="relative overflow-hidden"
                style={{
                  width: `${currentDimensions.width * scale}px`,
                  height: `${currentDimensions.height * scale}px`
                }}
              >
                {renderCanvasComponent()}
              </div>
            </section>
          </div>

          {/* Controls Panel (inputs stack) */}
          <section className="flex flex-col gap-6">
            <StyleSelector selectedStyle={selectedStyle} onStyleChange={handleStyleChange} />
            
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
          </section>
        </main>

        {/* Mobile Footer */}
        <footer className="px-6 py-8 border-t border-[#242221] mt-8 flex flex-col items-center gap-2">
          <p className="font-label-sm text-[9px] text-on-surface-variant/30 uppercase tracking-[0.2em] text-center">
            © {new Date().getFullYear()} Affterun · All Rights Reserved
          </p>
          <button 
            onClick={() => setShowTerms(true)}
            className="font-label-sm text-[9px] text-[#e09b82] uppercase tracking-[0.15em] hover:text-tertiary-fixed transition-colors"
          >
            Terms & Privacy Conditions
          </button>
        </footer>

        {/* Mobile Sticky Bottom Action Bar */}
        <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#1a1817]/95 backdrop-blur-lg border-t border-[#3d3836] shadow-[0_-10px_30px_rgba(0,0,0,0.35)] flex justify-between items-center px-8 py-4">
          <div className="flex flex-col">
            <span className="font-label-sm text-[9px] text-[#e09b82] uppercase tracking-[0.15em]">Style preset</span>
            <span className="font-body-md text-sm text-[#ffb59d] font-semibold capitalize">{selectedStyle}</span>
          </div>
          
          <DownloadButton 
            elementId="poster-export-node"
            className="bg-gradient-to-r from-[#e09b82] to-[#ffb59d] text-[#141313] font-semibold hover:brightness-110 active:scale-95 transition-all duration-300 h-11 px-8 rounded-full font-label-sm text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-[0_4px_20px_rgba(255,181,157,0.25)]"
          >
            <span className="material-symbols-outlined text-[18px]">download</span> 
            <span>Download</span>
          </DownloadButton>
        </nav>
      </div>

      {/* Terms & Privacy Modal Overlay */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/85 backdrop-blur-md">
          <div className="bg-[#1c1b1b] border border-[#3d3836]/50 rounded-2xl w-full max-w-[500px] max-h-[80vh] flex flex-col shadow-[0_30px_70px_rgba(0,0,0,0.65)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#242221] flex justify-between items-center bg-[#242221]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#e09b82] text-[20px]">security</span>
                <h3 className="font-montserrat font-bold text-sm text-[#e5e2e1] uppercase tracking-wider">Terms & Privacy Policy</h3>
              </div>
              <button 
                onClick={() => setShowTerms(false)}
                className="p-1.5 rounded-full hover:bg-[#343130] text-on-surface-variant hover:text-on-surface transition-colors"
                title="Close"
              >
                <span className="material-symbols-outlined block text-[18px]">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6 font-body-md text-[13px] text-on-surface-variant/80 leading-relaxed bg-[#141313]">
              
              <div className="flex flex-col gap-1.5">
                <h4 className="font-montserrat font-bold text-[#ffb59d] text-[10px] uppercase tracking-widest">1. Model Pemrosesan Data (100% Client-Side)</h4>
                <p>Seluruh proses pembuatan poster di Affterun dilakukan secara lokal di dalam browser Anda. Ketika Anda mengunggah atau memotong gambar latar belakang, gambar tersebut disimpan sementara di dalam memori React browser Anda. <strong>Gambar tidak pernah diunggah ke server kami, database, atau pihak ketiga mana pun.</strong></p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h4 className="font-montserrat font-bold text-[#ffb59d] text-[10px] uppercase tracking-widest">2. Kredensial & Integrasi Strava API</h4>
                <p>Untuk menampilkan data aktivitas olahraga Anda, kunci otentikasi (<em>Access Token</em>) disimpan secara lokal dan aman di dalam fitur browser Anda sendiri (<strong>localStorage</strong>). Aplikasi mengirimkan permintaan data aktivitas langsung dari browser Anda ke endpoint Strava API secara aman tanpa perantara database luar.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h4 className="font-montserrat font-bold text-[#ffb59d] text-[10px] uppercase tracking-widest">3. Bebas Pelacakan & Kuki (No Tracking)</h4>
                <p>Kami sangat menghormati ruang pribadi Anda. Kami tidak menggunakan kuki pelacak iklan, piksel pemasaran, atau perangkat analitik perilaku pengguna yang mengganggu. Kunjungan Anda bersifat anonim sepenuhnya.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h4 className="font-montserrat font-bold text-[#ffb59d] text-[10px] uppercase tracking-widest">4. Kepemilikan Hak Cipta Poster</h4>
                <p>Anda memiliki hak kepemilikan penuh 100% atas karya seni poster yang Anda hasilkan. Anda bebas membagikannya di Instagram, Strava, atau mencetaknya secara komersial/fisik tanpa batasan dari pihak Affterun.</p>
              </div>

              <div className="h-px bg-[#3d3836]/40 my-2"></div>

              <p className="text-[10px] text-on-surface-variant/50 italic text-center">Dibuat dengan dedikasi penuh terhadap hak privasi pengguna oleh Abiyyu Rahman.</p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#242221] border-t border-[#242221] flex justify-end">
              <button 
                onClick={() => setShowTerms(false)}
                className="px-5 py-2 bg-gradient-to-r from-[#e09b82] to-[#ffb59d] text-[#141313] font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all text-[10px] uppercase tracking-wider font-montserrat"
              >
                Saya Mengerti
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default App

