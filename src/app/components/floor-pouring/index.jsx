"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { setTotalPrice } from "../../../store/total";
import { price, typePrice } from "../../constants";

export const FloorPouring = () => {
  const dispatch = useDispatch();

  const initialData = useMemo(() => {
    const storedData = localStorage.getItem("dataBuild");
    return storedData ? JSON.parse(storedData) : {};
  }, []);

  const [floor, setFloor] = useState({
    firstAlignLength: initialData.floor?.firstAlignLength || "",
    firstAlignWidth: initialData.floor?.firstAlignWidth || "",
    firstAlignThick: initialData.floor?.firstAlignThick || "",
    firstAlignMaterial: initialData.floor?.firstAlignMaterial || "",
    priceFirstAlignMaterial: initialData.floor?.priceFirstAlignMaterial || "",
    priceFirstAlignJob: initialData.floor?.priceFirstAlignJob || "",
    secondAlignLength: initialData.floor?.secondAlignLength || "",
    secondAlignWidth: initialData.floor?.secondAlignWidth || "",
    secondAlignThick: initialData.floor?.secondAlignThick || "",
    secondAlignMaterial: initialData.floor?.secondAlignMaterial || "",
    priceSecondAlignMaterial: initialData.floor?.priceSecondAlignMaterial || "",
    priceSecondAlignJob: initialData.floor?.priceSecondAlignJob || "",
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceFirstAlignMaterial: floor.priceFirstAlignMaterial,
        priceFirstAlignJob: floor.priceFirstAlignJob,
        priceSecondAlignMaterial: floor.priceSecondAlignMaterial,
        priceSecondAlignJob: floor.priceSecondAlignJob,
      })
    );
  }, [
    floor.priceFirstAlignMaterial,
    floor.priceFirstAlignJob,
    floor.priceSecondAlignMaterial,
    floor.priceSecondAlignJob,
    dispatch,
  ]);

  useEffect(() => {
    const calculatePrice = (len, w, th, obj, val, job) => {
      if (val == 0) {
        return 0;
      }
      let pl = Math.ceil((len * w * 2) / 3);
      const priceJob = price[job] * pl;
      const priceMaterial = Math.ceil(0.72 * pl * th * 10) * price[obj][val];
      return { priceMaterial, priceJob };
    };

    const calculatePriceSecond = (len, w, th, obj, val, job) => {
      if (val == 0) {
        return 0;
      }
      let pl = Math.ceil((len * w * 2) / 3);
      const priceJob = price[job] * pl;
      const priceMaterial = Math.ceil(0.00008 * pl * th * 10) * price[obj][val];
      return { priceMaterial, priceJob };
    };

    const {
      firstAlignLength,
      firstAlignWidth,
      firstAlignThick,
      firstAlignMaterial,
      secondAlignLength,
      secondAlignWidth,
      secondAlignThick,
      secondAlignMaterial,
    } = floor;

    if (
      firstAlignLength &&
      firstAlignWidth &&
      firstAlignThick &&
      firstAlignMaterial
    ) {
      const {
        priceMaterial: priceMaterialFirstAlign,
        priceJob: priceJobFirstAlign,
      } = calculatePrice(
        firstAlignLength,
        firstAlignWidth,
        firstAlignThick,
        "materialFirstAlign",
        firstAlignMaterial,
        "jobFirstAlign"
      );

      if (priceMaterialFirstAlign !== floor.priceFirstAlignMaterial) {
        setFloor((prevState) => ({
          ...prevState,
          priceFirstAlignMaterial: priceMaterialFirstAlign,
        }));
      }
      if (priceJobFirstAlign !== floor.priceFirstAlignJob) {
        setFloor((prevState) => ({
          ...prevState,
          priceFirstAlignJob: priceJobFirstAlign,
        }));
      }
    }
    if (
      secondAlignLength &&
      secondAlignWidth &&
      secondAlignThick &&
      secondAlignMaterial
    ) {
      const {
        priceMaterial: priceMaterialSecondAlign,
        priceJob: priceJobSecondAlign,
      } = calculatePriceSecond(
        secondAlignLength,
        secondAlignWidth,
        secondAlignThick,
        "materialSecondAlign",
        secondAlignMaterial,
        "jobSecondAlign"
      );

      if (priceMaterialSecondAlign !== floor.priceSecondAlignMaterial) {
        setFloor((prevState) => ({
          ...prevState,
          priceSecondAlignMaterial: priceMaterialSecondAlign,
        }));
      }
      if (priceJobSecondAlign !== floor.priceSecondAlignJob) {
        setFloor((prevState) => ({
          ...prevState,
          priceSecondAlignJob: priceJobSecondAlign,
        }));
      }
    }
  }, [
    floor.firstAlignLength,
    floor.firstAlignWidth,
    floor.firstAlignThick,
    floor.firstAlignMaterial,
    floor.priceFirstAlignMaterial,
    floor.priceFirstAlignJob,
    floor.secondAlignLength,
    floor.secondAlignWidth,
    floor.secondAlignThick,
    floor.secondAlignMaterial,
    floor.priceSecondAlignMaterial,
    floor.priceSecondAlignJob,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      floor: floor,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, floor]);

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFloor({
      ...floor, // сохраняем предыдущие значения
      [name]: value, // обновляем значение для конкретного input
    });
  };

  return (
    <Accordion
      title="Выравнивание полов и устройство стяжек"
      src="/floorPouring.jpg"
      main
    >
      <Accordion title="Выравнивание полов первичным ровнителем" daughter>
        <Input
          name="firstAlignLength"
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
          value={floor.firstAlignLength}
          onChange={handleInputChange}
        />
        <Input
          name="firstAlignWidth"
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещния"
          value={floor.firstAlignWidth}
          onChange={handleInputChange}
        />
        <Input
          name="firstAlignThick"
          type="number"
          label="Толщина  слоя, см"
          placeholder="Введите толщину слоя"
          value={floor.firstAlignThick}
          onChange={handleInputChange}
        />
        <Select
          name="firstAlignMaterial"
          label="Материал"
          value={floor.firstAlignMaterial}
          options={typePrice}
          onChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Выравнивание полов финишным ровнителем" daughter>
        <Input
          name="secondAlignLength"
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
          value={floor.secondAlignLength}
          onChange={handleInputChange}
        />
        <Input
          name="secondAlignWidth"
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещения"
          value={floor.secondAlignWidth}
          onChange={handleInputChange}
        />
        <Input
          name="secondAlignThick"
          type="number"
          label="Толщина  слоя, см"
          placeholder="Введите толщину слоя"
          value={floor.secondAlignThick}
          onChange={handleInputChange}
        />
        <Select
          name="secondAlignMaterial"
          label="Материал"
          value={floor.secondAlignMaterial}
          options={typePrice}
          onChange={handleInputChange}
        />
      </Accordion>
    </Accordion>
  );
};
