import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../components/Modal';

interface iDashboardProps { }
interface iContact {
  Id: string,
  FirstName: string,
  LastName: string,
}

const Dashboard = (props: iDashboardProps): React.ReactElement => {
  const [contacts, setContacts] = useState<iContact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
  });

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
  });
  const router = useRouter();

  useEffect(() => {
    let fetchContacts = true;
    // check if we already have the tokens in local storage
    if (!localStorage.getItem('accessToken') || !localStorage.getItem('instanceUrl')) {
      // clear current local storage
      localStorage.clear();
      // redirect the user to root page
      router.replace('/');
      fetchContacts = false; // to prevent fetching contacts
    }

    if (contacts.length === 0 && fetchContacts) handleFetchContacts();
  }, [router, contacts]);

  const handleFetchContacts = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const instanceUrl = localStorage.getItem('instanceUrl');

    const res = await fetch(`${instanceUrl}/services/data/v56.0/query/?q=SELECT+id, firstName,lastName+from+Contact`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const data = await res.json();
    setContacts(data.records);
  };

  const handleFormValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveBtnClick = () => {
    if (!formValues.firstName) {
      setFormErrors({ ...formErrors, firstName: 'First name is required' });
      return;
    }

    if (!formValues.lastName) {
      setFormErrors({ ...formErrors, lastName: 'Last name is required' });
      return;
    }

    // save the contact
    handleSaveContact();
  };

  const handleSaveContact = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const instanceUrl = localStorage.getItem('instanceUrl');

    const res = await fetch(`${instanceUrl}/services/data/v56.0/sobjects/Contact`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      }),
    });

    try {
      const { success } = await res.json();
      if (success) {
        handleClearForm();
        setShowModal(false);
        handleFetchContacts();
      }
    } catch (error) {
      console.error("something went wrong: ", error);
    }
    return false;
  };

  const handleClearForm = () => {
    // clear form errors
    setFormErrors({
      firstName: '',
      lastName: '',
    });

    // clear form values
    setFormValues({
      firstName: '',
      lastName: '',
    });
  };

  return (
    <>
      <main className="my-2">
        <header>
          <h3 className="text-left text-lg text-black ">Dashboard</h3>
          <p>Here is a list of your contacts:</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(true)}>
            Add a Contact
          </button>
        </header>
        <ul>
          {/* TODO: Add controls to delete or edit them */}
          {contacts.map((contact) => (
            <li key={contact.Id}
              className="px-3 py-1 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
            >
              {contact.FirstName + ' ' + contact.LastName}
            </li>
          ))}
        </ul>
      </main>

      <Modal
        show={showModal}
        title="Add a Contact"
        handleCloseBtnClick={() => setShowModal(false)}
        handleSaveBtnClick={handleSaveBtnClick}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            First Name
          </label>
          <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors?.name ? 'border-red-500' : ''}`}
            id="firstName" name="firstName" type="text" placeholder="Contact first name" value={formValues.firstName} onChange={handleFormValuesChange}
          />
          {formErrors?.firstName && <p className="text-red-500 text-xs italic">{formErrors?.firstName}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${formErrors?.lastName ? 'border-red-500' : ''}`}
            id="lastName" name="lastName" placeholder="Contact last name" value={formValues.lastName} onChange={handleFormValuesChange}
          />
          {formErrors?.lastName && <p className="text-red-500 text-xs italic">{formErrors?.lastName}</p>}
        </div>
      </Modal>
    </>
  )
};

Dashboard.defaultProps = {
  contacts: [],
};

export default Dashboard;
