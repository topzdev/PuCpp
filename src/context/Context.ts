import TrackPosition from "../utils/TrackPosition";

class Context {
    display_name: string;
    parent?: Context;
    parent_entry_position?: TrackPosition;
    constructor(display_name: string, parent?: Context, parent_entry_position?: TrackPosition) {
        this.display_name = display_name;
        this.parent = parent;
        this.parent_entry_position = parent_entry_position

        return this;
    }
}

export default Context;