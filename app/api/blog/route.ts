/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");

const LoadDB = async () => {
	await ConnectDB();
};

export async function GET(request: NextRequest) {
	LoadDB();

	const blogID = request.nextUrl.searchParams.get("id");
	if (blogID) {
		const blog = await BlogModel.findById(blogID);
		return NextResponse.json({ blog });
	} else {
		const blogs = await BlogModel.find({});
		return NextResponse.json({ blogs });
	}
}

export async function POST(request: NextRequest) {
	try {
		LoadDB();
		const formData = await request.formData();
		const timeStamp = Date.now();

		const image = formData.get("image");
		if (!image || !(image instanceof File)) return NextResponse.json({ msg: "Invalid image." }, { status: 400 });

		const imageByteData = await image.arrayBuffer();
		const buffer = Buffer.from(imageByteData);

		const path = `./public/${timeStamp}_${image.name}`;
		await writeFile(path, buffer);

		const imageURL = `${timeStamp}_${image.name}`;
		const blogData = {
			title: String(formData.get("title")),
			description: String(formData.get("description")),
			category: String(formData.get("category")),
			image: String(imageURL),
			imageAlt: String(formData.get("imageAlt")),
			date: String(timeStamp.toLocaleString()),
		};
		await BlogModel.create(blogData);
		console.log("Blog saved!");

		return NextResponse.json({ msg: "Success!" });
	} catch (e) {
		console.log("Error: ", e);
		return NextResponse.json({ msg: "Success!" });
	}
}

export async function DELETE(request: NextRequest) {
	LoadDB();
	const id = await request.nextUrl.searchParams.get("id");
	const blog = await BlogModel.findById(id);
	fs.unlink(`./public/${blog.image}`, () => {});
	await BlogModel.findByIdAndDelete(id);
	return NextResponse.json({ msg: "Blog Deleted!" });
}
