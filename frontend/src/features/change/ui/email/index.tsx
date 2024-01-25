import Input from "../../../../shared/UIKit/input";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {ChangeEvent, useState} from "react";
import {fetchUpdateMyAccount} from "../../../auth/model/auth.action.ts";

const Email = () => {

    const dispatch = useAppDispatch()

    const {data} = useAppSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [isUpdating, setIsUpdating] = useState(false)

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const updateAccount = (email: string) => {
        dispatch(fetchUpdateMyAccount({email: email}))
            .then(() => {
                setTimeout(() => {
                    setIsUpdating(false)
                }, 3000)
            })
            .catch(err => {
                console.log(err)
                setIsUpdating(false)
            })
    }

    const handleUpdateEmail = () => {
        if (!isUpdating) {
            setIsUpdating(true)
            updateAccount(email)
        }
    }

    console.log(isUpdating)

    return (
        <label htmlFor="email">
            <h4>Email</h4>
            <Input id='email' type="text" placeholder={data?.email} value={email} onChange={handleEmailChange}/>
            <button onClick={handleUpdateEmail}>Update email</button>
        </label>
    );
};

export default Email;