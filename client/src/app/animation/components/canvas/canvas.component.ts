import { Component, ViewChild, AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false })
  canvas !: ElementRef<HTMLCanvasElement>;

  width : number = 1920;
  height: number = 1080;
  ratio: number = 0.4;
  context !: CanvasRenderingContext2D;
  count: number = 100;

  game !: Game ;

  listener : (() => void)[];

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.game = new Game(canvas);
    canvas.width = this.width * this.ratio;
    canvas.height = this.height * this.ratio;
    const ctx = canvas.getContext('2d');
    
    this.listener.push(this.render.listen('window', 'keydown', () => {
      console.log("Hello")
    }))

    if (ctx) {
      this.context = ctx;
      this.update();      
    }
  }

  update() {
    let context = this.context;
    if (context) {
      // we will draw here
      const update = () => {
        context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.game.render(context);
        window.requestAnimationFrame(update);
      }
      update();
    }
  }

  constructor(private render : Renderer2){
    this.listener = [];
  }

  ngOnDestroy(): void {
    this.listener.forEach(fn => fn())
  }

}


class Game {
  player : Player;

  constructor(private canvas : HTMLCanvasElement){
    this.player = new Player(this);
  }
  render(ctx : CanvasRenderingContext2D){
    this.player.draw(ctx);
    this.player.update();
  }
}
  
class Player {
  constructor(private game: Game){
      
  }

  draw(context : CanvasRenderingContext2D){

  }

  update(){

  }
}