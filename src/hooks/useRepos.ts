import {useQuery} from "@tanstack/react-query";

const GITHUB_API_URL = 'https://api.github.com/orgs/TanStack/repos';

export function useRepos(sort: string) {
  return useQuery({
    queryKey: ['repos', {sort}],
    queryFn: async () => {
      const response = await fetch(`${GITHUB_API_URL}?sort${sort}`);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return response.json();
    },
  })
}