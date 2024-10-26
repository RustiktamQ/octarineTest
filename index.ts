import { EventsSDK, Rectangle, RendererSDK, Color, Menu } from "github.com/octarine-public/wrapper/index"

console.log("Hello world!123")

EventsSDK.on("GameStarted", () => {
	console.log("GameStarted")
})

function test(): void {
	const position = new Rectangle()
	position.x = 100;
	position.y = 100;
	position.Width = 200;
	position.Height = 200;
	const division = position.Height / 10;

	RendererSDK.FilledRect(position.pos1, position.Size, Color.Black.SetA(100))
	RendererSDK.TextByFlags(
		Menu.Localization.Localize("ItemPanel_Drag"),
		position,
		Color.White,
		division
	)
}

test()