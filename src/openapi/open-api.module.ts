import { DynamicModule, INestApplication, Module, Provider, Type } from '@nestjs/common';
import { SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';

import { DocumentBuilderConfig } from './config';
import { OPEN_API_OPTIONS } from './open-api.constants';
import { ScalarSetup, OpenApiUISetup } from './ui';

import type {
  OpenApiModuleAsyncOptions,
  OpenApiModuleOptions,
  OpenApiModuleOptionsWithScalar,
  OpenApiModuleOptionsWithSwaggerUI,
} from './types';

@Module({})
export class OpenApiModule {
  static forRoot(options: OpenApiModuleOptions): DynamicModule {
    const openApiOptionsProvider: Provider = {
      provide: OPEN_API_OPTIONS,
      useValue: options,
    };

    return {
      module: OpenApiModule,
      providers: [openApiOptionsProvider],
      exports: [OPEN_API_OPTIONS],
    };
  }

  static forRootAsync<TFactoryArgs extends unknown[] = unknown[]>(
    options: OpenApiModuleAsyncOptions<TFactoryArgs>
  ): DynamicModule {
    const openApiOptionsProvider: Provider = {
      provide: OPEN_API_OPTIONS,
      useFactory: options.useFactory,
      inject: (options.inject ?? []) as Array<Type<unknown> | string | symbol>,
    };

    return {
      module: OpenApiModule,
      imports: options.imports ?? [],
      providers: [openApiOptionsProvider],
      exports: [OPEN_API_OPTIONS],
    };
  }

  /**
   * Setup OpenAPI UI (Swagger UI or Scalar) for the given NestJS application
   * This should be called in your main.ts after app initialization
   *
   * @example
   * ```typescript
   * const app = await NestFactory.create(AppModule);
   * OpenApiModule.setup(app, {
   *   title: 'My API',
   *   description: 'API Documentation',
   *   version: '1.0',
   * });
   * await app.listen(3000);
   * ```
   *
   * @param app - NestJS application instance
   * @param options - OpenAPI module options
   * @throws {Error} If the application is not properly initialized
   */
  static setup(app: INestApplication, options: OpenApiModuleOptions): void {
    if (!app) {
      throw new Error('NestJS application instance is required');
    }

    const config = DocumentBuilderConfig.build(options);
    const document = NestSwaggerModule.createDocument(app, config.build());

    const uiProvider = options.ui || 'swagger-ui';

    if (uiProvider === 'scalar') {
      ScalarSetup.setup(app, document, options as OpenApiModuleOptionsWithScalar);
    } else {
      OpenApiUISetup.setup(app, document, options as OpenApiModuleOptionsWithSwaggerUI);
    }
  }
}
