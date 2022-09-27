'use strict';

app.controller("BurialServiceProvidedController", ['burialServiceProvidedService', '$scope', '$rootScope', '$timeout', function (burialServiceProvidedService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 5;

    $scope.BurialServiceProvided = {
        ChangeLocationCremation : function() {
            if ($rootScope.OrderDetail.SelectionData.LocationCremation.Choose.IsCaculateZipCode == false) {
                $rootScope.OrderDetail.Model.ZipCode = '';
                $rootScope.OrderDetail.ChangeCityCremation_ZipCode();
            }
        },
        FormLoad : function() {
            if ($rootScope.OrderDetail.Model.ZipCode == "") {
                $rootScope.OrderDetail.Model.CityCremationNameDisplay = "";
            }  
        },
        ValidateFunction: function () {

        },
        ValidateForm: function () {
            return true;
        },
        SelectBurialServices: function (id, type) {
            for (var i = 0; i < $rootScope.OrderDetail.SelectionData.BurialServices.List.length; i++) {
                if ($rootScope.OrderDetail.SelectionData.BurialServices.List[i].Id != id && $rootScope.OrderDetail.SelectionData.BurialServices.List[i].Type == type) {
                    $rootScope.OrderDetail.SelectionData.BurialServices.List[i].IsCheck = false;
                }
            }
        },
        ChangeSpecializedCare: function () {
            var itemChoose = $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose;
            var itemPrice = itemChoose != null ? itemChoose.Price : 0;
            if (itemPrice > 0) {
                $("#at-need-services-modal").openModal();
                $('.modal-trigger').removeClass('hide');
            } else {
                $('.modal-trigger').addClass('hide');
            }

            if (!$rootScope.OrderDetail.CheckSpecializedCareValid()) {
                $("#divWarningSpecializedCare").openModal();
            }

        },
        GetListBurialServiceApply : function(type) {
            var listBurialServiceApply = $.grep($rootScope.OrderDetail.SelectionData.BurialServices.List, function(e) {
                return e.Type == type;
            });
            return listBurialServiceApply;
        },
        SaveBurialServiceProvided : function() {
            if ($scope.BurialServiceProvided.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;

                $rootScope.OrderDetail.Model.QtyCertifiedId = $rootScope.OrderDetail.SelectionData.QtyCertified.Choose.Id;
                $rootScope.OrderDetail.Model.SpecializedCareId = $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose != null ? $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose.Id : "";
                $rootScope.OrderDetail.Model.LocationCremationId = $rootScope.OrderDetail.SelectionData.LocationCremation.Choose != null ? $rootScope.OrderDetail.SelectionData.LocationCremation.Choose.Id : "";

                $rootScope.OrderDetail.Model.Burial_MailingDeath = $rootScope.OrderDetail.SelectionData.BurialMailingDeath.Choose != null ? $rootScope.OrderDetail.SelectionData.BurialMailingDeath.Choose.Name : "";

                var data = $rootScope.OrderDetail.Model;
                data.Burial_Services = $.grep($rootScope.OrderDetail.SelectionData.BurialServices.List,function(e) {
                    return e.IsCheck == true;
                });

                burialServiceProvidedService.SaveBurialServiceProvided(data).then(function (result) {
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
            $rootScope.Button.AuthenticationStep();
            $scope.BurialServiceProvided.FormLoad();

           $scope.BurialServiceProvided.ValidateFunction();
           $rootScope.OrderDetail.FuntionSave.SaveStep5 = $scope.BurialServiceProvided.SaveBurialServiceProvided;

           $('select').material_select();
           Materialize.updateTextFields();

            $('.modal-close').click(function () {
                $(this).parent(".modal").closeModal();
                $('.modal-trigger').removeClass('hide');
            });
            $('.ZipCode').mask('99999');

        }, $rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);

    });

}])