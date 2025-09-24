export interface MarketingAnalyticsConfig {
  segmentWriteKey?: string;
  googleAnalyticsMeasurementId?: string;
  hubspotPortalId?: string;
  hubspotFormId?: string;
  enableHubspotForms?: boolean;
}

type EnvGetter = (key: string) => string | undefined;

function defaultEnvGetter(key: string): string | undefined {
  try {
    if (typeof Deno !== 'undefined' && typeof Deno.env?.get === 'function') {
      return Deno.env.get(key);
    }
  } catch (_error) {
    // Accessing env can throw when permissions are not granted during build/tests.
  }

  return undefined;
}

export function resolveMarketingAnalyticsConfig(
  getEnv: EnvGetter = defaultEnvGetter,
): MarketingAnalyticsConfig {
  const enableHubspotForms = getEnv('ENABLE_HUBSPOT_FORMS');

  return {
    segmentWriteKey: getEnv('SEGMENT_WRITE_KEY'),
    googleAnalyticsMeasurementId: getEnv('GA_MEASUREMENT_ID') ?? getEnv('NEXT_PUBLIC_GA_ID'),
    hubspotPortalId: getEnv('HUBSPOT_PORTAL_ID'),
    hubspotFormId: getEnv('HUBSPOT_FORM_ID'),
    enableHubspotForms: enableHubspotForms?.toLowerCase() === 'true',
  };
}
