import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { jwt } from '../../utils';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    try {
      const requestedPage = req.page.name;
      return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
    } catch (error) {
      const url = req.nextUrl.clone();
      const requestedPage = req.page.name;
      return NextResponse.redirect(
        `${url.origin}/auth/login?p=${requestedPage}`
      );
    }
  }

  const validRoles = ['admin', 'super-user', 'SEO'];

  if (!validRoles.includes(session.user.role)) {
    try {
      return NextResponse.redirect('/');
    } catch (error) {
      const url = req.nextUrl.clone();
      return NextResponse.redirect(`${url.origin}/`);
    }
  }

  return NextResponse.next();
}
