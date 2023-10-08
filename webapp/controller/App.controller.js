sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("players.controller.App", {
        onInit() {
          this.getOwnerComponent().getModel().attachRequestFailed(this.handleBackendUnavailable);
        },
        handleBackendUnavailable: function (event) {
          const oRouter = this.getOwnerComponent().getRouter();
          
          oRouter.navTo("RouteUnavailable");
        }
      });
    }
  );
  