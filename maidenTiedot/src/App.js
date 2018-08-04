import React from 'react'
import Country from './components/Country'
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
            countries: [],
            selectedCountry: "",
            countriesToShow: []
        }
    }

    componentDidMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({ countries: response.data })
            })
    }

    selectCountry = (name) => {
        return () => {
            this.setState({ selectedCountry: name })
        }
    }

    handleFilterChange = (event) => {
        var filter = event.target.value;
        var selectedCountry = "";

        const countriesToShowMaybe = this.state.countries.filter(
            country => country.name.toUpperCase().includes(filter.toUpperCase()));

        const countriesToShow =
            (countriesToShowMaybe.length > 0 && countriesToShowMaybe.length < 11) ?
                countriesToShowMaybe : [];

        if (countriesToShow.length === 1) {
            selectedCountry = countriesToShow[0].name
        }

        this.setState({
            filter: event.target.value,
            countriesToShow: countriesToShow,
            selectedCountry: selectedCountry
        })
    }

    render() {
        const infoOrEmpty =
            (this.state.countriesToShow.length > 0 && this.state.countriesToShow.length < 11) ?
                "" : "Too many matches, specify another filter"

        return (

            <div>
                <Filter
                    onChange={this.handleFilterChange}
                    value={this.state.filter}
                />
                <div>
                    {infoOrEmpty}
                    {this.state.countriesToShow.map(country => <Country
                        key={country.name}
                        country={country}
                        clickHandler={this.selectCountry(country.name)}
                        selected={(country.name === this.state.selectedCountry)} />)}
                </div>

            </div>
        )
    }
}

export default App