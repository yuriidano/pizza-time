import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockSkeleton = (props: {}) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="4" y="274" rx="5" ry="5" width="270" height="22" /> 
    <circle cx="138" cy="123" r="122" /> 
    <rect x="6" y="315" rx="5" ry="5" width="270" height="68" /> 
    <rect x="9" y="402" rx="0" ry="0" width="1" height="0" /> 
    <rect x="4" y="399" rx="5" ry="5" width="90" height="45" /> 
    <rect x="118" y="398" rx="5" ry="5" width="155" height="45" />
  </ContentLoader>
)

export default PizzaBlockSkeleton;

