# Slidee
Presentation tool powered by [Reveal.js](https://revealjs.com/)

## How to use this Repo
- Clone the repo
- Run `npm install`

### Simple reveal.js presentations
By default, reveal.js takes HTML and turns it into a web based presentation. To see an example:
- Open `examples/html/index.html`

Reveal.js can also take markdown and turn it into a web based presentation. To see an example:
- Open `examples/markdown/index.html`

### Presentation server
At its core, slidee turns a folder of markdown files into reveal.js presentations. Try this out:
- Create a folder called `decks`
- Create some markdown files ending in `.slides.md`
- `npm run serve`
- Go to [localhost://3000](http://localhost:3000)
