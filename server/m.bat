@echo off

echo Executing migrations
dotnet ef migrations add %1

echo Executing database...
dotnet ef database update

echo Executing seeddata...
dotnet run seeddata
