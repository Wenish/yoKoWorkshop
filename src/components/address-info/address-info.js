define(['knockout', 'text!./address-info.html'], function(ko, templateMarkup) {

  function AddressInfo(params) {
    this.message = ko.observable('Hello from the address-info component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  AddressInfo.prototype.dispose = function() { };

  return { viewModel: AddressInfo, template: templateMarkup };

});
