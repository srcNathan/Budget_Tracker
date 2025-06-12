import React, { useRef, useEffect } from "react";
import type { DollarSign } from "../types/types";

const FloatingDollarBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {

        // Global Vars
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const dollars: DollarSign[] = [];
        const maxDollars = 50;
        const currencyWeights = [
            { symbol: "$", weight: 60 },
            { symbol: "€", weight: 10 },
            { symbol: "¥", weight: 10 },
            { symbol: "£", weight: 10 },
            { symbol: "₩", weight: 10 },
        ];

        // Initialize dollars with random positions and speeds
        for (let i = 0; i < maxDollars; i++) {
            dollars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: 20 + Math.random() * 20,
                speedX: (Math.random() - 0.5) * 1,
                speedY: -0.5 - Math.random() * 1,
                opacity: 0.5 + Math.random() * 0.5,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                symbol: pickWeightedCurrency(),
            });
        }

        function pickWeightedCurrency() {
            const totalWeight = currencyWeights.reduce((sum, c) => sum + c.weight, 0);
            const rand = Math.random() * totalWeight;
            let runningTotal = 0;

            for (const entry of currencyWeights) {
                runningTotal += entry.weight;
                if (rand < runningTotal) return entry.symbol;
            }

            return "$";
        }

        function setupCanvas() {
            canvas!.width = width * window.devicePixelRatio;
            canvas!.height = height * window.devicePixelRatio;
            context!.scale(window.devicePixelRatio, window.devicePixelRatio);
            context!.textAlign = "center";
            context!.textBaseline = "middle";
            context!.fillStyle = "green";
            context!.font = "24px Arial";
        }

        function handleResize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas!.width = width * window.devicePixelRatio;
            canvas!.height = height * window.devicePixelRatio;
            context!.scale(window.devicePixelRatio, window.devicePixelRatio);
            context!.textAlign = "center";
            context!.textBaseline = "middle";
            context!.fillStyle = "green";
            context!.font = "24px Arial";
        }

        function animate() {
            context!.clearRect(0, 0, width, height);

            for (let i = 0; i < dollars.length; i++) {
                const dollar = dollars[i];
                dollar.rotation += dollar.rotationSpeed;

                // ✨ Shimmer flicker effect
                const shimmer = Math.sin(Date.now() / 300 + i) * 0.3; // subtle wave
                const flickerOpacity = Math.min(1, Math.max(0, dollar.opacity + shimmer));

                context!.save();
                context!.translate(dollar.x, dollar.y);
                context!.rotate(dollar.rotation);

                context!.globalAlpha = flickerOpacity;
                context!.font = `${dollar.size}px Arial`;
                context!.fillText(dollar.symbol, 0, 0);

                context!.restore();

                // Movement
                dollar.x += dollar.speedX;
                dollar.y += dollar.speedY;

                // Reset when off screen
                if (dollar.y < -dollar.size || dollar.x < -50 || dollar.x > width + 50) {
                    dollar.x = Math.random() * width;
                    dollar.y = height + dollar.size;
                    dollar.size = 20 + Math.random() * 20;
                    dollar.speedX = (Math.random() - 0.5) * 1;
                    dollar.speedY = -0.5 - Math.random() * 1;
                    dollar.opacity = 0.5 + Math.random() * 0.5;
                }
            }

            context!.globalAlpha = 1;
            requestAnimationFrame(animate);
        }

        // Setup
        setupCanvas();

        // Display the cool rotating dollar signs
        animate();

        // Event listener for resizing the window
        window.addEventListener("resize", handleResize);

        // Remove the listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
            }}
        />
    );
};

export default FloatingDollarBackground;