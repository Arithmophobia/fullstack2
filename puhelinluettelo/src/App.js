import React from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                this.setState({ persons: response.data })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        var isNew = !(this.state.persons.some(person => person.name === this.state.newName));
        if (!isNew) {
            alert("Nimi löytyy jo puhelinluettelosta!");
        }
        if (isNew) {
            const personObject = {
                name: this.state.newName,
                number: this.state.newNumber
            }
            const persons = this.state.persons.concat(personObject)

            this.setState({
                persons,
                newName: '',
                newNumber: ''
            })
        }
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        const personsToShow =
            (this.state.filter.length === 0) ?
                this.state.persons :
                this.state.persons.filter(person => person.name.toUpperCase().includes(this.state.filter.toUpperCase()));

        return (

            <div>
                <h1>Puhelinluettelo</h1>
                <Filter
                    onChange={this.handleFilterChange}
                    value={this.state.filter}
                />
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input
                            value={this.state.newName}
                            onChange={this.handleNameChange} />
                    </div>
                    <div>
                        numero: <input
                            value={this.state.newNumber}
                            onChange={this.handleNumberChange} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <div>
                    <table>
                        <tbody>
                            {personsToShow.map(person => <Person key={person.name} person={person} />)}
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default App