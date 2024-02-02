import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false });
    return accessToken;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if ([username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ username });
  if (existedUser) {
    throw new ApiError(409, "user with same username already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering");
  }

  res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully!"));
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, "username is not provided");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(404, "Invalid user credentials");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "Invalid user credentials");
  }

  const accessToken = await generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User logged in successfully"
      )
    );
};

const logoutUser = async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
};

export { registerUser, loginUser, logoutUser };
