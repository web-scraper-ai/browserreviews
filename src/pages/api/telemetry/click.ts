import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const text = await request.text();
		if (!text) {
			return new Response(JSON.stringify({ ok: false, error: "Empty body" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}

		let payload: any = {};
		try {
			payload = JSON.parse(text);
		} catch {
			return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}

		const { provider, source_page, click_location, event_type, ts } = payload;
		console.log(`[Telemetry] ${event_type || 'click'}: provider=${provider} page=${source_page} location=${click_location} ts=${ts || Date.now()}`);

		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store, max-age=0"
			}
		});
	} catch (err: any) {
		return new Response(JSON.stringify({ ok: false, error: err?.message || "Internal error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
