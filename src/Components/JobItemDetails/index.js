import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {TiStarFullOutline} from 'react-icons/ti'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {RiHandbagFill} from 'react-icons/ri'

import {GoLinkExternal} from 'react-icons/go'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    similarJob: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = [data.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        skills: each.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: each.title,
      }))
      console.log(updatedData)
      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        id: eachJob.id,
        jobDescriptions: eachJob.job_description,
        employmentType: eachJob.employment_type,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: updatedData,
        similarJob: similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJob} = this.state
    if (jobDetails.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        jobDescription,
        employmentType,
        location,
        packagePerAnnum,
        rating,
        title,
        lifeAtCompany,
        skills,
      } = jobDetails[0]
      return (
        <>
          <Header />
          <div className="c">
            <div className="company-logo-container">
              <img
                className="company-logo"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div>
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <TiStarFullOutline className="rating" />
                  <p className="rating-para">{rating}</p>
                </div>
              </div>
            </div>
            <div className="lap-container">
              <div className="location-container">
                <div className="place-container">
                  <FaMapMarkerAlt className="location" />
                  <p>{location}</p>
                </div>
                <div className="place-container">
                  <RiHandbagFill className="location" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p className="lap-para">{packagePerAnnum}</p>
            </div>
            <hr className="line" />
            <div className="life">
              <h1 className="Description">Description</h1>
              <a className="link-c" href={companyWebsiteUrl}>
                Visit
                <GoLinkExternal />
              </a>
            </div>

            <p className="des">{jobDescription}</p>
            <h1 className="Description">Skills</h1>
            <ul className="skill-ul">
              {skills.map(each => (
                <li key={each.name} className="skill-li">
                  <img
                    className="skill-img"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <p className="skill-name">{each.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="Description">Life at Company</h1>
            <div className="life">
              <p className="des">{lifeAtCompany.description}</p>
              <img
                className="com-img"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
          <h1 className="Description-s">Similar jobs</h1>
          <ul className="s-ul">
            {similarJob.map(each => (
              <SimilarJobCard details={each} key={each.employmentType} />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  renderFailure = () => (
    <div className="not-c">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="not-h">Oops! Something Went Wrong</h1>
      <p className="not-p">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderFinalProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="jobDetailContainer">{this.renderFinalProfile()}</div>
  }
}

export default JobItemDetails
