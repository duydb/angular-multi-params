/*
 * Thu Jul 14 2016 22:19:53
 * Author: Duy. Dinh Bao
 * github: https://github.com/duydb/
 * email: duydb.vn@gmail.com
 */

"use strict";
angular.module("MultiParamsService", [])
        .factory("$mParams", MultiParamsService);

/**
 * Factory for set & get Multi Param without reload action-view
 * But Action-view will reload when back or previous Action on browser
 * @param {Angular Object} $location
 * @param {Angular Object} $route
 * @param {Angular Object} $rootScope
 * @returns {Angular Factory}
 */
function MultiParamsService($location, $route, $rootScope, $routeParams) {
    /**
     * Get All params as Object
     * Param-name as property-name & param-value as property-value 
     * @returns {Object} Params Object
     */
    this.get = function () {
        return $location.search() || $routeParams || null;
    };
    /**
     * Get single params (default of ngRoute supported)
     *
     */
    this.getSingle = function () {
        return $routeParams || null;
    };

    /**
     * Set Params (Name of params is Object property, params-value is value of this property)
     * @param {Object} paramObj
     * @return {Object} null as error & Params Object as success
     */
    this.set = function (paramObj) {
        try {
            /**
             * Change property reloadOnSearch of current route to false (not re-load view & controller)
             */
            $route.current.$$route.reloadOnSearch = false;
            $location.search(paramObj);
        } catch (e) {
            console.log("[ERROR] MultiParamsService.set " + e);
            return null;
        }
        return paramObj;
    };
    this.redirect = function (url) {
        $location.url(url);
    };
    this.newTab = function (url) {
        window.open(url);
    };
    /**
     * Listen event $locationChangeSuccess to set property reloadOnSearch of current route to true
     */
    $rootScope.$on('$locationChangeSuccess', function () {
        try {
            $route.current.$$route.reloadOnSearch = true;
            var searchObj = $location.search();
            if (Object.keys(searchObj).length <= 0) {
                $route.reload();
            }
        } catch (ex) {
            console.log("[ERROR] MultiParamsService.onLocationChangeSuccess " + ex);
        }
    });
    return this;
}
MultiParamsService.$inject = ['$location', '$route', '$rootScope', '$routeParams'];
