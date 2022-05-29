import React, { Component } from 'react'
import './Main.css'
import Project from './Project'
import supercare from './supercare'
import personal from './personal'
import tags from './tags'


export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      window: { h: 0, w: 0 },
      sectionTriggers: {
        work: Number.POSITIVE_INFINITY,
        projects: Number.POSITIVE_INFINITY,
        me: Number.POSITIVE_INFINITY
      },
      iconAnimDidPlay: {
        work: false,
        projects: false,
        me: false
      }
    }

    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }


  componentDidMount() {
    setTimeout(() => {
      document.querySelector('.section-greeting h2').classList.add('animated')
      document.querySelector('.section-greeting h2').classList.add('wobble')
    }, 500)

    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)

    this.handleResize()
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }


  handleResize() {
    let newState

    if(window.innerHeight !== this.state.window.h || window.innerWidth !== this.state.window.w) {
      // Stretch container to fit height
      let lightSections = document.getElementsByClassName('section-light')
      let darkSections = document.getElementsByClassName('section-dark')
      for(let section of lightSections)
        section.style.minHeight = window.innerHeight+'px'
      for(let section of darkSections)
        section.style.minHeight = window.innerHeight+'px'

      // Vertically center greeting
      let greetingSection = document.querySelector('.section-greeting')
      let greetingWords = document.querySelector('.section-greeting .container')
      greetingSection.style.paddingTop = ((window.innerHeight-greetingWords.offsetHeight)/2)+'px'

      // Calculate icon animation trigger points
      let sectionWorkH = document.querySelector('.sectionWork').offsetHeight
      let sectionProjH = document.querySelector('.sectionProjects').offsetHeight
      let sectionTriggers = {}
      sectionTriggers.work = window.innerHeight
      sectionTriggers.projects = sectionTriggers.work+sectionWorkH
      sectionTriggers.me = sectionTriggers.projects+sectionProjH

      newState = {
        sectionTriggers,
        window: {
          h: window.innerHeight,
          w: window.innerWidth
        }
      }
    }

    if(newState)
      this.setState(newState)
  }


  handleScroll() {
    let triggerOffset = 0.3*this.state.window.h

    if(!this.state.iconAnimDidPlay.work
      && window.scrollY > this.state.sectionTriggers.work-triggerOffset) {
      this.setState({
        iconAnimDidPlay: Object.assign(this.state.iconAnimDidPlay, { work: true })
      }, () => {
        document.querySelector('.section-work-header i').classList.add('animated')
        document.querySelector('.section-work-header i').classList.add('swing')
      })
    } else if(!this.state.iconAnimDidPlay.projects
      && window.scrollY > this.state.sectionTriggers.projects-triggerOffset) {
      this.setState({
        iconAnimDidPlay: Object.assign(this.state.iconAnimDidPlay, { projects: true })
      }, () => {
        document.querySelector('.section-projects-header i').classList.add('animated')
        document.querySelector('.section-projects-header i').classList.add('hinge')
      })
    } else if(!this.state.iconAnimDidPlay.me
      && window.scrollY > this.state.sectionTriggers.me-triggerOffset) {
      this.setState({
        iconAnimDidPlay: Object.assign(this.state.iconAnimDidPlay, { me: true })
      }, () => {
        document.querySelector('.section-me-header i').classList.add('animated')
        document.querySelector('.section-me-header i').classList.add('flip')
      })
    }
  }


  render() {
    let tagKeys = Object.keys(tags)
    let tagGroups = {}
    for(let key of tagKeys) {
      if(!tags[key].type)
        continue
      if(tagGroups[tags[key].type])
        tagGroups[tags[key].type].push(tags[key].name)
      else
        tagGroups[tags[key].type] = [ tags[key].name ]
    }

    return (<>
      <div className='section-dark section-greeting'>
        <div className='container'>
          <h2 className='light'>hello</h2>
          <h5 className='light'>I'm Kyoseong (Austin), and I like to build stuff</h5>
        </div>
      </div>
      <div className='section-light sectionWork'>
        <div className='container'>
          <div className='section-work-header'>
            <i className='material-icons medium brown-text'>card_travel</i>
            <h4 className='light'>work experience</h4>
          </div>
          <div className='row work-row'>
            <div className='col s12 m6 l6'>
              <div className='center work-col alto-logo'>
                <img
                  className='responsive-img'
                  src='/static/img/logo_alto.png'
                  alt='Alto logo'
                />
                <p>Dec. 2021 - Present</p>
                <p>Senior software engineer</p>
              </div>
            </div>
            <div className='col s12 m6 l6'>
              <div className='work-col'>
                <p>Details to come</p>
              </div>
            </div>
          </div>
          <div className='row work-row'>
            <div className='col s12 m6 l6'>
              <div className='center work-col'>
                <img
                  className='responsive-img'
                  src='/static/img/logo_sch.png'
                  alt='SuperCare Health logo'
                />
                <p>Feb. 2017 - Dec. 2021</p>
                <p>Senior software engineer</p>
              </div>
            </div>
            <div className='col s12 m6 l6'>
              <div className='work-col'>
                <p><b>Designed and developed</b> off of loose requirements and added features to existing code base.</p>
                <p><b>Provided documentation</b> including API reference, versioning, guides for users, notes for developers, and more.</p>
                <p><b>Wrote automated tests</b> as well as interactive CLI programs for cases requiring human interaction.</p>
              </div>
            </div>
          </div>
          <div className='row'>
            {supercare.map((project, i) => {
              return <Project key={i} propKey={i} section={'sch'} data={project}/>
            })}
          </div>
        </div>
      </div>
      <div className='section-dark sectionProjects'>
        <div className='container'>
          <div className='section-projects-header'>
            <i className='material-icons medium blue-grey-text text-lighten-3'>build</i>
            <h4 className='light'>personal projects</h4>
          </div>
          <div className='pad'/>
          <div className='row'>
            {personal.map((project, i) => {
              return <Project key={i} propKey={i} section={'pers'} data={project}/>
            })}
          </div>
        </div>
      </div>
      <div className='section-light sectionMe'>
        <div className='container'>
          <div className='section-me-header'>
            <i className='material-icons medium amber-text'>perm_identity</i>
            <h4 className='light'>me</h4>
          </div>
          <div className='row'>
            <div className='col s12 m6 l6'>
              <div className='center'>
                <div className='school-img'>
                  <img
                    className='responsive-img'
                    src='/static/img/logo_ucla.png'
                    alt='UCLA logo'
                  />
                </div>
                <h5 className='light'>Computer Science, B.S.</h5>
                <p><b>University of California, Los Angeles</b></p>
                <p>Graduated Dec. 2015</p>
              </div>
              <div className='school-courses'>
                <h5 className='light'>Relevant coursework</h5>
                <p>Algorithms &amp; Complexity</p>
                <p>Artificial Intelligence</p>
                <p>Computer Graphics</p>
                <p>Database Systems</p>
                <p>Data Structures</p>
                <p>Formal Languages &amp; Automata Theory</p>
                <p>Machine Architecture</p>
                <p>Network Fundamentals</p>
                <p>Object-oriented Programming</p>
                <p>Operating Systems</p>
                <p>Programming Languages</p>
                <p>Software Engineering</p>
                <p>Web Applications</p>
                <p>---</p>
                <p>Entrepreneurship for Engineers</p>
                <p>Finance and Marketing for Engineers</p>
                <p>Systems Engineering</p>
              </div>
            </div>
            <div className='col s12 m6 l6'>
              <div className='me-img'>
                <img className='responsive-img' src='/static/img/me.jpg' alt='Pic of me'/>
              </div>
              <div
                className='me-ext-btn me-ext-btn-1'
                onClick={() => { window.open('https://github.com/kyoseongku', '_blank') }}
              >
                <span>GitHub</span>
              </div>
              <div
                className='me-ext-btn me-ext-btn-2'
                onClick={() => {
                  window.open('https://s3-us-west-2.amazonaws.com/kks.portfolio/static/Resume-Kyoseong_Ku.pdf', '_blank')
                }}
              >
                <span>Resume (Jan. 2022)</span>
              </div>
            </div>
          </div>
          <div className='pad'/>
          <div className='section-projects-header'>
            <h5 className='light'>toolbox</h5>
          </div>
          <div className='row'>
            <p className='me-tb'><b>Languages</b></p>
            <p>Node.js+TypeScript, Rust</p>
            <p className='me-tb'><b>Languages used in the past</b></p>
            <p>Assembly, C, C++, Java, Go, Lisp, OCaml, PHP, Python, Shell/bash, Solidity, SQL</p>
            <p className='me-tb'><b>Front-end/UI</b></p>
            <p>{tagGroups.FE.join(', ')}</p>
            <p className='me-tb'><b>Back-end/Infrastructure</b></p>
            <p>{tagGroups.BEI.join(', ')}</p>
            <p className='me-tb'><b>Libraries/Technologies</b></p>
            <p>{tagGroups.LIB.join(', ')}</p>
            <p className='me-tb'><b>APIs</b></p>
            <p>{tagGroups.API.join(', ')}</p>
          </div>
        </div>
      </div>
    </>)
  }
}

