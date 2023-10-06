# ReadingTime

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

ReadingTime -- set and achieve your reading goals

[Live demo site here](https://readingtime-nextjs.vercel.app/)
![ReadingTime screenshot](https://i.ibb.co/54PKMHk/Screen-Shot-2023-10-06-at-1-10-57-PM.png)

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

1. After implementing SSR to increase load times from as slow as 5.5secs, to 138ms.
2. The Google Books API returns occasionally unrefined results, such as duplicate titles, and books with page counts of 0. I implemented some features, such as page count edit, to circumvent the API's quirks on the user end.
3. Future features include: a journal feature (microblogging) and audiobook/text toggling.

## Lessons Learned:

When working with an unfamiliar tech stack, it is crucial to know what each component does. Coming from MVC-organized JavaScript, I was not sure the best way to organize my code in Next.js, which blurs the line between client and server. I was able to make a functional app, but in the future I would like to organize my back-end code to better separate concerns. 

In that same vein, I worked with Next.js as though it were just a Ract library with a few additional features. After taking advantage of things like Link and SSR, I was able to drastically improve performance. 

I used an out-of-the-box auth solution, Clerk, which requires a fair bit of setup, and was challenging to implement at times due to the constantly changing docs. It seemed a nice trade-off from something like Passport.js, whose node implementation was much more rudimentary, but the abstraction of auth through Clerk made some things, such as middleware, more difficult to understand. 

Implementing an animation library felt like Pandora's box -- framer-motion is sophisticated and complicated, but capable of some delightful UI interactivity. While nice, I did feel like the time spent learning the library might have been better spent elsewhere, though for the future I do have some familiarity. 

A tradeoff for using sophisticated animations is a compromised mobile experience. On my device, the animations don't run super smoothly, or don't translate well to the mobile layout.

## Running it locally

First, run npm i to install the dependencies. Then, establish a connection with MongoDB Atlas, supplying a URI in the .env folder and any other information required of the desired Clerk auth providers. Finally, run the development server:

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
