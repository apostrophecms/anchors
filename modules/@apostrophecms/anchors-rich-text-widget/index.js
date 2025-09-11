module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    anchors: false
  },
  methods(self) {
    return {
      async annotateWidgetForExternalFront() {
        return {
          anchorAttribute: self.options.anchorAttribute,
          anchors: self.options.anchors,
          anchorDefault: self.options.anchorDefault
        };
      }
    };
  }
};
