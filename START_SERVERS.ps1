#!/usr/bin/env powershell
# Fleet Dispatch - Quick Start Script

Write-Host ""
Write-Host "========================================"
Write-Host "    Fleet Dispatch - Quick Start"
Write-Host "========================================"
Write-Host ""

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✓ npm found: $npmVersion"
}
catch {
    Write-Host "✗ npm is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if python is installed
try {
    $pythonVersion = python --version
    Write-Host "✓ Python found: $pythonVersion"
}
catch {
    Write-Host "✗ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python from https://www.python.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[1/3] Starting Django Backend on port 8000..." -ForegroundColor Green
Write-Host ""

# Start Django in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Acer\Fleet_Dispatch'; python manage.py runserver" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host "[2/3] Starting React Frontend on port 5174..." -ForegroundColor Green
Write-Host ""

# Start Frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Acer\Fleet_Dispatch\frontend'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host "[3/3] Opening browser..." -ForegroundColor Green
Start-Sleep -Seconds 2

# Open browser
Start-Process "http://localhost:5174/"

Write-Host ""
Write-Host "========================================"
Write-Host "       Servers Starting!"
Write-Host "========================================"
Write-Host ""
Write-Host "Backend (Django):  http://localhost:8000/" -ForegroundColor Cyan
Write-Host "Frontend (React):  http://localhost:5174/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press CTRL+C in each terminal to stop the servers" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit this script"
