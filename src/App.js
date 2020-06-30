import React, { Component } from 'react';
import contacts from './contacts.json';
import './App.css';

class App extends Component {
  state = {
    showingContacts: [...contacts].splice(0, 5), //This will have the first 5
    restOfContacts: [...contacts].splice(5), //This will have everyone else excpet the first 5
    contactPics: contacts,
    contactPopularity: contacts,
  };

  showContacts = (props) => {
    let contactList = this.state.showingContacts.map((eachContact, i) => {
      return (
        <tr key={i}>
          <td>
            <img alt="picture" src={eachContact.pictureUrl} />
          </td>
          <td>{eachContact.name}</td>
          <td>{eachContact.popularity}</td>
          <td>
            <button onClick={() => this.deleteRow(i)}>Delete</button>
          </td>
        </tr>
      );
    });
    return contactList;
  };

  deleteRow = (index) => {
    let showContactsChanged = [...this.state.showingContacts];
    showContactsChanged.splice(index, 1);
    this.setState({
      showingContacts: showContactsChanged,
    });
  };

  randomContactBtn = () => {
    console.log(this.state);
    let randomContact = this.state.restOfContacts[
      Math.floor(Math.random() * this.state.restOfContacts.length)
    ];
    this.setState({
      showingContacts: [
        ...this.state.showingContacts.slice(0, 5),
        randomContact,
      ],
    });
  };

  sortName = () => {
    let showingContactsCopy = [...this.state.showingContacts];
    showingContactsCopy.sort((a, b) => {
      return a.name.localeCompare(b.name);
      // if (a.name > b.name) {
      //   return 1;
      // } else if (a.name < b.name) {
      //   return -1;
      // }
      // return 0;
    });

    this.setState({
      showingContacts: showingContactsCopy,
    });
  };

  sortPop = () => {
    let showingContactsCopy = [...this.state.showingContacts];
    showingContactsCopy.sort((a, b) => {
      return a.popularity - b.popularity;
      // if (a.popularity > b.popularity) {
      //   return 1;
      // } else if (a.popularity < b.popularity) {
      //   return -1;
      // }
      // return 0;
    });

    this.setState({
      showingContacts: showingContactsCopy,
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.randomContactBtn}>Add Random Contact</button>
        <button onClick={this.sortName}>Sort by Name</button>
        <button onClick={this.sortPop}>Sort by Popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.showContacts()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
