# Express + MongoDB

Backend for Just-Whiteboard web application.

## How to run it?

1. Create file `.env` with neccesary environment variales:
```
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
MONGODB_CONNECTION_STRING="YOUR_MONGODB_CONNECTION_STRING"
```
2. Install dependencies using `npm`
```
npm install
```

3. Run project
```
npm run dev
```

## How to use migrations?

1. Install migrate-mongo globaly
```
npm install -g migrate-mongo
```

2. Check migration status
```
migrate-mongo status
```

3. Apply all pending migrations
```
migrate-mongo up
```

4. Revert the last aplied migration
```
migrate-mongo down
```

5. Create migration
```
migrate-mongo create <your-migration-name>
```