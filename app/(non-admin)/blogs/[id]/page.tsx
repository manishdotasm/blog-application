"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import adminAvatar from "@/assets/avatar.svg";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page = ({ params }: { params: any }) => {
	const [data, setData] = useState(null);

	const fetchBlogData = async () => {
		const response = await axios.get("/api/blog", {
			params: {
				id: params.id,
			},
		});
		setData(response.data.blog);
	};

	useEffect(() => {
		fetchBlogData();
	}, []);

	return data ? (
		<>
			<div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
				<div className="max-w-2xl mb-10">
					{/* Avatar Media */}
					<div className="flex justify-between items-center mb-6">
						<div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
							<div className="shrink-0">
								<Image className="size-12 rounded-full" src={adminAvatar} alt="Admin Avatar" width={40} height={40} />
							</div>
							<div className="grow">
								<div className="flex justify-between items-center gap-x-2">
									<div>
										<div className=" inline-block">
											<div className=" sm:mb-1 block text-start">
												<span className="font-semibold text-gray-800 dark:text-neutral-200">admin</span>
											</div>
										</div>
										{/* End Tooltip */}
										<ul className="text-xs text-gray-500 dark:text-neutral-500">
											<li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-neutral-400 dark:before:bg-neutral-600">{data.date}</li>
											<li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-neutral-400 dark:before:bg-neutral-600">{data.category}</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* End Avatar Media */}
					{/* Content */}
					<div className="space-y-5 md:space-y-8">
						<div className="space-y-3">
							<h1 className="text-2xl font-bold md:text-3xl dark:text-white">{data.title}</h1>
						</div>
						<figure>
							<Image className="w-full object-cover rounded-xl" src={`/${data.image}`} alt={data.imageAlt} width={400} height={400} />
							<figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">{data.imageAlt}</figcaption>
						</figure>
						<p className="text-lg text-gray-800 dark:text-neutral-200">{data.description}</p>
					</div>
				</div>
			</div>
		</>
	) : (
		<></>
	);
};

export default Page;
