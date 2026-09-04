import React from 'react'

const NewsItem =(props)=> {
   let {title, description, imageUrl, newsUrl, author, date, source, category} = props;

   const badgeColour = {
    business: "warning",
    entertainment: "success",
    general: "primary",
    health: "danger",
    science: "info",
    sports: "secondary",
    technology: "dark",
   };

    return (
      <div className='my-3'>
        <div className="card" >

          <div style={
              {display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              right:0}
          }>

          <span className={`badge rounded-pill bg-${badgeColour[category] || "secondary"}`}>{source}</span> 

          </div>

          <img src={imageUrl || "https://picsum.photos/300/200"} className="card-img-top" alt="news"
           onError={(e) => {
             e.target.src = "https://picsum.photos/300/200";
               }} />
          <div className={`card ${props.darkMode ? "bg-dark text-white" : ""}`}>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
             <p className="card-text"><small className={`fw-bold fst-italic ${props.darkMode ? "text-white-50" : "text-body-secondary"}`}> By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className={`btn btn-sm mt-2 ${props.darkMode ? "btn-outline-light" : "btn-dark"}`}>Read More</a>
          </div>
        </div> 
      </div>
    )
  }

export default NewsItem
