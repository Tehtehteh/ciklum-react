import React from 'react';
import axios from 'axios';
import {createAPIUrl} from '../utils.js';
import {Paragraph} from './paragraph';

class Article extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            headline: '',
            paragraphs: [],
            error: '',
            url: ''
        };
    }
  componentWillMount() {
      if (location.search.split('?articleURL=')[1] === "") {
          this.setState(
              {
                  headline: null,
                  paragraphs: null,
                  error: "Empty article query. Please enter valid URL."
              }
          );
      } else {
          let requestURL = createAPIUrl(location);
          console.log(requestURL);
          axios.get(requestURL)
              .then(res => {
                  this.setState(
                      {
                          headline: res.data.headline,
                          paragraphs: res.data.paragraphs,
                          error: null,
                          url: location.search.split('=')[1]
                      }
                  );
              }).catch(function(err){
                    this.setState(
                        {
                            headline: null,
                            paragraphs: null,
                            error: err,
                            url: location.search.split('=')[1]
                        }
                    );
                });
      }
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
        <div className="list">
            <div className="page-header">
                <a href={this.state.url}><h1>{this.state.headline}</h1></a>
            </div>
            {this.state.paragraphs.map((item, index) => <Paragraph key={index} index={index} url={this.state.url} originalText={item}/>)}
        </div>
    );
  }
}

export default Article;
