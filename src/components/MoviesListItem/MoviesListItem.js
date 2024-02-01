import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getTMDBImgSrc from "../../utils/getTMDBImgSrc";
import { useAuth } from "../../contexts/auth.context";
import { useProfile } from "../../contexts/profile.context";

import styles from "./MoviesListItem.module.scss";

function MoviesListItem({ movie }) {
  const { isLoggedIn } = useAuth();
  const { likeMovie, unlikeMovie, likedMovies } = useProfile();
  const [isLiked, setIsLiked] = useState(
    likedMovies.some((likedMovie) => likedMovie.id === movie.id)
  );

  useEffect(() => {
    setIsLiked(likedMovies.some((likedMovie) => likedMovie.id === movie.id));
  }, [likedMovies, movie.id]);

  const handleClickLike = (e) => {
    e.stopPropagation();
    likeMovie(movie);
  };

  const handleClickUnlike = (e) => {
    e.stopPropagation();
    unlikeMovie(movie);
  };

  return (
    <div className={styles.wrapper}>
      <Link to={`/movies/${movie.id}`} className={styles.wrapper}>
        <img src={getTMDBImgSrc(movie.backdrop_path)} alt={movie.title} />
        <div className={styles.titleWrapper}>
          <h6>{movie.title}</h6>
        </div>
      </Link>
      {/* 로그인 상태 + 좋아요 안누른 item은 좋아요 표시  */}
      {isLoggedIn && !isLiked && (
        <button onClick={handleClickLike} className={styles.buttonLike}>
          좋아요
        </button>
      )}
      {/* 좋아요 누른 item은 좋아요취소 버튼 표시 */}
      {isLoggedIn && isLiked && (
        <button onClick={handleClickUnlike} className={styles.buttonUnlike}>
          좋아요취소
        </button>
      )}
    </div>
  );
}

export default MoviesListItem;
