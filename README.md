# Download speed test

A console script (Node.js + TypeScript) that measures download speed. It requests the given URL 10 times in a row, waits for each response to be fully downloaded, and prints the average request time, the total amount of data and the download speed.

## Requirements

- Node.js `^22.12.0` or `>=24.0.0`
- [Yarn](https://classic.yarnpkg.com) 1.x

## Installation

```bash
yarn install
```

## Usage

```bash
yarn start <url>
```

The URL must use `http:` or `https:` and point to a file that is heavy enough to give a stable measurement, for example a large image.

Example:

```bash
yarn start "https://picsum.photos/id/1015/5000/3333.jpg"
```

Output:

```
Target: https://picsum.photos/id/1015/5000/3333.jpg
Request 1/10: 1.84 MB in 3106 ms (4.73 Mbit/s)
Request 2/10: 1.84 MB in 1956 ms (7.51 Mbit/s)
...
Request 10/10: 1.84 MB in 4013 ms (3.66 Mbit/s)

Average request time: 2687 ms
Total downloaded: 18.36 MB
Download speed: 5.47 Mbit/s
```

## Units

| Value                | Unit                         |
| -------------------- | ---------------------------- |
| Download speed       | Mbit/s (megabits per second) |
| Total downloaded     | MB (megabytes)               |
| Average request time | ms (milliseconds)            |

Decimal prefixes are used: 1 MB = 1,000,000 bytes, 1 Mbit = 1,000,000 bits, 1 byte = 8 bits.

The speed is calculated as:

```
speed (Mbit/s) = total bytes × 8 / total time in seconds / 1,000,000
```

Total time is the sum of the durations of all requests, so the pauses between them do not affect the result. Each request is timed from sending it until the last byte of the response body is read.

## Details

- The requests are sent one after another; the next one starts only after the previous response is fully received.
- The response body is read as a stream and only its size is counted, so the file is never kept in memory.
- The `Accept-Encoding: identity` header is sent, so the server does not compress the response and the counted bytes match the bytes transferred over the network.
- A request is aborted after 60 seconds.
- If any request fails (invalid URL, network error, non-2xx status, timeout), the script stops, prints the error and exits with code 1.

## Development

```bash
yarn lint     # type check (tsc) and ESLint
yarn format   # Prettier
```
