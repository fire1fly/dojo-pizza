import React from 'react'
import ContentLoader from "react-content-loader";

export default function PizzaLoader() {
  return (
    <div className="pizza-block">
      <ContentLoader 
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="130" cy="131" r="130" /> 
        <rect x="2" y="276" rx="6" ry="6" width="280" height="24" /> 
        <rect x="0" y="316" rx="10" ry="10" width="280" height="84" /> 
        <rect x="0" y="415" rx="6" ry="6" width="90" height="42" /> 
        <rect x="146" y="415" rx="6" ry="6" width="130" height="42" />
      </ContentLoader>
    </div>
  )
}
