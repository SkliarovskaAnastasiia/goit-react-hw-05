import css from './MovieCastItem.module.css';

export default function MovieCastItem({
  item: { profile_path, name, character },
}) {
  const imgUrl = 'https://image.tmdb.org/t/p/w500/';

  return (
    <>
      <img
        src={
          profile_path
            ? `${imgUrl}${profile_path}`
            : 'https://cdn.pixabay.com/photo/2013/07/12/18/38/avatar-153605_1280.png'
        }
        className={css.actorImg}
      />
      <p className={css.actorName}>{name}</p>
      <p className={css.character}>{character}</p>
    </>
  );
}
