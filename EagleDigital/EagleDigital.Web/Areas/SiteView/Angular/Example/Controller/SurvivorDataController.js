'use strict';

app.controller("SurvivorDataController", ['survivorDataService', '$scope', '$rootScope', '$timeout', function (survivorDataService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 10;
    

    $scope.SurvivorData = {
        AddListSon : function() {
            $rootScope.OrderDetail.Model.Survivor_ListSon.push(angular.copy($rootScope.DataDynamics.SurvivingSpouse));
        },
        AddListDaughters: function () {
            $rootScope.OrderDetail.Model.Survivor_ListDaughters.push(angular.copy($rootScope.DataDynamics.SurvivingSpouse));
        },
        AddListBrothers: function () {
            $rootScope.OrderDetail.Model.Survivor_ListBrothers.push(angular.copy($rootScope.DataDynamics.SurvivingSpouse));
        },
        AddListSisters: function () {
            $rootScope.OrderDetail.Model.Survivor_ListSisters.push(angular.copy($rootScope.DataDynamics.SurvivingSpouse));
        },
        RemoveSon : function(item) {
            var index = $rootScope.OrderDetail.Model.Survivor_ListSon.indexOf(item);
            $rootScope.OrderDetail.Model.Survivor_ListSon.splice(index, 1);
        },
        RemoveDaughters : function(item) {
            var index = $rootScope.OrderDetail.Model.Survivor_ListDaughters.indexOf(item);
            $rootScope.OrderDetail.Model.Survivor_ListDaughters.splice(index, 1);
        },
        RemoveBrothers : function(item) {
            var index = $rootScope.OrderDetail.Model.Survivor_ListBrothers.indexOf(item);
            $rootScope.OrderDetail.Model.Survivor_ListBrothers.splice(index, 1);
        },
        RemoveSisters: function (item) {
            var index = $rootScope.OrderDetail.Model.Survivor_ListSisters.indexOf(item);
            $rootScope.OrderDetail.Model.Survivor_ListSisters.splice(index, 1);
        },
        ValidateFunction: function () {
            $.validator.addMethod("selectMemorialService", function (value, element) {
                return $rootScope.OrderDetail.SelectionData.MemorialService.Choose.Id != 0;
            }, "This field is required.");

            $.validator.addMethod("selectQtyCertified", function (value, element) {
                return $rootScope.OrderDetail.SelectionData.QtyCertified.Choose.Id != 0;
            }, "This field is required.");

            var rules = {
                MemorialService: {
                    selectMemorialService: true
                },
                QtyCertified: {
                    selectQtyCertified: true
                }
            }
            var frmSurvivorData = $('.frmSurvivorData');
            var errorHandlerSurvivorData = $('.errorHandlerSurvivorData', frmSurvivorData);
            frmSurvivorData.validate({
                rules: rules,
                submitHandler: function (form) {
                    errorHandlerSurvivorData.hide();
                },
                invalidHandler: function (event, validator) {
                    errorHandlerSurvivorData.show();
                    validator.errorList[0].element.focus();
                },
                validateOnInit: true
            });
            errorHandlerSurvivorData.hide();
        },
        ValidateForm: function () {
            //if (!$("#frmSurvivorData").valid()) {
            //    return false;
            //}
            return true;
        },
        SaveSurvivorData: function () {
            if ($scope.SurvivorData.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                var data = $rootScope.OrderDetail.Model;
                survivorDataService.SaveSurvivorData(data).then(function (result) {
                    if (result.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    }
                }, function (error) {
                });
            } else {
                $rootScope.OrderDetail.FuntionSave.IsValid = false;
            }
        }
    }


    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();

            $scope.SurvivorData.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep10 = $scope.SurvivorData.SaveSurvivorData;

            Materialize.updateTextFields();
        },$rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });

}]);