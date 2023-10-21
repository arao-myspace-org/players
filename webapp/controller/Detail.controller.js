sap.ui.define(
  ["players/controller/BaseController", "sap/f/library"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary) {
    "use strict";

    return Controller.extend("players.controller.Detail", {
      onInit: function () {
        this.getRouter()
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function (event) {
        this._playerId = event.getParameter("arguments").id;
        this.byId("playerGeneralInformation").bindElement(
          `/AttributesSet('${this._playerId}')`
        );
      },

      /**
       * @override
       */

      onCloseDetailView: function () {
        const sNextLayout = this.getOwnerComponent()
          .getModel("layout")
          .getProperty("/actionButtonsInfo/midColumn/closeColumn");
        this.getRouter().navTo("RouteDetail", {
          id: this._playerId,
          layout: sNextLayout,
        });
      },
    });
  }
);
