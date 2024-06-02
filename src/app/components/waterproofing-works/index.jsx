"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { setTotalPrice } from "../../../store/total";
import { price, typePrice } from "../../constants";

export const WaterproofingWorks = () => {
  const dispatch = useDispatch();

  const initialData = useMemo(() => {
    const storedData = localStorage.getItem("dataBuild");
    return storedData ? JSON.parse(storedData) : {};
  }, []);

  const [waterproof, setWaterproof] = useState({
    mastic: {
      nameJob:
        initialData.waterproof?.mastic?.nameJob ||
        "Гидроизоляция мастикой на битумной основе",
      area: initialData.waterproof?.mastic?.area || "",
      material: initialData.waterproof?.mastic?.material || "",
      priceJob: initialData.waterproof?.mastic?.priceJob || "",
      priceMaterial: initialData.waterproof?.mastic?.priceMaterial || "",
    },
    roll: {
      nameJob:
        initialData.waterproof?.roll?.nameJob ||
        "Гидроизоляция рулонными материалами",
      area: initialData.waterproof?.roll?.area || "",
      material: initialData.waterproof?.roll?.material || "",
      priceJob: initialData.waterproof?.roll?.priceJob || "",
      priceMaterial: initialData.waterproof?.roll?.priceMaterial || "",
    },
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceMasticMaterial: waterproof.mastic.priceMaterial,
        priceMasticJob: waterproof.mastic.priceJob,
        priceRollMaterial: waterproof.roll.priceMaterial,
        priceRollJob: waterproof.roll.priceJob,
      })
    );
  }, [
    waterproof.mastic.priceMaterial,
    waterproof.mastic.priceJob,
    waterproof.roll.priceMaterial,
    waterproof.roll.priceJob,
    dispatch,
  ]);

  useEffect(() => {
    const calculatePrice = (pl, obj, val, job) => {
      let priceJob = 0;
      let priceMaterial = 0;
      if (val == 0 || pl == "0") {
        priceMaterial = 0;
        priceJob = 0;
      } else {
        priceJob = price[job] * pl;
        priceMaterial = pl * price[obj][val];
      }
      return { priceMaterial, priceJob };
    };

    const { mastic, roll } = waterproof;

    if (mastic.area && mastic.material) {
      const { priceMaterial: priceMaterialMastic, priceJob: priceJobMastic } =
        calculatePrice(
          mastic.area,
          "materialMastic",
          mastic.material,
          "jobWaterproof"
        );

      if (priceMaterialMastic !== waterproof.mastic.priceMaterial) {
        setWaterproof((prevState) => ({
          ...prevState,
          mastic: {
            ...prevState["mastic"],
            priceMaterial: priceMaterialMastic,
          },
        }));
      }
      if (priceJobMastic !== waterproof.mastic.priceJob) {
        setWaterproof((prevState) => ({
          ...prevState,
          mastic: {
            ...prevState["mastic"],
            priceJob: priceJobMastic,
          },
        }));
      }
    }
    if (roll.area && roll.material) {
      const { priceMaterial: priceMaterialRoll, priceJob: priceJobRoll } =
        calculatePrice(
          roll.area,
          "materialRoll",
          roll.material,
          "jobWaterproof"
        );

      if (priceMaterialRoll !== waterproof.roll.priceMaterial) {
        setWaterproof((prevState) => ({
          ...prevState,
          roll: {
            ...prevState["roll"],
            priceMaterial: priceMaterialRoll,
          },
        }));
      }
      if (priceJobRoll !== waterproof.roll.priceJob) {
        setWaterproof((prevState) => ({
          ...prevState,
          roll: {
            ...prevState["roll"],
            priceJob: priceJobRoll,
          },
        }));
      }
    }
  }, [
    waterproof.mastic.area,
    waterproof.mastic.material,
    waterproof.roll.area,
    waterproof.roll.material,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      waterproof: waterproof,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, waterproof]);

  const handleChange = (form, field) => (e) => {
    const { value } = e.target;
    setWaterproof((prevState) => ({
      ...prevState,
      [form]: {
        ...prevState[form],
        [field]: value || 0,
      },
    }));
  };

  return (
    <Accordion
      title="Гидроизоляционные работы"
      src="/waterproofing-works.png"
      main
    >
      <Accordion title="Гидроизоляция мастикой на битумной основе" daughter>
        <Input
          type="number"
          label="Площадь гидроизолируемой поверхности, м²"
          placeholder="Введите площадь гидроизолируемой поверхности"
          value={waterproof.mastic.area}
          onChange={handleChange("mastic", "area")}
        />
        <Select
          name="waterproofMasticMaterial"
          label="Материал"
          value={waterproof.mastic.material}
          options={typePrice}
          onChange={handleChange("mastic", "material")}
        />
      </Accordion>
      <Accordion title="Гидроизоляция рулонными материалами" daughter>
        <Input
          type="number"
          label="Площадь гидроизолируемой поверхности, м²"
          placeholder="Введите площадь гидроизолируемой поверхности"
          value={waterproof.roll.area}
          onChange={handleChange("roll", "area")}
        />
        <Select
          label="Материал"
          value={waterproof.roll.material}
          options={typePrice}
          onChange={handleChange("roll", "material")}
        />
      </Accordion>
    </Accordion>
  );
};
