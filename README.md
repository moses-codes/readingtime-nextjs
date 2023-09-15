# ReadingTime

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

ReadingTime -- set and achieve your reading goals

[Live demo site here](https://readingtime-nextjs.vercel.app/)

## What does it do

ReadingTime is a habit tracker for readers. You can choose from a wide selection of books, then set a reading goal that you can check off when it's met. 

## Why it was made

I created ReadingTime as a tool for myself to keep tab of daily reading goals. Inspired by the works of James Clear (Atomic Habits) and BJ Fogg (Tiny Habits), as well as habit tracking apps like Zero, I wanted to take that design mindset into an application for readers.

Popular reader-centric web applications favor the quantity of books that a user reads over the act of reading itself. A major feature of both Storygraph and Goodreads is setting a goal number of books to read within a year. This has some side effects:

1. Users are prompted to congratulate each other when their goals for the year have been met, rather than congratulate the act of reading itself.
2. In pursuit of a number of books rather than the habit of reading, users often seek books with lower page counts to reach their goals faster.

GoodReads is also a place for book reviews and blogging, which makes the site quite confusing to use. I wanted to pare down the functionality of ReadingTime to a single focus. GoodReads is also notorious for reviews making or breaking the success of books and authors, and I wanted ReadingTime to be focused solely on the user and their habits.

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Node.js, MongoDB, Clerk, framer-motion

ReadingTime uses the routing capabilities of Next.js to create a fast and responsive SPA, as well as the API router to handle backend requests. React handles the front end, and it was styled with Tailwind CSS. Clerk is my user management system of choice here due to the ease of implementing it on both ends of the stack.

For the first time I used an animation library to create a professional, "delightful" user experience.

## Optimizations
*(optional)*

1. A journal system. While I don't want full reviews to ever be a focus of the site, I would like readers to reflect on what they read when their goals are met. I will have to implement new fields in the User Schema, such a a journal.

## Lessons Learned:

More and more does finding clever workarounds to the front end experience feel like the design of a set of a TV Show or Movie. For example, I was having issues with framer-motion and the DOM. When a modal opens, changing information on the modal would cause the original DOM element to become visible behind it. The solution was keeping the selected DOM element hidden while the modal was open, maintaining the illusion that the modal "pops out" form the DOM.

As features are proposed, it's crucial to consider the way that the rest of the code is structured. When adding my 'goal-setter' feature, which changes the appearance of books in the shelf as goals are fulfilled (or fallen behind), many things I ahdn't considered prior came up. One was the way time is handled: when I say "the goal state should expire the next day". do I mean in 24 hours? Midnight local time the next day? What if they cross a time zone that causes a goal to become "unfulfilled?" It's extremely important not only to sketch out the scope of the app from the beginning, but to also set yourself up through future expansion later. 

## Running it locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
