import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import ProductList from './ProductList';

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <div style={{ padding: '20px' }}>
        <h1>State Management Demo</h1>
        <p>Context API for Auth + Redux Toolkit for Products</p>
        <Login />
        <ProductList />
      </div>
    </AuthProvider>
  </Provider>
);

export default App;