import React from "react";

export type ProjectVariant =
  | "vpa" | "gitops" | "rollouts" | "eks" | "cicd"
  | "cost" | "oncall" | "branch" | "docker-cache" | "social";

interface Props { variant: ProjectVariant; impactStat?: string; impactLabel?: string }

const THEMES: Record<ProjectVariant, { from: string; to: string; accent: string }> = {
  vpa:          { from: "#0f0a2a", to: "#1a0a3a", accent: "#a78bfa" },
  gitops:       { from: "#0a1a2a", to: "#0a2a1a", accent: "#34d399" },
  rollouts:     { from: "#0a1a2a", to: "#0a1a3a", accent: "#60a5fa" },
  eks:          { from: "#1a1000", to: "#2a1800", accent: "#fb923c" },
  cicd:         { from: "#001a2a", to: "#001a1a", accent: "#22d3ee" },
  cost:         { from: "#001a0a", to: "#0a2a10", accent: "#4ade80" },
  oncall:       { from: "#1a0a0a", to: "#2a0a0a", accent: "#f87171" },
  branch:       { from: "#0a0a1a", to: "#141420", accent: "#c084fc" },
  "docker-cache": { from: "#001020", to: "#001828", accent: "#38bdf8" },
  social:       { from: "#00102a", to: "#001840", accent: "#60a5fa" },
};

