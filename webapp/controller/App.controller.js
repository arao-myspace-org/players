sap.ui.define(["players/controller/BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("players.controller.App", {
    onInit() {
      this.getOwnerComponent()
        .getModel()
        .attachRequestFailed(this.handleBackendUnavailable.bind(this));
    },
    handleBackendUnavailable: function (event) {
      // const oRouter = this.getOwnerComponent().getRouter();
      // oRouter.navTo("RouteUnavailable");
    },
  });
});
