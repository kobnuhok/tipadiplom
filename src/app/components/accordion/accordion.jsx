"use client";
import Image from "next/image";
import "./accordion.css";
import { ChevronIcon } from "../../../assets/svg/chevron";
import { useState } from "react";

export const Accordion = ({ title, children, main, daughter, src }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div className="accordion">
      <div
        onClick={toggleVisibility}
        className={
          main ? "accordion__head accordion__head--main" : "accordion__head"
        }
      >
        <div className="accordion__head-wrap">
          {src && (
            <Image
              className="accordion__img"
              src={src}
              width={40}
              height={40}
              alt={title}
            />
          )}
          <span className="accordion__title">{title}</span>
        </div>
        <ChevronIcon />
      </div>
      {visible && (
        <div
          className={
            daughter
              ? "accordion__body accordion__body--daughter"
              : "accordion__body"
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};
