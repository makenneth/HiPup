var rad = function(x) {
    return x *  0.0174532925199433;
  };

module.exports = {
  getDistance: function(p1, p2) {
    var now = Date.now()
    var R = 3959; // Earth’s mean radius in miles
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var e = Math.sin(dLat / 2);
    var f = Math.sin(dLong / 2);
    var a = e * e +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      f * f
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d); // returns the distance in miles
  }

}

