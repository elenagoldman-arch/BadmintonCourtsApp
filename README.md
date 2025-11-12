# Badminton Court Management App

A full-stack application for managing badminton courts, player queues, and match assignments.

## Features

- **Player Queue Management**: Add players to a waiting queue
- **Court Management**: Manage up to 6 badminton courts
- **Match Assignment**: Automatically assign 4 players (2 vs 2) to available courts
- **Match Rotation**: When a match ends, players return to the end of the queue
- **Real-time Updates**: Auto-refresh every 3 seconds to show current status
- **Visual Status**: Clear indicators for active courts and waiting players

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Auto-refresh polling every 3 seconds

### Backend
- ASP.NET Core 8.0 Web API
- In-memory data storage
- CORS enabled for frontend communication

## Project Structure

```
BadmintonCourtsApp/
├── frontend/          # React + Vite + TypeScript app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   └── types.ts       # TypeScript types
│   └── package.json
├── backend/           # .NET Web API
│   ├── Controllers/       # API endpoints
│   ├── Models/           # Data models
│   ├── Services/         # Business logic
│   └── Program.cs        # Application entry point
└── README.md
```

## Prerequisites

- **Node.js** (v18 or higher) and npm
- **.NET SDK** (8.0 or higher)
- A terminal/command prompt

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore dependencies and build:
   ```bash
   dotnet restore
   dotnet build
   ```

3. Run the backend:
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5000` (or `https://localhost:5001` for HTTPS).

   Swagger UI will be available at `http://localhost:5000/swagger` in development mode.

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

## Usage

1. **Start both servers** (backend and frontend) as described above.

2. **Add Players**: 
   - Enter a player name in the input field
   - Click "Add Player" to add them to the queue

3. **Start a Match**:
   - Ensure you have at least 4 players in the queue
   - Click "Start Match" to automatically assign the next 4 players to an available court

4. **End a Match**:
   - Click "End Match" on any active court
   - The 4 players will automatically return to the end of the queue
   - If there are 4+ players waiting, they will be automatically assigned to the now-free court

5. **Monitor Status**:
   - The app auto-refreshes every 3 seconds
   - View active courts and their assigned players
   - See the waiting queue with player count

## API Endpoints

### Players
- `GET /api/players` - Get all players
- `POST /api/players` - Add a new player
  ```json
  {
    "name": "Player Name"
  }
  ```

### Courts
- `GET /api/courts` - Get all courts and waiting player count
  ```json
  {
    "courts": [...],
    "waitingPlayerCount": 5
  }
  ```

### Match
- `POST /api/match/start` - Start a match (assigns 4 players to next available court)
- `POST /api/match/end/{courtId}` - End a match on a specific court

## Development

### Frontend Development
- The frontend uses Vite for fast HMR (Hot Module Replacement)
- TypeScript is configured with strict mode
- Tailwind CSS is configured for styling

### Backend Development
- Swagger UI is available in development mode
- In-memory storage means data resets on server restart
- CORS is configured to allow requests from `http://localhost:5173` and `http://localhost:3000`

## Notes

- Data is stored in-memory and will be lost when the backend server restarts
- The queue follows FIFO (First In, First Out) order
- Courts require exactly 4 players to start a match
- When a match ends, players are moved to the end of the queue in their original order

## Troubleshooting

### Backend won't start
- Ensure .NET SDK 8.0+ is installed: `dotnet --version`
- Check if port 5000 is already in use

### Frontend won't start
- Ensure Node.js 18+ is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is already in use

### CORS errors
- Ensure the backend is running before starting the frontend
- Verify the backend CORS configuration allows your frontend URL

### API connection errors
- Verify the backend is running on `http://localhost:5000`
- Check the browser console for detailed error messages
- Ensure both servers are running simultaneously

