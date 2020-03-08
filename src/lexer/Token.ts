import ITokenized from "../interface/ITokenized";
import TrackPosition from "../utils/TrackPosition";

class Token {
	public type: string;
	public value: any;
	public position_start: TrackPosition | undefined;
	public position_end: TrackPosition | undefined;

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

		return this;
	}
}


export default Token;