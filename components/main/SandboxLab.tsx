"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// ─── Shared card chrome ───────────────────────────────────────────────────────

function TerminalCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ background: "#0c0f0c", border: "1px solid #1c2a1c" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
        style={{ background: "#111811", borderBottom: "1px solid #1c2a1c" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f56" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#27c93f" }} />
          </div>
          <span className="text-gray-400 text-[11px] font-mono">{title}</span>
        </div>
        <span className="text-gray-600 text-[10px] font-mono">{subtitle}</span>
      </div>
      <div className="p-4 flex-1">{children}</div>
    </div>
  );
}

// ─── 1. CI Pipeline ───────────────────────────────────────────────────────────

type StepStatus = "pending" | "running" | "passed" | "failed";
type PipelineState = "idle" | "running" | "passed";

interface PipelineStep {
  id: string;
  label: string;
  ms: number;
  status: StepStatus;
  elapsed: number | null;
}

const STEP_DEFS = [
  { id: "checkout",  label: "actions/checkout@v4", ms: 500  },
  { id: "node",      label: "setup-node@v4 (node 20)", ms: 380 },
  { id: "install",   label: "npm ci",               ms: 1700 },
  { id: "lint",      label: "npm run lint",          ms: 1050 },
  { id: "typecheck", label: "tsc --noEmit",          ms: 780  },
  { id: "build",     label: "npm run build",         ms: 2100 },
] as const;

const mkFreshSteps = (): PipelineStep[] =>
  STEP_DEFS.map(s => ({ ...s, status: "pending", elapsed: null }));

const S_COLOR: Record<StepStatus, string> = {
  pending: "#2d3a2d",
  running: "#f59e0b",
  passed:  "#4ade80",
  failed:  "#ef4444",
};
const S_ICON: Record<StepStatus, string> = {
  pending: "·",
  running: "↻",
  passed:  "✓",
  failed:  "✗",
};

function CIPipelineDemo() {
  const [steps, setSteps] = useState<PipelineStep[]>(mkFreshSteps());
  const [pState, setPState] = useState<PipelineState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const epochRef = useRef(0);
  const startRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    epochRef.current = Number.MAX_SAFE_INTEGER;
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const handleRun = () => {
    const epoch = ++epochRef.current;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    setSteps(mkFreshSteps());
    setElapsed(0);
    setPState("running");
    startRef.current = Date.now();

    timerRef.current = setInterval(() => {
      if (epochRef.current !== epoch) { clearInterval(timerRef.current!); return; }
      setElapsed(Date.now() - startRef.current);
    }, 60);

    (async () => {
      for (let i = 0; i < STEP_DEFS.length; i++) {
        if (epochRef.current !== epoch) return;
        setSteps(p =>
          epochRef.current !== epoch ? p
            : p.map((s, j) => j === i ? { ...s, status: "running" } : s)
        );
        await new Promise<void>(r => setTimeout(r, STEP_DEFS[i].ms));
        if (epochRef.current !== epoch) return;
        const ms = STEP_DEFS[i].ms;
        setSteps(p =>
          epochRef.current !== epoch ? p
            : p.map((s, j) => j === i ? { ...s, status: "passed", elapsed: ms } : s)
        );
      }
      if (epochRef.current !== epoch) return;
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      setElapsed(Date.now() - startRef.current);
      setPState("passed");
    })();
  };

  const handleCancel = () => {
    epochRef.current++;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setSteps(mkFreshSteps());
    setElapsed(0);
    setPState("idle");
  };

  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded"
            style={{ background: "#0d1f0d", border: "1px solid #4ade8033", color: "#4ade80" }}>
            push → main
          </span>
          <span className="text-gray-600 text-[10px]">ubuntu-latest · free tier</span>
        </div>
        <span className="text-[10px]">
          {pState === "running" && <span className="text-amber-400 animate-pulse">⟳ {(elapsed / 1000).toFixed(1)}s</span>}
          {pState === "passed"  && <span className="text-green-400">✓ {(elapsed / 1000).toFixed(1)}s</span>}
        </span>
      </div>

      <div className="space-y-1 mb-4">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded text-[11px] transition-all duration-200"
            style={{
              opacity: step.status === "pending" ? 0.32 : 1,
              background: step.status === "running" ? "#18130a"
                        : step.status === "passed"  ? "#091209" : "#0a0a0a",
              borderLeft: `2px solid ${S_COLOR[step.status]}`,
            }}
          >
            <span
              style={{ color: S_COLOR[step.status], width: 12, textAlign: "center" }}
              className={step.status === "running" ? "animate-spin inline-block" : ""}
            >
              {S_ICON[step.status]}
            </span>
            <span className="text-gray-600 w-4 text-right flex-shrink-0 text-[10px]">{i + 1}</span>
            <span className="text-gray-300 flex-1">{step.label}</span>
            {step.elapsed !== null && (
              <span className="text-gray-600 text-[10px]">{(step.elapsed / 1000).toFixed(2)}s</span>
            )}
            {step.status === "running" && (
              <span className="text-amber-500 text-[10px] animate-pulse">running</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        {pState !== "running" && (
          <button
            onClick={handleRun}
            className="px-3 py-1.5 rounded text-[11px] font-mono transition-all hover:brightness-110"
            style={{ background: "#0d1f0d", border: "1px solid #4ade80", color: "#4ade80" }}
          >
            {pState === "idle" ? "▶  Run Pipeline" : "↺  Run Again"}
          </button>
        )}
        {pState === "running" && (
          <button
            onClick={handleCancel}
            className="px-3 py-1.5 rounded text-[11px] font-mono"
            style={{ background: "#1a0808", border: "1px solid #ef4444", color: "#ef4444" }}
          >
            ■  Cancel
          </button>
        )}
        <a
          href="https://github.com/YaiGenes/Space-Portolio/blob/main/.github/workflows/ci.yml"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-mono text-gray-700 hover:text-gray-400 transition-colors ml-1"
        >
          ↗ view ci.yml
        </a>
      </div>
    </div>
  );
}

// ─── 2. K8s Pod Simulator ─────────────────────────────────────────────────────

type PodStatus = "Running" | "Pending" | "CrashLoopBackOff" | "Terminating";

interface Pod {
  id: string;
  status: PodStatus;
  restarts: number;
  age: number;
}

const POD_COLOR: Record<PodStatus, string> = {
  Running:          "#4ade80",
  Pending:          "#f59e0b",
  CrashLoopBackOff: "#ef4444",
  Terminating:      "#6b7280",
};

function fmtAge(s: number) {
  if (s < 60)   return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  return `${Math.floor(s / 3600)}h${Math.floor((s % 3600) / 60)}m`;
}

let _podId = 3;

function K8sPodsDemo() {
  const [pods, setPods] = useState<Pod[]>([
    { id: "web-app-0", status: "Running", restarts: 0, age: 8432 },
    { id: "web-app-1", status: "Running", restarts: 0, age: 5217 },
    { id: "web-app-2", status: "Running", restarts: 1, age: 3044 },
  ]);
  const [log, setLog] = useState<string[]>([]);
  const addLog = (msg: string) =>
    setLog(p => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...p].slice(0, 4));

  useEffect(() => {
    const t = setInterval(() => {
      setPods(p => p.map(pod =>
        pod.status === "Running" || pod.status === "Pending"
          ? { ...pod, age: pod.age + 1 } : pod
      ));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const killPod = () => {
    const running = pods.filter(p => p.status === "Running");
    if (!running.length) return;
    const target = running[Math.floor(Math.random() * running.length)];
    addLog(`OOM killed → ${target.id}`);
    setPods(p => p.map(pod => pod.id === target.id
      ? { ...pod, status: "CrashLoopBackOff", restarts: pod.restarts + 1 } : pod));
    setTimeout(() => setPods(p => p.map(pod => pod.id === target.id
      ? { ...pod, status: "Terminating" } : pod)), 2000);
    setTimeout(() => setPods(p => p.map(pod => pod.id === target.id
      ? { ...pod, status: "Pending", age: 0 } : pod)), 3300);
    setTimeout(() => {
      addLog(`${target.id} recovered ✓`);
      setPods(p => p.map(pod => pod.id === target.id
        ? { ...pod, status: "Running" } : pod));
    }, 4800);
  };

  const scaleUp = () => {
    if (pods.length >= 6) return;
    const newId = `web-app-${_podId++}`;
    addLog(`Scheduled → ${newId}`);
    setPods(p => [...p, { id: newId, status: "Pending", restarts: 0, age: 0 }]);
    setTimeout(() => setPods(p => p.map(pod => pod.id === newId
      ? { ...pod, status: "Running" } : pod)), 1600);
  };

  const scaleDown = () => {
    const running = pods.filter(p => p.status === "Running");
    if (running.length <= 1) return;
    const target = running[running.length - 1];
    addLog(`Terminating → ${target.id}`);
    setPods(p => p.map(pod => pod.id === target.id ? { ...pod, status: "Terminating" } : pod));
    setTimeout(() => setPods(p => p.filter(pod => pod.id !== target.id)), 1200);
  };

  const runningCount = pods.filter(p => p.status === "Running").length;

  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded"
            style={{ background: "#0a1525", border: "1px solid #38bdf833", color: "#38bdf8" }}>
            ns/default
          </span>
          <span className="text-gray-600 text-[10px]">Deployment/web-app</span>
        </div>
        <span className="text-[10px]">
          <span style={{ color: runningCount === pods.length ? "#4ade80" : "#f59e0b" }}>
            {runningCount}
          </span>
          <span className="text-gray-600">/{pods.length} ready</span>
        </span>
      </div>

      <div className="space-y-1.5 mb-3">
        <AnimatePresence>
          {pods.map(pod => (
            <motion.div
              key={pod.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: pod.status === "Terminating" ? 0.4 : 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded text-[11px]"
              style={{
                background: "#0a0a0a",
                borderLeft: `2px solid ${POD_COLOR[pod.status]}`,
              }}
            >
              <span
                style={{ color: POD_COLOR[pod.status] }}
                className={pod.status === "CrashLoopBackOff" ? "animate-pulse" : ""}
              >●</span>
              <span className="text-gray-300 flex-1">{pod.id}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded"
                style={{ color: POD_COLOR[pod.status], background: `${POD_COLOR[pod.status]}18` }}>
                {pod.status}
              </span>
              <span className="text-gray-600 w-12 text-right text-[10px]">{fmtAge(pod.age)}</span>
              {pod.restarts > 0 && (
                <span className="text-orange-400 text-[10px] w-6 text-right">{pod.restarts}R</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {log.length > 0 && (
        <div className="mb-3 px-3 py-2 rounded text-[10px] space-y-0.5"
          style={{ background: "#080b08", border: "1px solid #1a2a1a" }}>
          {log.map((l, i) => (
            <div key={i} className="text-gray-600">{l}</div>
          ))}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <button onClick={killPod}
          disabled={runningCount === 0}
          className="px-3 py-1.5 rounded text-[11px] font-mono transition-all hover:brightness-110 disabled:opacity-25"
          style={{ background: "#1a0808", border: "1px solid #ef4444", color: "#ef4444" }}>
          ✗ Kill Pod
        </button>
        <button onClick={scaleUp}
          disabled={pods.length >= 6}
          className="px-3 py-1.5 rounded text-[11px] font-mono transition-all hover:brightness-110 disabled:opacity-25"
          style={{ background: "#0a150a", border: "1px solid #4ade80", color: "#4ade80" }}>
          + Scale Up
        </button>
        <button onClick={scaleDown}
          disabled={runningCount <= 1}
          className="px-3 py-1.5 rounded text-[11px] font-mono transition-all hover:brightness-110 disabled:opacity-25"
          style={{ background: "#111", border: "1px solid #4b5563", color: "#9ca3af" }}>
          − Scale Down
        </button>
      </div>
    </div>
  );
}

// ─── 3. Golden Signals Dashboard ──────────────────────────────────────────────

interface Signal {
  label: string;
  signal: string;
  unit: string;
  value: number;
  history: number[];
  maxDisplay: number;
  warn: number;
  crit: number;
  color: string;
  generate: (prev: number) => number;
  format: (v: number) => string;
}

function clamp(v: number, lo: number, hi: number) { return Math.min(hi, Math.max(lo, v)); }

function mkHistory(base: number, variance: number, n = 30) {
  return Array.from({ length: n }, () => base + (Math.random() - 0.5) * variance);
}

const INIT_SIGNALS: Signal[] = [
  {
    label: "Request Rate", signal: "Traffic", unit: "req/s", color: "#38bdf8",
    value: 1200, maxDisplay: 2000, warn: 1600, crit: 1900,
    history: mkHistory(1200, 220),
    format: v => Math.round(v).toLocaleString(),
    generate: p => clamp(p + (Math.random() - 0.5) * 160 + (Math.random() < 0.05 ? 600 : 0), 200, 2000),
  },
  {
    label: "Error Rate", signal: "Errors", unit: "%", color: "#4ade80",
    value: 0.18, maxDisplay: 5, warn: 1.0, crit: 3.0,
    history: mkHistory(0.18, 0.14),
    format: v => `${v.toFixed(2)}%`,
    generate: p => clamp(p + (Math.random() - 0.5) * 0.08 + (Math.random() < 0.04 ? 2 : 0), 0, 5),
  },
  {
    label: "P99 Latency", signal: "Latency", unit: "ms", color: "#c084fc",
    value: 118, maxDisplay: 500, warn: 200, crit: 400,
    history: mkHistory(118, 35),
    format: v => `${Math.round(v)}ms`,
    generate: p => clamp(p + (Math.random() - 0.5) * 28 + (Math.random() < 0.04 ? 200 : 0), 20, 500),
  },
  {
    label: "CPU Saturation", signal: "Saturation", unit: "%", color: "#fb923c",
    value: 42, maxDisplay: 100, warn: 70, crit: 90,
    history: mkHistory(42, 12),
    format: v => `${Math.round(v)}%`,
    generate: p => clamp(p + (Math.random() - 0.5) * 8, 5, 100),
  },
];

function Sparkline({ history, color, maxDisplay, warn, crit }: {
  history: number[]; color: string; maxDisplay: number; warn: number; crit: number;
}) {
  const W = 80, H = 28;
  const latest = history[history.length - 1];
  const lineColor = latest > crit ? "#ef4444" : latest > warn ? "#f59e0b" : color;
  const pts = history.map((v, i) => {
    const x = (i / (history.length - 1)) * W;
    const y = H - Math.min(1, v / maxDisplay) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <polyline points={pts} fill="none" stroke={lineColor}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoldenSignalsDemo() {
  const [signals, setSignals] = useState<Signal[]>(INIT_SIGNALS);

  useEffect(() => {
    const t = setInterval(() => {
      setSignals(prev => prev.map(s => {
        const v = s.generate(s.value);
        return { ...s, value: v, history: [...s.history.slice(1), v] };
      }));
    }, 1200);
    return () => clearInterval(t);
  }, []);

  const statusOf = (s: Signal) =>
    s.value > s.crit ? "critical" : s.value > s.warn ? "warning" : "healthy";

  const STATUS_STYLE = {
    healthy:  { color: "#4ade80", bg: "#081208" },
    warning:  { color: "#f59e0b", bg: "#14100a" },
    critical: { color: "#ef4444", bg: "#120808" },
  };

  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded"
            style={{ background: "#14082a", border: "1px solid #c084fc33", color: "#c084fc" }}>
            cluster: production
          </span>
          <span className="text-gray-600 text-[10px]">Prometheus · simulated</span>
        </div>
        <span className="text-[10px] text-gray-700 animate-pulse">● live</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {signals.map(s => {
          const st = statusOf(s);
          const { color, bg } = STATUS_STYLE[st];
          return (
            <div key={s.label} className="p-3 rounded-lg"
              style={{ background: bg, border: `1px solid ${color}20` }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-gray-600 text-[9px] uppercase tracking-widest">{s.signal}</p>
                  <p className="text-gray-500 text-[9px]">{s.label}</p>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded"
                  style={{ color, background: `${color}18` }}>{st}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-[18px] font-bold leading-none" style={{ color }}>
                  {s.format(s.value)}
                </span>
                <Sparkline history={s.history} color={s.color}
                  maxDisplay={s.maxDisplay} warn={s.warn} crit={s.crit} />
              </div>
              <div className="mt-2 h-px rounded-full overflow-hidden" style={{ background: "#1a1a1a" }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, (s.value / s.maxDisplay) * 100)}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[9px] text-gray-700 mt-3 text-center">
        synthetic data · real Prometheus patterns · 4 SRE golden signals (Latency · Traffic · Errors · Saturation)
      </p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SandboxLab() {
  const { t } = useLanguage();
  return (
    <section id="lab" className="flex flex-col items-center py-20 px-10 gap-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-gray-600 font-mono text-xl">$</span>
          <h2 className="text-[40px] font-semibold text-white font-mono">
            ls{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              ~/sandbox/
            </span>
          </h2>
        </div>
        <p className="text-gray-500 font-mono text-sm ml-7">
          {t.sections.lab.sub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl w-full">
        <TerminalCard title="ci-pipeline.yml" subtitle="github-actions">
          <CIPipelineDemo />
        </TerminalCard>
        <TerminalCard title="kubectl get pods" subtitle="kubernetes">
          <K8sPodsDemo />
        </TerminalCard>
      </div>

      <div className="max-w-5xl w-full">
        <TerminalCard title="golden-signals" subtitle="prometheus · grafana">
          <GoldenSignalsDemo />
        </TerminalCard>
      </div>
    </section>
  );
}
