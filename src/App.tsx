import * as React from "react"
import PokemonCard from "./components/pokemon-card.tsx"
import ButtonGroup from "./components/button-group.tsx"

import "./App.css"

export default function App () {
  const [id, setId] = React.useState(1)
  const [pokemon, setPokemon] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const handleFetchPokemon = async () => {
      setPokemon(null)
      setIsLoading(true)
      setError(null)

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if (!res.ok) {
          throw new Error(`Error fetching pokemon #${id}`)
        }

        const json = await res.json()

        setPokemon(json)
        setIsLoading(false)
      } catch(e: any) {
        setError(e.message)
        setIsLoading(false)
      }
    }

    handleFetchPokemon()
  }, [id])

  return (
    <div className="container">
      <PokemonCard data={pokemon} isLoading={isLoading} error={error} />
      <ButtonGroup handleSetId={setId} />
    </div>
  )
}
