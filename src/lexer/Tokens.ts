import ITokenized from "../interface/ITokenized";
import TrackPosition from "../utils/TrackPosition";

class Token {
	private type: string;
	private value: any;
	private position_start: TrackPosition | undefined;
	private position_end: TrackPosition | undefined;

	constructor(type: string, value: any | undefined = undefined, position_start: TrackPosition | undefined = undefined, position_end: TrackPosition | undefined = undefined) {
		this.type = type
		this.value = value

		if (position_start) {
			this.position_start = position_start.copy();
			this.position_end = position_start.copy()
			this.position_end.next();
		}

		if (position_end) {
			this.position_end = position_end;
		}
	}

	represent(): ITokenized {
		return this.value ? { dataType: this.type, value: this.value, position_start: this.position_start, position_end: this.position_end }
			: { dataType: this.type, position_start: this.position_start, position_end: this.position_end }
	}
}


export default Token;