import { NextResponse, NextRequest } from 'next/server';
import type { NextMiddleware } from 'next/server';
import { publicRoutes } from './shared/utils/publicRoutes';

export const middleware: NextMiddleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;


  // Verificar si la ruta es pública
  const isPublic = publicRoutes.some(path => pathname === path || pathname.startsWith(`${path}/`));

  if (isPublic) {
    return NextResponse.next();
  }

  // Obtener el token de acceso desde las cookies
  const accessToken = req.cookies.get('accessToken')?.value;

  if (accessToken) {
    return NextResponse.next();
  }

  // Si no hay token de acceso, redirigir al usuario a la página de login
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/auth/login';

  return NextResponse.redirect(loginUrl);
};

export const config = {
  matcher: [
    '/MovieList/:path*',
    '/dashboard/:path*',
  ],
};
