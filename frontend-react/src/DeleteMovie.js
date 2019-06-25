import React from 'react';

export default class DeleteMovie extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            movie: null
        };

        this.delete = this.delete.bind(this)
    }

    componentDidMount() {
        const { movie } = this.props;
        this.setState({
            movie
        });
    }

    delete() {
        console.log(this.props);
        const { movie } = this.state;
        fetch("http://localhost:3001/" + movie, {
            crossDomain: true,
            method: 'DELETE',
        })
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (<button onClick={this.delete}>X</button>)
    }
}