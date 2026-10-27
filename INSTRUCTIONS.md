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

1. I won't get the full problem statement. I'll get a UI screenshot to replicate, saved in `src/screenshot/`, and the user's own written summary of the problem in the chat prompt, possibly in parts. Don't fill gaps in the summary with guesses about what the full problem says — ask instead.
2. First reply, before any code: restate what I understood, then list my questions — edge cases, ambiguous requirements, and anything the screenshot shows that the summary doesn't explain (or the reverse). Discuss them, and write no code until the user gives an explicit go-ahead. Then build following this file.
3. Treat the screenshot as part of the requirement scope: match its layout, spacing, and visual hierarchy as closely as the time budget allows, not just the described behavior. If no screenshot comes, design a clean, working UI on my own judgment. Use the `frontend-design` skill for UI work. With a screenshot, the screenshot decides every visual choice (layout, fonts, colors, spacing, even styles the skill calls generic); the skill only adds its quality floor and copy guidance — responsive layout, visible focus, reduced motion, accessible contrast, button text that says what happens, errors that say how to fix the problem, empty states that prompt action. Without a screenshot, follow its full design process, kept short to fit the time budget. The skill covers visual design only; code structure still follows this file.

## Stack & coding standards

4. Never hallucinate or add unnecessary code.
5. Follow best practices for Next.js / React applications.
6. Default stack: Next.js (App Router — it's the current default router), TypeScript, Tailwind CSS, TanStack Query for API calls, React Hook Form + Zod for forms/validation.
7. Locked dependency list, no discovery needed at scaffold time: `next`, `typescript`, `tailwindcss`, `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`, plus the test stack — `vitest`, `vite`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/user-event`. The test stack is in this locked list (not deferred to "when tests are needed") because the rubric guarantees testing gets graded regardless of which problem arrives — it's a near-certainty, not speculative infra, so the exception to "don't build infra nobody asked for" is deliberate and narrow (see item 16).
8. No component should exceed 200–250 lines.
9. Business logic always lives in custom hooks — keep the UI/presentation layer separate from it.
10. API calls (real or mocked) go through a dedicated service layer. For the interview, mock the API as plain TypeScript service functions that mirror a real request/response contract (including error shape and `AbortSignal` support) — not actual Next.js Route Handlers. Real route handlers are more realistic but cost setup time the 30–35 minute budget (item 33) doesn't afford.
11. Organize folders feature-wise, not by component-type or page-type.
12. SSR by default for the page shell/initial data; use `"use client"` boundaries only for what's inherently interactive (forms, URL-state sync, etc.) — don't force server-rendering onto things that obviously need to be client components.
13. Apply optimization patterns only where the problem actually warrants them: `next/image` over `<img>` when there are real images, ISR only when there's real static/semi-static data to justify it. Don't build infra nobody asked for.
14. TanStack Query handles caching for API data — don't hand-roll caching on top of it.
15. Weight effort toward boilerplate and structure: domain models, utility functions, folder/file structure.
16. The test _tooling_ (item 7) is set up at scaffold time regardless; writing actual test _files_ still only happens once there's real code to test — don't write tests speculatively for a feature that doesn't exist yet. When tests are written, use React Testing Library, covering both rendering and business logic.
17. Add comments explaining functionality where useful.
18. Most important: code should read clearly enough that you can review it and I can point out mistakes or optimizations in it myself.
19. Set up ESLint and Prettier (with sensible production-ready rule sets — not just the framework defaults) as part of scaffolding, and keep the codebase passing both throughout, so the solution looks and behaves like production code, not interview-demo code.
20. Accessibility is a hard target, not a best-effort nicety: aim for a Lighthouse accessibility score of 100. Concretely — every image has meaningful `alt` (or `alt=""` if decorative); every form input has an associated label; text/background contrast meets WCAG AA (≥4.5:1 normal text, ≥3:1 large text/icons); every interactive element is keyboard-reachable with a visible focus state; icon-only buttons/links get an `aria-label`; heading levels are sequential (no skipped levels); `<html lang="...">` is set; reach for ARIA only where semantic HTML genuinely isn't enough.
21. All UI must be responsive — mobile-first, usable down to small phone widths and up through desktop, no fixed-pixel layouts that break on resize.
22. All UI must be RTL-safe by default, regardless of whether the interviewer actually asks to see it demonstrated: Tamara operates primarily in Saudi Arabia, where Arabic (RTL) is a primary language. Use logical CSS properties (Tailwind's `ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`, not physical `ml-`/`mr-`/`pl-`/`pr-`/`left-`/`right-`) so layout doesn't break under `dir="rtl"`. A visible `dir` toggle in the UI is optional, added only if asked for or if time allows — the underlying code must be structurally RTL-safe either way. Full Arabic translation itself is out of scope.
23. Component library: shadcn/ui is already configured (`components.json`, `src/lib/utils.ts`, theme tokens in `globals.css`) on Base UI primitives — keyboard/ARIA behavior built in, RTL via Base UI's `DirectionProvider`, and `"rtl": true` so generated components use logical classes. No components are pre-added: when the problem needs one beyond plain HTML (dialog, select, tabs, etc.), run `npx shadcn@latest add <name>`, then `npm run format` (shadcn's generated style doesn't match our Prettier config). Don't hand-roll a component shadcn already provides. Init was done ahead of time because it's slow and network-dependent here (~5 min, failed twice in a dry run); `add` takes ~15s. Document any components added and their tradeoffs in the README (item 26).

## Communication during the live interview

24. Before any non-trivial change, state the tradeoff in one line as it's made — something you can repeat out loud to the interviewer in real time, not just read from the README afterward.
25. If asked to justify a decision, give the real tradeoff — including angles that cut against the choice made. Don't retrofit a confident-sounding justification after the fact.
26. Update the README once, at the end — after the working solution is complete and meets all (or almost all) edge cases, not incrementally after every feature. Cover the tech choices and tradeoffs behind the solution (including any component-library choice, item 23) so it can be explained cleanly and discussed with the interviewer.

## Working pace

27. Pre-approved mechanical tasks — scaffolding, the new problem's own domain models/types/constants (not just the generic scaffold), the URL-state hook, a focused unit test, refactoring — don't need re-confirmation before starting; only pause when something touches business-logic/requirement interpretation. The one-file-at-a-time rule (item 31) starts once business logic/hooks/components begin, not before.
28. For implementation-level details (naming, file placement, minor pattern choices), make the reasonable default and move on — don't turn trivia into a question. Reserve pausing for genuine requirement ambiguity (problem intake, above).
29. Scaffolding is the one exception to "small steps": generate the full related set together in one pass (types + service + hooks + component skeletons + lint/format config + test runner config — `vitest.config.ts`, setup file, `test`/`test:watch` scripts), since that's pure setup with no judgment calls.
30. Installing test-tooling packages is not the same as proving the test runner works — `npm install` succeeding does not mean `vitest run` will. Scaffolding isn't done until a smoke test (even a trivial placeholder) has actually been run successfully; discovering a missing peer dependency (e.g. `vite`, `@testing-library/dom`) only when tests are later written, under time pressure, is the exact mistake this rule exists to prevent — it cost ~4–5 minutes once already in this session.
31. Once past scaffolding/domain-modeling and into actual feature/business-logic work, go one feature at a time (e.g. a form with its hook and service) and stop for a go-ahead after each feature, not after each file — per-file stops cost too much of the 30–35 minute budget (item 33). Don't land a wall of code in one turn that hasn't been narrated or driven by you.
32. After generating or editing code, run a typecheck (`tsc --noEmit`) and lint before considering the step done, so errors surface immediately instead of being debugged live in front of the interviewer.
33. Even though the round is 60 minutes, budget as if only 30–35 minutes are available to reach an efficient, optimized, working solution that handles all edge cases — the rest of the time goes to discussion, review, and live modification, not initial implementation. Prioritize accordingly: get a correct, edge-case-complete solution first, polish only within that budget.

## Commits

34. Never commit during the interview on my own initiative — only when explicitly asked.
35. When asked to commit, write a plain, simple commit message — no `Co-Authored-By: Claude` (or any AI attribution) trailer by default.
