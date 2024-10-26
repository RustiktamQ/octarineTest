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
	private isDragging: boolean = false;
	public color: Color;
	private bornColor: Color;
	private offset: Vector2;

    constructor(x: number, y: number, Width: number, Height: number, fillColor: Color) {
        this.position = new Rectangle();
        this.position.x = x;
        this.position.y = y;
        this.position.Width = Width;
        this.position.Height = Height;
		this.color = fillColor;
		this.bornColor = fillColor;
		this.offset = new Vector2(
			0,
			0
		);
		
		InputEventSDK.on("MouseKeyDown", this.onMouseKeyDown.bind(this));
        InputEventSDK.on("MouseKeyUp", this.onMouseKeyUp.bind(this));
    }

    public Draw(otherSquare?: BlackSquare) {
        if (this.isDragging) {
            const mousePos = Input.CursorOnScreen;
            this.position.x = mousePos.x - this.offset.x;
            this.position.y = mousePos.y - this.offset.y;
        }

        if (otherSquare && this.isOverlaped(otherSquare)) {
            this.color = Color.Red;
            otherSquare.color = Color.Red;
        } else {
            this.color = this.bornColor;
			if (otherSquare) otherSquare.color = otherSquare.bornColor;
        }

        RendererSDK.FilledRect(this.position.pos1, this.position.Size, this.color);
    }

	private isOverlaped(otherSquare: BlackSquare): boolean {
        return !(this.position.x > otherSquare.position.x + otherSquare.position.Width ||
			this.position.x + this.position.Width < otherSquare.position.x ||
			this.position.y > otherSquare.position.y + otherSquare.position.Height ||
			this.position.y + this.position.Height < otherSquare.position.y);
    }

    private onMouseKeyDown(key: VMouseKeys) {
        if (key === VMouseKeys.MK_LBUTTON) {
            const mousePos = Input.CursorOnScreen;
            if (this.isMouseClickedInSquare(mousePos)) {
                this.isDragging = true;
                this.offset = new Vector2(
                    mousePos.x - this.position.x,
                    mousePos.y - this.position.y
                );
            }
        }
    }

    private onMouseKeyUp(key: VMouseKeys) {
        if (key === VMouseKeys.MK_LBUTTON) {
            this.isDragging = false;
        }
    }

    private isMouseClickedInSquare(mousePos: Vector2): boolean {
        return mousePos.IsUnderRectangle(this.position.x, this.position.y, this.position.Width, this.position.Height);
    }

}

const clickableBlackSquare = new BlackSquare(300, 300, 200, 200, Color.Black);
const clickableWhiteSquare = new BlackSquare(600, 300, 200, 200, Color.White);
EventsSDK.on("Draw", () => clickableBlackSquare.Draw(clickableWhiteSquare));
EventsSDK.on("Draw", () => clickableWhiteSquare.Draw());