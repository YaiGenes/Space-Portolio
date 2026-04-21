import type { Language } from "@/context/LanguageContext";

// ─── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tech: string[];
}

const expEN: ExperienceEntry[] = [
  {
    company: "Hydrolix",
    role: "Site Reliability Engineer",
    period: "2024 – Present",
    location: "Remote",
    highlights: [
      "Reduced compute costs by 25.9% fleet-wide via Vertical Pod Autoscaler rollout across 200+ production clusters — cost per TB dropped from CHF 645 to CHF 479, with one cluster cutting node count by 74%, saving an estimated CHF 132K–263K/year",
      "Led company-wide GitOps adoption, migrating 200+ Kubernetes clusters from manual operations to a fully automated ArgoCD delivery pipeline — 234 clusters and 468 applications under continuous delivery, per-cluster change time cut from ~30 min to under 10 min",
      "Co-built ArgoCD + Kustomize + Argo Workflows rollout platform — before: 200 clusters, max 5 parallel, 30–45 min each + ~15 min validation per batch = ~35 hrs active SRE time over 3–4 weeks; after: 3–4 days, ~5–8 hrs oversight → ~30 hrs saved × 12 releases/yr ≈ 360 SRE-hrs/yr → est. CHF 36K/yr at CHF 100/hr Swiss fully-loaded rate",
      "Deployed observability coverage across all customer-facing Grafana instances that had zero monitoring — 25 Prometheus stacks with alerting, preventing customer-impacting outages from going undetected",
      "Built an automated OOM remediation system that detects recurring pod crashes and raises a GitOps change automatically, eliminating a 30–45 min on-call response for each event (~CHF 6K/year in avoided engineer time)",
      "Owned EMEA on-call and incident command for 10+ high-severity incidents; reduced triage time from 30–45 min to ~10 min using AI-assisted tooling; managed capacity for high-traffic events including Hulu Super Bowl and Viacom18 IPL with no capacity-related incidents",
      "1,468 GitHub commits and 50+ technical documents produced in 2 years; combined estimated financial impact CHF 642K+ in compute savings and avoided engineering time",
    ],
    tech: ["Kubernetes (LKE/EKS/GKE)", "ArgoCD", "Go", "Pulumi", "Prometheus", "Grafana", "Argo Workflows", "VPA", "Helm", "Terraform"],
  },
  {
    company: "Triggle Spain SLU",
    role: "DevOps / Cloud Engineer",
    period: "2023 – 2024",
    location: "Spain",
    highlights: [
      "Upgraded EKS clusters 1.24 → 1.29, reducing extended support costs by 82.5%",
      "Led 27% AWS platform cost reduction via autoscaling policies, cleanup crons, and resource right-sizing",
      "Managed a team of 3 engineers automating key infrastructure components",
      "Implemented Grafana OnCall + Prometheus alerting, replacing paid UptimeRobot subscription at zero cost",
    ],
    tech: ["Kubernetes (EKS)", "Terraform", "AWS", "ArgoCD", "Prometheus", "Grafana", "CAST AI"],
  },
  {
    company: "Knowmad mood",
    role: "DevOps Engineer",
    period: "2023",
    location: "Spain",
    highlights: [
      "Reduced Jenkins build times from 20 min to 5 min (75%) by integrating Docker layer cache stored in S3",
      "Implemented S3 cleanup lifecycle policies to control cache storage costs",
    ],
    tech: ["Docker", "Jenkins", "AWS S3", "AWS IAM"],
  },
  {
    company: "Accenture",
    role: "DevOps Engineer",
    period: "2022",
    location: "Spain",
    highlights: [
      "Built Branch Inspector tool using GitLab API + Python — cut CI build times by 80%",
      "Reduced EC2 Jenkins agent usage by 10% through stale branch detection and automated cleanup alerts",
      "Integrated Kubernetes ConfigMaps, Logstash, Prometheus, and Grafana dashboards for branch monitoring",
    ],
    tech: ["Python", "Kubernetes", "GitLab API", "Logstash", "Prometheus", "Grafana", "AWS SES"],
  },
];

const expDE: ExperienceEntry[] = [
  {
    company: "Hydrolix",
    role: "Site Reliability Engineer",
    period: "2024 – Heute",
    location: "Remote",
    highlights: [
      "Compute-Kosten fleet-weit um 25,9 % reduziert durch Rollout des Vertical Pod Autoscaler auf 200+ Produktions-Cluster — Kosten pro TB von CHF 645 auf CHF 479 gesunken; ein Cluster reduzierte die Node-Anzahl um 74 % und spart geschätzte CHF 132K–263K/Jahr",
      "Unternehmensweite GitOps-Einführung geleitet — 200+ Kubernetes-Cluster von manuellen Operationen auf vollautomatische ArgoCD-Delivery-Pipeline migriert; 234 Cluster und 468 Anwendungen unter Continuous Delivery, Änderungszeit pro Cluster von ~30 Min. auf unter 10 Min. reduziert",
      "ArgoCD + Kustomize + Argo Workflows Rollout-Plattform mitentwickelt — vorher: 200 Cluster, max. 5 parallel, 30–45 Min. je + ~15 Min. Validierung/Batch = ~35 Std. aktive SRE-Zeit über 3–4 Wochen; nachher: 3–4 Tage, ~5–8 Std. Oversight → ~30 Std. gespart × 12 Releases/Jahr ≈ 360 SRE-Std./Jahr → ca. CHF 36K/Jahr (Schweizer Vollkostensatz CHF 100/Std.)",
      "Observability-Abdeckung auf allen kundenseitigen Grafana-Instanzen ohne vorherige Überwachung eingeführt — 25 Prometheus-Stacks mit Alerting, um unbemerkte kundenwirksame Ausfälle zu verhindern",
      "Automatisiertes OOM-Remediation-System entwickelt, das wiederkehrende Pod-Abstürze erkennt und automatisch GitOps-Änderungen auslöst — eliminiert 30–45 Min. On-Call-Reaktion pro Ereignis (~CHF 6K/Jahr eingesparte Ingenieurzeit)",
      "EMEA On-Call und Incident Command für 10+ schwerwiegende Incidents verantwortet; Triage-Zeit von 30–45 Min. auf ~10 Min. reduziert durch KI-gestützte Tools; Kapazität für hochfrequentierte Events wie Hulu Super Bowl und Viacom18 IPL ohne kapazitätsbedingte Incidents gemanagt",
      "1.468 GitHub-Commits und 50+ technische Dokumente in 2 Jahren erstellt; geschätzter Gesamtfinanzeffekt CHF 642K+ an Compute-Einsparungen und vermiedenen Engineering-Kosten",
    ],
    tech: ["Kubernetes (LKE/EKS/GKE)", "ArgoCD", "Go", "Pulumi", "Prometheus", "Grafana", "Argo Workflows", "VPA", "Helm", "Terraform"],
  },
  {
    company: "Triggle Spain SLU",
    role: "DevOps / Cloud Engineer",
    period: "2023 – 2024",
    location: "Spanien",
    highlights: [
      "EKS-Cluster von 1.24 auf 1.29 aktualisiert, Extended-Support-Kosten um 82,5 % reduziert",
      "27 % AWS-Plattformkostenreduktion geleitet durch Autoscaling-Policies, Cleanup-Crons und Resource Right-Sizing",
      "Team von 3 Ingenieuren bei der Automatisierung zentraler Infrastrukturkomponenten geführt",
      "Grafana OnCall + Prometheus-Alerting implementiert — kostenpflichtige UptimeRobot-Subscription kostenlos ersetzt",
    ],
    tech: ["Kubernetes (EKS)", "Terraform", "AWS", "ArgoCD", "Prometheus", "Grafana", "CAST AI"],
  },
  {
    company: "Knowmad mood",
    role: "DevOps Engineer",
    period: "2023",
    location: "Spanien",
    highlights: [
      "Jenkins-Build-Zeiten von 20 Min. auf 5 Min. (75 %) reduziert durch Docker-Layer-Cache in S3",
      "S3-Cleanup-Lifecycle-Policies zur Kontrolle der Cache-Speicherkosten implementiert",
    ],
    tech: ["Docker", "Jenkins", "AWS S3", "AWS IAM"],
  },
  {
    company: "Accenture",
    role: "DevOps Engineer",
    period: "2022",
    location: "Spanien",
    highlights: [
      "Branch Inspector Tool mit GitLab API + Python entwickelt — CI-Build-Zeiten um 80 % reduziert",
      "EC2 Jenkins Agent-Nutzung durch veraltete Branch-Erkennung und automatische Cleanup-Alerts um 10 % reduziert",
      "Kubernetes ConfigMaps, Logstash, Prometheus und Grafana-Dashboards für Branch-Monitoring integriert",
    ],
    tech: ["Python", "Kubernetes", "GitLab API", "Logstash", "Prometheus", "Grafana", "AWS SES"],
  },
];

