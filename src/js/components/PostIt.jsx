import React from 'react';

const PostItState = {
    view: 'view',
    edit: 'edit',
    delete: 'delete'
};

export default class PostIt extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.children,
            mode: PostItState.view,
            deleted: false
        };
    }

    static get defaultProps() {
        return {
            text: 'Note text',
            onRemove:() => console.error('You need to attach a handler for removing PostIt Instance'),
            onChange:() => console.log('Change event not connected to handler')
        };
    }

    handleChangeState(state) {
        this.setState({mode: state});
    }

    restoreStandardView() {
        this.setState({mode: PostItState.view});
    }

    handleSaveText(e) {
        e.preventDefault();
        this.setState({mode: PostItState.view, text: this._editForm.value});
        this.props.onChange(this.state.text);
    }

    renderNoteEdit() {
        return  <form onSubmit={this.handleSaveText.bind(this)}>
                    <textarea ref={e=>this._editForm = e}
                              defaultValue={this.state.text} />
                    <div className="btn-toolbar">
                        <button type="submit" className="btn btn-success">
                            <i className="glyphicon glyphicon-ok" />
                        </button>
                        <button className="btn btn-warning" onClick={this.restoreStandardView.bind(this)}>
                            <i className="glyphicon glyphicon-remove" />
                        </button>
                    </div>
                </form>
    }

    handleRemoveNote() {
        this.setState({deleted: true});
        window.setTimeout(this.props.onRemove, 1000);
    }

    renderConfirmDelete() {
        return  <p>
                    Are you sure you with to delete&nbsp;me? <br/> <br/>
                    <a href="#" className="btn btn-danger pull-right"
                       onClick={this.handleRemoveNote.bind(this)}>OK</a>
                    <a href="#" className="btn btn-warning pull-right" onClick={this.restoreStandardView.bind(this)}>cancel</a>
                </p>;
    }

    renderNoteContent() {
        switch (this.state.mode) {
            case PostItState.edit:
                return this.renderNoteEdit();
            case PostItState.delete:
                return this.renderConfirmDelete();
            default:
                return <p>{this.state.text}</p>;
        }
    }

    render() {
        return(
            <article className="col-sm-6 col-md-4 col-lg-3 post-it">
                <div className={"post-it__container" + (this.state.deleted ? " post-it-delete" : '')}>
                    <h2>
                        <a href="#"
                           className="btn btn-success pull-right"
                           onClick={this.handleChangeState.bind(this, PostItState.edit)}>
                            <i className="glyphicon glyphicon-pencil" />
                        </a>
                        <a href="#"
                           className="btn btn-danger pull-right"
                           onClick={this.handleChangeState.bind(this, PostItState.delete)}>
                            <i className="glyphicon glyphicon-trash" />
                        </a>
                        Note #{this.props.number}
                    </h2>
                    { this.renderNoteContent() }
                </div>
            </article>
        );
    }

}
