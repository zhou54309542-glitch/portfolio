@echo off
setlocal
set "NODE_EXE=C:\Program Files\nodejs\node.exe"
set "SITE_SCRIPT=C:\Users\Administrator\Documents\Codex\2026-06-12\chrome\portfolio\.serve-static.cjs"

if not exist "%NODE_EXE%" exit /b 1
if not exist "%SITE_SCRIPT%" exit /b 1

start "" /min "%NODE_EXE%" "%SITE_SCRIPT%"
