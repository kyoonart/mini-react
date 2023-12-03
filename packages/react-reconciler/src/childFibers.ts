import { ReactElementType } from 'share/ReactTypes';
import { FiberNode, createFiberFromElement } from './fiber';
import { REACT_ELEMENT_TYPE } from 'share/ReactSymbols';
import { HostText } from './workTags';
import { Placement } from './fiberFlags';
function ChildReconciler(shouldTrackEffects: boolean) {
	function rceconcileSingleElement(returnFiber: FiberNode, currentFiber: FiberNode | null, element: ReactElementType) {
		const fiber = createFiberFromElement(element);
		fiber.return = returnFiber;
		return fiber;
	}
	function rceconcileSingleTextNode(returnFiber: FiberNode, currentFiber: FiberNode | null, element: string | number) {
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;
		return fiber;
	}
	function placeSingleChild(fiber: FiberNode) {
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags |= Placement;
		}
		return fiber;
	}
	return function reconcileChildFibers(returnFiber: FiberNode, currentFiber: FiberNode | null, newChild?: ReactElementType) {
		// 判断当前 fiber 的类型
		if (typeof newChild === 'object' && newChild != null) {
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(rceconcileSingleElement(returnFiber, currentFiber, newChild));
				default:
					if (__DEV__) {
						console.warn('为实现的 reconcile类型', newChild);
					}
					break;
			}
		}
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(rceconcileSingleTextNode(returnFiber, currentFiber, newChild));
		}
		return null;
	};
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
