# Paul's radio app, front end

Created with Create React App. [Details](create-react-app-README.md)

# Installation

Install with `yarn`.

Run the dev server with `yarn start`

Create a production build at `build/`: `yarn build`

Serve the build on the default port of 3000: `yarn serve`

## Environment variables

The address of the server defaults to `localhost`. Fine for developing when
you're running the client on the same machine as the server, but to connect over
a network you'll need to set the environment variable `REACT_APP_SERVER_IP` to
the appropriate network ip address before building.
