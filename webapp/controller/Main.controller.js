sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/json/JSONModel",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageToast, DateFormat, JSONModel) {
		"use strict";
	
		return Controller.extend("caseone.controller.Main", {
			onInit: function () {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData("./model/objects.json");
				this.getView().setModel(oModel, "objectsModel")
			},
			onPost: function (oEvent) {
				
				// define the date of new comment
				var oFormat = DateFormat.getDateTimeInstance({
					style: "medium"
				});
				var oDate = new Date();
				var sDate = oFormat.format(oDate);
		
				// create new entry
				var sValue = oEvent.getParameter("value");
				MessageToast.show("Posted new comment: " + sValue);
				var oEntry = {
					Author: "George Grayshon",
					Date: "" + sDate,
					Text: sValue
				};
				// update model
				var oModel = this.getView().getModel("objectsModel");
				var aEntries = oModel.getData().objects;
				aEntries.unshift(oEntry);// to add one or more elements at the beginning of an array we use unshift() method.
										 // But if you want an element to be added at end of the an array, push() method can be used.
				oModel.setData({
					objects: aEntries
				});
			}
		});
	});
