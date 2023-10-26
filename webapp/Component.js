/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "players/model/models",
    "sap/base/util/UriParameters",
    "sap/f/library",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
  ],
  function (
    UIComponent,
    Device,
    models,
    UriParameters,
    library,
    FlexibleColumnLayoutSemanticHelper
  ) {
    "use strict";
    const LayoutType = library.LayoutType;

    return UIComponent.extend("players.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
        this.getModel().setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
      },
      getHelper: function () {
        const oFCL = this.getRootControl().byId("flexibleColumnLayout"),
          oParams = UriParameters.fromQuery(location.search),
          oSettings = {
            defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
            defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
            mode: oParams.get("mode"),
            maxColumnsCount: oParams.get("max"),
          };

        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(
          oFCL,
          oSettings
        );
      },
    });
  }
);
