import axios from "axios";
import { setAlert } from "./alert"
import { VERIFY_PRESCRIPTION_SUCCESS, VERIFY_PRESCRIPTION_ERROR} from "./types"


export const verifyPrescription = (file , history) => async dispatch => {
    try {
        console.log(file)
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onloadend = async() => {
            let formData = {Image:reader.result}
            let result = await axios.post('http://localhost:5000/images', formData, { headers: {'Content-Type': 'application/json'}})
            console.log(result.data)
            if(result.data){
                dispatch(setAlert("Prescription Verified","success"))
            }else{
                dispatch(setAlert("Presciption Invalid","danger"))
            }
            dispatch({
                payload : result.data,
                type: VERIFY_PRESCRIPTION_SUCCESS
            });
        }
        
        history.push('/dashboard');
    } catch (err) {
        dispatch({
            payload : err,
            type: VERIFY_PRESCRIPTION_ERROR
        });
    }
};
