// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  // Load any data your application needs for the API route
  return res.status(200).json({ hello: 'hello' });
}