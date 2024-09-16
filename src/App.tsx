import * as React from "react"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import PokemonCard from "./components/pokemon-card.tsx"
import ButtonGroup from "./components/button-group.tsx"
// import useQuery, {QueryProvider} from "./useQuery.tsx";

import "./App.css"

const queryClient = new QueryClient();

function App() {
  const [id, setId] = React.useState(1)
  // const {data: pokemon, isLoading, error} = useQuery(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
  })

  return (
    <div className="container">
      <PokemonCard data={pokemon} isLoading={isLoading} error={error}/>
      <ButtonGroup handleSetId={setId}/>
    </div>
  )
}


export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  )
}

function FortuneCookie() {
  const { data } = useQuery({
    queryKey: ['luckyNumber'],
    queryFn: () => {
      return Promise.resolve(Math.random())
    }
  })

  if (data && data > 0.5) {
    return <div>Today's your lucky day</div>
  }

  return <div>Better stay home today</div>
}

function LuckyNumber() {
  const { data } = useQuery({
    queryKey: ['luckyNumber'],
    queryFn: () => {
      return Promise.resolve(Math.random())
    }
  })

  return (
    <div>Lucky Number is: {data}</div>
  )
}


// 1. Cache management
// 2. Cache invalidation
// 3. Auto refetching
// 4. Scroll recovery
// 5. Offline support
// 6. Window focus refetching
// 7. Dependent queries
// 8. Paginated queries
// 9. Request cancellation
// 10. Prefetching
// 11. Polling
// 12. Mutations
// 13. Infinite scrolling
// 14. Data selectors
// 15. + More