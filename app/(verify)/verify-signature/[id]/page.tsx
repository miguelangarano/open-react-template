import Link from "next/link";

export const metadata = {
	title: "Signature Verification - SoftCity",
	description: "Page description",
};

export default async function VerifySignatureById({
	params: { id },
}: {
	params: { id: string };
}) {
	const signatureData = getSignatureData(id);

	const [data] = await Promise.all([signatureData]);

	return (
		<section className="relative">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-32 pb-12 md:pt-40 md:pb-20">
					{/* Page header */}
					<div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
						<h1 className="h1">
							This is the signature verification center.
						</h1>
					</div>

					{data.data.error && (
						<div className="max-w-sm mx-auto">
							<label className="block text-gray-300 text-sm font-medium mb-1">
								{data.data.error}
							</label>
						</div>
					)}

					{/* Form */}
					{!data.data.error && (
						<div className="max-w-sm mx-auto">
							<form>
								<div className="flex flex-wrap -mx-3 mb-4 gap-4">
									<div className="w-full px-3">
										<label
											className="block text-gray-300 text-sm font-medium mb-1"
											htmlFor="name"
										>
											Name
										</label>
										<input
											id="name"
											type="text"
											className="form-input w-full text-gray-300"
											placeholder="Name"
											disabled
											value={data.data.name}
										/>
									</div>
									<div className="w-full px-3">
										<label
											className="block text-gray-300 text-sm font-medium mb-1"
											htmlFor="position"
										>
											Position
										</label>
										<input
											id="position"
											type="text"
											className="form-input w-full text-gray-300"
											placeholder="Position"
											disabled
											value={data.data.position}
										/>
									</div>
									<div className="w-full px-3">
										<label
											className="block text-gray-300 text-sm font-medium mb-1"
											htmlFor="company"
										>
											Company
										</label>
										<input
											id="company"
											type="text"
											className="form-input w-full text-gray-300"
											placeholder="Company"
											disabled
											value={data.data.company}
										/>
									</div>
									<div className="w-full px-3">
										<label
											className="block text-gray-300 text-sm font-medium mb-1"
											htmlFor="date"
										>
											Signature Date
										</label>
										<input
											id="date"
											type="text"
											className="form-input w-full text-gray-300"
											placeholder="Signature Date"
											disabled
											value={data.data.date}
										/>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mt-6">
									<div className="w-full px-3">
										<Link
											href={data.data.file}
											target="_blank"
											className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
										>
											Download File
										</Link>
									</div>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

const getSignatureData = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_API ?? ""}/signature/${id}`,
		{ next: { revalidate: 0 } }
	);
	const repo = await res.json();
	return repo;
};
