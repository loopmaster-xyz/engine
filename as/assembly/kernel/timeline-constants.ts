// Timeline bytecode format: [opLength, TIMELINE_MAGIC, segCount, totalUnits, beatDiv, ...segments]
// totalUnits < 0 = no-wrap (hold last value after end)
export const TIMELINE_MAGIC: i32 = 1000
export const TIMELINE_HEADER_SIZE: i32 = 4
export const TIMELINE_SEGMENT_SIZE: i32 = 5
export const TIMELINE_KIND_HOLD: i32 = 0
export const TIMELINE_KIND_GLIDE: i32 = 1
