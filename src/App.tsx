import * as React from "react"
import PokemonCard from "./components/pokemon-card.tsx"
import ButtonGroup from "./components/button-group.tsx"
import useQuery, {QueryProvider} from "./useQuery.tsx";

import "./App.css"

function App() {
  const [id, setId] = React.useState(1)
  const {data: pokemon, isLoading, error} = useQuery(`https://pokeapi.co/api/v2/pokemon/${id}`)

  return (
    <div className="container">
      <PokemonCard data={pokemon} isLoading={isLoading} error={error}/>
      <ButtonGroup handleSetId={setId}/>
    </div>
  )
}


export default function Root() {
  return (
    <QueryProvider>
      <App/>
    </QueryProvider>
  )
}