const rad = (x) => x *  0.0174532925199433;

module.exports = {
  getDistance: function(p1, p2) {
    const now = Date.now()
    const R = 3959; // Earth’s mean radius in miles
    const dLat = rad(p2.lat - p1.lat);
    const dLong = rad(p2.lng - p1.lng);
    const e = Math.sin(dLat / 2);
    const f = Math.sin(dLong / 2);
    const a = e * e +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      f * f
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.round(d); // returns the distance in miles
  }

}

