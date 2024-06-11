import React from 'react';
import Button from '../components/Button'
import Timer from '../components/Timer'
import { StatusEnum } from './GlobalFunctions';

const Controls = ({
    entriesLength, selectedEntry, onClickSave, onClickPomodoro, onClickStart, isStarted, checkEntry
}) => {
    return (
        <div className="work-toolbar">
            <div>
                <div>
                <Button text={(selectedEntry.isPomodoro === true && selectedEntry.status !== StatusEnum.COMPLETED)?"Cancel":"Pomodoro"}
                    onClickHandler={onClickPomodoro} 
                    style={{marginTop: '10px',marginBottom: '10px',width: '102px',justifyContent: 'center'}}
                />
                <Button 
                    text={(isStarted)?"Pause":"Start"}
                    onClickHandler={onClickStart}
                    style={{marginTop: '10px',marginBottom: '10px',width: '102px',justifyContent: 'center'}} 
                />
                </div>
                <Timer entry={selectedEntry} isRunning={isStarted} checkEntry={checkEntry}/>
            </div>
            <div>
                <h5 style={{display: 'inline', position: 'relative', top: '16px'}}>{entriesLength} Entries</h5>
                <Button text={"Save"}
                    onClickHandler={onClickSave} 
                    style={{marginTop: '10px',marginBottom: '10px',width: '102px',justifyContent: 'center', float: 'right'}}
                />
            </div>
            </div>
    );
}

export default Controls





