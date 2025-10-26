@echo off
echo Starting Development Servers...
echo.
echo Starting Backend on port 5000...
start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 2 /nobreak > nul
echo.
echo Starting Frontend on port 5173...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause
