export interface Pagination {
	offset: number
	limit: number
	total: number
}

// type alias
export type OffsetPagination = Pagination

export interface CursorPagination {
	cursor: number | string
	next?: number | string
	limit: number
}
