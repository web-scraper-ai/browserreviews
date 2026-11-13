import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
	try {
		const res = await fetch("https://tls.peet.ws/api/all", {
			headers: {
				"Accept": "application/json",
				"User-Agent": request.headers.get("user-agent") || "Mozilla/5.0",
			},
			signal: AbortSignal.timeout(6000),
		});

		if (res.ok) {
			const data = await res.json();
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Cache-Control": "no-store, max-age=0",
				},
			});
		}
	} catch (e: any) {
		// Fallback response if external API is unreachable
	}

	return new Response(
		JSON.stringify({
			status: "fallback",
			ip: request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "Client",
			user_agent: request.headers.get("user-agent") || "Unknown",
			http_version: "h2",
			tls: {
				ja4: "t13d3112h2_e8f1e7e78f70_b26ce05bbdd6",
				ja3_hash: "0149f47eabf9a20d0893e2a44e5a6323",
				tls_version_negotiated: "772",
			},
		}),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		}
	);
};
