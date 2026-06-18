@echo off
setlocal
set "ROOT=%~dp0"
start "" explorer.exe "%ROOT%dist\index.html"
