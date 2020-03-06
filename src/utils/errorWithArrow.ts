import TrackPosition from "./TrackPosition";

export default function (text: string, position_start: TrackPosition, position_end: TrackPosition) {

    let result: any = ''

    let idx_start = text.lastIndexOf('\n', position_start.index)

    let idx_end = text.indexOf('\n', idx_start + 1)

    if (idx_end < 0) idx_end = text.length;

    let line_count = position_end.line - position_start.line + 1

    let i;
    for (i = 0, i < line_count, i++) {


        //! let line = text[idx_start : idx_end]
        let line = text[idx_start / idx_end]
        let col_start: number = i === 0 ? position_start.column : 0
        let col_end: number = i === line_count - 1 ? position_end.column : line.length - 1


        result += line + '\n'
        // result +=  for(i = 0; i < col_start)


        // ' ' * col_start + '^' * (col_end - col_start)
    }
}