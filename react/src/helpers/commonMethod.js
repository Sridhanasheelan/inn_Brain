import swal from 'sweetalert';
import { history } from "../history/index";

async function isEmptyObj(obj) {
    return !obj || Object.keys(obj).length === 0;
}
async function isSuccess(msg, type) {
    swal(msg, {
        icon: "success",
        className: "showAlert",
        buttons: "OK",
        closeOnClickOutside: false
    }).then(async (result) => {
        if (result && type === 'signUp') {
            history.push('/user');
            window.location.reload();
        }
    });
}
async function isFailed(msg) {
    swal(msg, {
        icon: "warning",
        className: "showAlert",
        buttons: "OK",
        closeOnClickOutside: false
    })
}
export { isEmptyObj, isSuccess, isFailed }