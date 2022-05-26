export function centerCalc(coordinates){
    let x_cart = 0;
    let y_cart = 0;
    let z_cart = 0;
    let i;
  
    // ignorando primeiro elemento
    for (i = 1; i < coordinates.length; i++) {
      let x, y, z;
      let lat, lon;
  
      lat = (coordinates[i].lat * Math.PI) / 180; // transforma para radianos
      lon = (coordinates[i].lng * Math.PI) / 180; // transforma para radianos
  
      // obtém as coordenadas cartesianas
      x = Math.cos(lat) * Math.cos(lon);
      y = Math.cos(lat) * Math.sin(lon);
      z = Math.sin(lat);
  
      x_cart += x;
      y_cart += y;
      z_cart += z;
    }
  
    // média das coordenadas cartesianas
    x_cart = x_cart / (coordinates.length - 1.0);
    y_cart = y_cart / (coordinates.length - 1.0);
    z_cart = z_cart / (coordinates.length - 1.0);
  
    // processo para voltar a coordenadas esféricas
    let lng_c, hyp, lat_c;
  
    lng_c = Math.atan2(y_cart, x_cart);
    hyp = Math.sqrt(x_cart * x_cart + y_cart * y_cart);
    lat_c = Math.atan2(z_cart, hyp);
  
    // de volta para graus, saindo dos radianos
  
    lng_c = (lng_c * 180.0) / Math.PI;
    lat_c = (lat_c * 180.0) / Math.PI;
  
    const center = {
      lat: lat_c,
      lng: lng_c,
    };
    return center;
  }
  