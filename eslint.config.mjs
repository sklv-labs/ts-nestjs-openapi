import nestjsEslint from '@sklv-labs/ts-dev-configs/eslint/nestjs';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    ...nestjsEslint,
    {
        files: ['src/openapi/open-api.module.ts'],
        rules: {
            '@darraghor/nestjs-typed/provided-injected-should-match-factory-parameters': 'off',
        },
    },
]);
