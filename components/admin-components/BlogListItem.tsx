/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";

const BlogListItem = ({ title, date, mongoID, deleteBlog }: { title: any; date: any; mongoID: any; deleteBlog: any }) => {
	return (
		<tr className="border-b border-gray-200 dark:border-gray-700">
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
				{title ? title : "unknown"}
			</th>
			<td className="px-6 py-4">{date ? date : "unknown"}</td>
			<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
				<Button onClick={() => deleteBlog(mongoID)}>
					<Delete />
				</Button>
			</td>
		</tr>
	);
};

export default BlogListItem;
