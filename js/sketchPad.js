class SketchPad {
    constructor(container, size=400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color:white;
            box-shadow: 0px 0px 30px 3px skyblue;
            border-radius : 0.5rem;
        `
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        this.path = [];
        this.isDrawing = false;

        // private method
        this.#addEventListener();
    }

    #addEventListener() {
        this.canvas.onmousedown = (event) => {
            const mouse = this.#getMouse(event);
            this.path = [mouse];
            this.isDrawing = true;
            console.log(this.path.length)
        } 

        // process it only if we are drawing
        this.canvas.onmousemove = (event) => {

            if(this.isDrawing) {
                const mouse = this.#getMouse(event);
                this.path.push(mouse);
                console.log(this.path.length)
                this.#redraw();
            }
        }


        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        }
    }

    #redraw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        draw.path(this.ctx, this.path);
    }

    #getMouse = (event) => {
        // figuring out the coordinates
        const rect = this.canvas.getBoundingClientRect();
        // returning mouse coordinates
        return [
            Math.round(event.clientX - rect.left),
            Math.round(event.clientY - rect.top)            
        ]; 
    }
}