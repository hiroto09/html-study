"use client";

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import type * as monacoEditor from "monaco-editor";
import style from './index.module.css';

type Props = {
    initial?: string;
    initialCss?: string;
};

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

function injectCssIntoHtml(html: string, css: string) {
    if (!css) return html;
    let doc = html;

    if (/<\/head>/i.test(doc)) {
        doc = doc.replace(/<\/head>/i, `<style id="user-css">${css}</style></head>`);
        return doc;
    }

    if (/<body[^>]*>/i.test(doc)) {
        doc = doc.replace(/<body[^>]*>/i, (match) => `<head><style id="user-css">${css}</style></head>${match}`);
        return doc;
    }

    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style id="user-css">${css}</style>
  </head>
  <body>
    ${doc}
  </body>
</html>`;
}

export default function HtmlEditor({ initial = "<!doctype html><html><body><h1>Hello</h1></body></html>", initialCss = "" }: Props) {
    const [html, setHtml] = React.useState(initial);
    const [css, setCss] = React.useState(initialCss);

    const openInNewTab = useCallback(() => {
        const content = injectCssIntoHtml(html, css);
        const newWin = window.open();
        if (!newWin) {
            const blob = new Blob([content], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            window.open(url);
            return;
        }
        newWin.document.open();
        newWin.document.write(content);
        newWin.document.close();
    }, [html, css]);

    const onHtmlMount = useCallback(
        (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
            const key = monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter;
            editor.addCommand(key, () => openInNewTab());
        },
        [openInNewTab]
    );

    const onCssMount = useCallback(
        (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
            const key = monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter;
            editor.addCommand(key, () => openInNewTab());
        },
        [openInNewTab]
    );

    return (
        <div className={style.editorContainer}>
            <div className={style.content}>
                <div className={style.label}>HTML</div>
                <MonacoEditor
                    defaultLanguage="html"
                    value={html}
                    onChange={(v) => setHtml(v || "")}
                    onMount={onHtmlMount}
                    options={{
                        minimap: { enabled: false },
                        fontFamily: "monospace",
                        fontSize: 13,
                        wordWrap: "on",
                        automaticLayout: true,
                        tabSize: 2,
                    }}
                    height="320px"
                />
            </div>

            <div className={style.content}>
                <div className={style.label}>CSS</div>
                <MonacoEditor
                    defaultLanguage="css"
                    value={css}
                    onChange={(v) => setCss(v || "")}
                    onMount={onCssMount}
                    options={{
                        minimap: { enabled: false },
                        fontFamily: "monospace",
                        fontSize: 13,
                        wordWrap: "on",
                        automaticLayout: true,
                        tabSize: 2,
                    }}
                    height="320px"
                />
            </div>

            <div className={style.buttonContainer}>
                <button
                    type="button"
                    onClick={openInNewTab}
                    className={style.previewButton}
                >
                    新しいタブで開く（プレビュー）
                </button>
            </div>
        </div>
    );
}