import React, {useEffect, useState} from 'react';
import {Wrapper} from "../../components/Wrapper";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Role} from "../../models/role";

function Roles() {
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('roles');
                if (data) setRoles(data);
            }
        )();
    }, []);
    const del = async (id: number) => {
        if (window.confirm('Are you want to delete this reacord?!')) {
            await axios.delete(`roles/${id}`);
            setRoles(roles.filter((r: Role) => r.id !== null));
        }
    };
    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/roles/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {roles.map((role: Role) => {
                    return (<tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td>
                            <div className="btn-group-me-2">
                                <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-secondary">
                                    Edit
                                </Link>
                                <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => del(role.id)}>
                                    Delete
                                </a>
                            </div>
                        </td>
                    </tr>);
                })}
                </tbody>
            </table>
        </Wrapper>
    );
}

export default Roles;