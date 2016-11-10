import React     from 'react';
import ReactDOM  from 'react-dom';
import PostBoard from './components/PostBoard.jsx'

let notes = [
    'This is a test of a post it note...',
    'Another test of post it notes'
];


ReactDOM.render(
    <PostBoard title="Post Board Fun" notes={notes} />,
    document.getElementById('container')
);

