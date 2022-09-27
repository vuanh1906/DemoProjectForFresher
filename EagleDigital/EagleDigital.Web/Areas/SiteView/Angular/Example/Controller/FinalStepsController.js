'use strict';


app.controller("FinalStepsController", ['finalStepsService', '$scope', '$rootScope', '$timeout', '$sce', '$window', '$cookieStore', function (finalStepsService, $scope, $rootScope, $timeout, $sce, $window, $cookieStore) {
    $rootScope.OrderDetail.Model.Step = 14;
    
    $scope.FinalSteps = {
        UpdateModelSessionStorage: function (fileNameGoodsServices, locationY, fileNameLegalNext, fileNameCremation, fileNameDeathCertificate) {
            //var session = angular.fromJson($window.sessionStorage.getItem("ModelSessionStorage"));
            var session = angular.fromJson($cookieStore.get("ModelSessionStorage"));

            session.FinalSteps.GoodsServices.FileName = fileNameGoodsServices;
            session.FinalSteps.GoodsServices.LocationY = locationY;
            session.FinalSteps.LegalNext.FileName = fileNameLegalNext;
            session.FinalSteps.Cremation.FileName = fileNameCremation;
            session.FinalSteps.DeathCertificate.FileName = fileNameDeathCertificate;
            session.IsLoadedFinalSteps = true;
            session.SectionStep = $rootScope.OrderDetail.Model.Step;
            //$window.sessionStorage.setItem("ModelSessionStorage", angular.toJson(session));
            $cookieStore.put("ModelSessionStorage", angular.toJson(session));

        },
        FillModelSessionStorage : function() {
            //var session = angular.fromJson($window.sessionStorage.getItem("ModelSessionStorage"));
            var session = angular.fromJson($cookieStore.get("ModelSessionStorage"));

            $scope.FinalSteps.GoodsServices.FileName = session.FinalSteps.GoodsServices.FileName;
            $scope.FinalSteps.GoodsServices.LocationY = session.FinalSteps.GoodsServices.LocationY;

            $scope.FinalSteps.LegalNext.FileName = session.FinalSteps.LegalNext.FileName;
            $scope.FinalSteps.Cremation.FileName = session.FinalSteps.Cremation.FileName;

            $rootScope.OrderDetail.Model.UrlDocusign_DeathCertificate = session.FinalSteps.DeathCertificate.FileName;
            $rootScope.OrderDetail.Model.UrlDocusign_LegalNext = session.FinalSteps.LegalNext.FileName;
        },
        SetModelSessionStorage_IsComplate : function() {
            //var session = angular.fromJson($window.sessionStorage.getItem("ModelSessionStorage"));
            var session = angular.fromJson($cookieStore.get("ModelSessionStorage"));
            session.FinalSteps.IsComplate = true;
            //$window.sessionStorage.setItem("ModelSessionStorage", angular.toJson(session));
            $cookieStore.put("ModelSessionStorage", angular.toJson(session));
        },
        SetiWant: function () {
            $scope.FinalSteps.iWant = true;
            $scope.FinalSteps.iPrint = false;
        },
        SetiPrint: function () {
            $scope.FinalSteps.iWant = false;
            $scope.FinalSteps.iPrint = true;
        },
        GetDataToModelLegalNext: function () {
            var relationshipName = ""; 
            var relationship = $.grep($rootScope.OrderDetail.SelectionData.Relationship.List, function (e) { return e.Id == $rootScope.OrderDetail.Model.RelationshipId; });
            if (relationship.length != 0) relationshipName = relationship[0].Name;

            var model = {
                RecipientEmail: $rootScope.OrderDetail.Model.Relationship_Email,
                RecipientName: $rootScope.OrderDetail.Model.Relationship_TitleName + " " + $rootScope.OrderDetail.Model.Relationship_FirstName + " " + $rootScope.OrderDetail.Model.Relationship_LastName + " " + $rootScope.OrderDetail.Model.Relationship_SuffixName,
                DateSign: "",
                DecedentBirthDate: $rootScope.OrderDetail.Model.Decedent_BirthDate,
                DecedentName :  $rootScope.OrderDetail.Model.Decedent_TitleName + " " + $rootScope.OrderDetail.Model.Decedent_FirstName + " " + $rootScope.OrderDetail.Model.Decedent_MiddleName + " " + $rootScope.OrderDetail.Model.Decedent_LastName + " " + $rootScope.OrderDetail.Model.Decedent_SuffixName,
                PrintName:  $rootScope.OrderDetail.Model.Relationship_TitleName + " " + $rootScope.OrderDetail.Model.Relationship_FirstName + " " + $rootScope.OrderDetail.Model.Relationship_LastName + " " + $rootScope.OrderDetail.Model.Relationship_SuffixName,
                Relationship: relationshipName,
                Address :   $rootScope.OrderDetail.Model.Relationship_Address,
                City : $rootScope.OrderDetail.Model.Relationship_City,
                State : $rootScope.OrderDetail.Model.Relationship_State,
                ZipCode :  $rootScope.OrderDetail.Model.Relationship_ZipCode ,
                Phone: $rootScope.OrderDetail.Model.Relationship_PrimaryPhone,
                WitneesMy : "" ,
                DayOf :  "",
                Year : "",
                Witness :"" 
            }
            return model;
        },
        GetDataToModelGoodsServices: function () {
            var model = {
                BurialPackages: "",
                ServiceType: $rootScope.OrderDetail.Model.ServiceType,
                SocialSecurity: $rootScope.OrderDetail.Model.Decedent_SocialSecurity,
                RecipientEmail: $rootScope.OrderDetail.Model.Relationship_Email,
                RecipientName: $rootScope.OrderDetail.Model.Relationship_TitleName + " " + $rootScope.OrderDetail.Model.Relationship_FirstName + " " + $rootScope.OrderDetail.Model.Relationship_LastName + " " + $rootScope.OrderDetail.Model.Relationship_SuffixName,
                Name: $rootScope.OrderDetail.Model.Decedent_TitleName + " " + $rootScope.OrderDetail.Model.Decedent_FirstName + " " + $rootScope.OrderDetail.Model.Decedent_MiddleName + " " + $rootScope.OrderDetail.Model.Decedent_LastName + " " + $rootScope.OrderDetail.Model.Decedent_SuffixName,
                Address: $rootScope.OrderDetail.Model.Decedent_Address,
                PhoneNumber: $rootScope.OrderDetail.Model.Relationship_PrimaryPhone,
                FuneralService: $rootScope.OrderDetail.Model.Decedent_TitleName + " " + $rootScope.OrderDetail.Model.Decedent_FirstName + " " + $rootScope.OrderDetail.Model.Decedent_MiddleName + " " + $rootScope.OrderDetail.Model.Decedent_LastName + " " + $rootScope.OrderDetail.Model.Decedent_SuffixName,
                DateOfDeath: $rootScope.OrderDetail.Model.Decedent_DateOfDeath,
                DateOfDeathString: "January 1, 2016",
                DateOfStatement: new Date(),
                DateOfStatementString: "January 1, 2016",

                Relationship_FistName: $rootScope.OrderDetail.Model.Relationship_FirstName ,
                Relationship_LastName: $rootScope.OrderDetail.Model.Relationship_LastName,
                Relationship_Address: $rootScope.OrderDetail.Model.Relationship_Address,
                Relationship_Phone: $rootScope.OrderDetail.Model.Relationship_PrimaryPhone,

                TotalPriceString: "Total Price",
                TotalPrice: $rootScope.OrderDetail.DetailPrice.TotalPrice,
                TotalPriceQty: 1,

                BasePriceString: "Base Price",
                BasePrice: $rootScope.OrderDetail.DetailPrice.BasePrice,
                BasePriceQty: 1,


                CityCremationPriceString: $rootScope.OrderDetail.Model.CityCremationName,
                CityCremationPrice: $rootScope.OrderDetail.DetailPrice.CityCremationPrice,
                CityCremationPriceQty: 1,

                BurialLocationPriceString: $rootScope.OrderDetail.Model.Burial_LocationCityState,
                BurialLocationPrice: $rootScope.OrderDetail.DetailPrice.BurialLocationPrice,
                BurialLocationPriceQty: 1,

                LocationPriceString: ($rootScope.OrderDetail.SelectionData.LocationCremation.Choose != null && $rootScope.OrderDetail.SelectionData.LocationCremation.Choose != "") ? $rootScope.OrderDetail.SelectionData.LocationCremation.Choose.Name : "",
                LocationPrice: $rootScope.OrderDetail.DetailPrice.LocationCremationPrice,
                LocationPriceQty: 1,

                ObituaryPreparationPriceString: "Obituary Preparation",
                ObituaryPreparationPrice: $rootScope.OrderDetail.DetailPrice.ObituaryPreparationPrice,
                ObituaryPreparationPriceQty: 1,

                OnlineGuestbookPriceString: "Online Guestbook",
                OnlineGuestbookPrice: $rootScope.OrderDetail.DetailPrice.OnlineGuestbookPrice,
                OnlineGuestbookPriceQty: 1,

                QtyCertifiedPriceString: ($rootScope.OrderDetail.SelectionData.QtyCertified.Choose != null && $rootScope.OrderDetail.SelectionData.QtyCertified.Choose != "") ? $rootScope.OrderDetail.SelectionData.QtyCertified.Choose.Name : "",
                QtyCertifiedPrice: $rootScope.OrderDetail.DetailPrice.QtyCertifiedPrice,
                QtyCertifiedPriceQty: 1,

                MemorialServicePriceString: ($rootScope.OrderDetail.SelectionData.MemorialService.Choose != null && $rootScope.OrderDetail.SelectionData.MemorialService.Choose != "") ? $rootScope.OrderDetail.SelectionData.MemorialService.Choose.Name : "",
                MemorialServicePrice: $rootScope.OrderDetail.DetailPrice.MemorialServicePrice,
                MemorialServicePriceQty: 1,

                SpecializedCarePriceString: ($rootScope.OrderDetail.SelectionData.SpecializedCare.Choose != null && $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose != "") ? $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose.Name : "",
                SpecializedCarePrice: $rootScope.OrderDetail.DetailPrice.SpecializedCarePrice,
                SpecializedCarePriceQty: 1,


                MemorialPackageSelects: [],
                URNPriceString: $rootScope.OrderDetail.URNSelectionName,
                URNPrice: $rootScope.OrderDetail.DetailPrice.URNPrice,
                URNPriceQty: 1,

                CasketPreferencePriceString: $rootScope.OrderDetail.CasketPreferenceName,
                CasketPreferencePrice: $rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowCasket() == true ? $rootScope.OrderDetail.DetailPrice.CasketPreferencePrice : 0,
                CasketPreferenceQty: 1,
                CasketPreferencePriceHasInPackage: $rootScope.OrderDetail.DetailPrice.CasketPreferencePriceHasInPackage,

                VaultSelectionPriceString: ($rootScope.OrderDetail.SelectionData.VaultSelection.Choose != null && $rootScope.OrderDetail.SelectionData.VaultSelection.Choose != "") ? $rootScope.OrderDetail.SelectionData.VaultSelection.Choose.Name : "",
                VaultSelectionPrice: $rootScope.OrderDetail.DetailPrice.VaultSelectionPrice,
                VaultSelectionQty: 1,

                PickupRemainPriceString: ($rootScope.OrderDetail.SelectionData.PickupRemain.Choose != null && $rootScope.OrderDetail.SelectionData.PickupRemain.Choose != "") ? $rootScope.OrderDetail.SelectionData.PickupRemain.Choose.Name : "",
                PickupRemainPrice: $rootScope.OrderDetail.DetailPrice.PickupRemainPrice,
                PickupRemainPriceQty: 1,
                LocationY: $scope.FinalSteps.GoodsServices.LocationY,
                FileName: $scope.FinalSteps.GoodsServices.FileName,

                //Burial
                BurialPackagePriceString: $rootScope.OrderDetail.BurialPackageName,
                BurialPackagePrice: $rootScope.OrderDetail.BurialPackagePrice,
                BurialPackagePriceItemHasInPackage : $rootScope.OrderDetail.DetailPrice.BurialPackagePriceItemHasInPackage,
                BurialPackageQty: 1,

                CemeterySetupPriceString: "Cemetery Setup",
                CemeterySetupPrice: $rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowCemeterySetup() == true ? $rootScope.OrderDetail.Model.CemeterySetupPrice : 0,
                CemeterySetupQty: 1,

                BurialServiceSelects : [],
                BurialMemorialPackageSelects: [],
                BurialAdditioinalSelectets : []
            };


            var packageitem = $.grep($rootScope.OrderDetail.SelectionData.BurialPackages.List, function (e) {
                return e.Id == $rootScope.OrderDetail.Model.BurialPackageId;
            });
            if (packageitem.length != 0) model.BurialPackages = packageitem[0].Name;

            for (var i = 0; i < $rootScope.OrderDetail.SelectionData.MemorialPackage.List.length; i++) {
                var item = {
                    MemorialPackageItemPriceString: "",
                    MemorialPackageItemPrice: 0,
                    MemorialPackageItemPriceQty: 1
                };

                if ($rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].CountPackageItem == 0) {
                    if ($rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].IsCheck == true) {
                        item.MemorialPackageItemPriceString = $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].Name;
                        item.MemorialPackageItemPrice = $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].Price;
                        item.MemorialPackageItemPriceQty = 1;
                        model.MemorialPackageSelects.push(item);
                    }
                } else {
                    if ($rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].MemorialPackageItemSelect != '') {
                        item.MemorialPackageItemPriceString = $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].MemorialPackageItemSelect.Name;
                        item.MemorialPackageItemPrice = $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].MemorialPackageItemSelect.Price;
                        item.MemorialPackageItemPriceQty = 1;
                        model.MemorialPackageSelects.push(item);
                    }
                }
            }

            for (var j = 0; j < $rootScope.OrderDetail.SelectionData.BurialServices.List.length; j++) {
                var item = {
                    BurialServicePriceString: "",
                    BurialServicePrice: 0,
                    BurialServicePriceQty : 1
                }

                if ($rootScope.OrderDetail.SelectionData.BurialServices.List[j].IsCheck) {
                    item.BurialServicePriceString = $rootScope.OrderDetail.SelectionData.BurialServices.List[j].Name;
                    item.BurialServicePrice = $rootScope.OrderDetail.SelectionData.BurialServices.List[j].Price;
                    item.BurialServicePriceQty = 1;
                    model.BurialServiceSelects.push(item);
                }
            }


            for (var j = 0; j < $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List.length; j++) {
                var item = {
                    MemorialPackageItemPriceString: "",
                    MemorialPackageItemPrice: 0,
                    MemorialPackageItemPriceQty: 1
                };

                if ($rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[j].IsCheck && $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[j].InPackage != true) {
                    var priceUpgradeOrDowngrade = $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[j].PriceNoTax - $rootScope.OrderDetail.DetailPrice.BurialPackagePriceItemHasInPackage;
                    var isUpgrade = false;
                    var isDowngrade = false;
                    if (priceUpgradeOrDowngrade != 0) {
                        isUpgrade = priceUpgradeOrDowngrade > 0 ? true : false;
                        isDowngrade = priceUpgradeOrDowngrade > 0 ? false : true;
                    }

                    item.MemorialPackageItemPriceString = $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[j].Name;
                    item.MemorialPackageItemPrice = priceUpgradeOrDowngrade;
                    item.IsUpgrade = isUpgrade;
                    item.IsDowngrade = isDowngrade;
                    item.MemorialPackageItemPriceQty = 1;
                    model.BurialMemorialPackageSelects.push(item);
                }
            }

            for (var j = 0; j < $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List.length; j++) {
                var item = {
                    MemorialPackageItemPriceString: "",
                    MemorialPackageItemPrice: 0,
                    MemorialPackageItemPriceQty: 1,
                    IsHasTax : true
                };

                if ($rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty != 0 && $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty != '' && $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty != null) {
                    item.MemorialPackageItemPriceString = $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Name;
                    item.MemorialPackageItemPrice = $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].PriceNoTax * $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty;
                    item.MemorialPackageItemPriceQty = $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty;
                    item.IsHasTax = $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].IsHasTax;
                    model.BurialAdditioinalSelectets.push(item);
                }
            }

            return model;
        },
        GetDataToModelCremation: function () {


            $rootScope.OrderDetail.Model.Decedent_Hospital = $rootScope.OrderDetail.SelectionData.ListHospital.Choose != null ? $rootScope.OrderDetail.SelectionData.ListHospital.Choose.Name : "";
            var placeOfDeath = ($rootScope.OrderDetail.Model.Decedent_LocationOfDeath != '' && $rootScope.OrderDetail.Model.Decedent_LocationOfDeath != null) ? $rootScope.OrderDetail.Model.Decedent_LocationOfDeath : "";
            var itemRelationship = $.grep($rootScope.OrderDetail.SelectionData.Relationship.List, function (e) { return e.Id == $rootScope.OrderDetail.Model.RelationshipId; });

            var cbIsPickUpCremation = $.grep($rootScope.OrderDetail.SelectionData.PickupRemain.List, function (e) { return e.Name.indexOf($rootScope.TextContants.PickupRemain.PickUp10days) != -1 && e.Id == $rootScope.OrderDetail.Model.PickupRemainId; });
            var cbIsShipCremation = $.grep($rootScope.OrderDetail.SelectionData.PickupRemain.List, function (e) { return e.Name.indexOf($rootScope.TextContants.PickupRemain.ShipUSPS) != -1 && e.Id == $rootScope.OrderDetail.Model.PickupRemainId; });
            var cbIsShipUrn = $.grep($rootScope.OrderDetail.SelectionData.PickupRemain.List, function (e) { return e.Name.indexOf($rootScope.TextContants.PickupRemain.ShipUrn) != -1 && e.Id == $rootScope.OrderDetail.Model.PickupRemainId; });
            var cbIsPersonal = $.grep($rootScope.OrderDetail.SelectionData.PickupRemain.List, function (e) { return e.Name.indexOf($rootScope.TextContants.PickupRemain.Personal) != -1 && e.Id == $rootScope.OrderDetail.Model.PickupRemainId; });

            var model = {
                RecipientEmail: $rootScope.OrderDetail.Model.Relationship_Email,
                RecipientName: $rootScope.OrderDetail.Model.Relationship_TitleName + " " + $rootScope.OrderDetail.Model.Relationship_FirstName + " " + $rootScope.OrderDetail.Model.Relationship_LastName + " " + $rootScope.OrderDetail.Model.Relationship_SuffixName,
                No: $rootScope.OrderDetail.Model.Id,
                HumanRemains: $rootScope.OrderDetail.Model.Decedent_TitleName + " " + $rootScope.OrderDetail.Model.Decedent_FirstName + " " + $rootScope.OrderDetail.Model.Decedent_LastName + " " + $rootScope.OrderDetail.Model.Decedent_SuffixName,
                DateOfDeath: $rootScope.OrderDetail.Model.Decedent_DateOfDeath,
                TimeOfDeath: $rootScope.OrderDetail.Model.Decedent_TimeofDeath,
                cbAM: "",
                cbPM: "",
                PlaceOfDeath: placeOfDeath,
                //Country: $rootScope.OrderDetail.Model.Decedent_County,
                Country: $rootScope.OrderDetail.SelectionData.Country_DecedantData.Choose != null ? $rootScope.OrderDetail.SelectionData.Country_DecedantData.Choose.Name : "",
                Age: $rootScope.OrderDetail.Model.Decedent_CurrentAge,
                State: $rootScope.OrderDetail.Model.Decedent_State,
                Sex: $rootScope.OrderDetail.Model.Decedent_Sex,
                Race: $rootScope.OrderDetail.Model.Decedent_Race,
                cbWasDeathYes: $rootScope.OrderDetail.Model.Decedent_IsWasDeathCaused!=null?$rootScope.OrderDetail.Model.Decedent_IsWasDeathCaused : false,
                WasDeathCausedValue: $rootScope.OrderDetail.Model.Decedent_WasDeathCausedValue != null ? $rootScope.OrderDetail.Model.Decedent_WasDeathCausedValue : "",
                cbcbWasDeathNo :"",
                cbImplantYes: ($rootScope.OrderDetail.Model.Decedent_IsPacemaker || $rootScope.OrderDetail.Model.Decedent_IsDefibilator || $rootScope.OrderDetail.Model.Decedent_IsRadioActive || $rootScope.OrderDetail.Model.Decedent_IsOtherBattery),
                cbImplantNo: "",
                PriorCremation: "",
                cbFinal1: "",
                cbFinal2: "",
                cbFinal3: "",
                cbFinal4: "",
                txtFinal_11: "",
                txtFinal_12: "",
                txtFinal_4: "",
                txtAuthority_1: "",
                txtAuthority_2: "",
                Sign_ExecutedAt: "",
                Sign_ExecutedAt_This: "",
                Sign_ExecutedAt_DayOf: "",
                Sign_ExecutedAt_OfYear: "",
                Sign_Name1: $rootScope.OrderDetail.Model.Relationship_FirstName + " " + $rootScope.OrderDetail.Model.Relationship_LastName,
                Sign_Name1_RelationshipDecedent: itemRelationship.length != 0 ? itemRelationship[0].Value : '',
                Sign_Name1_Phone: $rootScope.OrderDetail.Model.Relationship_PrimaryPhone,
                Sign_Address1: $rootScope.OrderDetail.Model.Relationship_Address,
                Sign_Name2: "",
                Sign_Name2_RelationshipDecedent: "",
                Sign_Name2_Phone: "",
                Sign_Address2: "",

                cbIsPickUpCremation: cbIsPickUpCremation.length!=0,
                cbIsShipCremation: cbIsShipCremation.length != 0,
                cbIsShipUrn: cbIsShipUrn.length!=0,
                cbIsPersonal: cbIsPersonal.length != 0,
                PickUpAddress: $rootScope.OrderDetail.Model.RecipientRemains_Address != null ? $rootScope.OrderDetail.Model.RecipientRemains_Address : ""
            }

            return model;
        },
        GetDataToModelFinalStepComplete3Forms : function() {
            var model = {
                Id : $rootScope.OrderDetail.Model.Id,
                ModelLegalNext: $scope.FinalSteps.GetDataToModelLegalNext(),
                ModelGoodsServices: $scope.FinalSteps.GetDataToModelGoodsServices(),
                ModelCremation: $scope.FinalSteps.GetDataToModelCremation(),
                ServiceType : $rootScope.OrderDetail.Model.ServiceType
            }
            return model;
        },
        iWant: false,
        GoodsServices: {
            SRC: "",
            AccountId: "",
            EnvelopeId: "",
            IsComplate: false,
            IsChangeURL: false,
            CountChangeURL:0,
            FileName: "",
            LocationY : 0
        },
        LegalNext: {
            SRC: "",
            AccountId: "",
            EnvelopeId: "",
            IsComplate: false,
            IsChangeURL: false,
            CountChangeURL: 0
        },
        Cremation : {
            SRC: "",
            AccountId: "",
            EnvelopeId: "",
            IsComplate: false,
            IsChangeURL: false,
            CountChangeURL: 0
        },
        FrameFinalStepComplete3Forms : {
                SRC: "",
                AccountId: "",
                EnvelopeId: "",
                IsComplate: false,
                IsChangeURL: false,
                CountChangeURL: 0,
                FileName: "",
                LocationY : 0
        },
        CheckFinalStepComplete3Forms : function(newSrc) {
            if ($scope.FinalSteps.FrameFinalStepComplete3Forms.CountChangeURL < 1) {
                $scope.FinalSteps.FrameFinalStepComplete3Forms.CountChangeURL++;
                } else {
                finalStepsService.CheckIsSignFinalStepComplete3Forms().then(function (result) {
                        if (result.Status == $rootScope.TextContants.Status.Success && result.IsSigned) {
                            $('#modalFinalStepComplete3Forms').closeModal();
                            $scope.FinalSteps.FrameFinalStepComplete3Forms.IsComplate = true;
                            $scope.FinalSteps.SetModelSessionStorage_IsComplate();
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        } else if (result.Status == $rootScope.TextContants.Status.Success && !result.IsSigned) {
                            $('#modalFinalStepComplete3Forms').closeModal();
                        }
                    });
                }
        },
        CloseModal :function() {
            $scope.FinalSteps.GoodsServices.CountChangeURL = 0;
            $scope.FinalSteps.LegalNext.CountChangeURL = 0;
            $scope.FinalSteps.Cremation.CountChangeURL = 0;
        },
        DownloadGoodsServices_WhenFirstLoad: function () {
            $('.divWaitDialog').openModal({
                dismissible: false
            });
            var model = $scope.FinalSteps.GetDataToModelGoodsServices();
            finalStepsService.DownloadGoodsServices_WhenFirstLoad(model).then(function (result) {
                //return $sce.trustAsResourceUrl(result);
                $scope.FinalSteps.GoodsServices.FileName = result.FileNameGoodsServices;
                $scope.FinalSteps.GoodsServices.LocationY = result.LocationY;

                $scope.FinalSteps.LegalNext.FileName = result.FileNameLegalNext;
                $scope.FinalSteps.Cremation.FileName = result.FileNameCremation;

                $rootScope.OrderDetail.Model.UrlDocusign_DeathCertificate = result.FileNameDeathCertificate;
                $rootScope.OrderDetail.Model.UrlDocusign_LegalNext = result.FileNameLegalNext;

                $scope.FinalSteps.UpdateModelSessionStorage(result.FileNameGoodsServices, result.LocationY, result.FileNameLegalNext, result.FileNameCremation, result.FileNameDeathCertificate);
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }, function (error) {
            }).finally(function () {
                $('.divWaitDialog').closeModal();
            });
        },
        ShowFormFinalStepComplete3Forms : function() {
                $('.divWaitDialog').openModal({
                    dismissible: false
                });
                var model = $scope.FinalSteps.GetDataToModelFinalStepComplete3Forms();
            finalStepsService.CallDocusignFormFinalStepComplete3Forms(model).then(function (result) {
                $scope.FinalSteps.FrameFinalStepComplete3Forms.SRC = $sce.trustAsResourceUrl(result);
                $scope.FinalSteps.FrameFinalStepComplete3Forms.IsChangeURL = false;
                }, function (error) {
                }).finally(function() {
                    $('.divWaitDialog').closeModal();
                });
        },
        SendMainCompletedOrder: function () {
            var emailModel = {
                To: "",
                Form: "",
                OrderId: 0,
                Step: 0,
                AttachmentLegalNext: "",
                AttachmentGoodsServices: "",
                AttachmentCremation :"",
                PriceModel: {},
                OrderModel :{}
            };
            emailModel.To = $rootScope.OrderDetail.Model.Email;
            emailModel.OrderId = $rootScope.OrderDetail.Model.Id;
            emailModel.Step = $rootScope.OrderDetail.Model.Step;
            emailModel.AttachmentGoodsServices = $scope.FinalSteps.GoodsServices.FileName;
            emailModel.AttachmentLegalNext = $scope.FinalSteps.LegalNext.FileName;
            emailModel.AttachmentCremation = $scope.FinalSteps.Cremation.FileName;
            emailModel.PriceModel = $scope.FinalSteps.GetDataToModelGoodsServices();
            emailModel.OrderModel = $scope.OrderDetail.Model;
            finalStepsService.SendMainCompletedOrder(emailModel).then(function () {
                if (result.Status == $rootScope.TextContants.Status.Success) {
                }
            });
        },
        SuccessFull: function () {
            $rootScope.OrderDetail.Model.IsSigned = true;
            //send email
            $scope.FinalSteps.SendMainCompletedOrder();

            $('#at-need-services-modal').openModal({
                    dismissible: false
                });
            $('#at-need-services-modal .modal-close').click(function () {
                $(this).parent(".modal").closeModal();
                window.location = "/";
                finalStepsService.ClearSection().then(function(result) {
                }, function(error) {
                });
            });


            //$window.sessionStorage.removeItem("ModelSessionStorage");
            $cookieStore.remove('ModelSessionStorage');
            $window.sessionStorage.removeItem("SessionSelectionData");

        },
        LoadForm: function () {
            //var session = angular.fromJson($window.sessionStorage.getItem("ModelSessionStorage"));
            var session = angular.fromJson($cookieStore.get("ModelSessionStorage"));

            if (session.FinalSteps.IsComplate) {
                $scope.FinalSteps.FrameFinalStepComplete3Forms.IsComplate = true;
                $scope.FinalSteps.SetiWant();
            } else {
                if ($rootScope.OrderDetail.Model.UrlDocusign_GoodsServices != '') {
                    $scope.FinalSteps.FrameFinalStepComplete3Forms.IsComplate = true;
                    $scope.FinalSteps.SetiWant();
                } else {
                    $scope.FinalSteps.FrameFinalStepComplete3Forms.IsComplate = false;
                }
            }
        }
    }


    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            //// check valid step when F5 or submit link not valid.
           
            //var session = angular.fromJson($window.sessionStorage.getItem("ModelSessionStorage"));
            var session = angular.fromJson($cookieStore.get("ModelSessionStorage"));

            if (!session.IsLoadedFinalSteps) {
                $scope.FinalSteps.DownloadGoodsServices_WhenFirstLoad();
            } else {
                $scope.FinalSteps.FillModelSessionStorage();
            }

            if (session.SectionStep == $rootScope.OrderDetail.Model.Step) {
                $rootScope.OrderDetail.Model.SectionStep = session.SectionStep;
            }

            $scope.FinalSteps.LoadForm();

            $rootScope.Button.AuthenticationStep();
        },$rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });



}]);


