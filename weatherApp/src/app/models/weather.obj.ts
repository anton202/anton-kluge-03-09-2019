export class Weather {
    constructor(
        public locationName: string,
        public temperature: number,
        public weatherIcon: string,
        public mesureUnit: string,
        public locationKey: string,
        public day: string,
    ) { }
}
