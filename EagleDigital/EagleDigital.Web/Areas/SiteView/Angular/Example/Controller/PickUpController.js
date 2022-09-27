'use strict';

app.controller("PickUpController", ['$scope', '$rootScope', '$location', '$timeout', 'pickUpService', function ($scope, $rootScope, $location, $timeout, pickUpService) {
    $rootScope.OrderDetail.Model.Step = 14;

    $scope.PickUp = {
        LeftOff: function () {
            $rootScope.Button.SelectStep($rootScope.OrderDetail.Model.SectionStep);
        }
    }

    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
         
        });
    });


}]);