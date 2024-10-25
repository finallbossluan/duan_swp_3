import React from 'react'
import HorizontalCardNews from '../components/HorizontalCardNews'


const News = () => {
  return (
    <div>
      <HorizontalCardNews category={"news"} heading={"Tin Mới"}/>
      <HorizontalCardNews category={"highlight"} heading={"Nổi Bật"}/>
      <HorizontalCardNews category={"promotion"} heading={"Promotion"}/>
     </div>
  )
}

export default News
