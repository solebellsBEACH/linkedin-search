import { DeveloperFormValues } from "../types/developer"
import { redirectUrl } from "./chrome"

export const seniorityMap: Record<string, DeveloperFormValues["seniority"]> = {
  "Internship": "Estágio",
  "Entry level": "Junior",
  "Associate": "Pleno",
  "Mid-Senior level (Sênior)": "Senior",
};

function getJobsUrl(data:DeveloperFormValues){
    return `https://www.linkedin.com/jobs/search/?geoId=92000000&keywords=${buildQuery(data)}&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true&start=${data.skip}`
}

function getPostUrl(data:DeveloperFormValues){
  return `https://www.linkedin.com/search/results/CONTENT/?keywords=${buildQuery(data)}&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true&start=${data.skip}`
}

export const buildQuery = (data: DeveloperFormValues) => {
    const query = [data.tech]
    return query.toString().replace(/,/g, "-")
}

export const onSubmit = (data: DeveloperFormValues) => {
  const cleanedTech = data.exclude
    ? data.tech
        .split(' ')
        .filter(term => !data.exclude.toLowerCase().split(',').includes(term.toLowerCase()))
        .join(' ')
    : data.tech;

  const payload = { ...data, tech: cleanedTech };

  const url =
    payload.tab === 'jobs'
      ? getJobsUrl(payload)
      : getPostUrl(payload);

  redirectUrl(url || 'https://www.linkedin.com/jobs/search/');
};