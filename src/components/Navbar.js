import React from 'react'  
import { Link } from 'react-router-dom'

const Navbar =(props)=> {

   const handleSearch = (e) => {
    e.preventDefault();
    props.setSearchQuery(props.search);
  }

    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NewsLion</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>

            <form className="d-flex" onSubmit={handleSearch}>
              <input
                 className="form-control me-2" 
                 type="search" 
                 placeholder="Search"
                 name="search"
                 value={props.search} 
                 onChange={(e) => props.setSearch(e.target.value)}
              />
              <button className="btn btn-success" type="submit">Search</button>
            </form>

            <button  className={props.darkMode ? "btn btn-dark ms-2" : "btn btn-light ms-2"}onClick={props.toggleDarkMode} >
                {props.darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            </div>
        </div>
        </nav>
      </div>
    )
  }

export default Navbar
