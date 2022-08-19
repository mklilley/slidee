import React, { useEffect } from "react";

import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/moon.css";
import "reveal.js/plugin/highlight/monokai.css";

export default function App() {
    useEffect(() => {
        const deck = new Reveal({
            plugins: [Markdown, RevealHighlight],
        });
        deck.initialize();
    }, []);

    return (
        <div className="slides">
            <section data-background-color="chartreuse" contentEditable>Hi there 👋. <br/> Feel free to change me.
            </section>
            <section>
                <section contentEditable>Ask a question, write suggestions here. <br/>👇</section>
                <section>
                    <ul>
                        <li>Reveal answers here</li>
                        <li>Here</li>
                        <li>And here</li>
                        <li>🙌</li>
                    </ul>
                </section>
            </section>
            <section>
                <p>Let's code!</p>
                <pre className="js"><code data-trim data-noescape contentEditable>
                    {`// Write code in here. Highlights when you click off box
                    // It's a bit buggy right now :-(
                    function add(x,y){
                        return x + y;
                    }`}
                    </code></pre>
            </section>
            <section>
                <p>Now for some python</p>
                <pre className="python"><code data-trim data-noescape contenteditable>
                    {`def add(x,y):
                        return x + y`}
                    </code></pre>
            </section>
        </div>
    )
}
