# Wybierz bazowy obraz Node.js
FROM node:18-alpine

# Zainstaluj pnpm, python3, make, g++, pkg-config, cairo, pango, libjpeg-turbo, giflib, git, pixman, openssl
RUN apk add --no-cache python3 make g++ pkgconfig cairo-dev pango-dev libjpeg-turbo-dev giflib-dev git pixman-dev openssl \
  && npm install -g pnpm concurrently \
  && npm install -g nodemon

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj resztę plików backendu i frontendu do odpowiednich katalogów
COPY backend ../backend/
COPY frontend ../frontend/

# Zainstaluj zależności backendu
RUN cd backend && npm install

# Zainstaluj zależności frontendu
RUN cd frontend && pnpm install

# Wygeneruj klucze SSL
RUN cd backend && openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost"

# Expose the ports
EXPOSE 3000
EXPOSE 5173

# Uruchom backend i frontend
CMD ["concurrently", "--kill-others-on-fail", "cd backend && npm run dev", "cd frontend && pnpm run dev"]
