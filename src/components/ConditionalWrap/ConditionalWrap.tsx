import React, { FunctionComponent, cloneElement } from 'react';

export interface ConditionalWrapProps {
    condition: boolean;
    wrap: (children: JSX.Element) => JSX.Element;
    children: JSX.Element;
}

/**

 Renders a conditional wrapper component that wraps its children based on a given condition.
 @component ConditionalWrap
 @param {Object} props - The component props.
 @param {boolean} props.condition - The condition determining whether to apply the wrapper or not.
 @param {Function} props.wrap - The wrapper function that accepts a single JSX element as a parameter and returns a modified JSX element.
 @param {JSX.Element} props.children - The child JSX element to be wrapped.
 @returns {JSX.Element} - The resulting JSX element.
 */
export const ConditionalWrap: FunctionComponent<ConditionalWrapProps> = ({
                                                                       condition,
                                                                       wrap,
                                                                       children,
                                                                   }) => (condition ? cloneElement(wrap(children)) : children);

