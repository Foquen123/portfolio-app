'use client';
import { createProject, updateProject } from '@/actions/project';
import { IProjectResponse } from '@/interfaces/project.interface';
import { ExternalLink, GitCommitVertical, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Fragment,
  useState,
} from 'react';
import { v4 } from 'uuid';

function FileUploadZone({
  image,
  name,
  onChange,
}: {
  image: string | null;
  name: string;
  onChange: () => void;
}) {
  const [previewImage, setPreviewImage] = useState<string | null>(image);
  return (
    <div className="space-y-2">
      <div className="flex flex-col justify-center items-center group w-full h-50 relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-red-500/30 transition-all duration-300 cursor-pointer bg-white/[0.02] hover:bg-white/[0.05]">
        <input
          // ref={(e) => ref(e)}
          name={name}
          type="file"
          onChange={(e) => {
            const files = e.target.files ? Array.from(e.target.files) : [];
            if (files.length > 0) {
              const file = files[0];
              if (file) {
                setPreviewImage(URL.createObjectURL(file));
                onChange();
              } else {
                setPreviewImage(null);
              }
            }
          }}
          className="absolute inset-0 opacity-0 cursor-pointer"
          accept="image/*"
        />

        {!previewImage && (
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
              Перетащите изображение или нажмите для выбора
            </p>
            <p className="text-xs text-white/20">PNG, JPG или WebP до 5MB</p>
          </div>
        )}
        {previewImage && (
          <Image
            className="pointer-events-none"
            src={previewImage}
            alt="preivew"
            fill
            objectFit="cover"
          ></Image>
        )}
      </div>
    </div>
  );
}

export default function Form({
  initialData,
}: {
  initialData?: IProjectResponse;
}) {
  const router = useRouter();
  const [images, setImages] = useState<
    {
      name: string;
      previewUrl: string | null;
      id: string;
      isChanged: boolean;
    }[]
  >(
    initialData
      ? initialData.previews.map((preview) => ({
          name: `name-${preview.id}`,
          previewUrl: preview.image,
          id: preview.id,
          isChanged: false,
        }))
      : [{ name: 'name-1', previewUrl: null, id: '1', isChanged: false }],
  );

  const addNewImage = () => {
    setImages((prev) => {
      const newImages = [...prev];
      const id = v4();
      newImages.push({
        name: `name-${id}`,
        previewUrl: null,
        id: id,
        isChanged: false,
      });
      return newImages;
    });
  };

  const deleteImage = (name: string) => {
    setImages((prev) => {
      const newImages = prev.filter((f) => f.name !== name);
      return newImages;
    });
    console.log('delete');
  };

  const updateImage = (name: string) => {
    setImages((prev) => {
      const newImages = [...prev].map((p) => {
        if (p.name === name) {
          p.isChanged = true;
          return p;
        }
        return p;
      });
      return newImages;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
              {initialData ? 'Обновить проект' : 'Новый проект'}
            </span>
          </h1>
          <p className="text-white/40">Заполните информацию о вашем проекте</p>
        </div>

        {/* Форма */}
        <form
          className="space-y-6"
          action={async (e) => {
            if (initialData) {
              const res = await updateProject(initialData.id, e);
            } else {
              const res = await createProject(e);
            }
            router.refresh();
            router.replace('/');
          }}
          // onSubmit={(e) => e.preventDefault()}
        >
          {/* Название */}
          <div className="space-y-2">
            <label className="text-sm text-white/60 ml-1">
              Название проекта
            </label>
            <input
              defaultValue={initialData && initialData.title}
              name="title"
              type="text"
              placeholder="Проект 1"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500/50 focus:bg-white/[0.07] outline-none transition-all duration-300 text-white placeholder:text-white/20"
            />
          </div>

          {/* Описание */}
          <div className="space-y-2">
            <label className="text-sm text-white/60 ml-1">Описание</label>
            <textarea
              defaultValue={initialData && initialData.description}
              rows={4}
              name="description"
              placeholder="Краткое описание проекта, его назначение и ключевые возможности"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500/50 focus:bg-white/[0.07] outline-none transition-all duration-300 text-white placeholder:text-white/20 resize-none"
            />
          </div>

          {images.map((i, index) => (
            <Fragment key={i.name}>
              <div className="flex justify-between items-center">
                <label className="text-sm text-white/60 ml-1">
                  Превью проекта
                </label>
                <button
                  onClick={() => deleteImage(i.name)}
                  type="button"
                  className=" w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-red-500/10"
                >
                  <Minus size={20} />
                </button>
              </div>
              <input
                type="hidden"
                name={`name-is-changed-${i.id}`}
                value={String(i.isChanged)}
              />
              <input
                type="hidden"
                name={`index-${i.id}`}
                value={index}
              />
              <FileUploadZone
                onChange={() => updateImage(i.name)}
                name={i.name}
                key={i.name}
                image={i.previewUrl}
              ></FileUploadZone>
            </Fragment>
          ))}

          <button
            onClick={addNewImage}
            type="button"
            className=" w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-red-500/10"
          >
            <Plus size={20} />
          </button>

          {/* Технологии */}
          <div className="space-y-2">
            <label className="text-sm text-white/60 ml-1">Технологии</label>
            <input
              defaultValue={initialData && initialData.tech}
              name="tech"
              type="text"
              placeholder="React, TypeScript, Tailwind CSS, Node.js"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500/50 focus:bg-white/[0.07] outline-none transition-all duration-300 text-white placeholder:text-white/20"
            />
            <p className="text-xs text-white/20 ml-1">
              Перечислите технологии через запятую
            </p>
          </div>

          {/* Ссылки */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-white/60 ml-1 flex items-center gap-2">
                <GitCommitVertical size={14} className="text-red-500" />
                GitHub
              </label>
              <input
                defaultValue={initialData?.githubUrl as string}
                name="githubUrl"
                type="url"
                placeholder="https://github.com/username/project"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500/50 focus:bg-white/[0.07] outline-none transition-all duration-300 text-white placeholder:text-white/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/60 ml-1 flex items-center gap-2">
                <ExternalLink size={14} className="text-red-500" />
                Сайт проекта
              </label>
              <input
                defaultValue={initialData && initialData.siteUrl}
                name="siteUrl"
                type="url"
                placeholder="https://myproject.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500/50 focus:bg-white/[0.07] outline-none transition-all duration-300 text-white placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-4 pt-4">
            <Link
              href={'/'}
              type="button"
              className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-red-500/30 hover:bg-white/[0.05] transition-all duration-300"
            >
              Отмена
            </Link>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98]"
            >
              {initialData ? 'Редактировать' : 'Добавить проект'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
