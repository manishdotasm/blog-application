"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/ui/particles";

interface MyComponentProps {
	children: ReactNode; // Accepts anything that can be rendered
}

const ParticlesBackground: React.FC<MyComponentProps> = ({ children }) => {
	const { theme } = useTheme();
	const [color, setColor] = useState("#ffffff");

	useEffect(() => {
		setColor(theme === "dark" ? "#ffffff" : "#000000");
	}, [theme]);

	return (
		<div className="relative h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl min-h-screen">
			{children}
			<Particles className="absolute inset-0" quantity={100} ease={80} color={color} refresh />
		</div>
	);
};

export default ParticlesBackground;
