import React from 'react'

const Filter = ({ value, onChange }) => {
    return (
        <div>
            filter countries: <input
                value={value}
                onChange={onChange} />
        </div>

    )
}

export default Filter