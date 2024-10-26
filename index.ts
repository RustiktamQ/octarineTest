import { EventsSDK } from "github.com/octarine-public/wrapper/index"

console.log("Hello world!123")
EventsSDK.on("GameStarted", () => {
	console.log("Hello world!")
})
