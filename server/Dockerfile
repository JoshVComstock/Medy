#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Imagen base de ASP.NET Core para ejecutar la aplicación
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base-env
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Imagen de compilación que usa el SDK de .NET para compilar el código fuente
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["server.csproj", "./"]
RUN dotnet restore "./server.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Fase de publicación para optimizar la salida
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Imagen final basada en la imagen base de ASP.NET Core
FROM base-env AS final
WORKDIR /app
RUN mkdir -p /app/Uploads
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "server.dll"]
