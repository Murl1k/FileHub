import Input from "../../../../shared/UIKit/input";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../../shared/lib/hooks/useAppSelector.ts";
import {ChangeEvent, useState} from "react";
import {fetchUpdateMyAccount} from "../../../auth";
import {PrimaryButton} from "../../../../shared/UIKit/buttons";

const UpdateEmail = () => {

    const dispatch = useAppDispatch()

    const {data, status} = useAppSelector(state => state.auth)

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
        if (!isUpdating && email !== data?.email) {
            setIsUpdating(true)
            updateAccount(email)
        }
    }

    return (
        <div>
            <h4>Email</h4>
            <Input
                type="text"
                placeholder={status === "loaded" ? data?.email ? data.email : 'Enter your e-mail' : ''}
                value={email}
                onChange={handleEmailChange}
            />
            <PrimaryButton onClick={handleUpdateEmail}>Update e-mail</PrimaryButton>
        </div>
    );
};

export default UpdateEmail;