'use strict';

app.controller("BurialOptionController", ['burialOptionService', '$scope', '$rootScope', '$timeout', function (burialOptionService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 6;


    $scope.BurialOption = {
        ValidateFunction: function () {

            var rules = {
                BurialVisitation : {
                    required: true
                },
                BurialType : {
                    required: true
                },
                IsMinister : {
                    required: true
                },
                MinisterName : {
                    required: true
                },
                BurialCasket : {
                    required: true
                },
                IsPallbearers : {
                    required : true
                },
                PallbearersName : {
                    required: true
                }
            }

            var messages = {
                BurialVisitation: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                BurialType: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                IsMinister: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                MinisterName: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                BurialCasket: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                IsPallbearers: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                PallbearersName: {
                    required: $rootScope.TextContants.Message.requiredText
                }
            }

            var frmBurialOption = $('.frmBurialOption');
            frmBurialOption.validate({
                errorElement: 'div',
                errorPlacement: function (error, element) {
                    var type = $(element).attr("type");
                    var name = $(element).attr("name");
                    if (name === 'BurialType') {
                        error.appendTo(element.parent("div").parent("div"));
                    }
                    else if (type === "radio") {
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
                },
                validateOnInit: true
            });
        },
        ValidateForm: function () {
            if (!$("#frmBurialOption").valid()) {
                return false;
            }
            return true;
        },
        SaveBurialOption: function () {
            $scope.BurialOption.ValidateFunction();
            if ($scope.BurialOption.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;

                $rootScope.OrderDetail.Model.Burial_Visitation = $rootScope.OrderDetail.SelectionData.ListBurialVisitation.Choose;
                $rootScope.OrderDetail.Model.Burial_Type = $rootScope.OrderDetail.SelectionData.ListBurialType.Choose;
                $rootScope.OrderDetail.Model.Burial_Casket = $rootScope.OrderDetail.SelectionData.ListBurialCasket.Choose;

                if (!$rootScope.OrderDetail.Model.Burial_IsMinister) {
                    $rootScope.OrderDetail.Model.Burial_Minister = null;
                }

                if (!$rootScope.OrderDetail.Model.Burial_IsPallbearers) {
                    $rootScope.OrderDetail.Model.Burial_Pallbearers = null;
                }

                var data = $rootScope.OrderDetail.Model;
                burialOptionService.SaveBurialOption(data).then(function (result) {
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
            $rootScope.OrderDetail.FuntionSave.SaveStep6 = $scope.BurialOption.SaveBurialOption;
            $('select').material_select();
            Materialize.updateTextFields();
        }, $rootScope.TextContants.ConfigTimeoutDefault);


        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });


}]);