import { promises as fs } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { revalidatePath } from 'next/cache';

export async function uploadPhoto(file: File) {
  try {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return { error: 'Неподдерживаемый тип файла' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${safeName}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Создаем папку если нет
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    revalidatePath('/');

    return {
      success: true,
      filename,
      url: `/uploads/${filename}`,
      apiUrl: `/api/uploads/${filename}`,
    };
  } catch (error) {
    console.error('Ошибка:', error);
    return { error: 'Ошибка при загрузке файла' };
  }
}

export async function deletePhoto(filePath: string) {
  try {
    // Проверка на пустой путь
    if (!filePath || filePath.trim() === '') {
      return {
        success: false,
        error: 'Путь к файлу не указан',
      };
    }
    const filename = path.basename(filePath);

    if (!filename) {
      return {
        success: false,
        error: 'Некорректный путь к файлу',
      };
    }
    const allowedExtensions = [
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.webp',
      '.pdf',
      '.doc',
      '.docx',
    ];
    const ext = path.extname(filename).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      return {
        success: false,
        error: 'Недопустимый тип файла',
      };
    }

    // Формируем путь к файлу в папке public/uploads
    const fullPath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Проверка существования файла
    try {
      await fs.access(fullPath);
    } catch {
      return {
        success: false,
        error: 'Файл не найден',
      };
    }
    await fs.unlink(fullPath);
    revalidatePath('/uploads');
    return {
      success: true,
      message: `Файл ${filename} успешно удален`,
      filename: filename,
    };
  } catch (error) {
    console.error('Ошибка при удалении файла:', error);
    return {
      success: false,
      error: 'Произошла ошибка при удалении файла',
    };
  }
}
