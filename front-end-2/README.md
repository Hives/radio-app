# Radio front end

It's a Next.js app

To run:

```
npm ci
npm run build
npm start
```

To run the dev server:

```
npm run dev
```

## Environment variables

The address of the server defaults to `localhost`. Fine for developing when
you're running the client on the same machine as the server, but to connect over
a network you'll need to set the environment variable `SERVER_IP` to the
appropriate network ip address before building.

(You could create a `.env` file to set it when the app starts up)
