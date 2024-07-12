import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState } from "./store";

// 重写useSelector，使其返回RootState类型
// 这里使用了TypedUseSelectorHook<RootState>来显式地为useSelector钩子指定类型。
// TypedUseSelectorHook是Redux库提供的一个泛型类型，用于创建一个类型化的useSelector钩子。
// 这个泛型接受一个类型参数，这里传入的是RootState，即之前定义的整个Redux store状态的类型。
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;