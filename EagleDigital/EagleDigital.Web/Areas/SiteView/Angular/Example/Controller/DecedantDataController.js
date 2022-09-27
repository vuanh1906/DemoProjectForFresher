'use strict';

app.controller("DecedantDataController", ['decedantDataService', '$scope', '$rootScope', '$timeout', function (decedantDataService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 9;

    $scope.CheckRequiredImplants = function () {
        if (!$rootScope.OrderDetail.Model.Decedent_IsPacemaker && !$rootScope.OrderDetail.Model.Decedent_IsDefibilator && !$rootScope.OrderDetail.Model.Decedent_IsRadioActive && !$rootScope.OrderDetail.Model.Decedent_IsOtherBattery && !$rootScope.OrderDetail.Model.Decedent_IsNoHazardous) {
            return true;
        }
        return false;
    }
    

    $scope.DecedantData = {
        IsShowListInBrand: true,
        CalculateAge: function () {
            if (   $rootScope.OrderDetail.Model.Decedent_BirthDate == null
                || $rootScope.OrderDetail.Model.Decedent_BirthDate == undefined
                || $rootScope.OrderDetail.Model.Decedent_BirthDate == ""
                || $rootScope.OrderDetail.Model.Decedent_DateOfDeath == null
                || $rootScope.OrderDetail.Model.Decedent_DateOfDeath == undefined
                || $rootScope.OrderDetail.Model.Decedent_DateOfDeath == "")
            {
                $rootScope.OrderDetail.Model.Decedent_CurrentAge = 0;
            }else
            {
                //var todayDay = $rootScope.OrderDetail.Model.CurrentDate;
                //var todayMonth = $rootScope.OrderDetail.Model.CurrentMonth;
                //var todayYear = $rootScope.OrderDetail.Model.CurrentYear;
                var birthDay = $rootScope.OrderDetail.Model.Decedent_BirthDate != null ? $rootScope.OrderDetail.Model.Decedent_BirthDate.split("-")[1] : "";
                var birthMonth = $rootScope.OrderDetail.Model.Decedent_BirthDate != null ? $rootScope.OrderDetail.Model.Decedent_BirthDate.split("-")[0] : "";
                var birthYear = $rootScope.OrderDetail.Model.Decedent_BirthDate != null ? $rootScope.OrderDetail.Model.Decedent_BirthDate.split("-")[2] : "";

                var todayDay = $rootScope.OrderDetail.Model.Decedent_DateOfDeath != null ? $rootScope.OrderDetail.Model.Decedent_DateOfDeath.split("-")[1] : "";
                var todayMonth = $rootScope.OrderDetail.Model.Decedent_DateOfDeath != null ? $rootScope.OrderDetail.Model.Decedent_DateOfDeath.split("-")[0] : "";
                var todayYear = $rootScope.OrderDetail.Model.Decedent_DateOfDeath != null ? $rootScope.OrderDetail.Model.Decedent_DateOfDeath.split("-")[2] : "";

                $rootScope.OrderDetail.Model.Decedent_CurrentAge = $rootScope.TextContants.CalculateAge(todayDay, todayMonth, todayYear, parseInt(birthDay), parseInt(birthMonth), parseInt(birthYear));
            }
            Materialize.updateTextFields();
        },
        CheckFollowInplants : function() {
            if ($rootScope.OrderDetail.Model.Decedent_IsPacemaker == true ||
                $rootScope.OrderDetail.Model.Decedent_IsDefibilator == true ||
                $rootScope.OrderDetail.Model.Decedent_IsRadioActive == true ||
                $rootScope.OrderDetail.Model.Decedent_IsOtherBattery == true) {
                $rootScope.OrderDetail.Model.Decedent_IsNoHazardous = false;
            } 
        },
        CheckFollowInplants_NoHazardous : function() {
            if ($rootScope.OrderDetail.Model.Decedent_IsNoHazardous == true) {
                $rootScope.OrderDetail.Model.Decedent_IsPacemaker = false;
                $rootScope.OrderDetail.Model.Decedent_IsDefibilator = false;
                $rootScope.OrderDetail.Model.Decedent_IsRadioActive = false;
                $rootScope.OrderDetail.Model.Decedent_IsOtherBattery = false;
            }
        },
        SelectInBrand: function () {
                if ($rootScope.OrderDetail.Model.Decedent_IsArmedForces) {
                    $scope.DecedantData.IsShowListInBrand = true;
                } else {
                    $scope.DecedantData.IsShowListInBrand = false;
                }
            return $rootScope.OrderDetail.Model.Decedent_IsArmedForces;
        }, 

        ValidateFunction: function () {
        },
        ValidateForm: function () {
            return true;
        },
        SaveDecedantData: function () {
            if ($scope.DecedantData.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;

                $rootScope.OrderDetail.Model.Decedent_EducationId = $rootScope.OrderDetail.SelectionData.Education.Choose!=null?  $rootScope.OrderDetail.SelectionData.Education.Choose.Id : "";
                $rootScope.OrderDetail.Model.Decedent_CountryId = $rootScope.OrderDetail.SelectionData.Country_DecedantData.Choose!=null? $rootScope.OrderDetail.SelectionData.Country_DecedantData.Choose.Id : "";
                $rootScope.OrderDetail.Model.Decedent_Branch =  $rootScope.OrderDetail.SelectionData.InBrand.Choose!=null ? $rootScope.OrderDetail.SelectionData.InBrand.Choose.Name : "";
                $rootScope.OrderDetail.Model.Decedent_MaritalStatus = $rootScope.OrderDetail.SelectionData.MaritalStatus.Choose != null ? $rootScope.OrderDetail.SelectionData.MaritalStatus.Choose.Name : "";

                $rootScope.OrderDetail.Model.Decedent_Hospital = $rootScope.OrderDetail.SelectionData.ListHospital.Choose != null ? $rootScope.OrderDetail.SelectionData.ListHospital.Choose.Name : "";

                //var hospitalOtherValue = ($rootScope.OrderDetail.SelectionData.ListHospitalOrther.Choose != null && $rootScope.OrderDetail.SelectionData.ListHospitalOrther.Choose !="") ? $rootScope.OrderDetail.SelectionData.ListHospitalOrther.Choose.Name : "";
                //$rootScope.OrderDetail.Model.Decedent_HospitalOther = hospitalOtherValue != 'Other' ? hospitalOtherValue : $rootScope.OrderDetail.Model.Decedent_HospitalOtherValue;

                var hispanicOrigin = ($rootScope.OrderDetail.SelectionData.ListHispanicOrigin.Choose != null && $rootScope.OrderDetail.SelectionData.ListHispanicOrigin.Choose != "") ? $rootScope.OrderDetail.SelectionData.ListHispanicOrigin.Choose.Name : "";
                if (hispanicOrigin.length != 0) $rootScope.OrderDetail.Model.Decedent_HispanicOrigin = hispanicOrigin;

                var decedentRace = ($rootScope.OrderDetail.SelectionData.ListDecedentRace.Choose != null && $rootScope.OrderDetail.SelectionData.ListDecedentRace.Choose != "") ? $rootScope.OrderDetail.SelectionData.ListDecedentRace.Choose.Name : "";
                if (decedentRace.length != 0) $rootScope.OrderDetail.Model.Decedent_Race = decedentRace;

                //var methodOfDisposition = ($rootScope.OrderDetail.SelectionData.ListMethodOfDisposition.Choose != null && $rootScope.OrderDetail.SelectionData.ListDecedentRace.Choose != "") ? $rootScope.OrderDetail.SelectionData.ListMethodOfDisposition.Choose.Name : "";
                //if (methodOfDisposition.length != 0) $rootScope.OrderDetail.Model.Decedent_MethodOfDisposition = methodOfDisposition;

                // set time of date
                $rootScope.OrderDetail.Model.Decedent_TimeofDeath = $rootScope.OrderDetail.Model.Decedent_TimeofDeath_Hours + ":" + $rootScope.OrderDetail.Model.Decedent_TimeofDeath_Minutes + " " + $rootScope.OrderDetail.Model.Decedent_TimeofDeath_APM;

                var data = $rootScope.OrderDetail.Model;
                decedantDataService.SaveDecedantData(data).then(function (result) {
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

            $scope.DecedantData.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep9 = $scope.DecedantData.SaveDecedantData;


            $('.ZipCode').mask('99999');
            $('select').material_select();

            $("#socialSecurityNumber").mask('999-99-9999');

            //$('#TimeofDeath').timepicker({
            //    hourGrid: 4,
            //    minuteGrid: 10,
            //    timeFormat: 'hh:mm tt'
            //});

            //$('#TimeofDeath').focus(function () {
            //    $(".ui-timepicker-div > .ui-widget-header").css("display", "none");
            //    $(".ui-timepicker-div > dl > .ui_tpicker_time_label").css("display", "none");
            //    $(".ui-timepicker-div > dl > .ui_tpicker_time").css("display", "none");
            //});

            var fromDate = $('#BirthDate').pickadate({
                selectMonths: true,
                selectYears: 200,
                min: '01/01/1900',
                max: new Date(),
                format: 'mm-dd-yyyy',
                format_submit: 'mm-dd-yyyy'
            });

            var todate = $('#dateOfDeath').pickadate({
                selectMonths: true,
                selectYears: 200,
                min: '01/01/1900',
                max: new Date(),
                format: 'mm-dd-yyyy',
                format_submit: 'mm-dd-yyyy'
            });


           

            var fromPicker = fromDate.pickadate('picker');
            var toPicker = todate.pickadate('picker');

            fromPicker.on('set', function (context) {
                if (context) {
                    if (context.select) {
                        toPicker.set('min', new Date(context.select));
                        this.close();
                    }
                    if (context.hasOwnProperty('clear')) {
                        fromDate.siblings('label, i').removeClass('active');
                        toPicker.set('min', new Date(2015, 1));
                    }
                    
                }
            });

            toPicker.on('set', function (context) {
                if (context) {
                    if (context.select) {
                        fromPicker.set('max', new Date(context.select));
                        this.close();
                    }
                    if (context.hasOwnProperty('clear')) {
                        todate.siblings('label, i').removeClass('active');
                        fromPicker.set('max', new Date());
                    }
                    
                }
            });

            if ($("#dateOfDeath").val() != "") {
                fromPicker.set('max', $("#dateOfDeath").val());
            }

            if ($('#BirthDate').val() != "") {
                toPicker.set('min', $('#BirthDate').val());
            }
            Materialize.updateTextFields();
        },$rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);

    });

}]);