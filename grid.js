if (Meteor.isClient) {

  Session.set('data', [
    ['a', 'b', 'c'],
    [1, 2, 3]
    ]);
  Session.set('numrows', Session.get('data').length);
  Session.set('numcols', Math.max.apply(null, Session.get('data').map( function(x){return x.length;} ) ) );

  var iota = function (n) {
    return Array.apply(null, {length: n}).map(Number.call, Number);
  }

  Template.page.rows = function () {
    return iota(Session.get('numrows')).map( function (x) {return {row: x};} );
  };

  Template.page.cols = function () {
    return iota(Session.get('numcols')).map( function (x) {return {col: x};} );
  };

  Template.page.cell = function () {
    return Session.get('coords');
  };

  Template.page.contents = function () {
    var s = Session.get('coords').split(',');
    var r = parseInt(s[0]);
    var c = parseInt(s[1]);
    return Session.get('data')[r][c];
  };

  Template.page.stuff = function (i, j) {
    return Session.get('data')[i][j];
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
