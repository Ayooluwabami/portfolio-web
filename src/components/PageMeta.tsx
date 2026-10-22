import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
 * Per-route browser title, description and canonical URL, so every page is
 * distinguishable in tabs, bookmarks and search results.
 */

const SITE_URL = 'https://portfolio-seven-blond-q0bowdvnvj.vercel.app';
const NAME = 'Ayobami Edun';

const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${NAME} · Cloud, DevOps & Platform Engineer`,
    description:
      'Cloud, DevOps and platform engineer with 3+ years across AWS, Azure and GCP: Terraform, Kubernetes (EKS, AKS), ArgoCD, security-gated CI/CD and SLO-driven observability, on a NestJS backend foundation. UK-based.',
  },
  '/about': {
    title: `About · ${NAME}`,
    description: 'The path, the approach and the credentials behind Ayobami Edun’s cloud and platform work.',
  },
  '/projects': {
    title: `Projects · ${NAME}`,
    description: 'DevSecOps pipelines, zero-trust EKS, GitOps on AKS, serverless AWS, SLO frameworks and production backends, with repos, write-ups and case studies.',
  },
  '/skills': {
    title: `Skills · ${NAME}`,
    description: 'AWS, Azure, GCP, Terraform, CloudFormation, Kubernetes, ArgoCD, CI/CD, DevSecOps tooling, observability and backend engineering.',
  },
  '/cv': {
    title: `CV · ${NAME}`,
    description: 'Curriculum vitae: Cloud & DevOps Engineer at Cloudboosta, Backend & Cloud Engineer at DriveWell, education, certifications and leadership.',
  },
  '/contact': {
    title: `Contact · ${NAME}`,
    description: 'Get in touch about cloud, DevOps, DevSecOps, SRE and platform roles. Based in the West Midlands, UK; available now.',
  },
  '/projects/carepulse': {
    title: `CarePulse case study · ${NAME}`,
    description: 'NHS-aligned health platform: 8 NestJS microservices on EKS with IRSA, zero-downtime deploys and a Jenkins pipeline from validation to production.',
  },
  '/projects/drivewell': {
    title: `DriveWell case study · ${NAME}`,
    description: 'Backend and CI/CD for a vehicle hire platform on GCP: one environment-aware codebase, 10+ integrations and deployments 90% faster.',
  },
  '/projects/serverless-pipeline': {
    title: `Serverless order pipeline case study · ${NAME}`,
    description: 'Event-driven AWS order processing across 9 CloudFormation nested stacks with SQS, Fargate, SES and end-to-end correlation ID tracing.',
  },
};

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = META[pathname] ?? { title: `Page not found · ${NAME}`, description: META['/'].description };
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:url"]', 'content', SITE_URL + pathname);
    setMeta('link[rel="canonical"]', 'href', SITE_URL + (pathname === '/' ? '' : pathname));
  }, [pathname]);

  return null;
};

export default PageMeta;