const expFR: ExperienceEntry[] = [
  {
    company: "Hydrolix",
    role: "Site Reliability Engineer",
    period: "2024 – Présent",
    location: "Télétravail",
    highlights: [
      "Réduction des coûts de calcul de 25,9 % sur l'ensemble de la flotte via le déploiement du VPA sur 200+ clusters de production — coût par To passé de CHF 645 à CHF 479 ; un cluster a réduit son nombre de nœuds de 74 %, économisant CHF 132K–263K/an",
      "Conduit l'adoption GitOps à l'échelle de l'entreprise — migration de 200+ clusters Kubernetes d'opérations manuelles vers un pipeline ArgoCD entièrement automatisé ; 234 clusters et 468 applications sous livraison continue, temps de modification par cluster réduit de ~30 min à moins de 10 min",
      "Co-développé la plateforme ArgoCD + Kustomize + Argo Workflows — avant : 200 clusters, max 5 en parallèle, 30–45 min chacun + ~15 min de validation par lot = ~35 h de travail SRE sur 3–4 semaines ; après : 3–4 jours, ~5–8 h de supervision → ~30 h économisées × 12 releases/an ≈ 360 h-SRE/an → est. CHF 36K/an (coût SRE complet suisse CHF 100/h)",
      "Déployé une couverture d'observabilité sur toutes les instances Grafana client sans surveillance préalable — 25 stacks Prometheus avec alerting, empêchant les pannes impactant les clients de passer inaperçues",
      "Développé un système automatisé de remédiation OOM détectant les crashs de pods récurrents et déclenchant automatiquement un changement GitOps — élimine une réponse on-call de 30–45 min par événement (~CHF 6K/an en temps ingénieur évité)",
      "Assuré la permanence EMEA on-call et le commandement d'incidents pour 10+ incidents de haute gravité ; réduit le temps de triage de 30–45 min à ~10 min grâce aux outils assistés par IA ; géré la capacité pour le Super Bowl Hulu et l'IPL Viacom18 sans incident de capacité",
      "1 468 commits GitHub et 50+ documents techniques produits en 2 ans ; impact financier total estimé à CHF 642K+ en économies de calcul et coûts d'ingénierie évités",
    ],
    tech: ["Kubernetes (LKE/EKS/GKE)", "ArgoCD", "Go", "Pulumi", "Prometheus", "Grafana", "Argo Workflows", "VPA", "Helm", "Terraform"],
  },
  {
    company: "Triggle Spain SLU",
    role: "Ingénieur DevOps / Cloud",
    period: "2023 – 2024",
    location: "Espagne",
    highlights: [
      "Mise à niveau des clusters EKS de 1.24 à 1.29, réduction des coûts de support étendu de 82,5 %",
      "Conduit une réduction de 27 % des coûts AWS via des politiques d'autoscaling, des crons de nettoyage et un redimensionnement des ressources",
      "Géré une équipe de 3 ingénieurs automatisant les composants clés de l'infrastructure",
      "Implémenté Grafana OnCall + alerting Prometheus, remplaçant l'abonnement UptimeRobot à coût zéro",
    ],
    tech: ["Kubernetes (EKS)", "Terraform", "AWS", "ArgoCD", "Prometheus", "Grafana", "CAST AI"],
  },
  {
    company: "Knowmad mood",
    role: "Ingénieur DevOps",
    period: "2023",
    location: "Espagne",
    highlights: [
      "Temps de build Jenkins réduits de 20 min à 5 min (75 %) en intégrant un cache de couches Docker dans S3",
      "Politiques de cycle de vie S3 pour contrôler les coûts de stockage du cache mises en place",
    ],
    tech: ["Docker", "Jenkins", "AWS S3", "AWS IAM"],
  },
  {
    company: "Accenture",
    role: "Ingénieur DevOps",
    period: "2022",
    location: "Espagne",
    highlights: [
      "Développé l'outil Branch Inspector avec GitLab API + Python — temps de build CI réduits de 80 %",
      "Utilisation des agents EC2 Jenkins réduite de 10 % grâce à la détection de branches obsolètes et aux alertes automatisées",
      "Intégration de ConfigMaps Kubernetes, Logstash, Prometheus et tableaux de bord Grafana pour la surveillance des branches",
    ],
    tech: ["Python", "Kubernetes", "GitLab API", "Logstash", "Prometheus", "Grafana", "AWS SES"],
  },
];

export const experiences: Record<Language, ExperienceEntry[]> = { en: expEN, de: expDE, fr: expFR };

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface ProjectEntry {
  company: string;
  src: string;
  title: string;
  description: string;
  soldescription: string;
  techdescription: string;
  outdescription: string;
  impactStat?: string;
  impactLabel?: string;
  githubUrl?: string;
}

