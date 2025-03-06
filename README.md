# Spirii Recruiting Challenge

This monorepo contains a client application and a backend application, the latter allowing to update location statuses per WebSocket connection.

## Configuration

The WebSocket server setup may be adjusted in the project root's `.env` file.

## Installation

```
npm i
```

## Running the application

```
npm start
```

## Starting Storybook

```
npm run storybook
```

## Running tests

```
npm run test
```

## Sending status updates

Status updates may be sent by editing `./packages/server/statuses.json`. Whenever a file change is registered with the JSON schema being valid, an update is sent via the WebSocket connection, if any of the location status updates are available for are currently visible in the viewport. (Since the list of locations can potentially contain a very large amount of locations, status updates are only issued for locations actually visible.)

## Implementation notes

- The API is represented by a `MockApi`, with `MockApi.fetchLocations` simulating an asynchronous API request.
- As there could be a large number of locations, the locations are loaded in batches, with an additional batch loaded whenever scrolling to the bottom of the viewport.
- The application uses TanStack Query to perform and cache API requests. The garbage collection time is set to `Infinity` to keep the API response cached in case the user would happen to go offline. Additionally, with TanStack's default `online` network mode, queries would not fire unless there is a network connection. 
- I could have used debouncing to limit the number of requests hitting the API. Since I prefer the user to not wait unnecessarily (even though just milliseconds), I opted for aborting the API requests using TanStack Query's `signal` parameter, which is implementing `AbortController`. Depending on backend considerations, debouncing might be a better choice though.

## Real-time status update considerations

- Real-time status updates can be implemented using a WebSocket connection (as done in this application) or HTTP/2 connection (i.e. using gRPC).
- As an alternative to maintaining a persistent connection to the backend, the client could use short- oder long-polling. That having the disadvantage of not instantly reflecting any status update due to the interval between polling requests, the implementation effort is less since the polling would simply query a static REST API endpoint.
- It would also be possible to use Server-Sent Events. However, since these are unidirectional, it is not possible for the client to dynamically update the locations which status updates should be received for. There would need to be a backend session keeping track of the filtered locations.
- The implementation of this challenge is only a list. If there would be an actual map, it would be nice to pinpoint all (filtered) locations in the map. According to whatever pins are visible in the map (considering zoom etc.), these would need to also be considered for status updates. 
