export type Type = any;
export type Key = any;
export type Ref = { current: any } | ((instance: any) => void) | any;
export type Props = any;
export type ElementType = any;

export interface ReactElementType {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: Ref;
	__mark: string;
}
