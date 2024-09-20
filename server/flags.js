const toggle = (description, defaultValue) => ({
  description,
  options: [
    { value: false, label: "Off" },
    { value: true, label: "On" },
  ],
  defaultValue: defaultValue ?? false,
});

export default {
  definitions: {
    showCounter: toggle("Show the counter widget"),
    changeHeroText: {
      description: "Change the hero text",
      options: [
        { value: "Vike" },
        { value: "Vike + Toolbar" },
        { value: "Vike + Flags" },
      ],
      defaultValue: "Vike",
    },
  },
};
