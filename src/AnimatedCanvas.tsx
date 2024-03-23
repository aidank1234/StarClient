import React, { useRef, useEffect } from 'react';

const AnimatedCanvas = () => {
  const canvasRef = useRef(null);

  const generateRandomCoordinates = () => {
    const numberOfCoordinates = 15; // Simplified for clearer constellation paths
    let coordinates = [];
    
    for (let i = 0; i < numberOfCoordinates; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * 100);
        y = Math.floor(Math.random() * 100);
      } while (coordinates.find(coord => coord.x === x && coord.y === y)); // Ensure unique points
      
      coordinates.push({ x, y });
    }
    
    // Optionally reconnect to previous points to simulate intersections
    for (let i = 0; i < numberOfCoordinates / 3; i++) {
      const fromIndex = Math.floor(Math.random() * numberOfCoordinates);
      const toIndex = Math.floor(Math.random() * numberOfCoordinates);
      if (fromIndex !== toIndex) {
        const from = coordinates[fromIndex];
        const to = coordinates[toIndex];
        coordinates.push(from, to); // Add a pair to "loop back" creating an intersection
      }
    }

    return coordinates.map(coord => [coord.x, coord.y]);
  };

  useEffect(() => {
    const points = generateRandomCoordinates();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const scale = window.devicePixelRatio; // Get the device pixel ratio
    canvas.width = 100 * scale;
    canvas.height = 100 * scale;
    canvas.style.width = '100px';
    canvas.style.height = '100px';
    context.scale(scale, scale);
    context.lineWidth = 1;

    const drawStar = (x, y) => {
      context.fillStyle = '#4285f4';
      context.beginPath();
      context.arc(x, y, 2, 0, Math.PI * 2, true); // Draw a small circle
      context.fill();
    };

    const drawLine = (from, to) => {
      context.strokeStyle = '#39ff14';
      context.beginPath();
      context.moveTo(...from);
      context.lineTo(...to);
      context.stroke();
    };

    points.forEach(point => drawStar(point[0], point[1]));

    for (let i = 0; i < points.length - 1; i++) {
      drawLine(points[i], points[i + 1]);
    }
  }, []);

  return <canvas ref={canvasRef} style={{ backgroundColor: 'transparent' }} />;
};

export default AnimatedCanvas;
