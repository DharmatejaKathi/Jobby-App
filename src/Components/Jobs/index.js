import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'

import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    activeCheckId: [],
    activeRadioId: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeCheckId, activeRadioId, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const jobListUrl = `https://apis.ccbp.in/jobs?employment_type=${activeCheckId}&minimum_package=${activeRadioId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobListUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        jobTitle: each.title,
      }))
      console.log(updatedData)
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return jobsList.length > 0 ? (
      <div>
        {jobsList.map(each => (
          <JobCard jobDetails={each} key={each.companyLogoUrl} />
        ))}
      </div>
    ) : (
      <div className="not-c">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="not-h">No Jobs Found</h1>
        <p className="not-p">We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  onChangeRadio = event => {
    this.setState({activeRadioId: event.target.id}, this.getJobsList)
  }

  onChangeCheck = event => {
    const {activeCheckId} = this.state
    if (activeCheckId.includes(event.target.id)) {
      const updateList = activeCheckId.filter(each => each !== event.target.id)
      this.setState({activeCheckId: updateList}, this.getJobsList)
    } else {
      this.setState(
        prevState => ({
          activeCheckId: [...prevState.activeCheckId, event.target.id],
        }),
        this.getJobsList,
      )
    }
  }

  onGetRadio = () => (
    <ul className="ul">
      {salaryRangesList.map(each => (
        <li className="checkbox-list" key={each.salaryRangeId}>
          <input
            type="radio"
            name="option"
            id={each.salaryRangeId}
            className="check-box"
            onChange={this.onChangeRadio}
          />
          <label htmlFor={each.salaryRangeId} className="label-item">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetCheckBox = () => (
    <ul className="ul">
      {employmentTypesList.map(each => (
        <li className="checkbox-list" key={each.employmentTypeId}>
          <input
            type="checkBox"
            id={each.employmentTypeId}
            className="check-box"
            onChange={this.onChangeCheck}
          />
          <label htmlFor={each.employmentTypeId} className="label-item">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-con">
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          className="search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
        >
          <AiOutlineSearch />S
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

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
      <button className="retry-button" type="button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  renderFinalJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div>
            <ProfileDetails />
            <hr />
            <h1 className="title">Type of Employment</h1>
            {this.onGetCheckBox()}
            <hr />
            <h1 className="title">Salary Range</h1>
            {this.onGetRadio()}
          </div>
          <div className="jobs-list-container">
            {this.searchBar()}
            {this.renderFinalJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
