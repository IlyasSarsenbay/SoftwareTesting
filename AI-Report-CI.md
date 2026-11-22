# SIS 2 — CI pipeline for Playwright: AI use report

## Model and tool

- Model: OpenAI GPT-6 (via Codex desktop).
- Tool: Codex coding agent with PowerShell access to my local repository.
- Date: 2026-11-15.

## My prompt

I asked the agent to set up the CI pipeline for SIS 2 in my `C:\Users\ASUS\Desktop\SOFTWARE` repository. Specifically, I requested:
- `.github/workflows/playwright.yml` configured with four shards and a report merge job.
- CI reporter settings in `playwright.config.ts` and a new `merge.config.ts`.
- A CI section and runtime table in `README.md`, `.gitignore` updates, and this AI usage report.

I provided the step-by-step SIS 2 requirements (triggers, npm caching, browser setup, artifact retention, sharding, and reporting) and instructed the agent to run local checks without fabricating GitHub Actions URLs or execution times, leaving them blank for me to fill in after real runs.

## Additional prompts and decisions

I didn't use any other prompts or external AI tools—everything was done in one session using the main prompt above. After inspecting the codebase, I went with the following setup decisions:

- Kept the existing Chromium-only configuration and the public demo `BASE_URL` (set as an optional Actions variable with the site URL as a fallback).
- Stuck with the project's current Playwright Test `1.64.1` and configured Node 22 for the Actions runner.
- Skipped adding a `webServer` block since the test suite runs against an external demo site.
- Added the GitHub Actions status badge pointing to my repository's `main` branch.
- Left the run links and timing table cells marked as pending so I can update them once real GitHub Actions runs finish.

## Changes made

- **Workflow (`.github/workflows/playwright.yml`):** Configured triggers for `push`, `pull_request`, and `workflow_dispatch`. Added npm dependency caching (`npm ci`), Chromium installation, a 4-shard matrix strategy, artifact uploads for per-shard test results and blob reports, and a final job to merge and upload the HTML and JUnit reports.
- **Playwright Config (`playwright.config.ts` & `merge.config.ts`):** Updated `playwright.config.ts` to enable `forbidOnly`, 2 retries, 1 worker per shard, and `list`, `blob`, and `junit` reporters when `CI` is set, while keeping the default HTML reporter for local runs. One worker per shard limits concurrent load on the shared public demo site. Created `merge.config.ts` to combine shard blobs into unified HTML and JUnit reports.
- **Documentation & Git (`README.md` & `.gitignore`):** Added a CI documentation section, the `main` branch status badge, local CI commands, and a placeholder runtime table to `README.md`. Updated `.gitignore` to exclude report folders, local `act` artifacts, and secret files.
