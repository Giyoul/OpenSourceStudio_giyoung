import logo from './logo.svg';
import './App.css';
import Component1 from './Component1';
import Hello from "./component/hello";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello />
        <p>
          20241028 react oss class
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Component1></Component1>
      </header>
    </div>
  );
}

export default App;
