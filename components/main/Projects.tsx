import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/second_project.webp"
          title="EKS ZeroDowntime Upgrader"
          description="The EKS ZeroDowntime Upgrader is a robust tool designed to manage updates and upgrades within Amazon Elastic Kubernetes Service (EKS) clusters without causing any service interruptions. This project aims to automate the process of applying version upgrades, node group updates, and configuration changes seamlessly, ensuring that applications continue to operate smoothly during the transition."
        />
        <ProjectCard
          src="/third_project.webp"
          title="ConcurrentFlow Deployer"
          description="ConcurrentFlow Deployer is designed to streamline and accelerate the CI/CD pipeline using advanced concurrency models and Docker's built-in caching mechanisms. This project aims to reduce build and deployment times significantly by optimizing resource utilization and minimizing rebuilds."
        />
        <ProjectCard
          src="/first_project.webp"
          title="IaC EnviroProvisioner"
          description="The IaC EnviroProvisioner is a sophisticated tool designed to automate the provisioning and management of computing environments using Infrastructure as Code (IaC) methodologies. This project utilizes Terraform, Terragrunt, and Spacelift, targeting the AWS platform to streamline the setup, scaling, and maintenance of infrastructure, ensuring consistent and repeatable deployments."
        />
      </div>
    </div>
  );
};

export default Projects;
