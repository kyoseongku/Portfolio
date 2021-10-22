import React, { Component } from 'react'
import './Project.css'
import tags from './tags'


export default class Project extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showDetails: false
    }
  }


  render() {
    return (
      <div className='project'>
        <div>
          <div className='project-top'>
            <p>{this.props.data.role}</p>
            <span
              className='light-blue-text'
              onClick={() => {
                this.setState({ showDetails: !this.state.showDetails })
              }}>
              {this.state.showDetails ? 'Hide' : 'Details'}
            </span>
            <div className='clear'></div>
          </div>
          <p className='project-title'><b>{this.props.data.name}</b></p>
          <p className='project-info'>{this.props.data.info}</p>
          {
            this.state.showDetails && (
              <div>
                <div className='project-tags'>
                  {
                    this.props.data.tags.map((tagKey, i) => {
                      return <div key={i} className={`chip ${tags[tagKey].class}`}>{tags[tagKey].name}</div>
                    })
                  }
                </div>
                {
                  !this.props.data.media ? null : this.props.data.media.type === 'video' ? (
                    <div className='center'>
                      <a href={this.props.data.media.src}>Click here to watch a demo</a>
                    </div>
                  ) : null
                }
                {
                  this.props.data.points.map((point, i) => {
                    return <p key={i} className='project-point'>- {point}</p>
                  })
                }
              </div>
            )
          }
        </div>
        </div>
    )
  }
}

