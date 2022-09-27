'use strict';


app.controller("ngTreeController",
    [
     'ngTreeService',
     'ngCommonService',
    '$scope',
    '$rootScope',
    '$timeout',
    function (
        ngTreeService,
        ngCommonService,
        $scope,
        $rootScope,
        $timeout
    ) {
        $scope.TreeModule = {
            NodeDataArray: {
                List: [],
                Item: {},
                Network: null
            },
            InitForm: {
                MyDiagram: null,
                Func: {
                    Set_MyDiagram: function () {
                        if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
                        var $ = go.GraphObject.make;  // for conciseness in defining templates

                        $scope.TreeModule.InitForm.MyDiagram =
                            $(go.Diagram, "myDiagramDiv",  // the DIV HTML element
                                {
                                    // Put the diagram contents at the top center of the viewport
                                    initialDocumentSpot: go.Spot.TopCenter,
                                    initialViewportSpot: go.Spot.TopCenter,
                                    // OR: Scroll to show a particular node, once the layout has determined where that node is
                                    //"InitialLayoutCompleted": function(e) {
                                    //  var node = e.diagram.findNodeForKey(28);
                                    //  if (node !== null) e.diagram.commandHandler.scrollToPart(node);
                                    //},
                                    layout:
                                        $(go.TreeLayout,  // use a TreeLayout to position all of the nodes
                                            {
                                                //treeStyle: go.TreeLayout.StyleLastParents,
                                                layerStyle: go.TreeLayout.LayerUniform,
                                                // properties for most of the tree:
                                                angle: 90,
                                                layerSpacing: 80,
                                                // properties for the "last parents":
                                                alternateAngle: 0,
                                                alternateAlignment: go.TreeLayout.AlignmentStart,
                                                alternateNodeIndent: 20,
                                                alternateNodeIndentPastParent: 1,
                                                alternateNodeSpacing: 20,
                                                alternateLayerSpacing: 40,
                                                alternateLayerSpacingParentOverlap: 1,
                                                alternatePortSpot: new go.Spot(0.001, 1, 20, 0),
                                                alternateChildPortSpot: go.Spot.Left
                                            })
                                });

                    },
                    Show: function () {
                        $scope.TreeModule.InitForm.Func.ShowDiagram();
                    },
                    ShowDiagram: function () {
                        if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
                        var $ = go.GraphObject.make;  // for conciseness in defining templates

                        //function theNationFlagConverter(nation) {
                        //    return "https://www.nwoods.com/go/Flags/" + nation.toLowerCase().replace(/\s/g, "-") + "-flag.Png";
                        //}
                        var bluegrad = '#90CAF9';
                        var pinkgrad = '#F48FB1';

                        //$scope.TreeModule.InitForm.MyDiagram.add(
                        //    $(go.Part, "Table",
                        //        { position: new go.Point(300, 10), selectable: false },
                        //        $(go.Panel, "Horizontal",
                        //            { row: 0, alignment: go.Spot.Left },
                        //            $(go.Shape, "Rectangle",
                        //                { desiredSize: new go.Size(30, 30), fill: bluegrad, margin: 5 }),
                        //            $(go.TextBlock, "Đàn ông",
                        //                { font: "700 13px Droid Serif, sans-serif" }),
                        //            $(go.Shape, "Rectangle",
                        //                { desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5 }),
                        //            $(go.TextBlock, "Đàn bà",
                        //                { font: "700 13px Droid Serif, sans-serif" })
                        //        )
                        //        //,  // end row 1
                        //        //$(go.Panel, "Horizontal",
                        //        //    { row: 1, alignment: go.Spot.Left },
                        //        //    $(go.Shape, "Rectangle",
                        //        //        { desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5 }),
                        //        //    $(go.TextBlock, "Females",
                        //        //        { font: "700 13px Droid Serif, sans-serif" })
                        //        //)  // end row 2
                        //    ));


                        function theInfoTextConverter(info) {
                            var str = "";
                            //if (info.title) str += "Title: " + info.title;
                            //if (info.headOf) str += "\n\nHead of: " + info.headOf;
                            //if (typeof info.Parent === "number") {
                            //    var parentinfo = $scope.TreeModule.InitForm.MyDiagram.model.findNodeDataForKey(info.Parent);
                            //    if (parentinfo !== null) {
                            //        str += "\n\nCon của: " + bossinfo.Name;
                            //    }
                            //}
                            return str;
                        }

                        function genderBrushConverter(Gender) {
                            if (Gender === true || Gender === 'true') return bluegrad;
                            if (Gender === false || Gender === 'false') return pinkgrad;
                            return "orange";
                        }

                        function getNextKey() {
                            var key = nodeIdCounter;
                            while ($scope.TreeModule.InitForm.MyDiagram.model.findNodeDataForKey(key) !== null) {
                                key = nodeIdCounter--;
                            }
                            return key;
                        }

                        var nodeIdCounter = -1; // use a sequence to guarantee key uniqueness as we add/remove/modify nodes


                        // when a node is double-clicked, add a child to it
                        function nodeClick(e, obj) {
                            var clicked = obj.part;
                            if (clicked !== null) {
                                var thisemp = clicked.data;
                                $scope.TreeModule.NodeDataArray.Item = thisemp;
                                $scope.TreeModule.InitForm.Func.ShowDetail();
                                if (!$scope.$$phase) $scope.$apply();
                            }
                        }

                        // define the Node template
                        $scope.TreeModule.InitForm.MyDiagram.nodeTemplate =
                            $(go.Node, "Auto",
                            //{ doubleClick: nodeDoubleClick },
                            { click: nodeClick },
                                // the outer shape for the node, surrounding the Table
                                //$(go.Shape, "Rectangle",
                                //    { stroke: null, strokeWidth: 0 },
                                //    /* reddish if highlighted, blue otherwise */
                                //new go.Binding("fill", "isHighlighted", function (h) { return h ? "#F44336" : "#A7E7FC"; }).ofObject()),
                                $(go.Shape, "Rectangle",
                                      { fill: "lightgray",
                                        stroke: null, strokeWidth: 0,
                                        stretch: go.GraphObject.Fill,
                                        alignment: go.Spot.Center },
                                      new go.Binding("fill", "Gender", genderBrushConverter)),
                                // a table to contain the different parts of the node
                                $(go.Panel, "Table",
                                    //{ margin: 6, maxSize: new go.Size(200, NaN) },
                                    { margin: 6, maxSize: new go.Size(150, 90) },
                                    // the two TextBlocks in column 0 both stretch in width
                                    // but align on the left side
                                    
                                    $(go.RowColumnDefinition,
                                        {
                                            column: 0,
                                            stretch: go.GraphObject.Horizontal,
                                            alignment: go.Spot.Left
                                        }),
                                    // the name
                                    $(go.TextBlock,
                                        {
                                            row: 0, column: 0,
                                            maxSize: new go.Size(160, NaN), margin: 2,
                                            font: "500 16px Roboto, sans-serif",
                                            alignment: go.Spot.Top
                                        },
                                        new go.Binding("text", "Name")),
                                    // the country flag
                                    $(go.Picture,
                                        {
                                            row: 0, column: 1, margin: 2,
                                            imageStretch: go.GraphObject.Uniform,
                                            alignment: go.Spot.TopRight
                                        },
                                        // only set a desired size if a flag is also present:
                                        //new go.Binding("desiredSize", "nation", function () { return new go.Size(34, 26) }),
                                        //new go.Binding("source", "nation", theNationFlagConverter)
                                        ),
                                    // the additional textual information
                                    $(go.TextBlock,
                                        {
                                            row: 1, column: 0, columnSpan: 2,
                                            font: "12px Roboto, sans-serif"
                                        },
                                        new go.Binding("text", "", theInfoTextConverter))
                                )  // end Table Panel
                            );  // end Node


                        // the context menu allows users to make a position vacant,
                        // remove a role and reassign the subtree, or remove a department
                        $scope.TreeModule.InitForm.MyDiagram.nodeTemplate.contextMenu =
                            $(go.Adornment, "Vertical",
                                //$("ContextMenuButton",
                                //    $(go.TextBlock, "Vacate Position"),
                                //    {
                                //        click: function (e, obj) {
                                //            var node = obj.part.adornedPart;
                                //            if (node !== null) {
                                //                var thisemp = node.data;
                                //                $scope.TreeModule.InitForm.MyDiagram.startTransaction("vacate");
                                //                // update the key, name, and comments
                                //                $scope.TreeModule.InitForm.MyDiagram.model.setKeyForNodeData(thisemp, getNextKey());
                                //                $scope.TreeModule.InitForm.MyDiagram.model.setDataProperty(thisemp, "name", "(Vacant)");
                                //                $scope.TreeModule.InitForm.MyDiagram.model.setDataProperty(thisemp, "comments", "");
                                //                $scope.TreeModule.InitForm.MyDiagram.commitTransaction("vacate");
                                //            }
                                //        }
                                //    }
                                //),
                                //$("ContextMenuButton",
                                //    $(go.TextBlock, "Remove Role"),
                                //    {
                                //        click: function (e, obj) {
                                //            // reparent the subtree to this node's boss, then remove the node
                                //            var node = obj.part.adornedPart;
                                //            if (node !== null) {
                                //                $scope.TreeModule.InitForm.MyDiagram.startTransaction("reparent remove");
                                //                var chl = node.findTreeChildrenNodes();
                                //                // iterate through the children and set their parent key to our selected node's parent key
                                //                while (chl.next()) {
                                //                    var emp = chl.value;
                                //                    $scope.TreeModule.InitForm.MyDiagram.model.setParentKeyForNodeData(emp.data, node.findTreeParentNode().data.key);
                                //                }
                                //                // and now remove the selected node itself
                                //                $scope.TreeModule.InitForm.MyDiagram.model.removeNodeData(node.data);
                                //                $scope.TreeModule.InitForm.MyDiagram.commitTransaction("reparent remove");
                                //            }
                                //        }
                                //    }
                                //),

                                $("ContextMenuButton",
                                    $(go.TextBlock, "Sửa thông tin"),
                                    {
                                        click: function (e, obj) {
                                            var clicked = obj.part;
                                            if (clicked !== null) {
                                                var thisemp = clicked.data;
                                                $scope.TreeModule.NodeDataArray.Item = thisemp;
                                                $scope.TreeModule.InitForm.Func.ShowEdit();
                                                if (!$scope.$$phase) $scope.$apply();
                                            }
                                        }
                                    }
                                ),
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Thêm thành viên"),
                                    {
                                        click: function (e, obj) {
                                            var clicked = obj.part;
                                            if (clicked !== null) {
                                                var thisemp = clicked.data;
                                                $scope.TreeModule.InitForm.MyDiagram.startTransaction("Thêm thành viên");
                                                var newemp = { key: getNextKey(), Name: "Thành viên mới", title: "", Parent: thisemp.key, Gender : true};
                                                $scope.TreeModule.InitForm.MyDiagram.model.addNodeData(newemp);
                                                $scope.TreeModule.InitForm.MyDiagram.commitTransaction("Thêm thành viên");
                                            }
                                        }
                                    }
                                ),
                                $("ContextMenuButton",
                                    $(go.TextBlock, "Xóa thành viên"),
                                    {
                                        click: function (e, obj) {
                                            var node = obj.part.adornedPart;
                                            if (node !== null) {
                                                $scope.TreeModule.Manage.Delete(node.data.Id);
                                                $scope.TreeModule.InitForm.MyDiagram.startTransaction("Xóa thành viên");
                                                $scope.TreeModule.InitForm.MyDiagram.removeParts(node.findTreeParts());
                                                $scope.TreeModule.InitForm.MyDiagram.commitTransaction("Xóa thành viên");
                                            }
                                        }
                                    }
                                )
                            );


                        $scope.TreeModule.InitForm.MyDiagram.linkTemplate =
                            $(go.Link, go.Link.Orthogonal,
                                { corner: 5, selectable: false },
                                $(go.Shape, { strokeWidth: 3, stroke: "#424242" }));  // dark gray, rounded corner links
                        // set up the nodeDataArray, describing each person/position

                        // create the Model with data for the tree, and assign to the Diagram
                        $scope.TreeModule.InitForm.MyDiagram.model =
                            $(go.TreeModel,
                                {
                                    nodeParentKeyProperty: "Parent",  // this property refers to the parent node data
                                    nodeDataArray: $scope.TreeModule.NodeDataArray.List
                                });
                        // Overview
                        //$scope.TreeModule.InitForm.Func.ShowOverview();
                        var myOverview =
                            $(go.Overview, "myOverviewDiv",  // the HTML DIV element for the Overview
                                { observed: $scope.TreeModule.InitForm.MyDiagram, contentAlignment: go.Spot.Center });   // tell it which Diagram to show and pan
                    },
                    SearchDiagram: function () {
                        var input = document.getElementById("mySearch");
                        if (!input) return;
                        input.focus();
                        $scope.TreeModule.InitForm.MyDiagram.startTransaction("highlight search");
                        if (input.value) {
                            // search four different data properties for the string, any of which may match for success
                            // create a case insensitive RegExp from what the user typed
                            var regex = new RegExp(input.value, "i");
                            var results = $scope.TreeModule.InitForm.MyDiagram.findNodesByExample({ Name: regex },
                                { nation: regex },
                                { title: regex },
                                { headOf: regex });
                            $scope.TreeModule.InitForm.MyDiagram.highlightCollection(results);
                            // try to center the diagram at the first node that was found
                            if (results.count > 0) $scope.TreeModule.InitForm.MyDiagram.centerRect(results.first().actualBounds);
                        } else {  // empty string only clears highlighteds collection
                            $scope.TreeModule.InitForm.MyDiagram.clearHighlighteds();
                        }
                        $scope.TreeModule.InitForm.MyDiagram.commitTransaction("highlight search");
                    },
                    SetHeight: function () {
                        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        $("#myDiagramDiv").css("height", h + "px");
                    },
                    ShowDetail: function () {
                        $("#myModal").modal("show");
                    },
                    ShowEdit: function () {
                        $("#myModalEdit").modal("show");
                    }
                }
            },
            Manage: {
                GetAllTree: function () {
                    ngTreeService.GetAllTree().then(function (result) {
                        if (result.data.Status === $rootScope.TextContants.Status.OK) {
                            $scope.TreeModule.NodeDataArray.List = [];
                            for (var i = 0; i < result.data.Model.length; i++) {

                                if (result.data.Model[i].BirthDay !== null && result.data.Model[i].BirthDay !== undefined) {
                                    var dateValue = new Date(parseInt(result.data.Model[i].BirthDay.substr(6)));
                                    result.data.Model[i].BirthDayDisplay = dateValue !== "" ? dateValue.getDate() + '/' + (dateValue.getMonth() + 1) + '/' + dateValue.getFullYear() : "";
                                }

                                if (result.data.Model[i].DateDeath !== null && result.data.Model[i].DateDeath !== undefined) {
                                    var dateDeathValue = new Date(parseInt(result.data.Model[i].DateDeath.substr(6)));
                                    result.data.Model[i].DateDeathDisplay = dateDeathValue !== "" ? dateDeathValue.getDate() + '/' + (dateDeathValue.getMonth() + 1) + '/' + dateDeathValue.getFullYear() : "";
                                }


                                $scope.TreeModule.NodeDataArray.List.push(result.data.Model[i]);
                            }

                            //for (var j = 0; j < $scope.TreeModule.NodeDataArray.ListTemp.length; j++) {
                            //    var item = $scope.TreeModule.NodeDataArray.ListTemp[j];
                            //    $scope.TreeModule.NodeDataArray.List.push(item);
                            //}


                        }
                    }, function (error) {
                    });
                },
                SaveItem: function () {
                    var model = angular.copy($scope.TreeModule.NodeDataArray.Item);

                    if (model.BirthDayDisplay != null && model.BirthDayDisplay !== "") {
                        var listOfDate = model.BirthDayDisplay.split("/");
                        model.BirthDay = listOfDate[1] + '/' + listOfDate[0] + '/' + listOfDate[2];
                    }

                    if (model.DateDeathDisplay != null && model.DateDeathDisplay !== "") {
                        var listOfDates = model.DateDeathDisplay.split("/");
                        model.DateDeath = listOfDates[1] + '/' + listOfDates[0] + '/' + listOfDates[2];
                    }

                    //model.BirthDay =  model.BirthDayDisplay ;
                    //model.DateDeath = model.DateDeathDisplay;
                    
                    ngTreeService.SaveItem(model).then(function (result) {
                        if (result.data.Status === $rootScope.TextContants.Status.OK) {
                            $("#myModalEdit").modal("hide");

                            var node = $scope.TreeModule.InitForm.MyDiagram.findNodeForKey(model.key);
                            $scope.TreeModule.InitForm.MyDiagram.startTransaction('updateNode');

                            node.data.Id = model.Id;
                            node.data.key = model.key;
                            node.data.Parent = model.Parent;
                            node.data.Level = model.Level;
                            node.data.Name = model.Name;
                            node.data.Gender = model.Gender;
                            node.data.Address = model.Address;
                            node.data.Job = model.Job;
                            node.data.Phone = model.Phone;
                            node.data.Image = model.Image;
                            node.data.BirthDay = model.BirthDay;
                            node.data.DateDeath = model.DateDeath;
                            node.data.Info = model.Info;

                            node.updateTargetBindings();
                            $scope.TreeModule.InitForm.MyDiagram.commitTransaction('updateNode');

                            //alert("Đã cập nhật thành công");
                        }
                    }, function (error) {
                    });

                },
                Delete: function (id) {
                    ngTreeService.Delete(id).then(function (result) {
                        if (result.data.Status === $rootScope.TextContants.Status.OK) {
                            //alert("Đã cập nhật thành công");
                        }
                    }, function (error) {
                    });
                },
                PushTest: function () {
                    var item = {
                        key: 4,
                        boss: 3,
                        name: "Test",
                        nation: "South Korea",
                        title: "Secretary-General of the United Nations",
                        headOf: "Secretariat"
                    };
                    $scope.TreeModule.NodeDataArray.List.push(item);
                },
                RefeshTest: function () {
                    $scope.TreeModule.InitForm.Func.ShowDiagram();
                }
            }
        };




        $scope.TreeModule.InitForm.Func.Set_MyDiagram();
        $scope.TreeModule.InitForm.Func.SetHeight();
        $scope.TreeModule.Manage.GetAllTree();

        $timeout(function () {
           $scope.TreeModule.InitForm.Func.Show();
        }, 1000);

       

    $scope.$on('$viewContentLoaded', function () {
    });

}]);


