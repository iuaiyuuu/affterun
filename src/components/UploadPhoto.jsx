import React from 'react';

export default function UploadPhoto({ setPosterData }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPosterData(prev => ({ ...prev, photoUrl: url }));
    }
  };

  return (
    <div className="bg-[#242221] border border-[#3d3836] rounded-xl p-6 film-grain flex flex-col gap-4 shadow-[0_15px_35px_rgba(0,0,0,0.25)]">
      <label className="font-label-sm text-label-sm text-[#d58c71] uppercase tracking-[0.15em] flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-[#e09b82]">image</span> Background Imagery
      </label>
      <label className="w-full h-32 border border-dashed border-[#4a4441] rounded flex flex-col items-center justify-center text-on-surface-variant hover:text-tertiary-fixed-dim hover:border-tertiary/60 hover:bg-tertiary-container/15 transition-all duration-300 group cursor-pointer">
        <span className="material-symbols-outlined mb-2 group-hover:scale-110 group-hover:text-tertiary-fixed transition-all duration-300" data-icon="add_photo_alternate">add_photo_alternate</span>
        <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-tertiary-fixed transition-colors">Click to upload photo</span>
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
    </div>
  );
}
