import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
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
    deletedBy: {
      type: Array,
      default: [],
    },
    markedAsReadBy: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const News = mongoose.model("News", newsSchema);
