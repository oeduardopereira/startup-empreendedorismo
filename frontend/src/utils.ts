function getRandomDecimal(min: number, max: number) {
  return Math.random() * (max - min) + min;
};

export default function generateRandomGraphColor() {
    const R = getRandomDecimal(50, 255);
    const G = getRandomDecimal(50, 255);
    const B = getRandomDecimal(50, 255);

    return {background:`rgba(${R}, ${G}, ${B}, 0.2)`, border:`rgba(${R}, ${G}, ${B}, 1)`}
}

