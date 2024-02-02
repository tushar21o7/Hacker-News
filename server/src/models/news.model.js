import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    url: {
      type: String,
    },
    newsUrl: {
      type: String,
      required: true,
    },
    newsText: {
      type: String,
    },
    postedOn: {
      type: String,
      required: true,
    },
    upvotesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const News = mongoose.model("News", newsSchema);
