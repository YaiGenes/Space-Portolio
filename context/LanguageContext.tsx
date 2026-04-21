"use client";

import React, { useEffect, useSyncExternalStore } from "react";

export type Language = "en" | "de" | "fr";

export const translations = {
  en: {
    nav: {
      about: "About", experience: "Experience", projects: "Projects",
      lab: "Lab", contact: "Contact", viewCv: "View CV",
    },
    hero: {
      badge: "Site Reliability Engineer Blog/Portfolio",
      h1: "Engineering",
      h1accent: " reliability at scale ",
      h2: "across 234+ Kubernetes clusters",
      sub: "SRE with 5+ years across Hydrolix, Triggle Spain, Knowmad mood, and Accenture. Specialised in GitOps, multi-cloud Kubernetes, cost optimisation, and automation.",
      ctaAbout: "About Me",
      ctaCv: "Download CV",
    },
    sections: {
      about:      { title: "About",      accent: "Me" },
      experience: { title: "Work",       accent: "Experience" },
      skills:     "Tools & Technologies",
      projects:   { title: "Flagship",   accent: "Projects" },
      lab: {
        sub: "live SRE demos \u00b7 running in your browser \u00b7 no backend",
        sim: {
          tag: "cost \u00b7 model", clusters: "Clusters", monthlyBill: "Monthly Compute Bill (USD)",
          teamSize: "SRE Team Size", hourlyRate: "SRE Hourly Rate (USD)",
          eng: "engineer", engs: "engineers",
          vpa: "VPA Fleet Rollout", gitops: "GitOps Automation",
          autoRem: "Alerts / Runbooks / Auto-Remediation",
          projected: "Projected Annual Savings", payback: "payback in", weeks: "weeks",
          investment: "vs. 1 SRE-month investment",
          wasteTitle: "Est. Resource Waste", autoCalc: "auto-calculated",
          largeFleet: "large fleet", midFleet: "mid fleet", smallFleet: "small fleet", typicalFleet: "typical fleet",
        },
        ci:   { run: "\u25b6  Run Pipeline",    runAgain: "\u21ba  Run Again",    cancel: "\u25a0  Cancel"     },
        pods: { kill: "\u2717 Kill Pod",         scaleUp:  "+ Scale Up",            scaleDown: "\u2212 Scale Down" },
      },
      contact:    { title: "Let\u2019s work", accent: "together" },
    },
    about: {
      bio1: "I\u2019m Yaiser Avila Rodr\u00edguez, a Site Reliability Engineer with 5+ years building and operating large-scale Kubernetes infrastructure across AWS, GCP, and Linode. Currently at Hydrolix, where I manage 234+ clusters across three cloud regions.",
      bio2: "My focus is on turning manual, error-prone ops into automated, observable systems \u2014 from GitOps adoption and progressive delivery platforms to cost-optimisation initiatives that delivered an estimated CHF 642K+ in compute savings and avoided engineering costs at Hydrolix alone over two years.",
      bio3: "Outside work I run InfraBio, a personal brand where I share SRE content and tooling.",
    },
    stats: {
      years:    "Years SRE experience",
      clusters: "Clusters under GitOps",
      compute:  "Compute cost reduction",
      saved:    "Saved at Hydrolix (2 yrs)",
      commits:  "GitHub commits",
    },
    contact: {
      sub: "Open to new roles, collaborations, or a conversation about SRE, Kubernetes, and infrastructure automation.",
      email: "Book a Meeting",
      copy: "yaigenes@infrabio.dev",
      copied: "\u2713 Copied to clipboard",
    },
    projectLabels: {
      problem: "Problem", solution: "Solution", technologies: "Technologies Used", outcome: "Outcome",
      showAll: "\u2193 Show all 10 projects", showLess: "\u2191 Show less",
    },
  },
  de: {
    nav: {
      about: "\u00dcber mich", experience: "Erfahrung", projects: "Projekte",
      lab: "Labor", contact: "Kontakt", viewCv: "CV ansehen",
    },
    hero: {
      badge: "Site Reliability Engineer Blog & Portfolio",
      h1: "Zuverl\u00e4ssigkeit",
      h1accent: " in gro\u00dfem Ma\u00dfstab ",
      h2: "\u00fcber 234+ Kubernetes-Cluster",
      sub: "SRE mit 5+ Jahren Erfahrung bei Hydrolix, Triggle, Knowmad mood und Accenture. Spezialisiert auf GitOps, Multi-Cloud Kubernetes, Kostenoptimierung und Automatisierung.",
      ctaAbout: "\u00dcber mich",
      ctaCv: "CV herunterladen",
    },
    sections: {
      about:      { title: "\u00dcber",      accent: "Mich" },
      experience: { title: "Berufliche",    accent: "Erfahrung" },
      skills:     "Tools & Technologien",
      projects:   { title: "Wichtigste",    accent: "Projekte" },
      lab: {
        sub: "Live SRE-Demos \u00b7 im Browser \u00b7 kein Backend",
        sim: {
          tag: "kosten \u00b7 modell", clusters: "Cluster", monthlyBill: "Monatliche Compute-Kosten (USD)",
          teamSize: "SRE-Teamgr\u00f6\u00dfe", hourlyRate: "SRE Stundensatz (USD)",
          eng: "Ingenieur", engs: "Ingenieure",
          vpa: "VPA Fleet-Rollout", gitops: "GitOps-Automatisierung",
          autoRem: "Alerts / Runbooks / Auto-Remediation",
          projected: "Projizierte Jahreseinsparungen", payback: "Amortisation in", weeks: "Wochen",
          investment: "vs. 1 SRE-Monat Investition",
          wasteTitle: "Gesch\u00e4tzte Ressourcenverschwendung", autoCalc: "automatisch berechnet",
          largeFleet: "gro\u00dfe Flotte", midFleet: "mittlere Flotte", smallFleet: "kleine Flotte", typicalFleet: "typische Flotte",
        },
        ci:   { run: "\u25b6  Pipeline starten", runAgain: "\u21ba  Erneut starten", cancel: "\u25a0  Abbrechen"  },
        pods: { kill: "\u2717 Pod beenden",       scaleUp:  "+ Skalieren \u2191",     scaleDown: "\u2212 Skalieren \u2193" },
      },
      contact:    { title: "Kontakt", accent: "aufnehmen" },
    },
    about: {
      bio1: "Ich bin Yaiser Avila Rodr\u00edguez, ein Site Reliability Engineer mit \u00fcber 5 Jahren Erfahrung im Aufbau und Betrieb von Kubernetes-Infrastrukturen in gro\u00dfem Ma\u00dfstab auf AWS, GCP und Linode. Aktuell bei Hydrolix, wo ich 234+ Cluster in drei Cloud-Regionen verwalte.",
      bio2: "Mein Fokus liegt auf der Umwandlung manueller Ops in automatisierte, observierbare Systeme \u2014 von der GitOps-Adoption \u00fcber Progressive-Delivery-Plattformen bis hin zu Kostenoptimierungen, die bei Hydrolix allein \u00fcber zwei Jahre sch\u00e4tzungsweise CHF 642K+ an Einsparungen erzielt haben.",
      bio3: "In meiner Freizeit betreibe ich InfraBio, eine pers\u00f6nliche Marke, auf der ich SRE-Inhalte und Tools teile.",
    },
    stats: {
      years:    "Jahre SRE-Erfahrung",
      clusters: "Cluster unter GitOps",
      compute:  "Compute-Kostenreduktion",
      saved:    "Gespart bei Hydrolix (2 J.)",
      commits:  "GitHub Commits",
    },
    contact: {
      sub: "Offen f\u00fcr neue Stellen, Kooperationen oder ein Gespr\u00e4ch \u00fcber SRE, Kubernetes und Infrastrukturautomatisierung.",
      email: "Meeting buchen",
      copy: "yaigenes@infrabio.dev",
      copied: "\u2713 In Zwischenablage kopiert",
    },
    projectLabels: {
      problem: "Problem", solution: "L\u00f6sung", technologies: "Verwendete Technologien", outcome: "Ergebnis",
      showAll: "\u2193 Alle 10 Projekte anzeigen", showLess: "\u2191 Weniger anzeigen",
    },
  },
  fr: {
    nav: {
      about: "\u00c0 propos", experience: "Exp\u00e9rience", projects: "Projets",
      lab: "Laboratoire", contact: "Contact", viewCv: "Voir CV",
    },
    hero: {
      badge: "Blog & Portfolio Ing\u00e9nieur SRE",
      h1: "Fiabilit\u00e9",
      h1accent: " \u00e0 grande \u00e9chelle ",
      h2: "sur 234+ clusters Kubernetes",
      sub: "Ing\u00e9nieur SRE avec 5+ ans d\u2019exp\u00e9rience chez Hydrolix, Triggle, Knowmad mood et Accenture. Sp\u00e9cialis\u00e9 en GitOps, Kubernetes multi-cloud, optimisation des co\u00fbts et automatisation.",
      ctaAbout: "\u00c0 propos de moi",
      ctaCv: "T\u00e9l\u00e9charger CV",
    },
    sections: {
      about:      { title: "\u00c0 propos", accent: "de moi" },
      experience: { title: "Exp\u00e9rience", accent: "Professionnelle" },
      skills:     "Outils & Technologies",
      projects:   { title: "Projets",     accent: "Phares" },
      lab: {
        sub: "D\u00e9mos SRE en direct \u00b7 dans votre navigateur \u00b7 sans backend",
        sim: {
          tag: "co\u00fbt \u00b7 mod\u00e8le", clusters: "Clusters", monthlyBill: "Facture compute mensuelle (USD)",
          teamSize: "Taille de l\u2019\u00e9quipe SRE", hourlyRate: "Taux horaire SRE (USD)",
          eng: "ing\u00e9nieur", engs: "ing\u00e9nieurs",
          vpa: "D\u00e9ploiement VPA Fleet", gitops: "Automatisation GitOps",
          autoRem: "Alertes / Runbooks / Auto-R\u00e9m\u00e9diation",
          projected: "\u00c9conomies annuelles projet\u00e9es", payback: "retour en", weeks: "semaines",
          investment: "vs. 1 mois-SRE d\u2019investissement",
          wasteTitle: "Gaspillage estim\u00e9", autoCalc: "calcul\u00e9 automatiquement",
          largeFleet: "grande flotte", midFleet: "flotte moyenne", smallFleet: "petite flotte", typicalFleet: "flotte typique",
        },
        ci:   { run: "\u25b6  Lancer le pipeline", runAgain: "\u21ba  Relancer",      cancel: "\u25a0  Annuler"       },
        pods: { kill: "\u2717 Tuer le pod",         scaleUp:  "+ Scaler \u2191",        scaleDown: "\u2212 Scaler \u2193" },
      },
      contact:    { title: "Me", accent: "Contacter" },
    },
    about: {
      bio1: "Je suis Yaiser Avila Rodr\u00edguez, ing\u00e9nieur de fiabilit\u00e9 de site avec plus de 5 ans d\u2019exp\u00e9rience dans la construction et l\u2019exploitation d\u2019infrastructures Kubernetes \u00e0 grande \u00e9chelle sur AWS, GCP et Linode. Actuellement chez Hydrolix, o\u00f9 je g\u00e8re 234+ clusters dans trois r\u00e9gions cloud.",
      bio2: "Mon objectif est de transformer les op\u00e9rations manuelles en syst\u00e8mes automatis\u00e9s et observables \u2014 de l\u2019adoption GitOps aux plateformes de livraison progressive, jusqu\u2019aux initiatives d\u2019optimisation des co\u00fbts ayant permis d\u2019\u00e9conomiser plus de CHF 642K+ chez Hydrolix seul sur deux ans.",
      bio3: "En dehors du travail, je g\u00e8re InfraBio, une marque personnelle o\u00f9 je partage du contenu et des outils SRE.",
    },
    stats: {
      years:    "Ans d\u2019exp\u00e9rience SRE",
      clusters: "Clusters sous GitOps",
      compute:  "R\u00e9duction co\u00fbt compute",
      saved:    "\u00c9conomis\u00e9 chez Hydrolix (2 ans)",
      commits:  "Commits GitHub",
    },
    contact: {
      sub: "Ouvert aux nouvelles opportunit\u00e9s, collaborations, ou pour discuter de SRE, Kubernetes et automatisation d\u2019infrastructure.",
      email: "R\u00e9server une r\u00e9union",
      copy: "yaigenes@infrabio.dev",
      copied: "\u2713 Copi\u00e9 dans le presse-papier",
    },
    projectLabels: {
      problem: "Probl\u00e8me", solution: "Solution", technologies: "Technologies utilis\u00e9es", outcome: "R\u00e9sultat",
      showAll: "\u2193 Voir les 10 projets", showLess: "\u2191 R\u00e9duire",
    },
  },
};

