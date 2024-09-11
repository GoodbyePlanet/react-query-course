import * as React from "react"
import PokemonCard from "./components/pokemon-card.tsx"
import ButtonGroup from "./components/button-group.tsx"

export default function App () {
  const [id, setId] = React.useState(1)
  const [pokemon, setPokemon] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const handleFetchPokemon = async () => {
      setPokemon(null)
      setIsLoading(true)

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const json = await res.json()
      setPokemon(json)
      setIsLoading(false)
    }

    handleFetchPokemon()
  }, [id])

  return (
    <>
      <PokemonCard data={pokemon} isLoading={isLoading} />
      <ButtonGroup handleSetId={setId} />
    </>
  )
}
