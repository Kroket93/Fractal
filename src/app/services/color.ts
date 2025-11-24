import { Injectable } from '@angular/core';

export type ColorScheme = 'classic' | 'fire' | 'grayscale' | 'rainbow';

@Injectable({
  providedIn: 'root',
})
export class ColorService {

  /**
   * Converts iteration data to RGBA pixel data using the specified color scheme
   */
  applyColorScheme(
    iterations: number[],
    maxIterations: number,
    scheme: ColorScheme
  ): Uint8ClampedArray {
    const pixelData = new Uint8ClampedArray(iterations.length * 4);

    for (let i = 0; i < iterations.length; i++) {
      const iteration = iterations[i];
      const color = this.getColor(iteration, maxIterations, scheme);

      const idx = i * 4;
      pixelData[idx] = color.r;
      pixelData[idx + 1] = color.g;
      pixelData[idx + 2] = color.b;
      pixelData[idx + 3] = 255; // Alpha
    }

    return pixelData;
  }

  /**
   * Gets the RGB color for a specific iteration count
   */
  private getColor(
    iteration: number,
    maxIterations: number,
    scheme: ColorScheme
  ): { r: number; g: number; b: number } {
    // Points in the set are black
    if (iteration === maxIterations) {
      return { r: 0, g: 0, b: 0 };
    }

    const normalized = iteration / maxIterations;

    switch (scheme) {
      case 'classic':
        return this.classicScheme(normalized);
      case 'fire':
        return this.fireScheme(normalized);
      case 'grayscale':
        return this.grayscaleScheme(normalized);
      case 'rainbow':
        return this.rainbowScheme(normalized);
      default:
        return this.classicScheme(normalized);
    }
  }

  /**
   * Classic blue/cyan gradient
   */
  private classicScheme(t: number): { r: number; g: number; b: number } {
    const r = Math.floor(9 * (1 - t) * t * t * t * 255);
    const g = Math.floor(15 * (1 - t) * (1 - t) * t * t * 255);
    const b = Math.floor(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255);
    return { r, g, b };
  }

  /**
   * Fire/heat gradient (red -> orange -> yellow)
   */
  private fireScheme(t: number): { r: number; g: number; b: number } {
    let r, g, b;

    if (t < 0.5) {
      // Red to orange
      r = 255;
      g = Math.floor(t * 2 * 255);
      b = 0;
    } else {
      // Orange to yellow
      r = 255;
      g = 255;
      b = Math.floor((t - 0.5) * 2 * 200);
    }

    return { r, g, b };
  }

  /**
   * Simple grayscale gradient
   */
  private grayscaleScheme(t: number): { r: number; g: number; b: number } {
    const value = Math.floor(t * 255);
    return { r: value, g: value, b: value };
  }

  /**
   * Rainbow spectrum
   */
  private rainbowScheme(t: number): { r: number; g: number; b: number } {
    const hue = t * 360;
    return this.hslToRgb(hue, 100, 50);
  }

  /**
   * Converts HSL to RGB
   */
  private hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return {
      r: Math.floor(255 * f(0)),
      g: Math.floor(255 * f(8)),
      b: Math.floor(255 * f(4)),
    };
  }
}