const projEN: ProjectEntry[] = [
  {
    company: "Hydrolix (2024 – Present)",
    src: "/first_project.webp",
    title: "VPA Fleet Rollout — 25.9% Compute Cost Reduction",
    description: "Merge-peer pods across 200+ production clusters were statically over-provisioned. Resources were allocated based on peak estimates, not actual usage, resulting in significant compute waste. When traffic spiked, engineers were manually paged to bump memory limits — a recurring, time-consuming process.",
    soldescription: "Led the Vertical Pod Autoscaler (VPA) rollout across all production Kubernetes clusters in a phased, region-gated approach. Designed the alerting stack, built a before/after cost dashboard in Grafana, and documented a formal cost-impact assessment. Proposed and drove expansion to the next region.",
    techdescription: "Kubernetes (LKE), VPA, Prometheus, Grafana, ArgoCD, Pulumi, Go",
    outdescription: "25.9% reduction in normalised cost per TB ($824 → $611). One cluster cut node count by 74%, saving an estimated $168K–$336K/year. Conservative fleet-wide saving: $80K–$140K+/year.",
    impactStat: "-25.9%",
    impactLabel: "compute cost per TB",
  },
  {
    company: "Hydrolix (2024 – Present)",
    src: "/third_project.webp",
    title: "ArgoCD / GitOps Adoption — 234 Clusters Under Automation",
    description: "The SRE team was managing 200+ Kubernetes clusters entirely through manual kubectl operations. Every cluster upgrade, config change, or drift fix required direct cluster access. There was no drift detection, no audit trail, and a fleet-wide change could require editing hundreds of files individually.",
    soldescription: "Led the company's full ArgoCD/GitOps adoption from scratch. Designed the labeling architecture for region-based rollouts (Americas/APJ/EMEA), established 6 ArgoCD worker clusters, and authored the operational guides and architecture documentation adopted by the entire SRE team.",
    techdescription: "ArgoCD, Kubernetes (LKE/EKS/GKE), Kustomize, Pulumi, GitHub Actions, AWS EKS",
    outdescription: "234 clusters and 468 applications under fully automated delivery. Per-cluster change time cut from ~30 min to under 10 min. Drift auto-detected. Foundation for all subsequent infrastructure automation.",
    impactStat: "234",
    impactLabel: "clusters under GitOps",
  },
  {
    company: "Hydrolix (2024 – Present)",
    src: "/docker.webp",
    title: "HDX Rollouts Platform — Progressive Delivery for 200 Clusters",
    description: "Upgrading the Hydrolix fleet (~200 LKE clusters) was entirely manual: engineers coordinated through Slack and a Google Sheet, checking each cluster individually after applying changes. No batching, no health checks, no auto-retry. A failed upgrade could propagate undetected across the entire fleet.",
    soldescription: "Co-designed and built a progressive delivery platform for orchestrating fleet-wide upgrades. Features: region-based targeting (Americas/APJ/EMEA), health-gated batch promotion (5 clusters at a time), real-time DAG visualisation via WebSocket, automated pre/post health checks, auto-skip after 3 retries, and scheduled rollout support.",
    techdescription: "Go, React, WebSocket, Kubernetes (LKE), ArgoCD, Prometheus, Grafana, Argo Workflows",
    outdescription: "Replaced 17–50 engineer-hours of manual coordination per release cycle with a fully automated, health-gated pipeline. Real-time DAG visibility into fleet upgrade state. One-click rollback.",
    impactStat: "~200",
    impactLabel: "clusters automated",
  },
  {
    company: "Triggle Spain SLU (2024)",
    src: "/leadership.webp",
    title: "EKS Upgrade 1.24 → 1.29 — 82.5% Extended Support Cost Reduction",
    description: "EKS clusters were running version 1.24, which had entered extended support — priced at 6× the standard rate. With no upgrade plan in place, costs were compounding monthly.",
    soldescription: "Oversaw the full upgrade path from EKS 1.24 to 1.29 using Terraform and Velero for workload backup. Managed a team of 3 engineers automating key infrastructure components and autoscaling group configurations throughout the process.",
    techdescription: "Terraform, Terraformer, Velero, Kubernetes (EKS), AWS Auto Scaling",
    outdescription: "82.5% reduction in extended support costs. Enhanced system scalability and reliability post-upgrade.",
    impactStat: "-82.5%",
    impactLabel: "extended support cost",
  },
  {
    company: "Triggle Spain SLU (2023)",
    src: "/second_project.webp",
    title: "CI/CD Automation and Deployment Acceleration",
    description: "The CI/CD process was entirely manual, prone to human errors, and slow — delaying the deployment of new features to production.",
    soldescription: "Automated the full CI/CD pipeline with concurrent builds and Docker layer caching. Overhauled deployment methodologies and introduced automation scripts that streamlined the end-to-end deployment process.",
    techdescription: "AWS CodeBuild, Bitbucket, Lambda, API Gateway, Python, Bash",
    outdescription: "Deployment and build times reduced by 5×. Enhanced consistency and reliability across all deployments.",
  },
  {
    company: "Triggle Spain SLU (2024)",
    src: "/boats.webp",
    title: "AWS Platform Cost Optimisation — 27% Reduction",
    description: "Over-provisioned resources, suboptimal allocation, and the lack of effective autoscaling and cleanup policies were generating significant unnecessary AWS spend.",
    soldescription: "Led a cost reduction initiative across AWS accounts: enhanced autoscaling capabilities, implemented cleanup lifecycle policies, automated resource cleanup via crons, and revised resource allocation to match actual usage patterns.",
    techdescription: "AWS, ArgoCD, CodeBuild, Terraform, CAST AI",
    outdescription: "27% reduction in overall platform costs via autoscaling and cleanup policies. Improved budget efficiency and resource utilisation.",
    impactStat: "-27%",
    impactLabel: "platform costs",
  },
  {
    company: "Triggle Spain SLU (2024)",
    src: "/sixth_project.webp",
    title: "Zero-Cost On-Call Platform with Grafana OnCall",
    description: "The team was paying for an UptimeRobot subscription to handle on-call alerting throughout the week.",
    soldescription: "Replaced UptimeRobot by installing Grafana OnCall and wiring it to a Telegram channel using the existing Prometheus and Grafana stack. Triggers a call whenever a service goes down.",
    techdescription: "Prometheus, Grafana, Grafana OnCall, Telegram",
    outdescription: "Eliminated the on-call platform subscription cost entirely. Only ongoing cost is development and maintenance time.",
  },
  {
    company: "Accenture (2022)",
    src: "/fifth_project.webp",
    title: "Branch Inspector — 80% CI Build Time Reduction",
    description: "Build times were slow due to repositories accumulating undeleted branches. A tool was needed to detect stale branches and alert developers before they caused dependency-tracking bottlenecks.",
    soldescription: "Built a tool using the GitLab API and Python that identifies branches older than 30 days. Configuration lives in a Kubernetes ConfigMap, integrated via a cron job that feeds data to Logstash, Prometheus, and Grafana. An alarm system alerts branch owners and flags branches for deletion.",
    techdescription: "Python, Kubernetes, GitLab API, Logstash, Prometheus, Grafana, AWS SES",
    outdescription: "80% reduction in CI build times. 10% reduction in EC2 Jenkins agent usage. Managers gained real-time branch visibility via Grafana dashboards.",
    impactStat: "-80%",
    impactLabel: "CI build time",
  },
  {
    company: "Knowmad mood (2023)",
    src: "/seventh_project.webp",
    title: "Docker Build Cache in S3 — 75% Build Time Reduction",
    description: "Jenkins build times for Python and Node.js projects averaged 20 minutes, creating a bottleneck for every deployment cycle.",
    soldescription: "Integrated a Docker layer cache stored in an S3 bucket into the Jenkins pipelines. Implemented S3 lifecycle policies to manage cache storage costs automatically.",
    techdescription: "Docker, Jenkins, AWS S3, AWS IAM, S3 Lifecycle Policies",
    outdescription: "Build time cut from 20 minutes to 5 minutes — a 4× improvement in build speed.",
    impactStat: "-75%",
    impactLabel: "build time",
  },
  {
    company: "Personal — InfraBio (2024)",
    src: "/forth_project.webp",
    title: "LinkedIn Auto-Posts — Personal Brand Automation",
    description: "Manual LinkedIn posting was time-consuming and inconsistent, making it hard to maintain a steady presence as part of a personal brand strategy.",
    soldescription: "Built a two-part system: a CRUD interface to manage post drafts, and a Cloudflare Worker that retrieves posts from a Turso SQLite database and publishes them via the LinkedIn API at optimal times.",
    techdescription: "React.js, Node.js, Turso SQLite, Cloudflare Workers, Wrangler",
    outdescription: "Significantly increased posting consistency and LinkedIn presence. Freed up weekly time for learning and other projects.",
    githubUrl: "https://github.com/YaiGenes",
  },
];

