import React from 'react';
import axios from 'axios';

class Paragraph extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            usersText: '',
            sent: false
        };
        this.handleChange = (e) => this._handleChange(e);
        this.submitHandler = (e) => this._submitHandler(e);
    }

    _handleChange(e) {
        this.setState({ usersText: e.target.value });
    }

    _submitHandler(e){
        axios.post(location.origin + '/api/update',
            {
                url: this.props.url,
                originalText: this.props.originalText,
                usersText: this.state.usersText,
                isApproved: false,
                index: this.props.index
            }
        ).then((_) => {
            this.setState({
                sent: true
            })
        });
        e.preventDefault()
    }

    render() {
        return (
          <div className="article-paragraph">
              <div className="row justify-content-md-center">
                  <div className="card container-fluid">
                    <div className="card-body">
                      <div className="form-group">
                        <label className="paragraph-label" htmlFor={this.props.index}>Original Text</label>
                          <p>{this.props.originalText}</p>
                        <label className="paragraph-label" htmlFor={this.props.index}>Users Text</label>
                        <textarea className="form-control" rows="3" onChange={this.handleChange} placeholder={this.props.originalText}/>
                        <button type="button" className="btn btn-primary btn-sm m-3 accept-button" onClick={this.submitHandler}>Send changes</button>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        );
    }
}

export {Paragraph};