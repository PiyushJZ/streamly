# Streamly

## Simplified Multiplatform Streaming

## Project Setup

Set node version 22

```bash
nvm install
nvm use
```

Install and use pnpm

```bash
npm install --global corepack@latest
corepack enable pnpm
```

Install Redis

Using native redis package

```bash
sudo apt install redis
```

Using docker

```bash
docker run -d --name redis -p 6379:6379 bitnami/redis:latest
```

```bash
docker start redis
```

```bash
docker stop redis
```

Install dependencies

```bash
npm ci
```

Run all server microservices and ui in development mode

```bash
npm run dev
```
