import { Form, Button } from 'react-bootstrap';
import { BiCurrentLocation, BiSearchAlt } from "react-icons/bi";
import styles from "../../styles/etc.module.css";

interface SearchbarProps {
    formSubmitAction: () => void,
    formChangeAction: (e: React.FormEvent<HTMLInputElement>) => void,
    onClickAction: () => void
    formValue: string,
}

const Searchbar = ({formSubmitAction, formChangeAction, onClickAction, formValue}: SearchbarProps) => {

    const formSubmitHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault(); //@ts-ignore
        formSubmitAction();
    }

    const formChangeHandler = (e: React.SyntheticEvent): void => {
        //@ts-ignore
        formChangeAction(e);
    }

    const buttonClickHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault(); //@ts-ignore
        onClickAction();
    }

    return (
        <Form 
            className="d-flex flex-row justify-content-between" 
            onSubmit={formSubmitHandler}
        >
            <Form.Control
                required
                placeholder="Enter Zip Code..." 
                value={formValue} 
                onChange={formChangeHandler}
            />

            <Button 
                variant="info" 
                className={`${styles.searchBarButton} mx-2`} 
                onClick={formSubmitHandler}
            >
                <BiSearchAlt/>
            </Button>

            <Button 
                variant="info" 
                className={styles.searchBarButton} 
                onClick={buttonClickHandler}
            >
                <BiCurrentLocation/>
            </Button>
        </Form>
    )
}

export default Searchbar;