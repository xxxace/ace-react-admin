import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import "@arco-design/web-react/dist/css/arco.css";
import './api/interceptor';
import { Provider } from 'react-redux';
import store from './store';

class ErrorBoundary extends React.Component<{ children: JSX.Element }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 错误上报

  }

  render() {
    // if (this.state.hasError) {
    //   // 自定义降级后的 UI 并渲染
    //   return <h1>Something went wrong.</h1>;
    // }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
)
