# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-XX

### Added

- Initial release of @sklv-labs/ts-nestjs-openapi
- `OpenApiModule` with `forRoot` and `forRootAsync` methods for module configuration
- `OpenApiModule.setup` method for setting up OpenAPI UI in main.ts
- Support for Swagger UI with customizable themes
- Support for Scalar API Reference with multiple theme options
- Bearer token authentication configuration
- Cookie authentication configuration
- `ApiUuidProperty` decorator for UUID properties in DTOs
- Comprehensive TypeScript type definitions
- Full documentation and usage examples

### Features

- **Dual UI Support**: Choose between Swagger UI or Scalar API Reference
- **Type-Safe Configuration**: Full TypeScript support with discriminated unions
- **Authentication Support**: Built-in support for Bearer and Cookie authentication
- **Theme Customization**: Multiple themes available for both UI providers
- **Async Configuration**: Support for dependency injection in async module configuration
- **NestJS Native**: Built on top of `@nestjs/swagger` with seamless integration
