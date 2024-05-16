"use client";
import { Accordion } from "../accordion/accordion";
import { Input } from "../input/input";
import { Select } from "../select/select";

export const ConstructionPartitions = () => {
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
        />
        <Input
          name="drywallHeight"
          type="number"
          label="Высота перегородки, м"
          placeholder="Введите высоту перегородки"
        />
        <Input
          name="profileWidth"
          type="number"
          label="Ширина профиля, см"
          placeholder="Введите ширину профиля"
        />
        <Select name="drywallMaterial" />
      </Accordion>
      <Accordion title="Облицовка стен гипсокартоном на каркасе" daughter>
        <Input
          name="plasterboardLength"
          type="number"
          label="Общая длина стен, м"
          placeholder="Введите общую длину стен"
        />
        <Input
          name="plasterboardHeight"
          type="number"
          label="Высота стен, м"
          placeholder="Введите высоту стен"
        />
        <Input
          name="profileWidth"
          type="number"
          label="Ширина профиля, см"
          placeholder="Введите ширину профиля"
        />
        <Select name="plasterboardCladdingMaterial" />
      </Accordion>
    </Accordion>
  );
};
