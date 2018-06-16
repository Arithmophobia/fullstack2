import React from 'react'

const Otsikko = ({ nimi }) => {
    return (
        <div>
            <h1>{nimi}</h1>
        </div>
    )
}

const Osa = ({ osa }) => {
    return (
        <div>
            <p>{osa.nimi} {osa.tehtavia}</p>
        </div>
    )
}

const Sisalto = ({ osat }) => {
    return (
        <div>
            {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>
    )
}

const Yhteensa = ({ osat }) => {
    var total = osat.reduce(
        (accumulator, currentValue) => accumulator + currentValue.tehtavia,
        0
    );
    return (
        <div>
            <p>yhteensä {total} tehtävää</p>
        </div>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi