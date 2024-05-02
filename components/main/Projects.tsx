import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        Flagship projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-wrap md:flex-row gap-10 px-10">
        <ProjectCard
          company="Triggle Spain SLU (2024)"
          src="/leadership.webp"
          title="EKS Quantic Update and Leadership"
          description="I oversaw the update of EKS clusters from version 1.24 to 1.29, which reduced the costs of extended support by 82.5% due to more efficient use of autoscaling groups. Additionally, I have been managing a team of three engineers in automating key infrastructure components"
          techtitle="Technologies Used"
          techdescription="Terraform, Terraformer, Velero, Kubernetes (EKS), AWS Auto Scaling"
          outtitle="Outcome"
          outdescription="82.5% reduction in extended support costs due to cluster updates -> Enhanced system scalability and reliability"
        />
        <ProjectCard
          company="Triggle Spain SLU (2023)"
          src="/second_project.webp"
          title="CI/CD Automation and Deployment Acceleration"
          description="Focusing on improving operational efficiency, I spearheaded the automation of the continuous integration and continuous deployment (CI/CD) pipelines, enhance the build time using concurrency and docker caching. This project involved overhauling existing deployment methodologies and introducing automation scripts that streamlined the deployment process."
          techtitle="Technologies Used"
          techdescription="Codebuild, Bitbucket, Lambdas, API Gateway, Python, Bash"
          outtitle="Outcome"
          outdescription="Deployment and build times reduced by 500% -> Enhanced consistency and reliability in deployments"
        />
        <ProjectCard
          company="Triggle Spain SLU (2024)"
          src="/boats.webp"
          title="Tourism Platform-as-a-Service (PaaS) Cost Optimization"
          description="In my role at Triggle SLU, a cloud-native company serving the tourism sector, I led a major initiative to reduce platform costs across AWS accounts. By implementing targeted optimizations and refining resource usage, I achieved a 27% reduction in overall platform costs. Key strategies included enhancing autoscaling capabilities, apply cleanup policies, automate cleanups using crons and revising our resource allocation to better fit usage patterns."
          techtitle="Technologies Used"
          techdescription="AWS, argoCD, Codebuild, Terraform, CASTAI"
          outtitle="Outcome"
          outdescription="27% cost reduction by autoscaling policies, 10% cost saving through efficient cleanup cron jobs -> Improved budget efficiency and resource utilization"
        />
      </div>
    </div>
  );
};

export default Projects;
