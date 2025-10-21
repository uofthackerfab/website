# Repository Guidelines

## Project Structure & Module Organization
This Next.js 15 App Router project keeps all source under `src`. Route files live in `src/app`, with `layout.tsx`, `globals.css`, and equipment writeups grouped under `src/app/writeup/*`. Shared UI primitives (buttons, cards) sit in `src/components/ui`, and cross-cutting helpers belong in `src/lib/utils.ts`. Static assets (favicons, imagery) stay in `public`. Tailwind 4 configuration is handled through `postcss.config.mjs` and `src/app/globals.css`, while `components.json` tracks shadcn/ui component metadata—update it whenever you scaffold new primitives.

## Build, Test, and Development Commands
- `npm run dev` — start the Turbopack development server on http://localhost:3000 with fast refresh.
- `npm run build` — compile a production bundle; run before deployment to catch TypeScript or route errors.
- `npm run start` — serve the production build locally; use for smoke-testing optimized output.
- `npm run lint` — run the Next.js ESLint suite, enforcing both React and Tailwind best practices.

## Coding Style & Naming Conventions
Use TypeScript throughout; prefer `.tsx` for components and `.ts` for utilities. Follow the existing two-space indentation, omit semicolons (per ESLint config), and keep imports sorted by module type. Components should use PascalCase (`LiquidGlassPopup`), hooks use `use`-prefixed camelCase, and directory names stay kebab-case (`tube-furnace`). Styling relies on Tailwind utility classes; co-locate any component-specific CSS in the relevant `.tsx` file via class names instead of separate stylesheets. Mark interactive files with `"use client"` at the top when they rely on React state or effects.

## Testing Guidelines
There is no automated test suite yet; new work should add tests alongside features using React Testing Library under `src/__tests__` or colocated `*.test.tsx`. Target critical rendering logic (e.g., rotating headlines, popups) and ensure new components degrade gracefully. Before opening a PR, run `npm run lint` and exercise affected routes via `npm run dev`. Document any manual QA steps in the PR description so reviewers can reproduce them quickly.

## Commit & Pull Request Guidelines
Commits in this repo favor short, imperative summaries (`link`, `fix`, `add gif`); continue that pattern with clear subjects such as `spincoater: refine status badges`. Group related changes together and avoid mixing refactors with feature work. For PRs, include: a concise summary of the change, linked issue or context, screenshots or GIFs for UI updates, and a checklist of commands you ran (lint, build, manual QA). Request review after CI or linting passes so maintainers can focus on behavior instead of formatting.
