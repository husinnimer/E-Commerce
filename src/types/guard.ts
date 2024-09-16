const guard = (value: unknown): value is string => {
  return typeof value === "string";
};

export { guard };
