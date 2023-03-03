import './index.css'

const Similar = props => {
  const {details} = props

  const {title, brand, price, rating, imageUrl} = details

  return (
    <li className="li">
      <img className="img" src={imageUrl} alt="similar product" />
      <p>{title}</p>
      <p>by {brand}</p>
      <div>
        <p>Rs {price}</p>
        <div className="rating">
          <img
            className="star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
          <p>{rating}</p>
        </div>
      </div>
    </li>
  )
}

export default Similar
