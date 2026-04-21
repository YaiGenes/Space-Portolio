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
  const { t } = useLanguage();
  const ci = t.sections.lab.ci;
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
            {pState === "idle" ? ci.run : ci.runAgain}
          </button>
        )}
        {pState === "running" && (
          <button
            onClick={handleCancel}
            className="px-3 py-1.5 rounded text-[11px] font-mono"
            style={{ background: "#1a0808", border: "1px solid #ef4444", color: "#ef4444" }}
          >
            {ci.cancel}
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

// ─── 2. K8s Explorer ──────────────────────────────────────────────────────────

type PodStatus = "Running" | "Pending" | "CrashLoopBackOff" | "Terminating" | "OOMKilled";
type K8sTab   = "pods" | "hpa" | "services" | "events";

interface K8sPod {
  id: string; deploy: string; status: PodStatus;
  restarts: number; age: number; cpu: number; mem: number;
}
interface K8sEvent {
  ts: string; kind: "Normal" | "Warning";
  reason: string; obj: string; message: string;
}

const POD_COLOR: Record<PodStatus, string> = {
  Running: "#4ade80", Pending: "#f59e0b",
  CrashLoopBackOff: "#ef4444", Terminating: "#6b7280", OOMKilled: "#f97316",
};
const SVC_TYPE_COLOR: Record<string, string> = {
  ClusterIP: "#38bdf8", LoadBalancer: "#4ade80", Ingress: "#c084fc",
};
const SERVICES = [
  { name: "web-app-svc", type: "ClusterIP",    ip: "10.96.43.12",  ext: "<none>",       port: "80/TCP",   age: "3d5h" },
  { name: "web-app-lb",  type: "LoadBalancer", ip: "10.96.15.88",  ext: "203.0.113.42", port: "443/TCP",  age: "3d5h" },
  { name: "metrics-svc", type: "ClusterIP",    ip: "10.96.77.99",  ext: "<none>",       port: "9090/TCP", age: "7d2h" },
  { name: "argocd-svc",  type: "ClusterIP",    ip: "10.96.201.55", ext: "<none>",       port: "8080/TCP", age: "14d"  },
];

function fmtAge(secs: number) {
  if (secs < 60)   return `${secs}s`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  return `${Math.floor(secs / 3600)}h${Math.floor((secs % 3600) / 60)}m`;
}

const INIT_PODS: K8sPod[] = [
  { id: "web-app-0", deploy: "web-app",  status: "Running", restarts: 0, age: 8432,  cpu: 45,  mem: 128 },
  { id: "web-app-1", deploy: "web-app",  status: "Running", restarts: 0, age: 5217,  cpu: 52,  mem: 142 },
  { id: "web-app-2", deploy: "web-app",  status: "Running", restarts: 1, age: 3044,  cpu: 38,  mem: 117 },
  { id: "metrics-0", deploy: "metrics",  status: "Running", restarts: 0, age: 72800, cpu: 12,  mem: 256 },
];
const INIT_EVENTS: K8sEvent[] = [
  { ts: "2m ago", kind: "Normal",  reason: "Pulled",     obj: "pod/web-app-2",     message: "Successfully pulled image web-app:v1.4.2" },
  { ts: "3m ago", kind: "Normal",  reason: "Started",    obj: "pod/web-app-2",     message: "Started container web-app" },
  { ts: "3m ago", kind: "Warning", reason: "BackOff",    obj: "pod/web-app-2",     message: "Back-off restarting failed container" },
  { ts: "4m ago", kind: "Warning", reason: "OOMKilling", obj: "pod/web-app-2",     message: "Memory limit reached, container OOM killed" },
  { ts: "6m ago", kind: "Normal",  reason: "Sync",       obj: "app/web-app",       message: "Successfully synced (all tasks run)" },
  { ts: "9m ago", kind: "Normal",  reason: "ScalingReplicaSet", obj: "deploy/web-app", message: "Scaled up replica set web-app to 3" },
];

function K8sExplorer() {
  const { t } = useLanguage();
  const pt = t.sections.lab.pods;

  const podIdRef    = useRef(4);
  const epochRef    = useRef(0);
  const spikeEpoch  = useRef(0);

  const [activeTab,    setActiveTab]    = useState<K8sTab>("pods");
  const [pods,         setPods]         = useState<K8sPod[]>(INIT_PODS);
  const [events,       setEvents]       = useState<K8sEvent[]>(INIT_EVENTS);
  const [cpuUsage,     setCpuUsage]     = useState(38);
  const [hpaReplicas,  setHpaReplicas]  = useState(3);
  const [spiking,      setSpiking]      = useState(false);

  // Age + CPU fluctuation ticker — named `ticker` to avoid shadowing `t` from useLanguage
  useEffect(() => {
    const ticker = setInterval(() => {
      setPods(p => p.map(pod =>
        pod.status === "Running" || pod.status === "Pending"
          ? { ...pod, age: pod.age + 1, cpu: Math.max(5, Math.min(95, pod.cpu + (Math.random() - 0.5) * 5)) }
          : pod
      ));
      setCpuUsage(p => Math.max(8, Math.min(95, p + (Math.random() - 0.48) * 3)));
    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  const pushEvent = (kind: "Normal" | "Warning", reason: string, obj: string, message: string) =>
    setEvents(p => [{ ts: new Date().toLocaleTimeString(), kind, reason, obj, message }, ...p].slice(0, 14));

  // ── Pod actions ──────────────────────────────────────────────────────────────
  const killPod = () => {
    const candidates = pods.filter(p => p.status === "Running" && p.deploy === "web-app");
    if (!candidates.length) return;
    const epoch  = ++epochRef.current;
    const target = candidates[Math.floor(Math.random() * candidates.length)];
    pushEvent("Warning", "OOMKilling", `pod/${target.id}`, "Memory limit exceeded, container OOM killed");
    setPods(p => p.map(pod => pod.id === target.id ? { ...pod, status: "OOMKilled", restarts: pod.restarts + 1 } : pod));
    setTimeout(() => {
      if (epochRef.current !== epoch) return;
      pushEvent("Warning", "BackOff", `pod/${target.id}`, "Back-off restarting failed container");
      setPods(p => p.map(pod => pod.id === target.id ? { ...pod, status: "CrashLoopBackOff" } : pod));
    }, 900);
    setTimeout(() => {
      if (epochRef.current !== epoch) return;
      setPods(p => p.map(pod => pod.id === target.id ? { ...pod, status: "Terminating" } : pod));
    }, 2100);
    setTimeout(() => {
      if (epochRef.current !== epoch) return;
      pushEvent("Normal", "Scheduled", `pod/${target.id}`, `Assigned default/${target.id} to node-02`);
      setPods(p => p.map(pod => pod.id === target.id ? { ...pod, status: "Pending", age: 0, cpu: 0 } : pod));
    }, 3400);
    setTimeout(() => {
      if (epochRef.current !== epoch) return;
      pushEvent("Normal", "Started", `pod/${target.id}`, "Started container web-app");
      setPods(p => p.map(pod => pod.id === target.id ? { ...pod, status: "Running", cpu: 33, mem: 120 } : pod));
    }, 5000);
  };

  const scaleUp = () => {
    const webPods = pods.filter(p => p.deploy === "web-app");
    if (webPods.length >= 6) return;
    const newId = `web-app-${podIdRef.current++}`;
    pushEvent("Normal", "ScalingReplicaSet", "deploy/web-app", `Scaled up replica set web-app to ${webPods.length + 1}`);
    setHpaReplicas(n => n + 1);
    setPods(p => [...p, { id: newId, deploy: "web-app", status: "Pending", restarts: 0, age: 0, cpu: 0, mem: 0 }]);
    const ep = epochRef.current;
    setTimeout(() => {
      if (epochRef.current !== ep) return;
      pushEvent("Normal", "Started", `pod/${newId}`, "Started container web-app");
      setPods(p => p.map(pod => pod.id === newId ? { ...pod, status: "Running", cpu: 30, mem: 115 } : pod));
    }, 1600);
  };

  const scaleDown = () => {
    const running = pods.filter(p => p.status === "Running" && p.deploy === "web-app");
    if (running.length <= 1) return;
    const target = running[running.length - 1];
    pushEvent("Normal", "ScalingReplicaSet", "deploy/web-app", `Scaled down replica set web-app to ${running.length - 1}`);
    setHpaReplicas(n => Math.max(1, n - 1));
    setPods(p => p.map(pod => pod.id === target.id ? { ...pod, status: "Terminating" } : pod));
    setTimeout(() => setPods(p => p.filter(pod => pod.id !== target.id)), 1200);
  };

  // ── HPA spike ────────────────────────────────────────────────────────────────
  const spikeCpu = () => {
    if (spiking) return;
    setSpiking(true);
    const epoch = ++spikeEpoch.current;
    const id1 = `web-app-${podIdRef.current++}`;
    const id2 = `web-app-${podIdRef.current++}`;
    pushEvent("Warning", "TargetValueAboveThreshold", "hpa/web-app", "CPU 89% > target 70%");
    setCpuUsage(89);
    setTimeout(() => {
      if (spikeEpoch.current !== epoch) return;
      pushEvent("Normal", "SuccessfulRescale", "hpa/web-app", "Scaled up: 3 → 5 replicas (cpu above target)");
      setHpaReplicas(5);
      setPods(p => [
        ...p,
        { id: id1, deploy: "web-app", status: "Pending", restarts: 0, age: 0, cpu: 0, mem: 0 },
        { id: id2, deploy: "web-app", status: "Pending", restarts: 0, age: 0, cpu: 0, mem: 0 },
      ]);
      setTimeout(() => {
        if (spikeEpoch.current !== epoch) return;
        setPods(p => p.map(pod => (pod.id === id1 || pod.id === id2) ? { ...pod, status: "Running", cpu: 38, mem: 115 } : pod));
        setCpuUsage(36);
        setTimeout(() => {
          if (spikeEpoch.current !== epoch) return;
          pushEvent("Normal", "SuccessfulRescale", "hpa/web-app", "Scaled down: 5 → 3 replicas (all metrics below target)");
          setHpaReplicas(3);
          setSpiking(false);
          setPods(p => p.map(pod => (pod.id === id1 || pod.id === id2) ? { ...pod, status: "Terminating" } : pod));
          setTimeout(() => setPods(p => p.filter(pod => pod.id !== id1 && pod.id !== id2)), 1200);
        }, 5000);
      }, 2000);
    }, 2000);
  };

  // ── Derived ──────────────────────────────────────────────────────────────────
  const webPods    = pods.filter(p => p.deploy === "web-app");
  const webRunning = webPods.filter(p => p.status === "Running").length;
  const totalRunning = pods.filter(p => p.status === "Running").length;

  const TABS: { id: K8sTab; label: string }[] = [
    { id: "pods",     label: "pods"   },
    { id: "hpa",      label: "hpa"    },
    { id: "services", label: "svc"    },
    { id: "events",   label: "events" },
  ];

  return (
    <div className="font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded"
            style={{ background: "#0a1525", border: "1px solid #38bdf833", color: "#38bdf8" }}>
            ns/default
          </span>
          <span className="text-gray-600 text-[10px]">{totalRunning}/{pods.length} Running</span>
        </div>
        <div className="flex items-center gap-1">
          {TABS.map(tb => (
            <button key={tb.id} onClick={() => setActiveTab(tb.id)}
              className="text-[10px] px-2 py-0.5 rounded transition-colors"
              style={{
                background: tb.id === activeTab ? "#0a1520" : "transparent",
                border:     `1px solid ${tb.id === activeTab ? "#38bdf850" : "#1c2a2a"}`,
                color:      tb.id === activeTab ? "#38bdf8" : "#4b5563",
              }}>
              {tb.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Pods ── */}
      {activeTab === "pods" && (
        <div>
          <div className="space-y-1 mb-3">
            <AnimatePresence>
              {pods.map(pod => (
                <motion.div key={pod.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: pod.status === "Terminating" ? 0.4 : 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, margin: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px]"
                  style={{ background: "#0a0a0a", borderLeft: `2px solid ${POD_COLOR[pod.status]}` }}>
                  <span style={{ color: POD_COLOR[pod.status] }}
                    className={["CrashLoopBackOff","OOMKilled"].includes(pod.status) ? "animate-pulse" : ""}>●</span>
                  <span className="text-gray-300 flex-1 min-w-0 truncate">{pod.id}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ color: POD_COLOR[pod.status], background: `${POD_COLOR[pod.status]}15` }}>
                    {pod.status}
                  </span>
                  {pod.status === "Running" && (
                    <span className="text-gray-600 text-[9px] w-14 text-right flex-shrink-0">
                      {Math.round(pod.cpu)}m CPU
                    </span>
                  )}
                  <span className="text-gray-700 text-[9px] w-10 text-right flex-shrink-0">{fmtAge(pod.age)}</span>
                  {pod.restarts > 0 && <span className="text-orange-400 text-[9px] flex-shrink-0">{pod.restarts}R</span>}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={killPod} disabled={webRunning === 0}
              className="px-3 py-1.5 rounded text-[11px] transition-all hover:brightness-110 disabled:opacity-25"
              style={{ background: "#1a0808", border: "1px solid #ef4444", color: "#ef4444" }}>
              {pt.kill}
            </button>
            <button onClick={scaleUp} disabled={webPods.length >= 6}
              className="px-3 py-1.5 rounded text-[11px] transition-all hover:brightness-110 disabled:opacity-25"
              style={{ background: "#0a150a", border: "1px solid #4ade80", color: "#4ade80" }}>
              {pt.scaleUp}
            </button>
            <button onClick={scaleDown} disabled={webRunning <= 1}
              className="px-3 py-1.5 rounded text-[11px] transition-all hover:brightness-110 disabled:opacity-25"
              style={{ background: "#111", border: "1px solid #4b5563", color: "#9ca3af" }}>
              {pt.scaleDown}
            </button>
          </div>
        </div>
      )}

      {/* ── HPA ── */}
      {activeTab === "hpa" && (
        <div>
          <div className="px-3 py-2.5 rounded mb-3" style={{ background: "#0a0a0a", border: "1px solid #1a2a1a" }}>
            <div className="flex items-center justify-between mb-2 text-[10px]">
              <div>
                <span className="text-gray-200">hpa/web-app</span>
                <span className="text-gray-600 ml-2">→ Deployment/web-app</span>
              </div>
              <div className="flex gap-3">
                <span className="text-gray-600">min <span className="text-gray-400">2</span></span>
                <span className="text-gray-600">max <span className="text-gray-400">8</span></span>
                <span className="text-gray-600">replicas <span style={{ color: "#4ade80" }}>{hpaReplicas}</span></span>
              </div>
            </div>
            <div className="text-[9px] text-gray-600 flex justify-between mb-1">
              <span>CPU utilization</span>
              <span style={{ color: cpuUsage > 70 ? "#ef4444" : cpuUsage > 50 ? "#f59e0b" : "#4ade80" }}>
                {Math.round(cpuUsage)}% / 70% target
              </span>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "#1a1a1a" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, cpuUsage)}%`,
                  background: cpuUsage > 70 ? "#ef4444" : cpuUsage > 50 ? "#f59e0b" : "#4ade80",
                }} />
              {/* Target line at 70% */}
              <div className="absolute top-0 bottom-0 w-px bg-gray-500 opacity-60" style={{ left: "70%" }} />
            </div>
          </div>
          {/* Replica dots */}
          <div className="flex items-center gap-1.5 mb-4 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}
                className="w-7 h-7 rounded flex items-center justify-center text-[10px] transition-all duration-500"
                style={{
                  background: i < hpaReplicas ? "#0d1f0d" : "#0c0c0c",
                  border: `1px solid ${i < hpaReplicas ? "#4ade8060" : "#1a2a1a"}`,
                  color: i < hpaReplicas ? "#4ade80" : "#374151",
                }}>
                {i < hpaReplicas ? "●" : "○"}
              </div>
            ))}
            <span className="text-[9px] text-gray-600 ml-1">{hpaReplicas}/8</span>
          </div>
          <button onClick={spikeCpu} disabled={spiking}
            className="px-3 py-1.5 rounded text-[11px] transition-all hover:brightness-110 disabled:opacity-30"
            style={{ background: "#1a0a00", border: "1px solid #f97316", color: "#f97316" }}>
            {spiking ? "⟳  Scaling in progress..." : "⚡  Spike CPU → watch HPA scale"}
          </button>
        </div>
      )}

      {/* ── Services ── */}
      {activeTab === "services" && (
        <div className="space-y-1">
          <div className="grid gap-x-2 px-2 py-1 text-[9px] text-gray-600 uppercase tracking-wider border-b"
            style={{ gridTemplateColumns: "1fr auto auto auto", borderColor: "#1a2a1a" }}>
            <span>NAME</span><span>TYPE</span><span>CLUSTER-IP</span><span>PORT</span>
          </div>
          {SERVICES.map(svc => (
            <div key={svc.name}
              className="grid items-center gap-x-2 px-2.5 py-1.5 rounded text-[11px]"
              style={{ gridTemplateColumns: "1fr auto auto auto", background: "#0a0a0a", borderLeft: `2px solid ${SVC_TYPE_COLOR[svc.type]}` }}>
              <span className="text-gray-300 truncate">{svc.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded"
                style={{ color: SVC_TYPE_COLOR[svc.type], background: `${SVC_TYPE_COLOR[svc.type]}15` }}>
                {svc.type}
              </span>
              <span className="text-gray-600 text-[9px] tabular-nums">{svc.ip}</span>
              <span className="text-gray-500 text-[9px]">{svc.port}</span>
            </div>
          ))}
          <div className="px-2.5 py-1.5 rounded text-[11px]"
            style={{ background: "#0a0a0a", borderLeft: "2px solid #c084fc" }}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-gray-300">ingress/web-app-ingress</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ color: "#c084fc", background: "#c084fc15" }}>Ingress</span>
            </div>
            <p className="text-[9px] text-gray-600">web-app.example.com → web-app-svc:80 (TLS)</p>
          </div>
        </div>
      )}

      {/* ── Events ── */}
      {activeTab === "events" && (
        <div className="space-y-1 overflow-y-auto" style={{ maxHeight: 210 }}>
          {events.map((ev, i) => (
            <div key={i} className="flex items-start gap-2 px-2.5 py-1.5 rounded text-[10px]"
              style={{ background: "#0a0a0a", borderLeft: `2px solid ${ev.kind === "Warning" ? "#f59e0b" : "#4ade80"}` }}>
              <span className="flex-shrink-0 mt-px"
                style={{ color: ev.kind === "Warning" ? "#f59e0b" : "#4ade80" }}>
                {ev.kind === "Warning" ? "⚠" : "✓"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-gray-200 font-bold">{ev.reason}</span>
                  <span className="text-gray-600 text-[9px] truncate">{ev.obj}</span>
                  <span className="text-gray-700 text-[9px] ml-auto flex-shrink-0">{ev.ts}</span>
                </div>
                <p className="text-gray-600 text-[9px] mt-0.5 truncate">{ev.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
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

// ─── 4. Cost Impact Simulator ─────────────────────────────────────────────────

function SliderRow({
  label, value, min, max, step, display, onChange, color,
}: {
  label: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; color: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-[3px] rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color}90 ${pct}%, #1c2a1c ${pct}%)`,
          accentColor: color,
        }}
      />
    </div>
  );
}

function SavingsBar({
  label, sub, value, maxValue, color, sym,
}: {
  label: string; sub: string; value: number; maxValue: number; color: string; sym: string;
}) {
  const pct = maxValue > 0 ? Math.min(100, (value / maxValue) * 100) : 0;
  const fmt = (n: number) => {
    if (n >= 1_000_000) return `${sym}${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${sym}${(n / 1_000).toFixed(0)}K`;
    return `${sym}${n}`;
  };
  return (
    <div className="px-3 py-2.5 rounded" style={{ background: "#070c07", border: `1px solid ${color}18` }}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="text-[11px] text-gray-300">{label}</p>
          <p className="text-[9px] text-gray-700 mt-0.5 leading-relaxed">{sub}</p>
        </div>
        <span className="text-[13px] font-bold flex-shrink-0" style={{ color }}>+{fmt(value)}/yr</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "#1a2a1a" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: `linear-gradient(to right, ${color}80, ${color})` }}
        />
      </div>
    </div>
  );
}

// Auto-derives estimated resource waste from fleet size using industry benchmarks.
// Sources: CAST AI 2024 (99.94% of clusters over-provisioned across 2,100+ orgs),
//          Datadog State of Containers 2024 (83% of container costs from idle resources),
//          Kubecost community data (35-50% addressable waste baseline).
// Larger fleets are adjusted down: teams managing 50+ clusters are more likely to have
// adopted FinOps practices (Kubecost, CAST AI, OpenCost) which reduce addressable waste.
function estimateWaste(clusters: number): number {
  const base        = 40; // CAST AI / Datadog / Kubecost consensus
  const maturityAdj = clusters >= 200 ? -8 : clusters >= 100 ? -5 : clusters >= 50 ? -2 : clusters < 15 ? +6 : 0;
  return Math.max(25, Math.min(55, base + maturityAdj));
}

function WasteBadge({ wastePct, clusters, s }: {
  wastePct: number; clusters: number;
  s: { wasteTitle: string; autoCalc: string; largeFleet: string; midFleet: string; smallFleet: string; typicalFleet: string };
}) {
  const tier =
    clusters >= 200 ? s.largeFleet :
    clusters >= 50  ? s.midFleet   :
    clusters < 15   ? s.smallFleet : s.typicalFleet;
  return (
    <div className="px-3 py-2.5 rounded flex items-start justify-between gap-3"
      style={{ background: "#100d00", border: "1px solid #f59e0b22" }}>
      <div>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{s.wasteTitle}</p>
        <p className="text-[9px] text-gray-700 leading-relaxed">
          {tier} · CAST AI: 99.94% over-provisioned · Datadog 2024: 83% idle · Kubecost: 35–50% baseline
        </p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-[22px] font-black leading-none" style={{ color: "#f59e0b" }}>{wastePct}%</p>
        <p className="text-[9px] text-gray-600 mt-0.5">{s.autoCalc}</p>
      </div>
    </div>
  );
}

type Currency = "USD" | "EUR" | "CHF";
const FX: Record<Currency, { rate: number; sym: string }> = {
  USD: { rate: 1.00,  sym: "$"   },
  EUR: { rate: 0.92,  sym: "€"   },
  CHF: { rate: 0.91,  sym: "Fr." },
};

function CostSimulator() {
  const { t } = useLanguage();
  const s = t.sections.lab.sim;
  const [clusters,    setClusters]    = useState(234);
  const [monthlyBill, setMonthlyBill] = useState(70000);
  const [hourlyRate,  setHourlyRate]  = useState(100);
  const [sreCount,    setSreCount]    = useState(3);
  const [currency,    setCurrency]    = useState<Currency>("USD");

  const { rate, sym } = FX[currency];

  // Waste derived from fleet size via industry benchmarks (not a user-controlled slider)
  const wastePct = estimateWaste(clusters);

  // All savings calculated in USD, converted to selected currency for display
  // VPA: 25.9% fleet-wide (documented). HPA adds up to 12% more by scaling with fleet size —
  // larger fleets have more variable-traffic workloads benefiting from horizontal autoscaling.
  const hpaPct         = Math.min(0.12, (clusters / 200) * 0.10);
  const vpaHpaSavings  = Math.round(monthlyBill * (0.259 + hpaPct) * 12);
  const gitopsSavings  = Math.round((clusters / 200) * 30 * sreCount * 12 * hourlyRate);
  const autoRemSavings = Math.round(clusters * 0.05 * (35 / 60) * hourlyRate * 12);
  const total          = vpaHpaSavings + gitopsSavings + autoRemSavings;
  const maxSav         = Math.max(vpaHpaSavings, gitopsSavings, autoRemSavings, 1);

  const investment = 160 * hourlyRate;
  const paybackWks = total > 0 ? (investment / (total / 52)).toFixed(1) : "∞";

  const fmtBig = (n: number) => {
    const v = n * rate;
    if (v >= 1_000_000) return `${sym}${(v / 1_000_000).toFixed(2)}M`;
    if (v >= 1_000) return `${sym}${(v / 1_000).toFixed(0)}K`;
    return `${sym}${Math.round(v)}`;
  };

  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] px-2 py-0.5 rounded"
          style={{ background: "#071407", border: "1px solid #4ade8033", color: "#4ade80" }}>
          {s.tag}
        </span>
        <div className="flex items-center gap-1">
          {(["USD", "EUR", "CHF"] as Currency[]).map(c => (
            <button key={c} onClick={() => setCurrency(c)}
              className="text-[10px] px-2 py-0.5 rounded transition-colors font-mono"
              style={{
                background: currency === c ? "#0a1520" : "transparent",
                border:     `1px solid ${currency === c ? "#38bdf850" : "#1c2a2a"}`,
                color:      currency === c ? "#38bdf8" : "#4b5563",
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
        <SliderRow label={s.clusters} value={clusters} min={10} max={500} step={5}
          display={clusters.toString()} onChange={setClusters} color="#38bdf8" />
        <SliderRow label={`${s.monthlyBill} (${currency})`} value={monthlyBill} min={5000} max={200000} step={1000}
          display={`${sym}${(monthlyBill * rate / 1000).toFixed(0)}K`} onChange={setMonthlyBill} color="#4ade80" />
        <SliderRow label={s.teamSize} value={sreCount} min={1} max={20} step={1}
          display={`${sreCount} ${sreCount > 1 ? s.engs : s.eng}`} onChange={setSreCount} color="#f87171" />
        <SliderRow label={`${s.hourlyRate} (${currency})`} value={hourlyRate} min={60} max={200} step={5}
          display={`${sym}${Math.round(hourlyRate * rate)}/hr`} onChange={setHourlyRate} color="#c084fc" />
      </div>

      {/* Auto-calculated waste badge — full width */}
      <div className="mb-5">
        <WasteBadge wastePct={wastePct} clusters={clusters} s={s} />
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <SavingsBar label={s.vpaHpa}
          sub={`VPA ${(0.259 * 100).toFixed(1)}% + HPA ${(hpaPct * 100).toFixed(1)}% of bill · ${clusters} clusters`}
          value={vpaHpaSavings * rate} maxValue={maxSav * rate} color="#4ade80" sym={sym} />
        <SavingsBar label={s.gitops}
          sub={`${sreCount} SRE${sreCount > 1 ? "s" : ""} × 30 hrs/release × 12 · ${clusters} clusters`}
          value={gitopsSavings * rate} maxValue={maxSav * rate} color="#38bdf8" sym={sym} />
        <SavingsBar label={s.autoRem}
          sub={`5% auto-resolved/mo · 35 min · ${clusters} clusters`}
          value={autoRemSavings * rate} maxValue={maxSav * rate} color="#c084fc" sym={sym} />
      </div>

      {/* Total */}
      <div className="px-4 py-4 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ background: "#060f06", border: "1px solid #4ade8025" }}>
        <div>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-0.5">{s.projected}</p>
          <span className="text-[32px] font-black leading-none" style={{ color: "#4ade80", textShadow: "0 0 24px #4ade8050" }}>
            {fmtBig(total)}
          </span>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-gray-700 mb-0.5">
            {s.investment} ({sym}{Math.round(investment * rate / 1000)}K)
          </p>
          <p className="text-[13px] font-bold"
            style={{ color: Number(paybackWks) <= 8 ? "#4ade80" : "#f59e0b" }}>
            {s.payback} ~{paybackWks} {s.weeks}
          </p>
          <p className="text-[9px] text-gray-700 mt-1">CAST AI · Datadog · Kubecost benchmarks</p>
        </div>
      </div>

      {/* ── Sales pitch ── */}
      {(() => {
        const annualSreCost = hourlyRate * 1600; // ~full-time annual cost at market rate
        const netYear1      = total - annualSreCost;
        const roi           = annualSreCost > 0 ? (total / annualSreCost).toFixed(1) : "∞";
        const selfFundWks   = total > 0 ? Math.round((annualSreCost / (total / 52))) : 0;
        const fmt           = (n: number) => {
          const v = Math.abs(n) * rate;
          if (v >= 1_000_000) return `${n < 0 ? "-" : "+"}${sym}${(v / 1_000_000).toFixed(1)}M`;
          if (v >= 1_000)     return `${n < 0 ? "-" : "+"}${sym}${(v / 1_000).toFixed(0)}K`;
          return `${n < 0 ? "-" : "+"}${sym}${Math.round(v)}`;
        };
        const p = t.pitch;
        return (
          <div className="mt-5 rounded-xl overflow-hidden"
            style={{ border: "1px solid #7b5ea740" }}>
            <div className="flex items-center justify-between px-4 py-2.5"
              style={{ background: "#0a0612", borderBottom: "1px solid #7b5ea720" }}>
              <span className="text-[13px] font-mono text-purple-400 uppercase tracking-widest">
                {p.header}
              </span>
              <span className="text-[11px] text-gray-500 font-mono">{p.sub}</span>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6"
              style={{ background: "#06040e" }}>

              {/* Left — ROI model */}
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-3">{p.roiTitle}</p>
                <div className="space-y-2">
                  {[
                    { label: p.savings,       val: fmtBig(total),            color: "#4ade80" },
                    { label: `${p.sreCost} (~${sym}${Math.round(hourlyRate * rate)}/hr)`, val: `-${sym}${Math.round(annualSreCost * rate / 1000)}K`, color: "#f87171" },
                    { label: p.netValue,       val: fmt(netYear1),             color: netYear1 >= 0 ? "#4ade80" : "#f87171" },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between px-3 py-2 rounded text-[13px]"
                      style={{ background: "#0c0918", border: "1px solid #1a1030" }}>
                      <span className="text-gray-400">{row.label}</span>
                      <span className="font-bold tabular-nums" style={{ color: row.color }}>{row.val}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 px-3 py-3 rounded mt-1"
                    style={{ background: "#0f0620", border: "1px solid #7b5ea740" }}>
                    <div className="flex-1 text-center">
                      <p className="text-[11px] text-gray-500 mb-0.5">{p.roi}</p>
                      <p className="text-[26px] font-black" style={{ color: "#c084fc" }}>{roi}×</p>
                    </div>
                    <div className="w-px h-10" style={{ background: "#2a1a40" }} />
                    <div className="flex-1 text-center">
                      <p className="text-[11px] text-gray-500 mb-0.5">{p.selfFunds}</p>
                      <p className="text-[26px] font-black" style={{ color: "#38bdf8" }}>~{selfFundWks}wk</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — what you get */}
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-3">{p.deliversTitle}</p>
                <div className="space-y-2 mb-5">
                  {p.delivers.map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[13px]">
                      <span style={{ color: "#4ade80", flexShrink: 0, marginTop: "2px" }}>✓</span>
                      <span className="text-gray-300 leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
                <a href="https://calendly.com/yaigenes/1-1-connect"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-[13px] font-bold transition-all hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #7b5ea7, #38bdf8)", color: "#fff" }}>
                  {p.cta}
                </a>
              </div>
            </div>

            {/* Tagline */}
            <div className="px-5 py-4 text-center"
              style={{ background: "#080410", borderTop: "1px solid #7b5ea720" }}>
              <p className="text-[12px] text-gray-400 italic leading-relaxed">
                &ldquo;{p.tagline}
                <span style={{ color: "#c084fc" }}>{p.taglineAccent}</span>
                {p.taglineSuffix}&rdquo;
              </p>
            </div>
          </div>
        );
      })()}
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

      {/* Row 1: cost impact simulator — full width */}
      <div className="max-w-5xl w-full">
        <TerminalCard title="cost-impact-calculator" subtitle="interactive · industry benchmarks">
          <CostSimulator />
        </TerminalCard>
      </div>

      {/* Row 2: CI pipeline + K8s explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl w-full">
        <TerminalCard title="ci-pipeline.yml" subtitle="github-actions">
          <CIPipelineDemo />
        </TerminalCard>
        <TerminalCard title="kubectl get all" subtitle="kubernetes">
          <K8sExplorer />
        </TerminalCard>
      </div>

      {/* Row 3: golden signals */}
      <div className="max-w-5xl w-full">
        <TerminalCard title="golden-signals" subtitle="prometheus · grafana">
          <GoldenSignalsDemo />
        </TerminalCard>
      </div>
    </section>
  );
}
