"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { Github, House, Info, Instagram, User, Waypoints } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationDock = () => {
	const pathname = usePathname();

	const offPage = "h-full w-full text-neutral-500 dark:text-neutral-300";
	const onPage = "h-full w-full text-blackdark:text-neutral-300";
	const links = [
		{
			title: "Home",
			icon: <House className={pathname === "/" ? onPage : offPage} />,
			href: "/",
		},

		{
			title: "About",
			icon: <Info className={pathname === "/about" ? onPage : offPage} />,
			href: "/about",
		},
		{
			title: "meowblog",
			icon: <Image src={Logo} width={20} height={20} alt="Aceternity Logo" />,
			href: "#",
		},
		{
			title: "Social",
			icon: (
				/* */
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="p-1.5 aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative">
							<Waypoints className="h-full w-full text-neutral-500 dark:text-neutral-300 text-xs" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Socials</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Link href="">
							<DropdownMenuItem>
								<Github className="mr-2 h-4 w-4" />
								<span> Github </span>
							</DropdownMenuItem>
						</Link>
						<Link href="#">
							<DropdownMenuItem>
								<Instagram className="mr-2 h-4 w-4" />
								<span>Instagram</span>
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			),
			href: "#",
		},

		{
			title: "Admin",
			icon: <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
			href: "/auth",
		},
	];
	return (
		<div className="fixed bottom-0 flex items-center justify-center w-full z-10">
			<FloatingDock items={links} />
		</div>
	);
};

export default NavigationDock;
