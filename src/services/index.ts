import { DTTypes, PlayerTypes, TeamTypes } from "../types";

const LOCAL_STORAGE_TEAM_KEY = 'team';
const LOCAL_STORAGE_PLAYER_KEY = 'player';

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
    }
}

export default FootballSevice;