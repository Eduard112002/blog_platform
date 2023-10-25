import React, {useEffect, useState} from 'react';
import './сreate-new-article.css';
import Tag from './tag';
import { useForm } from 'react-hook-form';
import { bindActionCreators } from "redux";
import { connect, useDispatch } from 'react-redux';
import * as actions from "../../actions";
import { useNavigate, useParams } from 'react-router-dom';
import { createArticle, updateArticle } from "../server/server-reducer";

const CreateNewArticle = ({ title, description, body, tag, addCreateTag, addCreateTitle,
                              addCreateDescription, addCreateBody, ok, changeOk, articleOk, changeArticleOk }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            addCreateTitle('');
            addCreateDescription('');
            addCreateBody('');
        }
    }, [])
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: title,
            description: description,
            body: body,
            token: sessionStorage.getItem('token'),
        }
    });

    const [tagList, setTagLIst] = useState([]);
    const addTag = () => {
        setTagLIst((state) => {
            const id = `${tag}` + (state.length - 1);
            return [...state, <Tag key={id} tag={tag} id={id} deleteTag={deleteTag}/>]
        })
        addCreateTag('');
    }
    const deleteTag = (e) => {
        setTagLIst((state) => {
            const index = state.findIndex((el) => el.props.id === e.target.id);
            return [...state.slice(0,index), ...state.slice(index + 1)]
        })
    }
    const send = (data) => {
        const tags = tagList.map((el) => {
            return el.props.tag;
        })
        let result = {...data, tags: tags};
        if (!slug) {
            dispatch(createArticle(result));
        } else {
            result = {...result, slug}
            dispatch(updateArticle(result));
        }
    }
    useEffect(() => {
        if (ok) {
            changeOk(false);
            navigate('/');
        }
        if (articleOk) {
            changeArticleOk(false);
            navigate(`/articles/${slug}`);
        }
    }, [ok, articleOk]);
    return <div className="create">
        <form className="create_article_form" onSubmit={(e) => e.preventDefault()}>
            <center className="create_article_title">Create new article</center>
            <div className="container_from">
                <label className="title_form">Title</label>
                <input
                    value={title}
                    {...register("title", {required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        },
                        onChange: (e) => addCreateTitle(e.target.value)
                    })}
                    placeholder="Title"
                    className="input_form"
                    type="text"
                />
                <span className="title_error">{errors.title?.message}</span>
            </div>
            <div className="container_from">
                <label className="title_form">Short description</label>
                <input
                    value={description}
                    {...register("description", {required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        },
                        onChange: (e) => addCreateDescription(e.target.value)
                    })}
                    placeholder="Title"
                    className="input_form"
                    type="text"/>
                <span className="title_error">{errors.description?.message}</span>
            </div>
            <div className="container_from container_from_text">
                <label className="title_form">Text</label>
                <textarea
                    value={body}
                    placeholder="Text"
                    className="input_form  input_form_text"
                    {...register("body", {required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        },
                        onChange: (e) => addCreateBody(e.target.value)
                    })}
                />
                <span className="title_error">{errors.body?.message}</span>
            </div>
            <label className="title_form_tag">Tags</label>
            { tagList }
            <div className="container_from_tag">
                <div className="container_tag">
                    <input
                        onChange={(e) => addCreateTag(e.target.value)}
                        placeholder="Tags"
                        value={tag}
                        className="input_form tag"
                        type="text"/>
                    <button className="but_teg delete" onClick={(e) => deleteTag(e)}>Delete</button>
                    <button className="but_teg add" onClick={(e) => addTag(e)}>Add tag</button>
                </div>
            </div>
            <button className="create_send" onClick={handleSubmit((data) => send(data))}>Send</button>
        </form>
    </div>
};

const mapStateToProps = (state) => {
    const create = state.createArticleReducer;
    const newAccount = state.addNewAccountReducer;
    return {
        title: create.title,
        description: create.description,
        body: create.body,
        tag: create.tag,
        ok: newAccount.ok,
        articleOk: newAccount.articleOk,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewArticle);