import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import configureStoreUserCredential from './hooks-store/stores/user-credential-store';
import configureStoreFilters from './hooks-store/stores/filters-store';
import configureStoreMovies from './hooks-store/stores/movies-store';

import LandingPage from './components/LandingPage/LandingPage';
import MovieSwap from './containers/MovieSwap/MovieSwap';
import LoginPage from './components/Login/Login';
import ErrorPage from './components/ErrorPage/ErrorPage';

import { useStore } from './hooks-store/store';

configureStoreUserCredential();
configureStoreFilters();
configureStoreMovies();

function App() {
  const state = useStore()[0];

  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>
        <Route path="/welcome" component={LandingPage}>
          {state.userLoggedIn && <Redirect to="/movie-swap" />}
        </Route>
        {state.userLoggedIn && <Route path="/movie-swap" component={MovieSwap} />}
        <Route to="/login" component={LoginPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
