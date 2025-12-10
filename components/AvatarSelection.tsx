import React from 'react';
import { Bird, Dna, FlaskConical, CircleDot, Atom } from 'lucide-react';
import { AvatarType } from '../types';

interface Props {
  selected: AvatarType;
  onSelect: (avatar: AvatarType) => void;
}

const AvatarSelection: React.FC<Props> = ({ selected, onSelect }) => {
  const avatars = [
    { type: AvatarType.OWL, icon: <Bird size={32} />, label: 'Owl' },
    { type: AvatarType.DNA, icon: <Dna size={32} />, label: 'DNA' },
    { type: AvatarType.BEAKER, icon: <FlaskConical size={32} />, label: 'Beaker' },
    { type: AvatarType.CELL, icon: <CircleDot size={32} />, label: 'Cell' },
    { type: AvatarType.ATOM, icon: <Atom size={32} />, label: 'Atom' },
  ];

  return (
    <div className="flex gap-4 justify-center flex-wrap my-6">
      {avatars.map((av) => (
        <button
          key={av.type}
          onClick={() => onSelect(av.type)}
          className={`
            flex flex-col items-center justify-center w-24 h-24 rounded-xl border-2 transition-all duration-300
            ${selected === av.type 
              ? 'border-cyan-400 bg-cyan-900/30 text-cyan-300 neon-box transform scale-110' 
              : 'border-slate-700 bg-slate-900 text-slate-500 hover:border-slate-500 hover:text-slate-300'}
          `}
        >
          {av.icon}
          <span className="mt-2 text-xs font-mono tracking-widest">{av.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AvatarSelection;
