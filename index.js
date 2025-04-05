// service-shared-core/index.js
import { autoExportFrom } from './lib/autoExport.js';

export const models = await autoExportFrom('models');
export const utils = await autoExportFrom('utils');
export const constants = await autoExportFrom('constants');

export * from './graphql/index.js';
