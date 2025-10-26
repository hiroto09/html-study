import style from './index.module.css';

export default function Header() {
  return (
    <header className={style.header}>
        <h1 className={style.title}>HTML簡易エディタ</h1>
    </header>
  );
}
