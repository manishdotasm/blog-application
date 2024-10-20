"use client";

import Hero from "@/components/non-admin-components/Hero";
import BlogList from "@/components/non-admin-components/blogList";
import { useState } from "react";

export default function Home() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<main>
			<Hero setSearchTerm={setSearchTerm} />
			<BlogList searchTerm={searchTerm} />
		</main>
	);
}
