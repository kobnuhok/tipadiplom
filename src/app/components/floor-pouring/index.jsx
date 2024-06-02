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
    firstAlign: {
      nameJob:
        initialData.floor?.firstAlign?.nameJob ||
        "Выравнивание полов первичным ровнителем",
      length: initialData.floor?.firstAlign?.length || "",
      width: initialData.floor?.firstAlign?.width || "",
      thick: initialData.floor?.firstAlign?.thick || "",
      material: initialData.floor?.firstAlign?.material || "",
      priceMaterial: initialData.floor?.firstAlign?.priceMaterial || "",
      priceJob: initialData.floor?.firstAlign?.priceJob || "",
    },
    finishAlign: {
      nameJob:
        initialData.floor?.finishAlign?.nameJob ||
        "Выравнивание полов финишным ровнителем",
      length: initialData.floor?.finishAlign?.length || "",
      width: initialData.floor?.finishAlign?.width || "",
      thick: initialData.floor?.finishAlign?.thick || "",
      material: initialData.floor?.finishAlign?.material || "",
      priceMaterial: initialData.floor?.finishAlign?.priceMaterial || "",
      priceJob: initialData.floor?.finishAlign?.priceJob || "",
    },
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceFirstAlignMaterial: floor.firstAlign.priceMaterial,
        priceFirstAlignJob: floor.firstAlign.priceJob,
        priceSecondAlignMaterial: floor.finishAlign.priceMaterial,
        priceSecondAlignJob: floor.finishAlign.priceJob,
      })
    );
  }, [
    floor.firstAlign.priceMaterial,
    floor.firstAlign.priceJob,
    floor.finishAlign.priceMaterial,
    floor.finishAlign.priceJob,
    dispatch,
  ]);

  useEffect(() => {
    const calculatePrice = (len, w, th, obj, val, job) => {
      let priceJob = 0;
      let priceMaterial = 0;
      if (val == 0 || len == "0" || w == "0" || th == "0") {
        priceMaterial = 0;
        priceJob = 0;
      } else {
        let pl = Math.ceil((len * w * 2) / 3);
        priceJob = price[job] * pl;
        priceMaterial = Math.ceil(0.72 * pl * th * 10) * price[obj][val];
      }
      return { priceMaterial, priceJob };
    };

    const calculatePriceSecond = (len, w, th, obj, val, job) => {
      let priceJob = 0;
      let priceMaterial = 0;
      if (val == 0 || len == "0" || w == "0" || w == "0") {
        priceMaterial = 0;
        priceJob = 0;
      } else {
        let pl = Math.ceil((len * w * 2) / 3);
        priceJob = price[job] * pl;
        priceMaterial = Math.ceil(0.00008 * pl * th * 10) * price[obj][val];
      }
      return { priceMaterial, priceJob };
    };

    const { firstAlign, finishAlign } = floor;

    if (
      firstAlign.length &&
      firstAlign.width &&
      firstAlign.thick &&
      firstAlign.material
    ) {
      const {
        priceMaterial: priceMaterialFirstAlign,
        priceJob: priceJobFirstAlign,
      } = calculatePrice(
        firstAlign.length,
        firstAlign.width,
        firstAlign.thick,
        "materialFirstAlign",
        firstAlign.material,
        "jobFirstAlign"
      );

      if (priceMaterialFirstAlign !== floor.firstAlign.priceMaterial) {
        setFloor((prevState) => ({
          ...prevState,
          firstAlign: {
            ...prevState["firstAlign"],
            priceMaterial: priceMaterialFirstAlign,
          },
        }));
      }
      if (priceJobFirstAlign !== floor.firstAlign.priceJob) {
        setFloor((prevState) => ({
          ...prevState,
          firstAlign: {
            ...prevState["firstAlign"],
            priceJob: priceJobFirstAlign,
          },
        }));
      }
    }
    if (
      finishAlign.length &&
      finishAlign.width &&
      finishAlign.thick &&
      finishAlign.material
    ) {
      const {
        priceMaterial: priceMaterialSecondAlign,
        priceJob: priceJobSecondAlign,
      } = calculatePriceSecond(
        finishAlign.length,
        finishAlign.width,
        finishAlign.thick,
        "materialSecondAlign",
        finishAlign.material,
        "jobSecondAlign"
      );

      if (priceMaterialSecondAlign !== floor.finishAlign.priceMaterial) {
        setFloor((prevState) => ({
          ...prevState,
          finishAlign: {
            ...prevState["finishAlign"],
            priceMaterial: priceMaterialSecondAlign,
          },
        }));
      }
      if (priceJobSecondAlign !== floor.finishAlign.priceJob) {
        setFloor((prevState) => ({
          ...prevState,
          finishAlign: {
            ...prevState["finishAlign"],
            priceJob: priceJobSecondAlign,
          },
        }));
      }
    }
  }, [
    floor.firstAlign.length,
    floor.firstAlign.width,
    floor.firstAlign.thick,
    floor.firstAlign.material,
    floor.firstAlign.priceMaterial,
    floor.firstAlign.priceJob,
    floor.finishAlign.length,
    floor.finishAlign.width,
    floor.finishAlign.thick,
    floor.finishAlign.material,
    floor.finishAlign.priceMaterial,
    floor.finishAlign.priceJob,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      floor: floor,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, floor]);

  const handleChange = (form, field) => (e) => {
    const { value } = e.target;
    setFloor((prevState) => ({
      ...floor,
      [form]: {
        ...prevState[form],
        [field]: value || 0,
      },
    }));
  };

  return (
    <Accordion
      title="Выравнивание полов и устройство стяжек"
      src="/floorPouring.jpg"
      main
    >
      <Accordion title="Выравнивание полов первичным ровнителем" daughter>
        <Input
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
          value={floor.firstAlign.length}
          onChange={handleChange("firstAlign", "length")}
        />
        <Input
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещния"
          value={floor.firstAlign.width}
          onChange={handleChange("firstAlign", "width")}
        />
        <Input
          type="number"
          label="Толщина  слоя, см"
          placeholder="Введите толщину слоя"
          value={floor.firstAlign.thick}
          onChange={handleChange("firstAlign", "thick")}
        />
        <Select
          label="Материал"
          value={floor.firstAlign.material}
          options={typePrice}
          onChange={handleChange("firstAlign", "material")}
        />
      </Accordion>
      <Accordion title="Выравнивание полов финишным ровнителем" daughter>
        <Input
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
          value={floor.finishAlign.length}
          onChange={handleChange("finishAlign", "length")}
        />
        <Input
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещения"
          value={floor.finishAlign.width}
          onChange={handleChange("finishAlign", "width")}
        />
        <Input
          type="number"
          label="Толщина  слоя, см"
          placeholder="Введите толщину слоя"
          value={floor.finishAlign.thick}
          onChange={handleChange("finishAlign", "thick")}
        />
        <Select
          label="Материал"
          value={floor.finishAlign.material}
          options={typePrice}
          onChange={handleChange("finishAlign", "material")}
        />
      </Accordion>
    </Accordion>
  );
};
