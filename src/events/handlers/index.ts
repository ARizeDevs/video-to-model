import { DemandCreatedEventHandler } from './demand/demand-created.event';
import { LumaApiKeyCreatedEventHandler } from './luma/api/api-created.event';
import { CaptureCreatingEventHandler } from './luma/capture/capture-creating.event';

export default [
  //app
  DemandCreatedEventHandler,

  // luma
  CaptureCreatingEventHandler,
  LumaApiKeyCreatedEventHandler,
];
