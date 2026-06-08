import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/myData.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const { slug } = req.query;

  if (req.method === "PUT") {
    data.movies = data.movies.map((m: any) =>
      m.slug === slug ? { ...m, ...req.body } : m
    );
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(200).json({ success: true });

  } else if (req.method === "DELETE") {
    data.movies = data.movies.filter((m: any) => m.slug !== slug);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(200).json({ success: true });

  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}