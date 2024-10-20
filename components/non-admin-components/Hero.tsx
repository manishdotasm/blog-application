// Hero.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface HeroProps {
	setSearchTerm: (term: string) => void;
}

export default function Hero({ setSearchTerm }: HeroProps) {
	return (
		<>
			{/* Hero */}
			<div className="relative overflow-hidden">
				<div className="container py-10">
					<div className="text-center">
						<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Blogs!</h1>
						<p className="mt-3 text-xl text-muted-foreground">Read our Blogs!</p>
						<div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
							{/* Form */}
							<form onSubmit={(e) => e.preventDefault()}>
								<div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
									<div className="flex-[1_0_0%]">
										<Label htmlFor="article" className="sr-only">
											Search any blog!
										</Label>
										<Input name="article" className="h-full" id="article" placeholder="Search for a blog..." onChange={(e) => setSearchTerm(e.target.value)} />
									</div>
									<div className="flex-[0_0_auto]">
										<Button>Search</Button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{/* End Hero */}
		</>
	);
}
