export const price = {
  materialTileWall: {
    cheap: 475,
    optimal: 787,
    expensive: 1195,
  },
  jobTileWall: 750,
  materialWallCladding: {
    cheap: 367,
    optimal: 516,
    expensive: 611,
  },
  jobWallCladding: 730,
  materialDrywall: {
    cheap: 331,
    optimal: 342,
    expensive: 368,
  },
  jobDrywall: 650,
  materialDrywallProfileWidth: {
    50: {
      cheap: 203,
      optimal: 268,
      expensive: 327,
    },
    75: { cheap: 259, optimal: 380, expensive: 476 },
    100: { cheap: 299, optimal: 461, expensive: 539 },
  },

  materialPlaster: {
    cheap: 331,
    optimal: 342,
    expensive: 368,
  },
  jobPlaster: 330,
  materialMastic: {
    cheap: 1287,
    optimal: 1918,
    expensive: 4650,
  },
  jobWaterproof: 80,
  materialRoll: {
    cheap: 1499,
    optimal: 2400,
    expensive: 2946,
  },
  materialFirstAlign: {
    cheap: 239,
    optimal: 399,
    expensive: 799,
  },
  jobFirstAlign: 340,
  materialSecondAlign: {
    cheap: 272,
    optimal: 459,
    expensive: 799,
  },
  jobSecondAlign: 130,
  materialPaint: {
    cheap: 1272,
    optimal: 3335,
    expensive: 7048,
  },
  jobPaint: 150,
};

export const typePrice = [
  {
    label: "Не выбрано",
    value: "0",
  },
  {
    label: "Дешевый",
    value: "cheap",
  },
  {
    label: "Оптимальный",
    value: "optimal",
  },
  {
    label: "Дорогой",
    value: "expensive",
  },
];

export const optionsDrywallProfileWidth = [
  {
    label: "Не выбрано",
    value: 0,
  },
  {
    label: "Ширина профиля 50",
    value: 50,
  },
  {
    label: "ширина профиля 75",
    value: 75,
  },
  {
    label: "ширина профиля 100",
    value: 100,
  },
];
