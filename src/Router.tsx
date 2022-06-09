import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface ThemeProps {
  isDarkMode: boolean;
  toggleDarkMode: any;
}
export default function Router({ isDarkMode, toggleDarkMode }: ThemeProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDarkMode={isDarkMode} />
        </Route>
        <Route path="/">
          <Coins isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
