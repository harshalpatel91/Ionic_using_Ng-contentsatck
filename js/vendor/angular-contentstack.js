/**
 * @license Angular-Contentstack v0.0.1
 * (c) 2015 raw engineering, Inc. www.raweng.com
 * License: MIT
 */
(function(window, angular) {
    'use strict';
    /**
     * @ngdoc module
     * @name contentstack
     * @description
     *
     * # contentstack
     *
     * The `contentstack` module provides wrapper for contentstack javascript sdk
     */
    angular.module('contentstack', [])
        /**
         * @ngdoc provider
         * @name siteProvider
         *
         * @description
         * Provides Built.io Contentstack javascript sdk {site} instance
         *
         * @example
         *
         * ```js
         * angular.module('app', ['contentstack'])
         *
         *   .config(['siteProvider', function(siteProvider) {
         *      siteProvider.initialize({
         *                'site_api_key': '<your site_api_key>',
         *                'access_token': '<your access_token>',
         *                'environment': 'development'
         *       });
         *   }])
         *
         *   .controller('entryController', ['$scope','site', function($scope, site) {
         *     var entry = site.Form('my_form').Query();
         *     entry.find().then(function(data){
         *       // set entry data to view in entry
         *       $scope.entry = data.entry;
         *       $scope.$apply();
         *     })
         *   }]);
         * ```
         */
        .provider('stack', function() {
            var stackProvider;
            this.initialize = function(secret) {
                stackProvider = Contentstack.Stack(secret);
            };
            this.$get = function() {
                return stackProvider;
            }
        })
        /**
         * @ngdoc directive
         * @name csEntry
         *
         * @description
         * Provides tag for accessing the contentstack api
         *
         * @example
         *
         * ```html
         *  <cs-entry form="home_page"
         *     locale="en-us"
         *     as="entries"
         *     include_count="true">
         *      {{entries | json}}
         *  </cs-entry>
         *
         * ```
         */
        .directive('csEntry', ['$compile', '$injector', function($compile, $injector) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    contentType: '@',
                    uid: '@?',
                    language: '@?',
                    all: '@?',
                    lessThan :'@?',
                    lessThanOrEqualTo : '@?',
                    greaterThan : '@?',
                    greaterThanOrEqualTo : '@?',
                    as: '@?',
                    regex: '@?',
                    beforeUid :'@?',
                    afterUid : '@?',
                    only: '@?',
                    exists: '@?',
                    except: '@?',
                    where: '@?',
                    notEqualTo: '@?',
                    containedIn: '@?',
                    notContainedIn: '@?',
                    includeReference: '@?',
                    includeSchema: '@?',
                    includeOwner: '@?',
                    includeCount: '@?',
                    ascending: '@?',
                    descending: '@?',
                    skip: '@?',
                    limit: '@?',
                    search: '@?',
                    query: '@?',
                    includeReference : '@?',
                    setCachePolicy: '@?',
                    loadMore: '@?'
                },
                link: function(scope, element, attrs, ctrl, transcludeFn) {
                  console.log("attrs link",attrs);
                    transcludeFn(scope, function(clone, innerScope) {
                        var compiled = $compile(clone)(scope);
                        element.append(compiled);
                    });
                    var Stack = $injector.get('stack'),
                        ContentType = Stack.ContentType(attrs.contentType),
                        entry = ContentType.Query(),
                        as;
                        console.log("Stack directive",Stack);
                    scope.isLoading = true;

                    // function getQuery(attr){
                    //   function setCachePolicy(){
                    //     var number = parseInt(attrs[attr]);
                    //     console.log("number",number);
                    //     entry.setCachePolicy(number);
                    //   }
                    //   var query = {
                    //     'setCachePolicy': setCachePolicy,
                    //   }
                    //   return query[attr]();
                    // }
                    // // for (var queyAttr in attrs ){
                    //   getQuery('setCachePolicy');
                    // //}
                    // if(attrs.setCachePolicy){
                    //
                    //     getQuery('setCachePolicy',attrs.setCachePolicy);
                    // }

                    if(attrs.setCachePolicy){
                      //var CachePolicy ="Contentstack.CachePolicy."+attrs.setCachePolicy;
                      console.log('attrs.setCachePolicy',attrs.setCachePolicy);
                      var number = parseInt(attrs.setCachePolicy);
                      entry.setCachePolicy(number);
                    }
                    if(attrs.lessThan){
                      var lessThan = attrs.lessThan.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.lessThan(lessThan[0],lessThan[1]);
                    }
                    if(attrs.lessThanOrEqualTo){
                      var lessThanOrEqualTo = attrs.lessThanOrEqualTo.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.lessThanOrEqualTo(lessThanOrEqualTo[0],lessThanOrEqualTo[1]);
                    }
                    if(attrs.greaterThan){
                      var greaterThan = attrs.greaterThan.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.greaterThan(greaterThan[0],greaterThan[1]);
                    }
                    if(attrs.greaterThanOrEqualTo){
                      var greaterThanOrEqualTo = attrs.greaterThanOrEqualTo.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.greaterThanOrEqualTo(greaterThanOrEqualTo[0],greaterThanOrEqualTo[1]);
                    }
                    if (attrs.language) {
                        entry.language(attrs.language);
                    }
                    if (attrs.uid) {
                        entry = ContentType.Entry(attrs.uid);
                    }
                    if (attrs.only) {
                        var only_query = attrs.only;
                        console.log("only_query",only_query);
                        var fields = only_query.substring(only_query.lastIndexOf("[")+1,only_query.lastIndexOf("]"));
                        fields = fields.split(',').map(function(v) {
                            return v.trim();
                        });
                        entry.only(fields);
                    }
                    if (attrs.except) {
                      var except_query = attrs.except;
                      console.log("only_query",only_query);
                      var fields = except_query.substring(except_query.lastIndexOf("[")+1,except_query.lastIndexOf("]"));
                      fields = fields.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.except(fields);
                    }
                    if (attrs.includeCount) {
                        entry.includeCount();
                    }
                    if (attrs.includeReference) {
                        entry.includeReference(attrs.includeReference);
                    }
                    if(attrs.beforeUid){
                      entry.beforeUid(attrs.beforeUid);
                    }
                    if(attrs.afterUid){
                      entry.afterUid(attrs.afterUid);
                    }
                    if (attrs.includeSchema) {
                        entry.includeSchema();
                    }
                    if (attrs.includeOwner) {
                        entry.includeOwner();
                    }
                    if (attrs.ascending && !scope.single) {
                        entry.ascending(attrs.ascending);
                    }
                    if (attrs.descending && !scope.single) {
                        entry.descending(attrs.descending);
                    }
                    if (attrs.limit && !scope.single) {
                        entry.limit(Number(attrs.limit));
                    }
                    if (attrs.hasOwnProperty('skip') && !scope.single) {
                        entry.skip(Number(attrs.skip));
                    }
                    if(attrs.hasOwnProperty('includeReference') && !scope.single){
                      var includeReference = attrs.includeReference.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.includeReference(includeReference);
                    }
                    if(attrs.hasOwnProperty('exists')){
                      entry.exists(attrs.exists);
                    }
                    if(attrs.hasOwnProperty('where')){
                      var where = attrs.where.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.where(where[0],where[1]);
                    }
                    if(attrs.hasOwnProperty('notEqualTo')){
                      var notEqualTo = attrs.notEqualTo.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.notEqualTo(notEqualTo[0],notEqualTo[1]);
                    }
                    if(attrs.hasOwnProperty('containedIn')){
                      var containedIn = attrs.containedIn;
                      var In = containedIn.substring(containedIn.lastIndexOf("[")+1,containedIn.lastIndexOf("]"));
                      containedIn = attrs.containedIn.split(',').map(function(v) {
                          return v.trim();
                      });
                      In = In.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.containedIn(containedIn[0],In);
                    }
                    if(attrs.hasOwnProperty('notContainedIn')){
                      var notContainedIn = attrs.notContainedIn;
                      var notIn = notContainedIn.substring(notContainedIn.lastIndexOf("[")+1,notContainedIn.lastIndexOf("]"));
                      notContainedIn = attrs.notContainedIn.split(',').map(function(v) {
                          return v.trim();
                      });
                      notIn = notIn.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.notContainedIn(notContainedIn[0],notIn);
                    }
                    if(attrs.hasOwnProperty('regex')){
                      var regex = attrs.regex.split(',').map(function(v) {
                          return v.trim();
                      });
                      entry.regex(regex[0],'/^'+regex[1]+'/');
                    }
                    if (attrs.search && !scope.single) {
                        entry.search(attrs.search);
                    }
                    if (attrs.query && !scope.single) {
                        var query;
                        try {
                            query = JSON.parse(attrs.query);
                        } catch (err) {
                            console.error(err);
                        }
                        entry.query(query);
                    }
                    if (scope.all || attrs.uid) {
                        as = attrs.as || 'entry';
                        if (attrs.uid) {
                            entry
                            .fetch()
                            .toJSON()
                            .spread(function success(entries, schema, count) {
                                 scope.isLoading = false;
                                 console.log("entries",entries);
                                 scope[as] = entries || {};
                                 if (attrs.includeSchema && data.schema) {
                                     scope['schema'] = schema;
                                 }
                                 if(attrs.includeCount){
                                   scope.count = count;
                                   console.log("scope.count",scope.count);
                                 }
                                 scope.$apply();
                             }, function error(err) {
                                console.error("error",err);
                             });
                        } else {
                            entry
                            .toJSON()
                            .find()
                            .spread(function success(entries, schema, count) {
                                console.log("entry", entries);
                                 scope.isLoading = false;
                                 scope[as] = entries || {};
                                 if(attrs.includeCount){
                                   scope.count = count;
                                   console.log("scope.count",scope.count);
                                 }
                                 if (attrs.includeSchema && entry[1]) {
                                     scope['schema'] = schema;
                                     console.log("scope.schema", scope.schema);
                                 }
                                 scope.$apply();
                             }, function error(err) {
                                console.error("error",err);
                             });
                        }
                    } else {
                        as = attrs.as || 'entries';
                        entry
                        .toJSON()
                        .find()
                        .spread(function success(entries, schema, count) {
                            console.log("entry whole", entries);
                             scope.isLoading = false;
                             scope[as] = entries || {};
                             if(attrs.includeCount){
                               scope.count = count;
                               console.log("scope.count",scope.count);
                             }
                             if (attrs.includeSchema) {
                                 scope['schema'] = schema;
                                 console.log("scope.schema", scope.schema);
                             }
                             scope.$apply();
                         }, function error(err) {
                            console.error("error",err);
                         });
                    }
                }
            };
        }])
        /**
         * @ngdoc directive
         * @name csPagination
         *
         * @description
         * Provides pagination for cs-entry
         *
         * @example
         *
         * ```html
         *  <cs-entry form="home_page"
         *     as="entries"
         *     include_count="true">
         *        <cs-pagination load-more="true">
         *        </cs-pagination>
         *      {{entries | json}}
         *  </cs-entry>
         *
         * ```
         */
        .directive('csPagination', ['$compile', '$injector', '$rootScope', function($compile, $injector, $rootScope) {
            return {
                restrict: 'E',
                replace: true,
                require: '?^csEntry',
                scope: {
                    loadMore: '@?',
                    numberOfPages: '@?',
                    type: '@?'
                },
                template: function(iElem, iAttrs) {
                    // This is for adding default style
                    var css = '.cs-load-more { padding:20px;margin-left:46%; }' +
                        '.cs-pagination { padding:20px;display:inline-block; }' +
                        '.cs-pagination .pager-list .active { background-color: #006dcc;color: #fff; }' +
                        '.cs-pagination-first-last-index,.first-page,.prev-page,.next-page,.last-page { float:left;padding:5px 8px; }' +
                        '.page-change-input { width:60px;float:left;padding:5px 8px; }' +
                        '.pager-list { display:inline-block;list-style:none;float:left;padding:0px; }' +
                        '.pager-list-item { float:left;border:1px solid #ccc;padding:6px 12px;cursor:pointer; }',
                        head = document.head || document.getElementsByTagName('head')[0],
                        style = document.createElement('style');
                    if (style.styleSheet) {
                        style.styleSheet.cssText = css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                    }
                    head.appendChild(style);

                    if (iAttrs.loadMore) {
                        return '<div class="cs-load-more"><button type="button" class="btn-load-more" ng-click="loadmore()">{{loadingText}}</button></div>';
                    } else if (iAttrs.type === "input") {
                        return '<div class="cs-pagination">' +
                            '<div class="cs-pagination-first-last-index"><span>{{firstIndex}} - {{lastIndex}} of </span><span>{{totalCount}}</span>&nbsp;&nbsp;</div>' +
                            '<button type="button" ng-click="firstPage()" class="first-page" ng-disabled="pageNumber == 1"><<</button>' +
                            '<button type="button" ng-click="prevPage()" class="prev-page" ng-disabled="pageNumber == 1"><</button>' +
                            '<input type="text" ng-model="pageNumber" ng-keypress="pageChange()" class="page-change-input">' +
                            '<button type="button" ng-click="nextPage()" class="next-page" ng-disabled="pageNumber >= lastPageNumber">></button>' +
                            '<button type="button" ng-click="lastPage()" class="last-page" ng-disabled="pageNumber >= lastPageNumber">>></button>' +
                            '</div>';
                    } else {
                        return '<div class="cs-pagination">' +
                            '<div class="cs-pagination-first-last-index"><span>{{firstIndex}} - {{lastIndex}} of </span><span>{{totalCount}}</span>&nbsp;&nbsp;</div>' +
                            '<button type="button" ng-click="firstPageCounter()" class="first-page" ng-disabled="pageNumber == 1"><<</button>' +
                            '<button type="button" ng-click="prevPageCounter()" class="prev-page" ng-disabled="pageNumber == 1"><</button>' +
                            '<ul class="pager-list">' +
                            '<li ng-class="{active: i == pageNumber}" ng-repeat="i in pageNos track by $index" ng-click="pageListChange(i)" class="pager-list-item"><span>{{i}}</span></li>' +
                            '</ul>' +
                            '<button type="button" ng-click="nextPageCounter()" class="next-page" ng-disabled="isNextPageButtonDisable">></button>' +
                            '<button type="button" ng-click="lastPageCounter()" class="last-page" ng-disabled="isLastPageButtonDisable">>></button>' +
                            '</div>';
                    }
                },
                link: function(scope, element, attrs) {
                    var Stack = $injector.get('stack'),
                        parentScope = scope.$parent,
                        ContentType = Stack.ContentType(parentScope.contentType),
                        entry = ContentType.Query(),
                        as = parentScope.as,
                        loadString = 'Load More';
                    scope.loadingText = loadString;
                    scope.pageNos = [];
                    scope.numberOfPages = scope.numberOfPages || 5;

                    scope.pageListChange = function(pageNo) {
                        scope.pageNumber = pageNo;
                        scope.isFetch = true;
                    }
                    if (!attrs.loadMore) {
                        scope.pageNumber = 1;
                        scope.isFetch = false;
                    }
                    scope.loadmore = function() {
                        scope.pageNumber = scope.pageNumber || 1;
                        scope.skip = scope.pageNumber * Number(parentScope.limit);
                        scope.pageNumber++;
                        scope.isFetch = true;
                        scope.loadingText = 'Loading...';
                    }
                    scope.pageChange = function() {
                        scope.isFetch = true;
                    }
                    scope.firstPage = function() {
                        scope.pageNumber = 1;
                        scope.isFetch = true;
                    }
                    scope.prevPage = function() {
                        var pageNumber = Number(scope.pageNumber);
                        if (scope.pageNumber > 1) {
                            scope.pageNumber = pageNumber - 1;
                            scope.isFetch = true;
                        }
                    }
                    scope.nextPage = function() {
                        scope.pageNumber = Number(scope.pageNumber) + 1;
                        scope.isFetch = true;
                    }
                    scope.lastPage = function() {
                        var lastPage = Number(parentScope.totalCount) / Number(parentScope.limit);
                        scope.pageNumber = Math.floor(lastPage) + 1;
                        scope.isFetch = true;
                    }
                    scope.firstPageCounter = function() {
                        var pageLimit = Number(parentScope.limit),
                            totalCount = Number(parentScope.totalCount),
                            lastPage = Math.floor(totalCount / pageLimit) + 1,
                            noOfPages = scope.numberOfPages;

                        if (lastPage > noOfPages) {
                            scope.pageNos = []
                            for (var i = 1; i <= Number(scope.numberOfPages); i++) {
                                scope.pageNos.push(i);
                            }
                        }
                        scope.pageNumber = 1;
                        scope.isFetch = true;
                    }
                    scope.prevPageCounter = function() {
                        var firstIndex = scope.pageNos[0],
                            pageNo = scope.pageNumber;

                        if (pageNo % scope.numberOfPages === 1) {
                            scope.pageNos = [];
                            for (var i = 1; i <= Number(scope.numberOfPages); i++) {
                                if (pageNo - i >= 1) {
                                    scope.pageNos.unshift(pageNo - i);
                                }
                            }
                        }
                        scope.pageNumber = pageNo !== 1 ? pageNo - 1 : 1;
                        scope.isFetch = true;
                    }
                    scope.nextPageCounter = function() {
                        var lastIndex = scope.pageNos[scope.pageNos.length - 1],
                            lastPage = Math.floor(Number(parentScope.totalCount) / Number(parentScope.limit)) + 1,
                            pageNo = scope.pageNumber;
                        if (pageNo % scope.numberOfPages === 0) {
                            scope.pageNos = [];
                            for (var i = 1; i <= Number(scope.numberOfPages); i++) {
                                if (lastPage >= pageNo + i) {
                                    scope.pageNos.push(pageNo + i);
                                }
                            }
                        }
                        scope.pageNumber = pageNo + 1 > lastPage ? lastPage : pageNo + 1;
                        scope.isFetch = true;
                    }
                    scope.lastPageCounter = function() {
                        var pageLimit = Number(parentScope.limit),
                            totalCount = Number(parentScope.totalCount),
                            lastPage = Math.floor(totalCount / pageLimit) + 1,
                            noOfPages = scope.numberOfPages,
                            lastPagesIndex = [],
                            leftPages = lastPage % noOfPages;

                        if (lastPage > noOfPages) {
                            for (var i = 1; i <= leftPages; i++) {
                                lastPagesIndex.unshift(lastPage);
                                lastPage--;
                            }
                            scope.pageNos = lastPagesIndex;
                        }
                        scope.pageNumber = Math.floor(totalCount / pageLimit) + 1;
                        scope.isFetch = true;
                    }
                    scope.isLastPageButtonDisable = false;
                    scope.isNextPageButtonDisable = false;
                    // this watch for checking total count that is set in cs-entry we got data from server
                    scope.$watch('$parent.totalCount', function(newVal, oldValue) {
                        if (newVal) {
                            var pageLimit = Number(parentScope.limit),
                                lastIndexVal = (scope.skip) + pageLimit,
                                totalPagesByLimit = Math.floor(newVal / pageLimit) + 1,
                                noOfPages;
                            if (pageLimit > newVal) {
                                noOfPages = 1;
                                scope.isNextPageButtonDisable = true;
                                scope.isLastPageButtonDisable = true;
                            } else if (totalPagesByLimit < scope.numberOfPages) {
                                noOfPages = totalPagesByLimit;
                                scope.isLastPageButtonDisable = true;
                            } else {
                                noOfPages = scope.numberOfPages;
                            }
                            for (var i = 1; i <= noOfPages; i++) {
                                scope.pageNos.push(i);
                            }
                            scope.lastIndex = lastIndexVal > parentScope.totalCount ? parentScope.totalCount : lastIndexVal;
                        }
                    });
                    scope.$watch('pageNumber', function(newVal, oldValue) {
                        var pageNumber = Number(scope.pageNumber),
                            pageLimit = Number(parentScope.limit),
                            lastPage = Math.floor(Number(parentScope.totalCount) / pageLimit) + 1;

                        // set first and last index number
                        if (!attrs.loadMore && !isNaN(pageNumber) && pageNumber) {
                            scope.skip = (pageNumber - 1) * pageLimit;
                            scope.firstIndex = (scope.skip) + 1;
                            var lastIndexVal = (scope.skip) + pageLimit;
                            scope.lastIndex = lastIndexVal > parentScope.totalCount ? parentScope.totalCount : lastIndexVal;
                        }
                        // diseable next and last button when there is no page
                        if (lastPage === pageNumber) {
                            scope.isNextPageButtonDisable = true;
                            scope.isLastPageButtonDisable = true;
                        } else {
                            scope.isNextPageButtonDisable = false;
                            scope.isLastPageButtonDisable = false;
                        }
                        // set last page when got total count from cs-entry
                        if (parentScope.totalCount) {
                            scope.lastPageNumber = lastPage;
                        }
                        // fetch data from server
                        if (scope.pageNumber && scope.isFetch) {
                            entry.limit(pageLimit);
                            entry.skip(Number(scope.skip));
                            entry.find().then(function(data) {
                                if (data.entries) {
                                    if (attrs.loadMore) {
                                        var concatData = parentScope[as].concat(data.entries);
                                        parentScope[as] = concatData || [];
                                    } else {
                                        parentScope[as] = data.entries;
                                    }
                                    scope.loadingText = loadString;
                                    scope.$apply();
                                }

                            })
                        }
                    });
                }
            };
        }])
        /**
         * @ngdoc directive
         * @name csLoading
         *
         * @description
         * Provides loading template when its getting data from server
         *
         * @example
         *
         * ```html
         *  <cs-entry form="home_page"
         *     as="entries"
         *     include_count="true">
         *      <cs-loading ng-if="isLoading"></cs-loading>
         *      {{entries | json}}
         *  </cs-entry>
         *
         * ```
         */
        .directive('csLoading', ['$compile', '$injector', function($compile, $injector) {
            return {
                restrict: 'E',
                replace: true,
                require: '?^csEntry',
                template: function(iE, iA) {
                    return '<div style="position:fixed;width:100%;height:100%;background-color:#f5f5f5;z-index:99999"><h4 style="position:relative;left:45%;top:40%;">Loading...</h4></div>';
                }
            };
        }])
        .factory('contentStackServices',contentStackServices);
        contentStackServices.$inject = ['$injector'];
        function contentStackServices ($injector) {
          var Stack = $injector.get('stack');
          console.log("Stack services",Stack);
          return Stack;
        }


})(window, window.angular);
