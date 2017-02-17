define(['knockout', 'text!./list-of-posts.html'], function(ko, templateMarkup) {

  function ListOfPosts(params) {
    
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ListOfPosts.prototype.dispose = function() { };

  return { viewModel: ListOfPosts, template: templateMarkup };

});
