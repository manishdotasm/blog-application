"use client";

import { useState } from "react";

const AuthSteps = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async () => {
		const response = await fetch("/api/validate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			// Successful login, redirect to admin controls
			window.location.href = "/admin-controls";
		} else {
			// Handle error
			const errorText = await response.text();
			alert(errorText || "Login failed");
		}
	};

	return (
		<div>
			<div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
				<div className="p-4 sm:p-7">
					<div className="text-center">
						<h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Admin Authentication</h1>
					</div>
					<div className="mt-5">
						<form onSubmit={handleSubmit}>
							{/* Form Group */}
							<div>
								<label htmlFor="username" className="block text-sm mb-2 dark:text-white">
									Username
								</label>
								<div className="relative">
									<input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required />
								</div>
								{/* End Form Group */}
								{/* Form Group */}
								<div>
									<div className="flex justify-between items-center">
										<label htmlFor="password" className="block text-sm mb-2 dark:text-white">
											Password
										</label>
									</div>
									<div className="relative">
										<input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" />
									</div>
									{/* End Form Group */}
									{/* Checkbox */}
									<div className="flex items-center">
										<div className="flex">
											<input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
										</div>
										<div className="ms-3">
											<label htmlFor="remember-me" className="text-sm dark:text-white">
												Remember me
											</label>
										</div>
									</div>
									{/* End Checkbox */}
									<button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
										Go in!
									</button>
								</div>
							</div>
						</form>
						{/* End Form */}
						{message && (
							<div className="mt-4 text-center text-sm">
								<p className={message.includes("successful") ? "text-green-600" : "text-red-600"}>{message}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthSteps;
