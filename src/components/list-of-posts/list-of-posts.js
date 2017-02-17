define(['knockout', 'text!./list-of-posts.html'], function(ko, templateMarkup) {

  function ListOfPosts(params) {
    var self = this;
    self.posts = ko.observableArray();

    self.getPosts = function(){
      return [{
        id: 1,
        title: 'swag',
        img: './images/katze.jpg',
        date: '17.02.2017'
      },
      {
        id: 2,
        title: 'trololo',
        img: './images/katze.jpg',
        date: '15.02.2017'
      },
      {
        id: 3,
        title: 'hallo from post three',
        img: './images/katze.jpg',
        date: '12.02.2017'
      },
      {
        id: 4,
        title: 'Trump that bitch!',
        img: './images/katze.jpg',
        date: '11.01.2017'
      }];
    };

    self.posts(self.getPosts());
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ListOfPosts.prototype.dispose = function() { };

  return { viewModel: ListOfPosts, template: templateMarkup };

});
