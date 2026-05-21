// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Защищаем только маршруты, начинающиеся с /admin
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_session')?.value;
    const payload = token ? await verify(token) : null;

    if (!payload) {
      // Если токена нет или он недействителен, отправляем на публичную страницу
      // или на скрытую страницу входа. Лучше на главную, чтобы не раскрывать URL входа.
      const homeUrl = new URL('/', request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

// Указываем, для каких путей вызывать Middleware
export const config = {
  matcher: ['/admin/:path*'],
};
