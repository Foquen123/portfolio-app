// app/actions/auth.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {  sign, verify } from '@/lib/auth';

export async function login(formData: FormData) {
  const password = formData.get('password') as string;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = await sign({ role: 'admin' });
    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true, // Защита от доступа через JavaScript
      secure: true, // Только по HTTPS
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 часов
    });
    redirect('/'); // Перенаправляем в админку
  } else {
    // Здесь можно вернуть ошибку
    console.error('Неверный пароль');
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/');
}

export type AdminSession = {
  role: string;
  // Сюда можно добавить любые другие поля из payload токена
};

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) return null;

  const payload = await verify(token);
  return payload as AdminSession | null;
}
