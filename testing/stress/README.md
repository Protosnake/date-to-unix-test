# Unix Timestamp Converter API Stress Testing

This directory contains k6 stress tests for the Unix Timestamp Converter API. These tests are designed to measure and validate the performance, reliability, and scalability of the API under various load conditions.

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) installed on your machine
- Node.js and npm

## Installation

`nvm use` or `nvm install` if you don't have the right version
`npm install`

## Usage

```bash
# Run the stress tests with default settings
npm run test
```

### Customizing the API URL

By default, tests run against `https://helloacm.com/api`. To test your own API endpoint:

```bash
# Set custom API URL via environment variable
API_URL=http://your-api-server.com npm run test
```

### Advanced Usage: Custom Load Patterns

You can customize the virtual user count and test duration by setting environment variables:

```bash
# Example: Run test with custom load pattern
STAGE_DURATION=60s TARGET_USERS=50 npm run test
```

## Understanding Test Results

After running the tests, k6 will display a detailed summary in your terminal:

### Key Metrics to Watch

1. **HTTP Request Duration**

   - `http_req_duration`: How long requests are taking
   - Look for the p95 (95th percentile) value to understand worst-case performance

2. **Error Rate**

   - `http_req_failed`: Percentage of requests that failed
   - Should be close to 0% for a healthy system

3. **Endpoint-Specific Latency**

   - `latency_date_to_timestamp_ms`: Response time for date-to-timestamp conversion
   - `latency_timestamp_to_date_ms`: Response time for timestamp-to-date conversion
   - `latency_invalid_data_ms`: Response time for invalid input handling

4. **Virtual Users**
   - `vus`: Number of concurrent virtual users at any given time
   - `vus_max`: Maximum configured number of virtual users

### Sample Output

```
  execution: local
     script: tests/unix-timestamp-converter.ts
     output: -

  scenarios: (100.00%) 1 scenario, 20 max VUs, 2m15s max duration (incl. graceful stop):
           * default: Up to 20 looping VUs for 1m45s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

  ✓ status is 200 (date-to-timestamp)
  ✓ body is correct timestamp
  ✓ status is 200 (timestamp-to-date)
  ✓ body is correct date string
  ✓ status is 200 (invalid)
  ✓ body is false

     data_received..................: 58 kB   553 B/s
     data_sent......................: 4.3 kB  41 B/s
     http_req_blocked...............: avg=4.2ms   min=0s      med=0s      max=97.76ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=2.09ms  min=0s      med=0s      max=48.31ms p(90)=0s      p(95)=0s
     http_req_duration..............: avg=204.1ms min=106.3ms med=184.6ms max=648.1ms p(90)=302.36ms p(95)=349.63ms
       { expected_response:true }...: avg=204.1ms min=106.3ms med=184.6ms max=648.1ms p(90)=302.36ms p(95)=349.63ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 306
     http_req_receiving.............: avg=142µs   min=47µs    med=121µs   max=1.23ms  p(90)=190µs    p(95)=234µs
     http_req_sending...............: avg=54.63µs min=26µs    med=48µs    max=330µs   p(90)=76.1µs   p(95)=88µs
     http_req_tls_handshaking.......: avg=2.06ms  min=0s      med=0s      max=48.28ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=203.9ms min=106.15ms med=184.44ms max=648.02ms p(90)=302.18ms p(95)=349.45ms
     http_reqs......................: 306     2.919048/s
     iteration_duration.............: avg=3.2s    min=3.1s    med=3.18s   max=3.75s   p(90)=3.32s    p(95)=3.39s
     iterations.....................: 102     0.973016/s
     latency_date_to_timestamp_ms...: avg=203.26ms min=106.47ms med=184.06ms max=647.93ms p(90)=301.19ms p(95)=344.68ms
     latency_invalid_data_ms........: avg=206.45ms min=110.19ms med=184.94ms max=648.1ms p(90)=304.97ms p(95)=363.56ms
     latency_timestamp_to_date_ms...: avg=202.58ms min=106.3ms med=183.74ms max=644.19ms p(90)=296.36ms p(95)=345.01ms
     vus............................: 1       min=1      max=20
     vus_max........................: 20      min=20     max=20
```

## Visualizing Results

### Generating a JSON Report

You can save test results to a JSON file for further analysis:

```bash
k6 run --out json=results.json tests/unix-timestamp-converter.ts
```

### HTML Reports (Optional)

To generate HTML reports, you can use k6's browser extension:

1. Install the [k6 Browser Extension](https://k6.io/docs/results-visualization/web-dashboard)
2. Run tests with the web dashboard output:

```bash
k6 run --out web-dashboard tests/unix-timestamp-converter.ts
```

## Interpreting Test Results

### Performance Thresholds

The tests have defined thresholds that represent the pass/fail criteria:

- **Response Time**: 95% of requests should complete in under 400ms
- **Error Rate**: Less than 1% of requests should fail

### Analysis Guidance

1. **Look for Response Time Trends**

   - Are there spikes during peak load?
   - Does performance degrade as user count increases?

2. **Check Error Rates**

   - Any errors indicate potential reliability issues
   - Watch for timeouts or connection errors

3. **Compare Endpoint Performance**

   - Are some endpoints consistently slower?
   - Identify bottlenecks for optimization

4. **Resource Utilization**
   - Monitor server CPU, memory, and network during tests
   - Correlate with response time patterns

## Troubleshooting

### Common Issues

1. **Connection Errors**

   - Ensure the API is accessible
   - Check network firewall settings

2. **High Response Times**

   - Increase server resources
   - Look for database query bottlenecks
   - Consider caching frequently accessed data

3. **Failed Assertions**
   - Verify API behavior matches expectations
   - Check for changes in API response format

## Advanced Configuration

For more complex testing scenarios, you can modify the test configuration in `tests/unix-timestamp-converter.ts`:

- Adjust virtual user counts and stage durations
- Add custom metrics or checks
- Implement more complex user behaviors

## Contributing

Feel free to extend these tests by:

1. Adding more test scenarios
2. Implementing additional checks for edge cases
3. Enhancing performance metrics and reporting
