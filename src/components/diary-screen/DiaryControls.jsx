import React from 'react';
import Button from '../Button'

const Controls = ({
    entriesLength, onClickLoad, onClickToggle
}) => {
    return (
        <div className="work-toolbar">
            <div>
                <div>
                <Button text={"LOAD"}
                    onClickHandler={onClickLoad} 
                    style={{marginTop: '10px',marginBottom: '10px',width: '102px',justifyContent: 'center'}}
                />
                {/*
                <Button 
                    text={"TOGGLE"}
                    onClickHandler={onClickToggle}
                    style={{marginTop: '10px',marginBottom: '10px',width: '102px',justifyContent: 'center'}} 
                />
                */}
                </div>
            </div>
            <div>
                <h5>{entriesLength} Entries</h5>
            </div>
            </div>
    );
}

export default Controls





