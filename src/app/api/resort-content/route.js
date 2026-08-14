import { getResortContent } from "@/lib/services/content";

export async function GET() {
  try {
    const content = await getResortContent();
    return Response.json(content, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return Response.json(
      { error: "Live resort content could not be reached.", details: error.message },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
