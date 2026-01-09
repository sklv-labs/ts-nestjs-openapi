import { SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';

import { OpenApiUIThemeManager } from '../themes';

import type { OpenAPIDocument, OpenApiModuleOptionsWithSwaggerUI } from '../types';
import type { INestApplication } from '@nestjs/common';

/**
 * Sets up Swagger UI for the NestJS application
 */
export class OpenApiUISetup {
  /**
   * Configures and mounts Swagger UI with the provided OpenAPI document
   * @param app - NestJS application instance
   * @param document - OpenAPI document generated from the application
   * @param options - OpenAPI module options containing UI configuration
   */
  static setup(
    app: INestApplication,
    document: OpenAPIDocument,
    options: OpenApiModuleOptionsWithSwaggerUI
  ): void {
    const docsPath = options.path || 'api/docs';
    const swaggerUIOptions = options.swaggerUI || {};

    const swaggerOptions = {
      explorer: true,
      jsonDocumentUrl: `${docsPath}.json`,
      ...swaggerUIOptions.swaggerOptions,
    };

    const customCss = swaggerUIOptions.theme
      ? OpenApiUIThemeManager.getThemeCss(swaggerUIOptions.theme)
      : undefined;

    NestSwaggerModule.setup(docsPath, app, document, {
      ...swaggerOptions,
      customCss,
    });
  }
}
