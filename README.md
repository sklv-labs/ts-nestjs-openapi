# @sklv-labs/ts-nestjs-openapi

A comprehensive OpenAPI package for NestJS applications with support for both Swagger UI and Scalar API Reference. This package provides a clean, type-safe API for setting up OpenAPI documentation in your NestJS projects.

## Features

- 🎯 **Dual UI Support** - Choose between Swagger UI or Scalar API Reference
- 🔒 **Authentication Support** - Built-in support for Bearer token and Cookie authentication
- 🎨 **Theme Customization** - Multiple themes available for both UI providers
- 📦 **Type-Safe** - Full TypeScript support with comprehensive type definitions
- 🚀 **Easy Setup** - Simple API for both synchronous and asynchronous configuration
- 🛠️ **NestJS Native** - Built on top of `@nestjs/swagger` with seamless integration

## Installation

```bash
npm install @sklv-labs/ts-nestjs-openapi
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install @nestjs/common@^11.1.11 @nestjs/core@^11.1.11 @nestjs/swagger@^11.2.4
```

For Scalar support (optional):

```bash
npm install @scalar/nestjs-api-reference@^1.0.13 @scalar/themes@0.13.26
```

**Note:** This package requires Node.js 24 LTS or higher.

## Quick Start

### Basic Setup with Swagger UI

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { OpenApiModule } from '@sklv-labs/ts-nestjs-openapi';

@Module({
  imports: [
    OpenApiModule.forRoot({
      title: 'My API',
      description: 'API Documentation',
      version: '1.0',
      path: 'api/docs',
    }),
  ],
})
export class AppModule {}

// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenApiModule } from '@sklv-labs/ts-nestjs-openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  OpenApiModule.setup(app, {
    title: 'My API',
    description: 'API Documentation',
    version: '1.0',
  });
  
  await app.listen(3000);
}
bootstrap();
```

### Setup with Scalar

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { OpenApiModule } from '@sklv-labs/ts-nestjs-openapi';

@Module({
  imports: [
    OpenApiModule.forRoot({
      title: 'My API',
      description: 'API Documentation',
      version: '1.0',
      ui: 'scalar',
      path: 'api/docs',
      scalar: {
        theme: 'default',
      },
    }),
  ],
})
export class AppModule {}
```

### Async Configuration

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenApiModule } from '@sklv-labs/ts-nestjs-openapi';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OpenApiModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        title: config.get('API_TITLE', 'My API'),
        description: config.get('API_DESCRIPTION', 'API Documentation'),
        version: config.get('API_VERSION', '1.0'),
        path: config.get('API_DOCS_PATH', 'api/docs'),
      }),
    }),
  ],
})
export class AppModule {}
```

## Configuration Options

### OpenApiModuleOptions

Base configuration options shared by all UI providers:

```typescript
interface OpenApiModuleOptionsBase {
  /**
   * Base path for the API documentation (e.g., 'api/docs')
   * @default 'api/docs'
   */
  path?: string;

  /**
   * API title (required)
   */
  title: string;

  /**
   * API description
   */
  description?: string;

  /**
   * API version
   * @default '1.0'
   */
  version?: string;

  /**
   * Authentication configuration
   */
  auth?: {
    bearer?: {
      name?: string;
      description?: string;
    };
    cookie?: {
      name?: string;
      description?: string;
    };
  };
}
```

### Swagger UI Options

```typescript
interface OpenApiModuleOptionsWithSwaggerUI extends OpenApiModuleOptionsBase {
  /**
   * UI provider set to 'swagger-ui' or omitted (defaults to 'swagger-ui')
   */
  ui?: 'swagger-ui';

  /**
   * Swagger UI specific options
   */
  swaggerUI?: {
    theme?: 'dracula' | 'gruvbox' | 'nord-dark' | 'one-dark' | 'sepia' | 'universal-dark' | 'monokai';
    swaggerOptions?: {
      explorer?: boolean;
      jsonDocumentUrl?: string;
      [key: string]: unknown;
    };
  };
}
```

### Scalar Options

```typescript
interface OpenApiModuleOptionsWithScalar extends OpenApiModuleOptionsBase {
  /**
   * UI provider set to 'scalar'
   */
  ui: 'scalar';

  /**
   * Scalar specific options
   */
  scalar?: {
    theme?: 'alternate' | 'default' | 'moon' | 'purple' | 'solarized' | 'bluePlanet' | 'saturn' | 'kepler' | 'mars' | 'deepSpace' | 'laserwave' | 'none';
    scalarOptions?: {
      [key: string]: unknown;
    };
  };
}
```

## Authentication

### Bearer Token Authentication

```typescript
OpenApiModule.forRoot({
  title: 'My API',
  auth: {
    bearer: {
      name: 'access-token',
      description: 'JWT access token',
    },
  },
});
```

### Cookie Authentication

```typescript
OpenApiModule.forRoot({
  title: 'My API',
  auth: {
    cookie: {
      name: 'refresh-token',
      description: 'Refresh token stored in cookie',
    },
  },
});
```

### Both Bearer and Cookie

```typescript
OpenApiModule.forRoot({
  title: 'My API',
  auth: {
    bearer: {
      name: 'access-token',
      description: 'JWT access token',
    },
    cookie: {
      name: 'refresh-token',
      description: 'Refresh token',
    },
  },
});
```

## Decorators

### ApiUuidProperty

A convenience decorator for UUID properties in DTOs:

```typescript
import { ApiUuidProperty } from '@sklv-labs/ts-nestjs-openapi';

export class GetUserDto {
  @ApiUuidProperty()
  id: string;
}
```

This is equivalent to:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    example: '0c168cb5-d5e0-459c-9265-71b5aada4a7e',
    format: 'uuid',
    type: 'string',
  })
  id: string;
}
```

## API Reference

### OpenApiModule

#### `forRoot(options: OpenApiModuleOptions): DynamicModule`

Synchronously configure the OpenAPI module.

#### `forRootAsync<TFactoryArgs>(options: OpenApiModuleAsyncOptions<TFactoryArgs>): DynamicModule`

Asynchronously configure the OpenAPI module with dependency injection support.

#### `setup(app: INestApplication, options: OpenApiModuleOptions): void`

Setup OpenAPI UI for the given NestJS application. This should be called in your `main.ts` after app initialization.

## Type Exports

The package exports all types for use in your application:

```typescript
import type {
  OpenApiModuleOptions,
  OpenApiModuleOptionsWithSwaggerUI,
  OpenApiModuleOptionsWithScalar,
  OpenApiModuleAsyncOptions,
  OpenApiAuthConfig,
  ScalarOptions,
  OpenApiUIOptions,
  UIProvider,
} from '@sklv-labs/ts-nestjs-openapi';
```

## Development

```bash
# Build
npm run build

# Lint
npm run lint

# Format
npm run format

# Test
npm run test

# Type check
npm run type-check
```

## License

MIT © [sklv-labs](https://github.com/sklv-labs)
