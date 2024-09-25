@echo off

echo Executing database...
dotnet ef database update

echo Executing seeddata...
dotnet run seeddata
