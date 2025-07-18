import { fieldLabels, formatInfos } from "./constants";

const isDev = false;

const devUrl =
  "https://www.linkedin.com/jobs/search/?currentJobId=4264222246&distance=25&f_AL=true&f_E=4&geoId=106057199&keywords=angular&origin=JOBS_HOME_KEYWORD_HISTORY&refresh=true&start=25";

function formatValues(params: Record<string, string>): Record<string, string> {
  const formatted: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    const label = fieldLabels[key] ?? key;
    formatted[label] = formatInfos[key]?.[value] ?? value;
  }
  return formatted;
}

function parseLinkedInQueryParams(url: string): {
  raw: Record<string, string>;
  formatted: Record<string, string>;
} {
  const raw: Record<string, string> = {};
  new URL(url).searchParams.forEach((value, key) => {
    raw[key] = value;
  });
  return {
    raw,
    formatted: formatValues(raw),
  };
}

async function isOnLinkedInJobsTab(): Promise<boolean> {
  if (isDev) return devUrl.includes("linkedin.com/jobs/search");

  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || "";
      resolve(url.includes("linkedin.com/jobs/search"));
    });
  });
}

async function getQueryParams(): Promise<ReturnType<typeof parseLinkedInQueryParams>> {
  const url = isDev
    ? devUrl
    : await new Promise<string>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          resolve(tabs[0]?.url || "");
        });
      });

  return parseLinkedInQueryParams(url);
}

export const personalQuery = {
  isOnLinkedInJobsTab,
  getQueryParams,
};
