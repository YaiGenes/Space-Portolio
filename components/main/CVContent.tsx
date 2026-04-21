"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { cvText } from "@/constants/content";

function highlightCHF(text: string) {
  const marker = "CHF 642K+";
  const idx = text.indexOf(marker);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <strong style={{ color: "#000", fontWeight: "800" }}>{marker}</strong>
      {text.slice(idx + marker.length)}
    </>
  );
}

export default function CVContent() {
  const { language } = useLanguage();
  const cv = cvText[language];
  const s = cv.sections;
  const c = language !== "en"; // compact mode for DE/FR (longer translations)

  return (
    <div className="cv-outer bg-white shadow-2xl" style={{ width: "794px", height: "1123px", overflow: "hidden" }}>
      <div className="flex h-full">

        {/* ── SIDEBAR ── */}
        <div className="flex flex-col flex-shrink-0" style={{ width: "220px", backgroundColor: "#f5f4f0", padding: "24px 16px" }}>

          <div className="flex justify-center mb-4">
            <div style={{ width: "130px", height: "130px", borderRadius: "50%", overflow: "hidden", border: "3px solid #9b87c2" }}>
              <Image src="/profile.jpg" alt="Yaiser Avila Rodríguez" width={130} height={130} style={{ objectFit: "cover", objectPosition: "center top" }} />
            </div>
          </div>

          {/* Contact */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span style={{ color: "#7b5ea7", fontSize: "12px" }}>☎</span>
              <span style={{ fontSize: "10.5px", color: "#333" }}>+41 782 544 117</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span style={{ color: "#7b5ea7", fontSize: "12px" }}>✉</span>
              <span style={{ fontSize: "10.5px", color: "#333" }}>yaigenes@infrabio.dev</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span style={{ color: "#7b5ea7", fontSize: "11px", fontWeight: "bold" }}>in</span>
              <a href="https://linkedin.com/in/yaigenes" style={{ fontSize: "10.5px", color: "#7b5ea7" }}>linkedin.com/in/yaigenes</a>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ color: "#7b5ea7", fontSize: "10px" }}>🌐</span>
              <a href="https://yaigenes.infrabio.dev" style={{ fontSize: "10px", color: "#7b5ea7" }}>yaigenes.infrabio.dev</a>
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h3 style={{ fontSize: "11px", fontWeight: "700", color: "#333", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "7px", borderBottom: "1px solid #ccc", paddingBottom: "3px" }}>
              {s.education}
            </h3>
            <div className="mb-2">
              <p style={{ fontSize: "10px", color: "#7b5ea7", fontWeight: "600" }}>2020 – 2021</p>
              <p style={{ fontSize: "10.5px", fontWeight: "700", color: "#333" }}>MSc. Fullstack Developer</p>
              <p style={{ fontSize: "10px", color: "#555" }}>Assembler School of Software Eng.</p>
            </div>
            <div className="mb-2">
              <p style={{ fontSize: "10px", color: "#7b5ea7", fontWeight: "600" }}>2019 – 2020</p>
              <p style={{ fontSize: "10.5px", fontWeight: "700", color: "#333" }}>MSc. Plant Breeding</p>
              <p style={{ fontSize: "10px", color: "#555" }}>Universitat Politècnica de València</p>
            </div>
            <div>
              <p style={{ fontSize: "10px", color: "#7b5ea7", fontWeight: "600" }}>2018 – 2019</p>
              <p style={{ fontSize: "10.5px", fontWeight: "700", color: "#333" }}>MSc. Plant Biology</p>
              <p style={{ fontSize: "10px", color: "#555" }}>Swedish Univ. of Agricultural Sciences</p>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-4">
            <h3 style={{ fontSize: "11px", fontWeight: "700", color: "#333", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", borderBottom: "1px solid #ccc", paddingBottom: "3px" }}>
              {s.languages}
            </h3>
            <p style={{ fontSize: "10.5px", color: "#444", marginBottom: "2px" }}>{cv.langNames.spanish} — {cv.langLevels.native}</p>
            <p style={{ fontSize: "10.5px", color: "#444", marginBottom: "2px" }}>{cv.langNames.english} — {cv.langLevels.bilingual}</p>
            <p style={{ fontSize: "10.5px", color: "#444", marginBottom: "2px" }}>{cv.langNames.swedish} — {cv.langLevels.basic}</p>
            <p style={{ fontSize: "10.5px", color: "#7b5ea7", marginBottom: "2px" }}>{cv.langNames.german} — {cv.langLevels.learning}</p>
            <p style={{ fontSize: "10.5px", color: "#7b5ea7" }}>{cv.langNames.french} — {cv.langLevels.learning}</p>
          </div>

          {/* Previous */}
          <div className="mb-4">
            <h3 style={{ fontSize: "11px", fontWeight: "700", color: "#333", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", borderBottom: "1px solid #ccc", paddingBottom: "3px" }}>
              {s.previous}
            </h3>
            <p style={{ fontSize: "10px", fontWeight: "700", color: "#333", marginBottom: "2px" }}>
              .NETCore, SOLID, Software Architecture Patterns
            </p>
            <p style={{ fontSize: "10px", color: "#7b5ea7" }}>Vueling University</p>
          </div>

          {/* Programming */}
          <div className="mb-4">
            <h3 style={{ fontSize: "11px", fontWeight: "700", color: "#333", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", borderBottom: "1px solid #ccc", paddingBottom: "3px" }}>
              {s.programming}
            </h3>
            <p style={{ fontSize: "10px", color: "#7b5ea7", lineHeight: "1.6" }}>
              Go · Python · Bash · TypeScript · JavaScript · PHP · C# · Groovy
            </p>
          </div>

          {/* Research */}
          <div>
            <h3 style={{ fontSize: "11px", fontWeight: "700", color: "#333", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", borderBottom: "1px solid #ccc", paddingBottom: "3px" }}>
              {s.research}
            </h3>
            <p style={{ fontSize: "9.5px", color: "#444", lineHeight: "1.4", textDecoration: "underline" }}>
              Influence of Phenological State on the Antioxidant Potential and Chemical Composition of Ageratina havanensis.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col flex-1" style={{ padding: "24px 22px" }}>

          {/* Name & Title */}
          <div className="mb-3">
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1a1a1a", textTransform: "uppercase", lineHeight: "1.05", letterSpacing: "0.08em" }}>
              Yaiser Avila Rodríguez
            </h1>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#7b5ea7", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: "3px" }}>
              {cv.subtitle}
            </p>
          </div>

          {/* Summary */}
          <div className="mb-3" style={{ textAlign: "justify" }}>
            <p style={{ fontSize: c ? "9.5px" : "10.5px", lineHeight: c ? "1.5" : "1.6", color: "#333" }}>
              {cv.summary}{" "}
              <strong>Currently at Hydrolix (Oyster HR Switzerland GmbH) since Jul 2024</strong>, managing <strong>234+ multi-cloud Kubernetes clusters</strong> (AWS, GCP, Linode) for Disney, Hulu, Fox, and Viacom18.
              Delivered a combined estimated <strong>CHF 642K+ in compute savings, engineering time, and avoided costs</strong> over two years — VPA confirmed at -25.9% cost/TB by team lead; ArgoCD rollout platform cut 3–4 week releases to 3–4 days (~360 SRE-hrs/yr saved). <em style={{ fontSize: "9px", color: "#888" }}>(USD figures converted at 0.783 CHF/USD, Apr 2026)</em>
            </p>
          </div>

          {/* Financial Impact Banner */}
          <div className="mb-3" style={{ background: "#f5f0ff", border: "1px solid #d4b8ff", borderRadius: "6px", padding: "7px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <p style={{ fontSize: "9.5px", fontWeight: "700", color: "#7b5ea7", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.keyImpact}</p>
              <p style={{ fontSize: "9px", fontWeight: "700", color: "#7b5ea7" }}>{s.hydrolix.split("CHF 642K+")[0]}<strong style={{ fontSize: "10px" }}>CHF 642K+</strong>{s.hydrolix.split("CHF 642K+")[1]}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3px 12px" }}>
              {[
                <><strong>CHF 132K–263K/yr</strong> saved via VPA (sea-2 alone, 80→21 nodes)</>,
                <><strong>CHF 63K–110K+/yr</strong> fleet-wide compute reduction (-25.9% CHF/TB)</>,
                <><strong>CHF 36K/yr</strong> release automation (360 SRE-hrs/yr × CHF 100/hr)</>,
                <><strong>CHF 16K–63K</strong> prevented customer incidents (25 Prometheus stacks)</>,
                <><strong>CHF 6K/yr</strong> avoided on-call via OOM auto-remediation</>,
                <><strong>CHF 12K–23K</strong> avoided over-capacity (Hulu SB, Viacom18 IPL HTEs)</>,
                <><strong>27% AWS cost reduction</strong> at Triggle Spain</>,
                <><strong>82.5% extended support cost cut</strong> (EKS 1.24→1.29 upgrade)</>,
                <><strong>Zero-cost on-call platform</strong> — Grafana OnCall replaced paid UptimeRobot</>,
              ].map((item, i) => (
                <p key={i} style={{ fontSize: c ? "8.5px" : "9px", color: "#333" }}>▸ {item}</p>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-2">
            <h2 style={{ fontSize: "13px", fontWeight: "800", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "2px solid #1a1a1a", paddingBottom: "3px", marginBottom: "9px" }}>
              {s.latestExp}
            </h2>

            {/* Hydrolix */}
            <div className={c ? "mb-2" : "mb-3"}>
              <div className="flex justify-between">
                <span style={{ fontSize: "10px", color: "#7b5ea7", fontWeight: "600" }}>Jul 2024 – Present</span>
                <span style={{ fontSize: "10px", color: "#888" }}>{cv.jobTypes.remote}</span>
              </div>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#1a1a1a", marginTop: "1px" }}>Site Reliability Engineer — <span style={{ fontWeight: "500" }}>Hydrolix</span></p>
              <p style={{ fontSize: c ? "9px" : "10px", lineHeight: c ? "1.45" : "1.55", color: "#333", marginTop: "2px", textAlign: "justify" }}>
                {highlightCHF(cv.hydrolix)}
              </p>
              <p style={{ fontSize: c ? "8px" : "9px", color: "#666", marginTop: "2px", fontStyle: "italic" }}>
                Kubernetes (LKE/EKS/GKE) · ArgoCD · Go · Pulumi · Prometheus · Grafana · Argo Workflows · VPA · Helm · Terraform · AWS · GCP · Linode
              </p>
            </div>

            {/* Triggle */}
            <div className={c ? "mb-2" : "mb-3"}>
              <div className="flex justify-between">
                <span style={{ fontSize: "10px", color: "#7b5ea7", fontWeight: "600" }}>Jul 2023 – Jul 2024 (1 year)</span>
                <span style={{ fontSize: "10px", color: "#888" }}>{cv.jobTypes.employee}</span>
              </div>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#1a1a1a", marginTop: "1px" }}>Senior SRE — <span style={{ fontWeight: "500" }}>Triggle Spain SLU</span></p>
              <p style={{ fontSize: c ? "9px" : "10px", lineHeight: c ? "1.45" : "1.55", color: "#333", marginTop: "2px", textAlign: "justify" }}>
                {cv.triggle}
              </p>
            </div>

            {/* atSistemas */}
            <div className={c ? "mb-2" : "mb-3"}>
              <div className="flex justify-between">
                <span style={{ fontSize: "10px", color: "#7b5ea7", fontWeight: "600" }}>Feb 2023 – Jul 2023 (6 months)</span>
                <span style={{ fontSize: "10px", color: "#888" }}>{cv.jobTypes.employee}</span>
              </div>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#1a1a1a", marginTop: "1px" }}>Senior SRE — <span style={{ fontWeight: "500" }}>atSistemas Consulting</span></p>
              <p style={{ fontSize: c ? "9px" : "10px", lineHeight: c ? "1.45" : "1.55", color: "#333", marginTop: "2px" }}>
                {cv.atSistemas}
              </p>
            </div>

            {/* Accenture */}
            <div className="mb-2">
              <div className="flex justify-between">
                <span style={{ fontSize: "10px", color: "#7b5ea7", fontWeight: "600" }}>Feb 2022 – Feb 2023 (1 year)</span>
                <span style={{ fontSize: "10px", color: "#888" }}>{cv.jobTypes.employee}</span>
              </div>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#1a1a1a", marginTop: "1px" }}>DevOps Lifecycle Engineer — <span style={{ fontWeight: "500" }}>Accenture Spain</span></p>
              <p style={{ fontSize: c ? "9px" : "10px", lineHeight: c ? "1.45" : "1.55", color: "#333", marginTop: "2px" }}>
                {cv.accenture}
              </p>
            </div>
          </div>

          {/* Bio + References */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px", marginTop: "4px" }}>
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: "800", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "2px solid #1a1a1a", paddingBottom: "2px", marginBottom: "7px" }}>
                {s.bioExp}
              </h2>
              <div className="flex justify-between">
                <span style={{ fontSize: "10px", color: "#7b5ea7", fontWeight: "600" }}>Dec 2016 – Aug 2018</span>
              </div>
              <p style={{ fontSize: "10.5px", fontWeight: "700", color: "#1a1a1a", marginTop: "1px" }}>{cv.bio.role}</p>
              <p style={{ fontSize: "10px", color: "#555" }}>{cv.bio.org}</p>
              <p style={{ fontSize: "10px", lineHeight: "1.5", color: "#333", marginTop: "2px" }}>{cv.bio.desc}</p>
            </div>

            <div>
              <h2 style={{ fontSize: "12px", fontWeight: "800", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "2px solid #1a1a1a", paddingBottom: "2px", marginBottom: "7px" }}>
                {s.references}
              </h2>
              <div className="mb-2">
                <p style={{ fontSize: "10.5px", fontWeight: "700", color: "#1a1a1a" }}>CEO — Triggle SLU</p>
                <p style={{ fontSize: "10px", color: "#555" }}>Francesco Lenahan</p>
                <p style={{ fontSize: "10px", color: "#7b5ea7" }}>francesco.lenahan@triggle.app</p>
              </div>
              <div>
                <p style={{ fontSize: "10.5px", fontWeight: "700", color: "#1a1a1a" }}>Tech Lead — Triggle SLU</p>
                <p style={{ fontSize: "10px", color: "#555" }}>Jose Antonio Puertas Pertiñez</p>
                <p style={{ fontSize: "10px", color: "#7b5ea7" }}>jose.puertas@triggle.app</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
