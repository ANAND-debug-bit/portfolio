import React from 'react';

export const ContactButton = () => {
  return (
    <button className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest outline outline-2 outline-offset-[-3px] outline-white transition-opacity hover:opacity-90"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1'
      }}
    >
      Contact Me
    </button>
  );
};

export const LiveProjectButton = () => {
  return (
    <button className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors">
      Live Project
    </button>
  );
};
