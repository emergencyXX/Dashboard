const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

let InitialState= {
    firstName: 'Guest',
    lastName: '',
    status: '',
    age: '',
    photo: null,
    gender:''
};


let reducer = (state = InitialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {
                ...state,
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                status: action.data.status,
                age: action.data.age,
                photo: action.data.photo,
                gender: action.data.gender,
            };
        default:
            return state;
    }
};



export const setData = (data) => ({
    type: SET_PROFILE_DATA,
    data
});


export default reducer;
