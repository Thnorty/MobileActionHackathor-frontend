import { Accelerometer } from "expo-sensors";

export default class FreeFallDetector {
    constructor() {
        this.accelerometerData = {
            x: 0,
            y: 0,
            z: 0,
        };
        this.acceleration = 0;
        this.accelerationThreshold = 4.0;
        this.freeFallDetected = false;
        this.freeFallDetectedCallback = () => {};
    }

    setFreeFallDetectedCallback(callback) {
        this.freeFallDetectedCallback = callback;
    }

    start() {
        Accelerometer.setUpdateInterval(100);
        this.subscription = Accelerometer.addListener((accelerometerData) => {
            this.accelerometerData = accelerometerData;
            this.acceleration = Math.sqrt(
                Math.pow(accelerometerData.x, 2) +
                Math.pow(accelerometerData.y, 2) +
                Math.pow(accelerometerData.z, 2)
            );
            if (this.acceleration < this.accelerationThreshold) {
                if (!this.freeFallDetected) {
                    this.freeFallDetected = true;
                    this.freeFallDetectedCallback();
                }
            } else {
                this.freeFallDetected = false;
            }
        });
    }

    stop() {
        if (this.subscription) {
            this.subscription.remove();
            this.subscription = null;
        }
    }
}