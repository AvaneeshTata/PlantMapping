// const { vary } = require("express/lib/response");

sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPress: function(oEvent) {
            const url33 =this._view.getModel().sServiceUrl
                var plant_cell = oEvent.getSource().getParent().getCells()[0].getText()
            var SBG_cell = oEvent.getSource().getParent().getCells()[1].getText()
            var SBU_cell = oEvent.getSource().getParent().getCells()[2].getText()
             // Show a message toast
           
             var listreporttable = this._view.getContent()[0].getContent();
 
         
             // Generate IDs for controls
             var dialogId = sap.ui.core.Fragment.createId("id");
             var comboBoxId = sap.ui.core.Fragment.createId("comboBox");
             var formId = sap.ui.core.Fragment.createId("form");
             var saveButtonId = sap.ui.core.Fragment.createId("bd");
             var cancelButtonId = sap.ui.core.Fragment.createId("cancel");
         
             // Create a ComboBox control
             var comboBox = new sap.m.ComboBox(comboBoxId, {
                 showSecondaryValues: true,
                 filterSecondaryValues: true,
                 value: "{/comboBoxValue}",
                 selectedKey: "{/comboBoxKey}",
                 editable: false,
                 items: {
                     path: '/CountriesCollection',
                     sorter: { path: 'text' },
                     template: new sap.ui.core.ListItem({
                         key: "{key}",
                         text: "{text}",
                         additionalText: "{val}"
                     })
                 },
                
             });
         
             // Create a JSON model with hardcoded data for the ComboBox items
             var comboBoxModel = new sap.ui.model.json.JSONModel({
                 CountriesCollection: [
                     { key: "Option4", text: "Option 4",val:"demo4" },
                     { key: "Option5", text: "Option 5",val:"demo5" },
                     { key: "Option6", text: "Option 6",val:"demo6" },
                 ]
             });
         
             comboBox.setModel(comboBoxModel);
             comboBox.setValue(plant_cell);
         
             // Create a form
             var form = new sap.ui.layout.form.Form(formId, {
                 layout: new sap.ui.layout.form.ResponsiveGridLayout(),
                 formContainers: [
                     new sap.ui.layout.form.FormContainer({
                         formElements: [
                             new sap.ui.layout.form.FormElement({
                                 label: new sap.m.Label({
                                     text: "Plant"
                                 }),
                                 fields: [comboBox]
                             }),
                             new sap.ui.layout.form.FormElement({
                                 label: new sap.m.Label({
                                     text: "SBG"
                                 }),
                                 fields: [new sap.m.Input({
                                    value: SBG_cell
                                 })]
                             }),
                             new sap.ui.layout.form.FormElement({
                                 label: new sap.m.Label({
                                     text: "SBU"
                                 }),
                                 fields: [new sap.m.Input({
                                    value: SBU_cell
                                 })]
                             })
                             // Add more form elements as needed
                         ]
                     })
                 ]
             });
         
             // Create a dialog
             var oDialog = new sap.m.Dialog(dialogId, {
                 title: "Plant Mapping",
                 content: form
             });
         
             // Create Save button
             var saveButton = new sap.m.Button(saveButtonId, {
                 text: "Save",
                 press: async function (oEvent,oBindingContext) {
                     debugger
 
                     var oButton = oEvent.getSource();

        // Access the parent dialog
        var oDialog = oButton.getParent();

        // Access the form inside the dialog
        var oForm = oDialog.getContent()[0];

        // Access the ComboBox inside the form
        var oComboBox = oForm.getFormContainers()[0].getFormElements()[0].getFields()[0];

        // Access the selected key and value from the ComboBox
        var plant1 = oComboBox.getValue();

        // Access the Input field inside the form for SBG
        var oInput = oForm.getFormContainers()[0].getFormElements()[1].getFields()[0];
        var SBG1 = oInput.getValue();

        // Access the Input field inside the form for SBU
        var oInput1 = oForm.getFormContainers()[0].getFormElements()[2].getFields()[0];
        var SBU1 = oInput1.getValue();
        var d;

        // Get the entity ID from the selected row in the table
        if (this.getParent().getParent().oRootNode.baseURI) {
            d = this.getParent().getParent().oRootNode.baseURI;
            var v = d.replace("/index.html", "")
        } else if (oEvent.oSource.getParent().getParent().getParent().getParent().getParent().getParent().getParent().oContainer.getParent().getParent().getParent().getManifestObject()._oBaseUri._string) {
            v = oEvent.oSource.getParent().getParent().getParent().getParent().getParent().getParent().getParent().oContainer.getParent().getParent().getParent().getManifestObject()._oBaseUri._string
        }
  

        // Perform a PATCH request
        $.ajax({
            url: url33 + `plant('${plant1}')`, // Replace with your API endpoint and include the entity ID
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify({ SBG: SBG1, SBU: SBU1 }),
            success: function (data) {
                // Handle success response
                MessageToast.show("Update successful");

                // Refresh the table after successful update
                listreporttable.refresh();
                oDialog.close();
                oDialog.destroy();
            },
            error: function (error) {
                // Handle error response
                MessageToast.show("Error updating data on the server.");
            }
        });
                 }
             });
         
             // Create Cancel button
             var cancelButton = new sap.m.Button(cancelButtonId, {
                 text: "Cancel",
                 press: function() {
                     // Handle cancel button press
                     oDialog.close();
                     oDialog.destroy();
                 }
             });
         
             // Add buttons to the dialog
             oDialog.addButton(saveButton);
             oDialog.addButton(cancelButton);
         
             // Open the dialog
             oDialog.open();
         }
    };
});
