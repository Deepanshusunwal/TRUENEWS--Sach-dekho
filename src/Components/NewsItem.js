import React, { Component } from "react";


export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left: '90%' , zIndex: '1'}}> {source} 
            </span>{/* we have written this sapn to make a badge above the news , which will provide the source of the news */}
          <img src={!imageUrl?"https://images.livemint.com/img/2021/10/07/600x338/8f183316-2745-11ec-8390-9108a6051a41_1633605620225_1633605695969.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...  </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
