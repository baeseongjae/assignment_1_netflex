import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../../contexts/profile.context";
import { useAuth } from "../../contexts/auth.context";
import api from "../../api/api";
import getTMDBImgSrc from "../../utils/getTMDBImgSrc";
import styles from "./MoviesDetailPage.module.scss";

function MoviesDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { likeMovie, unlikeMovie, likedMovies } = useProfile();
  const { isLoggedIn } = useAuth();
  const [isLiked, setIsLiked] = useState(
    likedMovies.some((likedMovie) => likedMovie.id === movie?.id)
  );

  useEffect(() => {
    setIsLiked(likedMovies.some((likedMovie) => likedMovie.id === movie?.id));
  }, [likedMovies, movie?.id]);

  const handleClickLike = (e) => {
    e.stopPropagation();
    likeMovie(movie);
  };

  const handleClickUnlike = (e) => {
    e.stopPropagation();
    unlikeMovie(movie);
  };

  useEffect(() => {
    api.movies.getMovie(movieId).then((movie) => setMovie(movie));
  }, [movieId]);

  if (movie === null) return null;

  return (
    <div className={styles.wrapper}>
      <section className={styles.mainInfo}>
        <img
          className={styles.posterImg}
          src={getTMDBImgSrc(movie.poster_path)}
          alt={movie.title}
        />
        <div className={styles.mainInfoRight}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.overview}>{movie.overview}</p>
          <ul className={styles.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <strong>{movie.vote_average}</strong>
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
      </section>

      <section>
        <img src={getTMDBImgSrc(movie.backdrop_path)} alt={movie.title} />
      </section>
    </div>
  );
}

export default MoviesDetailPage;
