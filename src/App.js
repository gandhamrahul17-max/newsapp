import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = ()=> {
  const pageSize=9;
  const [progress, setProgress] = useState(0)
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
 
    return (
      <div className={darkMode ? "bg-dark text-white min-vh-100" : "min-vh-100"}>
        <Router>
        <Navbar 
          search={search} 
          setSearch={setSearch}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          />
        <LoadingBar
              height={3}
              color='#f11946'
              progress={progress}
            />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress}  key="general" pageSize={pageSize} country="us" category="general" searchQuery={searchQuery} darkMode={darkMode}/></Route>
          <Route exact path="/business"><News setProgress={setProgress}  key="business" pageSize={pageSize} country="us" category="business" darkMode={darkMode}/ ></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress}  key="entertainment" pageSize={pageSize} country="us" category="entertainment" darkMode={darkMode}/></Route>
          <Route exact path="/general"><News setProgress={setProgress}  key="general" pageSize={pageSize} country="us" category="general" darkMode={darkMode}/></Route>
          <Route exact path="/health"><News setProgress={setProgress}  key="health" pageSize={pageSize} country="us" category="health" darkMode={darkMode}/></Route>
          <Route exact path="/science"><News setProgress={setProgress}  key="science" pageSize={pageSize} country="us" category="science" darkMode={darkMode}/></Route>
          <Route exact path="/sports"><News setProgress={setProgress}  key="sports" pageSize={pageSize} country="us" category="sports" darkMode={darkMode}/></Route>
          <Route exact path="/technology"><News setProgress={setProgress}  key="technology" pageSize={pageSize} country="us" category="technology" darkMode={darkMode}/></Route>
        </Switch>
        </Router>
      </div>
    )
  }

  export default App;


