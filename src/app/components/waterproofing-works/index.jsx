"use client";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";

export const WaterproofingWorks = () => {
  return (
    <Accordion
      title="Гидроизоляционные работы"
      src="/waterproofing-works.png"
      main
    >
      <Accordion title="Гидроизоляция мастикой на битумной основе" daughter>
        <Input
          name="waterproofingMasticArea"
          type="number"
          label="Площадь гидроизолируемой поверхности, м²"
          placeholder="Введите площадь гидроизолируемой поверхности"
        />
        <Select name="drywallMaterial" />
      </Accordion>
      <Accordion title="Гидроизоляция рулонными материалами" daughter>
        <Input
          name="waterproofingRollMaterialsArea"
          type="number"
          label="Площадь гидроизолируемой поверхности, м²"
          placeholder="Введите площадь гидроизолируемой поверхности"
        />
        <Select name="drywallMaterial" />
      </Accordion>
    </Accordion>
  );
};
