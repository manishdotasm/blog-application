import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { BriefcaseIcon, Building, FlowerIcon, HeartIcon, LightbulbIcon, MountainSnow, SettingsIcon } from "lucide-react";
import axios from "axios";
import BlogItem from "./blogItem";

interface BlogListProps {
	searchTerm: string;
}

const BlogList: React.FC<BlogListProps> = ({ searchTerm }) => {
	const [clicked, setClicked] = useState("All");
	const clickedCSS = "bg-black text-white";

	const [blogs, setBlogs] = useState([]);

	const fetchBlogs = async () => {
		try {
			const response = await axios.get("/api/blog");
			setBlogs(response.data.blogs);
		} catch (e) {
			console.log("Error", e);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<div>
			<div className="mt-10 sm:mt-20 flex flex-wrap gap-2 justify-center">
				<Button key={"All"} variant={"outline"} onClick={() => setClicked("All")} className={clicked === "All" ? clickedCSS : ""}>
					<Building className="flex-shrink-0 w-3 h-auto mr-2" />
					All
				</Button>
				<Button variant={"outline"} onClick={() => setClicked("Business")} className={clicked === "Business" ? clickedCSS : ""}>
					<BriefcaseIcon className="flex-shrink-0 w-3 h-auto mr-2" />
					Business
				</Button>
				<Button variant={"outline"} onClick={() => setClicked("Strategy")} className={clicked === "Strategy" ? clickedCSS : ""}>
					<SettingsIcon className="flex-shrink-0 w-3 h-auto mr-2" />
					Strategy
				</Button>
				<Button variant={"outline"} onClick={() => setClicked("Health")} className={clicked === "Health" ? clickedCSS : ""}>
					<HeartIcon className="flex-shrink-0 w-3 h-auto mr-2" />
					Health
				</Button>
				<Button variant={"outline"} onClick={() => setClicked("Creative")} className={clicked === "Creative" ? clickedCSS : ""}>
					<LightbulbIcon className="flex-shrink-0 w-3 h-auto mr-2" />
					Creative
				</Button>
				<Button variant={"outline"} onClick={() => setClicked("Environment")} className={clicked === "Environment" ? clickedCSS : ""}>
					<FlowerIcon className="flex-shrink-0 w-3 h-auto mr-2" />
					Environment
				</Button>
				<Button variant={"outline"} onClick={() => setClicked("Adventure")} className={clicked === "Adventure" ? clickedCSS : ""}>
					<MountainSnow className="flex-shrink-0 w-3 h-auto mr-2" />
					Adventure
				</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-10 mt-10 mb-20">
				{blogs
					.filter((item) => (clicked === "All" ? true : item.category === clicked))
					.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.description.toLowerCase().includes(searchTerm.toLowerCase()))
					.map((blog, index) => (
						<BlogItem key={index} id={blog._id} title={blog.title} description={blog.description} category={blog.category} image={`/${blog.image}`} imageAlt={blog.imageAlt} date={blog.date} />
					))}
			</div>
		</div>
	);
};

export default BlogList;