const Icons: Record<ProjectVariant, React.ReactNode> = {
  vpa: (
    <>
      {/* Kubernetes hex + VPA arrow down */}
      <g opacity="0.18">
        <polygon points="60,20 80,32 80,56 60,68 40,56 40,32" fill="none" stroke="#a78bfa" strokeWidth="2"/>
        <polygon points="60,30 74,38 74,54 60,62 46,54 46,38" fill="none" stroke="#a78bfa" strokeWidth="1"/>
      </g>
      <g opacity="0.22">
        <polygon points="180,40 200,52 200,76 180,88 160,76 160,52" fill="none" stroke="#a78bfa" strokeWidth="2"/>
      </g>
      {/* Down-trend line */}
      <polyline points="30,60 80,55 130,45 180,35 230,25 280,18" fill="none" stroke="#a78bfa" strokeWidth="2.5" opacity="0.7" strokeDasharray="4 2"/>
      <polyline points="30,80 80,90 130,100 180,88 230,75 280,72" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.4"/>
      {/* Nodes */}
      {[80,130,180,230].map((x, i) => (
        <circle key={i} cx={x} cy={[55,45,35,25][i]} r="4" fill="#a78bfa" opacity="0.8"/>
      ))}
    </>
  ),
  gitops: (
    <>
      {/* Git flow nodes */}
      {[[40,80],[90,50],[140,80],[190,50],[240,80],[290,50]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="8" fill="none" stroke="#34d399" strokeWidth="2" opacity="0.5"/>
      ))}
      <polyline points="40,80 90,50 140,80 190,50 240,80 290,50" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.5" strokeDasharray="4 2"/>
      {/* ArgoCD-like circular arrows */}
      <circle cx="160" cy="64" r="32" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.2"/>
      <circle cx="160" cy="64" r="20" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.15"/>
      <path d="M160,44 A20,20 0 0,1 180,64" fill="none" stroke="#34d399" strokeWidth="2.5" opacity="0.6" strokeLinecap="round"/>
      <polygon points="183,58 183,70 177,64" fill="#34d399" opacity="0.6"/>
      {/* Branch lines */}
      <line x1="30" y1="100" x2="290" y2="100" stroke="#34d399" strokeWidth="1" opacity="0.15"/>
      <line x1="30" y1="30" x2="290" y2="30" stroke="#34d399" strokeWidth="1" opacity="0.15"/>
    </>
  ),
  rollouts: (
    <>
      {/* DAG nodes */}
      {[[40,64],[100,35],[100,90],[160,20],[160,64],[160,108],[220,35],[220,90],[280,64]].map(([x,y],i) => (
        <rect key={i} x={x-8} y={y-8} width="16" height="16" rx="3" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.5"/>
      ))}
      {/* DAG edges */}
      {[
        [40,64,100,35],[40,64,100,90],
        [100,35,160,20],[100,35,160,64],[100,90,160,64],[100,90,160,108],
        [160,20,220,35],[160,64,220,35],[160,64,220,90],[160,108,220,90],
        [220,35,280,64],[220,90,280,64],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="1" opacity="0.3"/>
      ))}
      {/* Health glow on a few nodes */}
      <rect x="92" y="27" width="16" height="16" rx="3" fill="#60a5fa" opacity="0.2"/>
      <rect x="152" y="56" width="16" height="16" rx="3" fill="#60a5fa" opacity="0.2"/>
    </>
  ),
  eks: (
    <>
      {/* Version upgrade track */}
      <rect x="30" y="55" width="60" height="20" rx="4" fill="none" stroke="#fb923c" strokeWidth="1.5" opacity="0.6"/>
      <text x="60" y="69" textAnchor="middle" fill="#fb923c" fontSize="10" opacity="0.8" fontFamily="monospace">1.24</text>
      <line x1="90" y1="65" x2="120" y2="65" stroke="#fb923c" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr)"/>
      <rect x="120" y="55" width="60" height="20" rx="4" fill="none" stroke="#fb923c" strokeWidth="1.5" opacity="0.6"/>
      <text x="150" y="69" textAnchor="middle" fill="#fb923c" fontSize="10" opacity="0.8" fontFamily="monospace">1.27</text>
      <line x1="180" y1="65" x2="210" y2="65" stroke="#fb923c" strokeWidth="1.5" opacity="0.5"/>
      <rect x="210" y="55" width="60" height="20" rx="4" fill="#fb923c" opacity="0.2" stroke="#fb923c" strokeWidth="2"/>
      <text x="240" y="69" textAnchor="middle" fill="#fbbf24" fontSize="10" opacity="1" fontFamily="monospace" fontWeight="bold">1.29</text>
      {/* Saving label */}
      <text x="160" y="105" textAnchor="middle" fill="#4ade80" fontSize="11" opacity="0.7" fontFamily="monospace">-82.5% support cost</text>
      {/* Grid dots */}
      {[0,1,2,3,4,5].map(i => [0,1,2,3].map(j => (
        <circle key={`${i}-${j}`} cx={30+i*55} cy={20+j*20} r="1.5" fill="#fb923c" opacity="0.1"/>
      )))}
    </>
  ),
  cicd: (
    <>
      {/* Pipeline steps */}
      {["Build","Test","Scan","Deploy"].map((label, i) => (
        <g key={i}>
          <rect x={28+i*72} y="46" width="56" height="26" rx="5" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5"/>
          <text x={56+i*72} y="63" textAnchor="middle" fill="#22d3ee" fontSize="9" opacity="0.8" fontFamily="monospace">{label}</text>
          {i < 3 && <line x1={84+i*72} y1="59" x2={100+i*72} y2="59" stroke="#22d3ee" strokeWidth="1.5" opacity="0.4"/>}
          {i < 3 && <polygon points={`${101+i*72},55 ${106+i*72},59 ${101+i*72},63`} fill="#22d3ee" opacity="0.4"/>}
        </g>
      ))}
      <text x="160" y="105" textAnchor="middle" fill="#22d3ee" fontSize="11" opacity="0.5" fontFamily="monospace">5× faster deployments</text>
      {/* Horizontal rule */}
      <line x1="30" y1="118" x2="290" y2="118" stroke="#22d3ee" strokeWidth="0.5" opacity="0.15"/>
    </>
  ),
  cost: (
    <>
      {/* Bar chart going down */}
      {[80,65,58,48,40,30].map((h, i) => (
        <rect key={i} x={30+i*46} y={110-h} width="32" height={h} rx="3"
          fill={i === 5 ? "#4ade80" : "#374151"} stroke={i === 5 ? "#4ade80" : "#6b7280"}
          strokeWidth="1" opacity={i === 5 ? 0.9 : 0.5}/>
      ))}
      <text x="282" y="42" textAnchor="end" fill="#4ade80" fontSize="13" opacity="0.8" fontFamily="monospace" fontWeight="bold">-27%</text>
      <line x1="30" y1="110" x2="290" y2="110" stroke="#6b7280" strokeWidth="1" opacity="0.3"/>
    </>
  ),
  oncall: (
    <>
      {/* Alert bell shape */}
      <path d="M160,25 Q160,30 155,30 Q140,30 136,45 Q132,60 130,75 L190,75 Q188,60 184,45 Q180,30 165,30 Q160,30 160,25Z" fill="none" stroke="#f87171" strokeWidth="2" opacity="0.5"/>
      <rect x="151" y="75" width="18" height="6" rx="2" fill="#f87171" opacity="0.4"/>
      {/* Signal rings */}
      <path d="M130,50 Q125,60 128,72" fill="none" stroke="#f87171" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 2"/>
      <path d="M190,50 Q195,60 192,72" fill="none" stroke="#f87171" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 2"/>
      <path d="M118,42 Q110,60 114,78" fill="none" stroke="#f87171" strokeWidth="1" opacity="0.2" strokeDasharray="3 2"/>
      <path d="M202,42 Q210,60 206,78" fill="none" stroke="#f87171" strokeWidth="1" opacity="0.2" strokeDasharray="3 2"/>
      {/* Zero cost badge */}
      <rect x="80" y="88" width="160" height="22" rx="6" fill="#1a0505" stroke="#f87171" strokeWidth="1" opacity="0.6"/>
      <text x="160" y="103" textAnchor="middle" fill="#f87171" fontSize="10" opacity="0.9" fontFamily="monospace">Zero subscription cost</text>
    </>
  ),
  branch: (
    <>
      {/* Git branch tree */}
      <line x1="100" y1="20" x2="100" y2="108" stroke="#c084fc" strokeWidth="2" opacity="0.4"/>
      <line x1="100" y1="45" x2="160" y2="60" stroke="#c084fc" strokeWidth="1.5" opacity="0.4"/>
      <line x1="100" y1="65" x2="160" y2="80" stroke="#c084fc" strokeWidth="1.5" opacity="0.4"/>
      <line x1="100" y1="85" x2="160" y2="100" stroke="#c084fc" strokeWidth="1.5" opacity="0.4"/>
      {/* Commit dots */}
      {[20,40,60,80,100].map(y => <circle key={y} cx="100" cy={y} r="5" fill="#c084fc" opacity="0.6"/>)}
      {[[160,60],[160,80],[160,100]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#9333ea" opacity="0.5"/>)}
      {/* Stale branch X */}
      <line x1="195" y1="55" x2="205" y2="65" stroke="#f87171" strokeWidth="2" opacity="0.7"/>
      <line x1="205" y1="55" x2="195" y2="65" stroke="#f87171" strokeWidth="2" opacity="0.7"/>
      <text x="215" y="65" fill="#f87171" fontSize="9" opacity="0.6" fontFamily="monospace">stale</text>
      <text x="160" y="105" textAnchor="middle" fill="#c084fc" fontSize="10" opacity="0.5" fontFamily="monospace">-80% CI time</text>
    </>
  ),
  "docker-cache": (
    <>
      {/* Docker layer stack */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="90" y={30+i*16} width="140" height="13" rx="3"
          fill="none" stroke="#38bdf8" strokeWidth="1.5"
          opacity={0.2+i*0.12}/>
      ))}
      {/* Cache hit arrows */}
      <path d="M250,50 Q270,50 270,64 Q270,78 250,78" fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
      <polygon points="248,74 253,78 248,82" fill="#4ade80" opacity="0.6"/>
      {/* S3 bucket hint */}
      <rect x="40" y="42" width="40" height="30" rx="4" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4"/>
      <text x="60" y="62" textAnchor="middle" fill="#38bdf8" fontSize="9" opacity="0.7" fontFamily="monospace">S3</text>
      <line x1="80" y1="57" x2="90" y2="57" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 2"/>
      <text x="160" y="108" textAnchor="middle" fill="#38bdf8" fontSize="10" opacity="0.5" fontFamily="monospace">20min → 5min build</text>
    </>
  ),
  social: (
    <>
      {/* LinkedIn-style post card */}
      <rect x="80" y="20" width="160" height="90" rx="6" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4"/>
      <rect x="88" y="28" width="24" height="24" rx="4" fill="#0077b5" opacity="0.6"/>
      <text x="100" y="44" textAnchor="middle" fill="white" fontSize="11" opacity="0.9" fontWeight="bold">in</text>
      <rect x="118" y="32" width="80" height="6" rx="2" fill="#60a5fa" opacity="0.3"/>
      <rect x="118" y="42" width="56" height="4" rx="2" fill="#60a5fa" opacity="0.2"/>
      <rect x="88" y="58" width="144" height="4" rx="2" fill="#60a5fa" opacity="0.15"/>
      <rect x="88" y="66" width="120" height="4" rx="2" fill="#60a5fa" opacity="0.15"/>
      <rect x="88" y="74" width="130" height="4" rx="2" fill="#60a5fa" opacity="0.15"/>
      {/* Scheduled clock */}
      <circle cx="232" cy="95" r="10" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.5"/>
      <line x1="232" y1="89" x2="232" y2="95" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6"/>
      <line x1="232" y1="95" x2="237" y2="95" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6"/>
    </>
  ),
};

export default function ProjectCardHeader({ variant, impactStat, impactLabel }: Props) {
  const theme = THEMES[variant];
  return (
    <div className="relative w-full h-48 overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}>
      <svg viewBox="0 0 320 128" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {Icons[variant]}
      </svg>
      {impactStat && impactLabel && (
        <div className="absolute top-3 right-3 flex flex-col items-end">
          <span className="text-2xl font-black leading-none" style={{ color: theme.accent }}>{impactStat}</span>
          <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5" style={{ color: theme.accent, opacity: 0.7 }}>{impactLabel}</span>
        </div>
      )}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 120%, ${theme.accent}18 0%, transparent 70%)` }} />
    </div>
  );
}
