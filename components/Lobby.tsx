import React, { useState } from 'react';
import { Player, AvatarType, Difficulty } from '../types';
import { Dna, Plus, User, Play, ShieldAlert, Microscope, Trash2 } from 'lucide-react';

interface Props {
  onStartGame: (players: Player[], difficulty: Difficulty) => void;
}

const Lobby: React.FC<Props> = ({ onStartGame }) => {
  const [currentName, setCurrentName] = useState('');
  const [currentAvatar, setCurrentAvatar] = useState<AvatarType>(AvatarType.OWL);
  const [players, setPlayers] = useState<Player[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.LOW);

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentName.trim()) return;

    const newPlayer: Player = {
      id: Math.random().toString(36).substr(2, 9),
      name: currentName,
      avatar: currentAvatar,
      score: 0
    };

    setPlayers([...players, newPlayer]);
    setCurrentName('');
    // Cycle avatar for fun
    const nextAvatar = Object.values(AvatarType)[(Object.values(AvatarType).indexOf(currentAvatar) + 1) % Object.values(AvatarType).length];
    setCurrentAvatar(nextAvatar);
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const handleStart = () => {
    if (players.length > 0) {
      onStartGame(players, difficulty);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-inter">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[100px] rounded-full"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 z-10">
        
        {/* LEFT COLUMN: BRANDING */}
        <div className="flex flex-col justify-center items-start space-y-8">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-2">
               <Dna size={64} className="text-fuchsia-400 animate-pulse" />
               <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-400 neon-text-magenta drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">
                 GENI-X
               </h1>
            </div>
            <h2 className="text-xl md:text-2xl font-mono text-lime-400 tracking-[0.2em] font-bold uppercase pl-2">
              BIOS 344: MOLECULAR BIOLOGY and GENETICS
            </h2>
          </div>

          <div className="hidden lg:block space-y-6 max-w-md">
            <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm neon-box">
               <h3 className="text-cyan-300 font-mono flex items-center gap-2 mb-4 uppercase tracking-widest text-sm font-bold">
                 <ShieldAlert size={18} /> Mission Objectives
               </h3>
               <ul className="space-y-3 text-slate-300 text-sm font-mono">
                 <li className="flex items-start gap-2">
                   <span className="text-fuchsia-500">▶</span> Solve advanced genetic puzzles.
                 </li>
                 <li className="flex items-start gap-2">
                   <span className="text-fuchsia-500">▶</span> Topics: Inheritance, Mapping, Gene Regulation, Genomics.
                 </li>
                 <li className="flex items-start gap-2">
                   <span className="text-fuchsia-500">▶</span> Collaborate to decode the sequence.
                 </li>
               </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TEAM ROSTER & CONFIG */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md bg-slate-950/80 border border-slate-800 p-8 rounded-3xl shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 rounded-t-3xl"></div>
            
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 font-mono uppercase tracking-widest">
              <User className="text-fuchsia-500" /> Team Roster
            </h2>

            {/* ADD PLAYER FORM */}
            <form onSubmit={handleAddPlayer} className="mb-8 space-y-4">
              <div>
                <label className="block text-cyan-400 text-[10px] font-mono mb-1 uppercase tracking-widest">Codename</label>
                <input
                  type="text"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  placeholder="ENTER ID..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all font-mono tracking-widest text-sm"
                  maxLength={12}
                />
              </div>

              <div>
                <label className="block text-cyan-400 text-[10px] font-mono mb-1 uppercase tracking-widest">Phenotype</label>
                <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {Object.values(AvatarType).map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setCurrentAvatar(av)}
                      className={`
                        flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center transition-all
                        ${currentAvatar === av 
                          ? 'border-fuchsia-500 bg-fuchsia-900/20 text-fuchsia-300 shadow-[0_0_10px_#c026d3]' 
                          : 'border-slate-800 bg-slate-900 text-slate-600 hover:border-slate-600'}
                      `}
                    >
                      {getIcon(av, 20)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!currentName}
                className="w-full py-3 bg-cyan-950/50 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-900/50 hover:border-cyan-400 hover:text-cyan-200 transition-all rounded-lg font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-2 group"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Add Scientist
              </button>
            </form>

            {/* ROSTER LIST */}
            <div className="mb-8 min-h-[120px] bg-black/40 rounded-xl border border-slate-800 p-2">
              {players.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 font-mono text-xs">
                  <div className="mb-2 opacity-50"><User size={24} /></div>
                  WAITING FOR PERSONNEL...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {players.map(p => (
                    <div key={p.id} className="bg-slate-900/80 border border-slate-700 p-2 rounded flex items-center justify-between group">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-cyan-500 border border-slate-600">
                          {getIcon(p.avatar, 12)}
                        </div>
                        <span className="text-xs font-mono text-slate-200 truncate">{p.name}</span>
                      </div>
                      <button onClick={() => removePlayer(p.id)} className="text-slate-600 hover:text-red-500 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* DIFFICULTY & START */}
            <div className="space-y-4">
               <div>
                  <label className="block text-lime-400 text-[10px] font-mono mb-1 uppercase tracking-widest text-center">Difficulty Level</label>
                  <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                    {Object.values(Difficulty).map(d => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`flex-1 py-1 text-[10px] font-mono uppercase transition-all rounded ${difficulty === d ? 'bg-lime-900/50 text-lime-400 shadow-[0_0_5px_rgba(132,204,22,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
               </div>

               <button
                 onClick={handleStart}
                 disabled={players.length === 0}
                 className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-500 hover:to-purple-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(192,38,211,0.5)] transform transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed font-mono text-lg tracking-[0.2em] flex items-center justify-center gap-3 uppercase"
               >
                 <Play size={20} fill="currentColor" /> Start Sequencing
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for icons inside the component file to avoid extra imports complexity
const BirdIcon = ({size}: {size: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>
);

const getIcon = (type: AvatarType, size: number) => {
    switch (type) {
      case AvatarType.OWL: return <BirdIcon size={size} />;
      case AvatarType.DNA: return <Dna size={size} />;
      case AvatarType.BEAKER: return <Microscope size={size} />;
      default: return <div className="w-2 h-2 bg-current rounded-full" />;
    }
};

export default Lobby;