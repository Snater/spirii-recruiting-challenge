# Spirii Recruiting Challenge

The application is implemented using:
- Vite (React framework, TypeScript variant)
- TanStack Query
- Material UI
- Jest + React Testing Library

## Installation

```
npm i
```

## Running the application

```
npm start dev
```

## Running tests

```
npm run test
```

## Implementation notes

- The API is represented by a `MockApi`, with `MockApi.fetchLocations` simulating an asynchronous API request.
- As there could be a large number of locations, the locations are loaded in batches, with an additional batch loaded whenever scrolling to the bottom of the viewport.
- The application uses TanStack Query to perform and cache API requests. The garbage collection time is set to `Infinity` to keep the API response cached in case the user would happen to go offline. Additionally, with TanStack's default `online` network mode, queries would not fire unless there is a network connection. 
- I could have used debouncing to limit the number of requests hitting the API. Since I prefer the user to not wait unnecessarily (even though just milliseconds), I opted for aborting the API requests using TanStack Query's `signal` parameter, which is implementing `AbortController`. Depending on backend considerations, debouncing might be a better choice though.

## Real-time status update considerations

- Real-time status updates could be implemented using a WebSocket connection (i.e. per react-use-websocket) or HTTP/2 connection (i.e. using gRPC).
- As an alternative to maintaining a persistent connection to the backend, the client could use short- oder long-polling. That having the disadvantage of not instantly reflecting any status update due to the interval between polling requests, the implementation effort is less since the polling would simply query a static REST API endpoint.
- It would also be possible to use Server-Sent Events. However, since these are unidirectional, it is not possible for the client to dynamically update the locations which status updates should be received for. There would need to be a backend session keeping track of the filtered locations.
- However, considering the list may contain thousands of items, it would be a sensible optimization to limit locations that should receive updates to the ones currently visible within the viewport. So, whenever the user scrolls, the locations which should be queried for updates are reevaluated according to the ones visible in the viewport, i.e. using the Intersection Observer API.
- The implementation of this challenge is only a list. If there would be an actual map, it would be nice to pinpoint all (filtered) locations in the map. According to whatever pins are visible in the map (considering zoom etc.), these would need to also be considered for status updates. 