import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickJobs = () => {
    const {history} = props
    console.log(history)
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      history.replace('/jobs')
    }
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-text-container">
          <h1 className="home-heading">Find The job That Fits Your Life</h1>
          <p className="home-paragraph">
            Millions of people are searching for jobs, salary information,
            Company reviews, Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs" className="link">
            <button
              type="button"
              className="find-job-button"
              onClick={onClickJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
