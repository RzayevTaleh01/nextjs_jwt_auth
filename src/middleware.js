//Hər hansı səhifə açılan zaman ilk bura request atır. Yoxlamadan keçir

import { NextResponse } from "next/server";

export async function middleware(request) {
    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get('token') ?? { value: null }; // bu object kimi gəlir normalda onun üçün const tərəfdə müəyyən dəyişiklik aparaq

    const AUTH_PAGES = ['/login', '/register', '/forgot-password'];

    const isAuthPages = (url) => AUTH_PAGES.some(page => page.startsWith(url));

    const hasVerifiedToken = token && await verifyJwtToken(token);
    const isAuthPageRequested = isAuthPages(nextUrl.pathname);

    if (isAuthPageRequested) {
        if (!hasVerifiedToken) {
            const response = NextResponse.next();
            return response;
        }
        const response = NextResponse.redirect(new url("/", url))
        return response;
    }

    if (!hasVerifiedToken) {

        const searchParams = new URLSearchParams(nextUrl.searchParams);
        searchParams.set("next", nextUrl.pathname)
        return NextResponse.redirect(new URL(`/login?${searchParams}`, url))
    }

    return NextResponse.next();

}

export const config = {
    matcher: [ //hansı səhifələrdə yoxlama aparmağa ehtiyac varsa burda yazılır
        '/login', '/panel'
    ]
}