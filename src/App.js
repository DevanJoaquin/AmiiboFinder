import { useState, useEffect } from "react";
import "./styles.css";
import Title from "./Title";
import Info from "./Info";
import Entry from "./Entry";
import RandomAmiiboButton from "./RandomButton";

export default function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [randomAmiibo, setRandomAmiibo] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setRandomAmiibo(null);

    if (name) {
      const searchTerm = encodeURIComponent(name.toLowerCase());
      const urlAmiibo = `https://www.amiiboapi.com/api/amiibo/?name=${searchTerm}&type=figure&type=yarn`;
      const urlSeries = `https://www.amiiboapi.com/api/amiibo/?gameseries=${searchTerm}&type=figure`;

      Promise.all([
        fetch(urlAmiibo).then((response) => response.json()),
        fetch(urlSeries).then((response) => response.json()),
      ]).then(([nameData, seriesData]) => {
        const combinedList = [
          ...(nameData.amiibo || []),
          ...(seriesData.amiibo || []),
        ];

        const uniqueList = Array.from(
          new Map(combinedList.map((amiibo) => [amiibo.tail, amiibo])).values()
        );

        setData(uniqueList);
        setSearched(true);
      });
    } else {
      setData([]);
      setSearched(false);
    }
  }, [name]);

  const fetchRandomAmiibo = () => {
    setData([]);
    setName("");
    const urlAmiibo = `https://www.amiiboapi.com/api/amiibo/?type=figure`;
    fetch(urlAmiibo)
      .then((response) => response.json())
      .then((response) => {
        const amiiboList = response.amiibo;
        const randomIndex = Math.floor(Math.random() * amiiboList.length);
        setRandomAmiibo(amiiboList[randomIndex]);
        setSearched(false);
      });
  };

  const inputChange = (value) => {
    setName(value);
    setRandomAmiibo(null);
  };

  return (
    <div className="App">
      <Title name="Nintendo Amiibo Finder" />
      <Entry value={name} onChange={inputChange} />
      <p>
        <strong>OR</strong>
      </p>
      <RandomAmiiboButton onClick={fetchRandomAmiibo} />
      <p></p>
      <Info
        value={name}
        data={data}
        randomAmiibo={randomAmiibo}
        searched={searched}
      />
    </div>
  );
}
