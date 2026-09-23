---
name: Dominik OS 1986
colors:
  surface: '#faf9f9'
  surface-dim: '#dadada'
  surface-bright: '#faf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#464653'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f0f0'
  outline: '#767684'
  outline-variant: '#c6c5d5'
  surface-tint: '#4b53bc'
  primary: '#00003c'
  on-primary: '#ffffff'
  primary-container: '#000080'
  on-primary-container: '#777eea'
  inverse-primary: '#bfc2ff'
  secondary: '#006a6a'
  on-secondary: '#ffffff'
  secondary-container: '#90efef'
  on-secondary-container: '#006e6e'
  tertiary: '#000e02'
  on-tertiary: '#ffffff'
  tertiary-container: '#002809'
  on-tertiary-container: '#009e3c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bfc2ff'
  on-primary-fixed: '#00006e'
  on-primary-fixed-variant: '#3239a3'
  secondary-fixed: '#93f2f2'
  secondary-fixed-dim: '#76d6d5'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f4f'
  tertiary-fixed: '#6bff83'
  tertiary-fixed-dim: '#00e55b'
  on-tertiary-fixed: '#002107'
  on-tertiary-fixed-variant: '#00531b'
  background: '#faf9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e3e2e2'
typography:
  headline-lg:
    fontFamily: Courier Prime
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0px
  headline-md:
    fontFamily: Courier Prime
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0px
  headline-sm:
    fontFamily: Courier Prime
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0px
  body-lg:
    fontFamily: Courier Prime
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0px
  body-md:
    fontFamily: Courier Prime
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0px
  body-sm:
    fontFamily: Courier Prime
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0px
  label-lg:
    fontFamily: Courier Prime
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0px
  label-md:
    fontFamily: Courier Prime
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 13px
    letterSpacing: 0.5px
  label-sm:
    fontFamily: Courier Prime
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: 0px
spacing:
  gutter: 0.5rem
  margin: 0.5rem
  space-xs: 0.125rem
  space-sm: 0.25rem
  space-md: 0.5rem
  space-lg: 0.75rem
  space-xl: 1rem
---

## Brand & Style

This design system faithfully replicates the computing environment of the mid-1980s to early 1990s graphical user interfaces, specifically honoring a 40th jubilee celebration ("40 Jahre Dominik"). Built upon early GUI paradigms, the experience balances utilitarian machine aesthetics with early desktop skeuomorphism.

The interface prioritizes dense, non-aliased tactile affordances: heavy beveled surfaces, tactile 3D relief, hard monochrome contrast borders, and structural symmetry. It evokes nostalgia, mechanical precision, and the joyful tactile friction of clicking through an 80286-era workstation.

Design movement: **Tactile / Retro GUI (16-bit Era)**. Every element relies on crisp two-tone light/shadow beveling, hard zero-radius contours, dense structural window frames, and strict monospaced/bitmap typographic cadence.

## Colors

The palette is strictly anchored in hardware-restricted 16-color VGA/EGA displays. 

- **Primary (`#000080`)**: Classic Deep Navy used exclusively for active window title bars, selected menu rows, highlighted desktop icon states, and primary system emphasis.
- **Secondary (`#008080`)**: Desktop Canvas Teal. Serves as the primary viewport background on top of which all system windows, dialogs, and workspace icons sit.
- **Tertiary (`#00FF66`)**: Phosphor Terminal Green. Used for telemetry readouts, status monitors ("MEM OK: 640K"), retro command-line output containers, and operational success states.
- **Neutral (`#C0C0C0`)**: Classic Window Frame Gray. The universal baseline for window canvases, button faces, dialog bodies, taskbar surfaces, and scroll troughs.

### Supplementary System Accents
- **Light Bevel (`#FFFFFF`)**: Top and left high-light borders producing extruded relief.
- **Dark Shadow (`#808080`)**: Bottom and right drop-shadow borders creating simulated ambient depth, as well as inactive window title bars.
- **System Contour (`#000000`)**: Hard outer boundaries, icon glyph lines, divider rules, and body text.
- **Alert / Notice (`#FFFF00`)**: Caution indicators, floppy-disk write operations, and system interrupt dialog flags.
- **Canvas White (`#FFFFFF`)**: Document and text input interior surfaces.

## Typography

Typography prioritizes fixed-width mechanics and strict pixel grid compliance. Anti-aliasing must be disabled (`font-smooth: never; -webkit-font-smoothing: none;`) to maintain authentic biting edges.

- **Typeface Selection**: `Courier Prime` acts as the cross-platform monospace standard, backed by `MS Sans Serif`, `Courier New`, and systemic `monospace` fallbacks.
- **Rhythm & Metrics**: All line heights align rigidly to 2px or 4px intervals. No fluid typography or proportional letter-spacing expansions are permitted.
- **Title Bar Conventions**: Window headings run strictly in uppercase or Title Case with zero sub-pixel interpolation.
- **Terminal & Monitor Text**: Telemetry displays (such as memory readouts and CPU timers) use fixed 11px or 13px Courier styling, styled in terminal green (`#00FF66`) against black backings.

## Layout & Spacing

Layout mirrors early desktop windowing environments: non-fluid, pixel-constrained, and structural. Rather than responsive liquid breakpoints, the interface operates inside an absolute or fixed modular viewport canvas.

