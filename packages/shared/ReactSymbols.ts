// 为了防止滥用ReactElement 则需要将ReactElement定义为一个特殊值

// 判断是否支持symbol
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
