import React from 'react'
import './NewsCard.css'
import placeholderImage from '../../assets/img/img_avatar2.png'

const NewsCard = ({sourceName, title, headerImage, category}) => {
  return (
      <div class="card m-2">
          <img src={headerImage != null ? headerImage : placeholderImage} alt="Avatar" className='imageframe'/>
              <div class="container mt-auto">
                  <h4><b>{sourceName}</b></h4>
                  <p>{title.length > 110 ? title.substring(0,110)+"..." : title}</p>
                  <p>category : {category}</p>
              </div>
      </div>
  )
}

export default NewsCard