import { Content, Header } from './components';

import { MainPage } from './pages';

import './App.scss';

const App = () => {
  return (
    <>
      <Header />
      <Content>
        <MainPage />
      </Content>
    </>
  );
}

export { App };