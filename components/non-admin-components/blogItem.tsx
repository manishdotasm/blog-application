import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogItem = ({ id, title, description, category, image, imageAlt, date }: { id: number; title: string; description: string; category: string; image: any; imageAlt: string; date: string }) => {
	return (
		<Link className="group flex flex-col border border-gray-200 h-auto hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5 dark:border-neutral-700 dark:hover:border-transparent dark:hover:shadow-black/40 dark:focus:border-transparent dark:focus:shadow-black/40" href={"/blogs/" + id}>
			<div className="relative aspect-w-16 aspect-h-11">
				<span className="absolute top-2 right-2 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
					<span className="size-1.5 inline-block rounded-full bg-blue-800 dark:bg-blue-500"></span>
					{category}
					<span className="size-1.5 ml-1 inline-block rounded-full bg-blue-800 dark:bg-blue-500"></span>
					{date}
				</span>
				<Image className="w-full object-cover rounded-xl z-0 h-[160px]" src={image} alt={imageAlt} width={200} height={200} />
			</div>
			<div className="my-6">
				<h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:group-hover:text-white">{title}</h3>
				<p className="mt-5 text-gray-600 dark:text-neutral-400">{description.substring(0, 40)}...</p>
			</div>
		</Link>
	);
};

export default BlogItem;
