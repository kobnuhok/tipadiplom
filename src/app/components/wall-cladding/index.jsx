"use client";
import { useDispatch } from "react-redux";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { useState, useEffect, useMemo } from "react";
import { price, typePrice } from "../../constants";
import { setTotalPrice } from "../../../store/total";

export const WallCladding = () => {
  const dispatch = useDispatch();

  const initialData = useMemo(() => {
    const storedData = localStorage.getItem("dataBuild");
    return storedData ? JSON.parse(storedData) : {};
  }, []);

  const [wallCladding, setWallCladding] = useState({
    tile: {
      nameJob:
        initialData.wallCladding?.tile?.nameJob ||
        "Облицовка стен плиткой(расчет плитки)",
      area: initialData.wallCladding?.tile?.area || "",
      material: initialData.wallCladding?.tile?.material || "",
      priceMaterial: initialData.wallCladding?.tile?.priceMaterial || 0,
      priceJob: initialData.wallCladding?.tile?.priceJob || 0,
    },
    cladding: {
      nameJob:
        initialData.wallCladding?.cladding?.nameJob ||
        "Облицовка стен плиткой(расчет цементной затирки)",
      area: initialData.wallCladding?.cladding?.area || "",
      material: initialData.wallCladding?.cladding?.material || "",
      priceMaterial: initialData.wallCladding?.cladding?.priceMaterial || 0,
      priceJob: initialData.wallCladding?.cladding?.priceJob || 0,
    },
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceTileWallMaterial: wallCladding.tile.priceMaterial,
        priceTileWallJob: wallCladding.tile.priceJob,
        priceCladdingMaterial: wallCladding.cladding.priceMaterial,
        priceCladdingJob: wallCladding.cladding.priceJob,
      })
    );
  }, [
    wallCladding.tile.priceMaterial,
    wallCladding.tile.priceJob,
    wallCladding.cladding.priceMaterial,
    wallCladding.cladding.priceJob,
    dispatch,
  ]);

  useEffect(() => {
    const { tile, cladding } = wallCladding;
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

    if (cladding.area && cladding.material) {
      const { priceMaterial: priceCladMaterial, priceJob: priceCladJob } =
        calculatePrice(
          cladding.area,
          "materialWallCladding",
          cladding.material,
          "jobWallCladding"
        );
      if (priceCladMaterial !== wallCladding.cladding.priceMaterial) {
        setWallCladding((prevState) => ({
          ...prevState,
          cladding: {
            ...prevState["cladding"],
            priceJob: priceCladMaterial,
          },
        }));
      }
      if (priceCladJob !== wallCladding.cladding.priceJob) {
        setWallCladding((prevState) => ({
          ...prevState,
          cladding: {
            ...prevState["cladding"],
            priceCladdingJob: priceCladJob,
          },
        }));
      }
    }

    if (tile.area && tile.material) {
      const { priceMaterial: priceTileMaterial, priceJob: priceTileJob } =
        calculatePrice(
          tile.area,
          "materialTileWall",
          tile.material,
          "jobTileWall"
        );
      if (priceTileMaterial !== wallCladding.tile.priceMaterial) {
        setWallCladding((prevState) => ({
          ...prevState,
          tile: {
            ...prevState["tile"],
            priceMaterial: priceTileMaterial,
          },
        }));
      }
      if (priceTileJob !== wallCladding.tile.priceJob) {
        setWallCladding((prevState) => ({
          ...prevState,
          tile: {
            ...prevState["tile"],
            priceJob: priceTileJob,
          },
        }));
      }
    }
  }, [
    wallCladding.tile.area,
    wallCladding.tile.material,
    wallCladding.cladding.area,
    wallCladding.cladding.material,
    wallCladding.tile.priceMaterial,
    wallCladding.tile.priceJob,
    wallCladding.cladding.priceMaterial,
    wallCladding.cladding.priceJob,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      wallCladding: wallCladding,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, wallCladding]);

  const handleChange = (form, field) => (e) => {
    const { value } = e.target;
    setWallCladding((prevState) => ({
      ...prevState,
      [form]: {
        ...prevState[form],
        [field]: value || 0,
      },
    }));
  };

  return (
    <Accordion title="Облицовка стен плиткой" src="/tileWall.jpg" main>
      <Accordion title="Расчет плитки облицовочной на площадь" daughter>
        <Input
          type="number"
          label="Площадь облицовки, м²"
          placeholder="Введите площадь облицовки"
          value={wallCladding.tile.area}
          onChange={handleChange("tile", "area")}
        />
        <Select
          label="Материал"
          options={typePrice}
          value={wallCladding.tile.material}
          onChange={handleChange("tile", "material")}
        />
      </Accordion>
      <Accordion title="Расчет цементной затирки для плитки" daughter>
        <Input
          type="number"
          label="Площадь облицовки, м²"
          placeholder="Введите площадь облицовки"
          value={wallCladding.cladding.area}
          onChange={handleChange("cladding", "area")}
        />
        <Select
          label="Материал"
          options={typePrice}
          value={wallCladding.cladding.material}
          onChange={handleChange("cladding", "material")}
        />
      </Accordion>
    </Accordion>
  );
};
