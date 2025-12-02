export type MetricPeriod = "day" | "month" | "year";

export interface MetricItem {
    label: string;
    value: number;
}

export interface TopUser {
    id: string;
    name: string;
    lastName: string;
    userName: string;
    point: number;
    level: {
        level: number;
    }
    imgLevel: string;
    avatar: string;

}
