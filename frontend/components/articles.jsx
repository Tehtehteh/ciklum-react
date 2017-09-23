import React from 'react';
import axios from 'axios';

class Articles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            error: ''
        };
    }
  componentWillMount() {
      let requestURL = location.origin + '/api/articles';
      console.log(requestURL);
      axios.get(requestURL)
          .then(res => {
              let articles = [];
              for (let i = 0; i < res.data.articles.length; i++){
                  articles.push({
                      fbUrl: location.origin + '/fb?articleURL=' + res.data.articles[i].url,
                      originUrl: res.data.articles[i].url
                  })
              }
              this.setState(
                  {
                      articles: articles,
                      error: null
                  }
              );
          })
          .catch(function(err){
                this.setState(
                    {
                        articles: [],
                        error: err
                    }
                );
          });
  }

  render() {
    const error = this.state.error || null;
    return (
        error?<div className="container info-container">
              <div className="row justify-content-md-center">
                  <div className="card container-fluid">
                    <div className="card-body">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>
                  </div>
              </div>
          </div> :
            <div className="list-group">
                {this.state.articles.map((item, index) =>
                    <a key={index} className="list-group-item list-group-item-action" href={item.fbUrl}>{item.originUrl}</a>)}
            </div>
    );
  }
}

export default Articles;
