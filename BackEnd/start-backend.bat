@echo off
REM Start backend from this folder (works when this folder is the project root)
cd /d "%~dp0"
echo Iniciando backend en directorio: %CD%
npm start
pause