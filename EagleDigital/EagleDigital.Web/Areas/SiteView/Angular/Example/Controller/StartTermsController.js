'use strict';

app.controller("StartTermsController", ['startTermsService', '$scope', '$rootScope', '$timeout', function (startTermsService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 1;
  


    $scope.StartTerms = {
        //IsAgree: false,
        ValidateFunction: function () {

            $.validator.addMethod("ValidEmail", function (value, element) {
                var re = $rootScope.TextContants.Regex.Email;
                return re.test(value);
            }, $rootScope.TextContants.Message.requiredEmailFormat);

            var rules = {
                Email: {
                    //required: true,
                    ValidEmail : true
                }
            }

           var messages = {
               Email :{
                   //required: $rootScope.TextContants.Message.requiredText,
                   ValidEmail: $rootScope.TextContants.Message.requiredEmailFormat
               }
           }

            var frmStartTerms = $('.frmStartTerms');
            frmStartTerms.validate({
                errorElement: 'div',
                rules: rules,
                messages : messages,
                submitHandler: function (form) {
                },
                invalidHandler: function (event, validator) {
                },
                validateOnInit: true
            });
        },
        ValidateForm: function () {
            if (!$("#frmStartTerms").valid()) {
                return false;
            }
            return true;
        },
        SendMailCreateOrder : function() {
            var emailModel = {
                To: "",
                Form: "",
                OrderId: 0,
                Step : 0
            };
            emailModel.To = $rootScope.OrderDetail.Model.Email;
            emailModel.OrderId = $rootScope.OrderDetail.Model.Id;
            emailModel.Step = $rootScope.OrderDetail.Model.Step;
            startTermsService.SendMailCreateOrder(emailModel).then(function(result) {
                if (result.Status == $rootScope.TextContants.Status.Success) {
                }
            });
        },
        SaveStartTerms: function () {
            if ($scope.StartTerms.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                var oldServiceType = $rootScope.OrderDetail.Model.ServiceType;
                var newServiceType = $rootScope.OrderDetail.SelectionData.ServiceType.Choose != null ? $rootScope.OrderDetail.SelectionData.ServiceType.Choose.Name : "";
                
               // $rootScope.OrderDetail.Model.ServiceType = $rootScope.OrderDetail.SelectionData.ServiceType.Choose != null ? $rootScope.OrderDetail.SelectionData.ServiceType.Choose.Name : "";
                //
                if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Burial) {
                    $rootScope.OrderDetail.Model.URNSelectionId = '';
                    $rootScope.OrderDetail.URNSelectionPrice = 0;
                    $rootScope.OrderDetail.URNSelectionName = 0;
                    $rootScope.OrderDetail.SelectionData.PickupRemain.Choose = $rootScope.OrderDetail.SelectionData.PickupRemain.List[0];
                    $rootScope.OrderDetail.Model.PickupRemainId = '';
                }
                if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                    $rootScope.OrderDetail.Model.CasketPreferenceId = '';
                    $rootScope.OrderDetail.CasketPreferencePrice = 0;
                    $rootScope.OrderDetail.CasketPreferenceName = 0;

                    $rootScope.OrderDetail.Model.VaultSelectionId = '';
                    $rootScope.OrderDetail.VaultSelectionPrice = 0;
                    $rootScope.OrderDetail.VaultSelectionName = 0;
                }

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                //

                var data = $rootScope.OrderDetail.Model;
               

                startTermsService.SaveStartTerms(data).then(function (result) {
                    if (result.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;

                       
                        //send email
                        //$scope.StartTerms.SendMailCreateOrder();
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
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();
            $scope.StartTerms.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep1 = $scope.StartTerms.SaveStartTerms;

            Materialize.updateTextFields();

            //$('select').material_select();
        },$rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });

}]);