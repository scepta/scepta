///
/// Copyright 2015 Red Hat, Inc. and/or its affiliates
/// and other contributors as indicated by the @author tags.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///    http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

/// <reference path="sceptaDesignPlugin.ts"/>
module SceptaDesign {

  export var OrganizationsController = _module.controller("SceptaDesign.OrganizationsController", ['$scope', '$http', ($scope, $http) => {

    $http.get('/scepta-server/design').success(function(data) {
      $scope.organizations = data;
    });

    $scope.addOrganization = function() {
      $http.post('/scepta-server/design/', $scope.newOrganization)
        .success(function(data, status, headers, config) {
        $http.get('/scepta-server/design').success(function(data) {
          $scope.organizations = data;
          $scope.newOrganization = new Object();
        });
      });
    };

    $scope.removeOrganization = function(event) {
      var c = confirm("Are you sure?");
      if (c == true) {
        var orgName = event.currentTarget.attributes.getNamedItem('organization').value;
        $http.delete('/scepta-server/design/'+orgName)
          .success(function(data, status, headers, config) {
          $http.get('/scepta-server/design').success(function(data) {
            $scope.organizations = data;
          });
        });
      } 
    };

    $scope.nameOrderProp = 'name';

  }]);

}
