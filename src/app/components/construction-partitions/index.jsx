"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { setTotalPrice } from "../../../store/total";
import { price, typePrice } from "../../constants";

export const ConstructionPartitions = () => {
  const dispatch = useDispatch();

  const initialData = useMemo(() => {
    const storedData = localStorage.getItem("dataBuild");
    return storedData ? JSON.parse(storedData) : {};
  }, []);

  const [walls, setWalls] = useState({
    drywallLength: initialData.walls?.drywallLength || "",
    drywallHeight: initialData.walls?.drywallHeight || "",
    drywallAreaMaterial: initialData.walls?.drywallAreaMaterial || "",
    priceDrywallMaterial: initialData.walls?.priceDrywallMaterial || "",
    priceDrywallJob: initialData.walls?.priceDrywallJob || "",
    plasterLength: initialData.walls?.plasterLength || "",
    plasterHeight: initialData.walls?.plasterHeight || "",
    plasterAreaMaterial: initialData.walls?.plasterAreaMaterial || "",
    pricePlasterMaterial: initialData.walls?.pricePlasterMaterial || "",
    pricePlasterJob: initialData.walls?.pricePlasterJob || "",
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceDrywallMaterial: walls.priceDrywallMaterial,
        priceDrywallJob: walls.priceDrywallJob,
        pricePlasterMaterial: walls.pricePlasterMaterial,
        pricePlasterJob: walls.pricePlasterJob,
      })
    );
  }, [
    walls.priceDrywallJob,
    walls.priceDrywallMaterial,
    walls.pricePlasterMaterial,
    walls.pricePlasterJob,
    dispatch,
  ]);

  useEffect(() => {
    const calculatePrice = (len, h, obj, val, job) => {
      if (val == 0) {
        return 0;
      }
      let pl = Math.ceil((len * h * 2) / 3);
      const priceJob = price[job] * pl;
      const priceMaterial = pl * price[obj][val];
      return { priceMaterial, priceJob };
    };

    const {
      drywallLength,
      drywallHeight,
      drywallAreaMaterial,
      plasterLength,
      plasterHeight,
      plasterAreaMaterial,
    } = walls;

    if (drywallLength && drywallHeight && drywallAreaMaterial) {
      const { priceMaterial: priceMaterialDrywall, priceJob: priceJobDrywall } =
        calculatePrice(
          drywallLength,
          drywallHeight,
          "materialDrywall",
          drywallAreaMaterial,
          "jobDrywall"
        );

      if (priceMaterialDrywall !== walls.priceDrywallMaterial) {
        setWalls((prevState) => ({
          ...prevState,
          priceDrywallMaterial: priceMaterialDrywall,
        }));
      }
      if (priceJobDrywall !== walls.priceDrywallJob) {
        setWalls((prevState) => ({
          ...prevState,
          priceDrywallJob: priceJobDrywall,
        }));
      }
    }
    if (plasterLength && plasterHeight && plasterAreaMaterial) {
      const { priceMaterial: priceMaterialPlaster, priceJob: priceJobPlaster } =
        calculatePrice(
          plasterLength,
          plasterHeight,
          "materialPlaster",
          plasterAreaMaterial,
          "jobPlaster"
        );

      if (priceMaterialPlaster !== walls.pricePlasterMaterial) {
        setWalls((prevState) => ({
          ...prevState,
          pricePlasterMaterial: priceMaterialPlaster,
        }));
      }
      if (priceJobPlaster !== walls.pricePlasterJob) {
        setWalls((prevState) => ({
          ...prevState,
          pricePlasterJob: priceJobPlaster,
        }));
      }
    }
  }, [
    walls.drywallLength,
    walls.drywallHeight,
    walls.drywallAreaMaterial,
    walls.priceDrywallMaterial,
    walls.priceDrywallJob,
    walls.plasterLength,
    walls.plasterHeight,
    walls.plasterAreaMaterial,
    walls.pricePlasterMaterial,
    walls.pricePlasterJob,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      walls: walls,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, walls]);

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setWalls({
      ...walls, // сохраняем предыдущие значения
      [name]: value, // обновляем значение для конкретного input
    });
  };

  return (
    <Accordion
      title="Возведение стен и перегородок из листовых материалов"
      src="/wall-construction.png"
      main
    >
      <Accordion title="Возведение перегордок из гипсокартона" daughter>
        <Input
          name="drywallLength"
          type="number"
          label="Длина перегородки, м"
          placeholder="Введите длину перегородки"
          value={walls.drywallLength}
          onChange={handleInputChange}
        />
        <Input
          name="drywallHeight"
          type="number"
          label="Высота перегородки, м"
          placeholder="Введите высоту перегородки"
          value={walls.drywallHeight}
          onChange={handleInputChange}
        />
        <Select
          name="drywallAreaMaterial"
          label="Материал"
          value={walls.drywallAreaMaterial}
          options={typePrice}
          onChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Облицовка стен гипсокартоном на каркасе" daughter>
        <Input
          name="plasterLength"
          type="number"
          label="Общая длина стен, м"
          placeholder="Введите общую длину стен"
          value={walls.plasterLength}
          onChange={handleInputChange}
        />
        <Input
          name="plasterHeight"
          type="number"
          label="Высота стен, м"
          placeholder="Введите высоту стен"
          value={walls.plasterHeight}
          onChange={handleInputChange}
        />
        <Select
          name="plasterAreaMaterial"
          label="Материал"
          value={walls.plasterAreaMaterial}
          options={typePrice}
          onChange={handleInputChange}
        />
      </Accordion>
    </Accordion>
  );
};
