import { Component, signal, ViewChild } from '@angular/core';
import { FractalCanvas, FractalType } from './components/fractal-canvas/fractal-canvas';
import { ControlPanel } from './components/control-panel/control-panel';
import { ColorScheme } from './services/color';

@Component({
  selector: 'app-root',
  imports: [FractalCanvas, ControlPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild(FractalCanvas) fractalCanvas!: FractalCanvas;

  fractalType = signal<FractalType>('mandelbrot');
  maxIterations = signal<number>(256);
  colorScheme = signal<ColorScheme>('classic');
  juliaReal = signal<number>(-0.7);
  juliaImaginary = signal<number>(0.27015);

  get juliaC() {
    return { real: this.juliaReal(), imaginary: this.juliaImaginary() };
  }

  onResetView(): void {
    this.fractalCanvas?.resetView();
  }
}
