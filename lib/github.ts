import { GithubRepo } from "@/types";
import { siteConfig } from "@/lib/config";

const GITHUB_API = "https://api.github.com";

/**
 * Fetches public repositories for the configured GitHub username.
 * Runs on the server (see app/api/github/route.ts) and is revalidated
 * hourly so the site doesn't hammer the unauthenticated rate limit.
 */
export async function getGithubRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${siteConfig.github}/repos?per_page=100&sort=updated`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }

  const repos: GithubRepo[] = await res.json();

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}
