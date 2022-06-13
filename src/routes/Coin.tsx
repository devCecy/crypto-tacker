import {
  useParams,
  useLocation,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Price from './Price';
import Chart from './Chart';
import { fetchCoinInfo, fetchCoinPrice } from '../api';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id?: string;
  name: string;
  symbol?: string;
  rank?: number;
  is_new?: boolean;
  is_active?: boolean;
  type?: string;
  description?: string;
  message?: string;
  open_source?: boolean;
  started_at?: Date;
  development_status?: string;
  hardware_wallet?: boolean;
  proof_type?: string;
  org_structure?: string;
  hash_algorithm?: string;
  first_data_at?: Date;
  last_data_at?: Date;
  founded?: number;
  members?: string[];
}
interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}
interface Quotes {
  USD: Usd;
}
interface PriceData {
  id?: string;
  name: string;
  symbol?: string;
  rank?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  beta_value?: number;
  first_data_at?: Date;
  last_updated?: Date;
  quotes?: Quotes;
  founded?: number;
  members?: string[];
}


export default function Coin() {
  const { coinId } = useParams<RouteParams>(); // === <{coinId:string}
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ['price', coinId],
    () => fetchCoinPrice(coinId),
    { refetchInterval: 10000 }
  );
  const loading = infoLoading || priceLoading;


  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to="/">
          <PrevButton>
            <AiOutlineArrowLeft />
          </PrevButton>
        </Link>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
      </Header>

      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{priceData?.quotes?.USD?.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/price`,
                  state: { priceData: priceData?.quotes?.USD },
                }}
              >
                Price
              </Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId}  />
            </Route>
          </Switch>
        </>
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
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgAccentColor};
  padding: 10px 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.bgAccentColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const PrevButton = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgAccentColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  border: none;
  cursor: pointer;
  margin-right: 85px;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
