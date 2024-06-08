"use client";
import {useState, useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";
import {Accordion} from "../accordion/accordion";
import {Input} from "../input/input";
import {Select} from "../select/select";
import {setTotalPrice} from "../../../store/total";
import {price, typePrice} from "../../constants";

export const GypsumLayer = () => {
  const dispatch = useDispatch();
  const initialData = useMemo(() => {
    const storedData = localStorage.getItem("dataBuild");
    return storedData ? JSON.parse(storedData) : {};
  }, []);

  const [layers, setLayers] = useState({
    stucco: {
      nameJob: initialData.layers?.stucco?.nameJob || "Штукатурка поверхности",
      square: initialData.layers?.stucco?.square || "",
      think: initialData.layers?.stucco?.think || "",
      material: initialData.layers?.stucco?.material || "",
      priceMaterial: initialData.layers?.stucco?.priceMaterial || "",
      priceJob: initialData.layers?.stucco?.priceJob || "",
    },
    putty: {
      nameJob: initialData.layers?.putty?.nameJob || "Шпаклевка поверхности",
      square: initialData.layers?.putty?.square || "",
      think: initialData.layers?.putty?.think || "",
      material: initialData.layers?.putty?.material || "",
      priceMaterial: initialData.layers?.putty?.priceMaterial || "",
      priceJob: initialData.layers?.putty?.priceJob || "",
    },
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceStuccoMaterial: layers.stucco.priceMaterial,
        priceStuccoJob: layers.stucco.priceJob,
        pricePuttyMaterial: layers.putty.priceMaterial,
        pricePuttyJob: layers.putty.priceJob,
      })
    );
  }, [
    layers.stucco.priceMaterial,
    layers.stucco.priceJob,
    layers.putty.priceMaterial,
    layers.putty.priceJob,
    dispatch,
  ]);

  useEffect(() => {
    const calculatePrice = (square, think, obj, val, job) => {
      let priceJob = 0;
      let priceMaterial = 0;
      square = parseFloat(square);
      think = parseFloat(think);
      if (val == 0 || square == 0 || think == 0) {
        priceMaterial = 0;
        priceJob = 0;
      } else {
        let amount = 0.03 * square * think;
        priceMaterial = amount * price[obj][val];
        priceJob = price[job] * square;

        // Округление цены в зависимости от материала
        const roundPrice = (value, step) => Math.round(value / step) * step;
        if (obj === "materialStucco" || obj === "materialPutty") {
          if (val === "cheap") {
            priceMaterial = roundPrice(priceMaterial, 336);
            priceJob = roundPrice(priceJob, 336);
          } else if (val === "medium") {
            priceMaterial = roundPrice(priceMaterial, 433);
            priceJob = roundPrice(priceJob, 433);
          } else if (val === "expensive") {
            priceMaterial = roundPrice(priceMaterial, 576);
            priceJob = roundPrice(priceJob, 576);
          }
        }
      }
      return {priceMaterial, priceJob};
    };

    const {stucco, putty} = layers;

    if (stucco.square && stucco.think && stucco.material) {
      const {priceMaterial: priceMaterialStucco, priceJob: priceJobStucco} =
        calculatePrice(
          stucco.square,
          stucco.think,
          "materialStucco",
          stucco.material,
          "jobStucco"
        );
      if (
        priceMaterialStucco !== layers.stucco.priceMaterial ||
        priceJobStucco !== layers.stucco.priceJob
      ) {
        setLayers((prevState) => ({
          ...prevState,
          stucco: {
            ...prevState["stucco"],
            priceMaterial: priceMaterialStucco,
            priceJob: priceJobStucco,
          },
        }));
      }
    }
    if (putty.square && putty.think && putty.material) {
      const {priceMaterial: priceMaterialPutty, priceJob: priceJobPutty} =
        calculatePrice(
          putty.square,
          putty.think,
          "materialPutty",
          putty.material,
          "jobPutty"
        );

      if (
        priceMaterialPutty !== layers.putty.priceMaterial ||
        priceJobPutty !== layers.putty.priceJob
      ) {
        setLayers((prevState) => ({
          ...prevState,
          putty: {
            ...prevState["putty"],
            priceMaterial: priceMaterialPutty,
            priceJob: priceJobPutty,
          },
        }));
      }
    }
  }, [
    layers.stucco.square,
    layers.stucco.think,
    layers.stucco.material,
    layers.putty.square,
    layers.putty.think,
    layers.putty.material,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      layers: layers,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, layers]);

  const handleChange = (form, field) => (e) => {
    const {value} = e.target;
    setLayers((prevState) => ({
      ...prevState,
      [form]: {
        ...prevState[form],
        [field]: value || 0,
      },
    }));
  };

  return (
    <Accordion title="Подготовка поверхности" src="/suspendedCeiling.jpg" main>
      <Accordion title="Штукатурка поверхности" daughter>
        <Input
          name="stuccoSquare"
          type="number"
          label="Площадь поверхности, м²"
          placeholder="Введите площадь поверхности"
          value={layers.stucco.square}
          onChange={handleChange("stucco", "square")}
        />
        <Input
          name="stuccoThink"
          type="number"
          label="Толщина слоя, мм"
          placeholder="Введите толщину слоя"
          value={layers.stucco.think}
          onChange={handleChange("stucco", "think")}
        />
        <Select
          name="stuccoMaterial"
          label="Материал"
          value={layers.stucco.material}
          options={typePrice}
          onChange={handleChange("stucco", "material")}
        />
      </Accordion>
      <Accordion title="Шпаклевка поверхности" daughter>
        <Input
          name="puttySquare"
          type="number"
          label="Площадь поверхности, м²"
          placeholder="Введите площадь поверхности"
          value={layers.putty.square}
          onChange={handleChange("putty", "square")}
        />
        <Input
          name="puttyThink"
          type="number"
          label="Толщина слоя, мм"
          placeholder="Введите толщину слоя"
          value={layers.putty.think}
          onChange={handleChange("putty", "think")}
        />
        <Select
          name="puttyMaterial"
          label="Материал"
          value={layers.putty.material}
          options={typePrice}
          onChange={handleChange("putty", "material")}
        />
      </Accordion>
    </Accordion>
  );
};
