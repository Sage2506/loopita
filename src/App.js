import './App.css';
import { Provider } from "react-redux";
import configureStore from './store';
import { BrowserRouter } from "react-router-dom";
import Layout from './components/layout';
import Router from './router';
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Layout>
    </Provider>
  );
}

export default App;
