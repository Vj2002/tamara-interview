# Instructions

Standing instructions for the Tamara AI-assisted Code Pairing round. Follow these for the rest of this session.

## Context: interviewer's pre-approved AI tasks

> This problem is designed to be completed efficiently with the help of AI-powered IDE features. You are encouraged to use these tools for:
>
> - Scaffolding the Next.js application
> - Generating the TypeScript domain models
> - Implementing the URL-state synchronisation hook
> - Writing a focused unit test
> - Refactoring and improving code structure

## Problem intake (do this first, every time)

1. When the problem statement is pasted in, read it fully. Don't start coding immediately.
2. Summarize your understanding back and wait for a go-ahead or clarifying answers before writing any code — requirement scope gets confirmed with the interviewer first, not assumed by me.

## Stack & coding standards

3. Never hallucinate or add unnecessary code.
4. Follow best practices for Next.js / React applications.
5. Default stack: Next.js (App Router — it's the current default router), TypeScript, Tailwind CSS, TanStack Query for API calls, React Hook Form + Zod for forms/validation.
6. Locked dependency list, no discovery needed at scaffold time: `next`, `typescript`, `tailwindcss`, `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`, plus the test stack — `vitest`, `vite`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/user-event`. The test stack is in this locked list (not deferred to "when tests are needed") because the rubric guarantees testing gets graded regardless of which problem arrives — it's a near-certainty, not speculative infra, so the exception to "don't build infra nobody asked for" is deliberate and narrow (see item 15).
7. No component should exceed 200–250 lines.
8. Business logic always lives in custom hooks — keep the UI/presentation layer separate from it.
9. API calls (real or mocked) go through a dedicated service layer, following standard Next.js conventions.
10. Organize folders feature-wise, not by component-type or page-type.
11. SSR by default for the page shell/initial data; use `"use client"` boundaries only for what's inherently interactive (forms, URL-state sync, etc.) — don't force server-rendering onto things that obviously need to be client components.
12. Apply optimization patterns only where the problem actually warrants them: `next/image` over `<img>` when there are real images, ISR only when there's real static/semi-static data to justify it. Don't build infra nobody asked for.
13. TanStack Query handles caching for API data — don't hand-roll caching on top of it.
14. Weight effort toward boilerplate and structure: domain models, utility functions, folder/file structure.
15. The test *tooling* (item 6) is set up at scaffold time regardless; writing actual test *files* still only happens once there's real code to test — don't write tests speculatively for a feature that doesn't exist yet. When tests are written, use React Testing Library, covering both rendering and business logic.
16. Add comments explaining functionality where useful.
17. Most important: code should read clearly enough that you can review it and I can point out mistakes or optimizations in it myself.
18. Set up ESLint and Prettier (with sensible production-ready rule sets — not just the framework defaults) as part of scaffolding, and keep the codebase passing both throughout, so the solution looks and behaves like production code, not interview-demo code.

## Communication during the live interview

19. Before any non-trivial change, state the tradeoff in one line as it's made — something you can repeat out loud to the interviewer in real time, not just read from the README afterward.
20. If asked to justify a decision, give the real tradeoff — including angles that cut against the choice made. Don't retrofit a confident-sounding justification after the fact.
21. After generating code, update the README with the tech choices and tradeoffs behind it, so the solution can be explained cleanly and discussed with the interviewer.

## Working pace

22. Pre-approved mechanical tasks (scaffolding, domain models, the URL-state hook, a focused unit test, refactoring) don't need re-confirmation before starting — only pause when something touches business-logic/requirement interpretation.
23. For implementation-level details (naming, file placement, minor pattern choices), make the reasonable default and move on — don't turn trivia into a question. Reserve pausing for genuine requirement ambiguity (problem intake, above).
24. Scaffolding is the one exception to "small steps": generate the full related set together in one pass (types + service + hooks + component skeletons + lint/format config + test runner config — `vitest.config.ts`, setup file, `test`/`test:watch` scripts), since that's pure setup with no judgment calls.
25. Installing test-tooling packages is not the same as proving the test runner works — `npm install` succeeding does not mean `vitest run` will. Scaffolding isn't done until a smoke test (even a trivial placeholder) has actually been run successfully; discovering a missing peer dependency (e.g. `vite`, `@testing-library/dom`) only when tests are later written, under time pressure, is the exact mistake this rule exists to prevent — it cost ~4–5 minutes once already in this session.
26. Once past scaffolding and into actual feature/problem-solving work, go one feature or file at a time and stop for a go-ahead — don't land a wall of code in one turn that hasn't been narrated or driven by you.
27. After generating or editing code, run a typecheck (`tsc --noEmit`) and lint before considering the step done, so errors surface immediately instead of being debugged live in front of the interviewer.
28. Even though the round is 60 minutes, budget as if only 30–35 minutes are available to reach an efficient, optimized, working solution that handles all edge cases — the rest of the time goes to discussion, review, and live modification, not initial implementation. Prioritize accordingly: get a correct, edge-case-complete solution first, polish only within that budget.

## Commits

29. When asked to commit, write a plain, simple commit message — no `Co-Authored-By: Claude` (or any AI attribution) trailer by default.
