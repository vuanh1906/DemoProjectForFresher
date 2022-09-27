'use strict';

app.controller("StartOverviewController", ['$scope', '$rootScope', '$location', 'startOverviewService', '$timeout', function ($scope, $rootScope, $location, startOverviewService, $timeout) {
    $rootScope.OrderDetail.Model.Step = 0;

    $scope.StartOverview = {
        IsHasSection: false,
        ClearSection : function() {
            startOverviewService.ClearSection().then(function (result) {
                $rootScope.OrderDetail.Model = angular.copy($rootScope.OrderDetail.TempToResetModel);
                $rootScope.OrderDetail.SelectionData = angular.copy($rootScope.OrderDetail.TempToResetSelectionData);
                $rootScope.TextContants.IsAgree = false;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $(".divClearSection").closeModal();
                $rootScope.Button.GetStarted();
            }, function (error) {
            });
        },
        DoneClearSection: function () {
            $(".divClearSection").closeModal();
            $rootScope.Button.GetStarted();
        },
        CheckIsHasSection : function() {
            startOverviewService.CheckIsHasSection().then(function (result) {
                if (result.IsHasSection == $rootScope.TextContants.IsHasSection.Yes) {
                    $(".divClearSection").openModal({
                        dismissible: false
                    });
                } else {
                    $rootScope.Button.GetStarted();
                }
            }, function (error) {
            });
        }, SetWidthHeight: function () {
            var maxHeight = 0;
            $('.card .body').each(function () {
                if ($(this).outerHeight() > maxHeight) {
                    maxHeight = $(this).outerHeight();
                }
            });
            $('.card .body').outerHeight(maxHeight);
        }
    }

    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            $('.ZipCode').mask('99999');
        });

        $timeout(function () {
            $('.card .body').css("height", "auto");
            $scope.StartOverview.SetWidthHeight();
        }, 200);

        //$(window).on("load resize", function () {
        //    setTimeout(function () {
        //        $('.card .body').css("height", "auto");
        //        setWidthHeight();
        //    }, 300);
        //});

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);

    });

}]);