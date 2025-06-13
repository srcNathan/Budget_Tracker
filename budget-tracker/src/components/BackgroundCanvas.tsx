import React, { useRef, useEffect } from "react";
import type { DollarSign } from "../types/DollarSign";
import type { CoinDrop } from "../types/CoinDrop";

const FloatingDollarBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const maxDollars = 50;
    const maxCoinDrops = 5;
    const coins = ["🪙", "💵", "💸", "💰", "🤑"];
    const currencyWeights = [
        { symbol: "$", weight: 60 },
        { symbol: "€", weight: 10 },
        { symbol: "¥", weight: 10 },
        { symbol: "£", weight: 10 },
        { symbol: "₩", weight: 10 },
    ];

    useEffect(() => {

        // Global Vars
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const dollars: DollarSign[] = [];
        const coinDrops: CoinDrop[] = [];

        let lastDropX = 0;
        let lastDropY = 0;
        const dropDistanceThreshold = 75;


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

        const handleMouseMove = (event: MouseEvent) => {
            const x = event.clientX;
            const y = event.clientY;

            // Tracking the last drop
            const xDistance = x - lastDropX;
            const yDistance = y - lastDropY;
            const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

            // Don't drop a coin if the mouse hasn't moved enough
            if (distance < dropDistanceThreshold) {
                return;
            }

            // Assign last drop position
            lastDropX = x;
            lastDropY = y;

            // Add a new coin drop
            coinDrops.push({
                x,
                y,
                size: 24,
                speedY: 2 + Math.random() * .5, // falling speed
                opacity: 1,
                symbol: coins[Math.floor(Math.random() * coins.length)],
            });

            // limit max coins
            if (coinDrops.length > maxCoinDrops) {
                coinDrops.shift();
            }
        };


        function animate() {
            context!.clearRect(0, 0, width, height);

            // Animate background dollars
            for (let i = 0; i < dollars.length; i++) {
                const dollar = dollars[i];
                dollar.rotation += dollar.rotationSpeed;

                // Shimmer flicker effect
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

            // Animate coin drops (falling)
            for (let i = coinDrops.length - 1; i >= 0; i--) {
                const coin = coinDrops[i];
                context!.globalAlpha = coin.opacity;
                context!.font = `${coin.size}px Arial`;
                context!.fillText(coin.symbol, coin.x, coin.y);

                coin.y += coin.speedY;
                coin.opacity -= 0.001; // fade out

                if (coin.opacity <= 0 || coin.y > height + coin.size) {
                    coinDrops.splice(i, 1); // remove when faded or off screen
                }
            }


            context!.globalAlpha = 1;
            requestAnimationFrame(animate);
        }

        // Setup
        setupCanvas();

        // Display the cool rotating dollar signs
        animate();

        // Event listeners
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Remove the listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
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