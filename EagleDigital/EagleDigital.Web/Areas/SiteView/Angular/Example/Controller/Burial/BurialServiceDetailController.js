'use strict';

app.controller("BurialServiceDetailController", ['burialServiceDetailService', '$scope', '$rootScope', '$timeout', function (burialServiceDetailService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 7;
    
    $scope.BurialServiceDetail = {
        AddListMusic: function () {
            $rootScope.OrderDetail.Model.Burial_ListMusic.push(angular.copy($rootScope.DataDynamics.PublicServiceItem));
        },
        AddListMinster: function () {
            $rootScope.OrderDetail.Model.Burial_ListMinster.push(angular.copy($rootScope.DataDynamics.PublicServiceItem));
        },
        AddListPallbearers: function () {
            $rootScope.OrderDetail.Model.Burial_ListPallbearers.push(angular.copy($rootScope.DataDynamics.PublicServiceItem));
        },
        RemoveMusic: function (item) {
            var index = $rootScope.OrderDetail.Model.Burial_ListMusic.indexOf(item);
            $rootScope.OrderDetail.Model.Burial_ListMusic.splice(index, 1);
        },
        RemoveMinster: function (item) {
            var index = $rootScope.OrderDetail.Model.Burial_ListMinster.indexOf(item);
            $rootScope.OrderDetail.Model.Burial_ListMinster.splice(index, 1);
        },
        RemovePallbearers: function (item) {
            var index = $rootScope.OrderDetail.Model.Burial_ListPallbearers.indexOf(item);
            $rootScope.OrderDetail.Model.Burial_ListPallbearers.splice(index, 1);
        },
        ValidateFunction: function () {

        },
        ValidateForm: function () {
            return true;
        },
        SaveBurialServiceDetail: function () {
            if ($scope.BurialServiceDetail.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                $rootScope.OrderDetail.Model.Burial_LocationFuneral = $rootScope.OrderDetail.SelectionData.ListLocationOfFuneral.Choose != null ? $rootScope.OrderDetail.SelectionData.ListLocationOfFuneral.Choose.Name : "";
                $rootScope.OrderDetail.Model.MemorialServiceId =$rootScope.OrderDetail.SelectionData.MemorialService.Choose!=null? $rootScope.OrderDetail.SelectionData.MemorialService.Choose.Id :"";
                $rootScope.OrderDetail.Model.Burial_CemeteryStateId = $rootScope.OrderDetail.SelectionData.BurialCityStates.Choose != null ? $rootScope.OrderDetail.SelectionData.BurialCityStates.Choose.Id : "";
                $rootScope.OrderDetail.Model.MemorialServiceTime = $rootScope.OrderDetail.SelectionData.MemorialServiceTime.Choose != null ? $rootScope.OrderDetail.SelectionData.MemorialServiceTime.Choose.Name : "";

                var data = $rootScope.OrderDetail.Model;
                burialServiceDetailService.SaveBurialServiceDetail(data).then(function(result) {
                    if (result.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    }
                }, function(error) {
                });
            } else {
                $rootScope.OrderDetail.FuntionSave.IsValid = false;
            }
        }
    }

    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            $rootScope.Button.AuthenticationStep();
            $('select').material_select();
            $('.modal-close').click(function () {
                $(this).parent(".modal").closeModal();
                $('.modal-trigger').removeClass('hide');
            });

            $('#Burial_MemorialServiceDate').pickadate({
                selectMonths: true,
                selectYears: 200,
                min: new Date(),
                //max: new Date(),
                format: 'mm-dd-yyyy',
                format_submit: 'mm-dd-yyyy'
            });


            $('.ZipCode').mask('99999');
            Materialize.updateTextFields();

            $scope.BurialServiceDetail.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep7 = $scope.BurialServiceDetail.SaveBurialServiceDetail;
        }, $rootScope.TextContants.ConfigTimeoutDefault);


        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });

}])