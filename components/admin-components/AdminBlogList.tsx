/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Cover } from "../ui/cover";
import BlogListItem from "./BlogListItem";
import axios from "axios";
import { toast } from "react-toastify";

const AdminBlogList = () => {
	const [blogs, setBlogs] = useState<any>([]);

	const fetchBlogs = async () => {
		const response = await axios.get("/api/blog");
		setBlogs(response.data.blogs);
	};

	const deleteBlog = async (mongoID: any) => {
		const response = await axios.delete("/api/blog", {
			params: {
				id: mongoID,
			},
		});
		toast.success(response.data.message);
		fetchBlogs();
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<div className="w-full mr-20 block">
			<h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
				<Cover>Blog</Cover> List
			</h1>
			<div className="  shadow-md sm:rounded-lg px-20 pb-20">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 w-3/5">
								Blog Title
							</th>
							<th scope="col" className="px-6 py-3 w-2/5">
								Date
							</th>
							<th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 w-1/10">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{blogs.map((item: { _id: any; title: any; date: any }, index: React.Key | null | undefined) => {
							return <BlogListItem key={index} mongoID={item._id} title={item.title} date={item.date} deleteBlog={deleteBlog} />;
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminBlogList;
