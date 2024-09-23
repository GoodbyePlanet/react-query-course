import {useQuery} from "@tanstack/react-query";

const BASE_URL = "https://library-api.uidotdev.workers.dev";

export async function getData(bookId: string) {
  const url = `${BASE_URL}/books/${bookId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable fetch data");
  }

  const data = await response.json();
  return data;
}

export function useBook(bookId: string) {
  return useQuery({
    queryKey: ["book", { bookId }],
    queryFn: () => getData(bookId),
    staleTime: 5000
  });
}