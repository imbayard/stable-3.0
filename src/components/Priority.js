import React from 'react';

const Priority = ({ p, pColor, changeP, changeG, pVal, gVal }) => {
    return (
        <div
            className='priority-wrapper'
            id={p}
            style={{
                backgroundColor: pColor,
            }}
        >
            <p className='priority-category'>{p}</p>
            <div className='priority-input'>
                <p className='priority-label'><strong>Importance</strong> (1 = most important)</p>
                <input value={pVal} onChange={(e) => changeP({'cat': p, 'val': e.target.value})} className='priority-value' type='text'></input>
            </div>
            <div className='priority-input'>
                <p className='priority-label'><strong>Goal</strong> (times / week)</p>
                <input value={gVal} onChange={(e) => changeG({'cat': p, 'val': e.target.value})} className='priority-value' type='text'></input>
            </div>
        </div>
    );
}
export default Priority;