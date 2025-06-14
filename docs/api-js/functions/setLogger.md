[**@appzung/react-native-code-push v10.2.4**](../README.md)

---

[@appzung/react-native-code-push](../README.md) / setLogger

# Function: setLogger()

> **setLogger**(`logger`): `void`

Set a custom logger function to handle all CodePush logs

## Parameters

### logger

[`LoggerFunction`](../type-aliases/LoggerFunction.md)

A function that takes a log level and message and handles the logging

## Returns

`void`

## Example

```
import { setLogger, LogLevel } from '@appzung/react-native-code-push';

// Custom logger that sends critical logs to a crash reporting service
setLogger((level, message) => {
  // Always log to console
  console.log(`[CodePush] ${message}`);

  // Send error logs to crash reporting
  if (level === LogLevel.ERROR) {
    MyCrashReportingService.log(`CodePush error: ${message}`);
  }
});
```
