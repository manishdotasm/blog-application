import { NextResponse } from "next/server";

export async function POST() {
	const response = NextResponse.json({ message: "Logged out successfully!" });
	response.headers.append("Set-Cookie", "authToken=; Path=/; Max-Age=0; HttpOnly");
	return response;
}
