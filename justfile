user := "osakasfavoritedev"
project := "chattools"

git_hash := `git rev-parse --short HEAD`

# Default recipe
default:
    @just -l

# Launch dev containers and enable watch
dev:
    docker compose -f compose.yaml -f compose.dev.yaml up --watch

# Build for both the frontend and backend 
build-both:
    build-frontend
    build-backend

# Pull latest and start prod containers
prod:
    docker compose -f compose.yaml -f compose.prod.yaml pull
    docker compose -f compose.yaml -f compose.prod.yaml up -d

# Build the frontend for arm64 and amd64 then push both  
build-frontend:
    cd {{project}}-ui && 
    docker buildx build \
        --platform linux/amd64,linux/arm64 \
        -t {{user}}/{{project}}-frontend:{{git_hash}} \
        -t {{user}}/{{project}}-frontend:latest \
        --push .

# Build the backend for arm64 and amd64 then push both  
build-backend:
    cd {{project}}-backend && mvn jib:build -Djib.to.tags=latest,{{git_hash}}

