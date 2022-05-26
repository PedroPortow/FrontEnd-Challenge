import React from "react"

export const mapConfig = {
    mapStyle: {
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 0
    },
    polyOptions: {
        fillColor: "#fff",
        fillOpacity: 0.1,
        strokeColor: "#fff",
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: true,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
      },

    options: {
      disableDefaultUI: true,
      clickableIcons: false,
      mapTypeId: "satellite",      
    }
}