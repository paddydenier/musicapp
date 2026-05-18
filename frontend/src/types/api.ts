export type BandSummary = {
    id: number;
    name: string;
};

export type UserResponse = {
    id: number;
    firstName: string;
    lastName: string;
    instruments: string[];
    bands: BandSummary[];
};

export type BandResponse = {
    id: number;
    name: string;
    members: UserResponse[];
};