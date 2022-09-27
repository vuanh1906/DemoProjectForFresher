'use strict';

app.controller("ServiceProvideController", ['serviceProvideService', '$scope', '$rootScope', '$timeout', function (serviceProvideService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 2;

    $scope.ServiceProvide = {
        ChangeLocationCremation : function() {
            if ($rootScope.OrderDetail.SelectionData.LocationCremation.Choose.IsCaculateZipCode == false) {
                $rootScope.OrderDetail.Model.ZipCode = '';
                $rootScope.OrderDetail.ChangeCityCremation_ZipCode();
            }
        },
        FormLoad: function () {
            if ($rootScope.OrderDetail.Model.ZipCode == "") {
                $rootScope.OrderDetail.Model.CityCremationNameDisplay = "";
            }
        },

        IsValidPhoto: true,
        IsValidSizePhoto: true,
        ChangeCityCremation: function () {
            var filterData = $rootScope.OrderDetail.SelectionData.Location.List;
            if ($rootScope.OrderDetail.SelectionData.CityCremation.Choose != '' && $rootScope.OrderDetail.SelectionData.CityCremation.Choose != undefined && $rootScope.OrderDetail.SelectionData.CityCremation.Choose.Id != 0)
                $rootScope.OrderDetail.SelectionData.Location.ListFilter = filterData.filter(function (e) { return e.CityCremationId === $rootScope.OrderDetail.SelectionData.CityCremation.Choose.Id });
                //$rootScope.OrderDetail.SelectionData.Location.Choose = $rootScope.OrderDetail.SelectionData.Location.ListFilter[0];
            setTimeout(function () {
                $('select').material_select();
            }, 100);
        },

        //ChangeCityOther: function () {
        //    if ($rootScope.OrderDetail.SelectionData.CityCremation.Choose.Name.indexOf('Other') > -1 ) {
        //        var textTemplate = "Pickup Location";
        //    var otherCityValue =$rootScope.OrderDetail.Model.CityOther != undefined? $rootScope.OrderDetail.Model.CityOther : "" ;
        //        $rootScope.OrderDetail.SelectionData.CityCremation.Choose.DisplayName = textTemplate + " (" + otherCityValue + ")";
        //    }
        //},

        //GetValueZipCodeValue : function() {
        //    var zipcode = $scope.OrderDetail.Model.ZipCode;
        //    zipcode = zipcode.split("_").join("").split("-").join("").split(" ").join("");
        //    return zipcode;
        //},
        //ChangeCityCremation_ZipCode: function () {
        //    var zipcode = $scope.ServiceProvide.GetValueZipCodeValue();
        //    if (zipcode != "") {
        //        $('.divWaitDialog').openModal({
        //            dismissible: false
        //        });

        //        serviceProvideService.ZipCode_API_GetCityName(zipcode).then(function (response) {
        //            if (response.Status == $rootScope.TextContants.Status.Success) {
        //                $rootScope.OrderDetail.Model.CityCremationName = response.Data.city;
        //                $rootScope.OrderDetail.DetailPrice.CityCremationPrice = response.Data.Price;
        //                //$rootScope.OrderDetail.DetailPrice.CityCremationPriceString = response.Data.PriceString;
        //                $rootScope.OrderDetail.Model.CityCremationNameDisplay = response.Data.city + " (" + response.Data.PriceString +")";
        //            } else {
        //                $("#InvalidZipCode").openModal();
        //                $rootScope.OrderDetail.Model.CityCremationName = "";
        //                $rootScope.OrderDetail.Model.CityCremationNameDisplay = "";
        //            }
        //        }).finally(function () {
        //            $('.divWaitDialog').closeModal();
        //            $("#CityCremationName").focus();
        //        });
        //    } else {
        //        $rootScope.OrderDetail.Model.CityCremationName = "";
        //    }
        //    if (!$scope.$$phase) $scope.$apply();
        //    Materialize.updateTextFields();
        //},

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
        ValidateFunction: function () {
       
            $.validator.addMethod("selectMemorialService", function (value, element) {
                return $rootScope.OrderDetail.SelectionData.MemorialService.Choose.Id != 0;
            }, "This field is required.");

            $.validator.addMethod("selectQtyCertified", function (value, element) {
                return $rootScope.OrderDetail.SelectionData.QtyCertified.Choose.Id != 0;
            }, "This field is required.");

            $.validator.addMethod("selectCremation", function (value, element) {
                return $rootScope.OrderDetail.SelectionData.CityCremation.Choose.Id != 0 && $rootScope.OrderDetail.SelectionData.CityCremation.Choose.Id != 1;
            }, "This field is required.");

            $.validator.addMethod("selectLocation", function (value, element) {
                return $rootScope.OrderDetail.SelectionData.Location.Choose.Id != 0;
            }, "This field is required.");


            var rules = {
                MemorialService : {
                    selectMemorialService: true
                },
                QtyCertified : {
                    selectQtyCertified: true
                },
                CityCremation: {
                    selectCremation: true
                },
                CityOther: {
                    required: $rootScope.OrderDetail.SelectionData.CityCremation.Choose.Id == -1
                },
                Locations: {
                    selectLocation: $rootScope.OrderDetail.SelectionData.CityCremation.Choose.Id != -1
                }
            }

            var frmServiceProvide = $('.frmServiceProvide');
            frmServiceProvide.validate({
                errorElement: 'div',
                rules: rules,
                submitHandler: function (form) {
                },
                invalidHandler: function (event, validator) {
                },
                validateOnInit: true
            });
        },
        ValidateForm: function () {
            if (!$("#frmServiceProvide").valid()) {
                return false;
            }
            return true;
        },
       
        SaveTutorial : function (tutorial) {
            serviceProvideService.SaveTutorial(tutorial).then(function (data) {
                $rootScope.OrderDetail.Model.PhotoUrl = data.DocumentUrl;
            });
        },
        SaveServiceProvide: function () {
            if (!$scope.ServiceProvide.IsValidSizePhoto || !$scope.ServiceProvide.IsValidPhoto) {
                $rootScope.OrderDetail.Model.PhotoUrl = "";
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }

            if ($scope.ServiceProvide.ValidateForm()) {
                $rootScope.IsSaveDone = false;
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                $rootScope.OrderDetail.Model.QtyCertifiedId = $rootScope.OrderDetail.SelectionData.QtyCertified.Choose.Id;
                $rootScope.OrderDetail.Model.MemorialServiceId =$rootScope.OrderDetail.SelectionData.MemorialService.Choose!=null? $rootScope.OrderDetail.SelectionData.MemorialService.Choose.Id :"";
                $rootScope.OrderDetail.Model.SpecializedCareId = $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose!=null? $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose.Id :"";
                //$rootScope.OrderDetail.Model.CityCremationId =   $rootScope.OrderDetail.SelectionData.CityCremation.Choose.Id ;
                //$rootScope.OrderDetail.Model.LocationId = ($rootScope.OrderDetail.SelectionData.CityCremation.Choose.Name.indexOf('Other') > -1 || $rootScope.OrderDetail.SelectionData.Location.Choose == undefined) ? '' : $rootScope.OrderDetail.SelectionData.Location.Choose.Id;

                $rootScope.OrderDetail.Model.LocationCremationId = $rootScope.OrderDetail.SelectionData.LocationCremation.Choose != null ? $rootScope.OrderDetail.SelectionData.LocationCremation.Choose.Id : "";
                var data = $rootScope.OrderDetail.Model;
                $scope.ServiceProvide.SaveTutorial($scope.tutorial);
                serviceProvideService.SaveServiceProvide(data).then(function (result) {
                    if (result.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    }
                    $rootScope.IsSaveDone = true;
                }, function (error) {
                    $rootScope.IsSaveDone = true;
                });

                //var result = serviceProvideService.SaveServiceProvide(data);
                //    if (result.Status == $rootScope.TextContants.Status.Success) {
                //        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                //        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                //    }
            } else {
                $rootScope.OrderDetail.FuntionSave.IsValid = false;
            }
        }
    }


    $scope.ServiceProvide.ChangeSpecializedCare();
    
    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();
            $scope.ServiceProvide.FormLoad();
            $scope.ServiceProvide.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep2 = $scope.ServiceProvide.SaveServiceProvide;

            $('select').material_select();

            $('.modal-close').click(function () {
                $(this).parent(".modal").closeModal();
                $('.modal-trigger').removeClass('hide');
            });
            $('.ZipCode').mask('99999');
            Materialize.updateTextFields();
        },$rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });

}]);