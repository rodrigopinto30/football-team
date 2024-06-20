export interface TeamTypes {
    id: number;
    name: string;
    stadium: string;
    dt?: DTTypes | null;
    players?: PlayerTypes[] | null; 
}

export interface PersonTypes {
    id: number;
    name: string;
    lastName: string;
    team?: TeamTypes | null;
}

export interface PlayerTypes extends PersonTypes{
    numbers: number;
    position: string;
}

export interface DTTypes extends PersonTypes {
    formation: string;
}