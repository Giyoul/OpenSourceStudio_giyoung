import logo from './logo.svg';
import './App.css';
import Component11 from './components/Component1';
import Component2 from './components/Component2';
import Router from './components/Router';
import ReactHooks from './components/ReactHooks';
import ButtonComp from "./components/ButtonComp";
import UseState from "./components/UseState";
import UseState2 from "./components/UseState2";
import UseStateCompact from "./components/UseStateCompact";

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

        // <>
        //     <Router/>
        // </>
        <>
            {/*<ReactHooks/>*/}
            <ButtonComp title={"뭐"}/>
            {/*<UseState/>*/}
            {/*<UseState2/>*/}
            <UseStateCompact/>
        </>
    );
}

export default App;