import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
  background-color: white;
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

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
};

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins")
      const json = await response.json();
      setCoins(json.slice(0, 100))
      setLoading(false)
    })();
    }, []);

    return (
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>
        { loading ? 
          <Loader>Loading...</Loader> : 
          <CoinsList>
          {coins.map(coin => (
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