const projDE: ProjectEntry[] = [
  {
    company: "Hydrolix (2024 – Heute)",
    src: "/first_project.webp",
    title: "VPA Fleet-Rollout — 25,9 % Compute-Kostenreduktion",
    description: "Pods in 200+ Produktions-Clustern waren statisch überprovisioniert. Ressourcen wurden auf Basis von Peak-Schätzungen zugewiesen, nicht nach tatsächlicher Nutzung, was zu erheblicher Compute-Verschwendung führte. Bei Traffic-Spitzen wurden Ingenieure manuell benachrichtigt, um Speicherlimits anzupassen — ein wiederkehrender, zeitaufwändiger Prozess.",
    soldescription: "VPA-Rollout auf alle Produktions-Kubernetes-Cluster in einem phasenbasierten, regionsgated Ansatz geleitet. Alerting-Stack konzipiert, Before/After-Kosten-Dashboard in Grafana erstellt und formale Kostenwirkungsanalyse dokumentiert. Ausweitung auf die nächste Region vorgeschlagen und vorangetrieben.",
    techdescription: "Kubernetes (LKE), VPA, Prometheus, Grafana, ArgoCD, Pulumi, Go",
    outdescription: "25,9 % Reduktion der normalisierten Kosten pro TB ($824 → $611). Ein Cluster reduzierte die Node-Anzahl um 74 % und spart geschätzte $168K–$336K/Jahr. Konservative fleet-weite Einsparung: $80K–$140K+/Jahr.",
    impactStat: "-25.9%",
    impactLabel: "Compute-Kosten pro TB",
  },
  {
    company: "Hydrolix (2024 – Heute)",
    src: "/third_project.webp",
    title: "ArgoCD / GitOps-Einführung — 234 Cluster unter Automatisierung",
    description: "Das SRE-Team verwaltete 200+ Kubernetes-Cluster ausschließlich über manuelle kubectl-Operationen. Jedes Upgrade, jede Konfigurationsänderung oder Drift-Korrektur erforderte direkten Cluster-Zugriff. Es gab keine Drift-Erkennung, keinen Audit-Trail, und eine fleet-weite Änderung konnte das manuelle Bearbeiten von Hunderten von Dateien erfordern.",
    soldescription: "GitOps/ArgoCD-Einführung im Unternehmen von Grund auf geleitet. Labeling-Architektur für regionenbasierte Rollouts (Americas/APJ/EMEA) konzipiert, 6 ArgoCD Worker-Cluster aufgebaut und Betriebsanleitungen sowie Architekturdokumentation verfasst, die vom gesamten SRE-Team übernommen wurden.",
    techdescription: "ArgoCD, Kubernetes (LKE/EKS/GKE), Kustomize, Pulumi, GitHub Actions, AWS EKS",
    outdescription: "234 Cluster und 468 Anwendungen unter vollautomatischer Lieferung. Änderungszeit pro Cluster von ~30 Min. auf unter 10 Min. reduziert. Drift automatisch erkannt. Grundlage für alle nachfolgende Infrastrukturautomatisierung.",
    impactStat: "234",
    impactLabel: "Cluster unter GitOps",
  },
  {
    company: "Hydrolix (2024 – Heute)",
    src: "/docker.webp",
    title: "HDX Rollouts-Plattform — Progressive Delivery für 200 Cluster",
    description: "Das Upgrade des Hydrolix-Fleets (~200 LKE-Cluster) war vollständig manuell: Ingenieure koordinierten sich über Slack und eine Google-Tabelle und überprüften jeden Cluster einzeln. Kein Batching, keine Health Checks, kein Auto-Retry. Ein fehlgeschlagenes Upgrade konnte unbemerkt über den gesamten Fleet propagieren.",
    soldescription: "Progressive-Delivery-Plattform für fleet-weite Upgrades mitentwickelt. Funktionen: regionenbasiertes Targeting (Americas/APJ/EMEA), health-gated Batch-Promotion (5 Cluster gleichzeitig), Echtzeit-DAG-Visualisierung via WebSocket, automatische Pre/Post-Health-Checks, Auto-Skip nach 3 Retries und Unterstützung für geplante Rollouts.",
    techdescription: "Go, React, WebSocket, Kubernetes (LKE), ArgoCD, Prometheus, Grafana, Argo Workflows",
    outdescription: "17–50 Ingenieur-Stunden manueller Koordination pro Release-Zyklus durch vollautomatische, health-gated Pipeline ersetzt. Echtzeit-DAG-Sichtbarkeit über den Fleet-Upgrade-Status. Ein-Klick-Rollback.",
    impactStat: "~200",
    impactLabel: "Cluster automatisiert",
  },
  {
    company: "Triggle Spain SLU (2024)",
    src: "/leadership.webp",
    title: "EKS-Upgrade 1.24 → 1.29 — 82,5 % Reduzierung der Extended-Support-Kosten",
    description: "Die EKS-Cluster liefen auf Version 1.24, die Extended Support eingegangen war — berechnet zum 6-fachen Standardpreis. Ohne Upgrade-Plan häuften sich die Kosten monatlich an.",
    soldescription: "Vollständigen Upgrade-Pfad von EKS 1.24 auf 1.29 mit Terraform und Velero für Workload-Backups überwacht. Team von 3 Ingenieuren bei der Automatisierung zentraler Infrastrukturkomponenten geführt.",
    techdescription: "Terraform, Terraformer, Velero, Kubernetes (EKS), AWS Auto Scaling",
    outdescription: "82,5 % Reduzierung der Extended-Support-Kosten. Verbesserte Skalierbarkeit und Zuverlässigkeit nach dem Upgrade.",
    impactStat: "-82.5%",
    impactLabel: "Extended-Support-Kosten",
  },
  {
    company: "Triggle Spain SLU (2023)",
    src: "/second_project.webp",
    title: "CI/CD-Automatisierung und Deployment-Beschleunigung",
    description: "Der CI/CD-Prozess war vollständig manuell, fehleranfällig und langsam — was die Bereitstellung neuer Features in die Produktion verzögerte.",
    soldescription: "Vollständige CI/CD-Pipeline mit parallelen Builds und Docker-Layer-Caching automatisiert. Deployment-Methoden überarbeitet und Automatisierungsskripte eingeführt, die den End-to-End-Deployment-Prozess optimieren.",
    techdescription: "AWS CodeBuild, Bitbucket, Lambda, API Gateway, Python, Bash",
    outdescription: "Deployment- und Build-Zeiten um das 5-fache reduziert. Verbesserte Konsistenz und Zuverlässigkeit über alle Deployments hinweg.",
  },
  {
    company: "Triggle Spain SLU (2024)",
    src: "/boats.webp",
    title: "AWS-Plattform-Kostenoptimierung — 27 % Reduktion",
    description: "Überprovisionierte Ressourcen, suboptimale Zuweisung und fehlende effektive Autoscaling- und Cleanup-Policies generierten erhebliche unnötige AWS-Ausgaben.",
    soldescription: "Kostenreduktionsinitiative über AWS-Konten geleitet: Autoscaling verbessert, Cleanup-Lifecycle-Policies implementiert, automatisches Ressourcen-Cleanup via Crons und Ressourcenzuweisung an tatsächliche Nutzungsmuster angepasst.",
    techdescription: "AWS, ArgoCD, CodeBuild, Terraform, CAST AI",
    outdescription: "27 % Reduzierung der Gesamtplattformkosten durch Autoscaling und Cleanup-Policies. Verbesserte Budget-Effizienz und Ressourcennutzung.",
    impactStat: "-27%",
    impactLabel: "Plattformkosten",
  },
  {
    company: "Triggle Spain SLU (2024)",
    src: "/sixth_project.webp",
    title: "Kostenlose On-Call-Plattform mit Grafana OnCall",
    description: "Das Team bezahlte für ein UptimeRobot-Abonnement für On-Call-Alerting während der Woche.",
    soldescription: "UptimeRobot durch Installation von Grafana OnCall ersetzt und mit einem Telegram-Kanal über den bestehenden Prometheus- und Grafana-Stack verbunden. Löst einen Anruf aus, wenn ein Dienst ausfällt.",
    techdescription: "Prometheus, Grafana, Grafana OnCall, Telegram",
    outdescription: "On-Call-Plattform-Abonnementkosten vollständig eliminiert. Einzige laufende Kosten sind Entwicklungs- und Wartungszeit.",
  },
  {
    company: "Accenture (2022)",
    src: "/fifth_project.webp",
    title: "Branch Inspector — 80 % CI-Build-Zeit-Reduktion",
    description: "Build-Zeiten waren langsam, da sich in Repositories nicht gelöschte Branches angehäuft hatten. Ein Tool war nötig, um veraltete Branches zu erkennen und Entwickler zu warnen, bevor sie zu Engpässen führen.",
    soldescription: "Tool mit GitLab API und Python entwickelt, das Branches erkennt, die älter als 30 Tage sind. Konfiguration liegt in einem Kubernetes ConfigMap, integriert via Cron-Job, der Daten an Logstash, Prometheus und Grafana liefert. Alarmsystem warnt Branch-Eigentümer und markiert Branches zur Löschung.",
    techdescription: "Python, Kubernetes, GitLab API, Logstash, Prometheus, Grafana, AWS SES",
    outdescription: "80 % Reduktion der CI-Build-Zeiten. 10 % Reduktion der EC2 Jenkins Agent-Nutzung. Manager erhielten Echtzeit-Branch-Sichtbarkeit via Grafana-Dashboards.",
    impactStat: "-80%",
    impactLabel: "CI-Build-Zeit",
  },
  {
    company: "Knowmad mood (2023)",
    src: "/seventh_project.webp",
    title: "Docker Build Cache in S3 — 75 % Build-Zeit-Reduktion",
    description: "Jenkins-Build-Zeiten für Python- und Node.js-Projekte betrugen im Durchschnitt 20 Minuten — ein Engpass für jeden Deployment-Zyklus.",
    soldescription: "Docker-Layer-Cache in einem S3-Bucket in die Jenkins-Pipelines integriert. S3-Lifecycle-Policies zur automatischen Verwaltung der Cache-Speicherkosten implementiert.",
    techdescription: "Docker, Jenkins, AWS S3, AWS IAM, S3 Lifecycle Policies",
    outdescription: "Build-Zeit von 20 Minuten auf 5 Minuten reduziert — eine 4-fache Verbesserung der Build-Geschwindigkeit.",
    impactStat: "-75%",
    impactLabel: "Build-Zeit",
  },
  {
    company: "Personal — InfraBio (2024)",
    src: "/forth_project.webp",
    title: "LinkedIn Auto-Posts — Personal Brand Automatisierung",
    description: "Manuelles LinkedIn-Posting war zeitaufwändig und inkonsistent, was es schwierig machte, eine stetige Präsenz als Teil einer Personal-Branding-Strategie aufrechtzuerhalten.",
    soldescription: "Zweiteiliges System entwickelt: eine CRUD-Schnittstelle zur Verwaltung von Post-Entwürfen und ein Cloudflare Worker, der Posts aus einer Turso SQLite-Datenbank abruft und über die LinkedIn API zu optimalen Zeiten veröffentlicht.",
    techdescription: "React.js, Node.js, Turso SQLite, Cloudflare Workers, Wrangler",
    outdescription: "Posting-Konsistenz und LinkedIn-Präsenz deutlich erhöht. Wöchentliche Zeit für Lernen und andere Projekte freigesetzt.",
    githubUrl: "https://github.com/YaiGenes",
  },
];

