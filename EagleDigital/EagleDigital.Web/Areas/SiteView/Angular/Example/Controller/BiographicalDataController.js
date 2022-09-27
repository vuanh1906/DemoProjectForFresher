'use strict';

app.controller("BiographicalDataController", ['biographicalDataService', '$scope', '$rootScope', '$timeout', function (biographicalDataService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 8;
    

    $scope.BiographicalData = {
        ValidateFunction: function () {

            $.validator.addMethod("ValidEmail", function (value, element) {
                var re = $rootScope.TextContants.Regex.Email;
                return re.test(value);
            }, $rootScope.TextContants.Message.requiredEmailFormat);


            $.validator.addMethod("ValidPhone", function (value, element) {
                var valueTemp = value.split("_").join("").split(" ").join("").split("(").join("").split(")").join("");
                if (valueTemp == "") return true;
                var re = $rootScope.TextContants.Regex.Phone;
                return re.test(value);
            }, $rootScope.TextContants.Message.requiredPhone);

            $.validator.addMethod("ZipCode", function (value, element) {
                var valueTemp = value.split(" ").join("");
                valueTemp = valueTemp.split("_").join("");
                var re = $rootScope.TextContants.Regex.ZipCode;
                if (valueTemp == "") return true;
                return re.test(valueTemp);
            }, $rootScope.TextContants.Message.requiredZipCode);

            var rules = {
                rdRelationship : {
                    required: true
                },
                FirstName: {
                    required: true
                },
                LastName: {
                    required: true
                },
                Spouse: {
                    required: false
                },
                Address: {
                    required: true
                },
                City: {
                    required: true
                },
                State: {
                    required: true
                },
                ZipCode: {
                    required: true
                },
                Country: {
                    required: false
                },
                Email: {
                    required: true,
                    ValidEmail: true
                },
                PrimaryPhone: {
                    required: true,
                    ValidPhone : true
                },
                CellPhone: {
                    required: false,
                    ValidPhone : true
                }
            }

            var messages = {
                rdRelationship: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                FirstName: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                LastName: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                //SuffixName: {
                //    required: $rootScope.TextContants.Message.requiredText
                //},
                Spouse: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                Address: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                City: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                State: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                ZipCode: {
                    required: $rootScope.TextContants.Message.requiredText
                },
                Country: {
                    required: $rootScope.TextContants.Message.requiredSelect
                },
                Email: {
                    required: $rootScope.TextContants.Message.requiredEmail,
                    ValidEmail: $rootScope.TextContants.Message.requiredEmailFormat
                },
                PrimaryPhone: {
                    required: $rootScope.TextContants.Message.requiredText,
                    ValidPhone: $rootScope.TextContants.Message.requiredPhone
                },
                CellPhone: {
                    required: $rootScope.TextContants.Message.requiredText,
                    ValidPhone: $rootScope.TextContants.Message.requiredPhone
                }
            }

            var frmBiographicalData = $('.frmBiographicalData');
            frmBiographicalData.validate({
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
            
            if (!$("#frmBiographicalData").valid()) {
                return false;
            }
            return true;
        },
        SaveBiographicalData: function () {
            $scope.BiographicalData.ValidateFunction();

            if ($scope.BiographicalData.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                $rootScope.OrderDetail.Model.Relationship_CountryId =$rootScope.OrderDetail.SelectionData.Country_BiographicalData.Choose!=null ? $rootScope.OrderDetail.SelectionData.Country_BiographicalData.Choose.Id :"";

                var data = $rootScope.OrderDetail.Model;
                biographicalDataService.SaveBiographicalData(data).then(function (result) {
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

            $rootScope.OrderDetail.FuntionSave.SaveStep8 = $scope.BiographicalData.SaveBiographicalData;
            $('.ZipCode').mask('99999');
            $("#primaryPhone").mask("(999) 999-9999");
            $("#cellPhone").mask("(999) 999-9999");
            $('select').material_select();
            Materialize.updateTextFields();
        }, $rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });
}]);