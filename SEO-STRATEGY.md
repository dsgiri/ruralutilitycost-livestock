# SEO Strategy for Livestock Tools

## Core Objective
To establish `livestock.ruralutilitycost.com` as an authoritative hub for agricultural calculators, focusing on long-tail search terms related to livestock management, growth tracking, and feed planning.

## 1. Technical SEO Configuration
* **Canonical URLs**: Ensure every page has a canonical URL pointing to the definitive version on `livestock.ruralutilitycost.com`.
* **Meta Tags**: 
  - Dynamic Title Tags (`<title>`) formatted as `[Tool Name] - Livestock Tools | Rural Utility Cost`.
  - Rich Meta Descriptions outlining the specific utility of the calculator (e.g., "Calculate daily feed requirements for cattle based on body weight and dry matter intake").
* **Open Graph & Twitter Cards**: Enable rich previews for social sharing (Facebook, X, LinkedIn) with specific preview image placeholders.
* **Structured Data (Schema.org)**: Use JSON-LD to declare the page as a `WebPage` or `SoftwareApplication` (specifically as an agricultural calculator) to improve rich snippets in search results.

## 2. Keyword Strategy
Each tool has been built to target specific long-tail keywords. 
* **Cattle Age Estimator**: "how to age a cow by teeth", "cattle dentition age chart", "estimate cattle age from weight".
* **Cattle Growth Tracker**: "beef cattle ADG calculator", "days on feed calculator", "cattle finishing weight projection".
* **Herd Feed Requirement**: "cow hay consumption calculator", "cattle dry matter intake calculator", "winter feed planning for beef".
* **Breeding Schedule Planner**: "cattle gestation calculator", "pig farrowing date calculator", "sheep breeding schedule planner".
* **Calving Interval Planner**: "cow days open calculator", "calving interval optimization", "365 day calving interval planner".
* **Livestock Weight Projection**: "project cattle weight", "future weight of steer calculator".
* **Goat Sheep Feed Planner**: "meat goat feed calculator", "sheep hay requirement calculator", "goat maintenance feed calculation".
* **Poultry Flock Growth**: "broiler FCR calculator", "meat bird feed conversion calculator", "poultry harvest weight estimator".

## 3. On-Page SEO (Tool Pages)
* Implement SEO component on every page dynamically.
* Ensure URL structures are clean: `/tool/cattle-age-estimator` instead of opaque IDs.
* Add semantic HTML (`<h1>`, `<h2>`, `<h3>`) inside the calculator views.

## 4. Next Steps for Implementation
1. Refine the `<SEO>` component to use a professional title suffix (remove "Optimized for search").
2. Update all existing `src/pages` and `src/data.ts` to ensure each tool has a robust, keyword-rich description.
3. Add Schema.org `WebApplication` structured data for the individual calculators.
