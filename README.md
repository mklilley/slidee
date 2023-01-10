# Slidee
Presentation tool powered by [Reveal.js](https://revealjs.com/)

At its core, Slidee turns a folder of markdown files into Reveal.js presentations.

## Getting started
- Create a markdown file ending in `.slides.md`, e.g. `test.slides.md`
- Write your content inside that file, e.g.
  - ```md
    Slide 1
    ---
    Slide 2 
    ---
    Slide 3
    ```
- Run `npx slidee` inside the folder containing your markdown file to start the Slidee presentation server (running on port 3000 i.e. http://localhost:3000)

Notes:
- `---` is special. When you write `---` on it's own line, it indicates the end of one **horizontal** slide and the beginning of the next one.
- `|||` is special. When you write `|||` on it's own line, it indicates the end of one **vertical** and the beginning of the next one.

## Show me what's possible
You can do lots of cool things with reveal.js. Take a look at an example:
- [Presentation view](https://mklilley.github.io/slidee/examples/)
- [Source code](https://github.com/mklilley/slidee/blob/main/examples/index.html)

Note that with Slidee you won't have to write all the HTML boilerplate that you see in [Source code](https://github.com/mklilley/slidee/blob/main/examples/index.html), you can just write the markdown and Slidee will take care of the rest.


## Writing slides with presenter notes
Reveal.js has a built in presenter notes view - just hit `s` to show it.

Although Reveal.js allows you to customise which parts of your markdown should be interpreted as presenter notes, Slidee is more opinionated.

In Slidee, notes must appear after `### Notes:`. For example:

```md
Slide 1

### Notes:
A simple note for slide 1

---

Slide 2 

### Notes:
Some more structured notes
#### Point
The point of this slide 
#### Narrative
What I want to say on this slide 
#### Transition
How will I link to the next slide

---

Slide 3
```

Notes:
- `- Notes:` syntax was used for notes up to version 0.2.1. Slidee remains backwards compatible with this earlier syntax because it can be nice to use a bullet to nest your notes under. Nesting your notes under a `- Notes:` bullet can be a bit fiddly which is why we chose to provide the simpler option of `### Notes:`

## Customising Slidee 

### Styling
Slidee uses the reveal.js `moon` theme as its default.

To customise the look of your presentations, you can add your own css. Slidee will look for a file named `slidee.css` in the location that you run `npx slidee` and apply those styles on top of the default.

An example that allows you to customise the slide and font colours is:
```css
body {
    background-color: #3c2157 !important;
    color: #fff !important;
}

p,h3,h4 {
    color: #fff !important;
}

h1,h2 {
    color: #ff7999 !important;
}
```

### Running slidee
You can run slidee with arguments. To use the defaults for any argument use the `.` .

`npx slidee {folder} {extension} {locale}`

- `folder` - which folder you want slidee to look for presentations in. Default is the folder you run `npx slidee` from.
- `extension` - what extension do your presentations have? Default is `.slides.md`
- `locale` - slidee uses filenames to create human readable presentation titles. Some languages have have special characters and rules for capitalisation. If you use a non western Latin character set for your filenames then consider specifying a language/locale code (examples available at [ISO Language Code Table](http://www.lingoes.net/en/translator/langcode.htm)). Default is `en` (English)

For example: `npx slidee decks .md lt`. Slidee would look for files with extension `.md` in folder `decks` having an awareness of the `Lithuanian` language when generating presentation names.

Alternatively can also specify options using environment variables in a `.env` file (placed in the folder where you run `npx slidee` from), e.g. 
```
SLIDEE_FOLDER=decks
SLIDEE_REGEX=\.slides\.md$
SLIDEE_LOCALE=en
SLIDEE_PORT=3000
```

Notes:
- `SLIDEE_REGEX` allows you to specify a general regex pattern for your presentations instead of specifying just the file extension as with the command line argument.
- Command line arguments override environment variables