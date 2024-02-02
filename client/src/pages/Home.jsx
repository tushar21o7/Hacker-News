import { useGlobalContext } from "../contexts/GlobalContext";
import axios from "axios";

const Home = () => {
  const { isLoggedIn, newsArray, setNewsArray, updateNewsArray } =
    useGlobalContext();

  const toggleReadStatus = async (id, readStatus) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const body = { readStatus: !readStatus };
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/news/${id}`,
        body,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const updatedNewsArray = updateNewsArray(data.data);
      setNewsArray(updatedNewsArray);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id, readStatus) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const body = { readStatus };
      const { data } = await axios.patch(
        `http://localhost:3000/api/v1/news/${id}`,
        body,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const updatedNewsArray = updateNewsArray(data.data);
      setNewsArray(updatedNewsArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="news-container">
      {newsArray.map((newsField) => {
        const {
          id,
          url,
          newsUrl,
          newsText,
          postedOn,
          upvotesCount,
          commentsCount,
          readStatus,
        } = newsField;

        const activeClass = readStatus ? "active" : "";

        return (
          <div key={newsUrl}>
            <div className="news-upper">
              <a className={`news-url ${activeClass}`} href={newsUrl}>
                {newsText}
              </a>
              <a
                className="author-url"
                href={`https://news.ycombinator.com/from?site=${url}`}
              >
                ({url})
              </a>

              {isLoggedIn && (
                <div
                  className="checkbox"
                  onClick={() => toggleReadStatus(id, readStatus)}
                >
                  <label htmlFor="checkbox" id="checkbox">
                    Mark as read
                  </label>
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    defaultChecked={readStatus}
                  />
                </div>
              )}
            </div>
            <div className="news-details">
              <span className="hover">{upvotesCount} upvotes</span> | Posted on:{" "}
              <span className="hover">{postedOn}</span> |{" "}
              <span className="hover">{commentsCount} comments</span>
            </div>

            {isLoggedIn && (
              <button
                onClick={() => deleteNews(id, readStatus)}
                className="delete-btn"
              >
                Delete
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
