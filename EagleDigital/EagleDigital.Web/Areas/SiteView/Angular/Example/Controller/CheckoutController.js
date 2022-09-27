'use strict';


app.controller("CheckoutController", ['checkoutService', '$scope', '$rootScope', '$timeout', function (checkoutService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 13;
    

    $scope.Checkout = {
        AllowContinute: true,
        SetMethodCreditCard : function() {
            $rootScope.CheckoutModel.CreditCard = true;
            $rootScope.CheckoutModel.Cash = false;
            $rootScope.CheckoutModel.OurOffice = false;
            $rootScope.CheckoutModel.Insurance = false;
        },
        SetMethodCash : function() {
            $rootScope.CheckoutModel.CreditCard = false;
            $rootScope.CheckoutModel.Cash = true;
            $rootScope.CheckoutModel.OurOffice = false;
            $rootScope.CheckoutModel.Insurance = false;
        },
        SetMethodOurOffice : function() {
            $rootScope.CheckoutModel.CreditCard = false;
            $rootScope.CheckoutModel.Cash = false;
            $rootScope.CheckoutModel.OurOffice = true;
            $rootScope.CheckoutModel.Insurance = false;
        },
        SetMethodInsurance: function () {
            $rootScope.CheckoutModel.CreditCard = false;
            $rootScope.CheckoutModel.Cash = false;
            $rootScope.CheckoutModel.OurOffice = false;
            $rootScope.CheckoutModel.Insurance = true;
        },

        ValidateFunction: function () {
            $.validator.addMethod("CreditCard", function (value, element) {
                var valueTemp = value.split("_").join("").split(" ").join("");
                var re = $rootScope.TextContants.Regex.CreditCard;
                if (valueTemp == "") return true;
                return re.test(valueTemp);
            }, $rootScope.TextContants.Message.requiredCreditCard);

            $.validator.addMethod("ExpirationDate", function (value, element) {
                var valueTemp = value.split("_").join("").split(" ").join("");
                var re = $rootScope.TextContants.Regex.ExpirationDate;
                if (valueTemp.split("/20").join("") == "") return true;
                return re.test(valueTemp);
            }, $rootScope.TextContants.Message.requiredExpirationDate);

            $.validator.addMethod("ExpirationDateMoreThanCurrent", function (value, element) {
                var valueTemp = value.split("_").join("").split(" ").join("");
                var valueMonth = valueTemp.split("/")[0];
                var yearValue = valueTemp.split("/")[1];
                if (valueMonth == "") {
                    return true;
                }else if (parseInt(yearValue) > $rootScope.OrderDetail.Model.CurrentYear) {
                    return true;
                }else if (parseInt(yearValue) < $rootScope.OrderDetail.Model.CurrentYear) {
                    return false;
                }else if (parseInt(valueMonth) >= $rootScope.OrderDetail.Model.CurrentMonth) {
                    return true;
                } else {
                    return false;
                }
            }, $rootScope.TextContants.Message.requiredExpirationDate);


            $.validator.addMethod("SecurityCode", function (value, element) {
                var valueTemp = value.split("_").join("").split(" ").join("");
                var re = $rootScope.TextContants.Regex.SecurityCode;
                if (valueTemp == "") return true;
                return re.test(valueTemp);
            }, $rootScope.TextContants.Message.requiredSecurityCode);

            $.validator.addMethod("Phone", function (value, element) {
                var valueTemp = value.split(" ").join("");
                var re = $rootScope.TextContants.Regex.Phone;
                if (valueTemp == "") return true;
                return re.test(valueTemp);
            }, $rootScope.TextContants.Message.requiredPhone);

            $.validator.addMethod("Email", function (value, element) {
                var valueTemp = value.split(" ").join("");
                var re = $rootScope.TextContants.Regex.Email;
                if (valueTemp == "") return true;
                return re.test(valueTemp);
            }, $rootScope.TextContants.Message.requiredEmail);

            $.validator.addMethod("ZipCode", function (value, element) {
                var valueTemp = value.split(" ").join("");
                valueTemp = valueTemp.split("_").join("");
                var re = $rootScope.TextContants.Regex.ZipCode;
                if (valueTemp == "") return true;
                return re.test(valueTemp);
            }, $rootScope.TextContants.Message.requiredZipCode);




            var rules = {
                FullName: {
                    required: false
                },
                Address : {
                    required: false
                },
                City : {
                    required: false
                },
                State : {
                    required: false
                },
                CreditCardNumber: {
                    CreditCard: true
                },
                ExpirationDate: {
                    ExpirationDate: true,
                    ExpirationDateMoreThanCurrent : true
                },
                SecurityCode: {
                    SecurityCode: true
                },
                Phone : {
                    Phone : true
                },
                Email: {
                    Email: true,
                    required: false
                },
                ZipCode : {
                    ZipCode : false
                }
            }

            var messages =
            {
                CreditCardNumber : {
                    CreditCard: $rootScope.TextContants.Message.requiredCreditCard
                },
                ExpirationDate : {
                    ExpirationDate: $rootScope.TextContants.Message.requiredExpirationDate,
                    ExpirationDateMoreThanCurrent: $rootScope.TextContants.Message.requiredExpirationDate
                },
                SecurityCode : {
                    SecurityCode: $rootScope.TextContants.Message.requiredSecurityCode
                },
                 Phone : {
                    Phone: $rootScope.TextContants.Message.requiredPhone
                },
                Email: {
                    Email: $rootScope.TextContants.Message.requiredEmail
                },
                ZipCode : {
                    ZipCode: $rootScope.TextContants.Message.requiredZipCode
                }
            }

            var frmBiographicalData = $('.frmCheckout');
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
                },
                validateOnInit: true
            });


        },
        ValidateForm : function() {
            if (!$("#frmCheckout").valid()) {
                return false;
            }
            return true;
        },
       
        Payment: function () {
            $("#divPaymentConfirm").closeModal();
            $scope.Checkout.AllowContinute = false;
            $rootScope.OrderDetail.FuntionSave.IsValid = true;
            $rootScope.CheckoutModel.Amount = $rootScope.OrderDetail.DetailPrice.TotalPrice.toFixed(2);
            $('.divWaitDialog').openModal({
                dismissible: false
            });
            var data = $rootScope.CheckoutModel;
            data.OrderId = $rootScope.OrderDetail.Model.Id;
            checkoutService.SaveCheckout(data).then(function (result) {

                if (result.Status == $rootScope.TextContants.Status.Success) {
                    $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                    $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    if (!data.Cash && !data.OurOffice && !data.Insurance) {
                        $('#divPaymentSuccess').openModal({ dismissible: false });
                    } else {
                        $('#divPaymentCashSuccess').openModal({ dismissible: false });
                        // $scope.Checkout.CallFunctionNextStep();
                    }
                } else if (result.Status == $rootScope.TextContants.Status.Error) {
                    $rootScope.OrderDetail.FuntionSave.IsValid = false;
                    $('#divPaymentError').openModal({ dismissible: false });
                }
                $scope.Checkout.AllowContinute = true;
            }, function (error) {
            }).finally(function() {
                $('.divWaitDialog').closeModal();
            });

            //var result = checkoutService.SaveCheckout(data);
            //if (result.Status == $rootScope.TextContants.Status.Success) {
            //    $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
            //    $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
            //    $('#divPaymentSuccess').openModal({ dismissible: false });
               
            //} else if (result.Status == $rootScope.TextContants.Status.Error) {
            //    $rootScope.OrderDetail.FuntionSave.IsValid = false;
            //    $('#divPaymentError').openModal({ dismissible: false });
            //}

        },
        SaveCheckout: function() {
            if ($scope.Checkout.ValidateForm()) {
                $("#divPaymentConfirm").openModal({ dismissible: false });
            } else {
                $rootScope.OrderDetail.FuntionSave.IsValid = false;
            }
        },
        CallFunctionNextStep : function() {
            $('#divPaymentSuccess').closeModal();
            $rootScope.Button.Next();
        }
    }

    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            if ($rootScope.OrderDetail.Model.Step == 13 && $rootScope.OrderDetail.Model.SectionStep == 12) {
                $rootScope.OrderDetail.Model.SectionStep = 13;
            }
            Materialize.updateTextFields();
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();

            $scope.Checkout.ValidateFunction();
            //$rootScope.OrderDetail.FuntionSave.SaveStep12 = $scope.Checkout.SaveCheckout;

            $('.ZipCode').mask('99999');
            
        }, $rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);

    });

}]);


