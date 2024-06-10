"use client";

import {useState, useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";
import {Accordion} from "../accordion/accordion";
import {Input} from "../input/input";
import {Select} from "../select/select";
import {setTotalPrice} from "../../../store/total";
import {price, typePrice} from "../../constants";

export const WallpaperWorks = () => {
  const dispatch = useDispatch();

  const initialData = useMemo(() => {
    const storedData = localStorage.getItem("dataBuild");
    return storedData ? JSON.parse(storedData) : {};
  }, []);

  const [room, setRoom] = useState({
    wallpapering: {
      nameJob: initialData.room?.wallpapering?.nameJob || "Оклеивание обоями",
      length: initialData.room?.wallpapering?.length || "",
      width: initialData.room?.wallpapering?.width || "",
      height: initialData.room?.wallpapering?.height || "",
      material: initialData.room?.wallpapering?.material || "cheap",
      priceMaterial: initialData.room?.wallpapering?.priceMaterial || 0,
      priceJob: initialData.room?.wallpapering?.priceJob || 0,
    },
  });

  useEffect(() => {
    dispatch(
      setTotalPrice({
        priceWallpaperingMaterial: room.wallpapering.priceMaterial,
        priceWallpaperingJob: room.wallpapering.priceJob,
      })
    );
  }, [room.wallpapering.priceMaterial, room.wallpapering.priceJob, dispatch]);

  const calculateWallpaper = (length, width, height, material) => {
    const perimeter = 2 * (parseFloat(length) + parseFloat(width));
    const wallArea = perimeter * parseFloat(height);
    const rollArea = 10.05 * 1.06;

    const rollsCount = Math.ceil(wallArea / rollArea);

    const priceMaterial = rollsCount * (price.materialWallpaper[material] || 0);
    const priceJob = rollsCount * price.jobWallpaper;

    return {priceMaterial, priceJob};
  };

  useEffect(() => {
    const {length, width, height, material} = room.wallpapering;

    if (length && width && height && material) {
      const {priceMaterial, priceJob} = calculateWallpaper(
        length,
        width,
        height,
        material
      );

      if (
        priceMaterial !== room.wallpapering.priceMaterial ||
        priceJob !== room.wallpapering.priceJob
      ) {
        setRoom((prevState) => ({
          ...prevState,
          wallpapering: {
            ...prevState.wallpapering,
            priceMaterial: priceMaterial,
            priceJob: priceJob,
          },
        }));
      }
    }
  }, [
    room.wallpapering.length,
    room.wallpapering.width,
    room.wallpapering.height,
    room.wallpapering.material,
  ]);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      room: room,
    };
    localStorage.setItem("dataBuild", JSON.stringify(updatedData));
  }, [initialData, room]);

  const handleChange = (field) => (e) => {
    const {value} = e.target;
    setRoom((prevState) => ({
      ...prevState,
      wallpapering: {
        ...prevState.wallpapering,
        [field]: value || 0,
      },
    }));
  };

  return (
    <Accordion title="Оклеивание обоями" src="/wallpaper.jpg" main>
      <Accordion title="Расчет обоев" daughter>
        <Input
          type="number"
          label="Длина помещения, м"
          placeholder="Введите длину помещения"
          value={room.wallpapering.length}
          onChange={handleChange("length")}
        />
        <Input
          type="number"
          label="Ширина помещения, м"
          placeholder="Введите ширину помещения"
          value={room.wallpapering.width}
          onChange={handleChange("width")}
        />
        <Input
          type="number"
          label="Высота стен, м"
          placeholder="Введите высоту стен"
          value={room.wallpapering.height}
          onChange={handleChange("height")}
        />
        <Select
          label="Материал"
          value={room.wallpapering.material}
          options={typePrice}
          onChange={handleChange("material")}
        />
      </Accordion>
    </Accordion>
  );
};

export default WallpaperWorks;
