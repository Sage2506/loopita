const initialClient = {
  name : "",
  email:"",
  phone:"",
}

export const clientReducer = ( state = initialClient, action) => {
  switch(action.type){
    default:
      return state;
  }
}

export default clientReducer