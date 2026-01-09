import { OpenApiAuthConfig } from './auth.types';
import { ScalarOptions } from './scalar.types';
import { OpenApiUIOptions } from './swagger-ui.types';

import type { Type } from '@nestjs/common';
import type { ModuleMetadata } from '@nestjs/common/interfaces';

export * from './auth.types';
export * from './openapi-document.types';
export * from './scalar.types';
export * from './swagger-ui.types';

export type UIProvider = 'swagger-ui' | 'scalar';

/**
 * Base options shared by all OpenAPI module configurations
 */
interface OpenApiModuleOptionsBase {
  /**
   * Base path for the API documentation (e.g., 'api/docs')
   * @default 'api/docs'
   */
  path?: string;

  /**
   * API title
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
  auth?: OpenApiAuthConfig;
}

/**
 * OpenAPI module options when using Swagger UI
 */
export interface OpenApiModuleOptionsWithSwaggerUI extends OpenApiModuleOptionsBase {
  /**
   * UI provider set to 'swagger-ui' or omitted (defaults to 'swagger-ui')
   */
  ui?: 'swagger-ui';

  /**
   * Swagger UI specific options
   */
  swaggerUI?: OpenApiUIOptions;

  /**
   * Scalar options are not allowed when using Swagger UI
   */
  scalar?: never;
}

/**
 * OpenAPI module options when using Scalar
 */
export interface OpenApiModuleOptionsWithScalar extends OpenApiModuleOptionsBase {
  /**
   * UI provider set to 'scalar'
   */
  ui: 'scalar';

  /**
   * Scalar specific options
   */
  scalar?: ScalarOptions;

  /**
   * Swagger UI options are not allowed when using Scalar
   */
  swaggerUI?: never;
}

/**
 * OpenAPI module options - discriminated union based on UI provider
 */
export type OpenApiModuleOptions =
  | OpenApiModuleOptionsWithSwaggerUI
  | OpenApiModuleOptionsWithScalar;

export interface OpenApiModuleAsyncOptions<TFactoryArgs extends unknown[] = unknown[]> extends Pick<
  ModuleMetadata,
  'imports'
> {
  /**
   * Dependencies to inject into `useFactory` (e.g. `ConfigService`)
   */
  inject?: { [K in keyof TFactoryArgs]: Type<TFactoryArgs[K]> | string | symbol };
  /**
   * Factory returning the `OpenApiModuleOptions` (sync or async)
   */
  useFactory: (...args: TFactoryArgs) => OpenApiModuleOptions | Promise<OpenApiModuleOptions>;
}
