'use client';

import { deleteProject } from '@/actions/project';
import { Project } from '@/generated/prisma/client';
import { IProjectResponse } from '@/interfaces/project.interface';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitCommitVertical,
  Pencil,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// function ProjectImage({ project }: { project: Project }) {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

//   const scrollPrev = () => emblaApi?.scrollPrev();
//   const scrollNext = () => emblaApi?.scrollNext();
//   return (
//       <div className="relative h-70 overflow-hidden border-b border-white/5 group-hover:border-red-500/20 transition-colors duration-500" >

//           <div className='h-full overflow-hidden' ref={emblaRef}>
//             <div className="flex h-full">
//               <div className="min-w-0 flex-[0_0_100%] relative">
//                 <Image
//                   src={project.image}
//                   alt={`${project.title} preview`}
//                   fill
//                   className=" object-cover transition-all duration-700 group-hover:brightness-110"
//                 />
//               </div>
//               <div className="min-w-0 flex-[0_0_100%] relative ">
//                 <Image
//                   src={project.image}
//                   alt={`${project.title} preview`}
//                   fill
//                   className=" object-cover transition-all duration-700 group-hover:brightness-110"
//                 />
//               </div>
//               <div className="min-w-0 flex-[0_0_100%] relative ">
//                 <Image
//                   src={project.image}
//                   alt={`${project.title} preview`}
//                   fill
//                   className=" object-cover transition-all duration-700 group-hover:brightness-110"
//                 />
//               </div>
//             </div>
//           </div>

//         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 ">
//           <a
//             href={project.siteUrl}
//             target="_blank"
//             className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:opacity-80 transition-all"
//           >
//             <ExternalLink size={24} className="text-white " />
//           </a>
//           <button onClick={scrollNext}>next</button>
//         </div>
//       </div>
//   );
// }

function ProjectImage({ project }: { project: IProjectResponse }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // const slides = Array(3).fill(project.image);

  return (
    <div className="relative h-70 overflow-hidden border-b border-white/5 group-hover:border-red-500/20 transition-colors duration-500">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {project.previews.map((preview, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative">
              <Image
                src={preview.image}
                alt={`${project.title} preview ${i + 1}`}
                fill
                className="object-cover transition-all duration-700 group-hover:brightness-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки навигации */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        <ChevronRight size={16} />
      </button>

      {/* Иконка просмотра */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
        <a
          href={project.siteUrl}
          target="_blank"
          className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:opacity-80 transition-all pointer-events-auto"
        >
          <ExternalLink size={24} className="text-white" />
        </a>
      </div>
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
  isAdmin,
}: {
  project: IProjectResponse;
  index: number;
  isAdmin: boolean;
}) {
  const router = useRouter();

  return (
    <div
      className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer animate-fade-in-up`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:via-red-500/5 group-hover:to-red-500/10 transition-all duration-700"></div>

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-20"></div>

      <div className="absolute top-4 right-4 w-2 h-2 z-20">
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute inset-0 bg-red-500 rounded-full"></div>
      </div>

      <ProjectImage project={project}></ProjectImage>

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors relative">
            {project.title}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
          </h3>
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 group-hover:rotate-180 transition-all duration-500">
            <div className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-150 transition-transform"></div>
          </div>
        </div>

        {/* Описание */}
        <p className="text-white/60 text-sm mb-4 leading-relaxed group-hover:text-white/80 transition-colors">
          {project.description}
        </p>

        {/* Технологии с анимацией */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.split(', ').map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/40 border border-white/5 group-hover:bg-red-500/10 group-hover:text-red-400 group-hover:border-red-500/20 transition-all duration-300 hover:scale-110 cursor-default"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Ссылка с анимацией */}
        {/* Ссылки */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-red-400 transition-colors group/link"
            >
              <span>Сайт</span>
              <ExternalLink
                size={14}
                className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
              />
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-red-400 transition-colors group/link"
              >
                <span>GitHub</span>
                <GitCommitVertical
                  size={14}
                  className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                href={`/admin/edit/${project.id}`}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Pencil size={14} />
              </Link>
            )}
            {isAdmin && (
              <button
                onClick={() => {
                  deleteProject(project.id);
                  router.refresh();
                }}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
