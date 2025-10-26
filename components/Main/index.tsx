import HtmlEditor from "../HtmlEditor/index";
import style from './index.module.css';

export default function Page() {
    return (
        <main className={style.main}>
            <div className={style.description}>
                <HtmlEditor
                    initial={`<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>Preview</title></head>
  <body>
    <header>
        <h1>Header</h1>
    </header>
    <main>
        <p>ここにメインの要素を書く</p>
    </main>
    <footer>
        <p>Footer</p>
    </footer>
  </body>
</html>`}
        initialCss={
            `
            *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            }

            body { 
            font-family: system-ui; 
            }

            header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;
                text-align: center;
                z-index: 1000;
                background-color: #f8f9fa;
                padding: 0.5rem;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
            }

            header h1 { 
            color: #0b79d0; margin-left: 1rem; 
            }

            main { 
                margin-top: 3.5rem;
                padding: 1rem; 
            }
                
            footer {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                padding: 10px;
                text-align: center;
                background: #fff; /* 必要なら背景を指定 */
                box-shadow: 0 -1px 4px rgba(0,0,0,0.08);
            }
            `
        }
                />
            </div>
        </main>
    );
}