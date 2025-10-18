# -----------------------------
# Etapa 1: Dependências
# -----------------------------
FROM node:24.7-alpine3.21 AS dependencies

WORKDIR /usr/src/app

# Instala pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia os arquivos de lock e manifesto
COPY pnpm-lock.yaml package.json ./

# Instala as dependências (somente de produção e build)
RUN pnpm install --frozen-lockfile

# -----------------------------
# Etapa 2: Build
# -----------------------------
FROM dependencies AS build

WORKDIR /usr/src/app

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Gera o client do Prisma
RUN pnpm prisma db pull
RUN pnpm prisma generate

# Build do projeto
RUN pnpm run build

# -----------------------------
# Etapa 3: Produção (reduz dependências)
# -----------------------------
FROM node:24.7-alpine3.21 AS production

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia arquivos necessários da build
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /usr/src/app/prisma ./prisma

# Instala apenas dependências de produção
RUN pnpm install --prod --frozen-lockfile

# -----------------------------
# Etapa 4: Deploy final
# -----------------------------
FROM node:24.7-alpine3.21 AS deploy

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia tudo necessário do estágio anterior
COPY --from=production /usr/src/app/node_modules ./node_modules
COPY --from=production /usr/src/app/dist ./dist
COPY --from=production /usr/src/app/package.json ./package.json
COPY --from=production /usr/src/app/prisma ./prisma

EXPOSE 3333
ENV PORT=3333

CMD ["pnpm", "start:prod"]
