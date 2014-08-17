// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ui.bootstrap']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

app.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.friends', {
        url: '/friends',
        views: {
            'tab-friends': {
                templateUrl: 'templates/tab-friends.html',
                controller: 'FriendsCtrl'
            }
        }
    })
        .state('tab.friend-detail', {
            url: '/friend/:friendId',
            views: {
                'tab-friends': {
                    templateUrl: 'templates/friend-detail.html',
                    controller: 'FriendDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/friends');

});

app.controller('barcodeCtrl', function($scope) {
    $scope.barcodeScanner = function() {
        cordova.plugins.barcodeScanner.scan(
            function(result) {
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
            },
            function(error) {
                alert("Scanning failed: " + error);
            }
        );
    }
});

app.controller('searchCtrl', function($scope) {
    $scope.show_text = false;
    $scope.title = '';
    $scope.test_array = [{}, {}];

    $scope.items = [{
        name: "item1",
        desc: "Item 1",
        subitems: [{
            name: "subitem1",
            desc: "Sub-Item 1"
        }, {
            name: "subitem2",
            desc: "Sub-Item 2"
        }, {
            name: "subitem2",
            desc: "Sub-Item 2"
        }]
    }, {
        name: "item2",
        desc: "Item 2",
        subitems: [{
            name: "subitem1",
            desc: "Sub-Item 1"
        }, {
            name: "subitem2",
            desc: "Sub-Item 2"
        }, {
            name: "subitem2",
            desc: "Sub-Item 2"
        }]
    }, {
        name: "item3",
        desc: "Item 3",
        subitems: [{
            name: "subitem1",
            desc: "Sub-Item 1"
        }, {
            name: "subitem2",
            desc: "Sub-Item 2"
        }, {
            name: "subitem2",
            desc: "Sub-Item 2"
        }]
    }];

    $scope.showProsCons = function($index) {
        // if ($scope.show_text == true && $scope.title == 'alternatives') {
        //     $scope.title = 'pAndC'
        // } else if ($scope.show_text == true && $scope.title == 'pAndC') {
        //     $scope.show_text = false;
        // } else {
        //     $scope.show_text = true;
        //     $scope.title = 'pAndC';
        // }

    };

    $scope.$parent.isopen = ($scope.$parent.default === $scope.item);

    $scope.$watch('isopen', function(newvalue, oldvalue, $scope) {
        $scope.$parent.isopen = newvalue;
    });

    $scope.showAlternatives = function() {
        if ($scope.show_text == true && $scope.title == 'pAndC') {
            $scope.title = 'alternatives';
        } else if ($scope.show_text == true && $scope.title == 'alternatives') {
            $scope.show_text = false;
        } else {
            $scope.show_text = true;
            $scope.title = 'alternatives';
        }
    };

    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
});