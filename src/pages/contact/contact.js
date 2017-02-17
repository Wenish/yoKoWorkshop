define(['knockout', 'text!./contact.html', 'jquery'], function(ko, templateMarkup) {

  function Contact(params) {
    
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Contact.prototype.dispose = function() { };

  return { viewModel: Contact, template: templateMarkup };

});
