// Function to load CSV data
async function loadCSV(filePath) {
    const response = await fetch(filePath);
    const data = await response.text();
    const rows = data.split('\n').slice(1); // Skip header
    return rows.map(row => {
        const [lat, lon, value] = row.split(',');
        return {lat: parseFloat(lat), lon: parseFloat(lon), value: parseFloat(value)};
    });
}

// Function to map data points on globe
async function mapData() {
    const oceanData = await loadCSV('data/ocean_temperature.csv');
    const earth = document.querySelector('#earth');

    oceanData.forEach(point => {
        const marker = document.createElement('a-sphere');
        const radius = 0.02;
        const color = `rgb(${Math.min(255, point.value*5)},0,${255-Math.min(255, point.value*5)})`;

        // Convert lat/lon to 3D coordinates
        const phi = (90 - point.lat) * (Math.PI / 180);
        const theta = (point.lon + 180) * (Math.PI / 180);

        const x = 1.5 * Math.sin(phi) * Math.cos(theta);
        const y = 1.5 * Math.cos(phi);
        const z = 1.5 * Math.sin(phi) * Math.sin(theta);

        marker.setAttribute('position', `${x} ${y} ${z}`);
        marker.setAttribute('radius', radius);
        marker.setAttribute('color', color);
        marker.setAttribute('class', 'data-point');

        // Clickable tooltip
        marker.addEventListener('click', () => {
            alert(`Latitude: ${point.lat}, Longitude: ${point.lon}, Temp: ${point.value}°C`);
        });

        earth.appendChild(marker);
    });
}

// Call the function
mapData();


