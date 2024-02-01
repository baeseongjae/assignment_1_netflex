import { createContext, useState, useContext } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }) {
  const [nickname, setNickname] = useState("");
  const [likedMovies, setLikedMovies] = useState([]);

  const updateNickname = (newNickname) => {
    setNickname(newNickname);
  };

  const likeMovie = (movie) => {
    setLikedMovies((movies) => {
      // 중복가능성 검사
      if (!movies.includes(movie)) {
        return [...movies, movie];
      }
      return movies;
    });
  };

  const unlikeMovie = (targetMovie) => {
    setLikedMovies((movies) => {
      return movies.filter((movie) => movie !== targetMovie);
    });
  };

  const value = {
    nickname,
    updateNickname,
    likedMovies,
    likeMovie,
    unlikeMovie,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContext;
