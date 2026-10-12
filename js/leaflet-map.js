
document.addEventListener("DOMContentLoaded", function () {

    // Leaflet map
    const leafletMap = L.map("leaflet-map", {
        center: [39.0, 34.5],
        zoom: 6,
        minZoom: 3,
        maxZoom: 18,
        worldCopyJump: false,
        maxBounds: [
            [-85, -180],
            [85, 180]
        ],
        maxBoundsViscosity: 1.0
    });

    // Basemap - Esri World Street Map
    L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        {
            attribution: "Tiles &copy; Esri and its data providers",
            noWrap: true,
            maxZoom: 18
        }
    ).addTo(leafletMap);

    // Cities: [latitude, longitude]
    const visitedCities = [
        { name: "Kastamonu", coords: [41.3887, 33.7753] },
        { name: "Ankara", coords: [39.9334, 32.8597] },
        { name: "İstanbul", coords: [41.0082, 28.9784] },
        { name: "Eskişehir", coords: [39.7767, 30.5234] },
        { name: "Gaziantep", coords: [37.0662, 37.3781] },
        { name: "Sinop", coords: [42.0268, 35.1570] },
        { name: "Bursa", coords: [40.1885, 29.0610] },
        { name: "İzmir", coords: [38.4237, 27.1384] },
        { name: "Balıkesir", coords: [39.6484, 27.8861] },
        { name: "Samsun", coords: [41.2867, 36.3360] }
    ];

    // Marker layer
    const markerLayer = L.layerGroup();

    visitedCities.forEach(function (city) {

        const marker = L.circleMarker(city.coords, {
            radius: 9,
            color: "#7951b5",
            weight: 2,
            fillColor: "#c49bf3",
            fillOpacity: 0.9
        });

        marker.bindPopup(
            "<strong>" + city.name + "</strong>" +
            "<p>🌸 A city I've visited!</p>"
        );

        marker.addTo(markerLayer);
    });

    // Show markers only when zoom >= 7
    function updateMarkerVisibility() {

        const zoom = leafletMap.getZoom();

        if (zoom >= 7) {

            if (!leafletMap.hasLayer(markerLayer)) {
                markerLayer.addTo(leafletMap);
            }

        } else {

            if (leafletMap.hasLayer(markerLayer)) {
                leafletMap.removeLayer(markerLayer);
            }
        }
    }

    leafletMap.on("zoomend", updateMarkerVisibility);

    updateMarkerVisibility();

});
