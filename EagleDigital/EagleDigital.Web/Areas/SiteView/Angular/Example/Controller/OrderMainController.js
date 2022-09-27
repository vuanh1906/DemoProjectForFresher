'use strict';

app.controller("OrderMainController", ['orderMainService', 'serviceProvideService', '$scope', '$rootScope', '$location', '$q', '$window', function(orderMainService, serviceProvideService, $scope, $rootScope, $location, $q, $window) {

    $rootScope.IsProcessing = false;
    $rootScope.IsLoadedCasket = false;
    $rootScope.IsSaveDone = true;

    $rootScope.OrderDetail = {
        DetailPrice: {
            TotalPrice: 0,
            TotalPriceNoTax: 0,
            BasePrice: 0,
            CityCremationPrice: 0,
            LocationCremationPrice: 0,    // !=BurialLocationPrice
            ObituaryPreparationPrice: 0,
            OnlineGuestbookPrice: 0,
            QtyCertifiedPrice: 0,
            MemorialServicePrice: 0,
            SpecializedCarePrice: 0,
            MemorialPackageItemPrice: 0,
            MemorialPackageItemPriceHasTax :0,
            URNPrice: 0,
            ListPriceModuleMemorialPakages: [],            //value for insert to pricing History for module MemorialPakages  // Cremation
            //Burial
            MemorialBurialPackagePrice: 0,
            MemorialBurialPackagePriceHasTax:0,
            CasketPreferencePrice: 0,
            CasketPreferencePriceHasInPackage:0,
            VaultSelectionPrice: 0,
            BurialPackagePrice: 0,
            BurialPackagePriceItemHasInPackage: 0,       //
            CemeterySetupPrice: 0,
            PickupRemainPrice: 0,
            BurialServicePrice: 0,
            BurialLocationPrice :0,
            //
            ListPriceModuleBurialMemorialPakages: [],      // Burial
            ListPriceModuleBurialMemorialPakageItems: [],  // Burial
            ListPriceModeleBurialServices :[],
            GetTotalMemorialPackageItem: function() {      // For Cremation
                var totalPriceMemorialPackageItem = 0;
                var totalPriceHasTax = 0;
                $rootScope.OrderDetail.DetailPrice.ListPriceModuleMemorialPakages = [];
                var listSelectItem = $rootScope.OrderDetail.SelectionData.MemorialPackage.List.filter(function(e) { return e.IsCheck == true });
                for (var i = 0; i < listSelectItem.length; i++) {
                    if (listSelectItem[i].CountPackageItem == 0) {
                        totalPriceMemorialPackageItem += listSelectItem[i].PriceNoTax;
                        totalPriceHasTax += $rootScope.TextContants.MathRound(listSelectItem[i].PriceNoTax * (1 + $rootScope.OrderDetail.DetailPrice.Tax));

                        $rootScope.OrderDetail.DetailPrice.ListPriceModuleMemorialPakages.push({ Name: listSelectItem[i].Name, Price: listSelectItem[i].Price, Type: $rootScope.TextContants.MemorialType.MemorialPackage, ObjectId: listSelectItem[i].Id });
                    } else {
                        totalPriceMemorialPackageItem += listSelectItem[i].MemorialPackageItemSelect != undefined ? listSelectItem[i].MemorialPackageItemSelect.PriceNoTax : 0;
                        totalPriceHasTax += listSelectItem[i].MemorialPackageItemSelect != undefined ? $rootScope.TextContants.MathRound(listSelectItem[i].MemorialPackageItemSelect.PriceNoTax * (1 + $rootScope.OrderDetail.DetailPrice.Tax)) : 0;
                        if (listSelectItem[i].MemorialPackageItemSelect != undefined) {
                            $rootScope.OrderDetail.DetailPrice.ListPriceModuleMemorialPakages.push({ Name: listSelectItem[i].MemorialPackageItemSelect.Name, Price: listSelectItem[i].MemorialPackageItemSelect.Price, Type: $rootScope.TextContants.MemorialType.MemorialPackageItem, ObjectId: listSelectItem[i].MemorialPackageItemSelect.Id });
                        }
                    }
                }
                $rootScope.OrderDetail.DetailPrice.MemorialPackageItemPrice = totalPriceMemorialPackageItem;
                $rootScope.OrderDetail.DetailPrice.MemorialPackageItemPriceHasTax = totalPriceHasTax;

            },
            GetTotalBurialMemorialPackage: function () {
                $rootScope.OrderDetail.DetailPrice.ListPriceModuleBurialMemorialPakages = [];
                var listPackage = $.grep($rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List, function (e) { return e.IsCheck == true; });
                for (var j = 0; j < listPackage.length; j++) {
                    var priceUpgradeOrDowngrade = $rootScope.TextContants.MathRound(listPackage[j].Price - $rootScope.OrderDetail.DetailPrice.BurialPackagePriceItemHasInPackage * (1 + $rootScope.OrderDetail.DetailPrice.Tax));
                    var isUpgrade = false;
                    var isDowngrade = false;
                    if (priceUpgradeOrDowngrade != 0) {
                        isUpgrade = priceUpgradeOrDowngrade > 0 ? true : false;
                        isDowngrade = priceUpgradeOrDowngrade > 0 ? false : true;
                    }
                    $rootScope.OrderDetail.DetailPrice.ListPriceModuleBurialMemorialPakages.push({ Name: listPackage[j].Name, Price: priceUpgradeOrDowngrade, Type: $rootScope.TextContants.MemorialType.BurialMemorialPackage, ObjectId: listPackage[j].Id, Qty: 1, InPackage: listPackage[j].InPackage, IsUpgrade: isUpgrade, IsDowngrade: isDowngrade });
                }
            },
            GetTaxCasketIncludeBurialPackage: function () {   // function not apply for burial package is "Manual Service Selections"
                if ($rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowCasketOfTypeBurialService() == false) {
                    $rootScope.OrderDetail.DetailPrice.CasketPreferencePriceHasInPackage = ($rootScope.OrderDetail.CasketPreferencePrice != undefined && $rootScope.OrderDetail.CasketPreferencePrice != null) ? $rootScope.OrderDetail.CasketPreferencePrice : 0;
                } else {
                    $rootScope.OrderDetail.DetailPrice.CasketPreferencePriceHasInPackage = 0;
                }
                return $rootScope.OrderDetail.DetailPrice.CasketPreferencePriceHasInPackage;
            },
            GetTotalBurialMemorialPackageItem: function () {
                var priceItemHasInPackage = 0;                                                                                                               // package 'Complate Caring Funeral' has 'The committal service at the cemetery'
                var itemInPackage = $.grep($rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List, function (e) { return e.InPackage == true; });
                if (itemInPackage.length != 0) priceItemHasInPackage = itemInPackage[0].PriceNoTax;
                var totalPriceBurial = 0;
                var totalPriceBurialHasTax = 0;
                $rootScope.OrderDetail.DetailPrice.BurialPackagePriceItemHasInPackage = 0;
                $rootScope.OrderDetail.DetailPrice.ListPriceModuleBurialMemorialPakageItems = [];
                var listSelectItem = $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List.filter(function (e) { return e.IsCheck == true });

                if (listSelectItem.length == 0) {
                    $rootScope.OrderDetail.DetailPrice.BurialPackagePriceItemHasInPackage = priceItemHasInPackage;
                }
                else if (listSelectItem.length != 0 && itemInPackage.length != 0 && listSelectItem[0].Id == itemInPackage[0].Id) {
                    
                    $rootScope.OrderDetail.DetailPrice.BurialPackagePriceItemHasInPackage = priceItemHasInPackage;
                }
                else {
                    for (var i = 0; i < listSelectItem.length; i++) {
                        if (listSelectItem[i].InPackage != true) {
                            totalPriceBurial += $rootScope.TextContants.MathRound(listSelectItem[i].PriceNoTax - priceItemHasInPackage);                      // Caculate Upgrade or Downgrage
                            totalPriceBurialHasTax += $rootScope.TextContants.MathRound((listSelectItem[i].PriceNoTax - priceItemHasInPackage) * (1 + $rootScope.OrderDetail.DetailPrice.Tax));
                            $rootScope.OrderDetail.DetailPrice.BurialPackagePriceItemHasInPackage = priceItemHasInPackage;
                        }
                    }
                }
                for (var j = 0; j < $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List.length; j++) {
                    if ($rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty != 0 && $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty != null) {
                        totalPriceBurial += $rootScope.TextContants.MathRound($rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].PriceNoTax * $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty);
                        totalPriceBurialHasTax += $rootScope.TextContants.MathRound($rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].PriceNoTax * $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty + $rootScope.TextContants.MathRound(($rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].PriceNoTax * $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty) * $rootScope.OrderDetail.DetailPrice.Tax));
                        $rootScope.OrderDetail.DetailPrice.ListPriceModuleBurialMemorialPakageItems.push({ Name: $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Name, Price: $rootScope.TextContants.MathRound(($rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].PriceNoTax * $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty) * (1 + $rootScope.OrderDetail.DetailPrice.Tax)), Type: $rootScope.TextContants.MemorialType.BurialMemorialPackageItem, ObjectId: $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Id, Qty: $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[j].Qty });
                    }
                }
                $rootScope.OrderDetail.DetailPrice.MemorialBurialPackagePrice = totalPriceBurial;
                $rootScope.OrderDetail.DetailPrice.MemorialBurialPackagePriceHasTax = totalPriceBurialHasTax;
            },
            GetTotalBurialServices : function () {
                var totalPrice = 0;
                $rootScope.OrderDetail.DetailPrice.ListPriceModeleBurialServices = [];
                var listSelectItem = $rootScope.OrderDetail.SelectionData.BurialServices.List.filter(function (e) { return e.IsCheck == true });
                for (var j = 0; j < listSelectItem.length; j++) {
                    totalPrice += listSelectItem[j].Price;
                    $rootScope.OrderDetail.DetailPrice.ListPriceModeleBurialServices.push({ Name: listSelectItem[j].Name, Price: listSelectItem[j].Price, Type: $rootScope.TextContants.MemorialType.BurialService, ObjectId: listSelectItem[j].Id });
                }
                $rootScope.OrderDetail.DetailPrice.BurialServicePrice = totalPrice;
            },
            GetBasicPrice : function (){
                if ($rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowBasePrice()) {
                    return $rootScope.OrderDetail.DetailPrice.BasePrice;
                } else {
                    return 0;
                }
            },
            GetCasketPrice : function() {
                if ($rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowCasketOfTypeBurialService()) {
                    return $rootScope.OrderDetail.DetailPrice.CasketPreferencePrice;
                } else {
                    return 0;
                }
            },
            GetTotal: function() {
                var total = 0;
                //total += $rootScope.OrderDetail.DetailPrice.BasePrice;
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.GetBasicPrice());
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.CityCremationPrice);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.LocationCremationPrice);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.ObituaryPreparationPrice);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.OnlineGuestbookPrice);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.QtyCertifiedPrice);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.MemorialServicePrice);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.SpecializedCarePrice);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.URNPrice * (1 + $rootScope.OrderDetail.DetailPrice.Tax));
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.GetCasketPrice() * (1 + $rootScope.OrderDetail.DetailPrice.Tax));
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.VaultSelectionPrice * (1 + $rootScope.OrderDetail.DetailPrice.Tax));
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.PickupRemainPrice);
                //total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.MemorialPackageItemPrice * (1 + $rootScope.OrderDetail.DetailPrice.Tax));
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.MemorialPackageItemPriceHasTax);
                //total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.MemorialBurialPackagePrice * (1 + $rootScope.OrderDetail.DetailPrice.Tax));
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.MemorialBurialPackagePriceHasTax);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.CemeterySetupPrice);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.BurialPackagePrice + $rootScope.OrderDetail.DetailPrice.Tax * ($rootScope.OrderDetail.DetailPrice.BurialPackagePriceItemHasInPackage +  $rootScope.OrderDetail.DetailPrice.GetTaxCasketIncludeBurialPackage()));
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.BurialServicePrice);
                total += $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.BurialLocationPrice);
                
                $rootScope.OrderDetail.DetailPrice.TotalPrice = total;
                return total;
            },
            GetTotalNoTax : function() {
                var total = 0;
                //total += $rootScope.OrderDetail.DetailPrice.BasePrice;
                total += $rootScope.OrderDetail.DetailPrice.GetBasicPrice();
                total += $rootScope.OrderDetail.DetailPrice.CityCremationPrice;
                total += $rootScope.OrderDetail.DetailPrice.LocationCremationPrice;
                total += $rootScope.OrderDetail.DetailPrice.ObituaryPreparationPrice;
                total += $rootScope.OrderDetail.DetailPrice.OnlineGuestbookPrice;
                total += $rootScope.OrderDetail.DetailPrice.QtyCertifiedPrice;
                total += $rootScope.OrderDetail.DetailPrice.MemorialServicePrice;
                total += $rootScope.OrderDetail.DetailPrice.SpecializedCarePrice;
                total += $rootScope.OrderDetail.DetailPrice.URNPrice ;
                total += $rootScope.OrderDetail.DetailPrice.GetCasketPrice() ;
                total += $rootScope.OrderDetail.DetailPrice.VaultSelectionPrice;
                total += $rootScope.OrderDetail.DetailPrice.PickupRemainPrice;
                total += $rootScope.OrderDetail.DetailPrice.MemorialPackageItemPrice ;
                total += $rootScope.OrderDetail.DetailPrice.MemorialBurialPackagePrice ;
                total += $rootScope.OrderDetail.DetailPrice.CemeterySetupPrice;
                total += $rootScope.OrderDetail.DetailPrice.BurialPackagePrice;
                total += $rootScope.OrderDetail.DetailPrice.BurialServicePrice;
                total += $rootScope.OrderDetail.DetailPrice.BurialLocationPrice;
                $rootScope.OrderDetail.DetailPrice.TotalPriceNoTax = total;
                return total;
            },
            //
            ZipCodeBasePrice: 0,
            PriceInMile: 0,
            Tax: 0
            //
        },
        Model: {
            DetailPrice: {},
            SectionStep: 0,
            ObituaryPreparationPrice: 0,
            OnlineGuestbookPrice: 0,
            CemeterySetupPrice : 0,
            CurrentMonth: 0,
            CurrentYear: 0,
            CurrentDate : 0,
            Id: "1",
            Type: "AtNeeds",
            Status: "Initial",
            Step: 0,
            Email: "",
            //
            ZipCode: "",
            DistancePrice: 0,
            CityCremationName: "",
            CityCremationNameDisplay: "",
            //
            CityCremationId: "",
            CityOther: "",
            IsObituaryPreparation: false,
            IsOnlineGuestbook: false,
            PhotoUrl: "",
            LocationId: "",
            LocationCremationId: "",
            QtyCertifiedId: "",
            MemorialServiceId: "",
            MemorialServiceTime :"",
            SpecializedCareId: "",
            URNSelectionId: "",

            RecipientRemains_FirstName: "",
            RecipientRemains_LastName: "",
            RecipientRemains_Address: "",
            RecipientRemains_AddressLine2: "",
            RecipientRemains_City: "",
            RecipientRemains_State: "",
            RecipientRemains_ZipCode: "",
            RecipientRemains_CountryId: "",
            PickupRemainId: "",
            RelationshipId: "",
            Relationship_TitleName: "",
            Relationship_FirstName: "",
            Relationship_LastName: "",
            Relationship_SuffixName: "",
            Relationship_Spouse: "",
            Relationship_Address: "",
            Relationship_AddressLine2: "",
            Relationship_City: "",
            Relationship_State: "",
            Relationship_ZipCode: "",
            Relationship_CountryId: "",
            Relationship_Email: "",
            Relationship_PrimaryPhone: "",
            Relationship_CellPhone: "",
            Decedent_TitleName: "",
            Decedent_FirstName: "",
            Decedent_LastName: "",
            Decedent_SuffixName: "",
            Decedent_MiddleName: "",
            Decedent_MaidenName: "",
            Decedent_SocialSecurity: "",
            Decedent_IsArmedForces: false,
            Decedent_Branch: "",
            Decedent_Sex: "Male",
            Decedent_Address: "",
            Decedent_AddressLine2: "",
            Decedent_City: "",
            Decedent_State: "",
            Decedent_ZipCode: "",
            Decedent_CountryId: "",
            Decedent_BirthDate: "",
            Decedent_CurrentAge: 0,
            Decedent_MaritalStatus: "",
            Decedent_StateOfBirth: "",
            Decedent_MotherName: "",
            Decedent_FatherName: "",
            Decedent_EducationId: "",
            Decedent_IsPacemaker: false,
            Decedent_IsDefibilator: false,
            Decedent_IsRadioActive: false,
            Decedent_IsOtherBattery: false,
            Decedent_IsNoHazardous: false,
            // New information Decedent
            Decedent_DateOfDeath: "",
            Decedent_FacilityName: "",
            Decedent_LocationOfDeath: "",
            Decedent_CountyOfDeath: "",
            Decedent_County: "",
            Decedent_DecedentUsual: "",
            Decedent_KindofBusiness: "",
            Decedent_ResidenceState: "",
            Decedent_Race: "",
            Decedent_RaceValue: "",
            Decedent_InformationName: "",
            Decedent_MailingAddress: "",
            Decedent_Hospital: "",
            Decedent_HospitalOther: "",
            Decedent_IsInsideCity: 'true',
            Decedent_HispanicOrigin: "",
            Decedent_HispanicOriginValue: "",
            Decedent_Under1Year_Months: "",
            Decedent_Under1Year_Days: "",
            Decedent_Under1Year_Hours: "",
            Decedent_Under1Year_Minutes: "",
            Decedent_TimeofDeath: "",
            Decedent_MethodOfDisposition: "",
            Decedent_MethodOfDispositionValue: "",
            Decedent_PlanceOfDisposition: "",
            Decedent_LocationCityTownState: "",
            Decedent_EmbalmersName: "",
            Decedent_RelationshipToDecedent: "",
            Decedent_ZipCodeState: "",
            Decedent_IsWasDeathCaused: false,
            Decedent_WasDeathCausedValue: "",

            // End new information Decedent
            Survivor_TitleName: "",
            Survivor_FirstName: "",
            Survivor_LastName: "",
            Survivor_SuffixName: "",
            Survivor_ListSon: [angular.copy($rootScope.DataDynamics.SurvivingSpouse)],
            Survivor_ListDaughters: [angular.copy($rootScope.DataDynamics.SurvivingSpouse)],
            Survivor_ListBrothers: [angular.copy($rootScope.DataDynamics.SurvivingSpouse)],
            Survivor_ListSisters: [angular.copy($rootScope.DataDynamics.SurvivingSpouse)],
            Survivor_OfGrandchildren: "",
            Survivor_OfGreatGrandchildren: "",
            Survivor_OfGreatGreatGrandchildren: "",
            Memorial_IsHas: true,
            Memorial_BusinessName: "",
            Memorial_Address: "",
            Memorial_AddressLine2: "",
            Memorial_City: "",
            Memorial_ZipCode: "",
            Memorial_State: "",
            Memorial_CountryId: "",
            Memorial_ListLieuOfFlower: [angular.copy($rootScope.DataDynamics.LieuOfFlower)],
            Memorial_IsPreplanning: 'true',
            UrlDocusign_Cremation: "",
            UrlDocusign_LegalNext: "",
            UrlDocusign_PreNeed: "",
            UrlDocusign_GoodsServices: "",
            UrlDocusign_DeathCertificate: "",
            IsSigned: false,
            ServiceType: "",
            Price_TotalPrice: 0,
            Price_TotalPaid: 0,
            Price_IsPaid: false,
            Burial_Visitation: "",
            Burial_Type: "",
            Burial_Type_Church: "",
            Burial_Type_Graveside: "",
           
            Burial_Casket: "",
            Burial_Pallbearers: "",
            Burial_IsPallbearers: null,
            Burial_IsMinister: null,
            Burial_Minister: "",
            MemorialPackageItemId: new Array(),

            CasketPreferenceId: "",
            VaultSelectionId: "",
            IsChangePackageType: false,
            BurialPackageId: "",
            //Burial_VaultType: "",
            Burial_IsCemetery: false,
            //
            Burial_LocationFuneral: "",
            Burial_NameLocation: "",
            //
            Burial_LocationZip: "",
            Burial_LocationZip_DistancePrice : 0,
            Burial_LocationCityState: "",
            Burial_LocationCityState_Display :"",
            //
            Burial_MemorialServiceDate: "",
            Burial_ListMusic: [angular.copy($rootScope.DataDynamics.PublicServiceItem)],
            Burial_ListMinster: [angular.copy($rootScope.DataDynamics.PublicServiceItem)],
            Burial_Cemetery: "",
            Burial_ListPallbearers: [angular.copy($rootScope.DataDynamics.PublicServiceItem)],
            Burial_CemeteryStateId: "",
            Burial_CemeteryCity: "",
            Burial_IsLieuOfFlowers: false,
            Burial_OrganizationName: "",
            Burial_OrganizationAddress: "",
            Burial_Notes: "",
            Burial_MailingDeath: "",

            /// temp variable
            ///
            ///
            Decedent_TimeofDeath_Hours: "",
            Decedent_TimeofDeath_Minutes: "",
            Decedent_TimeofDeath_APM : ""
        },
        SelectionData: {
            ServiceType: {
                List: [{ Name: $rootScope.TextContants.ServiceType.Cremation }, { Name: $rootScope.TextContants.ServiceType.Burial }],
                Choose: ""
            },
            CityCremation: {
                List: [{ "CityCremation": "Loading ..." }],
                Choose: ""
            },
            Location: {
                List: [{ "Location": "Loading ..." }],
                ListFilter: [{ "Location": "Loading ..." }],
                Choose: ""
            },
            LocationCremation: {
                List: [{ "Location": "Loading ..." }],
                Choose: ""
            },
            QtyCertified: {
                List: [{ "QtyCertified": "Loading ..." }],
                Choose: ""
            },
            MemorialService: {
                List: [{ "MemorialService": "Loading ..." }],
                Choose: ""
            },
            MemorialServiceTime : {
                List: angular.copy($rootScope.TextContants.ListMemorialServiceTime),
                Choose: ""
            },
            SpecializedCare: {
                List: [{ "SpecializedCare": "Loading ..." }],
                Choose: ""
            },
            URNSelection: {
                List: [{ "URNSelection": "Loading ..." }],
                Choose: ""
            },
            CasketPreference: {
                List: [{ "CasketPreference": "Loading ..." }],
                Choose: ""
            },
            VaultSelection: {
                List: [{ "VaultSelection": "Loading ..." }],
                Choose: ""
            },
            BurialPackages : {
                List: [{ "BurialPackages": "Loading ..." }],
                Choose: ""
            },
            BurialServices : {
                List: [{ "BurialServices": "Loading ..." }],
                Choose: ""
            },
            BurialMemorialPackages : {
                List: [{ "BurialMemorialPackages": "Loading ..." }],
                Choose: ""
            },
            BurialMemorialPackageItems : {
                List: [{ "BurialMemorialPackageItems": "Loading ..." }],
                Choose: ""
            },
            BurialCityStates : {
                List: [{ "BurialCityStates": "Loading ..." }],
                Choose: ""
            },
            BurialMailingDeath: {
                List: angular.copy($rootScope.TextContants.ListMailingDeath),
                Choose: ""
            },
            Country: {
                List: [{ "Country": "Loading ..." }],
                Choose: ""
            },
            Country_BiographicalData: {
                List: [{ "Country": "Loading ..." }],
                Choose: ""
            },
            Country_DecedantData: {
                List: [{ "Country": "Loading ..." }],
                Choose: ""
            },
            Country_Memorial: {
                List: [{ "Memorial": "Loading ..." }],
                Choose: ""
            },
            Country_LieuOfFlower: {
                List: [{ "LieuOfFlower": "Loading ..." }],
                Choose: ""
            },
            Country_RecipientRemains: {
                List: [{ "RecipientRemains": "Loading ..." }],
                Choose: ""
            },
            MaritalStatus: {
                List: angular.copy($rootScope.TextContants.ListMaritalStatus),
                Choose: ""
            },
            PickupRemain: {
                List: [{ "PickupRemain": "Loading ..." }],
                Choose: ""
            },
            Relationship: {
                List: [{ "Relationship": "Loading ..." }],
                Choose: ""
            },
            Education: {
                List: [{ "Education": "Loading ..." }],
                Choose: ""
            },
            MemorialPackage: {
                List: [{ "MemorialPackage": "Loading ..." }],
                Choose: ""
            },
            Pricing: {
                List: [{ "Pricing": "Loading ..." }],
                Choose: ""
            },
            InBrand: {
                List: [{ "InBrand": "Loading ..." }],
                Choose: ""
            },
            ListBurialVisitation: {
                List: [{ "ListBurialVisitation": "Loading ..." }],
                Choose: ""
            },
            ListBurialType: {
                List: [{ "ListBurialType": "Loading ..." }],
                Choose: ""
            },
            ListBurialCasket: {
                List: [{ "ListBurialCasket": "Loading ..." }],
                Choose: ""
            },
            ListVaultType : {
                List: angular.copy($rootScope.TextContants.ListVaultType),
                Choose: ""
            },
            ListHospital: {
                List: angular.copy($rootScope.TextContants.ListHospital),
                Choose: ""
            },
            ListHospitalOrther: {
                List: angular.copy($rootScope.TextContants.ListHospitalOrther),
                Choose: ""
            },
            ListDecedentRace: {
                List: angular.copy($rootScope.TextContants.ListDecedentRace),
                Choose: ""
            },
            ListHispanicOrigin: {
                List: angular.copy($rootScope.TextContants.ListHispanicOrigin),
                Choose: ""
            },
            ListMethodOfDisposition: {
                List: angular.copy($rootScope.TextContants.ListMethodOfDisposition),
                Choose: ""
            },
            ListLocationOfFuneral: {
                List: angular.copy($rootScope.TextContants.ListLocationOfFuneral),
                Choose:""
            }
        },

        CheckSpecializedCareValid: function() {
            var itemChoose = $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose;
            if (itemChoose != null && itemChoose.Name == $rootScope.TextContants.SpecializedCare.Over500lbs) {
                return false;
            }
            return true;
        },
        GetValueZipCodeValue: function (serviceType) {
            var zipcode = "";
            if (serviceType == $rootScope.TextContants.ServiceType.Cremation) {
                 zipcode = $scope.OrderDetail.Model.ZipCode;
            } else if (serviceType == $rootScope.TextContants.ServiceType.Burial) {
                zipcode = $scope.OrderDetail.Model.Burial_LocationZip;
            }
            zipcode = zipcode != undefined ? zipcode.split(" ").join("") : "";
            zipcode = zipcode != undefined ? zipcode.split("_").join("") : "";
            return zipcode;
        },
        ChangeCityCremation_ZipCode: function () {
            var zipcode = $rootScope.OrderDetail.GetValueZipCodeValue($rootScope.TextContants.ServiceType.Cremation);
           
            if (zipcode != "" && zipcode.length == 5 && $rootScope.IsProcessing === false) {
                $rootScope.IsProcessing = true;
                $("#CityCremationName").focus();
                $('.divWaitDialog').openModal({
                    dismissible: false
                });
                serviceProvideService.ZipCode_API_GetCityName(zipcode).then(function(response) {
                    if (response.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.CityCremationName = response.Data.city;
                        $rootScope.OrderDetail.DetailPrice.CityCremationPrice = response.Data.Price;
                        $rootScope.OrderDetail.Model.CityCremationNameDisplay = response.Data.city + " (" + response.Data.PriceString + ")";
                        $rootScope.OrderDetail.Model.DistancePrice = response.Data.Price;
                    } else {
                        $("#InvalidZipCode").openModal();
                        $rootScope.OrderDetail.Model.CityCremationName = "";
                        $rootScope.OrderDetail.Model.CityCremationNameDisplay = "";
                        $rootScope.OrderDetail.Model.ZipCode = "";
                    }
                }).finally(function() {
                    $('.divWaitDialog').closeModal();
                    $("#CityCremationName").focus();
                    $rootScope.IsProcessing = false;
                });
            } else {
                $rootScope.OrderDetail.Model.CityCremationName = "";
                $rootScope.OrderDetail.Model.CityCremationNameDisplay = "";
            }
            if (!$scope.$$phase) $scope.$apply();
            Materialize.updateTextFields();
        },
        ChangeCityBurial_LocationZip: function () {
            var zipcode = $rootScope.OrderDetail.GetValueZipCodeValue($rootScope.TextContants.ServiceType.Burial);
         
            if (zipcode != "" && zipcode.length==5 && $rootScope.IsProcessing === false) {
                $rootScope.IsProcessing = true;
                $("#CityCremationName").focus();
                $('.divWaitDialog').openModal({
                    dismissible: false
                });
                serviceProvideService.ZipCode_API_GetCityName(zipcode).then(function (response) {
                    if (response.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Burial_LocationCityState = response.Data.city + ", " + response.Data.state;
                        $rootScope.OrderDetail.Model.Burial_LocationZip_DistancePrice = response.Data.Price;
                        $rootScope.OrderDetail.Model.Burial_LocationCityState_Display = response.Data.city + ", " + response.Data.state + " (" + response.Data.PriceString + ")";
                        $rootScope.OrderDetail.DetailPrice.BurialLocationPrice = response.Data.Price;
                    } else {
                        $("#InvalidZipCode").openModal();
                        $rootScope.OrderDetail.Model.Burial_LocationCityState = "";
                        $rootScope.OrderDetail.Model.Burial_LocationCityState_Display = "";
                        $rootScope.OrderDetail.Model.Burial_LocationZip = "";
                        $("#Burial_LocationZip").val("");
                    }
                }).finally(function () {
                    $('.divWaitDialog').closeModal();
                    $("#CityCremationName").focus();
                    $rootScope.IsProcessing = false;
                });
            } else {
                $rootScope.OrderDetail.Model.Burial_LocationCityState = "";
                $rootScope.OrderDetail.Model.Burial_LocationCityState_Display = "";
            }
            if (!$scope.$$phase) $scope.$apply();
            Materialize.updateTextFields();
           
        },
        ReloadCityCemation_ZipCode: function() {
            $rootScope.OrderDetail.DetailPrice.CityCremationPrice = $rootScope.OrderDetail.Model.DistancePrice;
            $rootScope.OrderDetail.Model.CityCremationNameDisplay = $rootScope.OrderDetail.Model.CityCremationName + " ($" + $rootScope.OrderDetail.DetailPrice.CityCremationPrice.toFixed(2) + ")";
        },
        ReloadBurial_LocationZip : function() {
            $rootScope.OrderDetail.DetailPrice.BurialLocationPrice = $rootScope.OrderDetail.Model.Burial_LocationZip_DistancePrice;
            $rootScope.OrderDetail.Model.Burial_LocationCityState_Display = $rootScope.OrderDetail.Model.Burial_LocationCityState + " ($" + $rootScope.OrderDetail.DetailPrice.BurialLocationPrice.toFixed(2) + ")";
        },
        ChangePricingWhenSelectServiceType: function() {
            var pricingItem = $.grep($rootScope.OrderDetail.SelectionData.Pricing.List, function(e) { return e.ServiceType == $rootScope.OrderDetail.Model.ServiceType && e.Key == $rootScope.TextContants.KeyPricing.BasePrice; });
            if (pricingItem.length != 0) $rootScope.OrderDetail.DetailPrice.BasePrice = parseFloat(pricingItem[0].Value);
        },
        TempToResetModel: {},
        TempToResetSelectionData: {},
        ConvertDataToSave: function(data) {
            var dataSave = angular.copy(data);
            for (var i = 0; i < dataSave.Memorial_ListLieuOfFlower.length; i++) {
                dataSave.Memorial_ListLieuOfFlower[i].Country = "";
            }
            return dataSave;
        },
        FuntionSave: {
            IsValid: false,
            SaveStep1: function() {},
            SaveStep2: function() {},
            SaveStep3: function() {},
            SaveStep4: function() {},
            SaveStep5: function() {},
            SaveStep6: function() {},
            SaveStep7: function() {},
            SaveStep8: function() {},
            SaveStep9: function() {},
            SaveStep10: function() {},
            SaveStep11: function() {},
            SaveStep12: function() {},
            SaveStep13: function() {},
            SaveStep14: function() {},
            SaveStep15: function() {}
        }
    };


    $rootScope.Billing = {
        ClearDataWhenChangeBurialPackage: function () {
            $rootScope.OrderDetail.Model.CasketPreferenceId = '';
            $rootScope.OrderDetail.Model.CasketPreferencePrice = 0;

            $rootScope.OrderDetail.Model.CityCremationName = "";
            $rootScope.OrderDetail.Model.CityCremationNameDisplay = "";
            $rootScope.OrderDetail.Model.ZipCode = "";
            $rootScope.OrderDetail.DetailPrice.CityCremationPrice = 0;
            $rootScope.OrderDetail.Model.DistancePrice = 0;
            $rootScope.OrderDetail.SelectionData.LocationCremation.Choose = "";
            $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose = "";
            $rootScope.OrderDetail.SelectionData.QtyCertified.Choose = "";
            for (var i = 0; i < $rootScope.OrderDetail.SelectionData.BurialServices.List.length; i++) {
                $rootScope.OrderDetail.SelectionData.BurialServices.List[i].IsCheck = false;
            }


        },
        SettingPacketForBurial: function () {
            var id = $rootScope.OrderDetail.Model.BurialPackageId; // id packet selected
            var item = $.grep($rootScope.OrderDetail.SelectionData.BurialPackages.List, function (e) {
                return e.Id == id;
            });
            var listBurialPackageOption = $.grep(item[0].ListBurialPackageOption, function (e) {
                return e.BurialMemorialPackageId != null;
            });

            for (var i = 0; i < $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List.length; i++) {
                        $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[i].IsCheck = false;
                        $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[i].InPackage = false;
            }

            for (var i = 0; i < $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List.length; i++) {
                for (var j = 0; j < listBurialPackageOption.length; j++) {
                    if (listBurialPackageOption[j].BurialMemorialPackageId == $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[i].Id) {
                        $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[i].IsCheck = true;
                        $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[i].InPackage = true;
                    }
                }
            }

          

        },
        OrderBilling: function(model) {
            $rootScope.OrderDetail.Model.SectionStep = model.Step;
            $rootScope.OrderDetail.Model.Id = model.Id;
            $rootScope.OrderDetail.Model.Type = model.Type;
            $rootScope.OrderDetail.Model.Status = model.Status;
            $rootScope.OrderDetail.Model.Email = model.Email;
            $rootScope.OrderDetail.Model.CityCremationId = model.CityCremationId != null ? model.CityCremationId : "";

            $rootScope.OrderDetail.Model.CityOther = model.CityOther != null ? model.CityOther : "";
            $rootScope.OrderDetail.Model.IsObituaryPreparation = model.IsObituaryPreparation != null ? model.IsObituaryPreparation : false;
            $rootScope.OrderDetail.Model.IsOnlineGuestbook = model.IsOnlineGuestbook != null ? model.IsOnlineGuestbook : false;
            $rootScope.OrderDetail.Model.PhotoUrl = model.PhotoUrl != null ? model.PhotoUrl : "";
            $rootScope.OrderDetail.Model.LocationId = model.LocationId != null ? model.LocationId : "";
            $rootScope.OrderDetail.Model.LocationCremationId = model.LocationCremationId != null ? model.LocationCremationId : "";
            $rootScope.OrderDetail.Model.ZipCode = model.ZipCode != null ? model.ZipCode : "";
            $rootScope.OrderDetail.Model.CityCremationName = model.CityCremationName != null ? model.CityCremationName : "";
            $rootScope.OrderDetail.Model.DistancePrice = model.DistancePrice;
            if ($rootScope.OrderDetail.Model.ZipCode != null && $rootScope.OrderDetail.Model.ZipCode != "") {
                $rootScope.OrderDetail.ReloadCityCemation_ZipCode();
            }
            $rootScope.OrderDetail.Model.QtyCertifiedId = model.QtyCertifiedId != null ? model.QtyCertifiedId : "";
            $rootScope.OrderDetail.Model.MemorialServiceId = model.MemorialServiceId != null ? model.MemorialServiceId : "";
            $rootScope.OrderDetail.Model.MemorialServiceTime = model.MemorialServiceTime != null ? model.MemorialServiceTime : "";
            $rootScope.OrderDetail.Model.SpecializedCareId = model.SpecializedCareId != null ? model.SpecializedCareId : "";
            $rootScope.OrderDetail.Model.URNSelectionId = model.URNSelectionId != null ? model.URNSelectionId : "";
            $rootScope.OrderDetail.Model.CasketPreferenceId = model.CasketPreferenceId != null ? model.CasketPreferenceId : "";
            $rootScope.OrderDetail.Model.VaultSelectionId = model.VaultSelectionId != null ? model.VaultSelectionId : "";
            $rootScope.OrderDetail.Model.BurialPackageId = model.BurialPackageId != null ? model.BurialPackageId : "";
            if ($rootScope.OrderDetail.Model.BurialPackageId != null && $rootScope.OrderDetail.Model.BurialPackageId != "") {
                 $rootScope.Billing.SettingPacketForBurial();
            }
            var uRnSelection = $.grep($rootScope.OrderDetail.SelectionData.URNSelection.List, function(e) { return e.Id == model.URNSelectionId; });
            if (uRnSelection.length != 0) {
                $rootScope.OrderDetail.URNSelectionPrice = uRnSelection[0].PriceNoTax;
                $rootScope.OrderDetail.URNSelectionName = uRnSelection[0].DisplayName;
            }

            var casketPreference = $.grep($rootScope.OrderDetail.SelectionData.CasketPreference.List, function(e) { return e.Id == model.CasketPreferenceId; });
            if (casketPreference.length != 0) {
                $rootScope.OrderDetail.CasketPreferencePrice = casketPreference[0].PriceNoTax;
                $rootScope.OrderDetail.CasketPreferenceName = casketPreference[0].DisplayName;
            }

            var vaultSelection = $.grep($rootScope.OrderDetail.SelectionData.VaultSelection.List, function (e) { return e.Id == model.VaultSelectionId; });
            if (vaultSelection.length != 0) $rootScope.OrderDetail.SelectionData.VaultSelection.Choose = vaultSelection[0];

            var burialPackage = $.grep($rootScope.OrderDetail.SelectionData.BurialPackages.List, function (e) { return e.Id == model.BurialPackageId; });
            if (burialPackage.length != 0) {
                $rootScope.OrderDetail.BurialPackagePrice = burialPackage[0].Price;
                $rootScope.OrderDetail.BurialPackageName = burialPackage[0].Name;
            }

            $rootScope.OrderDetail.Model.Burial_IsCemetery = model.Burial_IsCemetery != null ? model.Burial_IsCemetery : false;
            for (var l = 0; l < $rootScope.OrderDetail.SelectionData.BurialServices.List.length; l++) {
                for (var n = 0; n < model.ListBurialServiceId.length; n++) {
                    if ($rootScope.OrderDetail.SelectionData.BurialServices.List[l].Id == model.ListBurialServiceId[n]) {
                        $rootScope.OrderDetail.SelectionData.BurialServices.List[l].IsCheck = true;
                    }
                }
            }
            ///
            $rootScope.OrderDetail.Model.RecipientRemains_FirstName = model.RecipientRemains_FirstName != null ? model.RecipientRemains_FirstName : "";
            $rootScope.OrderDetail.Model.RecipientRemains_LastName = model.RecipientRemains_LastName != null ? model.RecipientRemains_LastName : "";
            $rootScope.OrderDetail.Model.RecipientRemains_Address = model.RecipientRemains_Address != null ? model.RecipientRemains_Address : "";
            $rootScope.OrderDetail.Model.RecipientRemains_AddressLine2 = model.RecipientRemains_AddressLine2 != null ? model.RecipientRemains_AddressLine2 : "";
            $rootScope.OrderDetail.Model.RecipientRemains_City = model.RecipientRemains_City != null ? model.RecipientRemains_City : "";
            $rootScope.OrderDetail.Model.RecipientRemains_State = model.RecipientRemains_State != null ? model.RecipientRemains_State : "";
            $rootScope.OrderDetail.Model.RecipientRemains_ZipCode = model.RecipientRemains_ZipCode != null ? model.RecipientRemains_ZipCode : "";
            $rootScope.OrderDetail.Model.RecipientRemains_CountryId = model.RecipientRemains_CountryId != null ? model.RecipientRemains_CountryId : "";
            $rootScope.OrderDetail.Model.PickupRemainId = model.PickupRemainId != null ? model.PickupRemainId : "";
            $rootScope.OrderDetail.Model.RelationshipId = model.RelationshipId != null ? model.RelationshipId : "";
            $rootScope.OrderDetail.Model.Relationship_TitleName = model.Relationship_TitleName != null ? model.Relationship_TitleName : "";
            $rootScope.OrderDetail.Model.Relationship_FirstName = model.Relationship_FirstName != null ? model.Relationship_FirstName : "";
            $rootScope.OrderDetail.Model.Relationship_LastName = model.Relationship_LastName != null ? model.Relationship_LastName : "";
            $rootScope.OrderDetail.Model.Relationship_SuffixName = model.Relationship_SuffixName != null ? model.Relationship_SuffixName : "";
            $rootScope.OrderDetail.Model.Relationship_Spouse = model.Relationship_Spouse != null ? model.Relationship_Spouse : "";
            $rootScope.OrderDetail.Model.Relationship_Address = model.Relationship_Address != null ? model.Relationship_Address : "";
            $rootScope.OrderDetail.Model.Relationship_AddressLine2 = model.Relationship_AddressLine2 != null ? model.Relationship_AddressLine2 : "";
            $rootScope.OrderDetail.Model.Relationship_City = model.Relationship_City != null ? model.Relationship_City : "";
            $rootScope.OrderDetail.Model.Relationship_State = model.Relationship_State != null ? model.Relationship_State : "";
            $rootScope.OrderDetail.Model.Relationship_ZipCode = model.Relationship_ZipCode != null ? model.Relationship_ZipCode : "";
            $rootScope.OrderDetail.Model.Relationship_CountryId = model.Relationship_CountryId != null ? model.Relationship_CountryId : "";
            $rootScope.OrderDetail.Model.Relationship_Email = model.Relationship_Email != null ? model.Relationship_Email : "";
            $rootScope.OrderDetail.Model.Relationship_PrimaryPhone = model.Relationship_PrimaryPhone != null ? model.Relationship_PrimaryPhone : "";
            $rootScope.OrderDetail.Model.Relationship_CellPhone = model.Relationship_CellPhone != null ? model.Relationship_CellPhone : "";
            $rootScope.OrderDetail.Model.Decedent_TitleName = model.Decedent_TitleName != null ? model.Decedent_TitleName : "";
            $rootScope.OrderDetail.Model.Decedent_FirstName = model.Decedent_FirstName != null ? model.Decedent_FirstName : "";
            $rootScope.OrderDetail.Model.Decedent_LastName = model.Decedent_LastName != null ? model.Decedent_LastName : "";
            $rootScope.OrderDetail.Model.Decedent_SuffixName = model.Decedent_SuffixName != null ? model.Decedent_SuffixName : "";
            $rootScope.OrderDetail.Model.Decedent_MiddleName = model.Decedent_MiddleName != null ? model.Decedent_MiddleName : "";
            $rootScope.OrderDetail.Model.Decedent_MaidenName = model.Decedent_MaidenName != null ? model.Decedent_MaidenName : "";
            $rootScope.OrderDetail.Model.Decedent_SocialSecurity = model.Decedent_SocialSecurity != null ? model.Decedent_SocialSecurity : "";
            $rootScope.OrderDetail.Model.Decedent_IsArmedForces = model.Decedent_IsArmedForces != null ? model.Decedent_IsArmedForces : false;
            $rootScope.OrderDetail.Model.Decedent_Branch = model.Decedent_Branch != null ? model.Decedent_Branch : "";
            $rootScope.OrderDetail.Model.Decedent_Sex = model.Decedent_Sex != null ? model.Decedent_Sex : "Male";
            $rootScope.OrderDetail.Model.Decedent_Address = model.Decedent_Address != null ? model.Decedent_Address : "";
            $rootScope.OrderDetail.Model.Decedent_AddressLine2 = model.Decedent_AddressLine2 != null ? model.Decedent_AddressLine2 : "";
            $rootScope.OrderDetail.Model.Decedent_City = model.Decedent_City != null ? model.Decedent_City : "";
            $rootScope.OrderDetail.Model.Decedent_State = model.Decedent_State != null ? model.Decedent_State : "";
            $rootScope.OrderDetail.Model.Decedent_ZipCode = model.Decedent_ZipCode != null ? model.Decedent_ZipCode : "";
            $rootScope.OrderDetail.Model.Decedent_CountryId = model.Decedent_CountryId != null ? model.Decedent_CountryId : "";
            // Set Decedent Birth Date
            var tempDecedentBirthDate = model.Decedent_BirthDate != null ? (new Date(parseInt(model.Decedent_BirthDate.substr(6)))) : "";
            $rootScope.OrderDetail.Model.Decedent_BirthDate = tempDecedentBirthDate !== "" ? (tempDecedentBirthDate.getMonth() + 1) + '-' + tempDecedentBirthDate.getDate() + '-' + tempDecedentBirthDate.getFullYear() : "";
            $rootScope.OrderDetail.Model.Decedent_CurrentAge = model.Decedent_CurrentAge != null ? model.Decedent_CurrentAge : 0;
            $rootScope.OrderDetail.Model.Decedent_StateOfBirth = model.Decedent_StateOfBirth != null ? model.Decedent_StateOfBirth : "";
            $rootScope.OrderDetail.Model.Decedent_MotherName = model.Decedent_MotherName != null ? model.Decedent_MotherName : "";
            $rootScope.OrderDetail.Model.Decedent_FatherName = model.Decedent_FatherName != null ? model.Decedent_FatherName : "";
            $rootScope.OrderDetail.Model.Decedent_EducationId = model.Decedent_EducationId != null ? model.Decedent_EducationId : "";
            $rootScope.OrderDetail.Model.Decedent_IsPacemaker = model.Decedent_IsPacemaker != null ? model.Decedent_IsPacemaker : false;
            $rootScope.OrderDetail.Model.Decedent_IsDefibilator = model.Decedent_IsDefibilator != null ? model.Decedent_IsDefibilator : false;
            $rootScope.OrderDetail.Model.Decedent_IsRadioActive = model.Decedent_IsRadioActive != null ? model.Decedent_IsRadioActive : false;
            $rootScope.OrderDetail.Model.Decedent_IsOtherBattery = model.Decedent_IsOtherBattery != null ? model.Decedent_IsOtherBattery : false;
            $rootScope.OrderDetail.Model.Decedent_IsNoHazardous = model.Decedent_IsNoHazardous != null ? model.Decedent_IsNoHazardous : false;

            // New Decedent 
            var tempDecedentDateOfDeath = model.Decedent_DateOfDeath != null ? (new Date(parseInt(model.Decedent_DateOfDeath.substr(6)))) : "";
            $rootScope.OrderDetail.Model.Decedent_DateOfDeath = tempDecedentDateOfDeath !== "" ? (tempDecedentDateOfDeath.getMonth() + 1) + '-' + tempDecedentDateOfDeath.getDate() + '-' + tempDecedentDateOfDeath.getFullYear() : "";
            $rootScope.OrderDetail.Model.Decedent_FacilityName = model.Decedent_FacilityName != null ? model.Decedent_FacilityName : "";
            $rootScope.OrderDetail.Model.Decedent_LocationOfDeath = model.Decedent_LocationOfDeath != null ? model.Decedent_LocationOfDeath : "";
            $rootScope.OrderDetail.Model.Decedent_CountyOfDeath = model.Decedent_CountyOfDeath != null ? model.Decedent_CountyOfDeath : "";
            $rootScope.OrderDetail.Model.Decedent_County = model.Decedent_County != null ? model.Decedent_County : "";
            $rootScope.OrderDetail.Model.Decedent_DecedentUsual = model.Decedent_DecedentUsual != null ? model.Decedent_DecedentUsual : "";
            $rootScope.OrderDetail.Model.Decedent_KindofBusiness = model.Decedent_KindofBusiness != null ? model.Decedent_KindofBusiness : "";
            $rootScope.OrderDetail.Model.Decedent_ResidenceState = model.Decedent_ResidenceState != null ? model.Decedent_ResidenceState : "";
            $rootScope.OrderDetail.Model.Decedent_Race = model.Decedent_Race != null ? model.Decedent_Race : "";
            $rootScope.OrderDetail.Model.Decedent_RaceValue = model.Decedent_RaceValue != null ? model.Decedent_RaceValue : "";
            $rootScope.OrderDetail.Model.Decedent_InformationName = model.Decedent_InformationName != null ? model.Decedent_InformationName : "";
            $rootScope.OrderDetail.Model.Decedent_MailingAddress = model.Decedent_MailingAddress != null ? model.Decedent_MailingAddress : "";
            $rootScope.OrderDetail.Model.Decedent_Hospital = model.Decedent_Hospital != null ? model.Decedent_Hospital : "";
            $rootScope.OrderDetail.Model.Decedent_HospitalOther = model.Decedent_HospitalOther != null ? model.Decedent_HospitalOther : "";
            $rootScope.OrderDetail.Model.Decedent_IsInsideCity = model.Decedent_IsInsideCity != null ? model.Decedent_IsInsideCity : 'true';
            $rootScope.OrderDetail.Model.Decedent_HispanicOrigin = model.Decedent_HispanicOrigin != null ? model.Decedent_HispanicOrigin : "";
            $rootScope.OrderDetail.Model.Decedent_HispanicOriginValue = model.Decedent_HispanicOriginValue != null ? model.Decedent_HispanicOriginValue : "";
            $rootScope.OrderDetail.Model.Decedent_Under1Year_Months = model.Decedent_Under1Year_Months != null ? model.Decedent_Under1Year_Months : "";
            $rootScope.OrderDetail.Model.Decedent_Under1Year_Days = model.Decedent_Under1Year_Days != null ? model.Decedent_Under1Year_Days : "";
            $rootScope.OrderDetail.Model.Decedent_Under1Year_Hours = model.Decedent_Under1Year_Hours != null ? model.Decedent_Under1Year_Hours : "";
            $rootScope.OrderDetail.Model.Decedent_Under1Year_Minutes = model.Decedent_Under1Year_Minutes != null ? model.Decedent_Under1Year_Minutes : "";
            $rootScope.OrderDetail.Model.Decedent_TimeofDeath = model.Decedent_TimeofDeath != null ? model.Decedent_TimeofDeath : "";
            // set for variable temp
            if (model.Decedent_TimeofDeath != null && model.Decedent_TimeofDeath != '') {
                var time = model.Decedent_TimeofDeath.split(' ')[0];
                $rootScope.OrderDetail.Model.Decedent_TimeofDeath_Hours = parseInt(time.split(':')[0]);
                $rootScope.OrderDetail.Model.Decedent_TimeofDeath_Minutes = parseInt(time.split(':')[1]);
                $rootScope.OrderDetail.Model.Decedent_TimeofDeath_APM = model.Decedent_TimeofDeath.split(' ')[1];
            }

            $rootScope.OrderDetail.Model.Decedent_MethodOfDisposition = model.Decedent_MethodOfDisposition != null ? model.Decedent_MethodOfDisposition : "";
            $rootScope.OrderDetail.Model.Decedent_MethodOfDispositionValue = model.Decedent_MethodOfDispositionValue != null ? model.Decedent_MethodOfDispositionValue : "";
            $rootScope.OrderDetail.Model.Decedent_PlanceOfDisposition = model.Decedent_PlanceOfDisposition != null ? model.Decedent_PlanceOfDisposition : "";
            $rootScope.OrderDetail.Model.Decedent_LocationCityTownState = model.Decedent_LocationCityTownState != null ? model.Decedent_LocationCityTownState : "";
            $rootScope.OrderDetail.Model.Decedent_EmbalmersName = model.Decedent_EmbalmersName != null ? model.Decedent_EmbalmersName : "";
            $rootScope.OrderDetail.Model.Decedent_RelationshipToDecedent = model.Decedent_RelationshipToDecedent != null ? model.Decedent_RelationshipToDecedent : "";
            $rootScope.OrderDetail.Model.Decedent_ZipCodeState = model.Decedent_ZipCodeState != null ? model.Decedent_ZipCodeState : "";

            $rootScope.OrderDetail.Model.Decedent_IsWasDeathCaused = model.Decedent_IsWasDeathCaused != null ? model.Decedent_IsWasDeathCaused : false;
            $rootScope.OrderDetail.Model.Decedent_WasDeathCausedValue = model.Decedent_WasDeathCausedValue != null ? model.Decedent_WasDeathCausedValue : "";
            // End New Decedent
            $rootScope.OrderDetail.Model.Survivor_TitleName = model.Survivor_TitleName != null ? model.Survivor_TitleName : "";
            $rootScope.OrderDetail.Model.Survivor_FirstName = model.Survivor_FirstName != null ? model.Survivor_FirstName : "";
            $rootScope.OrderDetail.Model.Survivor_LastName = model.Survivor_LastName != null ? model.Survivor_LastName : "";
            $rootScope.OrderDetail.Model.Survivor_SuffixName = model.Survivor_SuffixName != null ? model.Survivor_SuffixName : "";
            $rootScope.OrderDetail.Model.Survivor_ListSon = model.Survivor_ListSon.length != 0 ? model.Survivor_ListSon : [angular.copy($rootScope.DataDynamics.SurvivingSpouse)];
            $rootScope.OrderDetail.Model.Survivor_ListDaughters = model.Survivor_ListDaughters.length != 0 ? model.Survivor_ListDaughters : [angular.copy($rootScope.DataDynamics.SurvivingSpouse)];
            $rootScope.OrderDetail.Model.Survivor_ListBrothers = model.Survivor_ListBrothers.length != 0 ? model.Survivor_ListBrothers : [angular.copy($rootScope.DataDynamics.SurvivingSpouse)];
            $rootScope.OrderDetail.Model.Survivor_ListSisters = model.Survivor_ListSisters.length != 0 ? model.Survivor_ListSisters : [angular.copy($rootScope.DataDynamics.SurvivingSpouse)];
            $rootScope.OrderDetail.Model.Survivor_OfGrandchildren = model.Survivor_OfGrandchildren != null ? model.Survivor_OfGrandchildren : "";
            $rootScope.OrderDetail.Model.Survivor_OfGreatGrandchildren = model.Survivor_OfGreatGrandchildren != null ? Survivor_OfGreatGrandchildren : "";
            $rootScope.OrderDetail.Model.Survivor_OfGreatGreatGrandchildren = model.Survivor_OfGreatGreatGrandchildren != null ? model.Survivor_OfGreatGreatGrandchildren : "";
            $rootScope.OrderDetail.Model.Memorial_IsHas = model.Memorial_IsHas != null ? model.Memorial_IsHas : true;
            $rootScope.OrderDetail.Model.Memorial_BusinessName = model.Memorial_BusinessName != null ? model.Memorial_BusinessName : "";
            $rootScope.OrderDetail.Model.Memorial_Address = model.Memorial_Address != null ? model.Memorial_Address : "";
            $rootScope.OrderDetail.Model.Memorial_AddressLine2 = model.Memorial_AddressLine2 != null ? model.Memorial_AddressLine2 : "";
            $rootScope.OrderDetail.Model.Memorial_City = model.Memorial_City != null ? model.Memorial_City : "";
            $rootScope.OrderDetail.Model.Memorial_ZipCode = model.Memorial_ZipCode != null ? model.Memorial_ZipCode : "";
            $rootScope.OrderDetail.Model.Memorial_State = model.Memorial_State != null ? model.Memorial_State : "";
            $rootScope.OrderDetail.Model.Memorial_CountryId = model.Memorial_CountryId != null ? model.Memorial_CountryId : "";
            $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower = model.Memorial_ListLieuOfFlower.length != 0 ? model.Memorial_ListLieuOfFlower : [angular.copy($rootScope.DataDynamics.LieuOfFlower)];

            for (var i = 0; i < $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower.length; i++) {
                $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower[i].Country = angular.copy($rootScope.OrderDetail.SelectionData.Country_LieuOfFlower);
                var itemCountry = $.grep($rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower[i].Country.List, function(e) { return e.Id == $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower[i].CountryId; });
                if (itemCountry.length != 0) $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower[i].Country.Choose = itemCountry[0];
            }

            $rootScope.OrderDetail.Model.Memorial_IsPreplanning = model.Memorial_IsPreplanning != null ? model.Memorial_IsPreplanning : "true";
            $rootScope.OrderDetail.Model.UrlDocusign_GoodsServices = model.UrlDocusign_GoodsServices != null ? model.UrlDocusign_GoodsServices : "";
            $rootScope.OrderDetail.Model.UrlDocusign_LegalNext = model.UrlDocusign_LegalNext != null ? model.UrlDocusign_LegalNext : "";
            $rootScope.OrderDetail.Model.UrlDocusign_PreNeed = model.UrlDocusign_PreNeed != null ? model.UrlDocusign_PreNeed : "";
            $rootScope.OrderDetail.Model.UrlDocusign_DeathCertificate = model.UrlDocusign_DeathCertificate != null ? model.UrlDocusign_DeathCertificate : "";
            $rootScope.OrderDetail.Model.IsSigned = model.IsSigned != null ? model.IsSigned : false;
            $rootScope.OrderDetail.Model.ServiceType = model.ServiceType != null ? model.ServiceType : "";

            $rootScope.OrderDetail.Model.Price_TotalPrice = model.Price_TotalPrice != null ? model.Price_TotalPrice : 0;
            $rootScope.OrderDetail.Model.Price_TotalPaid = model.Price_TotalPaid != null ? model.Price_TotalPaid : 0;
            $rootScope.OrderDetail.Model.Price_IsPaid = model.Price_IsPaid != null ? model.Price_IsPaid : false;

            $rootScope.OrderDetail.Model.Burial_Visitation = model.Burial_Visitation != null ? model.Burial_Visitation : "";
            $rootScope.OrderDetail.SelectionData.ListBurialVisitation.Choose = $rootScope.OrderDetail.Model.Burial_Visitation;
            $rootScope.OrderDetail.Model.Burial_Type = model.Burial_Type != null ? model.Burial_Type : "";
            $rootScope.OrderDetail.SelectionData.ListBurialType.Choose = $rootScope.OrderDetail.Model.Burial_Type;

            $rootScope.OrderDetail.Model.Burial_Type_Church = model.Burial_Type_Church != null ? model.Burial_Type_Church : "";
            $rootScope.OrderDetail.Model.Burial_Type_Graveside = model.Burial_Type_Graveside != null ? model.Burial_Type_Graveside : "";
            $rootScope.OrderDetail.Model.Burial_Minister = model.Burial_Minister != null ? model.Burial_Minister : "";
            $rootScope.OrderDetail.Model.Burial_IsMinister = (model.Burial_Minister != null && model.Burial_Minister != "") ? true : false;

            $rootScope.OrderDetail.Model.Burial_Casket = model.Burial_Casket != null ? model.Burial_Casket : "";
            $rootScope.OrderDetail.SelectionData.ListBurialCasket.Choose = $rootScope.OrderDetail.Model.Burial_Casket;

            $rootScope.OrderDetail.Model.Burial_Pallbearers = model.Burial_Pallbearers != null ? model.Burial_Pallbearers : "";
            $rootScope.OrderDetail.Model.Burial_IsPallbearers = (model.Burial_Pallbearers != null && model.Burial_Pallbearers != "") ? true : false;

            $rootScope.OrderDetail.Model.Burial_LocationFuneral = model.Burial_LocationFuneral != null ? model.Burial_LocationFuneral : "";

            var locationOfFuneral = $.grep($rootScope.OrderDetail.SelectionData.ListLocationOfFuneral.List, function (e) {return e.Name == $rootScope.OrderDetail.Model.Burial_LocationFuneral;});
            if (locationOfFuneral.length != 0) {
                $rootScope.OrderDetail.SelectionData.ListLocationOfFuneral.Choose = locationOfFuneral[0];
            }

            $rootScope.OrderDetail.Model.Burial_NameLocation = model.Burial_NameLocation != null ? model.Burial_NameLocation : "";
            $rootScope.OrderDetail.Model.Burial_LocationZip = model.Burial_LocationZip != null ? model.Burial_LocationZip : "";
            $rootScope.OrderDetail.Model.Burial_LocationCityState = model.Burial_LocationCityState != null ? model.Burial_LocationCityState : "";
            $rootScope.OrderDetail.Model.Burial_LocationZip_DistancePrice = model.Burial_LocationZip_DistancePrice;
            if ($rootScope.OrderDetail.Model.Burial_LocationZip != null && $rootScope.OrderDetail.Model.Burial_LocationZip != "") {
                $rootScope.OrderDetail.ReloadBurial_LocationZip();
            }

            var tempBurialMemorialServiceDate = model.Burial_MemorialServiceDate != null ? (new Date(parseInt(model.Burial_MemorialServiceDate.substr(6)))) : "";
            $rootScope.OrderDetail.Model.Burial_MemorialServiceDate = tempBurialMemorialServiceDate !== "" ? (tempBurialMemorialServiceDate.getMonth() + 1) + '-' + tempBurialMemorialServiceDate.getDate() + '-' + tempBurialMemorialServiceDate.getFullYear() : "";

            $rootScope.OrderDetail.Model.Burial_Cemetery = model.Burial_Cemetery != null ? model.Burial_Cemetery : "";
            $rootScope.OrderDetail.Model.Burial_CemeteryStateId = model.Burial_CemeteryStateId != null ? model.Burial_CemeteryStateId : "";

            var cremeteryState = $.grep($rootScope.OrderDetail.SelectionData.BurialCityStates.List, function (e) { return e.Id == model.Burial_CemeteryStateId; });
            if (cremeteryState.length != 0) {
                $rootScope.OrderDetail.SelectionData.BurialCityStates.Choose = cremeteryState[0];
            }

            $rootScope.OrderDetail.Model.Burial_CemeteryCity = model.Burial_CemeteryCity != null ? model.Burial_CemeteryCity : "";
            $rootScope.OrderDetail.Model.Burial_IsLieuOfFlowers = model.Burial_IsLieuOfFlowers != null ? model.Burial_IsLieuOfFlowers : false;
            $rootScope.OrderDetail.Model.Burial_OrganizationName = model.Burial_OrganizationName != null ? model.Burial_OrganizationName : "";
            $rootScope.OrderDetail.Model.Burial_OrganizationAddress = model.Burial_OrganizationAddress != null ? model.Burial_OrganizationAddress : "";
            $rootScope.OrderDetail.Model.Burial_Notes = model.Burial_Notes != null ? model.Burial_Notes : "";
            $rootScope.OrderDetail.Model.Burial_MailingDeath = model.Burial_MailingDeath != null ? model.Burial_MailingDeath : "";

            var mailingItem = $.grep($rootScope.OrderDetail.SelectionData.BurialMailingDeath.List, function(e) {
                return e.Name == model.Burial_MailingDeath;
            });
            if (mailingItem.length != 0) $rootScope.OrderDetail.SelectionData.BurialMailingDeath.Choose = mailingItem[0];

            if (model.ListBurialPublicServiceItems.length != 0) {
                $rootScope.OrderDetail.Model.Burial_ListMusic = [];
                $rootScope.OrderDetail.Model.Burial_ListMinster = [];
                $rootScope.OrderDetail.Model.Burial_ListPallbearers = [];
                for (var o = 0; o < model.ListBurialPublicServiceItems.length; o++) {
                    if (model.ListBurialPublicServiceItems[o].Key == $rootScope.TextContants.BurialPublicServiceType.Music) {
                        $rootScope.OrderDetail.Model.Burial_ListMusic.push(model.ListBurialPublicServiceItems[o]);
                    } else if (model.ListBurialPublicServiceItems[o].Key == $rootScope.TextContants.BurialPublicServiceType.Minster) {
                        $rootScope.OrderDetail.Model.Burial_ListMinster.push(model.ListBurialPublicServiceItems[o]);
                    } else if (model.ListBurialPublicServiceItems[o].Key == $rootScope.TextContants.BurialPublicServiceType.Pallbearers) {
                        $rootScope.OrderDetail.Model.Burial_ListPallbearers.push(model.ListBurialPublicServiceItems[o]);
                    }
                }
            } else {
                $rootScope.OrderDetail.Model.Burial_ListMusic = [angular.copy($rootScope.DataDynamics.PublicServiceItem)];
                $rootScope.OrderDetail.Model.Burial_ListMinster = [angular.copy($rootScope.DataDynamics.PublicServiceItem)];
                $rootScope.OrderDetail.Model.Burial_ListPallbearers = [angular.copy($rootScope.DataDynamics.PublicServiceItem)];
            }

            if (model.Step > 1) {
                $rootScope.TextContants.IsAgree = true;
            }
            var serviceType = $.grep($rootScope.OrderDetail.SelectionData.ServiceType.List, function(e) { return e.Name == model.ServiceType; });
            if (serviceType.length != 0) $rootScope.OrderDetail.SelectionData.ServiceType.Choose = serviceType[0];

            var cityCremation = $.grep($rootScope.OrderDetail.SelectionData.CityCremation.List, function(e) { return e.Id == model.CityCremationId; });
            if (cityCremation.length != 0) $rootScope.OrderDetail.SelectionData.CityCremation.Choose = cityCremation[0];

            var location = $.grep($rootScope.OrderDetail.SelectionData.Location.List, function(e) { return e.Id == model.LocationId; });
            if (location.length != 0) $rootScope.OrderDetail.SelectionData.Location.Choose = location[0];

            var locationCremation = $.grep($rootScope.OrderDetail.SelectionData.LocationCremation.List, function(e) { return e.Id == model.LocationCremationId; });
            if (locationCremation.length != 0) $rootScope.OrderDetail.SelectionData.LocationCremation.Choose = locationCremation[0];

            var qtyCertified = $.grep($rootScope.OrderDetail.SelectionData.QtyCertified.List, function(e) { return e.Id == model.QtyCertifiedId; });
            if (qtyCertified.length != 0) $rootScope.OrderDetail.SelectionData.QtyCertified.Choose = qtyCertified[0];

            var memorialService = $.grep($rootScope.OrderDetail.SelectionData.MemorialService.List, function(e) { return e.Id == model.MemorialServiceId; });
            if (memorialService.length != 0) $rootScope.OrderDetail.SelectionData.MemorialService.Choose = memorialService[0];


            var memorialServiceTime = $.grep($rootScope.OrderDetail.SelectionData.MemorialServiceTime.List, function (e) { return e.Name == model.MemorialServiceTime });
            if (memorialServiceTime.length != 0) $rootScope.OrderDetail.SelectionData.MemorialServiceTime.Choose = memorialServiceTime[0];

            var specializedCare = $.grep($rootScope.OrderDetail.SelectionData.SpecializedCare.List, function(e) { return e.Id == model.SpecializedCareId; });
            if (specializedCare.length != 0) $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose = specializedCare[0];

            var relationshipCountry = $.grep($rootScope.OrderDetail.SelectionData.Country_BiographicalData.List, function(e) { return e.Id == model.Relationship_CountryId; });
            if (relationshipCountry.length != 0) $rootScope.OrderDetail.SelectionData.Country_BiographicalData.Choose = relationshipCountry[0];

            var decedentCountry = $.grep($rootScope.OrderDetail.SelectionData.Country_DecedantData.List, function(e) { return e.Id == model.Decedent_CountryId; });
            if (decedentCountry.length != 0) $rootScope.OrderDetail.SelectionData.Country_DecedantData.Choose = decedentCountry[0];

            var memorialCountry = $.grep($rootScope.OrderDetail.SelectionData.Country_Memorial.List, function(e) { return e.Id == model.Memorial_CountryId; });
            if (memorialCountry.length != 0) $rootScope.OrderDetail.SelectionData.Country_Memorial.Choose = memorialCountry[0];

            var education = $.grep($rootScope.OrderDetail.SelectionData.Education.List, function(e) { return e.Id == model.Decedent_EducationId; });
            if (education.length != 0) $rootScope.OrderDetail.SelectionData.Education.Choose = education[0];

            var decedentMaritalStatus = $.grep($rootScope.OrderDetail.SelectionData.MaritalStatus.List, function(e) { return e.Name == model.Decedent_MaritalStatus; });
            if (decedentMaritalStatus.length != 0) $rootScope.OrderDetail.SelectionData.MaritalStatus.Choose = decedentMaritalStatus[0];
            var inBrand = $.grep($rootScope.OrderDetail.SelectionData.InBrand.List, function(e) { return e.Name == model.Decedent_Branch; });
            if (inBrand.length != 0) $rootScope.OrderDetail.SelectionData.InBrand.Choose = inBrand[0];

            var hospital = $.grep($rootScope.OrderDetail.SelectionData.ListHospital.List, function(e) { return e.Name == model.Decedent_Hospital; });
            if (hospital.length != 0) $rootScope.OrderDetail.SelectionData.ListHospital.Choose = hospital[0];
            // set select other when have value , but difirent
            var hospitalOther = $.grep($rootScope.OrderDetail.SelectionData.ListHospitalOrther.List, function(e) { return e.Name == model.Decedent_HospitalOther; });
            if (hospitalOther.length != 0) {
                $rootScope.OrderDetail.SelectionData.ListHospitalOrther.Choose = hospitalOther[0];
            } else if (model.Decedent_HospitalOther != '' && model.Decedent_HospitalOther != null) {
                $rootScope.OrderDetail.SelectionData.ListHospitalOrther.Choose = $rootScope.OrderDetail.SelectionData.ListHospitalOrther.List[2];
                $rootScope.OrderDetail.Model.Decedent_HospitalOther = model.Decedent_HospitalOther;
            }

            var hispanic = $.grep($rootScope.OrderDetail.SelectionData.ListHispanicOrigin.List, function(e) { return e.Name == model.Decedent_HispanicOrigin; });
            if (hispanic.length != 0) {
                $rootScope.OrderDetail.SelectionData.ListHispanicOrigin.Choose = hispanic[0];
            }

            var decedentRace = $.grep($rootScope.OrderDetail.SelectionData.ListDecedentRace.List, function(e) { return e.Name == model.Decedent_Race; });
            if (decedentRace.length != 0) {
                $rootScope.OrderDetail.SelectionData.ListDecedentRace.Choose = decedentRace[0];
            }

            var methodOfDisposition = $.grep($rootScope.OrderDetail.SelectionData.ListMethodOfDisposition.List, function(e) { return e.Name == model.Decedent_MethodOfDisposition; });
            if (methodOfDisposition != 0) {
                $rootScope.OrderDetail.SelectionData.ListMethodOfDisposition.Choose = methodOfDisposition[0];
            }

            var countryRecipientRemains = $.grep($rootScope.OrderDetail.SelectionData.Country_RecipientRemains.List, function(e) { return e.Id == model.RecipientRemains_CountryId; });
            if (countryRecipientRemains.length != 0) $rootScope.OrderDetail.SelectionData.Country_RecipientRemains.Choose = countryRecipientRemains[0];


            var pickupRemain = $.grep($rootScope.OrderDetail.SelectionData.PickupRemain.List, function(e) { return e.Id == model.PickupRemainId; });
            if (pickupRemain.length != 0) $rootScope.OrderDetail.SelectionData.PickupRemain.Choose = pickupRemain[0];


            for (var i = 0; i < model.ListMemorialPackageId.length; i++) {
                var itemMemorialPackage = $.grep($rootScope.OrderDetail.SelectionData.MemorialPackage.List, function(e) { return e.Id == model.ListMemorialPackageId[i]; });
                if (itemMemorialPackage.length != 0) itemMemorialPackage[0].IsCheck = true;
            }

            for (var i = 0; i < model.ListMemorialPackageItemId.length; i++) {
                for (var j = 0; j < $rootScope.OrderDetail.SelectionData.MemorialPackage.List.length; j++) {
                    var itemMemorialPackageItems = $.grep($rootScope.OrderDetail.SelectionData.MemorialPackage.List[j].MemorialPackageItems, function(e) { return e.Id == model.ListMemorialPackageItemId[i]; });
                    if (itemMemorialPackageItems.length != 0) {
                        $rootScope.OrderDetail.SelectionData.MemorialPackage.List[j].MemorialPackageItemSelect = itemMemorialPackageItems[0];
                        $rootScope.OrderDetail.SelectionData.MemorialPackage.List[j].IsCheck = true;
                    }
                }
            }

            for (var i = 0; i < model.ListBurialMemorialPackageId.length; i++) {
                //set BurialMemorialPackage
                for (var j = 0; j < $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List.length; j++) {
                    if ($rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[j].Id == model.ListBurialMemorialPackageId[i]) {
                        $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[j].IsCheck = true;

                    } else {
                        $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[j].IsCheck = false;
                    }
                }
            }

            for (var k = 0; k < model.ListBurialMemorialPackageItem.length; k++) {
                for (var m = 0; m < $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List.length; m++) {
                    if (model.ListBurialMemorialPackageItem[k].Id == $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[m].Id) {
                        $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List[m].Qty = model.ListBurialMemorialPackageItem[k].Qty;
                    }
                }
            }

            $rootScope.OrderDetail.ChangePricingWhenSelectServiceType();

            //if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Burial && $rootScope.OrderDetail.BurialPackageName != $rootScope.TextContants.BurialPackage.Manual && $rootScope.OrderDetail.Model.IsChangePackageType == true) {
            //    $rootScope.Billing.ClearDataWhenChangeBurialPackage();
            //    $rootScope.OrderDetail.Model.IsChangePackageType = false;
            //} 


            if (!$scope.$$phase) $scope.$apply();
        },
        SetSelectionData: function (result) {
            //
            $rootScope.OrderDetail.DetailPrice.ZipCodeBasePrice = result.ZipCodeBasePrice;
            $rootScope.OrderDetail.DetailPrice.PriceInMile = result.PriceInMile;
            $rootScope.OrderDetail.DetailPrice.Tax = result.Tax;
            $rootScope.OrderDetail.Model.CemeterySetupPrice = parseFloat(result.CemeterySetupPrice);
            $rootScope.OrderDetail.Model.ObituaryPreparationPrice = parseFloat(result.ObituaryPreparationPrice);
            $rootScope.OrderDetail.Model.OnlineGuestbookPrice = parseFloat(result.OnlineGuestbookPrice);
            $rootScope.OrderDetail.Model.CurrentMonth = parseInt(result.CurrentMonth);
            $rootScope.OrderDetail.Model.CurrentYear = parseInt(result.CurrentYear);
            $rootScope.OrderDetail.Model.CurrentDate = parseInt(result.CurrentDate);
            $rootScope.OrderDetail.SelectionData.CityCremation.List = result.CityCremations;
            $rootScope.OrderDetail.SelectionData.LocationCremation.List = result.LocationCremations;
            $rootScope.OrderDetail.SelectionData.QtyCertified.List = result.QtyCertifieds;
            $rootScope.OrderDetail.SelectionData.MemorialService.List = result.MemorialServices;
            $rootScope.OrderDetail.SelectionData.SpecializedCare.List = result.SpecializedCares;
            $rootScope.OrderDetail.SelectionData.URNSelection.List = result.UrnSelections;
            $rootScope.OrderDetail.SelectionData.CasketPreference.List = result.CasketPreference;
            $rootScope.OrderDetail.SelectionData.VaultSelection.List = result.VaultSelection;
            $rootScope.OrderDetail.SelectionData.BurialPackages.List = result.BurialPackages;
            //
            $rootScope.OrderDetail.SelectionData.BurialServices.List = result.BurialServices;
            $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List = result.BurialMemorialPackages;
            $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List = result.BurialMemorialPackageItems;
            $rootScope.OrderDetail.SelectionData.BurialCityStates.List = result.BurialCityStates;

            var burialCityStatesSelectDefault = $.grep(result.BurialCityStates, function (e) { return e.Value == "AR"; });
            if (burialCityStatesSelectDefault.length != 0) $rootScope.OrderDetail.SelectionData.BurialCityStates.Choose = burialCityStatesSelectDefault[0];
            var countrySelectDefault = $.grep(result.Countries, function (e) { return e.Name == "United States"; });
            $rootScope.OrderDetail.SelectionData.Country.List = result.Countries;
            if (countrySelectDefault.length != 0) $rootScope.OrderDetail.SelectionData.Country.Choose = countrySelectDefault[0];

            $rootScope.OrderDetail.SelectionData.Country_BiographicalData.List = result.Countries;
            if (countrySelectDefault.length != 0) $rootScope.OrderDetail.SelectionData.Country_BiographicalData.Choose = countrySelectDefault[0];

            $rootScope.OrderDetail.SelectionData.Country_DecedantData.List = result.Countries;
            if (countrySelectDefault.length != 0) $rootScope.OrderDetail.SelectionData.Country_DecedantData.Choose = countrySelectDefault[0];

            $rootScope.OrderDetail.SelectionData.Country_Memorial.List = result.Countries;
            if (countrySelectDefault.length != 0) $rootScope.OrderDetail.SelectionData.Country_Memorial.Choose = countrySelectDefault[0];

            $rootScope.OrderDetail.SelectionData.Country_LieuOfFlower.List = result.Countries;
            if (countrySelectDefault.length != 0) $rootScope.OrderDetail.SelectionData.Country_LieuOfFlower.Choose = countrySelectDefault[0];

            $rootScope.DataDynamics.LieuOfFlower.Country = angular.copy($rootScope.OrderDetail.SelectionData.Country_LieuOfFlower);
            $rootScope.OrderDetail.Model.Memorial_ListLieuOfFlower[0].Country = angular.copy($rootScope.OrderDetail.SelectionData.Country_LieuOfFlower);

            $rootScope.OrderDetail.SelectionData.Country_RecipientRemains.List = result.Countries;
            if (countrySelectDefault.length != 0) $rootScope.OrderDetail.SelectionData.Country_RecipientRemains.Choose = countrySelectDefault[0];

            $rootScope.OrderDetail.SelectionData.PickupRemain.List = result.PickupRemains;
            $rootScope.OrderDetail.SelectionData.PickupRemain.Choose = result.PickupRemains[0];
            $rootScope.OrderDetail.SelectionData.Relationship.List = result.Relationships;
            $rootScope.OrderDetail.SelectionData.Education.List = result.Educations;
            $rootScope.OrderDetail.SelectionData.MemorialPackage.List = result.MemorialPackages;
            $rootScope.OrderDetail.SelectionData.Pricing.List = result.Pricings;
            $rootScope.OrderDetail.SelectionData.InBrand.List = $rootScope.TextContants.ListBrand;
            $rootScope.OrderDetail.SelectionData.ListBurialVisitation.List = result.ListBurialVisitation;
            $rootScope.OrderDetail.SelectionData.ListBurialType.List = result.ListBurialType;
            $rootScope.OrderDetail.SelectionData.ListBurialCasket.List = result.ListBurialCasket;

            for (var i = 0; i < $rootScope.OrderDetail.SelectionData.MemorialPackage.List.length; i++) {
                $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].MemorialPackageItemSelect = "";
            }

            $rootScope.OrderDetail.TempToResetModel = angular.copy($rootScope.OrderDetail.Model);                 // when urser  reset section => temptoResetModel will copy to mode
            $rootScope.OrderDetail.TempToResetSelectionData = angular.copy($rootScope.OrderDetail.SelectionData); // when urser  reset section => TempToResetSelectionData will copy to SelectionData

            // Filling Master Data
            $rootScope.TextContants.MasterData.EmailContact = result.EmailContact;
            $rootScope.TextContants.MasterData.EmailConway = result.EmailConway;
            $rootScope.TextContants.MasterData.EmailMorrilton = result.EmailMorrilton;
            $rootScope.TextContants.MasterData.FaxConway = result.FaxConway;
            $rootScope.TextContants.MasterData.FaxMorrilton = result.FaxMorrilton;
            $rootScope.TextContants.MasterData.Fax = result.Fax;

        },
        GetOrderDetails: function () {
            // Get OrderDetails
            // When order created system get old data when user enter F5 in browser , or get order by token
                orderMainService.GetOrderDetails().then(function (result) {
                    if (result.IsHasSection == true) {
                        $rootScope.Billing.OrderBilling(result.OrderBilling);
                    }
                    if (result.IsHasToken == true) {
                        $location.path("/PickUp");
                    }
                    if (!$scope.$$phase) $scope.$apply();
                });
        },
        GetSelectionData: function () {
            if ($window.sessionStorage.getItem("SessionSelectionData")) {
                var result = angular.fromJson($window.sessionStorage.getItem("SessionSelectionData"));
                $rootScope.Billing.SetSelectionData(result);
                $rootScope.Billing.GetOrderDetails();
                if (!$scope.$$phase) $scope.$apply();
            } else {
                orderMainService.GetSelectionData().then(function (result) {
                        $rootScope.Billing.SetSelectionData(result);
                        $rootScope.Billing.GetOrderDetails();
                        if (!$scope.$$phase) $scope.$apply();
                        $window.sessionStorage.setItem("SessionSelectionData", angular.toJson(result));
                });
            }
        }
    }

    $rootScope.Billing.GetSelectionData();

    $rootScope.Button =
    {
        IsPrevious: false,
        IsNext: false,
        GetStarted: function(serviceType) {
            if ($rootScope.OrderDetail.Model.SectionStep == 0) {
                $rootScope.OrderDetail.Model.SectionStep++;
            }
            $rootScope.OrderDetail.Model.ServiceType = serviceType;
            $rootScope.OrderDetail.ChangePricingWhenSelectServiceType();
            $rootScope.Billing.ClearDataWhenChangeBurialPackage();
            $rootScope.Button.Next();
        },
        ValidateForm: function() {
            $rootScope.$broadcast('Submit', null);
        },
        Next: function () {

            if (!navigator.onLine) {
                return;
            }

            if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                if (!$rootScope.OrderDetail.CheckSpecializedCareValid() && $rootScope.OrderDetail.Model.Step >= 2) {
                    $("#divWarningSpecializedCare").openModal();
                } else if ($rootScope.OrderDetail.Model.Step !== 16) {
                    if ($rootScope.OrderDetail.Model.Step == 5) {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step + 3;
                    } else {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step + 1;
                    }
                    $rootScope.Button.IsPrevious = false;
                    $rootScope.Button.IsNext = true;
                    $rootScope.Button.GoToPage();
                }
            }
            else if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Burial) {
                if (!$rootScope.OrderDetail.CheckSpecializedCareValid() && $rootScope.OrderDetail.Model.Step >= 2) {
                    $("#divWarningSpecializedCare").openModal();
                } else if ($rootScope.OrderDetail.Model.Step !== 16) {
                    //if ($rootScope.OrderDetail.Model.Step == 6 && $rootScope.OrderDetail.BurialPackageName == $rootScope.TextContants.BurialPackage.Manual) {
                    //    $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step + 2;
                    //}
                    if ($rootScope.OrderDetail.Model.Step == 4 && $rootScope.OrderDetail.BurialPackageName != $rootScope.TextContants.BurialPackage.Manual) {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step + 2;
                    }
                    else if ($rootScope.OrderDetail.Model.Step == 2 && $rootScope.OrderDetail.BurialPackageName == $rootScope.TextContants.BurialPackage.DirectBurial) {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step + 2;
                    }
                    else if ($rootScope.OrderDetail.Model.Step == 10) {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step + 2;
                    }
                    else {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step + 1;
                    }
                    $rootScope.Button.IsPrevious = false;
                    $rootScope.Button.IsNext = true;
                    $rootScope.Button.GoToPage();
                }
            }
           
        },
        Previous: function () {
            if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                if ($rootScope.OrderDetail.Model.Step !== 0) {
                    if ($rootScope.OrderDetail.Model.Step == 8) {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 3;
                    } else {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    $rootScope.Button.IsPrevious = true;
                    $rootScope.Button.GoToPage();
                }
            } else if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Burial) {
                if ($rootScope.OrderDetail.Model.Step !== 0) {
                    //if ($rootScope.OrderDetail.Model.Step == 8 && $rootScope.OrderDetail.BurialPackageName == $rootScope.TextContants.BurialPackage.Manual) {
                    //    $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 2;
                    //}
                    if ($rootScope.OrderDetail.Model.Step == 6 && $rootScope.OrderDetail.BurialPackageName != $rootScope.TextContants.BurialPackage.Manual) {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 2;
                    }
                    else if ($rootScope.OrderDetail.Model.Step == 4 && $rootScope.OrderDetail.BurialPackageName == $rootScope.TextContants.BurialPackage.DirectBurial) {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 2;
                    } else if ($rootScope.OrderDetail.Model.Step == 12) {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 2;
                    }
                    else {
                        $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    $rootScope.Button.IsPrevious = true;
                    $rootScope.Button.GoToPage();
                }
            }
        },
        PreviousRootStep: function () {
            if ($rootScope.OrderDetail.Model.Step >= 13) //  11 is root step 4
                $rootScope.OrderDetail.Model.Step = 8;
            else if ($rootScope.OrderDetail.Model.Step >= 8) //  6 is root step 3
                $rootScope.OrderDetail.Model.Step = 2;
            else if ($rootScope.OrderDetail.Model.Step >= 2) //  2 is root step 2
                $rootScope.OrderDetail.Model.Step = 1; //  0 is root step 1
            else if ($rootScope.OrderDetail.Model.SectionStep<1) {
                $rootScope.OrderDetail.Model.Step = 0;
            }

            $rootScope.Button.IsPrevious = true;
            $rootScope.Button.GoToPage();
        },
        SelectStep: function(step) {
            if (!$rootScope.OrderDetail.CheckSpecializedCareValid() && step > 2) {
                return;
            }
            $rootScope.OrderDetail.Model.Step = step;
            $rootScope.Button.IsPrevious = true;
            $rootScope.Button.GoToPage();
        },
        AllowChangeServiceType : function() {
            if ($rootScope.OrderDetail.Model.SectionStep >= 2) {
                return false;
            } else {
                return true;
            }
        },
        AllowOnClickStep: function (step) { // allow on click in step complete !=12 (step 12 is user payment success)
            if ($rootScope.OrderDetail.Model.SectionStep == 14) {
                if ($rootScope.OrderDetail.Model.Step != 14) $rootScope.Button.SelectStep($rootScope.OrderDetail.Model.SectionStep);
            }else if (step==0 && $rootScope.Button.AllowChangeServiceType()) {
                $rootScope.Button.SelectStep(step);
            }
            else if (step!=0 && $rootScope.OrderDetail.Model.SectionStep >= step)
                $rootScope.Button.SelectStep(step);
        },
        AuthenticationStep: function() { // check valid step when enter link not valid.
            if ($rootScope.Button.IsNext == true) {
                $rootScope.Button.IsNext = false;
                return true;
            }

            return $q(function() {
                if ($rootScope.OrderDetail.Model.SectionStep == 14) { // when payment success user not select other step 12  (only select page docusign)
                    $rootScope.Button.SelectStep($rootScope.OrderDetail.Model.SectionStep);
                    if (!$scope.$$phase) $scope.$apply();
                } else {
                    setTimeout(function() {
                        if ($rootScope.OrderDetail.Model.SectionStep < $rootScope.OrderDetail.Model.Step)
                            $rootScope.Button.SelectStep($rootScope.OrderDetail.Model.SectionStep);
                        if (!$scope.$$phase) $scope.$apply();
                    }, 1200);
                }
            });
        },
      
        GoToPage: function() {
            if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation || $rootScope.OrderDetail.Model.ServiceType == "") {
                switch ($rootScope.OrderDetail.Model.Step) {
                case 0:
                    $location.path("/StartOverview");
                    break;
                case 1:
                    $location.path("/StartTerms");
                    break;
                case 2:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/ServiceProvide");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep1();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/ServiceProvide");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 3:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/MemorialPackageItems");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep2();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/MemorialPackageItems");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 4:
                    if ($rootScope.Button.IsPrevious) {
                        $location.path("/URN");
                    } else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep3();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid) {
                            $location.path("/URN");
                        } else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 5:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/PickupRemains");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep4();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/PickupRemains");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                //case 6:
                //    if ($rootScope.Button.IsPrevious)
                //        $location.path("/PickupRemains");
                //    else {
                //        $rootScope.OrderDetail.FuntionSave.SaveStep5();
                //        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                //            $location.path("/PickupRemains");
                //        else
                //            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                //    }
                //    break;
                case 8:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/BiographicalData");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep5();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/BiographicalData");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 9:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/DecedantData");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep8();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/DecedantData");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 10:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/SurvivorData");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep9();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/SurvivorData");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 11:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/MemorialServiceData");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep10();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/MemorialServiceData");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 12:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/ThankYou");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep11();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/ThankYou");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 13:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/Checkout");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep12();
                        $location.path("/Checkout"); 
                    }
                    break;
                case 14:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/FinalSteps");
                    else {
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/FinalSteps");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                default:
                }
            } else if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Burial) {
                switch ($rootScope.OrderDetail.Model.Step) {
                case 0:
                    $location.path("/StartOverview");
                    break;
                case 1:
                    $location.path("/StartTerms");
                    break;
               case 2:
                    if ($rootScope.Button.IsPrevious)
                            $location.path("/BurialPackage");
                    else
                    {
                            $rootScope.OrderDetail.FuntionSave.SaveStep1();
                            if ($rootScope.OrderDetail.FuntionSave.IsValid)
                                $location.path("/BurialPackage");
                            else
                                $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                     }
                     break;
                case 3:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/CasketPreference");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep2();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/CasketPreference");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
              case 4:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/VaultSelection");
                    else {
                        if ($rootScope.OrderDetail.BurialPackageName == $rootScope.TextContants.BurialPackage.DirectBurial) {
                            $rootScope.OrderDetail.FuntionSave.SaveStep2();
                        } else {
                            $rootScope.OrderDetail.FuntionSave.SaveStep3();
                        }
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/VaultSelection");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
               case 5:
                       if ($rootScope.Button.IsPrevious)
                            $location.path("/BurialServiceProvided");
                       else {
                            $rootScope.OrderDetail.FuntionSave.SaveStep4();
                            if ($rootScope.OrderDetail.FuntionSave.IsValid)
                                $location.path("/BurialServiceProvided");
                            else
                                $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                        }
                        break;
                case 6:
                    if ($rootScope.Button.IsPrevious) {
                        $location.path("/BurialCemeterySetup");
                    } else {
                        if ($rootScope.OrderDetail.BurialPackageName == $rootScope.TextContants.BurialPackage.Manual) {
                            $rootScope.OrderDetail.FuntionSave.SaveStep5();
                        } else {
                            $rootScope.OrderDetail.FuntionSave.SaveStep4();
                        }
                        if ($rootScope.OrderDetail.FuntionSave.IsValid) {
                            $location.path("/BurialCemeterySetup");
                        } else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 7:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/BurialServiceDetail");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep6();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/BurialServiceDetail");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 8:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/BiographicalData");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep7();
                        //if ($rootScope.OrderDetail.BurialPackageName == $rootScope.TextContants.BurialPackage.Manual) {
                        //    $rootScope.OrderDetail.FuntionSave.SaveStep7();
                        //} else {
                        //    $rootScope.OrderDetail.FuntionSave.SaveStep6();
                        //}
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/BiographicalData");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 9:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/DecedantData");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep8();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/DecedantData");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 10:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/SurvivorData");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep9();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/SurvivorData");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 12:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/ThankYou");
                    else {
                        //$rootScope.OrderDetail.FuntionSave.SaveStep11();
                        $rootScope.OrderDetail.FuntionSave.SaveStep10();
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/ThankYou");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                case 13:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/Checkout");
                    else {
                        $rootScope.OrderDetail.FuntionSave.SaveStep12();
                        $location.path("/Checkout");   
                    }
                    break;
                case 14:
                    if ($rootScope.Button.IsPrevious)
                        $location.path("/FinalSteps");
                    else {
                        if ($rootScope.OrderDetail.FuntionSave.IsValid)
                            $location.path("/FinalSteps");
                        else
                            $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.Step - 1;
                    }
                    break;
                default:
                }
            }

            if ($rootScope.OrderDetail.Model.Step > $rootScope.OrderDetail.Model.SectionStep) {
                $rootScope.OrderDetail.Model.Step = $rootScope.OrderDetail.Model.SectionStep;
            }

            if ($rootScope.OrderDetail.FuntionSave.IsValid) {
                $window.scrollTo(0, 0);
            }
           
            //
        }
    }


    $rootScope.MenuConfig =
    {
        DynamicMenu: {
            Cremation: {
                BigStepClass: {
                    ServicesProducts: function () {
                        if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                            return $rootScope.OrderDetail.Model.Step >= 2 && $rootScope.OrderDetail.Model.Step <= 7 ? 'active' : '';
                        } else {
                            return $rootScope.OrderDetail.Model.Step >= 3 && $rootScope.OrderDetail.Model.Step <= 7 ? 'active' : '';
                        }
                       
                    },
                    EnterInformation:function() {
                        return $rootScope.OrderDetail.Model.Step >= 8 && $rootScope.OrderDetail.Model.Step <= 12 ? 'active' : '';
                    },
                    Checkout:function() {
                        return $rootScope.OrderDetail.Model.Step >= 13 && $rootScope.OrderDetail.Model.Step <= 15 ? 'active' : '';
                    } 
                },
                BigStepClick: {
                    ServicesProducts: function () {
                        if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                            return $rootScope.Button.AllowOnClickStep(2);
                        } else {
                            if ($rootScope.MenuConfig.DynamicMenu.Cremation.SubSep.IsShowCaskets())
                                return $rootScope.Button.AllowOnClickStep(3);
                            return $rootScope.Button.AllowOnClickStep(4);
                        }
                        
                    },
                    EnterInformation: function() {
                         return $rootScope.Button.AllowOnClickStep(8);
                    },
                    Checkout: function () {
                        return $rootScope.Button.AllowOnClickStep(13);
                    }
                },
                SubSep : {
                    IsHasClass_s12: function () {
                        if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                            return ($rootScope.OrderDetail.Model.Step == 0 || $rootScope.OrderDetail.Model.Step == 12 || $rootScope.OrderDetail.Model.Step == 14 || $rootScope.OrderDetail.Model.Step == 15) ? 's12' : 'm9';
                        } else {
                            return ($rootScope.OrderDetail.Model.Step == 0 || $rootScope.OrderDetail.Model.Step == 2 || $rootScope.OrderDetail.Model.Step == 12 || $rootScope.OrderDetail.Model.Step == 14 || $rootScope.OrderDetail.Model.Step == 15) ? 's12' : 'm9';
                        }
                    },
                    IsShow: function () {
                        if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                            return $rootScope.OrderDetail.Model.Step >= 0 && $rootScope.OrderDetail.Model.Step != 12 && $rootScope.OrderDetail.Model.Step != 14 || $rootScope.OrderDetail.Model.Step == 15;
                        } else {
                            return $rootScope.OrderDetail.Model.Step >= 0 && $rootScope.OrderDetail.Model.Step !=2 && $rootScope.OrderDetail.Model.Step != 12 && $rootScope.OrderDetail.Model.Step != 14 || $rootScope.OrderDetail.Model.Step == 15;
                        }
                    },
                    IsShowOverView : function() {
                        return $rootScope.OrderDetail.Model.Step == 0 || $rootScope.OrderDetail.Model.Step == 1;
                    },
                    IsShowServicesProducts: function () {
                        if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                            return $rootScope.OrderDetail.Model.Step >= 2 && $rootScope.OrderDetail.Model.Step <= 6 && $rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation;
                        } else {
                            return $rootScope.OrderDetail.Model.Step >= 3 && $rootScope.OrderDetail.Model.Step <= 6 && $rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation;
                        }
                    },
                    IsShowEnterInformation : function() {
                        return $rootScope.OrderDetail.Model.Step >= 8 && $rootScope.OrderDetail.Model.Step <= 11;
                    },
                    IsShowBurialMemorialProduct: function () {
                        //return $rootScope.OrderDetail.BurialPackageName != $rootScope.TextContants.BurialPackage.Rosewood;
                       return true;
                    },
                    IsShowServiceProvided: function () {
                        return $rootScope.OrderDetail.BurialPackageName == $rootScope.TextContants.BurialPackage.Manual;
                        
                    },
                    IsShowPublicServiceDetails: function () {
                        //return $rootScope.OrderDetail.BurialPackageName != $rootScope.TextContants.BurialPackage.Manual;
                        return true;
                    },
                    IsShowCaskets : function() {
                        return $rootScope.OrderDetail.BurialPackageName != $rootScope.TextContants.BurialPackage.DirectBurial;
                    },
                    IsShowMemorialServiceData : function() {
                        return $rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation;
                    }
                },
                PriceMenu : {
                    IsShow: function () {
                        if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                            return ($rootScope.OrderDetail.Model.Step > 1
                                    && $rootScope.OrderDetail.Model.Step != 12
                                    && $rootScope.OrderDetail.Model.Step != 14
                                    && $rootScope.OrderDetail.Model.Step != 15)
                                || ($rootScope.OrderDetail.Model.Step == 1 && $rootScope.OrderDetail.Model.SectionStep > 1);
                        } else {
                            return ($rootScope.OrderDetail.Model.Step > 1
                                   && $rootScope.OrderDetail.Model.Step != 2
                                   && $rootScope.OrderDetail.Model.Step != 12
                                   && $rootScope.OrderDetail.Model.Step != 14
                                   && $rootScope.OrderDetail.Model.Step != 15)
                               || ($rootScope.OrderDetail.Model.Step == 1 && $rootScope.OrderDetail.Model.SectionStep > 1);
                        }
                    },
                    IsShowListDetails : function() {
                        return $rootScope.OrderDetail.Model.Step > 0;
                    },
                    Details: {
                        CheckShowBasePrice: function () {
                            if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                                return true;
                            } else {
                                var packageitem = $.grep($rootScope.OrderDetail.SelectionData.BurialPackages.List, function(e) {
                                    return e.Id == $rootScope.OrderDetail.Model.BurialPackageId;
                                });
                                if (packageitem.length != 0 &&  packageitem[0].Name == $rootScope.TextContants.BurialPackage.Manual) {
                                    return true;
                                }
                            }
                            return false;
                        },
                        
                        CheckShowCityCremation : function() {
                            return $rootScope.OrderDetail.Model.CityCremationName != '' && $rootScope.OrderDetail.DetailPrice.CityCremationPrice != 0;
                        },
                        CheckShowLocation: function () {
                            return $rootScope.OrderDetail.SelectionData.LocationCremation.Choose != '' && $rootScope.OrderDetail.SelectionData.LocationCremation.Choose != undefined && $rootScope.OrderDetail.SelectionData.LocationCremation.Choose.Id != 0 && $rootScope.OrderDetail.SelectionData.LocationCremation.Choose.Price != 0;
                        },
                        CheckShowQtyCertified: function () {
                            if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Burial)  {
                                var listSelected = $.grep($rootScope.OrderDetail.SelectionData.BurialServices.List, function(e) {
                                    return e.IsCheck == true;
                                });
                                if (listSelected.length == 0)
                                    return false;
                            }
                            return $rootScope.OrderDetail.SelectionData.QtyCertified.Choose != '' && $rootScope.OrderDetail.SelectionData.QtyCertified.Choose != undefined && $rootScope.OrderDetail.SelectionData.QtyCertified.Choose.Id != 0;
                        },
                        CheckShowMemorialService : function() {
                            return $rootScope.OrderDetail.SelectionData.MemorialService.Choose != '' && $rootScope.OrderDetail.SelectionData.MemorialService.Choose != undefined && $rootScope.OrderDetail.SelectionData.MemorialService.Choose.Id != 0 && $rootScope.OrderDetail.SelectionData.MemorialService.Choose.Price != 0;
                        },
                        CheckShowSpecialized : function() {
                            return $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose != '' && $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose != undefined && $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose.Id != 0 && $rootScope.OrderDetail.SelectionData.SpecializedCare.Choose.Price != 0;
                        },
                        CheckShowURN : function() {
                            return $rootScope.OrderDetail.Model.URNSelectionId != '' && $rootScope.OrderDetail.Model.URNSelectionId != undefined && $rootScope.OrderDetail.URNSelectionPrice != 0;
                        },
                        CheckShowCasketOfTypeBurialService: function () {   // is show if burial package is Manual
                            if ($rootScope.OrderDetail.Model.ServiceType == $rootScope.TextContants.ServiceType.Cremation) {
                                return true;
                            } else {
                                var packageitem = $.grep($rootScope.OrderDetail.SelectionData.BurialPackages.List, function (e) {
                                    return e.Id == $rootScope.OrderDetail.Model.BurialPackageId;
                                });
                                if (packageitem.length != 0 && packageitem[0].Name == $rootScope.TextContants.BurialPackage.Manual) {
                                    return true;
                                }
                            }
                            return false;
                        },
                        CheckShowCasket: function () {                    // is show when select item
                            if (!$rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowCasketOfTypeBurialService()) {
                                return false;
                            }
                            return $rootScope.OrderDetail.Model.CasketPreferenceId != '' && $rootScope.OrderDetail.Model.CasketPreferenceId != undefined && $rootScope.OrderDetail.CasketPreferencePrice != 0;
                        },
                        CheckShowVault : function() {
                            //return $rootScope.OrderDetail.Model.VaultSelectionId != '' && $rootScope.OrderDetail.Model.VaultSelectionId != undefined && $rootScope.OrderDetail.VaultSelectionPrice != 0;
                            return $rootScope.OrderDetail.SelectionData.VaultSelection.Choose != '' && $rootScope.OrderDetail.SelectionData.VaultSelection.Choose != undefined && $rootScope.OrderDetail.SelectionData.VaultSelection.Choose.Price != 0;
                        },
                        CheckShowBurialPackage : function() {
                            return $rootScope.OrderDetail.Model.BurialPackageId != '' && $rootScope.OrderDetail.Model.BurialPackageId != undefined && $rootScope.OrderDetail.BurialPackagePrice != 0;
                        },
                        CheckShowPickupRemain : function() {
                            return $rootScope.OrderDetail.SelectionData.PickupRemain.Choose != '' && $rootScope.OrderDetail.SelectionData.PickupRemain.Choose != undefined && $rootScope.OrderDetail.SelectionData.PickupRemain.Choose.Price != 0;
                        },
                        CheckShowCemeterySetup : function() {
                            return $rootScope.OrderDetail.Model.Burial_IsCemetery == true && $rootScope.OrderDetail.Model.CemeterySetupPrice != 0;
                        },
                        CheckShowBurialLocation: function() {
                            return $rootScope.OrderDetail.Model.Burial_LocationCityState != '' && $rootScope.OrderDetail.DetailPrice.BurialLocationPrice != 0;
                        }
                    }
                }
            },
            Burial: {

            }
        }
    } 



}]);