sap.ui.define(
  [
    "players/controller/BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("players.controller.Detail", {
      onInit: function () {
        this.getRouter()
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function (event) {
        const form = this.byId("smartForm");
        this._playerId = event.getParameter("arguments").id;
        this.byId("playerGeneralInformation").bindElement(
          `/AttributesSet('${this._playerId}')`
        );
        form.setEditTogglable(true);
      },

      /**
       * @override
       */
      onAfterRendering: function () {
        this.byId("smartForm").attachEditToggled(this.onEditToggled.bind(this));
      },

      onEditToggled: function (event) {
        const form = this.byId("smartForm");
        if (form.getEditable()) return;
        const bindingContext = this.byId("smartForm").getBindingContext();
        const payload = bindingContext.getObject();
        const model = this.getView().getModel();
        model.update(bindingContext.getPath(), payload, {
          success: () => {
            form.setEditable(false);
            MessageToast.show(this.getText("success"));
          },
          error: (err) => {
            form.setEditable(false);
            MessageBox.error(this.getBackendErrorMessage(err));
          },
        });
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
