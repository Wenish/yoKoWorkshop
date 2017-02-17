define(['knockout', 'text!./post.html'], function(ko, templateMarkup) {

  function Post(params) {
    
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Post.prototype.dispose = function() { };

  return { viewModel: Post, template: templateMarkup };

});
