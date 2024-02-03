import { News } from "../models/news.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getAllNews = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    const newsArray = await News.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, newsArray, "Products retrieved successfully"));
  }

  const newsArray = await News.find({ deletedBy: { $nin: userId } });

  res
    .status(200)
    .json(new ApiResponse(200, newsArray, "Products retrieved successfully"));
};

const deleteNews = async (req, res) => {
  const {
    user: { _id: userId },
    params: { newsId },
    body: { readStatus },
  } = req;

  await News.findOneAndUpdate(
    { id: newsId },
    { $push: { deletedBy: userId } },
    { new: true }
  );

  if (readStatus) {
    await News.findOneAndUpdate(
      { id: newsId },
      { $pull: { markedAsReadBy: userId } },
      { new: true }
    );
  }

  const newsArray = await News.find({ deletedBy: { $nin: userId } }).select(
    "-deletedBy"
  );

  res
    .status(200)
    .json(new ApiResponse(200, newsArray, "Deleted successfully!"));
};

const toggleReadStatus = async (req, res) => {
  const {
    user: { _id: userId },
    params: { newsId },
    body: { readStatus },
  } = req;

  let newsField = await News.find({ id: newsId });
  if (!newsField) {
    throw new ApiError(500, `News with id ${newsId} does not exist`);
  }

  if (readStatus) {
    newsField = await News.findOneAndUpdate(
      { id: newsId },
      { $push: { markedAsReadBy: userId } },
      { new: true }
    );
  } else {
    newsField = await News.findOneAndUpdate(
      { id: newsId },
      { $pull: { markedAsReadBy: userId } },
      { new: true }
    );
  }

  console.log(newsField);

  const newsArray = await News.find({ deletedBy: { $nin: userId } }).select(
    "-deletedBy"
  );

  res.status(200).json(new ApiResponse(200, newsArray, "Toggled read status"));
};

export { getAllNews, deleteNews, toggleReadStatus };
