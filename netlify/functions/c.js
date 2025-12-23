exports.handler = async (event) => {
  const token = event.queryStringParameters?.t || "";

  // Fire-and-forget tracking call to n8n (doesn't block redirect)
  const trackBase = process.env.N8N_TRACK_URL; // set in Netlify env vars
  const secret = process.env.N8N_SECRET;       // optional
  if (token && trackBase) {
    fetch(`${trackBase}?t=${encodeURIComponent(token)}`, {
      method: "GET",
      headers: secret ? { "x-internal-secret": secret } : {},
    }).catch(() => {});
  }

  // Redirect to TestBuddy
  const dest = "https://www.testbuddy.dev/";

  return {
    statusCode: 302,
    headers: {
      Location: dest,
      "Cache-Control": "no-store",
    },
    body: "",
  };
};
