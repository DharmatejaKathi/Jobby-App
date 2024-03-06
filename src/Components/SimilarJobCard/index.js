import {TiStarFullOutline} from 'react-icons/ti'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {RiHandbagFill} from 'react-icons/ri'

import './index.css'

const SimilarJobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    rating,
    jobDescriptions,
    employmentType,
    location,
    title,
  } = details
  return (
    <li className="s-li">
      <div className="company-logo-container">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <TiStarFullOutline className="rating" />
            <p className="rating-para">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="Description">Description</h1>
      <p className="des">{jobDescriptions}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobCard
