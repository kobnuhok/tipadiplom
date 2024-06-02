"use client";
import "./page.css";
import { CloseGray } from "../assets/svg/close-gray";
import { ConstructionPartitions } from "./components/construction-partitions/index";
import { WaterproofingWorks } from "./components/waterproofing-works/index";
import { FloorPouring } from "./components/floor-pouring/index";
import { CeilingPaint } from "./components/ceiling-paint/index";
import { SuspendedCeiling } from "./components/suspended-ceiling/index";
import { WallCladding } from "./components/wall-cladding/index";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const totalPrice = useSelector((state) => state.totalPrice);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      Number(totalPrice.priceTileWallMaterial) +
        Number(totalPrice.priceCladdingMaterial) +
        Number(totalPrice.priceTileWallJob) +
        Number(totalPrice.priceCladdingJob) +
        Number(totalPrice.priceDrywallJob) +
        Number(totalPrice.priceDrywallMaterial) +
        Number(totalPrice.pricePlasterJob) +
        Number(totalPrice.pricePlasterMaterial) +
        Number(totalPrice.priceMasticMaterial) +
        Number(totalPrice.priceMasticJob) +
        Number(totalPrice.priceRollMaterial) +
        Number(totalPrice.priceRollJob) +
        Number(totalPrice.priceFirstAlignMaterial) +
        Number(totalPrice.priceFirstAlignJob) +
        Number(totalPrice.priceSecondAlignMaterial) +
        Number(totalPrice.priceSecondAlignJob) +
        Number(totalPrice.pricePaintMaterial) +
        Number(totalPrice.pricePaintJob)
    );
  }, [totalPrice]);

  useEffect(() => {
    const storedData = localStorage.getItem("dataBuild");
    if (!storedData) {
      localStorage.setItem("dataBuild", JSON.stringify({}));
    }
  }, []);
  const clear = () => {
    localStorage.setItem("dataBuild", JSON.stringify({}));
    window.location.reload();
  };
  return (
    <div className="page">
      <h1>Строительный калькулятор!</h1>
      <div className="form">
        <div className="body">
          <ConstructionPartitions />
          <WaterproofingWorks />
          <FloorPouring />
          <CeilingPaint />
          {/* <SuspendedCeiling /> */}
          <WallCladding />
        </div>
        <div className="total">
          <div className="total__head">
            <span className="total__price">
              {total ? total.toLocaleString("ru-RU") : 0}₽
            </span>
            <span className="total__price-text">добавлено в расчеты</span>
          </div>
          <div className="total__body">
            <span className="total__description">
              Строительный калькулятор поможет вам в расчёте стоимости
              строительных работ
            </span>
            <a href="/cart" id="basket" className="button">
              Рассчитать смету
            </a>
            <div className="total__clear">
              <CloseGray />
              <span onClick={clear} className="total__clear-title">
                Сбросить все введённые данные
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
