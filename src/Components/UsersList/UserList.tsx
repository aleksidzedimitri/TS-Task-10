import React, { useCallback, useState } from "react";
import { data, Person } from "../../static/data";
import UsersListTableHead, {
  SortType,
} from "../UsersListTableHead/UsersListTableHead";
import styles from "./UsersList.module.css";
import UserListItem from "../UserItem/UserListItem";
import AddUserForm from "../UserAddForm/UserAdd";

const UserList = () => {
  const [users, setUsers] = useState<Person[]>(data);
  const [nameSort, setNameSort] = useState<SortType>();
  const [ageSort, setAgeSort] = useState<SortType>("asc");

  
  const removeUser = useCallback((id: number) => {
    setUsers((previousUsers) => {
      return previousUsers.filter((user) => user.id !== id);
    });
  }, []);

  const sortByAge = useCallback(() => {
    if (ageSort === "asc") {
      setUsers((prevUsers) => [...prevUsers].sort((a, b) => a.age - b.age));
      setAgeSort("desc");
    } else {
      setUsers((prevUsers) => [...prevUsers].sort((a, b) => b.age - a.age));
      setAgeSort("asc");
    }
  }, [ageSort]);

  const sortByFirstName = () => {
    if (nameSort === "asc") {
      setUsers((previousUsers) => {
        const newUsers = [...previousUsers];
        newUsers.sort((userA, userB) => {
          if (userA.first_name > userB.first_name) return 1;
          if (userA.first_name < userB.first_name) return -1;
          return 0;
        });
        return newUsers;
      });
      setNameSort("desc");
    } else {
      setUsers((previousUsers) => {
        const newUsers = [...previousUsers];
        newUsers.sort((userA, userB) => {
          if (userA.first_name > userB.first_name) return -1;
          if (userA.first_name < userB.first_name) return 1;
          return 0;
        });
        return newUsers;
      });
      setNameSort("asc");
    }
  };

  const addUser = useCallback((newUser: Person) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  }, []);

  return (
    <div className={styles.table_container}>
       <div >
      <AddUserForm addUser={addUser} />
      </div>
      <table>
        <UsersListTableHead
          sortByFirstName={sortByFirstName}
          sortByAge={sortByAge}
          nameSort={nameSort}
          ageSort={ageSort}
        />
        <tbody>
          {users.map((user) => {
            return (
              <React.Fragment key={user.id}>
                <UserListItem user={user} removeUser={removeUser} />
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
