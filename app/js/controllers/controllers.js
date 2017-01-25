angular.module('addressBook')
    .controller('ContactsController', ['$scope', '$location', 'contactsService', ContactsControllerFn]);


function ContactsControllerFn ($scope, $location, contactsService) {
  $scope.contacts = contactsService.getContacts();

  $scope.editContact = function (id) {
    $location.path('/edit-contact/' + id);
  };

  $scope.showDetails = function (id) {
    var el = angular.element(document.getElementById('#ct-details-' + id));
    el.toggleClass('details-hidden');
  };
}

angular.module('addressBook')
    .controller('ContactAddController', ['$scope', '$location', 'contactsService', ContactAddControllerFn]);

function ContactAddControllerFn ($scope, $location, contactsService) {
  $scope.insertContact = function () {
    contactsService.addContact($scope.contact);
    $scope.contact = contactsService.resetContact();
    $location.path('/contacts');
  };
}


angular.module('addressBook')
    .controller('ContactEditController', ['$scope', '$routeParams', '$location', 'contactsService', ContactEditControllerFn]);

function ContactEditControllerFn ($scope, $routeParams, $location, contactsService) {
  var contactId = $routeParams.contactId ? parseInt($routeParams.contactId, 10) : 0;
  $scope.contact = contactsService.getContact(contactId, true);

  $scope.editContact = function() {
    contactsService.editContact($scope.contact);
    $scope.contact = contactsService.resetContact();
    $location.path('/contacts');
  };
}