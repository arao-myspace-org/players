sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("players.controller.BaseController", {
    getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },
    getText: function (key, params = []) {
      const resourceBundle = this.getOwnerComponent()
        .getModel("i18n")
        .getResourceBundle();
      return resourceBundle.getText(key, params);
    },
    getBackendErrorMessage: function (err) {
      return JSON.parse(err.responseText).error.message.value;
    },
  });
});
