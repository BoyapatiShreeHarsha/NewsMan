import React from 'react'

const  NewsItem = (props)=> {

  // here we can't use let here
  
    // here we can use
    let { title, description, imageUrl, newsUrl, author, date,source } = props;

    const changedate = (date) => {
      let d = new Date(date);
      return d.toGMTString();
    }
    return (
      <div>
        <div className="card">
          <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
          </div>
          <img src={(imageUrl != null) ? imageUrl : "https://www.istockphoto.com/vector/abstract-globe-background-gm1311148884-400336178"} className="card-img-top" alt="Error" style={{ height: "200px", width: "100%" }} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p>By {author ? author : "Unkown"} on {changedate(date)}</p>
            <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
