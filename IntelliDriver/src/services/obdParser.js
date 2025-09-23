export const parseOBDResponse = (raw) => {
  const parts = raw.split(" ").slice(2).map((h) => parseInt(h, 16));

  if (raw.startsWith("41 0C") && parts.length >= 2) {
    return { type: "rpm", value: ((parts[0] * 256 + parts[1]) / 4).toFixed(0) };
  }
  if (raw.startsWith("41 0D")) {
    return { type: "speed", value: parts[0] };
  }
  if (raw.startsWith("41 05")) {
    return { type: "coolant", value: parts[0] - 40 };
  }
  if (raw.startsWith("41 2F")) {
    return { type: "fuel", value: ((100 / 255) * parts[0]).toFixed(1) };
  }

  return null;
};