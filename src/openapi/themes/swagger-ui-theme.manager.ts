import {
  baseTheme,
  draculaTheme,
  gruvboxTheme,
  monokaiTheme,
  nordDarkTheme,
  oneDarkTheme,
  sepiaTheme,
  universalDarkTheme,
} from './swagger-ui';

import type { OpenApiUITheme } from '../types';

/**
 * Manages OpenAPI UI (Swagger UI) theme CSS
 */
export class OpenApiUIThemeManager {
  /**
   * Get the CSS for a given OpenAPI UI theme
   * @param theme - The theme name
   * @returns CSS string for the theme
   */
  static getThemeCss(theme: OpenApiUITheme): string {
    let css = baseTheme;

    switch (theme) {
      case 'dracula':
        css += `\n${draculaTheme}`;
        break;
      case 'gruvbox':
        css += `\n${gruvboxTheme}`;
        break;
      case 'nord-dark':
        css += `\n${nordDarkTheme}`;
        break;
      case 'one-dark':
        css += `\n${oneDarkTheme}`;
        break;
      case 'sepia':
        css += `\n${sepiaTheme}`;
        break;
      case 'universal-dark':
        css += `\n${universalDarkTheme}`;
        break;
      case 'monokai':
        css += `\n${monokaiTheme}`;
        break;
      default:
        break;
    }

    return css;
  }
}
