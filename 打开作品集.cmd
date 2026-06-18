@echo off
setlocal
set "ROOT=%~dp0"
start "" /min "%ROOT%启动本地作品集站点.cmd"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4194/"
