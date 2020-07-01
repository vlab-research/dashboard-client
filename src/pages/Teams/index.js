/* eslint-disable */
import React from 'react';
import CreateTeam from './components/CreateTeam'
import TeamsList from './components/TeamsList'
import './Teams.css'

const Teams = (props) => {

    return (
        <div className="t-main">
            <h1>Teams</h1>
            <CreateTeam/>
            <TeamsList/>
        </div>
    );
};


export default Teams;
