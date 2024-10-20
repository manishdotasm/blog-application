import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
	const { username, password } = await request.json();

	// Validate the username and password against your environment variables
	if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
		const cookie = serialize("authToken", "yourTokenValue", {
			httpOnly: true,
			path: "/",
			maxAge: 60 * 60 * 24, // 1 day
		});
		const response = NextResponse.json({ message: "Validation successful!" });
		response.headers.append("Set-Cookie", cookie);
		return response;
	} else {
		return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
	}
}
