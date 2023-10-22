import React from 'react';

const Tag = ({tag, deleteTag, id}) => {
    return (
        <div className="container_from_tag" id={id}>
            <div className="container_tag">
                <input
                    onChange={() => 23}
                    placeholder="Tags"
                    value={tag}
                    className="input_form tag none"
                    type="text"/>
                <button className="but_teg delete" id={id} onClick={(e) => deleteTag(e)}>Delete</button>
            </div>
        </div>
    )
}

export default Tag;

