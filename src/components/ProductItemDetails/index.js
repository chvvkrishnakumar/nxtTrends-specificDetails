import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Similar from '../SimilarProductItem'
import './index.css'

const apiStatus = {
  failed: 'FAILED',
  success: 'SUCCESS',
  inProcess: 'IN_PROCESS',
}

class ProductItemDetails extends Component {
  state = {count: 1, data: {}, apiState: apiStatus.inProcess}

  componentDidMount() {
    this.getData()
    console.log('didmount')
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    const d = await response.json()
    console.log(response)

    if (response.ok !== true) {
      this.setState({apiState: apiStatus.failed})
    } else {
      const detailData = {
        availability: d.availability,
        brand: d.brand,
        description: d.description,
        id: d.id,
        price: d.price,
        rating: d.rating,
        style: d.style,
        title: d.title,
        totalReviews: d.total_reviews,
        imageUrl: d.image_url,
        similarProducts: d.similar_products.map(dd => ({
          availability: dd.availability,
          brand: dd.brand,
          description: dd.description,
          id: dd.id,
          price: dd.price,
          rating: dd.rating,
          style: dd.style,
          title: dd.title,
          totalReviews: dd.total_reviews,
          imageUrl: dd.image_url,
        })),
      }

      this.setState({data: detailData, apiState: apiStatus.success})
    }
  }

  increase = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  decrease = () => {
    const {count} = this.state
    if (count !== 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  render() {
    const {data, apiState, count} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
      similarProducts,
    } = data

    switch (apiState) {
      case apiStatus.success:
        return (
          <div className="main">
            <div className="product-details">
              <img className="pimg" src={imageUrl} alt="product" />
              <ul className="description">
                <h1>{title}</h1>
                <p>Rs {price}/-</p>

                <li className="rating">
                  <img
                    className="star"
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                  />
                  <p>{rating}</p>{' '}
                </li>
                <li>
                  <p>{totalReviews} Reviews</p>
                </li>

                <li>
                  <p>{description}</p>
                </li>
                <li>
                  <p>
                    <span>Available: </span>
                    {availability}
                  </p>
                </li>
                <li>
                  <p>
                    <span>Brand: </span>
                    {brand}
                  </p>
                </li>
                <hr />
                <div className="count">
                  <button
                    data-testid="minus"
                    onClick={this.decrease}
                    type="button"
                  >
                    <BsDashSquare />
                  </button>
                  <p>{count}</p>
                  <button
                    data-testid="plus"
                    onClick={this.increase}
                    type="button"
                  >
                    <BsPlusSquare />
                  </button>
                </div>
                <button type="button">Add to Cart</button>
              </ul>
            </div>

            <div>
              <h1>Similar Products</h1>
              <ul className="ul">
                {similarProducts.map(each => (
                  <Similar
                    getData={this.getData}
                    details={each}
                    key={each.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        )
      case apiStatus.failed:
        return (
          <div className="li">
            <h1>Product Not Found</h1>
            <img
              className="pimg"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
              alt="failure view"
            />
            <Link to="/products">
              <button type="button">Continue Shopping</button>
            </Link>
          </div>
        )
      case apiStatus.inProcess:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="blue" height="80" width="50" />
          </div>
        )

      default:
        return null
    }
  }
}

export default ProductItemDetails
