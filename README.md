# Junior Developer Technical Task: "Product Catalog Lite"

## A. Setup Instructions

1. Install Node.js (version ^20.19.0 || >=22.12.0) For lastest version of [Vue.js](https://vuejs.org/guide/quick-start.html)
2. `git clone https://github.com/ahmadalbourhan/vue-product.git`
3. Change directory `cd vue-product`
4. Install dependency `npm install`
5. Run the development server `npm run dev`
6. Open the app Once ready, usually `http://localhost:5173`
7. You can Check my deployment link: [vue app](https://vue-product-beige.vercel.app/)

## B. Tech Stack & Why

1. Vue.js 3: I chose `Composition API` for better logic reuse and cleaner code organization using `<script setup>`
2. TypeScript: Using TypeScript provides type safety.
3. Native Fetch API: While `Axios` is preferred, I use fetch API for this small task.
4. Tailwind CSS: Saving styling time during this task.
5. Git and Github: I used Git for version control to track my progress and GitHub to host the code.
6. Vercel:I went with Vercel because it makes deployment easy, it syncs with my GitHub and pushes updates live without any manual setup.

## C. Reflection Questions

1. What would you improve if you had more time?

- Since Vue is a component-based library, I'd like to split this into smaller files. It's fine in `App.vue` for now since it’s only 100 lines, but using components is the way to go for scalability.
- I'd implement this by using Props/Emits for component communication. I'd also love to level up the features by adding `Vue Router` for shareable product links, swapping the "Loading" text for sleek Tailwind skeleton screens to polish the UI, and integrating `Pinia` for state management if the app grows.

2. Describe a time you learned a new technology from scratch.

> What was it?

- I applied for an entry-level Full Stack role requiring Next.js and Laravel. Even though I was new to these frameworks, I passed the interview and spent my preparation period diving into the Next.js App Router documentation and Laracasts for Laravel. I even built a small CRUD project to solidify the foundations.

> What challenges did you face?

- When I started, I faced a common real problem, while the project used the latest dependencies (Next.js 15+ and Laravel 11+), the actual code was largely legacy logic or AI-generated that didn't follow modern best practices. This created a confusing gap where the dependencies was new, but the patterns were outdated, making it difficult to apply the modern techniques I had just studied.

> How did you approach learning it?

- To bridge this gap, I went back to the legacy documentation to understand how older versions functioned and used my new knowledge to refactor code as I worked. I focused on adapting my learning to the specific needs of the company, ensuring the code became cleaner and more aligned with modern standards over time.

3. If this had 10,000 products, what performance issues might arise? How would you handle
   them?

> Displaying thousands of product cards at once can struggle the browser and slow the app, and sending all 10,000 products from the server in a single batch would take a long time to load. Similarly, searching and filtering through that many items with each keystroke could make the experience feel sluggish.

> Pagination (like 20 per page), infinite scroll (Load products only when the user scrolls and render on the screen), backend filtering (Let the server handle searching), use debouncing and waiting until the user stops typing before running the search and use Memo and data caching.
