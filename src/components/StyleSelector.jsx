import React from 'react';

export default function StyleSelector({ selectedStyle, onStyleChange }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
      <h2 className="font-bold text-lg text-gray-800">3. Select Style</h2>
      <div className="grid grid-cols-3 gap-3">
        <button 
          onClick={() => onStyleChange('aftersun')}
          className={`border-2 rounded-lg p-2 text-center relative overflow-hidden h-24 flex items-center justify-center flex-col transition-all ${
            selectedStyle === 'aftersun' ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <span className={`font-bold z-10 relative text-sm ${selectedStyle === 'aftersun' ? 'text-black' : 'text-gray-500'}`}>After Sun</span>
          <span className="text-xs text-gray-400 z-10 relative mt-1">Cinematic</span>
        </button>
        <button 
          onClick={() => onStyleChange('retro')}
          className={`border-2 rounded-lg p-2 text-center relative overflow-hidden h-24 flex items-center justify-center flex-col transition-all ${
            selectedStyle === 'retro' ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <span className={`font-bold z-10 relative text-sm ${selectedStyle === 'retro' ? 'text-black' : 'text-gray-500'}`}>Retro Sonet</span>
          <span className="text-xs text-gray-400 z-10 relative mt-1">Vintage</span>
        </button>
        <button 
          onClick={() => onStyleChange('patience')}
          className={`border-2 rounded-lg p-2 text-center relative overflow-hidden h-24 flex items-center justify-center flex-col transition-all ${
            selectedStyle === 'patience' ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <span className={`font-bold z-10 relative text-sm ${selectedStyle === 'patience' ? 'text-black' : 'text-gray-500'}`}>Patience</span>
          <span className="text-xs text-gray-400 z-10 relative mt-1">Serene</span>
        </button>
      </div>
    </div>
  );
}
