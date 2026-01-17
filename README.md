# 2048 Game

A functional implementation of the popular 2048 game built with React. The goal is to combine tiles with the same number to reach 2048.

## Features

- **4x4 Game Board**: Default board size with configurable dimensions
- **Tile Merging**: Combine tiles with the same number to create higher values
- **Score Tracking**: Real-time score updates based on merged tiles
- **Game Controls**: Both keyboard (arrow keys) and GUI button controls
- **Game States**: Win condition (2048) and game over detection
- **Restart Functionality**: Start a new game anytime
- **Responsive Design**: Clean, modern UI with smooth animations

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd 2048-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Game

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5174` to play the game.

## Gameplay Instructions

### Objective
Combine tiles with the same number to create a tile with the value 2048.

### Controls
- **Keyboard**: Use arrow keys (↑, ↓, ←, →) to move tiles
- **GUI Buttons**: Click the directional buttons below the board

### Rules
1. Tiles move in the direction you choose
2. Tiles with the same number merge when they collide
3. After each move, a new tile (2 or 4) appears in a random empty spot
4. Game ends when you reach 2048 (win) or no moves are possible (game over)

### Scoring
- Points are awarded when tiles merge
- The score equals the sum of all merged tile values

## Implementation Details

### Architecture
- **React**: Component-based UI with hooks for state management
- **Functional Programming**: Pure functions for game logic
- **Modular Design**: Separated concerns (components, hooks, utilities)

### Key Components
- `App.jsx`: Main application component
- `Board.jsx`: Renders the 4x4 grid of tiles
- `Tile.jsx`: Individual tile component with styling
- `GameControls.jsx`: GUI controls and game status messages

### Game Logic (`utils/gameLogic.js`)
- `initializeBoard()`: Creates empty board
- `addRandomTile()`: Adds 2 or 4 to random empty position
- `moveTiles()`: Handles tile movement and merging
- `canMove()`: Checks if valid moves exist
- `hasWon()`: Checks for 2048 tile

### State Management (`hooks/useGame.js`)
- Manages game state (board, score, game status)
- Handles keyboard and GUI input
- Implements game initialization and restart

### Technical Specifications
- **Board Size**: Configurable (default 4x4)
- **Tile Values**: Start with 2 or 4, merge to sum
- **Random Generation**: 90% chance for 2, 10% for 4
- **Functional Programming**: Immutable data structures
- **Dynamic Updates**: Real-time UI updates

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Technologies Used

- React 19
- Vite (build tool)
- JavaScript (ES6+)
- CSS3
- HTML5

## Hoated Link
- https://2048-game-nine-flame.vercel.app/
