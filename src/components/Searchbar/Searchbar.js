import { useState } from "react";
import PropTypes from "prop-types";
import initialState from "./initialState";
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';

const Searchbar = ({ onSubmit }) => {
    const [state, setState] = useState({...initialState });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState(prevState => {
            return{...prevState,[name]: value }
    })
    };

    const handlerSubmit = (event) => {
        event.preventDefault();
        onSubmit(search);
        setState({...initialState });
    };
    const {search} = state;
    return (
            <div>
            <header className={css.searchbar}>
            <form className={css.searchForm} onSubmit={handlerSubmit}>
                        <button type="submit" className={css.button}>
                            <CiSearch/>
                <span className={css.buttonLabel}>Search</span>
                </button>
                <input
                    onChange={handleChange}
                    value={search} name="search"
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
            </header>
            </div>
        )
};
export default Searchbar;

Searchbar.propType = {
    onSubmit: PropTypes.func,
}
