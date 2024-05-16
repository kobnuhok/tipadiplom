"use client";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";

export const SuspendedCeiling = () => {
  return (
    <Accordion
      title="Монтаж подвесного потолка"
      src="/suspendedCeiling.jpg"
      main
    >
      <Accordion title="Подвесной потолок из ГКЛ на металлическом каркасе" daughter>
        <Input
          name="ceilingLength"
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
        />
        <Input
          name="ceilingLength"
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещния"
        />
        <Input
          name="indentCeiling"
          type="number"
          label="Отступ от перекрытия, см"
          placeholder="Отступ от перекрытия"
        />
        <Select name="floorScreedMaterial" />
      </Accordion>
      <Accordion title="Потолок Армстронг с кассетой 600 х 600 мм" daughter>
        <Input
          name="armstrong600Length"
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
        />
        <Input
          name="armstrong600Height"
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещения"
        />
        <Select name="drywallMaterial" />
      </Accordion>
    </Accordion>
  );
};
