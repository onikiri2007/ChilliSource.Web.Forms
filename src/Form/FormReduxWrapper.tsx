import React from "react";
import {Map} from "immutable";
import Form, {FormProps} from "./Form";
import {connect, Dispatch} from "react-redux";

interface MapStateToProps {
  FormState: Map<string, any>
}
interface MapDispatchToProps {
  dispatch: Dispatch<any>
}


const FormReduxWrapper = (props:FormProps) =>(
  <Form {...props}/>
);

const mapStateToProps = (state:Map<string, any>):MapStateToProps => {
  return {
    FormState: state.get('FormState', Map()) || Map()
  }
}

export default connect<MapStateToProps, MapDispatchToProps, FormProps>(mapStateToProps)(FormReduxWrapper);