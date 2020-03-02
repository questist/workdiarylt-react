import React from 'react'

export default function QuickSelect({value,startQuickEntry}) {
    function onClickHandler(e) {
        startQuickEntry(value);
    }
    return <div className="quick-select" onClick={onClickHandler}>{value}</div>
}