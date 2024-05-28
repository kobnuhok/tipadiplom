"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { setTotalPrice } from "../../../store/total";
import { price, typePrice } from "../../constants";

export const CeilingPaint = () => {
  const dispatch = useDispatch();

  const initialData = useMemo(() => {
    const storedData = localStorage.getItem("dataBuild");
    return storedData ? JSON.parse(storedData) : {};
  }, []);

  const [paint, setPaint] = useState({
    paintАrea: initialData.paint?.paintАrea || "",
    paintLayers: initialData.paint?.paintLayers || "",
    paintMaterial: initialData.paint?.paintMaterial || "",
    pricePaintMaterial: initialData.paint?.pricePaintMaterial || "",
    pricePaintJob: initialData.paint?.pricePaintJob || "",
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        pricePaintMaterial: paint.pricePaintMaterial,
        pricePaintJob: paint.pricePaintJob,
      })
    );
  }, [paint.pricePaintMaterial, paint.pricePaintJob, dispatch]);

  useEffect(() => {
    const calculatePrice = (pl, lay, obj, val, job) => {
      if (val == 0) {
        return 0;
      }
      const priceJob = price[job] * pl;
      const priceMaterial = Math.ceil(pl * lay * 0.0074) * price[obj][val];
      return { priceMaterial, priceJob };
    };

    const { paintАrea, paintLayers, paintMaterial } = paint;

    if (paintАrea && paintLayers && paintMaterial) {
      const { priceMaterial, priceJob } = calculatePrice(
        paintАrea,
        paintLayers,
        "materialPaint",
        paintMaterial,
        "jobPaint"
      );

      if (priceMaterial !== paint.pricePaintMaterial) {
        setPaint((prevState) => ({
          ...prevState,
          pricePaintMaterial: priceMaterial,
        }));
      }
      if (priceJob !== paint.pricePaintJob) {
        setPaint((prevState) => ({
          ...prevState,
          pricePaintJob: priceJob,
        }));
      }
    }
  }, [
    paint.paintАrea,
    paint.paintLayers,
    paint.paintMaterial,
    paint.pricePaintMaterial,
    paint.pricePaintJob,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      paint: paint,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, paint]);

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setPaint({
      ...paint, // сохраняем предыдущие значения
      [name]: value, // обновляем значение для конкретного input
    });
  };

  return (
    <Accordion
      title="Лакокрасочные работы для стен и потолков"
      src="/ceilPainting.jpg"
      main
    >
      <Accordion title="Расчет краски на площадь" daughter>
        <Input
          name="paintАrea"
          type="number"
          label="Расчет краски на площадь, м²"
          placeholder="Введите площадь"
          value={paint.paintАrea}
          onChange={handleInputChange}
        />
        <Input
          name="paintLayers"
          type="number"
          label="Количество слоев краски"
          placeholder="Введите количество слоев краски"
          value={paint.paintLayers}
          onChange={handleInputChange}
        />
        <Select
          name="paintMaterial"
          label="Материал"
          value={paint.paintMaterial}
          options={typePrice}
          onChange={handleInputChange}
        />
      </Accordion>
    </Accordion>
  );
};
