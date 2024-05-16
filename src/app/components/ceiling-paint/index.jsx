"use client";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";

export const CeilingPaint = () => {
  return (
    <Accordion
      title="Лакокрасочные работы для стен и потолков"
      src="/ceilPainting.jpg"
      main
    >
      <Accordion title="Расчет краски на площадь" daughter>
        <Input
          name="ceilingАrea"
          type="number"
          label="Расчет краски на площадь, м²"
          placeholder="Введите площадь"
        />
        <Input
          name="layersPaint"
          type="number"
          label="Количество слоев краски"
          placeholder="Введите количество слоев краски"
        />
        <Select name="floorScreedMaterial" />
      </Accordion>
    </Accordion>
  );
};