### Layout Principles
- **Desktop Canvas**: Full-bleed `#008080` desktop hosting draggable or stacked floating window containers with fixed outer bounding constraints.
- **Taskbar Dock**: Fixed 32px height pinned to the bottom viewport boundary across all screen dimensions.
- **Grid & Alignment**: Strict 4px and 8px base increments. Dialog inner layouts leverage 8px gutters (`0.5rem`) to maximize information density without unnecessary whitespace.
- **Window Architecture**:
  - Outer margin/frame thickness: 3px (1px black outer contour + 2px light/dark beveled chrome).
  - Title bar height: 22px fixed.
  - Menu bar height: 20px fixed.
  - Dialog padding: 8px to 12px internally.

## Elevation & Depth

No soft shadows, ambient blurs, or alpha-blended opacity layers exist in this design system. Depth is created entirely through simulated directional illumination (top-left light source, 45-degree angle) using sharp 1px and 2px border combinations.

### Bevel States

1. **Raised (Outset / Resting Windows, Unpressed Buttons, Menu Items)**:
   - Outer: `1px solid #000000`
   - Top & Left inner border: `2px solid #FFFFFF`
   - Bottom & Right inner border: `2px solid #808080`
   - Surface Fill: `#C0C0C0`

2. **Sunken (Inset / Text Inputs, Progress Troughs, Active Viewports, Pressed Buttons)**:
   - Top & Left border: `2px solid #808080` (outermost top/left edge often reinforced by `1px solid #000000`)
   - Bottom & Right border: `2px solid #FFFFFF`
   - Surface Fill: `#FFFFFF` (for document editors/inputs) or `#C0C0C0` (for depressed buttons)

3. **Window Stacking Hierarchy**:
   - Active Window: Elevation 2, `#000080` title bar, white text, topmost `z-index`.
   - Inactive Window: Elevation 1, `#808080` title bar, light gray text, rendered beneath active instances.
   - Modal Dialogs: Elevation 3, thick 4px double-beveled perimeter, blocks lower interaction.

## Shapes

All shapes feature **0px corner radius** (Level `0`).

Curved aesthetics do not exist in this era's rendering pipeline. Corners must maintain hard 90-degree right angles across all elements:
- Window chrome and title bar action controls
- Buttons, chips, and selection tags
- Checkboxes, radio buttons (represented as diamond/square pixel patterns), and scroll handles
- Menus, pop-out panels, and taskbar trays

## Components

### 1. Windows & Dialogs
- **Frame**: 1px black exterior contour enclosing a 2px `#FFFFFF` top/left and `#808080` bottom/right bevel over `#C0C0C0`.
- **Title Bar**:
  - *Active*: `#000080` solid fill with 11px bold white text. Contains square control buttons (16x14px) for Minimize (`_`), Maximize (`^`), and Close (`X` or single horizontal bar).
  - *Inactive*: `#808080` solid fill with `#C0C0C0` text.
- **Menu Bar**: Placed directly below the title bar. `#C0C0C0` background with `File`, `Edit`, `View`, `Options`, `Help`. Alt-key access keys are indicated by a 1px solid underline below the initial letter.

### 2. Buttons
- **Default State**: 2px raised bevel (`#FFFFFF` top/left, `#808080` bottom/right) inside a 1px `#000000` outer box. Background `#C0C0C0`, label centered, black text.
- **Focused State**: Inner 1px black dotted outline inset by 2px around the label.
- **Pressed State**: Inset bevel (`#808080` top/left, `#FFFFFF` bottom/right), text and icon offset 1px down and 1px right to simulate physical depression.

### 3. Desktop Icons
- **Structure**: 32x32px pixelated 16-color icon placed above a monospaced label.
- **Default State**: Transparent background, black or white text with a 1px dotted label perimeter upon single focus.
- **Selected State**: Label box filled with `#000080`, text rendered in pure `#FFFFFF`.

### 4. Bottom Taskbar & System Tray
- **Bar Container**: 32px height fixed across the bottom viewport. Raised 2px top edge (`#FFFFFF`).
- **Start Button**: Fixed left-hand button with system logo, bold label, and prominent raised bevel.
- **Task List**: Recessed/sunken bevel buttons for active applications; raised buttons for minimized windows.
- **System Tray (Right)**: Sunken 2px inset trough hosting:
  - Memory monitor: Terminal-style text badge reading `MEM OK: 640K` in `#00FF66` on `#000000`.
  - Real-time digital clock: Monospaced 12-hour or 24-hour time readout.

### 5. Inputs & Text Areas
- **Style**: Sunken 2px inset (`#808080` top/left, `#FFFFFF` bottom/right) bordered by an outermost black stroke.
- **Fill**: Pure `#FFFFFF` with `#000000` text.
- **Caret**: Solid 1px or 2px non-blinking or hard 500ms block cursor.

### 6. Checkboxes & Radio Buttons
- **Checkbox**: 13x13px square with 2px sunken inset bevel. Checked state displays a sharp, non-antialiased black `X` or heavy checkmark.
- **Radio Button**: 12x12px square or diamond with sunken borders; active selection indicated by a solid 4x4px black square centered within.

### 7. Scrollbars
- **Trough**: Dense 50% checkerboard dither pattern combining `#C0C0C0` and `#FFFFFF`.
- **Thumb Slider**: Standard raised beveled `#C0C0C0` block.
- **Arrows**: Square directional buttons at each terminus featuring 1-bit directional arrow glyphs.