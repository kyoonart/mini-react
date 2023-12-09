import { Container } from "hostConfig";
import { FiberNode } from "./fiber";
import { ChildDeletion, MutationMask, NoFlags, Placement, Update } from "./fiberFlags";
import { HostComponent, HostRoot, HostText } from "./workTags";
import { appendChildToContainer } from './hostConfig';

let nextEffect:FiberNode|null = null;
export const commitMutationEffects = (finishedWork: FiberNode) => {
  nextEffect = finishedWork;
  while (nextEffect !== null) {
    const child: FiberNode | null = nextEffect.child;
    if ((nextEffect.subtreeFlags & MutationMask) !== NoFlags && child !== null) {
      nextEffect = child;
    } else {
      // 向上遍历
      up: while (nextEffect !== null) {
        commitMutationEffectsOnFiber(nextEffect)
        const sibling: FiberNode | null = nextEffect.sibling;
        if (sibling !== null) {
          nextEffect = sibling;
          break up;
        }
        nextEffect = nextEffect.return;
      }
    }
 }
}
const commitMutationEffectsOnFiber = (finishedWork: FiberNode) => {
  const flags = finishedWork.flags;
  if ((flags & Placement) !== NoFlags) {
    commitPlacement(finishedWork);
    // 执行完这个 需要重置
    finishedWork.flags &= ~Placement;
  }
  if ((flags & Update) !== NoFlags) {
    commitPlacement(finishedWork);
    // 执行完这个 需要重置
    finishedWork.flags &= ~Placement;
  }
  if ((flags & ChildDeletion) !== NoFlags) {
    commitPlacement(finishedWork);
    // 执行完这个 需要重置
    finishedWork.flags &= ~Placement;
  }
}
const commitPlacement = (finishedWork: FiberNode) => {
  if (__DEV__) {
    console.log('执行 placement 操作')
  }
  const hostParent = getHostParent(finishedWork);
  appendPlacementNodeIntoContainer(finishedWork, hostParent);
}

function getHostParent(fiber: FiberNode) {
  let parent = fiber.return;
  while (parent) {
    const parentTag = parent.tag;
    if (parentTag === HostComponent) {
      return parent.stateNode as Container;
    }
    if (parentTag === HostRoot) {
      return (parent.stateNode as Container).container;
    }
    parent = parent.return;
  }
  if (__DEV__) {
    console.warn('未找到 host parent')
  }
}

function appendPlacementNodeIntoContainer(finishedWork:FiberNode,hostParent:Container) {
  if (finishedWork.tag === HostComponent || finishedWork.tag === HostText) {
    appendChildToContainer(finishedWork, hostParent);
    return;
  }
  const child = finishedWork.child;
  if (child !== null) {
    appendPlacementNodeIntoContainer(child, hostParent);
    let sibling = child.sibling;
    while (sibling !== null) {
      appendPlacementNodeIntoContainer(sibling, hostParent);
      sibling = sibling.sibling;
    }
  }
}
