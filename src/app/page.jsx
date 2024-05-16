"use client";
import "./page.css";
import { CloseGray } from "../assets/svg/close-gray";
import { ConstructionPartitions } from "./components/construction-partitions/index";
import { WaterproofingWorks } from "./components/waterproofing-works/index";
import { FloorPouring } from "./components/floor-pouring/index";
import { CeilingPaint } from "./components/ceiling-paint/index";
import { SuspendedCeiling } from "./components/suspended-ceiling/index";
import { WallCladding } from "./components/wall-cladding/index";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const storedData = localStorage.getItem("dataBuild");
    storedData
      ? JSON.parse(storedData)
      : localStorage.setItem("dataBuild", JSON.stringify({}));

  }, []);
  return (
    <div className="page">
      <h1>Строительный калькулятор!</h1>
      <div className="form">
        <div className="body">
          <ConstructionPartitions />
          <WaterproofingWorks />
          <FloorPouring />
          <CeilingPaint />
          <SuspendedCeiling />
          <WallCladding />
        </div>
        <div className="total">
          <div className="total__head">
            <span className="total__price">0</span>
            <span className="total__price-text">добавлено в расчеты</span>
          </div>
          <div className="total__body">
            <span className="total__description">
              Строительный калькулятор поможет вам в расчёте стоимости
              строительных работ
            </span>
            <button id="basket" className="button">
              Рассчитать смету
            </button>
            <div className="total__clear">
              <CloseGray />
              <span className="total__clear-title">
                Сбросить все введённые данные
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
