const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

// What folder are you slide decks located?
let decksDir = args[0] || process.env.SLIDEE_FOLDER || ".";
if (decksDir[decksDir.length - 1] === "/") {
    decksDir = decksDir.substring(0, decksDir.length - 1);
}

// What is the naming convention for your slide decks?
// e.g. default is for files to end in ".slides.md"
let decksRegex;
if (args[1]) {
    decksRegex = new RegExp(args[1].replace(".", "\\.") + "$");
} else {
    decksRegex = new RegExp(process.env.SLIDEE_REGEX || "\\.slides\\.md$");
}

// What character set are you using to write your file names?
// This is used to turn filenames into human friendly slide deck names
const locale = args[2] || process.env.SLIDEE_LOCALE || "en";

// When the server starts, create a reference to all available slide decks by:
// 1. Looking inside of decksDir to find all slide "decks" matching your decksRegex pattern
// 2. Generating a unique id for each deck based on its path
// 3. Generating a human friendly deck name based on its filename and directory location
// 4. Creating a object to map deck id -> deck path and name
const deckMap = generateDecksData(decksDir, decksRegex);

async function find(query) {
    if (query) {
        if (query.hasOwnProperty("id")) {
            const deck = deckMap[query.id];
            if (deck) {
                return deck;
            } else {
                throw new Error(
                    `Decks.find: Slide deck with ID ${query.id} not found`
                );
            }
        } else {
            throw new Error(
                `Decks.find: Invalid query, need to provide a deck ID, e.g. {id:some-deck-id}`
            );
        }
    } else {
        return deckMap;
    }
}

function generateDecksData(decksDir, decksRegex) {
    const deckData = {};
    const files = readdirRecursSync(`${decksDir}/`, decksRegex);

    files.forEach((filePath) => {
        const filePathArray = filePath
            .split(".")[0]
            .split(decksDir + "/")
            .pop()
            .split("/");

        // Creates unique deckId based on filename and directory location
        const deckId = filePathArray.join("-");
        if (deckData[deckId]) {
            throw new Error(
                `Two files have the same name after their extensions have been stripped. Please rename them. Look at files ${filePath} and ${deckData[deckId].path}`
            );
        }

        // Creates a deckName based on filename and directory location:
        // 1. Uppercase the first letter of each element of filePathArray based on the users locale.
        //    User locale is read from "LOCALE" variable set in a .env file and by default is "en"
        // 2. Separate directories and filenames with ">" character
        // 3. Replace any "-" and "_" wit spaces
        const deckName = filePathArray
            .map((el) => {
                return capitalizeFirstLetter(el, locale);
            })
            .join(" > ")
            .replace(/_|-/gi, function (x) {
                return " ";
            });

        deckData[deckId] = { path: filePath, name: deckName };
    });
    return deckData;
}

// Turns out capitalising the first letter of a string is complicated
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript/53930826#53930826
function capitalizeFirstLetter(str, locale = "en") {
    return str.replace(/^\p{CWU}/u, (char) => char.toLocaleUpperCase(locale));
}

// Recursively searches a directory (dir) for files matching a regex pattern
// and then appends an array (fileList) with the matching files
function readdirRecursSync(dir, regex, fileList) {
    try {
        fileList = fileList || [];

        const files = fs.readdirSync(dir);

        files.forEach(function (file) {
            const filePath = path.join(dir, file);

            if (fs.statSync(filePath).isDirectory()) {
                fileList = readdirRecursSync(filePath, regex, fileList);
            } else {
                if (file.match(regex) !== null) {
                    fileList.push(filePath);
                }
            }
        });

        return fileList;
    } catch (e) {
        console.log(e);
        return [];
    }
}

module.exports = { find };
