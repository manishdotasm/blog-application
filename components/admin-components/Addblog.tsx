"use client";
import { Cover } from "@/components/ui/cover";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.string(),
	imageAlt: z.string(),
});

const categories = [
	{ value: "Business", label: "Business" },
	{ value: "Strategy", label: "Strategy" },
	{ value: "Health", label: "Health" },
	{ value: "Creative", label: "Creative" },
	{ value: "Environment", label: "Environment" },
	{ value: "Adventure", label: "Adventure" },
];

const Addblog = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			category: "business",
			imageAlt: "",
		},
	});

	const [file, setFile] = useState<File | null>(null);
	const [filePreview, setFilePreview] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		setFile(selectedFile);

		if (selectedFile) {
			const previewUrl = URL.createObjectURL(selectedFile);
			setFilePreview(previewUrl);
		} else {
			setFilePreview(null);
		}
	};

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("description", values.description);
			formData.append("category", values.category);
			formData.append("imageAlt", values.imageAlt);
			if (file) {
				formData.append("image", file);
			}
			console.log(formData);

			await axios.post("/api/blog", formData, {
				headers: {
					"Content-Type": "form-data",
				},
			});

			// Reset form fields and file preview
			form.reset();
			setFile(null);
			setFilePreview(null);

			toast.success("Blog post added successfully!");
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Failed to submit the form. Please try again.");
		}
	}

	return (
		<div className="w-full h-auto mb-20">
			<ToastContainer />
			<h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
				<Cover>ADD</Cover> Blog
			</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Blog Title</FormLabel>
								<FormControl>
									<Input placeholder="" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder="" className="resize-none" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Select Category</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem key={category.value} value={category.value}>
												{category.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>Choose a category.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* File Upload Section */}
					<div>
						<FormLabel>Upload File</FormLabel>
						<input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
						<label htmlFor="file-upload" className="cursor-pointer p-12 flex justify-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600">
							<div className="text-center">
								<span className="inline-flex justify-center items-center size-16 bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-700 dark:text-neutral-200">
									<svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
										<polyline points="17 8 12 3 7 8"></polyline>
										<line x1="12" x2="12" y1="3" y2="15"></line>
									</svg>
								</span>

								<div className="mt-4 flex flex-wrap justify-center text-sm leading-6 text-gray-600">
									<span className="pe-1 font-medium text-gray-800 dark:text-neutral-200">Drop your file here or</span>
									<span className="bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600">browse</span>
								</div>

								<p className="mt-1 text-xs text-gray-400 dark:text-neutral-400">Pick a file up to 2MB.</p>
							</div>
						</label>
						{file && (
							<div className="mt-2 text-sm text-gray-600">
								<span>Selected file: {file.name}</span>
								{file.type.startsWith("image/") && filePreview && (
									<div className="mt-2">
										<Image src={filePreview} alt="Preview" className="w-32 h-32 object-cover" height={32} width={32} />
									</div>
								)}
							</div>
						)}
					</div>

					<FormField
						control={form.control}
						name="imageAlt"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Alternative Text for Image</FormLabel>
								<FormControl>
									<Input placeholder="" className="resize-none" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default Addblog;
