import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		let payload: any = {};
		try {
			payload = await request.json();
		} catch {
			try {
				const text = await request.text();
				if (text && text.trim()) {
					payload = JSON.parse(text);
				}
			} catch {
				payload = {};
			}
		}

		const { provider, source_page, click_location, event_type, ts } = payload || {};
		console.log(`[Telemetry] ${event_type || 'click'}: provider=${provider || 'unknown'} page=${source_page || '/'} location=${click_location || 'unknown'} ts=${ts || Date.now()}`);

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
