import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import JobCard from '../JobCard'
import FilterByGroups from '../FilterByGroups'

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

class Jobs extends Component {
  state = {
    jobsList: [],
    activeCheckId: employmentTypesList[0].employmentTypeId,
    activeRadioId: salaryRangesList[0].salaryRangeId,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
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
      this.setState({jobsList: updatedData})
    }
  }

  renderFilterList = () => {
    const {activeCheckId, activeRadioId} = this.state
    return (
      <div>
        <FilterByGroups
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          activeCheckId={activeCheckId}
          activeRadioId={activeRadioId}
          updateActiveCheckId={this.updateActiveCheckId}
          updateActiveRadioId={this.updateActiveRadioId}
        />
      </div>
    )
  }

  updateActiveCheckId = activeCheckId => {
    this.setState({activeCheckId}, this.renderJobsList)
  }

  updateActiveRadioId = activeRadioId => {
    this.setState({activeRadioId}, this.renderJobsList)
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <div>
        {jobsList.map(each => (
          <JobCard jobDetails={each} key={each.id} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div>
            <ProfileDetails />
            <hr />
            {this.renderFilterList()}
          </div>
          <ul className="jobs-list-container">{this.renderJobsList()}</ul>
        </div>
      </>
    )
  }
}

export default Jobs
