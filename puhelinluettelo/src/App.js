import React from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import personService from './services/persons'

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
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response })
            })
            .catch(error => {
                alert(`henkilöiden haku epäonnistui`)
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        var isNew = !(this.state.persons.some(person => person.name === this.state.newName));
        if (!isNew) {
            if (window.confirm(`'${this.state.newName}' on jo puhelinluettelossa, korvataanko vanha numero uudella?`)) {
                const id = this.state.persons.find(n => n.name === this.state.newName).id
                this.changeNumberOf(id, this.state.newNumber)
            }
            else {
                this.setState({
                    newName: '',
                    newNumber: ''
                })
            }
        }
        if (isNew) {
            const personObject = {
                name: this.state.newName,
                number: this.state.newNumber
            }
            personService
                .create(personObject)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: ''
                    })
                })
                .catch(error => {
                    alert(`henkilön lisäys epäonnistui`)
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

    removePerson = (id, name) => {
        return () => {
            if (window.confirm(`poistetaanko '${name}'`)) {
                personService
                    .remove(id)
                    .then(response => {
                        this.setState({
                            persons: this.state.persons.filter(n => n.id !== id)
                        })
                    })
                    .catch(error => {
                        alert(`henkilö on jo valitettavasti poistettu palvelimelta`)
                        this.setState({ persons: this.state.persons.filter(n => n.id !== id) })
                    })
            }
        }
    }

    changeNumberOf = (id, newNumber) => {
        const person = this.state.persons.find(n => n.id === id)
        const changedPerson = { ...person, number: newNumber }

        personService
            .update(id, changedPerson)
            .then(changedPerson => {
                this.setState({
                    persons: this.state.persons.map(person => person.id !== id ? person : changedPerson),
                    newName: '',
                    newNumber: ''
                })
            })
            .catch(error => {
                alert(`henkilö '${person.name}' on jo valitettavasti poistettu palvelimelta`)
                this.setState({ persons: this.state.persons.filter(n => n.id !== id) })
            })
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
                            {personsToShow.map(person => <Person
                                key={person.id}
                                person={person}
                                removePerson={this.removePerson(person.id, person.name)} />)}
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default App