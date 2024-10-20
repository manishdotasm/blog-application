import "@/app/globals.css";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}
