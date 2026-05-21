import { Preview } from '@/generated/prisma/client';

// export interface IProjectRequest {
//   title: string;
//   description: string;
//   tech: string;
//   siteUrl: string;
//   githubUrl: string | null;
//   previews: {file: File | null, id: string | null};
// }
export interface IProjectRequest {
  title: string;
  description: string;
  tech: string;
  siteUrl: string;
  githubUrl: string | null;
  previews: File[];
}

export interface IProjectResponse {
  id: string;
  title: string;
  description: string;
  tech: string;
  siteUrl: string;
  githubUrl: string | null;
  previews: Preview[];
}
