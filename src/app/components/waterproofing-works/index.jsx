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
    waterproofMasticArea: initialData.waterproof?.waterproofMasticArea || "",
    waterproofRollArea: initialData.waterproof?.waterproofRollArea || "",
    waterproofMasticMaterial: initialData.waterproof?.waterproofMasticMaterial,
    waterproofRollMaterial:
      initialData.waterproof?.waterproofRollMaterial || "",
    priceMasticMaterial: initialData.waterproof?.priceMasticMaterial || "",
    priceMasticJob: initialData.waterproof?.priceMasticJob || "",
    priceRollMaterial: initialData.waterproof?.priceRollMaterial || "",
    priceRollJob: initialData.waterproof?.priceRollJob || "",
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceMasticMaterial: waterproof.priceMasticMaterial,
        priceMasticJob: waterproof.priceMasticJob,
        priceRollMaterial: waterproof.priceRollMaterial,
        priceRollJob: waterproof.priceRollJob,
      })
    );
  }, [
    waterproof.priceMasticMaterial,
    waterproof.priceMasticJob,
    waterproof.priceRollMaterial,
    waterproof.priceRollJob,
    dispatch,
  ]);

  useEffect(() => {
    const calculatePrice = (pl, obj, val, job) => {
      if (val == 0) {
        return 0;
      }
      const priceJob = price[job] * pl;
      const priceMaterial = pl * price[obj][val];
      return { priceMaterial, priceJob };
    };

    const {
      waterproofMasticArea,
      waterproofRollArea,
      waterproofMasticMaterial,
      waterproofRollMaterial,
    } = waterproof;

    if (waterproofMasticArea && waterproofMasticMaterial) {
      const { priceMaterial: priceMaterialMastic, priceJob: priceJobMastic } =
        calculatePrice(
          waterproofMasticArea,
          "materialMastic",
          waterproofMasticMaterial,
          "jobWaterproof"
        );

      if (priceMaterialMastic !== waterproof.priceMasticMaterial) {
        setWaterproof((prevState) => ({
          ...prevState,
          priceMasticMaterial: priceMaterialMastic,
        }));
      }
      if (priceJobMastic !== waterproof.priceMasticJob) {
        setWaterproof((prevState) => ({
          ...prevState,
          priceMasticJob: priceJobMastic,
        }));
      }
    }
    if (waterproofRollArea && waterproofRollMaterial) {
      const { priceMaterial: priceMaterialRoll, priceJob: priceJobRoll } =
        calculatePrice(
          waterproofRollArea,
          "materialRoll",
          waterproofRollMaterial,
          "jobWaterproof"
        );

      if (priceMaterialRoll !== waterproof.priceRollMaterial) {
        setWaterproof((prevState) => ({
          ...prevState,
          priceRollMaterial: priceMaterialRoll,
        }));
      }
      if (priceJobRoll !== waterproof.priceRollJob) {
        setWaterproof((prevState) => ({
          ...prevState,
          priceRollJob: priceJobRoll,
        }));
      }
    }
  }, [
    waterproof.waterproofMasticArea,
    waterproof.waterproofRollArea,
    waterproof.waterproofMasticMaterial,
    waterproof.waterproofRollMaterial,
    waterproof.priceMasticMaterial,
    waterproof.priceMasticJob,
    waterproof.priceRollMaterial,
    waterproof.priceRollJob,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      waterproof: waterproof,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, waterproof]);

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setWaterproof({
      ...waterproof, // сохраняем предыдущие значения
      [name]: value, // обновляем значение для конкретного input
    });
  };

  return (
    <Accordion
      title="Гидроизоляционные работы"
      src="/waterproofing-works.png"
      main
    >
      <Accordion title="Гидроизоляция мастикой на битумной основе" daughter>
        <Input
          name="waterproofMasticArea"
          type="number"
          label="Площадь гидроизолируемой поверхности, м²"
          placeholder="Введите площадь гидроизолируемой поверхности"
          value={waterproof.waterproofMasticArea}
          onChange={handleInputChange}
        />
        <Select
          name="waterproofMasticMaterial"
          label="Материал"
          value={waterproof.waterproofMasticMaterial}
          options={typePrice}
          onChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Гидроизоляция рулонными материалами" daughter>
        <Input
          name="waterproofRollArea"
          type="number"
          label="Площадь гидроизолируемой поверхности, м²"
          placeholder="Введите площадь гидроизолируемой поверхности"
          value={waterproof.waterproofRollArea}
          onChange={handleInputChange}
        />
        <Select
          name="waterproofRollMaterial"
          label="Материал"
          value={waterproof.waterproofRollMaterial}
          options={typePrice}
          onChange={handleInputChange}
        />
      </Accordion>
    </Accordion>
  );
};
