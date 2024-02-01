import React, { useEffect, useState } from "react";
import { useProfile } from "../../contexts/profile.context";

import MoviesListItem from "../../components/MoviesListItem";
import styles from "./MyPage.module.scss";

function MyPage() {
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { nickname, updateNickname, likedMovies } = useProfile();

  // MyPage 마운트될때 nickname(전역상태)으로 input상태 초기화
  useEffect(() => {
    setInput(nickname);
  }, [nickname]);

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleClickEdit = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleSubmitInput = () => {
    updateNickname(input);
    setIsEditing((isEditing) => !isEditing);
  };

  const renderLikedMovies = () => {
    if (likedMovies.length === 0) {
      return <p>Nothing</p>;
    }

    return likedMovies.map((movie) => (
      <li key={movie.id}>
        <MoviesListItem movie={movie} />
      </li>
    ));
  };

  let nicknameDisplay;
  let editButton = (
    <button className={styles.button} onClick={handleClickEdit}>
      {"✏️"}
    </button>
  );

  // 편집모드일때 text가 input태그로 바뀜.
  if (isEditing || nickname === "") {
    nicknameDisplay = (
      <input
        className={styles.input}
        type="text"
        value={input}
        placeholder="닉네임을 입력하세요"
        onChange={handleChangeInput}
        required
      />
    );
    editButton = (
      <button className={styles.button} onClick={handleSubmitInput}>
        {"✔️"}
      </button>
    );
  } else {
    nicknameDisplay = (
      <span className={styles.nicknameDisplay}>{nickname}</span>
    );
  }

  return (
    <main className={styles.MyPageWrapper}>
      <section className={styles.profileWrapper}>
        <h2>프로필 1</h2>
        <div className={styles.inputWrapper}>
          {nicknameDisplay}
          {editButton}
        </div>
      </section>
      <section className={styles.likedMoviesWrapper}>
        <h3>내가 좋아하는 영화 목록</h3>
        <ul>{renderLikedMovies()}</ul>
      </section>
    </main>
  );
}

export default MyPage;
