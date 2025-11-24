import { Component, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { FractalType } from '../fractal-canvas/fractal-canvas';
import { ColorScheme } from '../../services/color';

@Component({
  selector: 'app-control-panel',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './control-panel.html',
  styleUrl: './control-panel.css',
})
export class ControlPanel {
  // Two-way bindable properties
  fractalType = model<FractalType>('mandelbrot');
  maxIterations = model<number>(256);
  colorScheme = model<ColorScheme>('classic');
  juliaReal = model<number>(-0.7);
  juliaImaginary = model<number>(0.27015);

  // Output events
  resetView = output<void>();

  colorSchemes: ColorScheme[] = ['classic', 'fire', 'grayscale', 'rainbow'];

  onResetView(): void {
    this.resetView.emit();
  }

  onIterationChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.maxIterations.set(Number(value));
  }

  onJuliaRealChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.juliaReal.set(Number(value));
  }

  onJuliaImaginaryChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.juliaImaginary.set(Number(value));
  }
}
