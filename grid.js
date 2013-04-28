if (Meteor.isClient) {
  var data = [
  ['a', 'b', 'c'],
  [1, 2, 3]
  ];

  Template.page.cell = function () {
    return Session.get('coords');
  };

  Template.page.stuff = function () {
    return data;
  };

  Template.page.events({
    'click input' : function (e, t) {
      console.log("You clicked cell " + e.target.name);
      Session.set('coords', e.target.name);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
