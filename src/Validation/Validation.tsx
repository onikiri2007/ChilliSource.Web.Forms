/** Libraries */
import React, { ComponentType } from 'react';
import { Map } from 'immutable';
import {
	withProps,
	mapProps,
	shouldUpdate,
	ComponentEnhancer,
	InferableComponentEnhancer,
	compose,
	withState,
	withHandlers,
	lifecycle
} from 'recompose';
import classnames from 'classnames';
import { createSpecificShallowEqual } from 'cs.core';

/** Helpers */
import { testElement, validations, TestElement } from '../../libs/validate';
import { isMultipleValueInput, returnCheckedValue } from '../Form/Helpers/inputHelpers';

const specificShallowEqual = createSpecificShallowEqual<ValidationMapProps & TypeProp>(
	'value',
	'changed',
	'type'
);

const specificShallowEqualDisplayed = createSpecificShallowEqual<{
	displayed: boolean;
	className: string;
}>('displayed', 'className');

const specificShallowEqualTestElement = createSpecificShallowEqual<{
	value: ValueProp<PossibleInputValue>;
	typeOfValidation: string;
	type?: string;
}>('value', 'typeOfValidation', 'type');

const availableValidationsShallowEqual = createSpecificShallowEqual<any>(
	'isFor',
	'test',
	...Object.keys(validations)
);

const Validation = ({ displayed, className, children }: ValidationInnerElementProps) => {
	const classes = classnames('validation', className, {
		invalid: displayed
	});
	return <div className={classes}>{children}</div>;
};

const getValue = (name: string, inputInfo: Map<string, any>): PossibleInputValue => {
	if (isMultipleValueInput(name) && Map.isMap(inputInfo)) {
		return returnCheckedValue(
			arg => typeof arg !== 'undefined' && arg !== false,
			...inputInfo.map(item => item.get('value', false)).toArray()
		);
	} else {
		return inputInfo.get('value') || false;
	}
};

/** Interfaces */
import {
	ValidationAdditionProps,
	TextInputProps,
	ValidationInnerElementProps,
	ValueProp,
	TypeProp,
	PossibleInputValue,
	ValidationTypes,
	ValidationComponentProps
} from '../../typings/types.d';

interface ValidationInternalAdditionProps extends ValidationAdditionProps {
	value: ValueProp<PossibleInputValue>;
	valid: boolean;
}

interface ValidationMapProps extends ValidationAdditionProps {
	changed: boolean;
	value: ValueProp<PossibleInputValue>;
}

interface ValidationWithStateProps extends ValidationMapProps {
	valid: boolean;
	setValid: (valid: boolean) => undefined;
	typeOfValidation: string;
}

interface TestHandersUncalledInterface {
	testElement: () => TestElement;
}

interface TestHandersInterface {
	testElement: TestElement;
}

interface ValidationLifecycleProps extends ValidationMapProps, TestHandersInterface {}

/** Styles */
import './Validation.scss';

/** Class Validation */
export default compose<ValidationInnerElementProps, ValidationComponentProps>(
	withProps((ownerProps: ValidationAdditionProps) => {
		const { name, inputInfo, type } = ownerProps;
		const changed: boolean = isMultipleValueInput(name)
			? inputInfo.some(item => item.get('changed', false))
			: inputInfo.get('changed', false);
		const value: PossibleInputValue = getValue(name, inputInfo);
		return {
			changed,
			value
		};
	}),
	shouldUpdate((currentProps: ValidationMapProps, nextProps: ValidationMapProps) => {
		return (
			!specificShallowEqual(currentProps, nextProps) ||
			!availableValidationsShallowEqual(currentProps, nextProps)
		);
	}),
	withState('valid', 'setValid', false),
	withHandlers<TestHandersUncalledInterface, ValidationWithStateProps>({
		testElement: () => testElement
	}),
	lifecycle<ValidationWithStateProps & TestHandersInterface, {}>({
		componentWillMount() {
			const { testElement, setValidation, value, type, isFor, test } = this.props;
			setValidation(isFor, test);
			// value, test, isFor, type, setValid
			testElement(this.props);
		},
		componentWillReceiveProps(nextProps) {
			if (!specificShallowEqualTestElement(this.props, nextProps)) {
				nextProps.testElement(nextProps);
			}
			if (!availableValidationsShallowEqual(this.props, nextProps)) {
				nextProps.setValidation(nextProps.isFor, nextProps.test);
			}
		}
	}),
	mapProps((ownerProps: ValidationWithStateProps) => {
		const { valid, value, className, changed, children, test } = ownerProps;
		return {
			displayed: !valid && changed,
			className,
			children
		};
	}),
	shouldUpdate(
		(currentProps: ValidationInnerElementProps, nextProps: ValidationInnerElementProps) => {
			return !specificShallowEqualDisplayed(currentProps, nextProps);
		}
	)
)(Validation);
