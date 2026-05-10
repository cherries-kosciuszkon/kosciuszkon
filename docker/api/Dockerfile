FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Kopiujemy plik projektu wskazując folder api/
COPY ["api/api.csproj", "api/"]
RUN dotnet restore "api/api.csproj"

# Kopiujemy całą zawartość folderu api
COPY api/ api/
WORKDIR "/src/api"
RUN dotnet publish "api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_HTTP_PORTS=5190
EXPOSE 5190
ENTRYPOINT ["dotnet", "api.dll"]