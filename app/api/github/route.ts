import { NextResponse } from "next/server";
import { getGithubRepos } from "@/lib/github";

export async function GET() {
  try {
    const repos = await getGithubRepos();
    return NextResponse.json({ repos });
  } catch (error) {
    return NextResponse.json(
      { repos: [], error: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 }
    );
  }
}
