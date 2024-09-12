import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import logger from "@lib/logger/logger";

// explicit dynamic declaration
export const dynamic = "force-dynamic";

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
  const userForm = await req.json();

  try {
    logger.info("User Q&A:" + userForm);

    return NextResponse.json("server: Utilisateur verifié", { status: 200 });
  } catch (err: any) {
    console.error("An error occurred when you try to register a user:", err);
    NextResponse.json({ error: err.message }, { status: 500 });
  }
}
