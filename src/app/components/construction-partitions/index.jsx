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
    drywall: {
      nameJob:
        initialData.walls?.drywall?.nameJob ||
        "Возведение перегордок из гипсокартона",
      length: initialData.walls?.drywall?.length || "",
      height: initialData.walls?.drywall?.height || "",
      material: initialData.walls?.drywall?.material || "",
      priceMaterial: initialData.walls?.drywall?.priceMaterial || "",
      priceJob: initialData.walls?.drywall?.priceJob || "",
    },
    plaster: {
      nameJob:
        initialData.walls?.nameJob || "Облицовка стен гипсокартоном на каркасе",
      length: initialData.walls?.length || "",
      height: initialData.walls?.height || "",
      material: initialData.walls?.material || "",
      priceMaterial: initialData.walls?.priceMaterial || "",
      priceJob: initialData.walls?.priceJob || "",
    },
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceDrywallMaterial: walls.drywall.priceMaterial,
        priceDrywallJob: walls.drywall.priceJob,
        pricePlasterMaterial: walls.plaster.priceMaterial,
        pricePlasterJob: walls.plaster.priceJob,
      })
    );
  }, [
    walls.drywall.priceMaterial,
    walls.drywall.priceJob,
    walls.plaster.priceMaterial,
    walls.plaster.priceJob,
    dispatch,
  ]);

  useEffect(() => {
    const calculatePrice = (len, h, obj, val, job) => {
      let priceJob = 0;
      let priceMaterial = 0;
      if (val == 0 || len == "0" || h == "0") {
        priceMaterial = 0;
        priceJob = 0;
      } else {
        let pl = Math.ceil((len * h * 2) / 3);
        priceJob = price[job] * pl;
        priceMaterial = pl * price[obj][val];
      }
      return { priceMaterial, priceJob };
    };

    const { drywall, plaster } = walls;

    if (drywall.length && drywall.height && drywall.material) {
      const { priceMaterial: priceMaterialDrywall, priceJob: priceJobDrywall } =
        calculatePrice(
          drywall.length,
          drywall.height,
          "materialDrywall",
          drywall.material,
          "jobDrywall"
        );
      if (priceMaterialDrywall !== walls.drywall.priceMaterial) {
        setWalls((prevState) => ({
          ...prevState,
          drywall: {
            ...prevState["drywall"],
            priceMaterial: priceMaterialDrywall,
          },
        }));
      }
      if (priceJobDrywall !== walls.drywall.priceJob) {
        setWalls((prevState) => ({
          ...prevState,
          drywall: {
            ...prevState["drywall"],
            priceJob: priceJobDrywall,
          },
        }));
      }
    }
    if (plaster.length && plaster.height && plaster.material) {
      const { priceMaterial: priceMaterialPlaster, priceJob: priceJobPlaster } =
        calculatePrice(
          plaster.length,
          plaster.height,
          "materialPlaster",
          plaster.material,
          "jobPlaster"
        );

      if (priceMaterialPlaster !== walls.plaster.priceMaterial) {
        setWalls((prevState) => ({
          ...prevState,
          plaster: {
            ...prevState["plaster"],
            priceMaterial: priceMaterialPlaster,
          },
        }));
      }
      if (priceJobPlaster !== walls.plaster.priceJob) {
        setWalls((prevState) => ({
          ...prevState,
          plaster: {
            ...prevState["plaster"],
            priceJob: priceJobPlaster,
          },
        }));
      }
    }
  }, [
    walls.drywall.length,
    walls.drywall.height,
    walls.drywall.material,
    walls.plaster.length,
    walls.plaster.height,
    walls.plaster.material,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      walls: walls,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, walls]);

  const handleChange = (form, field) => (e) => {
    const { value } = e.target;
    setWalls((prevState) => ({
      ...prevState,
      [form]: {
        ...prevState[form],
        [field]: value || 0,
      },
    }));
  };

  return (
    <Accordion
      title="Возведение стен и перегородок из листовых материалов"
      src="/wall-construction.png"
      main
    >
      <Accordion title="Возведение перегордок из гипсокартона" daughter>
        <Input
          type="number"
          label="Длина перегородки, м"
          placeholder="Введите длину перегородки"
          value={walls.drywall.length}
          onChange={handleChange("drywall", "length")}
        />
        <Input
          type="number"
          label="Высота перегородки, м"
          placeholder="Введите высоту перегородки"
          value={walls.drywall.height}
          onChange={handleChange("drywall", "height")}
        />
        <Select
          label="Материал"
          value={walls.drywall.material}
          options={typePrice}
          onChange={handleChange("drywall", "material")}
        />
      </Accordion>
      <Accordion title="Облицовка стен гипсокартоном на каркасе" daughter>
        <Input
          type="number"
          label="Общая длина стен, м"
          placeholder="Введите общую длину стен"
          value={walls.plaster.length}
          onChange={handleChange("plaster", "length")}
        />
        <Input
          type="number"
          label="Высота стен, м"
          placeholder="Введите высоту стен"
          value={walls.plaster.height}
          onChange={handleChange("plaster", "height")}
        />
        <Select
          label="Материал"
          value={walls.plaster.material}
          options={typePrice}
          onChange={handleChange("plaster", "material")}
        />
      </Accordion>
    </Accordion>
  );
};
