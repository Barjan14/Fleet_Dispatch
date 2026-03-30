@echo off
REM Fleet Dispatch - Quick Start Script

echo.
echo ========================================
echo     Fleet Dispatch - Quick Start
echo ========================================
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo [1/3] Starting Django Backend on port 8000...
echo.
start cmd /k "cd /d C:\Users\Acer\Fleet_Dispatch && python manage.py runserver"

timeout /t 3 /nobreak

echo [2/3] Starting React Frontend on port 5174...
echo.
start cmd /k "cd /d C:\Users\Acer\Fleet_Dispatch\frontend && npm run dev"

timeout /t 3 /nobreak

echo [3/3] Opening browser...
timeout /t 2 /nobreak
start http://localhost:5174/

echo.
echo ========================================
echo        Servers Starting!
echo ========================================
echo.
echo Backend (Django):  http://localhost:8000/
echo Frontend (React):  http://localhost:5174/
echo.
echo Press CTRL+C in each terminal to stop the servers
echo.
pause
