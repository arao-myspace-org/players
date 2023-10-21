sap.ui.define(
  [
    "players/controller/BaseController",
    "sap/f/library",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary, Fragment) {
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
            name: "players.view.fragment.Add",
            controller: this,
          });
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
        const fields = event.getSource().getSmartFields();
        fields.forEach((field) => {
          const path = field.getBinding("value").getPath();
          payload[path] = field.getValue();
        });
        model.create("/AttributesSet", payload, {
          success: (res) => {
            console.log(res);
          },
          error: (err) => {
            sap.m.MessageBox.error(err);
          },
        });
      },
    });
  }
);