const projFR: ProjectEntry[] = [
  {
    company: "Hydrolix (2024 – Présent)",
    src: "/first_project.webp",
    title: "Déploiement VPA Fleet — Réduction de 25,9 % des coûts de calcul",
    description: "Les pods sur 200+ clusters de production étaient statiquement sur-provisionnés. Les ressources étaient allouées sur la base d'estimations de pic, non de l'utilisation réelle, entraînant un gaspillage de calcul significatif. Lors des pics de trafic, les ingénieurs étaient alertés manuellement pour augmenter les limites mémoire — un processus récurrent et chronophage.",
    soldescription: "Conduit le déploiement du VPA sur tous les clusters Kubernetes de production selon une approche phasée avec validation régionale. Conçu la pile d'alerting, créé un tableau de bord avant/après dans Grafana et documenté une évaluation formelle d'impact financier. Proposé et conduit l'expansion à la région suivante.",
    techdescription: "Kubernetes (LKE), VPA, Prometheus, Grafana, ArgoCD, Pulumi, Go",
    outdescription: "Réduction de 25,9 % du coût normalisé par To ($824 → $611). Un cluster a réduit son nombre de nœuds de 74 %, économisant $168K–$336K/an. Économie conservative sur l'ensemble de la flotte : $80K–$140K+/an.",
    impactStat: "-25.9%",
    impactLabel: "coût de calcul par To",
  },
  {
    company: "Hydrolix (2024 – Présent)",
    src: "/third_project.webp",
    title: "Adoption ArgoCD / GitOps — 234 clusters sous automatisation",
    description: "L'équipe SRE gérait 200+ clusters Kubernetes entièrement via des opérations kubectl manuelles. Chaque mise à niveau, modification de configuration ou correction de dérive nécessitait un accès direct au cluster. Il n'y avait pas de détection de dérive, pas de piste d'audit, et un changement à l'échelle de la flotte pouvait nécessiter l'édition manuelle de centaines de fichiers.",
    soldescription: "Conduit l'adoption complète ArgoCD/GitOps dans l'entreprise depuis zéro. Conçu l'architecture de labeling pour les déploiements régionaux (Amériques/APJ/EMEA), établi 6 clusters workers ArgoCD, et rédigé les guides opérationnels et la documentation d'architecture adoptés par toute l'équipe SRE.",
    techdescription: "ArgoCD, Kubernetes (LKE/EKS/GKE), Kustomize, Pulumi, GitHub Actions, AWS EKS",
    outdescription: "234 clusters et 468 applications sous livraison entièrement automatisée. Temps de modification par cluster réduit de ~30 min à moins de 10 min. Dérive auto-détectée. Fondation de toute l'automatisation d'infrastructure ultérieure.",
    impactStat: "234",
    impactLabel: "clusters sous GitOps",
  },
  {
    company: "Hydrolix (2024 – Présent)",
    src: "/docker.webp",
    title: "Plateforme HDX Rollouts — Livraison progressive pour 200 clusters",
    description: "La mise à niveau du fleet Hydrolix (~200 clusters LKE) était entièrement manuelle : les ingénieurs se coordonnaient via Slack et une feuille Google, vérifiant chaque cluster individuellement. Aucun batching, aucun contrôle de santé, aucune retry automatique. Un upgrade raté pouvait se propager sans être détecté.",
    soldescription: "Co-conçu et développé une plateforme de livraison progressive pour orchestrer les mises à niveau du fleet. Fonctionnalités : ciblage régional (Amériques/APJ/EMEA), promotion par lot avec validation de santé (5 clusters à la fois), visualisation DAG en temps réel via WebSocket, contrôles de santé pré/post automatiques, auto-skip après 3 tentatives et support des déploiements planifiés.",
    techdescription: "Go, React, WebSocket, Kubernetes (LKE), ArgoCD, Prometheus, Grafana, Argo Workflows",
    outdescription: "17–50 heures-ingénieur de coordination manuelle par release remplacées par un pipeline entièrement automatisé. Visibilité DAG en temps réel. Rollback en un clic.",
    impactStat: "~200",
    impactLabel: "clusters automatisés",
  },
  {
    company: "Triggle Spain SLU (2024)",
    src: "/leadership.webp",
    title: "Mise à niveau EKS 1.24 → 1.29 — Réduction de 82,5 % des coûts de support étendu",
    description: "Les clusters EKS fonctionnaient sous la version 1.24, entrée en support étendu — facturée à 6× le tarif standard. Sans plan de mise à niveau, les coûts s'accumulaient chaque mois.",
    soldescription: "Supervisé le chemin de mise à niveau complet d'EKS 1.24 à 1.29 avec Terraform et Velero pour les sauvegardes. Géré une équipe de 3 ingénieurs automatisant les composants clés d'infrastructure.",
    techdescription: "Terraform, Terraformer, Velero, Kubernetes (EKS), AWS Auto Scaling",
    outdescription: "Réduction de 82,5 % des coûts de support étendu. Évolutivité et fiabilité du système améliorées après la mise à niveau.",
    impactStat: "-82.5%",
    impactLabel: "coût de support étendu",
  },
  {
    company: "Triggle Spain SLU (2023)",
    src: "/second_project.webp",
    title: "Automatisation CI/CD et accélération des déploiements",
    description: "Le processus CI/CD était entièrement manuel, sujet aux erreurs humaines et lent — retardant le déploiement de nouvelles fonctionnalités en production.",
    soldescription: "Pipeline CI/CD complète automatisée avec des builds en parallèle et du cache de couches Docker. Méthodologies de déploiement remaniées et scripts d'automatisation introduits.",
    techdescription: "AWS CodeBuild, Bitbucket, Lambda, API Gateway, Python, Bash",
    outdescription: "Temps de déploiement et de build réduits de 5×. Cohérence et fiabilité améliorées sur tous les déploiements.",
  },
  {
    company: "Triggle Spain SLU (2024)",
    src: "/boats.webp",
    title: "Optimisation des coûts AWS — Réduction de 27 %",
    description: "Des ressources sur-provisionnées, une allocation sous-optimale et l'absence de politiques efficaces d'autoscaling et de nettoyage généraient des dépenses AWS inutiles significatives.",
    soldescription: "Conduit une initiative de réduction des coûts sur les comptes AWS : amélioration des capacités d'autoscaling, mise en place de politiques de cycle de vie pour le nettoyage, automatisation via des crons et révision de l'allocation des ressources.",
    techdescription: "AWS, ArgoCD, CodeBuild, Terraform, CAST AI",
    outdescription: "Réduction de 27 % des coûts totaux de la plateforme. Efficacité budgétaire et utilisation des ressources améliorées.",
    impactStat: "-27%",
    impactLabel: "coûts de la plateforme",
  },
  {
    company: "Triggle Spain SLU (2024)",
    src: "/sixth_project.webp",
    title: "Plateforme on-call sans coût avec Grafana OnCall",
    description: "L'équipe payait un abonnement UptimeRobot pour gérer les alertes on-call tout au long de la semaine.",
    soldescription: "Remplacement d'UptimeRobot par l'installation de Grafana OnCall et sa connexion à un canal Telegram via la stack Prometheus et Grafana existante. Déclenche un appel dès qu'un service tombe.",
    techdescription: "Prometheus, Grafana, Grafana OnCall, Telegram",
    outdescription: "Coût d'abonnement à la plateforme on-call entièrement éliminé. Seul coût continu : le temps de développement et de maintenance.",
  },
  {
    company: "Accenture (2022)",
    src: "/fifth_project.webp",
    title: "Branch Inspector — Réduction de 80 % des temps de build CI",
    description: "Les temps de build étaient lents en raison de l'accumulation de branches non supprimées dans les dépôts. Un outil était nécessaire pour détecter les branches obsolètes et alerter les développeurs avant qu'elles causent des goulots d'étranglement.",
    soldescription: "Développé un outil avec l'API GitLab et Python qui identifie les branches de plus de 30 jours. La configuration réside dans un ConfigMap Kubernetes, intégré via un cron job alimentant Logstash, Prometheus et Grafana. Un système d'alarme alerte les propriétaires de branches et les marque pour suppression.",
    techdescription: "Python, Kubernetes, GitLab API, Logstash, Prometheus, Grafana, AWS SES",
    outdescription: "Réduction de 80 % des temps de build CI. Réduction de 10 % de l'utilisation des agents Jenkins EC2. Visibilité en temps réel des branches via Grafana.",
    impactStat: "-80%",
    impactLabel: "temps de build CI",
  },
  {
    company: "Knowmad mood (2023)",
    src: "/seventh_project.webp",
    title: "Cache de build Docker dans S3 — Réduction de 75 % des temps de build",
    description: "Les temps de build Jenkins pour les projets Python et Node.js atteignaient en moyenne 20 minutes, créant un goulot d'étranglement pour chaque cycle de déploiement.",
    soldescription: "Intégré un cache de couches Docker stocké dans un bucket S3 dans les pipelines Jenkins. Politiques de cycle de vie S3 pour gérer automatiquement les coûts de stockage du cache.",
    techdescription: "Docker, Jenkins, AWS S3, AWS IAM, S3 Lifecycle Policies",
    outdescription: "Temps de build réduit de 20 minutes à 5 minutes — une amélioration 4× de la vitesse de build.",
    impactStat: "-75%",
    impactLabel: "temps de build",
  },
  {
    company: "Personal — InfraBio (2024)",
    src: "/forth_project.webp",
    title: "Auto-Posts LinkedIn — Automatisation de la marque personnelle",
    description: "La publication manuelle sur LinkedIn était chronophage et incohérente, rendant difficile le maintien d'une présence régulière dans le cadre d'une stratégie de marque personnelle.",
    soldescription: "Développé un système en deux parties : une interface CRUD pour gérer les brouillons de publications, et un Worker Cloudflare qui récupère les posts d'une base de données Turso SQLite et les publie via l'API LinkedIn aux moments optimaux.",
    techdescription: "React.js, Node.js, Turso SQLite, Cloudflare Workers, Wrangler",
    outdescription: "Cohérence de publication et présence LinkedIn considérablement améliorées. Temps hebdomadaire libéré pour l'apprentissage et d'autres projets.",
    githubUrl: "https://github.com/YaiGenes",
  },
];

