type Nullable<T> = { [K in keyof T]: T[K] | null | undefined };

export type { Nullable };
