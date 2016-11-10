import React  from 'react';
import PostIt from './PostIt.jsx'

export default class PostBoard extends React.Component {

    constructor(props) {
        super(props);

        // unique ID for keys
        this.key = this.props.notes ? this.props.notes.length : 0;

        this.state = {
            notes: this.props.notes.map((n,i)=>({key:i, text:n})) || []
        };
    }

    static get defaultProps() {
        return {
            title: 'Demo'
        };
    }

    getMutableNotesState() {
        return this.state.notes.slice();
    }

    handleAddPostIt() {
        let notes = this.getMutableNotesState();
        notes.push({
            key: this.key++,
            text:'New Note'
        });
        this.setState({notes: notes});
    }

    handleRemovePostIt(id) {
        let notes = this.getMutableNotesState();
        notes.splice(id, 1);
        this.setState({notes: notes});
    }

    handleUpdatePostIt(id, text) {
        let notes = this.getMutableNotesState();
        notes[id].text = text;
        this.setState({notes: notes});
    }

    renderNotes() {
        return this.state.notes.map(
            (note, index) => <PostIt key={note.key}
                                     number={index+1}
                                     onChange={this.handleUpdatePostIt.bind(this, index)}
                                     onRemove={this.handleRemovePostIt.bind(this, index)}>{ note.text }</PostIt>
        );
    }

    render() {
        return(
            <div className="post-board">
                <header>
                    <div className="container">
                        <a href="#"
                           className="btn btn-warning pull-right"
                           onClick={this.handleAddPostIt.bind(this)}>
                            <i className="glyphicon glyphicon-plus" />
                        </a>
                        <h1>{this.props.title}</h1>
                    </div>
                </header>

                <main className="post-board__main container">
                    <div className="row">
                        {this.renderNotes()}
                    </div>
                </main>
            </div>
        );
    }

}


