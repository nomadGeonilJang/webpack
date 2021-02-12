import "normalize.css"
import "./style.css"
import styleds from "./style.css"
import $ from "jquery"
const root = document.querySelector("#root");
const template = document.createElement("template");
root.appendChild(template)
root.innerHTML = `
    <header>
        <h1>Hello world2222</h1>
    </header>
    <main>
        <p>
            this is my contents
        </p>
    </main>
    <footer>
        &copy; geonil 12345
    </footer>
`
root.querySelector("footer").classList.add(styleds.hello)
console.log(`.${styleds.hello}`.length)