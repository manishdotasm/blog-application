import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const authToken = request.cookies.get("authToken");
	const isAdminPage = request.nextUrl.pathname === "/admin-controls";

	if (isAdminPage && !authToken) {
		return NextResponse.redirect(new URL("/auth", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin-controls"],
};
