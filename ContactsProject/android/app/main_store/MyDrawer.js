import axios from "axios";
import { connect } from "react-redux";
import MyNewDrawer  from "../components/drawer";

const mapStateToProps = (state) => {
  let data = {
    contacts: state.contacts
  };
  return data;
};

const getContactsFromDB = () => (dispatch, getState) => {
    axios
      .get('http://10.0.2.2:3010/contacts')
      .then(result => {
        dispatch({ type: "CONTACTS", payload: result.data });
      })
      .catch(error => console.log(JSON.stringify(error)));
};


const mapDispatchToProps = (dispatch) => ({
  
  getContacts: () => dispatch(getContactsFromDB()),
 
});
export default connect(mapStateToProps, mapDispatchToProps)(MyNewDrawer);
