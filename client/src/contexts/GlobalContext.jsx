import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

export const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const User = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("accessToken")
  );
  const [newsArray, setNewsArray] = useState([]);

  const updateNewsArray = (givenArray) => {
    const arr = givenArray.map((newsField) => {
      const userId = sessionStorage.getItem("userId") || "";
      const updatedReadStatus = newsField.markedAsReadBy.includes(userId);
      return { ...newsField, readStatus: updatedReadStatus };
    });

    const sortedNewsArray = arr.sort((a, b) => b.createdAt - a.createdAt);
    return sortedNewsArray;
  };

  const fetchNewsArray = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      let resp;
      if (isLoggedIn) {
        resp = await axios(
          "https://hacker-news-8q32.onrender.com/api/v1/news",
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
      } else {
        resp = await axios("https://hacker-news-8q32.onrender.com/api/v1/news");
      }

      const { data } = resp.data;

      const newNewsArray = updateNewsArray(data);
      setNewsArray(newNewsArray);
    } catch (error) {
      console.log(error);
    }
  }, [setNewsArray]);

  useEffect(() => {
    fetchNewsArray();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        newsArray,
        setNewsArray,
        updateNewsArray,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default User;
