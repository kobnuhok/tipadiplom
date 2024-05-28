"use client";
import { useDispatch } from "react-redux";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { useState, useEffect, useMemo } from "react";
import { price } from "../../constants";
import { setTotalPrice } from "../../../store/total";

export const WallCladding = () => {
  const dispatch = useDispatch();

  const initialData = useMemo(() => {
    const storedData = localStorage.getItem("dataBuild");
    return storedData ? JSON.parse(storedData) : {};
  }, []);

  const [wallCladding, setWallCladding] = useState({
    tileWallArea: initialData.wallCladding?.tileWallArea || "",
    claddingArea: initialData.wallCladding?.claddingArea || "",
    tileWallAreaMaterial: initialData.wallCladding?.tileWallAreaMaterial || "",
    claddingAreaMaterial: initialData.wallCladding?.claddingAreaMaterial || "",
    priceTileWallMaterial: initialData.wallCladding?.priceTileWallMaterial || 0,
    priceCladdingMaterial: initialData.wallCladding?.priceCladdingMaterial || 0,
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceTileWallMaterial: wallCladding.priceTileWallMaterial,
        priceCladdingMaterial: wallCladding.priceCladdingMaterial,
      })
    );
  }, [wallCladding, dispatch]);

  useEffect(() => {
    const {
      tileWallArea,
      tileWallAreaMaterial,
      claddingArea,
      claddingAreaMaterial,
    } = wallCladding;

    const calculatePrice = (s, obj, val) => {
      if (val == 0) {
        return 0;
      }
      return s * (price[obj][val] ? price[obj][val] : 0);
    };

    const priceTileWallMaterial = calculatePrice(
      tileWallArea,
      "materialTileWall",
      tileWallAreaMaterial
    );
    const priceCladdingMaterial = calculatePrice(
      claddingArea,
      "materialWallCladding",
      claddingAreaMaterial
    );
    if (priceTileWallMaterial !== wallCladding.priceTileWallMaterial) {
      setWallCladding((prevState) => ({
        ...prevState,
        priceTileWallMaterial: priceTileWallMaterial,
      }));
    }
    if (priceCladdingMaterial !== wallCladding.priceCladdingMaterial) {
      setWallCladding((prevState) => ({
        ...prevState,
        priceCladdingMaterial: priceCladdingMaterial,
      }));
    }
  }, [wallCladding]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      wallCladding: wallCladding,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, wallCladding]);

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setWallCladding({
      ...wallCladding, // сохраняем предыдущие значения
      [name]: value, // обновляем значение для конкретного input
    });
  };

  return (
    <Accordion title="Облицовка стен плиткой" src="/tileWall.jpg" main>
      <Accordion title="Расчет плитки облицовочной на площадь" daughter>
        <Input
          name="tileWallArea"
          type="number"
          label="Площадь облицовки, м²"
          placeholder="Введите площадь облицовки"
          value={wallCladding.tileWallArea}
          onChange={handleInputChange}
        />
        <Select
          name="tileWallAreaMaterial"
          label="Материал"
          value={wallCladding.tileWallAreaMaterial}
          onChange={handleInputChange}
        />
      </Accordion>
      <Accordion title="Расчет цементной затирки для плитки" daughter>
        <Input
          name="claddingArea"
          type="number"
          label="Площадь облицовки, м²"
          placeholder="Введите площадь облицовки"
          value={wallCladding.claddingArea}
          onChange={handleInputChange}
        />
        <Select
          name="claddingAreaMaterial"
          label="Материал"
          value={wallCladding.claddingAreaMaterial}
          onChange={handleInputChange}
        />
      </Accordion>
    </Accordion>
  );
};
