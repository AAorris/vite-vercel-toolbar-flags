const toggle = (description, defaultValue) => ({
  description,
  options: [
    { value: false, name: "Off" },
    { value: true, name: "On" },
  ],
  defaultValue: defaultValue ?? false,
});

export default {
  definitions: {
    showCounter: toggle("Show the counter widget"),
  },
};
