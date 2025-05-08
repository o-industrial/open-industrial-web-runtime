import "preact/compat";
import { start } from '@fathym/eac/runtime/server';
import { config, configure } from './configs/eac-runtime.config.ts';

console.log("_________________________________+++++++++++++++++++++++++++++++++++++++++++++________________________________________")
await start(await config, { configure });
