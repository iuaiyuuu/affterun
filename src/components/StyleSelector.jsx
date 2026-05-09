import React from 'react';

const STYLES_CONFIG = [
  { id: 'aftersun', num: '1' },
  { id: 'retro', num: '2' },
  { id: 'patience', num: '3' }
];

export default function StyleSelector({ selectedStyle, onStyleChange }) {
  return (
    <div className="bg-[#242221] border border-[#3d3836] rounded-xl p-6 film-grain flex flex-col gap-4 shadow-[0_15px_35px_rgba(0,0,0,0.25)]">
      <label className="font-label-sm text-label-sm text-[#d58c71] uppercase tracking-[0.15em] flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-[#e09b82]">palette</span> Editorial Style
      </label>

      <div className="flex gap-4 items-center py-1">
        {STYLES_CONFIG.map((style) => {
          const isActive = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              className={`w-12 h-12 rounded-lg border flex items-center justify-center font-inter text-base font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-tertiary-container/30 border-[#ffb59d] text-[#ffb59d] shadow-[0_4px_15px_rgba(255,181,157,0.2)] scale-105 font-bold'
                  : 'border-[#363231] bg-[#1c1a19]/40 text-on-surface-variant hover:border-[#ffb59d]/40 hover:text-[#ffb59d] hover:bg-[#242221]'
              }`}
              title={style.id === 'aftersun' ? 'After Sun' : style.id === 'retro' ? 'Retro Sonet' : 'Patience'}
            >
              {style.num}
            </button>
          );
        })}

        {/* Coming Soon Button */}
        <button
          disabled
          className="h-12 px-4 rounded-lg border border-dashed border-[#3d3836]/60 bg-[#1c1a19]/10 text-on-surface-variant/40 text-[10px] uppercase tracking-wider font-semibold cursor-not-allowed flex items-center justify-center gap-1.5"
          title="More styles coming soon!"
        >
          <span className="material-symbols-outlined text-[12px] opacity-60">lock</span> Coming Soon
        </button>
      </div>
    </div>
  );
}
