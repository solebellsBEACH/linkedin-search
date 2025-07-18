import { fieldLabels, formatInfos } from "./constants";

const _url = "https://www.linkedin.com/jobs/search/?currentJobId=4265458806&distance=25&f_AL=true&f_E=4&geoId=106057199&keywords=angular&origin=JOBS_HOME_KEYWORD_HISTORY&refresh=true"

function _formatValues(params: Record<string, string>): Record<string, string> {
  const formatted: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    const label = fieldLabels[key] ?? key;
    const readableValue = formatInfos[key]?.[value] ?? value;
    formatted[label] = readableValue;
  }

  return formatted;
}

function _getLinkedInQueryParams(url: string): {
  raw: Record<string, string>;
  formatted: Record<string, string>;
} {
  const parsedUrl = new URL(url);
  const raw: Record<string, string> = {};

  parsedUrl.searchParams.forEach((value, key) => {
    raw[key] = value;
  });

  return {
    raw,
    formatted: _formatValues(raw)
  };
}


export async function isOnLinkedInJobsTab(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || "";
      resolve(url.includes("linkedin.com/jobs/search"));
    });
  });
}

export async function getQueryParams(): Promise<ReturnType<typeof _getLinkedInQueryParams>> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || "";
      const result = _getLinkedInQueryParams(url);
      resolve(result);
    });
  });
}

export const personalQuery = {
    isOnLinkedInJobsTab,
    getQueryParams
}