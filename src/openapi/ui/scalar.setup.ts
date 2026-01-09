import { apiReference } from '@scalar/nestjs-api-reference';

import type { OpenAPIDocument, ScalarOptions, OpenApiModuleOptionsWithScalar } from '../types';
import type { INestApplication } from '@nestjs/common';
import type { Express } from 'express';

/**
 * Sets up Scalar API Reference for the NestJS application
 */
export class ScalarSetup {
  /**
   * Configures and mounts Scalar API Reference with the provided OpenAPI document
   * @param app - NestJS application instance
   * @param document - OpenAPI document generated from the application
   * @param options - OpenAPI module options containing Scalar configuration
   */
  static setup(
    app: INestApplication,
    document: OpenAPIDocument,
    options: OpenApiModuleOptionsWithScalar
  ): void {
    const docsPath = options.path || 'api/docs';
    // Ensure path starts with / for Express
    const normalizedPath = docsPath.startsWith('/') ? docsPath : `/${docsPath}`;
    const scalarOptions: ScalarOptions = options.scalar || {};

    // Build configuration object
    const baseConfiguration: Record<string, unknown> = {
      content: document,
    };

    if (scalarOptions.theme) {
      baseConfiguration.theme = scalarOptions.theme;
    }

    if (scalarOptions.scalarOptions) {
      Object.assign(baseConfiguration, scalarOptions.scalarOptions);
    }

    const middleware = apiReference(baseConfiguration);

    // Get Express instance from HTTP adapter
    const httpAdapter = app.getHttpAdapter();
    if (!httpAdapter || typeof httpAdapter.getInstance !== 'function') {
      throw new Error(
        'Scalar setup requires an Express HTTP adapter. Make sure you are using @nestjs/platform-express.'
      );
    }

    const expressApp = httpAdapter.getInstance() as Express;
    if (!expressApp || typeof expressApp.use !== 'function') {
      throw new Error('Invalid Express application instance');
    }

    expressApp.use(normalizedPath, middleware);
  }
}
