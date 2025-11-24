import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  input,
  effect,
} from '@angular/core';
import { FractalComputation, FractalParams } from '../../services/fractal-computation';
import { ColorService, ColorScheme } from '../../services/color';

export type FractalType = 'mandelbrot' | 'julia';

@Component({
  selector: 'app-fractal-canvas',
  imports: [],
  templateUrl: './fractal-canvas.html',
  styleUrl: './fractal-canvas.css',
})
export class FractalCanvas implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  // Inputs from parent
  fractalType = input<FractalType>('mandelbrot');
  maxIterations = input<number>(256);
  colorScheme = input<ColorScheme>('classic');
  juliaC = input<{ real: number; imaginary: number }>({ real: -0.7, imaginary: 0.27015 });

  // Canvas state
  private ctx!: CanvasRenderingContext2D;
  private width = 800;
  private height = 600;

  // Viewport state
  private centerX = -0.5;
  private centerY = 0;
  private zoom = 1;

  // Mouse interaction state
  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;

  constructor(
    private fractalComputation: FractalComputation,
    private colorService: ColorService
  ) {
    // Re-render when inputs change
    effect(() => {
      this.fractalType();
      this.maxIterations();
      this.colorScheme();
      this.juliaC();
      if (this.ctx) {
        this.render();
      }
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    // Set canvas size
    canvas.width = this.width;
    canvas.height = this.height;

    // Setup event listeners
    this.setupEventListeners(canvas);

    // Initial render
    this.render();
  }

  private setupEventListeners(canvas: HTMLCanvasElement): void {
    // Mouse drag for panning
    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    canvas.addEventListener('mouseup', () => this.onMouseUp());
    canvas.addEventListener('mouseleave', () => this.onMouseUp());

    // Wheel for zooming
    canvas.addEventListener('wheel', (e) => this.onWheel(e));

    // Double click to center
    canvas.addEventListener('dblclick', (e) => this.onDoubleClick(e));
  }

  private onMouseDown(e: MouseEvent): void {
    this.isDragging = true;
    this.lastMouseX = e.offsetX;
    this.lastMouseY = e.offsetY;
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;

    const dx = e.offsetX - this.lastMouseX;
    const dy = e.offsetY - this.lastMouseY;

    const scale = 4 / this.zoom;
    this.centerX -= (dx / this.width) * scale * (this.width / this.height);
    this.centerY -= (dy / this.height) * scale;

    this.lastMouseX = e.offsetX;
    this.lastMouseY = e.offsetY;

    this.render();
  }

  private onMouseUp(): void {
    this.isDragging = false;
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();

    const zoomFactor = e.deltaY < 0 ? 1.2 : 0.8;
    this.zoom *= zoomFactor;

    this.render();
  }

  private onDoubleClick(e: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scale = 4 / this.zoom;
    const xMin = this.centerX - (scale * this.width) / (2 * this.height);
    const xMax = this.centerX + (scale * this.width) / (2 * this.height);
    const yMin = this.centerY - scale / 2;
    const yMax = this.centerY + scale / 2;

    this.centerX = xMin + (x / this.width) * (xMax - xMin);
    this.centerY = yMin + (y / this.height) * (yMax - yMin);

    this.render();
  }

  private render(): void {
    const params: FractalParams = {
      width: this.width,
      height: this.height,
      centerX: this.centerX,
      centerY: this.centerY,
      zoom: this.zoom,
      maxIterations: this.maxIterations(),
      juliaC: this.fractalType() === 'julia' ? this.juliaC() : undefined,
    };

    let iterations: number[];

    if (this.fractalType() === 'mandelbrot') {
      iterations = this.fractalComputation.computeMandelbrot(params);
    } else {
      iterations = this.fractalComputation.computeJulia(params);
    }

    const pixelData = this.colorService.applyColorScheme(
      iterations,
      this.maxIterations(),
      this.colorScheme()
    );

    const imageData = this.ctx.createImageData(this.width, this.height);
    imageData.data.set(pixelData);
    this.ctx.putImageData(imageData, 0, 0);
  }

  resetView(): void {
    if (this.fractalType() === 'mandelbrot') {
      this.centerX = -0.5;
      this.centerY = 0;
    } else {
      this.centerX = 0;
      this.centerY = 0;
    }
    this.zoom = 1;
    this.render();
  }

  getViewportInfo(): { centerX: number; centerY: number; zoom: number } {
    return {
      centerX: this.centerX,
      centerY: this.centerY,
      zoom: this.zoom,
    };
  }
}