export interface T {
  nav: { about: string; experience: string; projects: string; lab: string; contact: string; viewCv: string };
  hero: { badge: string; h1: string; h1accent: string; h2: string; sub: string; ctaAbout: string; ctaCv: string };
  sections: {
    about: { title: string; accent: string };
    experience: { title: string; accent: string };
    skills: string;
    projects: { title: string; accent: string };
    lab: {
      sub: string;
      sim: {
        tag: string; clusters: string; monthlyBill: string; teamSize: string; hourlyRate: string;
        eng: string; engs: string;
        vpa: string; gitops: string; autoRem: string;
        projected: string; payback: string; weeks: string; investment: string;
        wasteTitle: string; autoCalc: string;
        largeFleet: string; midFleet: string; smallFleet: string; typicalFleet: string;
      };
      ci:   { run: string; runAgain: string; cancel: string };
      pods: { kill: string; scaleUp: string; scaleDown: string };
    };
    contact: { title: string; accent: string };
  };
  about: { bio1: string; bio2: string; bio3: string };
  stats: { years: string; clusters: string; compute: string; saved: string; commits: string };
  contact: { sub: string; email: string; copy: string; copied: string };
  projectLabels: { problem: string; solution: string; technologies: string; outcome: string; showAll: string; showLess: string };
}

// ─── External store (useSyncExternalStore — React's official external-store API)

let _lang: Language = "en";
const _callbacks = new Set<() => void>();

function _subscribe(cb: () => void) {
  _callbacks.add(cb);
  return () => { _callbacks.delete(cb); };
}
function _getSnapshot(): Language { return _lang; }
function _getServerSnapshot(): Language { return "en"; }

export function setLanguage(lang: Language) {
  _lang = lang;
  if (typeof window !== "undefined") localStorage.setItem("portfolio-lang", lang);
  _callbacks.forEach(cb => cb());
}

// ─── Hook used by every component ─────────────────────────────────────────────

export function useLanguage() {
  const lang = useSyncExternalStore(_subscribe, _getSnapshot, _getServerSnapshot);

  // Restore persisted language on first client mount
  useEffect(() => {
    const stored = localStorage.getItem("portfolio-lang") as Language | null;
    if (stored && stored in translations && stored !== _lang) setLanguage(stored);
  }, []);

  return { language: lang, setLanguage, t: translations[lang] as T };
}

// ─── LanguageProvider kept for layout.tsx import compatibility ────────────────

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