export const projects: Record<Language, ProjectEntry[]> = { en: projEN, de: projDE, fr: projFR };

// ─── CV text content ───────────────────────────────────────────────────────────

export interface CVText {
  subtitle: string;
  summary: string;
  sections: {
    latestExp: string;
    bioExp: string;
    references: string;
    education: string;
    languages: string;
    previous: string;
    programming: string;
    research: string;
    keyImpact: string;
    hydrolix: string;
  };
  jobTypes: { remote: string; employee: string };
  hydrolix: string;
  triggle: string;
  atSistemas: string;
  accenture: string;
  bio: { role: string; org: string; desc: string };
  langNames: { spanish: string; english: string; swedish: string; german: string; french: string };
  langLevels: { native: string; bilingual: string; basic: string; learning: string };
}

export const cvText: Record<Language, CVText> = {
  en: {
    subtitle: "Site Reliability Eng. & Biologist",
    summary: "SRE with 5+ years of experience and a biology background, specialising in Kubernetes at scale, GitOps, cost optimisation, and SRE automation.",
    sections: {
      latestExp: "Latest IT Experiences",
      bioExp: "Bio Experience",
      references: "References",
      education: "Education",
      languages: "Languages",
      previous: "Previous",
      programming: "Programming",
      research: "Research",
      keyImpact: "Key Financial Impact",
      hydrolix: "Hydrolix total: CHF 642K+ over 2 years",
    },
    jobTypes: { remote: "full-time · remote", employee: "full-time employee" },
    hydrolix: "Cloud-native streaming analytics platform. Led VPA rollout across 200+ clusters: 25.9% cost/TB reduction (CHF 645→CHF 479/TB), one cluster cut 74% of nodes saving CHF 132K–263K/yr. Drove GitOps adoption from scratch — 234 clusters / 468 apps under ArgoCD, change time cut from ~30 min to under 10 min. Co-built ArgoCD + Kustomize + Argo Workflows rollout platform cutting fleet releases from 3–4 weeks to 3–4 days; before: ~35 hrs active SRE time; after: ~5–8 hrs oversight — ~30 hrs saved × 12 releases/yr ≈ 360 SRE-hrs/yr; at CHF 100/hr = est. CHF 36K/yr. Deployed 25 Prometheus stacks on previously unmonitored customer instances. Built automated OOM remediation saving CHF 6K/yr. Owned EMEA on-call & IC for 10+ P0–P2 incidents; managed capacity for Hulu Super Bowl & Viacom18 IPL. 1,468 commits · 50+ docs.",
    triggle: "Tourism PaaS on AWS/Azure. 27% platform cost reduction; 500% faster deployments via CI/CD automation; 10% cost savings via cron cleanup jobs; EKS 1.24→1.29 upgrade across 4 clusters reducing extended support cost by 82.5%; replaced paid on-call platform with Grafana OnCall at zero cost. Managed DevOps team of 3.",
    atSistemas: "Airlines customer. Maintained on-prem & AWS services, automated deployments, ensured system scaling, mentored 2 Jr. SREs. Stack: Python, Bash, CloudFormation, Ansible, Kubernetes, Jenkins, Docker, Datadog.",
    accenture: "Banking customer. Built Branch Inspector tool (GitLab API + Python) cutting CI build times by 80% and EC2 Jenkins agent usage by 10%. Monitoring: AWS, Kubernetes, Jenkins, ELK, Grafana, Go, Python.",
    bio: {
      role: "Tech Coordinator I+D",
      org: "Environmental Agency, Cuba",
      desc: "Mangrove Ecosystems Biological Restoration — GIS modelling, data collection, team coordination.",
    },
    langNames: { spanish: "Spanish", english: "English", swedish: "Swedish", german: "German", french: "French" },
    langLevels: { native: "Mother tongue", bilingual: "Bilingual", basic: "Basic", learning: "Learning ↗" },
  },
  de: {
    subtitle: "Site Reliability Engineer & Biologe",
    summary: "SRE mit 5+ Jahren Erfahrung und biologischem Hintergrund, spezialisiert auf Kubernetes im großen Maßstab, GitOps, Kostenoptimierung und SRE-Automatisierung.",
    sections: {
      latestExp: "Aktuelle IT-Erfahrungen",
      bioExp: "Biologische Erfahrung",
      references: "Referenzen",
      education: "Ausbildung",
      languages: "Sprachen",
      previous: "Weiterbildung",
      programming: "Programmierung",
      research: "Forschung",
      keyImpact: "Wichtige Finanzkennzahlen",
      hydrolix: "Hydrolix gesamt: CHF 642K+ über 2 Jahre",
    },
    jobTypes: { remote: "Vollzeit · Remote", employee: "Angestellter" },
    hydrolix: "Cloud-native Streaming-Analyse-Plattform. VPA-Rollout auf 200+ Cluster geleitet: 25,9 % Kosten/TB-Reduktion (CHF 645→CHF 479/TB), ein Cluster reduzierte 74 % der Nodes und spart CHF 132K–263K/Jahr. GitOps-Adoption von Grund auf vorangetrieben — 234 Cluster / 468 Apps unter ArgoCD, Änderungszeit von ~30 Min. auf unter 10 Min. reduziert. ArgoCD + Kustomize + Argo Workflows Rollout-Plattform mitentwickelt, die Fleet-Releases von 3–4 Wochen auf 3–4 Tage verkürzt; vorher: ~35 Std. aktive SRE-Zeit; nachher: ~5–8 Std. Oversight — ~30 Std. gespart × 12 Releases/Jahr ≈ 360 SRE-Std./Jahr; bei CHF 100/Std. = ca. CHF 36K/Jahr. 25 Prometheus-Stacks auf zuvor unüberwachten Kundeninstanzen eingerichtet. Automatisierte OOM-Remediation entwickelt, die CHF 6K/Jahr spart. EMEA On-Call & IC für 10+ P0–P2-Incidents; Kapazität für Hulu Super Bowl & Viacom18 IPL gemanagt. 1.468 Commits · 50+ Dokumente.",
    triggle: "Tourismus-PaaS auf AWS/Azure. 27 % Plattformkostenreduktion; 500 % schnellere Deployments via CI/CD-Automatisierung; 10 % Kosteneinsparungen via Cron-Cleanup-Jobs; EKS 1.24→1.29 Upgrade auf 4 Clustern, Extended-Support-Kosten um 82,5 % reduziert; kostenpflichtige On-Call-Plattform durch Grafana OnCall kostenlos ersetzt. DevOps-Team von 3 Personen geleitet.",
    atSistemas: "Airlines-Kunde. On-Premise- und AWS-Dienste gewartet, Deployments automatisiert, Systemskalierung sichergestellt, 2 Jr. SREs mentoriert. Stack: Python, Bash, CloudFormation, Ansible, Kubernetes, Jenkins, Docker, Datadog.",
    accenture: "Banking-Kunde. Branch Inspector Tool (GitLab API + Python) entwickelt, das CI-Build-Zeiten um 80 % und EC2 Jenkins Agent-Nutzung um 10 % reduzierte. Monitoring: AWS, Kubernetes, Jenkins, ELK, Grafana, Go, Python.",
    bio: {
      role: "Tech-Koordinator FuE",
      org: "Umweltbehörde, Kuba",
      desc: "Biologische Wiederherstellung von Mangroven-Ökosystemen — GIS-Modellierung, Datenerfassung, Teamkoordination.",
    },
    langNames: { spanish: "Spanisch", english: "Englisch", swedish: "Schwedisch", german: "Deutsch", french: "Französisch" },
    langLevels: { native: "Muttersprache", bilingual: "Zweisprachig", basic: "Grundkenntnisse", learning: "In Erlernung ↗" },
  },
  fr: {
    subtitle: "Ingénieur SRE & Biologiste",
    summary: "Ingénieur SRE avec 5+ ans d'expérience et une formation en biologie, spécialisé dans Kubernetes à grande échelle, GitOps, optimisation des coûts et automatisation SRE.",
    sections: {
      latestExp: "Dernières expériences IT",
      bioExp: "Expérience biologique",
      references: "Références",
      education: "Formation",
      languages: "Langues",
      previous: "Formation continue",
      programming: "Programmation",
      research: "Recherche",
      keyImpact: "Impact financier clé",
      hydrolix: "Total Hydrolix : CHF 642K+ sur 2 ans",
    },
    jobTypes: { remote: "temps plein · télétravail", employee: "employé temps plein" },
    hydrolix: "Plateforme d'analyse streaming cloud-native. Conduit le déploiement VPA sur 200+ clusters : réduction de 25,9 % coût/To (CHF 645→CHF 479/To), un cluster a réduit 74 % de ses nœuds économisant CHF 132K–263K/an. Adoption GitOps depuis zéro — 234 clusters / 468 apps sous ArgoCD, temps de modification réduit de ~30 min à moins de 10 min. Co-développé la plateforme ArgoCD + Kustomize + Argo Workflows réduisant les releases de 3–4 semaines à 3–4 jours ; avant : ~35 h de travail SRE actif ; après : ~5–8 h de supervision — ~30 h économisées × 12 releases/an ≈ 360 h-SRE/an ; à CHF 100/h = est. CHF 36K/an. 25 stacks Prometheus déployées sur instances client sans surveillance. Remédiation OOM automatisée économisant CHF 6K/an. On-call EMEA & IC pour 10+ incidents P0–P2 ; capacité gérée pour le Super Bowl Hulu & IPL Viacom18. 1 468 commits · 50+ docs.",
    triggle: "PaaS touristique sur AWS/Azure. Réduction de 27 % des coûts de la plateforme ; déploiements 500 % plus rapides via automatisation CI/CD ; économies de 10 % via des crons de nettoyage ; mise à niveau EKS 1.24→1.29 sur 4 clusters réduisant les coûts de support étendu de 82,5 % ; plateforme on-call payante remplacée par Grafana OnCall à coût zéro. Géré une équipe DevOps de 3 personnes.",
    atSistemas: "Client compagnie aérienne. Maintenance des services on-premise et AWS, automatisation des déploiements, garantie de la mise à l'échelle, mentorat de 2 Jr. SRE. Stack : Python, Bash, CloudFormation, Ansible, Kubernetes, Jenkins, Docker, Datadog.",
    accenture: "Client bancaire. Développé l'outil Branch Inspector (API GitLab + Python) réduisant les temps de build CI de 80 % et l'utilisation des agents Jenkins EC2 de 10 %. Monitoring : AWS, Kubernetes, Jenkins, ELK, Grafana, Go, Python.",
    bio: {
      role: "Coordinateur Technique R&D",
      org: "Agence environnementale, Cuba",
      desc: "Restauration biologique des écosystèmes de mangrove — modélisation SIG, collecte de données, coordination d'équipe.",
    },
    langNames: { spanish: "Espagnol", english: "Anglais", swedish: "Suédois", german: "Allemand", french: "Français" },
    langLevels: { native: "Langue maternelle", bilingual: "Bilingue", basic: "Notions de base", learning: "En apprentissage ↗" },
  },
};
