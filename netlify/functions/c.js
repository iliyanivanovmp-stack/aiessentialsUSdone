exports.handler = async (event) => {
  const token = event.queryStringParameters?.t || "";

  // ✅ Hardcoded n8n tracking webhook (PRODUCTION URL)
  const trackBase = "https://getrich1207.app.n8n.cloud/webhook/track-click";

  // Optional secret header (only if you implement this check in n8n)
  const secret = process.env.N8N_SECRET || "";

  // Send tracking call (quick + reliable)
  if (token) {
    try {
      await fetch(`${trackBase}?t=${encodeURIComponent(token)}`, {
        method: "GET",
        headers: secret ? { "x-internal-secret": secret } : {},
      });
    } catch (e) {
      // ignore tracking errors so redirect still works
    }
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
