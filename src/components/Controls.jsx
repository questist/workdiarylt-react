import React from 'react';
import Button from '../components/Button'
import Timer from '../components/Timer'

const Controls = ({
    today, selectedEntry, onClickPomodoro, onClickStart, isStarted, checkEntry
}) => {
    return (
        <div className="work-toolbar">
            <div>
                <div>
                <Button text="Pomodoro"
                    onClickHandler={onClickPomodoro} 
                    style={{marginTop: '10px',marginBottom: '10px',width: '102px'}}
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
                <h5>{today.length} Entries</h5>
            </div>
            </div>
    );
}

export default Controls





