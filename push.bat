@echo off
title Push VayuLens to GitHub
echo ====================================================================
echo   Pushing VayuLens (वायुLens) to GitHub Repository:
echo   https://github.com/prakritisingh0873-design/VAAYULENS.git
echo ====================================================================
echo.

set GIT_PATH="%LOCALAPPDATA%\MinGit\cmd\git.exe"

if exist %GIT_PATH% (
    set GIT_CMD=%GIT_PATH%
) else (
    set GIT_CMD=git
)

echo [1/3] Adding all files to Git...
%GIT_CMD% add -A

echo [2/3] Committing changes...
%GIT_CMD% commit -m "Initial release: VayuLens GenAI Urban Smog & Air Defense Assistant with Family Health Hub, Weather Updater, Vision AI, and Diurnal Inversion Optimizer"

echo [3/3] Pushing to remote repository (main branch)...
%GIT_CMD% branch -M main
%GIT_CMD% remote remove origin 2>nul
%GIT_CMD% remote add origin https://github.com/prakritisingh0873-design/VAAYULENS.git
%GIT_CMD% push -u origin main

echo.
echo ====================================================================
echo   Push attempt completed!
echo ====================================================================
pause
