export default function Info({ name, data, randomAmiibo, searched }) {
  return (
    <div className="amiiboList">
      {randomAmiibo ? (
        <div className="amiiboInfo">
          <p>
            <strong>Your Random Amiibo:</strong>
          </p>
          <img src={randomAmiibo.image} alt={randomAmiibo.name} />
          <p>
            <strong>{randomAmiibo.name}</strong>
          </p>
          <p>
            <strong>Character:</strong> {randomAmiibo.character}
          </p>
          <p>
            <strong>Game Series:</strong> {randomAmiibo.gameSeries}
          </p>
        </div>
      ) : data.length > 0 ? (
        data.map((amiibo) => (
          <div className="amiiboInfo">
            <img src={amiibo.image} alt={amiibo.name} />
            <p>
              <strong>{amiibo.name}</strong>
            </p>
            <p>
              <strong>Character:</strong> {amiibo.character}
            </p>
            <p>
              <strong>Game Series:</strong> {amiibo.gameSeries}
            </p>
            <p>
              <strong>US Release Date:</strong> {amiibo.release.na}
            </p>
          </div>
        ))
      ) : (
        <>
          {searched ? (
            <p>No Amiibos found, try searching another name or series</p>
          ) : (
            <p>Try searching for an Amiibo, or try your luck!</p>
          )}
        </>
      )}
    </div>
  );
}
