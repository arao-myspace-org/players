sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("players.controller.BaseController", {
    getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },
  });
});
