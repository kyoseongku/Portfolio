import React, { Component } from 'react'
import './Project.css'
import tags from './tags'


export default class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false
    }
    this.toggleDetails = this.toggleDetails.bind(this)
  }


  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }


  render() {
    return (
      <div className='project'>
        <div className='project-trigger'>
          <p>{this.props.data.role}</p>
          <span className='light-blue-text' onClick={this.toggleDetails}>
            {this.state.showDetails ? 'Hide' : 'Details'}
          </span>
          <div className='clear'></div>
        </div>
        <p className='project-title'><b>{this.props.data.name}</b></p>
        <p className='project-info'>{this.props.data.info}</p>
        {this.state.showDetails && (<>
          {this.props.data.points.map((point, i) => {
            return <p key={i} className='project-point'>- {point}</p>
          })}
          <div className='project-tags'>
            {this.props.data.tags.map((tagKey, i) => {
              return (
                <div key={i} className={`chip ${tags[tagKey].class}`}>
                  {tags[tagKey].name}
                </div>
              )
            })}
          </div>
          {this.props.data.media && this.props.data.media.type === 'video' && (
            <div className='center'>
              <a href={this.props.data.media.src}>Click here to watch a demo</a>
            </div>
          )}
          <div className='project-trigger'>
            <span className='light-blue-text' onClick={this.toggleDetails}>
              Hide
            </span>
            <div className='clear'></div>
          </div>
        </>)}
      </div>
    )
  }
}

