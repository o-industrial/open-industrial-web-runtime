import type { MarketingAnalyticsConfig } from './config.ts';

export interface MarketingRuntimeConfig {
  analytics: MarketingAnalyticsConfig;
}

const RUNTIME_GLOBAL_KEY = '__OI_MARKETING_RUNTIME__';

type RuntimeGlobal = typeof globalThis & {
  [RUNTIME_GLOBAL_KEY]?: MarketingRuntimeConfig;
};

function getRuntimeGlobal(): RuntimeGlobal | undefined {
  if (typeof globalThis === 'undefined') {
    return undefined;
  }

  return globalThis as RuntimeGlobal;
}

export function getMarketingRuntimeConfig(): MarketingRuntimeConfig | undefined {
  return getRuntimeGlobal()?.[RUNTIME_GLOBAL_KEY];
}

export function setMarketingRuntimeConfig(config: MarketingRuntimeConfig | undefined): void {
  const runtime = getRuntimeGlobal();
  if (!runtime) {
    return;
  }

  runtime[RUNTIME_GLOBAL_KEY] = config;
}

export function getMarketingAnalyticsConfig(): MarketingAnalyticsConfig {
  return getMarketingRuntimeConfig()?.analytics ?? {};
}

export function isHubspotFormsEnabled(
  config: MarketingAnalyticsConfig = getMarketingAnalyticsConfig(),
): boolean {
  if (!config.enableHubspotForms) {
    return false;
  }

  return Boolean(config.hubspotPortalId && config.hubspotFormId);
}

export function getHubspotFormConfig(
  config: MarketingAnalyticsConfig = getMarketingAnalyticsConfig(),
): { portalId?: string; formId?: string } {
  if (!isHubspotFormsEnabled(config)) {
    return {};
  }

  return {
    portalId: config.hubspotPortalId,
    formId: config.hubspotFormId,
  };
}
