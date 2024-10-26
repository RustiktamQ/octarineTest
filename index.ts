import { EventsSDK, Color, Rectangle, RendererSDK } from "github.com/octarine-public/wrapper/index";

class BlackSquare {
    private position: Rectangle;

    constructor() {
        this.position = new Rectangle();
        this.position.x = 100;
        this.position.y = 100;
        this.position.Width = 200;
        this.position.Height = 200;
    }

    public Draw() {
        RendererSDK.FilledRect(this.position.pos1, this.position.Size, Color.Black);
    }
}

const blackSquare = new BlackSquare();
EventsSDK.on("Draw", () => blackSquare.Draw());