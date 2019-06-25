import React from 'react';

export default class AddMovie extends React.Component {

    state = { items: [] }

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            title: "",
            descriptionText: "",
            categoryId: null,
            categories: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3001/categories', {
            crossDomain: true,
            method: 'GET',
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    categories: result
                });
            })
    }

    handleChange(event) {
        const state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
        console.log(state, this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title, descriptionText, categoryId } = this.state;
        fetch('http://localhost:3001/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            crossDomain: true,
            body: JSON.stringify({
                title,
                descriptionText,
                categoryId
            })
        }).then((resp) => console.log(resp.status));
    }

    render() {
        const { categories } = this.state;
        console.log(categories);
        if (categories === []) {
            return (<p>Loading...</p>)
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" onChange={this.handleChange}></input><br />
                <input type="text" name="descriptionText" onChange={this.handleChange}></input> <br />
                <select name="categoryId" onChange={this.handleChange}>
                    {categories.map(item => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
                <button type="submit" >Absenden</button>
            </form>
        )
    }
}