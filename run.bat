@echo off
echo Starting Laundry Order Management System (Mini CRM)...

cd /d %~dp0

echo Starting Next.js server...
call npm run dev

pause