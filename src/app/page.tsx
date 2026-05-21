import { getSession } from '@/actions/auth';
import { AdminOnly } from '@/components/AdminOnly/AdminOnly';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import prisma from '@/lib/prisma';
import { GitCommitVertical, Plus, Send } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  // const projects = [
  //   {
  //     title: 'NEOVERSE',
  //     description:
  //       'Платформа для трейдинга с AI-аналитикой и real-time данными ',
  //     tech: 'Next.js, TypeScript, Tailwind, WebSocket',
  //     link: 'https://github.com/yourusername/neoverse',
  //   },
  //   {
  //     title: 'CRYPTO DASH',
  //     description: 'Дашборд для отслеживания портфеля криптовалют с графиками',
  //     tech: 'React, Recharts, Context API, Framer Motion',
  //     link: 'https://github.com/yourusername/crypto-dash',
  //   },
  //   {
  //     title: 'DEVSOCIAL',
  //     description: 'Социальная сеть для разработчиков с реальными проектами',
  //     tech: 'Next.js, Prisma, PostgreSQL, NextAuth',
  //     link: 'https://github.com/yourusername/devsocial',
  //   },
  //   {
  //     title: 'WEATHER GRID',
  //     description:
  //       'Интерактивная карта погоды с анимациями и детальными прогнозами',
  //     tech: 'TypeScript, Leaflet, OpenWeather API',
  //     link: 'https://github.com/yourusername/weather-grid',
  //   },
  //   {
  //     title: 'WEATHER GRID',
  //     description:
  //       'Интерактивная карта погоды с анимациями и детальными прогнозами',
  //     tech: 'TypeScript, Leaflet, OpenWeather API',
  //     link: 'https://github.com/yourusername/weather-grid',
  //   },
  // ];

  const projects = await prisma.project.findMany({
    include: { previews: { orderBy: { index: 'asc' } } },
  });
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve('Прошло 5 секунд');
  //   }, 5000);
  // });
  const session = await getSession();
  const isAdmin = !!session;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50  bg-black/40 border-b border-white/10 animate-[slideDown_1s_ease-in-out_forwards] ">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold relative">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-700 bg-clip-text text-transparent animate-gradient-x">
              PORTFOLIO
            </span>
          </div>
          <div className="flex gap-3">
            <a
              href={process.env.GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 text-white/80 hover:text-white hover:scale-105 active:scale-95"
            >
              <GitCommitVertical
                size={18}
                className="group-hover:rotate-12 transition-transform"
              />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={process.env.TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 text-white/80 hover:text-white hover:scale-105 active:scale-95"
            >
              <Send
                size={18}
                className="group-hover:-rotate-12 transition-transform"
              />
              <span className="hidden sm:inline">Telegram</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-20 relative z-10">
        <div className="flex flex-col gap-4 w-full justify-center items-center relative text-center mb-16 transition-all duration-1000 delay-300 animate-[slideDown10_1s_ease-out_forwards]">
          <h1 className="text-[clamp(2rem,8vw,3.75rem)] font-bold justify-self-center">
            <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent animate-gradient-x">
              Мои проекты
            </span>
          </h1>
          <AdminOnly>
            <Link
              href="/admin/add"
              className=" w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-red-500/10"
            >
              <Plus size={20} />
            </Link>
          </AdminOnly>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              isAdmin={isAdmin}
              project={project}
              index={index}
              key={project.id}
            ></ProjectCard>
          ))}
        </div>
      </main>
    </div>
  );
}
