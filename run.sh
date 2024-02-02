# Build and run the project in a docker container
npm run build
docker build -t suspicious-reading-detector:1.0.0 .
docker run -ti suspicious-reading-detector:1.0.0