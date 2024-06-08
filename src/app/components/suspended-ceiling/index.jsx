"use client";
import {useDispatch} from "react-redux";
import {Accordion} from "../accordion/accordion";
import {Input} from "../input/input";
import {Select} from "../select/select";
import {useState, useEffect, useMemo} from "react";
import {price, typePrice} from "../../constants";
import {setTotalPrice} from "../../../store/total";

export const SuspendedCeiling = () => {
  const dispatch = useDispatch();
  const initialData = useMemo(() => {
    const storedData = localStorage.getItem("dataBuild");
    return storedData ? JSON.parse(storedData) : {};
  }, []);

  const [ceiling, setCeiling] = useState({
    gkl: {
      nameJob:
        initialData.ceiling?.gkl?.nameJob ||
        "Подвесной потолок из гипсокартона",
      length: initialData.ceiling?.gkl?.length || "",
      height: initialData.ceiling?.gkl?.height || "",
      material: initialData.ceiling?.gkl?.material || "",
      priceMaterial: initialData.ceiling?.gkl?.priceMaterial || "",
      priceJob: initialData.ceiling?.gkl?.priceJob || "",
    },
    armstrong: {
      nameJob:
        initialData.ceiling?.armstrong?.nameJob ||
        "Подвесной потолок армстронг",
      length: initialData.ceiling?.armstrong?.length || "",
      height: initialData.ceiling?.armstrong?.height || "",
      material: initialData.ceiling?.armstrong?.material || "",
      priceMaterial: initialData.ceiling?.armstrong?.priceMaterial || "",
      priceJob: initialData.ceiling?.armstrong?.priceJob || "",
    },
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceGklMaterial: ceiling.gkl.priceMaterial,
        priceGklJob: ceiling.gkl.priceJob,
        priceArmstrongMaterial: ceiling.armstrong.priceMaterial,
        priceArmstrongJob: ceiling.armstrong.priceJob,
      })
    );
  }, [
    ceiling.gkl.priceMaterial,
    ceiling.gkl.priceJob,
    ceiling.armstrong.priceMaterial,
    ceiling.armstrong.priceJob,
    dispatch,
  ]);

  useEffect(() => {
    const calculatePrice = (len, h, obj, val, job) => {
      let priceJob = 0;
      let priceMaterial = 0;
      if (val === 0 || len === "0" || h === "0") {
        priceMaterial = 0;
        priceJob = 0;
      } else {
        const pl = Math.ceil((len * h * 2) / 3);
        priceJob = price[job] * pl;
        priceMaterial = pl * price[obj][val];
      }
      return {priceMaterial, priceJob};
    };

    const {gkl, armstrong} = ceiling;

    if (gkl.length && gkl.height && gkl.material) {
      const {priceMaterial: priceMaterialGkl, priceJob: priceJobGkl} =
        calculatePrice(
          gkl.length,
          gkl.height,
          "materialGkl",
          gkl.material,
          "jobGkl"
        );
      if (priceMaterialGkl !== ceiling.gkl.priceMaterial) {
        setCeiling((prevState) => ({
          ...prevState,
          gkl: {
            ...prevState["gkl"],
            priceMaterial: priceMaterialGkl,
          },
        }));
      }
      if (priceJobGkl !== ceiling.gkl.priceJob) {
        setCeiling((prevState) => ({
          ...prevState,
          gkl: {
            ...prevState["gkl"],
            priceJob: priceJobGkl,
          },
        }));
      }
    }
    if (armstrong.length && armstrong.height && armstrong.material) {
      const {
        priceMaterial: priceMaterialArmstrong,
        priceJob: priceJobArmstrong,
      } = calculatePrice(
        armstrong.length,
        armstrong.height,
        "materialArmstrong",
        armstrong.material,
        "jobArmstrong"
      );

      if (priceMaterialArmstrong !== ceiling.armstrong.priceMaterial) {
        setCeiling((prevState) => ({
          ...prevState,
          armstrong: {
            ...prevState["armstrong"],
            priceMaterial: priceMaterialArmstrong,
          },
        }));
      }
      if (priceJobArmstrong !== ceiling.armstrong.priceJob) {
        setCeiling((prevState) => ({
          ...prevState,
          armstrong: {
            ...prevState["armstrong"],
            priceJob: priceJobArmstrong,
          },
        }));
      }
    }
  }, [
    ceiling.gkl.length,
    ceiling.gkl.height,
    ceiling.gkl.material,
    ceiling.armstrong.length,
    ceiling.armstrong.height,
    ceiling.armstrong.material,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      ceiling: ceiling,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, ceiling]);

  const handleChange = (form, field) => (e) => {
    const {value} = e.target;
    setCeiling((prevState) => ({
      ...prevState,
      [form]: {
        ...prevState[form],
        [field]: value || 0,
      },
    }));
  };

  return (
    <Accordion
      title="Монтаж подвесного потолка"
      src="/suspendedCeiling.jpg"
      main
    >
      <Accordion
        title="Подвесной потолок из ГКЛ на металлическом каркасе"
        daughter
      >
        <Input
          name="gklLength"
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
          value={ceiling.gkl.length}
          onChange={handleChange("gkl", "length")}
        />
        <Input
          name="gklHeight"
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещения"
          value={ceiling.gkl.height}
          onChange={handleChange("gkl", "height")}
        />
        <Select
          name="gklMaterial"
          label="Материал"
          value={ceiling.gkl.material}
          options={typePrice}
          onChange={handleChange("gkl", "material")}
        />
      </Accordion>
      <Accordion title="Потолок Армстронг с кассетой 600 х 600 мм" daughter>
        <Input
          name="armstrongLength"
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
          value={ceiling.armstrong.length}
          onChange={handleChange("armstrong", "length")}
        />
        <Input
          name="armstrongHeight"
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещения"
          value={ceiling.armstrong.height}
          onChange={handleChange("armstrong", "height")}
        />
        <Select
          name="armstrongMaterial"
          label="Материал"
          value={ceiling.armstrong.material}
          options={typePrice}
          onChange={handleChange("armstrong", "material")}
        />
      </Accordion>
    </Accordion>
  );
};
