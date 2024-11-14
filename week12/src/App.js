import logo from './logo.svg';
import './App.css';
import Component11 from './components/Component1';
import Component2 from './components/Component2';
import Router from './components/Router';

function App() {
    const stuInfo = {name : "김기영", studentId : "22000053"};
    return (
        // <>
        //   <Component11 name="김기영" />
        // </>


        // <>
        //     <Component11 name = {stuInfo.name} studentId = {stuInfo.studentId} />
        // </>,
        //
        // <>
        //     <Component2 />
        // </>,

        <>
            <Router/>
        </>
    );
}

export default App;