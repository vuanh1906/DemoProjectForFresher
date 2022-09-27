'use strict';

app.controller("MemorialServiceDataController", ['memorialServiceDataService', '$scope', '$rootScope', '$timeout', function (memorialServiceDataService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 11;
    

    $scope.MemorialServiceData = {
        AddListLieuOfFlower: function () {
            $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower.push(angular.copy($rootScope.DataDynamics.LieuOfFlower));
            setTimeout(function () {
                $('select').material_select();
                $('.ZipCode').mask('99999');
            }, 100);
        },
        ValidateFunction: function () {
         
            var rules = {
                IsPreplanning : {
                  required: true  
                },
                BusinessName: {
                    required: true
                },
                Address: {
                    required: true
                }
            }

            var messages = {
                IsPreplanning: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                BusinessName: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                Address: {
                    required: $rootScope.TextContants.Message.requiredText
                }
            }

            var frmMemorialServiceData = $('.frmMemorialServiceData');
            frmMemorialServiceData.validate({
                errorElement: 'div',
                errorPlacement: function (error, element) {
                    var type = $(element).attr("type");
                    if (type === "radio") {
                        error.appendTo(element.parent("p").parent("div"));
                    } else {
                        error.insertAfter(element).wrap('<div/>');
                    }
                },
                rules: rules,
                messages: messages,
                submitHandler: function (form) {
                },
                invalidHandler: function (event, validator) {
                    validator.errorList[0].element.focus();
                },
                validateOnInit: true
            });
        },
        ValidateForm: function () {
            if (!$("#frmMemorialServiceData").valid()) {
                return false;
            }
            return true;
        },
        SaveMemorialServiceData: function () {
            if ($scope.MemorialServiceData.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                $rootScope.OrderDetail.Model.Memorial_CountryId = $rootScope.OrderDetail.SelectionData.Country_Memorial.Choose!=null?  $rootScope.OrderDetail.SelectionData.Country_Memorial.Choose.Id : "";
                for (var i = 0; i < $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower.length; i++) {
                    $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower[i].CountryId = $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower[i].Country.Choose!=null?  $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower[i].Country.Choose.Id :"";
                }

                $rootScope.OrderDetail.Model.DetailPrice = angular.copy($rootScope.OrderDetail.DetailPrice);

                if (!$rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowBasePrice()) {
                    $rootScope.OrderDetail.Model.DetailPrice.BasePrice = 0;
                }

                if (!$rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowCasket()) {
                    $rootScope.OrderDetail.Model.DetailPrice.CasketPreferencePrice = 0;
                }

               // $rootScope.OrderDetail.Model.DetailPrice.ListPriceModuleMemorialPakages = $rootScope.OrderDetail.DetailPrice.GetTotalMemorialPackageItem();

                var data = $rootScope.OrderDetail.Model;


                memorialServiceDataService.SaveMemorialServiceData(data).then(function (result) {
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

            $scope.MemorialServiceData.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep11 = $scope.MemorialServiceData.SaveMemorialServiceData;

            $('.ZipCode').mask('99999');
            $('select').material_select();
            Materialize.updateTextFields();

            $('#filled-in-box').change(function() {
                if (this.checked) {
                    Materialize.updateTextFields();
                }
            });
        },$rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });
}]);