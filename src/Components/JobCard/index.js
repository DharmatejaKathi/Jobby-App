import {Link} from 'react-router-dom'

import {TiStarFullOutline} from 'react-icons/ti'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {RiHandbagFill} from 'react-icons/ri'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    jobTitle,
    id,
  } = jobDetails
  return (
    <li className="card-item-container">
      <Link to={`/jobs/${id}`} className="link-card">
        <div className="company-logo-container">
          <img className="company-logo" src={companyLogoUrl} alt="logo" />
          <div>
            <p className="job-title">{jobTitle}</p>
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
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
