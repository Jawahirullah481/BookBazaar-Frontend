import React, { useEffect, useRef, useState } from 'react';
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Popup = ({ popupData }) => {
  const popupRef = useRef();

  useEffect(() => {

    popupRef.current.style.visibility = "visible";
    setTimeout(() => {
      if (popupRef.current == null) {
        return;
      }
      popupRef.current.style.visibility = "hidden";
    }, 2500);
    
  }, [popupData]);

  return (
    <div className="Popup" type={popupData.type} ref={popupRef}>
      <div className="popup-icon-holder">
        {popupData.type == "success" ? (<FontAwesomeIcon icon={faCircleCheck} className="icon-success" size='2xl' />) : (<FontAwesomeIcon icon={faCircleXmark} className="icon-failed" size='2xl' />)}
      </div>
      <div className="content-holder">
        <p>{popupData.message}</p>
      </div>
    </div>
  );
};

export default Popup;