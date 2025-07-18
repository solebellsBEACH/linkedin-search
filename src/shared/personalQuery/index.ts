
const _url = "https://www.linkedin.com/jobs/search/?currentJobId=4265458806&distance=25&f_AL=true&f_E=4&geoId=106057199&keywords=angular&origin=JOBS_HOME_KEYWORD_HISTORY&refresh=true"

export async function isOnLinkedInJobsTab(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || "";
      resolve(url.includes("linkedin.com/jobs/search"));
    });
  });
}



export const personalQuery = {
    isOnLinkedInJobsTab
}