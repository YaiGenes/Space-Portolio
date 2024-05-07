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
          desctitle="Problem"
          description="In this project, I was working to reduce the cost of AWS EKS because they were in an extended support version which is 6 times more expensive"
          soltitle="Solution"
          soldescription="I oversaw the update of EKS clusters from version 1.24 to 1.29, which reduced the costs of extended support by 82.5% due to more efficient use of autoscaling groups. Additionally, I have been managing a team of three engineers in automating key infrastructure components"
          techtitle="Technologies Used"
          techdescription="Terraform, Terraformer, Velero, Kubernetes (EKS), AWS Auto Scaling"
          outtitle="Outcome"
          outdescription="82.5% reduction in extended support costs due to cluster updates -> Enhanced system scalability and reliability"
        />
        <ProjectCard
          company="Triggle Spain SLU (2023)"
          src="/second_project.webp"
          title="CI/CD Automation and Deployment Acceleration"
          desctitle="Problem"
          description="Initially, our CI/CD process was entirely manual, prone to human errors, and slow, delaying the deployment of new features to production."
          soltitle="Solution"
          soldescription="Focusing on improving operational efficiency, I spearheaded the automation of the continuous integration and continuous deployment (CI/CD) pipelines, enhance the build time using concurrency and docker caching. This project involved overhauling existing deployment methodologies and introducing automation scripts that streamlined the deployment process."
          techtitle="Technologies Used"
          techdescription="Codebuild, Bitbucket, Lambdas, API Gateway, Python, Bash"
          outtitle="Outcome"
          outdescription="Deployment and build times reduced by 500% -> Enhanced consistency and reliability in deployments"
        />
        <ProjectCard
          company="Triggle Spain SLU (2024)"
          src="/boats.webp"
          title="AWS Cost Optimization"
          desctitle="Problem"
          description="This issue likely arose from over-provisioning, suboptimal resource allocation, and the lack of effective autoscaling and cleanup policies, which resulted in unnecessary expenses. The initiative aimed to tackle these inefficiencies by implementing targeted optimizations to improve how resources were managed and utilized."
          soltitle="Solution"
          soldescription="In my role at Triggle SLU, a cloud-native company serving the tourism sector, I led a major initiative to reduce platform costs across AWS accounts. By implementing targeted optimizations and refining resource usage, I achieved a 27% reduction in overall platform costs. Key strategies included enhancing autoscaling capabilities, apply cleanup policies, automate cleanups using crons and revising our resource allocation to better fit usage patterns."
          techtitle="Technologies Used"
          techdescription="AWS, argoCD, Codebuild, Terraform, CASTAI"
          outtitle="Outcome"
          outdescription="27% cost reduction by autoscaling policies, 10% cost saving through efficient cleanup cron jobs -> Improved budget efficiency and resource utilization"
        />
        <ProjectCard
          company="Triggle Spain SLU (2024)"
          src="/sixth_project.webp"
          title="Free platform On-Call Duties"
          desctitle="Problem"
          description="We were facing significant expenses due to paying for a UptimeRobot subscription for on-call duties throughout the week"
          soltitle="Solution"
          soldescription="We leveraged our existing setup of Prometheus and Grafana by installing Grafana OnCall and connecting it to a Telegram channel. This integration triggers a call every time a service goes down"
          techtitle="Technologies Used"
          techdescription="Prometheus, Grafana, Telegram"
          outtitle="Outcome"
          outdescription="Zero Cost: This approach eliminated the costs associated with the on-duty platform, leaving us with only the expenses for developing and maintaining the tool and its integration."
        />
        <ProjectCard
          company="Accenture (2022)"
          src="/fifth_project.webp"
          title="Project Branch Inspector"
          desctitle="Problem"
          description="Build times are slow due to repositories having many undeleted branches, creating bottlenecks during dependency tracking. A tool is needed to alert developers of excessive branches and flag those over 30 days old as stale, prompting cleanup emails."
          soltitle="Solution"
          soldescription="I developed a tool utilizing the GitLab API and Python, as the community version of GitLab lacks this functionality. It identifies old branches based on a 30-day threshold. Configurations are stored in a Kubernetes ConfigMap, integrated into a cron job that processes and sends log data to Logstash, Prometheus, and Grafana. An alarm system alerts branch owners and flags branches for deletion."
          techtitle="Technologies Used"
          techdescription="Python, Kubernetes, GitLab API, Logstash, Prometheus, Grafana, AWS SES"
          outtitle="Outcome"
          outdescription="This tool cut build times by 80%, boosted productivity, reduced EC2 usage for Jenkins agents by 10%, and enabled managers to monitor branch statuses through Grafana dashboards."
        />
        <ProjectCard
          company="Knowmad mood (2023)"
          src="/seventh_project.webp"
          title="Enhancing Development Times Using Docker Build Cache Stored in an S3 Bucket"
          desctitle="Problem"
          description="We encountered the issue of prolonged build times in Jenkins for projects using Python and Node.js, which averaged around 20 minutes."
          soltitle="Solution"
          soldescription="To address this issue, I integrated a Docker cache into the pipelines. This cache stores the layers from the build process in an S3 bucket."
          techtitle="Technologies Used"
          techdescription="Docker, Jenkins, AWS S3, AWS IAM, S3 Cleanup Policies"
          outtitle="Outcome"
          outdescription="This enhancement significantly reduced the build time from an average of 20 minutes to 5 minutes, achieving a fourfold increase in speed."
        />
        <ProjectCard
          company="Personal project - Personal Brand: InfraBio (2024)"
          src="/forth_project.webp"
          title="LinkedIn Auto-Posts"
          desctitle="Problem"
          description="As part of my hobby and personal branding strategy, I developed a tool that automatically posts on my LinkedIn account."
          soltitle="Solution"
          soldescription="This tool comprises two main components: firstly, a CRUD interface to manage the publication of posts, and secondly, a worker in Cloudflare that retrieves posts from the database and publishes them on LinkedIn using its API. This setup allows me to spend a few hours each week creating content, while the worker automatically publishes the posts at optimal times and days. This arrangement frees up my time to learn and explore other interests."
          techtitle="Technologies Used"
          techdescription="React.js, Node.js, Turso SQLite, Cloudflare Workers, Wrangler"
          outtitle="Outcome"
          outdescription="This tool has significantly increased my productivity and enhanced my presence on the network, making it easier to manage my personal brand."
        />
      </div>
    </div>
  );
};

export default Projects;
