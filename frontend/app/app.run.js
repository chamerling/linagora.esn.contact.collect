(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.contact.collect';

  angular.module(MODULE_NAME)

  .run(registerAddressbookDisplayShell);

  function registerAddressbookDisplayShell(
    contactAddressbookDisplayShellRegistry,
    contactCollectAddressbookService,
    ContactCollectAddressbookDisplayShell,
    contactAddressbookActionEdit,
    contactAddressbookActionDelete,
    contactAddressbookActionExport,
    contactAddressbookActionSettings
  ) {
    contactAddressbookDisplayShellRegistry.add({
      id: MODULE_NAME,
      priority: 10,
      actions: [
        contactAddressbookActionExport,
        contactAddressbookActionSettings,
        contactAddressbookActionEdit,
        contactAddressbookActionDelete
      ],
      displayShell: ContactCollectAddressbookDisplayShell,
      matchingFunction: contactCollectAddressbookService.isCollectedAddressbook
    });
  }
})(angular);
