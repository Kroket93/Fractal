# Fractal Playground - Design Document

## Project Overview
An interactive web-based fractal generator built with Angular that allows users to explore and visualize mathematical fractals in real-time.

## MVP Features

### 1. Core Fractal Types
**Must Have:**
- **Mandelbrot Set**: Classic fractal with zoom and pan capabilities
- **Julia Set**: Interactive Julia set with parameter controls

**Rationale**: These two fractals provide different interaction models - Mandelbrot for exploration through zooming, Julia for parameter manipulation.

### 2. Visualization Canvas
**Requirements:**
- HTML5 Canvas rendering (minimum 800x600px, responsive)
- Real-time rendering with visual feedback during computation
- Smooth pan and zoom interactions
- Coordinate display showing current position

**Technical:**
- Use Canvas 2D API for rendering
- Consider Web Workers for computation to keep UI responsive

### 3. User Controls

#### Navigation
- **Mouse Controls:**
  - Click and drag to pan
  - Scroll wheel to zoom in/out
  - Click to center view on point
- **Reset Button**: Return to default view

#### Fractal Parameters
- **Iteration Depth**: Slider (50-500 iterations)
  - Higher iterations = more detail but slower rendering
- **Fractal Type Selector**: Dropdown to switch between Mandelbrot/Julia
- **Julia Parameters** (when Julia is selected):
  - Real component slider (-2 to 2)
  - Imaginary component slider (-2 to 2)

#### Visual Settings
- **Color Schemes**: Dropdown with 3-5 preset palettes
  - Classic (blue/black)
  - Fire (red/orange/yellow)
  - Grayscale
  - Rainbow
  - Custom (stretch goal)

### 4. User Interface Layout

```
+------------------------------------------+
|  [Fractal Playground]                    |
|  +------------------------------------+  |
|  | Fractal Type: [Mandelbrot v]      |  |
|  | Iterations: [====o====] 256       |  |
|  | Color Scheme: [Classic v]         |  |
|  | [Reset View]                      |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  |                                    |  |
|  |                                    |  |
|  |         CANVAS AREA                |  |
|  |                                    |  |
|  |                                    |  |
|  +------------------------------------+  |
|  Position: (-0.5, 0.0) | Zoom: 1.0x    |
+------------------------------------------+
```

### 5. Performance Requirements
- Initial render: < 2 seconds
- Zoom/pan response: < 500ms for standard detail
- Support for up to 500 iterations without freezing UI
- Responsive design for desktop (mobile can be phase 2)

### 6. Export Features (Nice-to-Have for MVP)
- **Download Image**: Export current view as PNG
- **Share URL**: Generate URL with current fractal parameters (stretch)

## Technical Architecture

### Angular Components
1. **AppComponent**: Root component, layout structure
2. **FractalCanvasComponent**: Canvas rendering and interaction logic
3. **ControlPanelComponent**: User controls and parameter inputs
4. **FractalService**: Fractal computation logic
5. **ColorService**: Color palette management

### Key Services
- **FractalComputationService**: Handles mathematical calculations
  - Mandelbrot computation
  - Julia set computation
  - Escape-time algorithm implementation
- **RenderService**: Manages canvas rendering
  - Pixel coloring based on iteration count
  - Color palette application

### Data Flow
```
User Input → Control Panel → Fractal Service → Computation
                                                    ↓
Canvas Component ← Render Service ← Color Service ← Result
```

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up Angular project structure
- [ ] Create basic canvas component
- [ ] Implement Mandelbrot computation (single-threaded)
- [ ] Basic zoom and pan controls
- [ ] One color scheme

### Phase 2: Enhancement (Week 2)
- [ ] Add Julia set support
- [ ] Implement parameter controls
- [ ] Add multiple color schemes
- [ ] Optimize with Web Workers
- [ ] Add iteration depth control

### Phase 3: Polish (Week 3)
- [ ] Responsive design refinements
- [ ] Export functionality
- [ ] Performance optimizations
- [ ] Loading states and progress indicators
- [ ] Error handling and edge cases

## Non-Goals for MVP
- 3D fractals (Mandelbulb, etc.)
- Animation/recording features
- User accounts or saving presets
- Mobile touch optimizations
- Advanced fractal types (Burning Ship, Newton, etc.)
- GPU acceleration via WebGL
- Social sharing features

## Success Criteria
1. User can explore Mandelbrot set with smooth zoom/pan
2. User can generate different Julia sets by adjusting parameters
3. App remains responsive during computation
4. Rendered fractals are mathematically accurate
5. Interface is intuitive without documentation

## Future Enhancements (Post-MVP)
- Additional fractal types (Burning Ship, Newton, Sierpinski)
- Animation capabilities (zoom sequences, parameter interpolation)
- Preset gallery with interesting coordinates
- WebGL rendering for performance
- Mobile-optimized touch controls
- Fractal tree generator (callback to original Python version!)
- User preset saving (local storage)
- Advanced coloring algorithms (histogram coloring)

## Technical Constraints
- Target modern browsers (Chrome, Firefox, Safari, Edge)
- No backend required for MVP
- All computation client-side
- Minimum screen width: 1024px for optimal experience
