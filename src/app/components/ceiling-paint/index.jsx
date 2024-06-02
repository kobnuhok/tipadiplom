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
    square: {
      nameJob: initialData.paint?.square.nameJob || "Лакокрасочные работы",
      area: initialData.paint?.square.area || "",
      layers: initialData.paint?.square.layers || "",
      material: initialData.paint?.square.material || "",
      priceMaterial: initialData.paint?.square.priceMaterial || "",
      priceJob: initialData.paint?.square.priceJob || "",
    },
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        pricePaintMaterial: paint.square.priceMaterial,
        pricePaintJob: paint.square.priceJob,
      })
    );
  }, [paint.square.priceMaterial, paint.square.priceJob, dispatch]);

  useEffect(() => {
    const calculatePrice = (pl, lay, obj, val, job) => {
      let priceJob = 0;
      let priceMaterial = 0;
      if (val == 0 || lay == "0" || pl == "0") {
        priceMaterial = 0;
        priceJob = 0;
      } else {
        priceJob = price[job] * pl;
        priceMaterial = Math.ceil(pl * lay * 0.0074) * price[obj][val];
      }
      return { priceMaterial, priceJob };
    };

    const { square } = paint;

    if (square.area && square.layers && square.material) {
      const { priceMaterial, priceJob } = calculatePrice(
        square.area,
        square.layers,
        "materialPaint",
        square.material,
        "jobPaint"
      );

      if (priceMaterial !== paint.priceMaterial) {
        setPaint((prevState) => ({
          ...prevState,
          square: {
            ...prevState["square"],
            priceMaterial: priceMaterial,
          },
        }));
      }
      if (priceJob !== paint.priceJob) {
        setPaint((prevState) => ({
          ...prevState,
          square: {
            ...prevState["square"],
            priceJob: priceJob,
          },
        }));
      }
    }
  }, [
    paint.square.area,
    paint.square.layers,
    paint.square.material,
    paint.square.priceMaterial,
    paint.square.priceJob,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      paint: paint,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, paint]);

  const handleChange = (form, field) => (e) => {
    const { value } = e.target;
    setPaint((prevState) => ({
      ...prevState,
      [form]: {
        ...prevState[form],
        [field]: value || 0,
      },
    }));
  };

  return (
    <Accordion
      title="Лакокрасочные работы для стен и потолков"
      src="/ceilPainting.jpg"
      main
    >
      <Accordion title="Расчет краски на площадь" daughter>
        <Input
          type="number"
          label="Расчет краски на площадь, м²"
          placeholder="Введите площадь"
          value={paint.square.area}
          onChange={handleChange("square", "area")}
        />
        <Input
          type="number"
          label="Количество слоев краски"
          placeholder="Введите количество слоев краски"
          value={paint.square.layers}
          onChange={handleChange("square", "layers")}
        />
        <Select
          label="Материал"
          value={paint.square.material}
          options={typePrice}
          onChange={handleChange("square", "material")}
        />
      </Accordion>
    </Accordion>
  );
};
