import { BgioLobbyApiProvider } from 'bgio-contexts';
import { Debug } from 'boardgame.io/debug';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { AuthProvider, useAuth } from 'hooks/useAuth';
import { MultiplayerLobby, MultiplayerLobbyProvider } from 'lobby';
import {
  BrowserRouter,
  Link,
  Route,
  Switch
  } from 'react-router-dom';
import { Board } from './Board';
import { localTestingNumPlayers } from './constants';
import { unoGame } from './game/game';
import { MultiplayerNav } from './Nav';

// ! Three Options:
// * A local game (for game development) `npm run start`
// * Client that connects to a local server `npm run devstart`
// * Client that connects to its origin server `npm run build`

const isDeploymentEnv = process.env.NODE_ENV === "production";
const isDevEnv = process.env.NODE_ENV === "development";
const isSeparateServer = Boolean(process.env.REACT_APP_WITH_SEPARATE_SERVER);
const isLocalApp = isDevEnv && !isSeparateServer;

// use appropriate address for server
const hostname = window?.location?.hostname ?? "";
const protocol = window?.location?.protocol ?? "";
const port = window?.location?.port ?? "";
const deploymentServerAddr = `https://apps.paulussujono.com/uno`;
const localServerAddr = `http://localhost:8000`;
const SERVER = isDeploymentEnv ? deploymentServerAddr : localServerAddr;

// Enable Redux DevTools in development
const reduxDevTools =
  window &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const bgioClientOptions = {
  game: unoGame,
  board: Board,
  numPlayers: localTestingNumPlayers, // for when testing locally
};

const DemoGameClient = Client({
  ...bgioClientOptions,
  multiplayer: Local(),
  enhancer: reduxDevTools,
  debug: { impl: Debug },
});

const MultiplayerGameClient = Client({
  ...bgioClientOptions,
  multiplayer: SocketIO({ server: SERVER }),
  debug: false,
});

export const App = () => {
  if (isLocalApp) {
    return <LocalApp />;
  } else {
    return (
      <AuthProvider>
        <BgioLobbyApiProvider serverAddress={SERVER}>
          <MultiplayerLobbyProvider>
            <BrowserRouter basename={"/uno"}>
              <Switch>
                <Route exact path={`${process.env.PUBLIC_URL}/`}>
                  <MultiplayerNav />
                  <MultiplayerLobby />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/play`}>
                  <MultiplayerNav />
                  <PlayPage />
                </Route>
              </Switch>
            </BrowserRouter>
          </MultiplayerLobbyProvider>
        </BgioLobbyApiProvider>
      </AuthProvider>
    );
  }
};

const LocalApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`}>
          <DemoGameClient matchID="matchID" playerID="0" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const PlayPage = () => {
  const { storedCredentials } = useAuth();
  const { playerID, matchID, playerCredentials } = storedCredentials;
  if (!playerID || !matchID || !playerCredentials) {
    return (
      <p>
        You are not currently joined in a match.{" "}
        <Link to={`${process.env.PUBLIC_URL}/`}>Return to Lobby?</Link>
      </p>
    );
  }
  return (
    <MultiplayerGameClient
      matchID={matchID}
      playerID={playerID}
      credentials={playerCredentials}
    />
  );
};
