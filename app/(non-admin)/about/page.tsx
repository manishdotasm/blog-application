import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Link from "next/link";
import { Github } from "lucide-react";

const About = () => {
	return (
		<div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
			<MacbookScroll
				title={<span>BLOGS!</span>}
				badge={
					<Link href="https://github.com/manishdotasm/blog-application">
						<Github className="h-10 w-10 transform -rotate-12" />
					</Link>
				}
				src={`/macbook.png`}
				showGradient={false}
			/>
		</div>
	);
};

export default About;
