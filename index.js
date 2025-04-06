// service-shared-core/index.js
import 'module-alias/register';
import { autoExportFrom } from './lib/autoExport.js';

export const models = await autoExportFrom('models');
export const graphql = await autoExportFrom('graphql');
export const utils = await autoExportFrom('utils');
export const constants = await autoExportFrom('constants');

export * from './graphql/index.js';
