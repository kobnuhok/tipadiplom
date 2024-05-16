"use client";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { useState, useEffect } from "react";

export const WallCladding = () => {
  const storedData = localStorage.getItem("dataBuild");
  const initialData = storedData ? JSON.parse(storedData) : {};

  const [wallCladding, setWallCladding] = useState({
    tileWallArea: initialData.wallCladding?.tileWallArea || "",
    claddingArea: initialData.wallCladding?.claddingArea || "",
    tileWallAreaMaterial: initialData.wallCladding?.tileWallAreaMaterial || "",
    claddingAreaMaterial: initialData.wallCladding?.claddingAreaMaterial || "",
  });

  useEffect(() => {
    const updatedData = {
      ...initialData,
      wallCladding: wallCladding,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [wallCladding]);

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
          value={wallCladding.claddingAreaMaterial}
          onChange={handleInputChange}
        />
      </Accordion>
    </Accordion>
  );
};
