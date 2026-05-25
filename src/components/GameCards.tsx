export const ValorantCard = () => (
  <div className="w-28 h-36 bg-gradient-to-br from-red-600 to-indigo-900 rounded-2xl relative overflow-hidden flex-shrink-0 border border-red-500/20 shadow-lg">
    <div className="absolute inset-0 bg-black/40 z-10" />
    <div className="absolute top-2 left-2 z-20 text-[10px] font-black tracking-widest text-red-400">VALORANT</div>
    <div className="absolute bottom-2 left-2 z-20">
      <p className="text-[9px] text-slate-400 font-bold">Hours Played</p>
      <p className="text-xs font-black text-white">1,350h</p>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 scale-150 text-white font-black italic">V</div>
  </div>
);

export const CallOfDutyCard = () => (
  <div className="w-28 h-36 bg-gradient-to-br from-amber-600 to-slate-900 rounded-2xl relative overflow-hidden flex-shrink-0 border border-amber-500/20 shadow-lg">
    <div className="absolute inset-0 bg-black/40 z-10" />
    <div className="absolute top-2 left-2 z-20 text-[10px] font-black tracking-widest text-amber-500">CALL DUTY</div>
    <div className="absolute bottom-2 left-2 z-20">
      <p className="text-[9px] text-slate-400 font-bold">Hours Played</p>
      <p className="text-xs font-black text-white">980h</p>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 scale-150 text-white font-black italic text-center text-xs leading-none">C O D</div>
  </div>
);

export const ApexCard = () => (
  <div className="w-28 h-36 bg-gradient-to-br from-[#FF1A1A] to-[#111625] rounded-2xl relative overflow-hidden flex-shrink-0 border border-red-600/20 shadow-lg">
    <div className="absolute inset-0 bg-black/40 z-10" />
    <div className="absolute top-2 left-2 z-20 text-[10px] font-black tracking-widest text-red-500">APEX LEGENDS</div>
    <div className="absolute bottom-2 left-2 z-20">
      <p className="text-[9px] text-slate-400 font-bold">Hours Played</p>
      <p className="text-xs font-black text-white">620h</p>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 scale-150 text-white font-black italic">A</div>
  </div>
);
