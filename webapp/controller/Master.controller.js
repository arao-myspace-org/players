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
          });
        this.getView().addDependent(this.addDialog);
        this.addDialog.open();
      },
    });
  }
);
