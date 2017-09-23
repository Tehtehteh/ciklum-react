import React from 'react';
import axios from 'axios';
import {Draft} from './draft';

class Drafts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            drafts: [],
            error: ''
        };
        this.handleDraftUnMount = (draftId) => this._handleDraftUnMount(draftId);
    }
  componentWillMount() {
      let requestURL = location.origin + '/api/drafts';
      axios.get(requestURL)
              .then(res => {
                  const error = res.data.error;
                  const drafts = res.data.drafts;
                  this.setState(_ => ({
                      drafts: drafts,
                      error: error ? error : null
                  }));
              }).catch(function(err){
                  this.setState(_ => ({
                      drafts: null,
                      error: err
              }));
          });
      }

    _handleDraftUnMount(draftId){
        let updatedDrafts = this.state.drafts.filter(function(draft){
            return draft.id != draftId;
        });
        this.setState(_ => ({
            drafts: updatedDrafts,
            error: null
        }))
    }

    render(){
        const error = this.state.error || null;
        const hasDrafts = this.state.drafts.length;
        return (
            error?<div className="alert alert-danger" role="alert">{error}</div> :
            hasDrafts?
            <div className="list">
                <div className="page-header">
                    <a href={this.state.url}><h1>{this.state.headline}</h1></a>
                </div>
                {this.state.drafts.map((item, index) => <Draft key={index} index={item.index} url={item.url} onAction={this.handleDraftUnMount} draftId={item.id} originText={item.originalText} usersText={item.usersText}/>)}
            </div>:
            <div className="container info-container">
              <div className="row justify-content-md-center">
                  <div className="card container-fluid">
                    <div className="card-body">
                        <div className="alert alert-info" role="alert">
                            No drafts to approve/delete!
                        </div>
                    </div>
                  </div>
              </div>
          </div>
    );
  }
}

export default Drafts;
