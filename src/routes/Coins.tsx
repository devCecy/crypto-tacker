import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

import { BsFillSunFill, BsMoon } from 'react-icons/bs';

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface CoinsProps {
  isDarkMode: boolean;
  toggleDarkMode: any;
}
export default function Coins({ isDarkMode, toggleDarkMode }: CoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coin tracker</title>
      </Helmet>
      <Header>
        <Title>All Coins</Title>
        <ThemeButton onClick={toggleDarkMode}>
          {isDarkMode ? <BsFillSunFill /> : <BsMoon />}
        </ThemeButton>
      </Header>

      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}/chart`,
                  state: { name: coin.name },
                }}
              >
                <Image
                  alt="symbol"
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}&rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CoinList = styled.ul``;
const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;

  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 20px;
    width: 100%;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.span`
  text-align: center;
  display: block;
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const ThemeButton = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  border: none;
  cursor: pointer;
  margin-left: 60px;
  margin-right: 5px;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    margin-left: 5px;
  }
`;
