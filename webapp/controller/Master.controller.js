sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/f/library", "sap/ui/core/Fragment"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary, Fragment) {
    "use strict";

    return Controller.extend("players.controller.Master", {
      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteMain")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function () {},

      onItemPress: function (item) {
        const FCL = this.getView().getParent().getParent();
        FCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
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
