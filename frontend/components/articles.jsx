import React from 'react';
import axios from 'axios';

class Articles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            error: '',
            searchArticleUrl: '',
        };
        this.submitArticleHandler = (e) => this._submitArticleHandler(e);
        this.onChangeArticleUrl = (e) => this._onChangeArticleUrl(e);
    }

    _submitArticleHandler(e){
        location = location + 'fb?articleURL=' + this.state.searchArticleUrl;
    }

    _onChangeArticleUrl(e){
        this.setState({
            searchArticleUrl: e.target.value
        })
    }

    componentWillMount() {
      let requestURL = location.origin + '/api/articles';
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
                <div className="input-group search-bar">
                  <input type="text" className="form-control" onChange={this.onChangeArticleUrl} placeholder="Article URL" aria-label="Article URL"/>
                  <span className="input-group-btn">
                    <button className="btn search-button" onClick={this.submitArticleHandler} type="button">Go!</button>
                  </span>
                </div>
            </div>
    );
  }
}

export default Articles;
