import { 
	Vector2, 
	Input, 
	VMouseKeys, 
	InputEventSDK, 
	EventsSDK, 
	Color, 
	Rectangle, 
	RendererSDK 
} from "github.com/octarine-public/wrapper/index";

class BlackSquare {
    private position: Rectangle;

    constructor() {
        this.position = new Rectangle();
        this.position.x = 100;
        this.position.y = 100;
        this.position.Width = 200;
        this.position.Height = 200;
		
		InputEventSDK.on("MouseKeyDown", this.onMouseKeyDown.bind(this));
    }

    public Draw() {
        RendererSDK.FilledRect(this.position.pos1, this.position.Size, Color.Black);
    }

	private onMouseKeyDown(key: VMouseKeys) {
		if (key === VMouseKeys.MK_LBUTTON) {
			const mousePos = Input.CursorOnScreen;
			if (this.isMouseClickedInSquare(mousePos)) {
				console.log("clicked in square");
			}
		}
	}

	private isMouseClickedInSquare(mousePos: Vector2): boolean {
        return mousePos.IsUnderRectangle(this.position.x, this.position.y, this.position.Width, this.position.Height);
    }
}

const clickableSquare = new BlackSquare();
EventsSDK.on("Draw", () => clickableSquare.Draw());