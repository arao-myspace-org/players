sap.ui.define(
  ["players/controller/BaseController"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("players.controller.Main", {
      onInit: function () {
        this.getRouter().attachRouteMatched(this._onRouteMatched, this);
        this.getRouter().attachBeforeRouteMatched(
          this._onBeforeRouteMatched,
          this
        );
      },

      _onBeforeRouteMatched: function (oEvent) {
        var oModel = this.getOwnerComponent().getModel("layout");

        var sLayout = oEvent.getParameters().arguments.layout;

        // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
        if (!sLayout) {
          var oNextUIState = this.getOwnerComponent()
            .getHelper()
            .getNextUIState(0);
          sLayout = oNextUIState.layout;
        }

        // Update the layout of the FlexibleColumnLayout
        if (sLayout) {
          oModel.setProperty("/layout", sLayout);
        }
      },

      _onRouteMatched: function (oEvent) {
        var sRouteName = oEvent.getParameter("name"),
          oArguments = oEvent.getParameter("arguments");

        this._updateUIElements();

        // Save the current route name
        this.currentRouteName = sRouteName;
        this.currentProduct = oArguments.product;
        this.currentSupplier = oArguments.supplier;
      },

      onStateChanged: function (oEvent) {
        var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
          sLayout = oEvent.getParameter("layout");

        this._updateUIElements();

        // Replace the URL with the new layout if a navigation arrow was used
        if (bIsNavigationArrow) {
          this.oRouter.navTo(
            this.currentRouteName,
            {
              layout: sLayout,
              product: this.currentProduct,
              supplier: this.currentSupplier,
            },
            true
          );
        }
      },

      onStateChanged: function (oEvent) {
        var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
          sLayout = oEvent.getParameter("layout");

        this._updateUIElements();

        // Replace the URL with the new layout if a navigation arrow was used
        if (bIsNavigationArrow) {
          this.oRouter.navTo(
            this.currentRouteName,
            {
              layout: sLayout,
              product: this.currentProduct,
              supplier: this.currentSupplier,
            },
            true
          );
        }
      },

      _updateUIElements: function () {
        var oModel = this.getOwnerComponent().getModel("layout");
        var oUIState = this.getOwnerComponent().getHelper().getCurrentUIState();
        oModel.setData(oUIState);
      },
    });
  }
);
