import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react"; // 방법1
import { useQuery } from "react-query"; // 방법2
import { fetchCoins } from "../api"; // 방법2
import { Helmet } from 'react-helmet'


const Container= styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${props => props.theme.accentColor};
`;
const Loader = styled.div`
  text-align: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  &:hover a {
    color: ${(props) => props.theme.accentColor};
  }
  
  a {
    padding: 20px;
    color: ${(props) => props.theme.textColor};
    transition: color 0.2s ease-in;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;
const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoinsProps {
  toggleDark: () => void;
}

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
};

function Coins({ toggleDark }: ICoinsProps) {
  // 방법2. react-query: useQuery
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins, {
    select: (data) => data.slice(0, 100)
  })

  // 방법1. react-hook: useState, useEffect
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins")
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100))
  //     setLoading(false)
  //   })();
  //   }, []);

    return (
      <Container>
        <Helmet>
          <title>Coins</title>
        </Helmet>
        <Header>
          <Title>Coins</Title>
          <button onClick={toggleDark}>Toggle Mode</button>
        </Header>
        { isLoading ? 
          <Loader>Loading...</Loader> : 
          <CoinsList>
          {data?.map(coin => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name }
              }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>     
            </Coin>
          ))}
          </CoinsList>
        }
      </Container>
    );
}

export default Coins;