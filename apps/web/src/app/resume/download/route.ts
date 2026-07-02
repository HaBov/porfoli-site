import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

import { NextResponse } from "next/server";

import { activeResume } from "@/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function resolveResumePath(): Promise<string> {
  const candidates = [
    join(
      process.cwd(),
      "public",
      "downloads",
      activeResume.filename,
    ),
    join(
      process.cwd(),
      "apps",
      "web",
      "public",
      "downloads",
      activeResume.filename,
    ),
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Continue checking the next valid project root.
    }
  }

  throw new Error(
    `Resume file "${activeResume.filename}" was not found.`,
  );
}

export async function GET(): Promise<NextResponse> {
  try {
    const filePath = await resolveResumePath();
    const fileBuffer = await readFile(filePath);

    const encodedFilename = encodeURIComponent(
      activeResume.filename,
    );

    return new NextResponse(
      new Uint8Array(fileBuffer),
      {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": [
            `attachment; filename="${activeResume.filename}"`,
            `filename*=UTF-8''${encodedFilename}`,
          ].join("; "),
          "Cache-Control":
            "private, no-store, max-age=0",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  } catch (error) {
    console.error("Resume download failed", error);

    return NextResponse.json(
      {
        message: "Resume PDF is currently unavailable.",
      },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
