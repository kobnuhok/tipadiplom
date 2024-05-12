"use client";
import "./accordion.css";
import { ChevronIcon } from "../../assets/svg/chevron";
import { useState } from "react";

export const Accordion = (props) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div className="accordion">
      <div onClick={toggleVisibility} className={"accordion__head"}>
        <div className="accordion__head-wrap">
          <span className="accordion__title">{props.title}</span>
        </div>
        <ChevronIcon />
      </div>
      {visible && <div className="accordion__body">{props.children}</div>}
    </div>
  );
};
