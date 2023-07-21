import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const id = request.nextUrl.pathname.split("signature/")[1];
	let responseData = {};
	if (id) {
		let data = id;
		let buff = Buffer.from(data, "base64");
		let text = buff.toString("ascii");
		if (text === "5eb677d5-2cd4-4b24-aa7c-1b27995438d6") {
			responseData = {
				name: "Yanet Arias",
				position: "CTO (Chief Technical Officer)",
				company: "SoftCity Ec, Inc.",
				date: "Thu, 20 July 2023 17:32 UTC-5",
				file: "https://firebasestorage.googleapis.com/v0/b/softcity-services.appspot.com/o/Contractor_Reference_Miguel_Langarano.pdf?alt=media&token=dc8752b4-c213-451d-91fc-7aec6339ef81",
			};
		} else {
			responseData = {
				error: "The signature is not valid. Check the integrity of the signature.",
			};
		}
	}
	return new Response(JSON.stringify({ data: responseData }));
}
