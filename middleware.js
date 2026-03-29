import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET || "test-secret-key-change-in-production"
    });

    const { pathname } = request.nextUrl;

    // Protect Order routes - admin only
    if (pathname.startsWith("/Order")) {
        if (!token) {
            return NextResponse.redirect(new URL("/Login", request.url));
        }
        if (token.role !== "staff" && token.role !== "admin") {
            return NextResponse.redirect(new URL("/Dashboard", request.url));
        }
    }

    // Protect Upload routes - admin only
    if (pathname.startsWith("/Upload")) {
        if (!token) {
            return NextResponse.redirect(new URL("/Login", request.url));
        }
        if (token.role !== "staff" && token.role !== "admin") {
            return NextResponse.redirect(new URL("/Dashboard", request.url));
        }
    }

    // Protect Sales routes - admin only
    if (pathname.startsWith("/Sales")) {
        if (!token) {
            return NextResponse.redirect(new URL("/Login", request.url));
        }
        if (token.role !== "admin") {
            return NextResponse.redirect(new URL("/Dashboard", request.url));
        }
    }

    // Protect API routes
    if (pathname.startsWith("/api/Sales")) {
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (token.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
    }


    if (pathname.startsWith("/api/Upload")) {
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (token.role !== "staff") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
    }

    // Redirect authenticated users away from login
    if (pathname === "/Login" && token) {
        return NextResponse.redirect(new URL("/Dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/Order/:path*",
        "/Upload/:path*",
        "/Sales/:path*",
        "/api/Sales/:path*",
        "/api/Order/:path*",
        "/api/Upload/:path*",
        "/Login",
    ],
};
