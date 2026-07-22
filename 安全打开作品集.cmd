@echo off
setlocal
set "ROOT=%~dp0"
set "NODE_EXE=C:\Program Files\nodejs\node.exe"
set "SITE_SCRIPT=%ROOT%.serve-static.cjs"
set "SITE_URL=http://127.0.0.1:4194/"

if not exist "%NODE_EXE%" (
  echo Node.js not found: %NODE_EXE%
  pause
  exit /b 1
)

if not exist "%SITE_SCRIPT%" (
  echo Preview script not found: %SITE_SCRIPT%
  pause
  exit /b 1
)

start "portfolio-preview" /min "%NODE_EXE%" "%SITE_SCRIPT%"
timeout /t 2 /nobreak >nul
start "" "%SITE_URL%"
