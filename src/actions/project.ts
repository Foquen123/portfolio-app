'use server';

import { IProjectRequest } from '@/interfaces/project.interface';
import { deletePhoto, uploadPhoto } from '@/lib/file';
import prisma from '@/lib/prisma';
import { getSession } from './auth';

export async function createProject(formData: FormData) {
  // const userId = await checkAuthorize();
  // if (!userId) return AppError.unauthorized();

  try {
    const images = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('name-'))
      .map(([key, value]) => {
        const index = formData.get(`index-${key.slice(5)}`) as string;
        console.log(formData);
        return {
          file: value as File,
          index: Number(index),
        };
      });
    // const images = Array.from(formData.entries())
    //   .filter(([key]) => key.startsWith('name-'))
    //   .map(([key, value]) => value as File);
    const data: IProjectRequest = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      githubUrl: formData.get('githubUrl') as string | null,
      previews: images.map((i) => i.file) as File[],
      siteUrl: formData.get('siteUrl') as string,
      tech: formData.get('tech') as string,
    };

    const uploadedImagesApiUrls: { image: string; index: number }[] = [];
    for (const image of images) {
      const uploadedImage = await uploadPhoto(image.file);
      if (uploadedImage.apiUrl)
        uploadedImagesApiUrls.push({
          image: uploadedImage.apiUrl,
          index: image.index,
        });
    }
    console.log(uploadedImagesApiUrls);

    if (uploadedImagesApiUrls.length > 0) {
      const project = await prisma.project.create({
        data: { ...data, previews: { create: uploadedImagesApiUrls } },
        include: { previews: true },
      });
      return { data: project, error: null };
    }
    return { data: null, error: 'ошибка загрузки изображения' };
  } catch {
    return { data: null, error: 'Непредвиденая ошибка' };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const session = await getSession();

    if (!session) return { data: null, error: 'Не авторизован' };

    // const images = Array.from(formData.entries())
    //   .filter(([key]) => key.startsWith('name-'))
    //   .map(([key, value]) => ({ key: key.slice(5), value: value }));

    const images = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('name-'))
      .map(([key, value]) => {
        const index = formData.get(`index-${key.slice(5)}`) as string;
        console.log(formData);
        return {
          key: key.slice(5),
          file: value as File,
          index: Number(index),
        };
      });

    const changedImages = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('name-is-changed'))
      .map(([key, value]) => ({ key: key.slice(16), value: value }))
      .filter((i) => i.value === 'true')
      .map((i) => i.key);

    console.log(changedImages);

    const ids = images.map((i) => i.key);

    const previews = await prisma.preview.findMany({
      where: { projectId: id },
    });

    // удаление обновленных фото

    for (const preview of previews) {
      if (changedImages.includes(preview.id)) {
        await prisma.preview.delete({ where: { id: preview.id } });
        await deletePhoto(preview.image);
      }
    }

    for (const preview of previews) {
      if (!ids.includes(preview.id)) {
        await deletePhoto(preview.image);
      }
    }

    const data: IProjectRequest = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      githubUrl: formData.get('githubUrl') as string | null,
      // image: formData.get('image') as File,
      siteUrl: formData.get('siteUrl') as string,
      tech: formData.get('tech') as string,
      previews: images.map((i) => i.file) as File[],
    };

    const uploadedImagesApiUrls: { image: string; index: number }[] = [];
    for (const image of images) {
      const uploadedImage = await uploadPhoto(image.file as File);
      if (uploadedImage.apiUrl)
        uploadedImagesApiUrls.push({
          image: uploadedImage.apiUrl,
          index: image.index,
        });
    }

    if (uploadedImagesApiUrls.length === 0 && ids.length === 0) {
      return { data: null, error: 'Фото не загружены' };
    }
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        previews: {
          deleteMany: { id: { notIn: ids } },
          create: uploadedImagesApiUrls,
        },
      },
      include: { previews: true },
    });
    return { data: project, error: null };
    // }
    // return { data: null, error: 'Фото не загружены' };
  } catch {
    return { data: null, error: 'Непредвиденая ошибка' };
  }
}

export async function deleteProject(id: string) {
  try {
    const session = await getSession();
    if (!session) return { data: null, error: 'Не авторизован' };

    const project = await prisma.project.delete({
      where: { id: id },
      include: { previews: true },
    });
    console.log(project);
    for (const preview of project.previews) {
      await deletePhoto(preview.image);
    }
    return { data: project, error: null };
  } catch {
    return { data: null, error: 'Непредвиденая ошибка' };
  }
}
