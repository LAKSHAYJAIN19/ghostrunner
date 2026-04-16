export default class GhostRecorder {
    constructor(game) {
        this.game = game;
        this.reset();
    }

    reset() {
        this.records = [];
        this.startTime = 0;
    }

    start() {
        this.reset();
        this.startTime = performance.now();
    }

    record(action) {
        const time = (performance.now() - this.startTime) / 1000;
        this.records.push({ time, action });
    }

    stop() {
        return this.records;
    }
}