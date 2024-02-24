sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog", "sap/m/Button"
], function(MessageToast) {
    'use strict';

    return {
        createhandler: function(oEvent) {
                   debugger
                  
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
                          items: {
                              path: '/CountriesCollection',
                              sorter: { path: 'text' },
                              template: new sap.ui.core.ListItem({
                                  key: "{plant}",
                                  text: "{plant}",
                                  additionalText: "{plant_info}"
                              }),
                              length:400
                          },
                          
                          required:true
                      });
                      var l;
                    //   if (this.routing.getView()._oContainingView._$oldContent.prevObject[0].baseURI) {
                    //       l = this.routing.getView()._oContainingView._$oldContent.prevObject[0].baseURI;
                    //       var u = l.replace("/index.html", "")
                    //   } else if (oEvent.oSource.getParent().getParent().getParent().getParent().getParent().getParent().getParent().oContainer.getParent().getParent().getParent().getManifestObject()._oBaseUri._string) {
                    //       l = oEvent.oSource.getParent().getParent().getParent().getParent().getParent().getParent().getParent().oContainer.getParent().getParent().getParent().getManifestObject()._oBaseUri._string
                    //   }
                     var url11= this._view.getModel().sServiceUrl
                      $.ajax({
                          url: url11 + 'info',
                          type: "GET",
                          contentType: "application/json",
                          success: function (data1) {

                            var oDataItems = data1.value;
                              var comboBoxModel = new sap.ui.model.json.JSONModel({
                                CountriesCollection:oDataItems
                              
                            });
                    
                            // Set the model to the ComboBox
                            comboBox.setModel(comboBoxModel);

                          },
                          error: function (error) {
                              // Handle error response
                              MessageToast.show(error.responseJSON.error.message);
                          }
                      });
          
                  
                    //   // Create a JSON model with hardcoded data for the ComboBox items
                    //   var oDataItems = data.value;
          
                    //   // Create a JSON model with data from the OData service
                    //   var comboBoxModel = new sap.ui.model.json.JSONModel({
                    //     CountriesCollection: oDataItems.map(function (item) {
                    //       return {
                    //         key: item.plant,
                    //         text: item.plant_info,
                    //         val: item.plant_info
                    //       };
                    //     })
                    //   });
                  
                    //   comboBox.setModel(comboBoxModel);
                  
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
                                          fields: [new sap.m.Input()]
                                      }),
                                      new sap.ui.layout.form.FormElement({
                                          label: new sap.m.Label({
                                              text: "SBU"
                                          }),
                                          fields: [new sap.m.Input()]
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
                              var selectedKey = oComboBox.getSelectedKey();
                              var plant1 = oComboBox.getValue();
                              if (!plant1) {
                                // If Plant is empty, show an error message and prevent further execution
                                MessageToast.show("Please fill in the Plant field.");
                                return;
                            }
                      
          
                              
          
                              // Access the Input field inside the form
                              var oInput = oForm.getFormContainers()[0].getFormElements()[1].getFields()[0];
                              var SBG1 = oInput.getValue();
                              var oInput2 = oForm.getFormContainers()[0].getFormElements()[2].getFields()[0];
                              var SBU1 = oInput2.getValue();
          
                              var baseurl;
                              if (this.getParent().getParent().oRootNode.baseURI) {
                                  baseurl = this.getParent().getParent().oRootNode.baseURI;
                                  var newURL = baseurl.replace("/index.html", "");
                              } else if (oEvent.oSource.getParent().getParent().getParent().getParent().getParent().getParent().getParent().oContainer.getParent().getParent().getParent().getManifestObject()._oBaseUri._string) {
                                  baseurl = oEvent.oSource.getParent().getParent().getParent().getParent().getParent().getParent().getParent().oContainer.getParent().getParent().getParent().getManifestObject()._oBaseUri._string;
                              }
                              
                              $.ajax({
                                  url: url11+'plant',
                                  type: "POST",
                                  contentType: "application/json",
                                  data: JSON.stringify({plant:plant1,SBG:SBG1,SBU:SBU1}),
                                  success: function (data) {
                                      // Handle success response
                                      MessageToast.show("created successfully");
                                      listreporttable.refresh();
                                      oDialog.close();
                                  },
                                  error: function (error) {     
                                 
                                    if (error.responseJSON && error.responseJSON.error && error.responseJSON.error.message === "Entity already exists") {
                                        MessageToast.show("Entry with this Plant already exists");
                                    } else {
                                        MessageToast.show(error.responseJSON.error.message);
                                    }
                                  }
                              });
                              // $.ajax({
                              //     url: newURL + '/odata/v4/my/plant',
                              //     type: "POST",
                              //     contentType: "application/json",
                              //     data: JSON.stringify({plant:plant1,SBG:SBG1,SBU:SBU1}),
                              //     success: function (data) {
                                     
                              //         // Handle success response
                              //         MessageToast.show("Reply send successfully");
                              //         listreporttable.refresh();
                              //         oDialog.close();
                              //     },
                              //     error: function (error) {
                              //         // Handle error response
                              //         MessageToast.show(error.responseJSON.error.message);
                              //     }
                              // });
                              // listreporttable.refresh();
                             
                              // await listreporttable.getModel().getAllBindings()[8,9].refresh
                              //  var listreporttable = this._view.getContent()[0].getContent();
                               
                              // listreporttable.getContent().mAggregations._content.refreshItems();
                              // Handle save button press
                            
                          }
                      });
                      var cancelButton = new sap.m.Button(cancelButtonId, {
                          text: "Cancel",
                          press: function() {
                              // Handle cancel button press
                              oDialog.close();
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
