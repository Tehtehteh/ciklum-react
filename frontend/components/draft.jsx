import React from 'react';
import axios from 'axios';

class Draft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dismissed: false
        };
        this.deleteHandler = (e) => this._deleteHandler(e);
        this.approveHandler = (e) => this._approveHandler(e);
    }

    _deleteHandler(e) {
        axios.post(location.origin + '/api/delete',
            {
                id: this.props.draftId
            }
        ).then((_) => {
            this.props.onAction(this.props.draftId);
        });
        e.preventDefault()
    }

    _approveHandler(e){
        axios.post(location.origin + '/api/approve',
            {
                id: this.props.draftId,
                url: this.props.url,
                key: this.props.index,
                text: this.props.usersText
            }
        ).then((_) => {
            console.log('Approved. Unmounting draft');
        });
        this.props.onAction(this.props.draftId);
        e.preventDefault()
    }

    render() {
        return (
          <div className="container article-paragraph">
              <div className="row justify-content-md-center">
                  <div className="card container-fluid">
                    <div className="card-body">
                      <div className="form-group">
                        <label className="paragraph-label" htmlFor={this.props.index}>Original Text</label>
                          <p>{this.props.originText}</p>
                        <label className="paragraph-label" htmlFor={this.props.index}>Users Text</label>
                          <p>{this.props.usersText}</p>
                        <button type="button" className="btn btn-primary btn-sm m-3 accept-button" onClick={this.approveHandler}>Approve</button>
                        <button type="button" className="btn btn-danger btn-sm m-3 accept-button" onClick={this.deleteHandler}>Delete</button>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        );
    }
}

export {Draft};