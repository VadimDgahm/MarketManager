import s from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={s.loader}>
      <span className={s.loaderText}>Загрузка</span>
      <span className={s.load}></span>
    </div>
  );
};