import s from '../Styles.module.css';
import { ContacstForm } from '../ContactsForm';
import { Filter } from '../Filter';
import { ContactsList } from '../ContactsList';

const Contacts = () => {
    return (
        <div className={s.view__container}>
            <h2 className={s.home__title}>
                Enter a name and phone number to add a contact
            </h2>
            <ContacstForm />
            <Filter />
            <ContactsList />
        </div>
    );
};

export default Contacts;