define(['knockout', 'text!./loader.html'], function(ko, templateMarkup) {

  function Loader(params) {
    this.message = ko.observable('Hello from the loader component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Loader.prototype.dispose = function() { };

  return { viewModel: Loader, template: templateMarkup };

});
