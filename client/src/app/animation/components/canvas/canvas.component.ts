import { Component, ViewChild, AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false })
  canvas !: ElementRef<HTMLCanvasElement>;

  @ViewChild('player', { static: false })
  player !: ElementRef<HTMLImageElement>;

  width: number = 1920;
  height: number = 1080;
  ratio: number = 0.4;
  context !: CanvasRenderingContext2D;
  count: number = 100;

  game !: Game;

  listener: (() => void)[];

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    const player = this.player.nativeElement;
    this.game = new Game(canvas, player);
    canvas.width = this.width * this.ratio;
    canvas.height = this.height * this.ratio;
    const ctx = canvas.getContext('2d');

    this.listener.push(this.render.listen('window', 'keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.game.keys.KeyUp = true;
          break;
        case 'ArrowDow':
          this.game.keys.KeyDown = true;
          break;
        case 'ArrowLeft':
          this.game.keys.KeyLeft = true;
          break;
        case 'ArrowRight':
          this.game.keys.KeyRight = true;
          break;
        default:

      }
    }))

    this.listener.push(this.render.listen('window', 'keyup', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.game.keys.KeyUp = false;
          break;
        case 'ArrowDow':
          this.game.keys.KeyDown = false;
          break;
        case 'ArrowLeft':
          this.game.keys.KeyLeft = false;
          break;
        case 'ArrowRight':
          this.game.keys.KeyRight = false;
          break;
        default:

      }
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

  constructor(private render: Renderer2) {
    this.listener = [];
  }

  ngOnDestroy(): void {
    this.listener.forEach(fn => fn())
  }

}

interface Keys {
  "KeyUp": boolean,
  "KeyDown": boolean,
  "KeyLeft": boolean,
  "KeyRight": boolean
}

class Game {
  player: Player;

  keys: Keys = {
    "KeyDown": false,
    "KeyUp": false,
    "KeyRight": false,
    "KeyLeft": false
  }


  constructor(private canvas: HTMLCanvasElement, public playerImage: HTMLImageElement) {
    this.player = new Player(this);
  }
  render(ctx: CanvasRenderingContext2D) {
    this.player.draw(ctx);
    this.player.update();
  }
}


class Player {

  // location of the image on the sprite sheet
  spriteX: number = 1;
  spriteY: number = 684;
  spriteWidth: number = 69;
  spriteHeight: number = 92;
  current: number = 0;
  speed: number = 10;
  direction : number = 1;
  // location of the image on the canvas
  collisionX: number = 100;
  collisionY: number = 100;
  collisionWidth = this.spriteWidth;
  collisionHeight: number = this.spriteHeight;


  constructor(private game: Game) {

  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    // let direction = 1;
    // see line 131 for knowing why calculate the x
    let collisionX = this.direction < 0 ? -1 * this.spriteWidth : 0;
    context.scale(this.direction < 0 ? -1 : 1, 1);
    context.drawImage(
      this.game.playerImage,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight,
      this.collisionX * (this.direction < 0 ? -1 : 1) + collisionX,
      this.collisionY,
      this.collisionWidth,
      this.collisionHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.restore();
  }

  update() {
    this.spriteX = this.spriteWidth * Math.floor(this.current / 100);
    if (this.game.keys.KeyLeft) {
      this.collisionX -= 1;
      this.direction = -1;
    } else if (this.game.keys.KeyRight) {
      this.collisionX += 1;
      this.direction = 1;
    }
    if (this.current >= 590) {
      this.speed = -10;
    } else if (this.current <= 10) {
      this.speed = 10;
    }
    this.current += this.speed;
    // console.log(this.direction)
  }
}

class StateFighter {
  
}