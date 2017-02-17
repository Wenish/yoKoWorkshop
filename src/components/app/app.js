define(['knockout', 'text!./app.html'], function(ko, templateMarkup) {

  function App(params) {
    var self = this;
    self.route = params.route;
    self.isLoading = ko.observable(true);

    self.getData = function(){
      setTimeout(function(){
        self.isLoading(false)
      },3000);
    };
    self.getData();
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  App.prototype.dispose = function() { };

  return { viewModel: App, template: templateMarkup };

});
