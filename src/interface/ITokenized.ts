import TrackPosition from "../utils/TrackPosition";

interface ITokenized {
    dataType: any,
    value?: any | undefined;
    position_start?: TrackPosition | undefined;
    position_end?: TrackPosition | undefined;
}

export default ITokenized;