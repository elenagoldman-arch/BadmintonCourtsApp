# Stage 1: Build the .NET app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything in the backend folder
COPY . .

# Publish the app to the /app folder
RUN dotnet publish -c Release -o /app

# Stage 2: Run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published output from build stage
COPY --from=build /app .

# Expose port Render will use
EXPOSE 10000
ENV ASPNETCORE_URLS=http://+:10000

# Start the .NET app
ENTRYPOINT ["dotnet", "BadmintonCourtsApp.dll"]
