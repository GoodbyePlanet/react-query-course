import {skipToken, useQuery} from '@tanstack/react-query'

declare function fetchIssue(id: number): Promise<void>

// When React Query sees the skipToken, it will internally set enabled: false.
// However, TypeScript will now correctly narrow the type of id to number in the
// queryFn because of the conditional check.
export function useIssue(id: number | undefined) {
  return useQuery({
    queryKey: ['issues', id],
    queryFn: id === undefined
      ? skipToken
      : () => fetchIssue(id)
  })
}

export async function fetchIssues(search: string) {
  const searchParams = new URLSearchParams()
  searchParams.append('q', `${search} is:issue repo:TanStack/query`)
  const url = `https://api.github.com/search/issues?${searchParams}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('fetch failed')
  }

  return response.json()
}

function useIssues(search: string) {
  return useQuery({
    queryKey: ['issues', search],
    queryFn: () =>  fetchIssues(search),
    // In our case, enabled allows us to tell React Query that we only want to run the queryFn
    // when we have a search term
    enabled: search !== ''
  })
}