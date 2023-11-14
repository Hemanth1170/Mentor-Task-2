sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/m/MessageToast' 
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.mindset.apps.project2.controller.mainView", {
        onInit: function (evt) {

        },

        // autobrand status model Logic
        onTree1Press: function (oEvent) {
            
            const inputStr = this.getView().byId("inputBox").getValue();
            const arr = JSON.parse(inputStr);
            let tree = {};
            const statusSet = new Set();
            for (let i = 0; i < arr.length; i++) {
                statusSet.add(arr[i].status);
            }
            for (let i = 0; i < arr.length; i++) {
                if (tree.hasOwnProperty(arr[i].autobrand) === false) {
                    tree[arr[i].autobrand] = {}
                    for (const status of statusSet) {
                        tree[arr[i].autobrand][status] = {}
                    }
                }
                tree[arr[i].autobrand][arr[i].status][arr[i].model] = arr[i].count;
            }

            let treeData = [];
            for( const autobrand in tree){
                var tempObj1 = {};
                tempObj1["text"] = autobrand;
                tempObj1["nodes"] = []
                for( const status in tree[autobrand]){
                    var tempObj2 = {};
                    tempObj2["text"] = status;
                    tempObj2["nodes"] = []
                    for( const model in tree[autobrand][status]){
                        var tempObj3 = {};
                        tempObj3["text"] = model + " : " + tree[autobrand][status][model];
                        tempObj2["nodes"].push(tempObj3);
                    }
                    tempObj1["nodes"].push(tempObj2);
                }
                treeData.push(tempObj1);
            }

            var oModel = new JSONModel(treeData);
            this.getView().setModel(oModel);

            console.log(tree);
            MessageToast.show("Tree1 Button Clicked!");
        },

        // autobrand model status Logic
        onTree2Press: function (oEvent) {
            
            const inputStr = this.getView().byId("inputBox").getValue();
            const arr = JSON.parse(inputStr);
            let tree = {};
            const statusSet = new Set();
            for (let i = 0; i < arr.length; i++) {
                statusSet.add(arr[i].status);
            }
            for (let i = 0; i < arr.length; i++) {
                if (tree.hasOwnProperty(arr[i].autobrand) === false) {
                    tree[arr[i].autobrand] = {}
                }
                if (tree[arr[i].autobrand].hasOwnProperty(arr[i].model) === false) {
                    tree[arr[i].autobrand][arr[i].model] = {};
                    for (const status of statusSet) {
                        tree[arr[i].autobrand][arr[i].model][status] = 0
                    }
                }
                tree[arr[i].autobrand][arr[i].model][arr[i].status] = arr[i].count;
            }

            let treeData = [];
            for( const autobrand in tree){
                var tempObj1 = {};
                tempObj1["text"] = autobrand;
                tempObj1["nodes"] = []
                for( const model in tree[autobrand]){
                    var tempObj2 = {};
                    tempObj2["text"] = model;
                    tempObj2["nodes"] = []
                    for( const status in tree[autobrand][model]){
                        var tempObj3 = {};
                        tempObj3["text"] = status + " : " + tree[autobrand][model][status];
                        tempObj2["nodes"].push(tempObj3);
                    }
                    tempObj1["nodes"].push(tempObj2);
                }
                treeData.push(tempObj1);
            }

            var oModel = new JSONModel(treeData);
            this.getView().setModel(oModel);

            console.log(tree);
            MessageToast.show("Tree2 Button Clicked!");
        }
    });
});
