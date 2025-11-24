# Fractal Playground

An interactive web-based fractal generator built with Angular that allows you to explore and visualize mathematical fractals in real-time.

![Fractal Playground](https://img.shields.io/badge/Angular-21-red)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

### Core Fractals
- **Mandelbrot Set**: Classic fractal with zoom and pan capabilities
- **Julia Set**: Interactive Julia set with adjustable parameters

### Interactive Controls
- **Mouse Navigation**:
  - Click and drag to pan around the fractal
  - Scroll wheel to zoom in/out
  - Double-click to center view on a point
- **Parameter Controls**:
  - Adjustable iteration depth (50-500)
  - Fractal type selector
  - Julia set parameters (real and imaginary components)
- **Visual Settings**:
  - Multiple color schemes: Classic, Fire, Grayscale, Rainbow
  - Real-time rendering

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v10 or higher)

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm start

# Open your browser to http://localhost:4200
```

### Build

```bash
# Build for production
npm run build

# Output will be in dist/fractal-playground
```

## Usage

1. **Choose a Fractal Type**: Select between Mandelbrot or Julia set
2. **Adjust Iterations**: Use the slider to increase detail (more iterations = more detail but slower)
3. **Select Color Scheme**: Choose from 4 different color palettes
4. **Explore**:
   - Drag to move around
   - Scroll to zoom
   - Double-click to center on interesting areas
5. **Julia Set**: When selected, adjust real and imaginary parameters to create different Julia sets
6. **Reset**: Click "Reset View" to return to the default view

## Technical Details

### Architecture
- **Framework**: Angular 21 with standalone components
- **Rendering**: HTML5 Canvas 2D API
- **Computation**: Client-side fractal algorithms
- **State Management**: Angular signals for reactive updates

### Components
- `FractalCanvas`: Main rendering component with mouse interaction handling
- `ControlPanel`: User interface for fractal parameters
- `FractalComputation`: Service for Mandelbrot and Julia set calculations
- `ColorService`: Color palette management and application

### Performance
- Canvas size: 800x600px
- Adjustable iterations: 50-500
- Real-time rendering on parameter changes
- Efficient escape-time algorithm implementation

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── fractal-canvas/     # Canvas rendering component
│   │   └── control-panel/      # UI controls component
│   ├── services/
│   │   ├── fractal-computation.ts  # Fractal math algorithms
│   │   └── color.ts                # Color scheme logic
│   ├── app.ts              # Main app component
│   ├── app.html            # App layout
│   └── app.css             # App styling
├── main.ts                 # Application entry point
└── index.html              # HTML template
```

## Future Enhancements

See [DESIGN.md](./DESIGN.md) for the complete design document and roadmap, including:
- Additional fractal types (Burning Ship, Newton, Sierpinski)
- Animation capabilities
- WebGL rendering for performance
- Web Workers for non-blocking computation
- Mobile touch controls
- Export to PNG
- Shareable URLs with parameters

## License

MIT

## Acknowledgments

This project is a modern reimagining of an early Python fractal generator, now brought to the web with Angular!
