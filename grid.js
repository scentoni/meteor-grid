if (Meteor.isClient) {
  Session.set('data', [
  ['a', 'b', 'c'],
  [1, 2, 3]
  ]);

  Template.page.cell = function () {
    return Session.get('coords');
  };

  Template.page.contents = function () {
    var s = Session.get('coords').split(',');
    var r = parseInt(s[0]);
    var c = parseInt(s[1]);
    return Session.get('data')[r][c];
  };

  Template.page.stuff = function () {
    return Session.get('data');
  };

  Template.page.events({
    'keyup input' : function (e, t) {
      console.log("You changed cell " + e.target.name + " to have the value " + e.target.value);
      var s = e.target.name.split(',');
      var r = parseInt(s[0]);
      var c = parseInt(s[1]);
      var tmp = Session.get('data');
      tmp[r][c] = e.target.value;
      Session.set('data', tmp);
    },
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
