import { DTTypes, PlayerTypes, TeamTypes } from "../types";

const LOCAL_STORAGE_TEAM_KEY = 'team';
const LOCAL_STORAGE_PLAYER_KEY = 'player';
const LOCAL_STORAGE_DT_KEY = 'DT';

const FootballSevice ={
    
    //TEAM
    // Get all Teams.
    getTeam:(): TeamTypes[] => {
        const teamStr = localStorage.getItem(LOCAL_STORAGE_TEAM_KEY);
        return teamStr ? JSON.parse(teamStr) : [];
    },
    
    // Adding a Team.
    addTeam:(name:string, stadium:string, dt?:DTTypes, players?:PlayerTypes[]):TeamTypes=>{
        const teams = FootballSevice.getTeam();
        const newTeam: TeamTypes = {
            id: teams.length + 1,
            name,
            stadium,
            dt,
            players
        };
        const updateTeams =[...teams, newTeam];
        localStorage.setItem(LOCAL_STORAGE_TEAM_KEY, JSON.stringify(updateTeams));
        return newTeam;
    },

    // Updating the Team.
    updateTeam:(team: TeamTypes): TeamTypes =>{
        const teams = FootballSevice.getTeam();
        const updateTeam = teams.map((t)=> (t.id === team.id) ? team : t);
        localStorage.setItem(LOCAL_STORAGE_TEAM_KEY, JSON.stringify(updateTeam));
        return team;
    },

    // Delete a Team.
    deleteTeam:(id:number): void => {
        const teams = FootballSevice.getTeam();
        const updateTeams = teams.filter((teams) => (teams.id !== id));
        localStorage.setItem(LOCAL_STORAGE_TEAM_KEY, JSON.stringify(updateTeams));
    },

    // PLAYER
    // Get all Player.
    getPlayer:():PlayerTypes[]=>{
        const playerStr = localStorage.getItem(LOCAL_STORAGE_PLAYER_KEY);
        return playerStr ? JSON.parse(playerStr): [];
    },

    // Adding a Player.
    addPlayer:(name:string, lastName:string, numbers:number, position:string, team?: TeamTypes,):PlayerTypes =>{
        const players = FootballSevice.getPlayer();
        const newPlayer: PlayerTypes = {
            id: players.length + 1,
            name,
            lastName,
            team,
            numbers,
            position
        };
        const updatePlayers = [...players, newPlayer];
        localStorage.setItem(LOCAL_STORAGE_PLAYER_KEY, JSON.stringify(updatePlayers));
        return newPlayer;
    },

    // Updating the player.
    updatePlayer:(player: PlayerTypes): PlayerTypes =>{
        const players = FootballSevice.getPlayer();
        const updatePlayer = players.map((p) => (p.id === player.id) ? player : p);
        localStorage.setItem(LOCAL_STORAGE_PLAYER_KEY, JSON.stringify(updatePlayer));
        return player;
    },

    // Delete player.
    deletePlayer:(id:number)=>{
        const players = FootballSevice.getPlayer();
        const updatePlayers = players.filter((player) => (player.id !== id));
        localStorage.setItem(LOCAL_STORAGE_PLAYER_KEY, JSON.stringify(updatePlayers));
    },

    // DTs
    // Get all DT's
    getDts:():DTTypes[]=>{
        const dtStr = localStorage.getItem(LOCAL_STORAGE_DT_KEY);
        return dtStr ? JSON.parse(dtStr) : [];
    },

    // Adding a DT
    addDt:(name:string, lastName:string,  formation:string,team?: TeamTypes): DTTypes=>{
        const dts = FootballSevice.getDts();
        const newDt : DTTypes ={
            id: dts.length +1,
            name,
            lastName,
            team,
            formation
        }        
        const updateDts = [...dts, newDt];
        localStorage.setItem(LOCAL_STORAGE_DT_KEY, JSON.stringify(updateDts));
        return newDt;
    },

    // Updating the DT
    updateDt:(DT: DTTypes):DTTypes=>{
        const dts = FootballSevice.getDts();
        const updateDt = dts.map((dt)=>(dt.id === DT.id) ? DT : dt);
        localStorage.setItem(LOCAL_STORAGE_DT_KEY, JSON.stringify(updateDt));
        return DT;
    },

    deleteDt:(id:number)=>{
        const dts = FootballSevice.getDts();
        const updateDts = dts.filter((dt) => (dt.id !== id));
        localStorage.setItem(LOCAL_STORAGE_DT_KEY, JSON.stringify(updateDts));
    }
}

export default FootballSevice;