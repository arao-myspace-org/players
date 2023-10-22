sap.ui.define(
  [
    "players/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("players.controller.Master", {
      onInit: function () {
        // this.getRouter()
        //   .getRoute("RouteMain")
        //   .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function () {},

      onItemPress: function (event) {
        const oNextUIState = this.getOwnerComponent()
          .getHelper()
          .getNextUIState(1);

        this.getRouter().navTo("RouteDetail", {
          id: event.getParameter("listItem").getBindingContext().getObject()
            .player_id,
          layout: oNextUIState.layout,
        });
      },
      onAdd: async function () {
        if (!this.addDialog)
          this.addDialog = await Fragment.load({
            id: this.getView().getId(),
            name: "players.view.fragment.Add",
            controller: this,
          });
        this.byId("smartForm").setEditable(true);
        this.getView().addDependent(this.addDialog);
        const oBindingContext = this.getView()
          .getModel()
          .createEntry("/AttributesSet");
        this.addDialog.setBindingContext(oBindingContext);
        this.addDialog.open();
      },
      handleEditToggled: function (event) {
        if (event.getParameter("editable")) return;
        const payload = event.getSource().getBindingContext().getObject();
        const model = this.getView().getModel();
        model.create("/AttributesSet", payload, {
          success: () => {
            this.addDialog.close();
            MessageToast.show(this.getText("success"));
          },
          error: (err) => {
            this.addDialog.close();
            MessageBox.error(this.getBackendErrorMessage(err));
          },
        });
      },
    });
  }
);
