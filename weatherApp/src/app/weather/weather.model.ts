export class Weather {
    constructor(
        public locationName: string,
        public temperature: number,
        public weatherIcon: string,
        public locationKey?: string
    ) { }
}