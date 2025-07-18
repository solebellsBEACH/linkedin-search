import { DeveloperFormValues } from "../types/developer"
import { redirectUrl } from "./chrome"

export const seniorityMap: Record<string, DeveloperFormValues["seniority"]> = {
  "Internship": "Estágio",
  "Entry level": "Junior",
  "Associate": "Pleno",
  "Mid-Senior level": "Senior",
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
    const url =
      data.tab === "jobs"
        ? getJobsUrl(data)
        : getPostUrl(data)
    redirectUrl( url || 'https://www.linkedin.com/jobs/search/' )
}