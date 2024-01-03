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

        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML = "UNDO";
        container.appendChild(this.undoBtn);

        this.ctx = this.canvas.getContext("2d");

        this.paths = [];
        this.isDrawing = false;

        // private method
        this.#addEventListener();
    }

    #reset() {
        this.paths = [];
        this.isDrawing = false;
        this.#redraw();
    }

    #addEventListener() {
        this.canvas.onmousedown = (event) => {
            const mouse = this.#getMouse(event);
            this.paths.push([mouse]);
            this.isDrawing = true;
            console.log(this.paths.length)
        } 

        // process it only if we are drawing
        this.canvas.onmousemove = (event) => {
            if(this.isDrawing) {
                const mouse = this.#getMouse(event);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse);
                console.log(this.paths.length)
                this.#redraw();
            }
        }

        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        }

        // adding support for touch screen

        this.canvas.ontouchstart = (event) => {
            const loc = event.touches[0];
            this.canvas.onmousedown(loc);
        }

        this.canvas.ontouchmove = (event) => {
            const loc = event.touches[0];
            this.canvas.onmousemove(loc);
        }

        this.canvas.ontouchend = () => {
            this.canvas.onmouseup();
        }

        this.undoBtn.onclick = () => {
            this.paths.pop();
            this.#redraw();
        }
    }

    #redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);

        if(this.paths.length > 0)
            this.undoBtn.disabled = false;
        else
            this.undoBtn.disabled = true;
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