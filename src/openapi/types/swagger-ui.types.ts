export type OpenApiUITheme =
  | 'dracula'
  | 'gruvbox'
  | 'nord-dark'
  | 'one-dark'
  | 'sepia'
  | 'universal-dark'
  | 'monokai';

export interface OpenApiUIOptions {
  /**
   * Theme for the OpenAPI UI (Swagger UI)
   */
  theme?: OpenApiUITheme;

  /**
   * Additional Swagger UI setup options
   */
  swaggerOptions?: {
    explorer?: boolean;
    jsonDocumentUrl?: string;
    [key: string]: unknown;
  };
}
