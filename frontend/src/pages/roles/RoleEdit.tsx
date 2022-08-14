import {Wrapper} from "../../components/Wrapper";
import {SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {Permission} from "../../models/permission";
import {Navigate, useParams} from "react-router-dom";

function RoleEdit() {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();
    useEffect(() => {
        (
            async () => {
                const response = await axios.get('permissions');
                if (response) setPermissions(response.data);
                const {data} = await axios.get(`roles/${id}`);
                setName(data.name);
                setSelected(data.permissions.map((p: Permission) => p.id));
            }
        )();
    }, []);

    const check = (id: number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }
        setSelected([...selected, id]);
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`roles/${id}`, {
            name,
            permissions: selected
        });
        setRedirect(true);
    };

    return (
        redirect ? <Navigate to={'/roles'}/> :
            <Wrapper>
                <form onSubmit={submit}>
                    <div className="mb-3 mt-3 row">
                        <label htmlFor="" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" onChange={e => setName(e.target.value)}
                                   defaultValue={name}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="" className="co-sm-2 col-form-label">Permission</label>
                        <div className="col-sm-10">
                            {permissions.map((p: Permission) => {
                                return (
                                    <div className="form-check form-check-inline col-3" key={p.id}>
                                        <input type="checkbox" className="form-check-input" value={p.id}
                                               checked={selected.some(s => s === p.id)}
                                               onChange={() => check(p.id)}/>
                                        <label htmlFor="" className="form-check-label">{p.name}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
    );
}

export default RoleEdit;