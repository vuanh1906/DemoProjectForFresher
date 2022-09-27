'use strict';

homeApp.controller("HomeController", ['$scope', '$window', '$cookieStore', function ($scope, $window, $cookieStore) {

    $scope.SectionStep = 0;
    $scope.ServiceType = "";

    $scope.ClearSection = function() {
        $.ajax({
            type: "POST",
            async: false,
            dataType: "json",
            url: '/DocuSign/ClearSection',
            success: function (results) {
                if (results.Status == "Success") {
                    $scope.SectionStep = 0;
                    //$window.sessionStorage.removeItem("ModelSessionStorage");
                    $cookieStore.remove('ModelSessionStorage');
                    $window.sessionStorage.removeItem("SessionSelectionData");
                    $scope.Continues();
                }
            }
        });
    }

    $scope.CheckIsHasSection = function () {
        var isHasSection = false;
        $.ajax({
            type: "POST",
            async: false,
            dataType: "json",
            url: '/DocuSign/CheckIsHasSection',
            success: function (results) {
                if (results.Status == "Success" && results.IsHasSection == "YES") {
                    isHasSection = true;
                    $scope.SectionStep = results.SectionStep;
                    $scope.ServiceType = results.ServiceType;
                } else {
                    $scope.SectionStep = 0;
                    $scope.Continues();
                }
            }
        });
        if (isHasSection) {
            $(".divClearSection").openModal({
                dismissible: false
            });
        }
    }

    $scope.Continues = function () {
        if ($scope.ServiceType == "Burial") {
            switch ($scope.SectionStep) {
                case 0:
                    window.location.href = "../AtNeedOrder#/StartOverview";
                    break;
                case 1:
                    window.location.href = "../AtNeedOrder#/StartTerms";
                    break;
                case 2:
                    window.location.href = "../AtNeedOrder#/BurialPackage";
                    break;
                case 3:
                    window.location.href = "../AtNeedOrder#/CasketPreference";
                    break;
                case 4:
                    window.location.href = "../AtNeedOrder#/VaultSelection"; // Casket
                    break;
                case 5:
                    window.location.href = "../AtNeedOrder#/BurialServiceProvided";
                    break;
                case 6:
                    window.location.href = "../AtNeedOrder#/BurialCemeterySetup"; //Picup and Burial Option
                    break;
                case 7:
                    window.location.href = "../AtNeedOrder#/BurialServiceDetail";
                    break;
                case 8:
                    window.location.href = "../AtNeedOrder#/BiographicalData";
                    break;
                case 9:
                    window.location.href = "../AtNeedOrder#/DecedantData";
                    break;
                case 10:
                    window.location.href = "../AtNeedOrder#/SurvivorData";
                    break;
                case 11:
                    window.location.href = "../AtNeedOrder#/MemorialServiceData";
                    break;
                case 12:
                    window.location.href = "../AtNeedOrder#/ThankYou";
                    break;
                case 13:
                    window.location.href = "../AtNeedOrder#/Checkout";
                    break;
                case 14:
                    window.location.href = "../AtNeedOrder#/FinalSteps";
                    break;
                default:
            }
        } else {
            switch ($scope.SectionStep) {
                case 0:
                    window.location.href = "../AtNeedOrder#/StartOverview";
                    break;
                case 1:
                    window.location.href = "../AtNeedOrder#/StartTerms";
                    break;
                case 2:
                    window.location.href = "../AtNeedOrder#/ServiceProvide";
                    break;
                case 3:
                    window.location.href = "../AtNeedOrder#/MemorialPackageItems";
                    break;
                case 4:
                    window.location.href = "../AtNeedOrder#/URN"; // urn 
                    break;
                case 5:
                    window.location.href = "../AtNeedOrder#/PickupRemains";
                    break;
                case 8:
                    window.location.href = "../AtNeedOrder#/BiographicalData";
                    break;
                case 9:
                    window.location.href = "../AtNeedOrder#/DecedantData";
                    break;
                case 10:
                    window.location.href = "../AtNeedOrder#/SurvivorData";
                    break;
                case 11:
                    window.location.href = "../AtNeedOrder#/MemorialServiceData";
                    break;
                case 12:
                    window.location.href = "../AtNeedOrder#/ThankYou";
                    break;
                case 13:
                    window.location.href = "../AtNeedOrder#/Checkout";
                    break;
                case 14:
                    window.location.href = "../AtNeedOrder#/FinalSteps";
                    break;
                default:
            }
        }
    }


}]);