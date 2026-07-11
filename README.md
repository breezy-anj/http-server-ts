[![progress-banner](https://backend.codecrafters.io/progress/http-server/a696f778-ad12-4e41-8920-188162e9c165)](https://app.codecrafters.io/users/breezy-anj?r=2qF)

This is a starting point for TypeScript solutions to the
["Build Your Own HTTP server" Challenge](https://app.codecrafters.io/courses/http-server/overview).

[HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) is the
protocol that powers the web. In this challenge, you'll build a HTTP/1.1 server
that is capable of serving multiple clients.

Along the way you'll learn about TCP servers,
[HTTP request syntax](https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html),
and more.

**Note**: If you're viewing this repo on GitHub, head over to
[codecrafters.io](https://codecrafters.io) to try the challenge.

# Passing the first stage

The entry point for your HTTP server implementation is in `app/main.ts`. Study
and uncomment the relevant code, and then run the command below to execute the
tests on our servers:

```sh
codecrafters submit
```

Time to move on to the next stage!

# Stage 2 & beyond

Note: This section is for stages 2 and beyond.

1. Ensure you have `bun (1.3)` installed locally
1. Run `./your_program.sh` to run your program, which is implemented in
   `app/main.ts`.
1. Run `codecrafters submit` to submit your solution to CodeCrafters. Test
   output will be streamed to your terminal.

## Current Progress

Based on the implementation in `app/main.ts`, the following HTTP server challenges have been solved so far:

- **Stage 1 & 2: Setup & Basic Response:** Binds to a TCP port and responds with HTTP `200 OK` for the root path `/`.
- **Stage 3: 404 Not Found:** Handles unknown routes by returning a `404 Not Found` status.
- **Stage 4: Respond with Body:** Parses the `/echo/{str}` endpoint and responds with the requested string and correct `Content-Length`.
- **Stage 5: Read Headers:** Parses HTTP headers to extract the `User-Agent` and returns it from the `/user-agent` endpoint.
- **Stage 6: Serve Files:** Parses command-line arguments to accept a `--directory` flag, and serves files dynamically from the `/files/{filename}` endpoint using `fs.readFileSync`.

Keep it up!
