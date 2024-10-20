import React from "react";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";

interface BlogListItemProps {
	title: string;
	date: string;
	mongoID: string;
	deleteBlog: (id: string) => void; // Correctly typing deleteBlog as a function
}

const BlogListItem: React.FC<BlogListItemProps> = ({ title, date, mongoID, deleteBlog }) => {
	return (
		<tr className="border-b border-gray-200 dark:border-gray-700">
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
				{title || "unknown"}
			</th>
			<td className="px-6 py-4">{date || "unknown"}</td>
			<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
				<Button onClick={() => deleteBlog(mongoID)}>
					<Delete />
				</Button>
			</td>
		</tr>
	);
};

export default BlogListItem;
