'use strict';

app.factory('serviceProvideService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var serviceProvideService = {
        SaveServiceProvide: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveServiceProvide', dataSave).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;

                //var returnValue;
                //$.ajax({
                //    type: 'POST',
                //    async: false,
                //    contentType: 'application/json; charset=utf-8',
                //    url: '/AtNeedOrder/SaveServiceProvide',
                //    data: JSON.stringify(dataSave),
                //    success: function (result) {
                //        returnValue= result;
                //    }
                //});
                //return returnValue;

        },
        GetModelAsFormData: function (data) {
            var dataAsFormData = new FormData();
            angular.forEach(data, function (value, key) {
                dataAsFormData.append(key, value);
            });
            return dataAsFormData;
        },
        ZipCode_API_GetCityName: function (zipcode) {
            var model = {
                ZipCode: zipcode
            }
            var deferred = $q.defer();
            $http.post('/ZipCode/GetZipCodeInfor', model).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        },
        SaveModel: function (data, url) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: "POST",
                data: serviceProvideService.GetModelAsFormData(data),
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).success(function (result) {
                deferred.resolve(result);
            }).error(function (result, status) {
                deferred.reject(status);
            });
            return deferred.promise;
        },
        SaveTutorial: function (tutorial) {
            return serviceProvideService.SaveModel(tutorial, "/AtNeedOrder/UploadFile");
        }
    };
    return serviceProvideService;
}]).directive("akFileModel", ["$parse",
                function ($parse) {
                    return {
                        restrict: "A",
                        link: function (scope, element, attrs) {
                            var model = $parse(attrs.akFileModel);
                            var modelSetter = model.assign;
                            element.bind("change", function (event) {
                                scope.$apply(function () {
                                    modelSetter(scope, element[0].files[0]);
                                });

                                // valid image
                                var fileList = event.target.files;
                                for (var i = 0; i < fileList.length; i++) {
                                    var file = fileList[i];
                                    var sFileName = file.name;
                                    var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
                                    var iFileSize = file.size;
                                    var iConvert = (file.size / 1048576).toFixed(2);

                                    if (sFileExtension != "jpg" &&
                                        sFileExtension != "png" &&
                                        sFileExtension != "jpeg" &&
                                        sFileExtension != "tif" &&
                                        sFileExtension != "gif" &&
                                        sFileExtension != "bmp") {
                                        scope.ServiceProvide.IsValidPhoto = false;
                                        scope.OrderDetail.Model.PhotoUrl = "";
                                    } else {
                                        scope.ServiceProvide.IsValidPhoto = true;
                                    }
                                    if (iFileSize > 10485760) {
                                        scope.ServiceProvide.IsValidSizePhoto = false;
                                        scope.ServiceProvide.IsValidSizePhoto = false;
                                        scope.OrderDetail.Model.PhotoUrl = "";
                                        scope.TextContants.Message.requiredSizePhoto = "File must be below 10BM. That one was " + iConvert + "MB!";
                                    } else {
                                        scope.ServiceProvide.IsValidSizePhoto = true;
                                    }

                                    
                                }
                            });
                        }
                    };
}]);;