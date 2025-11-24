import { Injectable } from '@angular/core';

export interface FractalParams {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  zoom: number;
  maxIterations: number;
  juliaC?: { real: number; imaginary: number };
}

export interface FractalResult {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class FractalComputation {

  /**
   * Computes the Mandelbrot set
   */
  computeMandelbrot(params: FractalParams): number[] {
    const { width, height, centerX, centerY, zoom, maxIterations } = params;
    const iterations: number[] = new Array(width * height);

    const scale = 4 / zoom;
    const xMin = centerX - (scale * width) / (2 * height);
    const xMax = centerX + (scale * width) / (2 * height);
    const yMin = centerY - scale / 2;
    const yMax = centerY + scale / 2;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        const x0 = xMin + (px / width) * (xMax - xMin);
        const y0 = yMin + (py / height) * (yMax - yMin);

        let x = 0;
        let y = 0;
        let iteration = 0;

        // Escape-time algorithm
        while (x * x + y * y <= 4 && iteration < maxIterations) {
          const xTemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xTemp;
          iteration++;
        }

        iterations[py * width + px] = iteration;
      }
    }

    return iterations;
  }

  /**
   * Computes the Julia set for given complex constant c
   */
  computeJulia(params: FractalParams): number[] {
    const { width, height, centerX, centerY, zoom, maxIterations, juliaC } = params;

    if (!juliaC) {
      throw new Error('Julia set requires juliaC parameter');
    }

    const iterations: number[] = new Array(width * height);

    const scale = 4 / zoom;
    const xMin = centerX - (scale * width) / (2 * height);
    const xMax = centerX + (scale * width) / (2 * height);
    const yMin = centerY - scale / 2;
    const yMax = centerY + scale / 2;

    const cReal = juliaC.real;
    const cImag = juliaC.imaginary;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        let x = xMin + (px / width) * (xMax - xMin);
        let y = yMin + (py / height) * (yMax - yMin);

        let iteration = 0;

        // Escape-time algorithm with constant c
        while (x * x + y * y <= 4 && iteration < maxIterations) {
          const xTemp = x * x - y * y + cReal;
          y = 2 * x * y + cImag;
          x = xTemp;
          iteration++;
        }

        iterations[py * width + px] = iteration;
      }
    }

    return iterations;
  }
}
