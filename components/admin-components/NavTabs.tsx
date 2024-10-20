import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import { AdminHome } from "./AdminHome";
import Addblog from "./Addblog";
import AdminBlogList from "./AdminBlogList";

const NavTabs = () => {
	return (
		<div className="h-full">
			<Tabs defaultValue="home" className="w-full items-center">
				<TabsList>
					<TabsTrigger value="home">Admin Home</TabsTrigger>
					<TabsTrigger value="addblog">Add Blog</TabsTrigger>
					<TabsTrigger value="bloglist">Blog List</TabsTrigger>
				</TabsList>
				<TabsContent value="home">
					{" "}
					<AdminHome />
				</TabsContent>
				<TabsContent value="addblog">
					<Addblog />
				</TabsContent>
				<TabsContent value="bloglist">
					<AdminBlogList />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default NavTabs;
