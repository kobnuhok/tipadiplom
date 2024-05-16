"use client";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";

export const FloorPouring = () => {
  return (
    <Accordion
      title="Выравнивание полов и устройство стяжек"
      src="/floorPouring.jpg"
      main
    >
      <Accordion title="Выравнивание полов первичным ровнителем" daughter>
        <Input
          name="roomLength"
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
        />
        <Input
          name="roomWidth"
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещния"
        />
        <Input
          name="layerThickness"
          type="number"
          label="Толщина  слоя, см"
          placeholder="Введите толщину слоя"
        />
        <Select name="floorScreedMaterial" />
      </Accordion>
      <Accordion title="Выравнивание полов финишным ровнителем" daughter>
        <Input
          name="roomLength"
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
        />
        <Input
          name="roomWidth"
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещения"
        />
        <Input
          name="layerThickness"
          type="number"
          label="Толщина  слоя, см"
          placeholder="Введите толщину слоя"
        />
        <Select name="drywallMaterial" />
      </Accordion>
    </Accordion>
  );
};
