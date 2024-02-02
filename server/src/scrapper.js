import cheerio from "cheerio";
import axios from "axios";
import { News } from "./models/news.model.js";

export const scrapeAndAddToDB = async () => {
  const count = await News.countDocuments();
  if (count) {
    console.log(count);
    return;
  }

  const fetchData = async (searchUrl) => {
    try {
      const response = await axios(searchUrl);
      const $ = cheerio.load(response.data);
      const selTool1 = $(".athing");
      const selTool2 = $(".subtext");

      for (let i = 0; i < selTool1.length; i++) {
        const url = $(selTool1[i]).find(".sitestr").text();
        const newsUrl = $(selTool1[i]).find(".titleline a").attr("href");
        const newsText = $(selTool1[i])
          .find(".titleline > :first-child")
          .text();
        const postedOn = $(selTool2[i]).find(".age").attr("title");
        const upvotes = $(selTool2[i]).find(".score").text();
        const comments = $(selTool2[i]).find(".subline > :last-child").text();

        const upvotesCount =
          parseInt(Number(upvotes.replace(/[^0-9.-]+/g, ""))) || 0;
        const commentsCount =
          parseInt(Number(comments.replace(/[^0-9.-]+/g, ""))) || 0;

        const newsField = {
          id: i,
          url,
          newsUrl,
          newsText,
          postedOn,
          upvotesCount,
          commentsCount,
        };

        const updateIfPresent = await News.findOneAndUpdate(
          { newsUrl },
          {
            $inc: { upvotesCount: upvotesCount, commentsCount: commentsCount },
          },
          { new: true }
        );

        if (updateIfPresent) continue;
        await News.create(newsField);
      }
    } catch (error) {
      console.log(error);
    }
  };

  for (let page = 1; page <= 3; page++) {
    const url = `https://news.ycombinator.com/news?p=${page}`;
    await fetchData(url);
  }

  console.log("Scrapper is working!");
};
