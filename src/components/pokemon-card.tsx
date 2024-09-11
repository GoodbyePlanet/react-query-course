export default function PokemonCard({data, isLoading}: {data: any, isLoading: boolean}) {
  if (isLoading) {
    return <div className="card" />
  }

  return (
    <div className="card">
      <figure>
        <img
          width="475px"
          height="475px"
          src={data?.sprites?.front_default}
          alt={data.name}
        />
        <figcaption>
          <h4>{data.name}</h4>
          <h6>No. {data.id}</h6>
        </figcaption>
      </figure>
    </div>
  );
}
