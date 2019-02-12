import React from 'react'
import './loading.scss'

const LoadingComponent = (props) => {
  return (
    <div className="center-page">
    <div className="preloader-wrapper big active loader valign-wrapper">
      <div className={props.loaderStyle}>
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoadingComponent;
