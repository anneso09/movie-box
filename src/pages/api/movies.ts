import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/myData.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const newMovie = {
      slug: `movie_${data.movies.length + 1}`,
      title: req.body.title,
      description_short: req.body.description_short,
      description_long: req.body.description_long,
      rating: req.body.rating || null,
      type: req.body.type,
      img: req.body.img,
      isTrending: req.body.isTrending === true,
      comingSoon: req.body.comingSoon === true,
    };

    data.movies.push(newMovie);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ success: true, movie: newMovie });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}